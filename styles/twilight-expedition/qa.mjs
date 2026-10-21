// Actual browser acceptance, not used by the published reference pages.
import assert from 'node:assert/strict';
import {launchCanonical} from '../../scripts/previews.mjs';
import {servePreviews} from '../../scripts/preview-server.mjs';
import {runtimePage,probe} from '../../scripts/runtime-qa.mjs';
import {freezeClock} from '../../scripts/lib/clock.mjs';
const browser=await launchCanonical(),server=await servePreviews(process.cwd(),['twilight-expedition']);let cases=0;
try{
for(const variant of ['index.html','alternate.html']){
 const url=`${server.origin}/styles/twilight-expedition/reference/${variant}`;
 for(const options of [{},{reduced:true},{webgl:false,audio:false}]){await runtimePage(browser,url,{renderer:'webgl',audio:false},options);cases++;console.log('runtime',variant,JSON.stringify(options));}
 for(const mode of ['normal','reduced','fallback']){
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:mode==='reduced'?'reduce':'no-preference'});await probe(context,{webgl:mode!=='fallback'});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async t=>window.copied=t}}));await freezeClock(page);await page.goto(url,{waitUntil:'networkidle'});await page.clock.runFor(1900);
  if(mode==='normal'){
   const before=await page.locator('[data-runtime-scene]').screenshot();await page.locator('#night').click();await page.clock.runFor(800);assert.ok((await page.evaluate(()=>atlasRuntime.state.light))>.2);assert.ok(!before.equals(await page.locator('[data-runtime-scene]').screenshot()));
   await page.locator('[data-motion-toggle]').click();const frames=await page.evaluate(()=>atlasRuntime.state.frames);await page.clock.runFor(400);assert.equal(await page.evaluate(()=>atlasRuntime.state.frames),frames);await page.locator('[data-motion-toggle]').click();await page.clock.runFor(1600);assert.equal(await page.evaluate(()=>atlasRuntime.state.progress),1);assert.equal(await page.evaluate(()=>atlasRuntime.state.light),1);await page.locator('#night').click();await page.clock.runFor(2200);assert.ok(Math.abs((await page.evaluate(()=>atlasRuntime.state.light))-.2)<1e-6);
   if(variant==='index.html'){const first=page.locator('[data-chapter="0"]'),last=page.locator('[data-chapter="2"]');await first.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(80);await page.clock.runFor(800);const c1=await page.evaluate(()=>atlasRuntime.state.camera);await last.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(80);await page.clock.runFor(800);const c2=await page.evaluate(()=>atlasRuntime.state.camera);assert.ok(c1<c2,`chapter camera ${c1} -> ${c2}`);}
  }
  for(const route of ['ridge','valley','dome']){await page.locator('#route').selectOption(route);for(const n of[30,60,90,120]){await page.locator('#duration').focus();await page.keyboard.press('Home');for(let step=30;step<n;step+=30)await page.keyboard.press('ArrowRight');await page.locator('#people').fill('8');assert.match(await page.locator('#total').textContent(),/8 dalyviai/);assert.match(await page.locator('#stop-list').textContent(),new RegExp(`${n} min.`));}}
  await page.locator('[data-stop="1"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[data-stop="1"]').getAttribute('aria-pressed'),'true');assert.match(await page.locator('#stop-detail').textContent(),/Kupolo prieigos/);
  await page.locator('#duration').focus();await page.keyboard.press('Home');assert.equal(await page.locator('#duration').inputValue(),'30');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#duration').inputValue(),'60');
  await page.locator('#people').fill('0');assert.equal(await page.locator('#people').evaluate(e=>e.checkValidity()),false);await page.locator('#people').fill('2');
  await page.locator('#name').fill('   ');await page.locator('#email').fill('zmogus@example.test');await page.locator('button[type=submit]').click();assert.equal(await page.locator('#draft').inputValue(),'');
  await page.locator('#name').fill('Ąžuolas Šimkus');await page.locator('button[type=submit]').click();const draft=await page.locator('#draft').inputValue();assert.match(draft,/Ąžuolas Šimkus/);assert.match(draft,/Kupolo takas/);assert.match(draft,/60 min./);assert.match(draft,/Dalyviai: 2/);await page.locator('#copy').click();assert.equal(await page.evaluate(()=>window.copied),draft);
  await page.locator('#route').selectOption('valley');assert.match(await page.locator('#draft').inputValue(),/Tylos slėnis/);assert.ok(!(await page.locator('#draft').inputValue()).includes('Kupolo takas'));
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined}));await page.locator('#copy').click();assert.equal(await page.locator('#draft').evaluate(e=>e.selectionEnd-e.selectionStart), (await page.locator('#draft').inputValue()).length);assert.match(await page.locator('#copy-status').textContent(),/ranka/);
  for(const width of[360,390,768,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.equal(await page.locator('#people').isVisible(),true);}
  if(mode!=='fallback'){await page.evaluate(()=>__capabilityProbe.contexts[0].getExtension('WEBGL_lose_context').loseContext());await page.waitForFunction(()=>atlasRuntime.state.mode==='fallback');assert.ok(await page.locator('[data-runtime-fallback]').isVisible());await page.locator('#route').selectOption('ridge');assert.match(await page.locator('#draft').inputValue(),/Gintaro ketera/);}
  assert.deepEqual(errors,[]);await context.close();cases++;console.log('business',variant,mode);
 }
}
console.log(`PASS: ${cases} A/B actual runtime/business cases; all routes/durations, keyboard, drafts, fallback and four widths.`);
}finally{await server.close();await browser.close();}
