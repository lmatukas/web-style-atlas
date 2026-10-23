import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync,mkdirSync} from 'node:fs';
import {ROOT} from '../../scripts/lib/files.mjs';import {launchCanonical} from '../../scripts/previews.mjs';import {serveGallery} from '../../scripts/dev.mjs';
const index=JSON.parse(readFileSync(new URL('../../catalog/index.json',import.meta.url)));
test('gallery filters, keyboard and previews work at mobile width under a subpath',{timeout:60000},async()=>{const b=await launchCanonical(),s=await serveGallery(undefined,{basePath:'/atlas/'});const errors=[];try{const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});await p.goto(s.url,{waitUntil:'networkidle'});assert.equal(await p.locator('.card:visible').count(),index.styles.length);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await p.keyboard.press('Tab');assert.equal(await p.locator('.skip').evaluate(e=>e===document.activeElement),true);await p.keyboard.press('Enter');assert.equal(await p.locator('#results').evaluate(e=>e===document.activeElement),true);
await p.getByLabel('Search the atlas').fill('zzzz-no-match');assert.equal(await p.locator('.card:visible').count(),0);assert.equal(await p.locator('#empty').isVisible(),true);await p.getByRole('button',{name:'Reset filters'}).click();await p.getByLabel('Families',{exact:true}).selectOption('editorial');assert.deepEqual((await p.locator('.card:visible').evaluateAll(cards=>cards.map(card=>card.dataset.style))).sort(),index.styles.filter(style=>style.family==='editorial').map(style=>style.id).sort());assert.match(p.url(),/family=editorial/);await p.reload();assert.equal(await p.getByLabel('Families',{exact:true}).inputValue(),'editorial');await p.getByRole('button',{name:'Reset filters'}).click();await p.getByRole('button',{name:'B',exact:true}).click();await p.getByRole('button',{name:'Mobile',exact:true}).click();assert.match(p.url(),/variant=b/);assert.match(p.url(),/viewport=mobile/);
for(const card of await p.locator('.card').all()){await card.scrollIntoViewIfNeeded();const img=card.locator('img');await img.evaluate(image=>image.decode());assert.ok(await img.evaluate(image=>image.naturalWidth>0));assert.match(await img.getAttribute('src'),/preview-alt-mobile.png$/);await card.locator('summary').click();assert.equal(await card.locator('details').getAttribute('open'),'');}
assert.equal(errors.length,0,errors.join('\n'));if(process.env.ATLAS_GALLERY_EVIDENCE){mkdirSync(process.env.ATLAS_GALLERY_EVIDENCE,{recursive:true});await p.goto(s.url);await p.evaluate(async()=>{for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode()));});await p.screenshot({path:process.env.ATLAS_GALLERY_EVIDENCE+'/gallery-mobile.png',fullPage:true,animations:'disabled'});await p.setViewportSize({width:1440,height:1000});await p.screenshot({path:process.env.ATLAS_GALLERY_EVIDENCE+'/gallery-desktop.png',fullPage:true,animations:'disabled'});}
}finally{await s.close();await b.close();}});
test('every built A/B reference loads its local styles and images under a subpath',{timeout:60000},async()=>{const b=await launchCanonical(),s=await serveGallery(undefined,{basePath:'/repo/'});try{for(const style of index.styles.filter(s=>!process.env.ATLAS_STYLE_SCOPE||JSON.parse(process.env.ATLAS_STYLE_SCOPE).includes(s.id)))for(const variant of style.variants){const p=await b.newPage({viewport:{width:360,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url());});await p.goto(s.url+variant.reference_path,{waitUntil:'networkidle'});assert.equal(errors.length,0,errors.join('\n'));assert.equal(await p.locator('h1').count(),1);assert.equal(await p.locator('body').evaluate(e=>getComputedStyle(e).margin),'0px');assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await p.close();}}finally{await s.close();await b.close();}});

test('comparison, chosen variant, URL restoration and both clipboard paths work',{timeout:60000},async()=>{const b=await launchCanonical(),s=await serveGallery(undefined,{basePath:'/atlas/'});try{const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedSelection=text;}}}));await p.goto(s.url,{waitUntil:'networkidle'});for(const style of index.styles.slice(0,3))await p.getByLabel('Compare '+style.name,{exact:true}).check();assert.equal(await p.locator('.compare-card').count(),3);if(index.styles.length>3)for(const choice of await p.locator('.compare-choice:not(:checked)').all())assert.ok(await choice.isDisabled());await p.locator('[data-style="swiss-grid"] .choose-style').click();await p.getByRole('button',{name:'B',exact:true}).click();await p.getByRole('button',{name:'Mobile',exact:true}).click();await p.getByRole('button',{name:'Copy selection prompt',exact:true}).click();await p.waitForFunction(()=>window.copiedSelection?.includes('Composition: B'));const copied=await p.evaluate(()=>window.copiedSelection);assert.match(copied,/Primary style ID: swiss-grid/);assert.match(copied,/https:\/\/github.com\/lmatukas\/web-style-atlas/);assert.match(copied,/reference\/alternate.html/);
await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('.compare-card').count(),3);assert.match(await p.locator('#chosen-variant').textContent(),/swiss-grid \/ Composition B/);assert.equal(await p.getByRole('button',{name:'Mobile',exact:true}).getAttribute('aria-pressed'),'true');await p.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw new Error('fixture denied');};});await p.getByRole('button',{name:'Copy selection prompt',exact:true}).click();assert.equal(await p.locator('#prompt-fallback').isVisible(),true);const selection=await p.locator('#selection-prompt').evaluate(e=>({start:e.selectionStart,end:e.selectionEnd,length:e.value.length}));assert.equal(selection.start,0);assert.equal(selection.end,selection.length);assert.match(await p.locator('#copy-status').textContent(),/Clipboard unavailable/);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.equal(errors.length,0,errors.join('\n'));
if(process.env.ATLAS_GALLERY_EVIDENCE){await p.locator('#comparison img').evaluateAll(async images=>{await Promise.all(images.map(i=>i.decode()));});await p.locator('#comparison').screenshot({path:process.env.ATLAS_GALLERY_EVIDENCE+'/comparison-mobile.png',animations:'disabled'});await p.setViewportSize({width:1440,height:1000});await p.locator('#comparison').screenshot({path:process.env.ATLAS_GALLERY_EVIDENCE+'/comparison-desktop.png',animations:'disabled'});}
await p.getByRole('button',{name:'Remove '+index.styles[0].name+' from comparison',exact:true}).click();assert.equal(await p.locator('.compare-card').count(),2);await p.getByRole('button',{name:'Clear comparison',exact:true}).click();assert.equal(await p.locator('#comparison').isVisible(),false);
}finally{await s.close();await b.close();}});

test('Prabanga filters tagged styles, combines with search, restores URLs and resets at desktop/mobile', { timeout: 60000 }, async () => {
  const browser = await launchCanonical(), server = await serveGallery(undefined, { basePath: '/luxury/' });
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const errors = []; page.on('pageerror', error => errors.push(error.message));
      await page.goto(server.url, { waitUntil: 'networkidle' });
      const filter = page.getByLabel('Prabanga', { exact: true });
      await filter.selectOption('1');
      assert.deepEqual((await page.locator('.card:visible').evaluateAll(cards => cards.map(c => c.dataset.style))).sort(), index.styles.filter(s => s.tags.includes('luxury')).map(s => s.id).sort());
      assert.match(page.url(), /luxury=1/);
      assert.equal(await page.locator('#empty').isVisible(), !index.styles.some(s => s.tags.includes('luxury')));
      await page.reload({ waitUntil: 'networkidle' }); assert.equal(await filter.inputValue(), '1');
      await page.getByRole('button', { name: 'Reset filters' }).click();
      assert.equal(await filter.inputValue(), ''); assert.doesNotMatch(page.url(), /luxury=/);
      assert.equal(await page.locator('.card:visible').count(), index.styles.length);
      // A response-only fixture makes one real card luxury without modifying
      // catalogue/style sources or falsely publishing a new ready direction.
      const sample = index.styles[0];
      await page.route(server.url + '*', async route => {
        if (route.request().resourceType() !== 'document') return route.continue();
        const response = await route.fetch(), html = await response.text();
        const data = structuredClone(index); data.styles.forEach(s => s.tags = s.tags.filter(t => t !== 'luxury')); data.styles[0].tags.push('luxury');
        await route.fulfill({ response, body: html.replace(/(<script id="atlas-data" type="application\/json">)[\s\S]*?(<\/script>)/, (_, start, end) => start + JSON.stringify(data).replaceAll('<', '\\u003c') + end) });
      });
      await page.reload({ waitUntil: 'networkidle' }); await filter.selectOption('1');
      assert.deepEqual(await page.locator('.card:visible').evaluateAll(cards => cards.map(c => c.dataset.style)), [sample.id]);
      await page.getByLabel('Search the atlas').fill(sample.name);
      await page.getByLabel('Families', { exact: true }).selectOption(sample.family);
      assert.equal(await page.locator('.card:visible').count(), 1);
      await page.reload({ waitUntil: 'networkidle' }); assert.equal(await filter.inputValue(), '1'); assert.equal(await page.locator('.card:visible').count(), 1);
      await page.getByLabel('Search the atlas').fill('zzzz-no-match'); assert.equal(await page.locator('#empty').isVisible(), true);
      await page.getByRole('button', { name: 'Reset filters' }).click();
      assert.equal(await filter.inputValue(), ''); assert.equal(await page.getByLabel('Search the atlas').inputValue(), '');
      assert.equal(await page.getByLabel('Families', { exact: true }).inputValue(), '');
      assert.equal(await page.locator('.card:visible').count(), index.styles.length);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      assert.deepEqual(errors, []);
      if (process.env.ATLAS_GALLERY_EVIDENCE) {
        mkdirSync(process.env.ATLAS_GALLERY_EVIDENCE, { recursive: true });
        await page.screenshot({ path: process.env.ATLAS_GALLERY_EVIDENCE + `/p26-filter-${width}.png`, animations: 'disabled' });
      }
      await page.close();
    }
  } finally { await server.close(); await browser.close(); }
});
