import assert from 'node:assert/strict';
import {launchCanonical} from '../../scripts/previews.mjs';
import {servePreviews} from '../../scripts/preview-server.mjs';
import {runtimePage} from '../../scripts/runtime-qa.mjs';
import {inspectPage} from '../../scripts/browser-qa.mjs';
import {readFileSync} from 'node:fs';
const runtime=JSON.parse(readFileSync(new URL('./runtime.json',import.meta.url)));
const browser=await launchCanonical(),server=await servePreviews(process.cwd(),['heirloom-weave-ledger']);
let cases=0,combinations=0,invalids=0,scrolls=0;
try {
 for(const file of ['index.html','alternate.html']) {
  const url=server.origin+'/styles/heirloom-weave-ledger/reference/'+file;
  for(const options of [{},{reduced:true},{webgl:false,audio:false}]){await runtimePage(browser,url,runtime,options);cases++;}
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce',hasTouch:true});
  const errors=[],external=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{if(new URL(route.request().url()).origin!==server.origin){external.push(route.request().url());return route.abort();}return route.continue();});
  await page.goto(url,{waitUntil:'networkidle'});
  if(file==='index.html'){
   for(const [year,img] of [['1926','purse.webp'],['1956','gloves.webp'],['1986','folio.svg'],['2026','scarf.svg']]) {
    // Genuine scrolling independently exercises the observer, without calling app helpers.
    await page.locator('#era-'+year).evaluate(e=>e.scrollIntoView({block:'center'}));
    await page.waitForFunction(y=>document.body.dataset.era===y,year);
    assert.match(await page.locator('[data-era-image]').getAttribute('src'),new RegExp(img.replace('.','\\.')));
    assert.equal(await page.locator('[data-era-link][aria-current]').getAttribute('data-era-link'),year);scrolls++;
   }
   await page.locator('[data-era-link="1926"]').focus();await page.keyboard.press('Enter');await page.waitForFunction(()=>document.body.dataset.era==='1926');
   await page.locator('[data-era-link="1986"]').tap();await page.waitForFunction(()=>document.body.dataset.era==='1986');
   assert.match(await page.locator('[data-era-image]').getAttribute('src'),/folio/);
  }
  await page.locator('#initials').fill('ES');const initialPixels=await page.locator('.live-object').screenshot();
  for(const initials of ['A','mn','ĄČŽ'])for(const thread of ['green','brown','wine'])for(const placement of ['center','corner']) {
   await page.locator('#initials').fill(initials);await page.locator(`[name="thread"][value="${thread}"]`).check();await page.locator(`[name="placement"][value="${placement}"]`).check();
   const expected=initials.toLocaleUpperCase('lt-LT');assert.equal(await page.locator('[data-object-mark]').evaluate(e=>[...e.querySelectorAll('text')].map(t=>t.textContent).join('')),expected);
   const actual=await page.locator('.live-object').getAttribute('aria-label');assert.ok(actual.includes(expected));
   assert.match(await page.locator('[data-object-mark]').getAttribute('transform'),placement==='center'?/180 310/:/330 390/);
   assert.equal(await page.locator('.personal-preview').evaluate(e=>e.style.getPropertyValue('--thread-color')),({green:'var(--color-accent)',brown:'var(--color-brown)',wine:'var(--color-wine)'})[thread]);
   combinations++;
  }
  assert.ok(!initialPixels.equals(await page.locator('.live-object').screenshot()),'actual object pixels must change');
  for(const value of ['','123','A!','A B','😀','ABCD','И']) {
   await page.locator('#initials').evaluate((e,value)=>{e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));},value);
   await page.locator('[type="submit"]').click();assert.match(await page.locator('#form-error').textContent(),/one to three/);assert.equal(await page.locator('#initials').evaluate(e=>e===document.activeElement),true);assert.equal(await page.locator('#confirmation').isVisible(),false);invalids++;
  }
  await page.locator('#initials').fill('ąž');await page.locator('[type="submit"]').click();assert.match(await page.locator('#form-error').textContent(),/demonstration/);assert.equal(await page.locator('#demo').evaluate(e=>e===document.activeElement),true);invalids++;
  await page.locator('#demo').check();await page.locator('[name="thread"][value="brown"]').tap();await page.locator('[name="placement"][value="corner"]').tap();await page.locator('[type="submit"]').click();
  const result=await page.locator('#confirmation').textContent();for(const s of ['ĄŽ','Warm brown','Lower corner','no order was created','no data was sent','no payment'])assert.ok(result.includes(s),s);
  assert.equal(await page.locator('#initials').inputValue(),'ĄŽ');assert.equal(await page.locator('#confirmation').evaluate(e=>e===document.activeElement),true);
  await page.locator('#initials').fill('JK');assert.equal(await page.locator('#confirmation').isVisible(),false);
  await page.locator('[type="reset"]').click();await page.waitForFunction(()=>window.atlasPersonalization.initials==='ES');
  assert.equal(await page.locator('#initials').inputValue(),'ES');assert.equal(await page.locator('[name="thread"]:checked').inputValue(),'green');assert.equal(await page.locator('[name="placement"]:checked').inputValue(),'center');assert.equal(await page.locator('#demo').isChecked(),false);
  await inspectPage(page,{label:file+'/personalisation'});
  for(const width of [360,390,768,1440]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>scrollTo(0,0));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.ok(await page.locator('.hero-art').evaluate(e=>e.getBoundingClientRect().height>=innerHeight*.7));}
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);cases++;await page.close();
  const motion=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'});await motion.goto(url,{waitUntil:'domcontentloaded'});await motion.locator('[data-motion-toggle]').click();const frames=await motion.evaluate(()=>window.atlasRuntime.state.frames);await motion.waitForTimeout(80);assert.equal(await motion.evaluate(()=>window.atlasRuntime.state.frames),frames);await motion.emulateMedia({reducedMotion:'reduce'});await motion.waitForFunction(()=>window.atlasRuntime.state.progress===1&&!window.atlasRuntime.state.active);await motion.evaluate(()=>dispatchEvent(new Event('pagehide')));assert.equal(await motion.evaluate(()=>window.atlasRuntime.state.disposed),true);cases++;await motion.close();
 }
 console.log(`PASS S57: ${cases} cases; ${combinations} live initial/thread/placement combinations; ${invalids} focused errors; ${scrolls} real decade scroll changes; touch+keyboard, actual pixel change, summary/reset, 8 widths, axe and motion lifecycle.`);
}finally{await browser.close();await server.close();}
