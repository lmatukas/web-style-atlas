import {mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createRequire} from 'node:module';
import {launchCanonical} from '../../../scripts/previews.mjs';
import {serveGallery} from '../../../scripts/dev.mjs';

// Deliberately runs the consumer artifact, not an atlas reference page.
const [root, output, id] = process.argv.slice(2);
if (!root || !output || !/^[a-z][a-z0-9-]+$/.test(id || '')) throw new Error('use: node check.mjs <site-root> <output-dir> <case-id>');
mkdirSync(output, {recursive:true});
const require = createRequire(import.meta.url);
const server = await serveGallery(resolve(root), {basePath:'/bench/'});
const browser = await launchCanonical();
const results = {id, browser:browser.version(), viewports:[], errors:[], external:[], failedResponses:[],failedRequests:[]};
try {
 for (const width of [360,768,1440]) {
  const page = await browser.newPage({viewport:{width,height:900}, reducedMotion:'reduce'});
  page.on('pageerror', error => results.errors.push(error.message));
  page.on('requestfailed', request => results.failedRequests.push({url:request.url(),error:request.failure()?.errorText}));
  page.on('request', request => {if (!request.url().startsWith(server.url) && !request.url().startsWith('data:')) results.external.push(request.url());});
  page.on('response', response => {if (response.status() >= 400) results.failedResponses.push([response.status(),response.url()]);});
  await page.goto(server.url, {waitUntil:'networkidle'});
  const copy=(await page.locator('body').innerText()).replace(/\s+/g,' ').toLowerCase();
  const required=id.startsWith('service-') ? ['Clear writing. Useful work.','Copy-editing','Proofreading','Document structure','Share a sample','Agree a scope','Review and hand off'] : id==='information-catalogue' ? ['Writing Lab','Photo Walk','Clay Table','Intro Web','90 minutes','120 minutes','150 minutes','180 minutes'] : ['Forest','Water','Austin Schmid','NPS / M. Reed'];
  const missingCopy=required.filter(text=>!copy.includes(text.toLowerCase()));
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const audit = await page.evaluate(async () => {
   const axeResult = await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
   return {
    h1:document.querySelectorAll('h1').length, main:document.querySelectorAll('main').length,
    overflow:document.documentElement.scrollWidth > innerWidth + 1,
    missingAnchors:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length < 2 || !document.getElementById(decodeURIComponent(h.slice(1)))),
    brokenImages:[...document.images].filter(i=>!i.complete || !i.naturalWidth).map(i=>i.getAttribute('src')),
    violations:axeResult.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))
   };
  });
  await page.keyboard.press('Tab');
  audit.focus = await page.evaluate(() => {const e=document.activeElement,s=getComputedStyle(e);return {tag:e.tagName,visible:s.outlineStyle!=='none' && parseFloat(s.outlineWidth)>0 || s.boxShadow!=='none'};});
  await page.evaluate(()=>document.activeElement.blur());
  audit.details=[];
  for(const detail of await page.locator('details').all()) {
   const initial=await detail.evaluate(e=>e.open);
   await detail.locator('summary').click();
   const after=await detail.evaluate(e=>e.open);
   audit.details.push({initial,after,changed:initial!==after});
   await detail.locator('summary').click();
  }
  audit.navigation=[];
  for(const link of await page.locator('nav a[href^="#"]').all()) {
   const href=await link.getAttribute('href');
   await link.click();
   const reached=await page.evaluate(hash=>location.hash===hash,href);
   audit.navigation.push({href,reached});
  }
  if(id==='service-institutional') {
   await page.getByLabel('Find a service').fill('proofreading');
   const one=await page.locator('.service-row:visible').count()===1 && await page.locator('.service-row:visible').innerText().then(t=>t.includes('Proofreading'));
   await page.getByLabel('Find a service').fill('zz-unmatched');
   const empty=await page.locator('.service-row:visible').count()===0 && await page.locator('#empty-state').isVisible();
   await page.getByRole('button',{name:'Clear search'}).click();
   audit.filter={one,empty,reset:await page.locator('.service-row:visible').count()===3 && await page.getByLabel('Find a service').inputValue()===''};
  }
  if(id==='information-catalogue') {
   const visible=page.locator('.workshop:visible');
   await page.getByLabel('Subject',{exact:true}).selectOption('Art');
   const titles=await visible.locator('h3').allTextContents();
   const category=titles.length===2 && titles.includes('Photo Walk') && titles.includes('Clay Table');
   await page.getByLabel('Search workshops',{exact:true}).fill('Writing');
   const combined=await visible.count()===0 && await page.getByRole('heading',{name:'No workshops found'}).isVisible();
   await page.getByRole('button',{name:'Show all workshops'}).click();
   await page.waitForFunction(()=>document.querySelectorAll('.workshop:not([hidden])').length===4,{},{timeout:2000});
   const emptyReset=await visible.count()===4 && await page.getByLabel('Search workshops',{exact:true}).inputValue()==='' && await page.getByLabel('Subject',{exact:true}).inputValue()==='all';
   await page.getByLabel('Search workshops',{exact:true}).fill('180 minutes');
   const duration=await visible.count()===1 && await visible.locator('h3').innerText()==='Intro Web';
   await page.getByRole('button',{name:'Reset filters',exact:true}).click();
   await page.waitForFunction(()=>document.querySelectorAll('.workshop:not([hidden])').length===4,{},{timeout:2000});
   audit.filter={category,combined,emptyReset,duration,reset:await visible.count()===4};
  }
  await page.evaluate(()=>window.scrollTo(0,0));
  if(width !== 768) await page.screenshot({path:resolve(output,`${id}-${width}.png`),fullPage:true});
  results.viewports.push({width,missingCopy,...audit});
  await page.close();
 }
} finally {await browser.close();await server.close();}
results.pass=!results.errors.length && !results.external.length && !results.failedResponses.length && !results.failedRequests.length && results.viewports.every(v=>!v.missingCopy.length && v.h1===1 && v.main===1 && !v.overflow && !v.missingAnchors.length && !v.brokenImages.length && !v.violations.length && v.focus.visible && v.details.every(d=>d.changed) && v.navigation.every(n=>n.reached) && (!v.filter || Object.values(v.filter).every(Boolean)));
writeFileSync(resolve(output,`${id}.json`),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results));
if(!results.pass) process.exitCode=1;
