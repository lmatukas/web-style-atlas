import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {launchCanonical} from '../../scripts/previews.mjs';
import {servePreviews} from '../../scripts/preview-server.mjs';
import {runtimePage,probe} from '../../scripts/runtime-qa.mjs';
import {freezeClock} from '../../scripts/lib/clock.mjs';
const browser=await launchCanonical(),server=await servePreviews(process.cwd(),['obsidian-stage']);
const runtime={renderer:'webgl',audio:false,static_fallback:'assets/device.svg'};
let cases=0;
mkdirSync('test-results/s52',{recursive:true});
try{
 for(const variant of ['index.html','alternate.html']) {
  const url=`${server.origin}/styles/obsidian-stage/reference/${variant}`;
  for(const options of [{},{reduced:true},{webgl:false,audio:false}]) {await runtimePage(browser,url,runtime,options);cases++;console.log('runtime',variant,options);}
  for(const mode of ['normal','reduced','fallback']) {
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:mode==='reduced'?'reduce':'no-preference'});
   await probe(context,{webgl:mode!=='fallback'});const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));await freezeClock(page);await page.goto(url,{waitUntil:'networkidle'});await page.clock.runFor(1600);await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
   for(const model of ['01','02','03'])for(const finish of ['graphite','silver'])for(const storage of ['32','64','128']) {
    await page.locator(`input[name=model][value="${model}"]`).check();await page.locator(`input[name=finish][value="${finish}"]`).check();await page.locator(`input[name=storage][value="${storage}"]`).check();
    const expected=({'01':249,'02':349,'03':449})[model]+(finish==='silver'?20:0)+({'32':0,'64':40,'128':90})[storage];
    assert.equal(await page.locator('#total').textContent(),`${expected} €`);
    assert.equal(await page.evaluate(()=>atlasRuntime.state.finish),finish);assert.equal(await page.evaluate(()=>atlasRuntime.state.model),model);
   }
   await page.getByRole('button',{name:/Sukurti santrauką/}).click();assert.match(await page.locator('#form-error').textContent(),/Pažymėkite/);assert.equal(await page.locator('#ack').evaluate(e=>e===document.activeElement),true);
   await page.keyboard.press('Space');await page.getByRole('button',{name:/Sukurti santrauką/}).focus();await page.keyboard.press('Enter');assert.match(await page.locator('#confirmation').textContent(),/Veylqor 03 · Šerkšnas · 128 GB. Suma 559 €/);assert.match(await page.locator('#confirmation').textContent(),/Užsakymas nepateiktas/);
   await page.getByRole('button',{name:'Pradėti iš naujo'}).click();assert.equal(await page.locator('#total').textContent(),'249 €');assert.equal(await page.locator('#ack').isChecked(),false);assert.equal(await page.locator('#confirmation').textContent(),'');assert.equal(await page.evaluate(()=>atlasRuntime.state.finish),'graphite');
   await page.locator('[data-turn="1"]').focus();const before=await page.evaluate(()=>atlasRuntime.state.rotation);await page.keyboard.press('Enter');assert.ok((await page.evaluate(()=>atlasRuntime.state.rotation))>before);
   for(const width of [360,390,768,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${variant}/${mode}/${width} overflow`);}
   await page.evaluate(()=>scrollTo(0,0));await page.clock.runFor(100);await page.screenshot({path:`test-results/s52/${variant}-${mode}.png`,fullPage:false});
   if(mode==='normal') {
    const original=await page.locator('[data-runtime-scene]').screenshot();await page.locator('input[name=finish][value=silver]').check();await page.evaluate(()=>scrollTo(0,0));await page.clock.runFor(100);const changed=await page.locator('[data-runtime-scene]').screenshot();assert.ok(!original.equals(changed),'Finish must change actual pixels');
    if(variant==='index.html') {
     await page.locator('#chapter-1').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(80);assert.ok((await page.evaluate(()=>atlasRuntime.state.explosion))>.2,'Scroll must open physical layers');
     const open=await page.locator('[data-runtime-scene]').screenshot();await page.locator('#chapter-4').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(80);assert.ok((await page.evaluate(()=>atlasRuntime.state.explosion))<.1,'Final scene must close layers');assert.ok(!open.equals(await page.locator('[data-runtime-scene]').screenshot()));
    }
    await page.evaluate(()=>__capabilityProbe.contexts[0].getExtension('WEBGL_lose_context').loseContext());await page.waitForFunction(()=>atlasRuntime.state.mode==='fallback');assert.ok(await page.locator('[data-runtime-fallback]').isVisible());await page.locator('input[name=storage][value="64"]').check();assert.equal(await page.locator('#total').textContent(),'309 €');
   }
   assert.deepEqual(errors,[]);await context.close();cases++;console.log('business',variant,mode,'18 combinations, reset, keyboard, four widths, pixels/layers/fallback');
  }
 }
 console.log(`PASS: ${cases} S52 runtime/business cases; 108 exact price calculations.`);
}finally{await browser.close();await server.close();}
