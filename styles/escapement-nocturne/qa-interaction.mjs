// S54 gesture, actual scroll pixels, live preference changes and resource ownership.
import assert from 'node:assert/strict';
import { launchCanonical } from '../../scripts/previews.mjs';
import { servePreviews } from '../../scripts/preview-server.mjs';
import { probe } from '../../scripts/runtime-qa.mjs';
import { freezeClock } from '../../scripts/lib/clock.mjs';
const ID='escapement-nocturne',browser=await launchCanonical(),server=await servePreviews(process.cwd(),[ID]);
try{
 for(const variant of ['index','alternate']){
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'no-preference'});await probe(context,{audio:false});
  const page=await context.newPage();await page.goto(`${server.origin}/styles/${ID}/reference/${variant}.html`,{waitUntil:'networkidle'});await page.waitForTimeout(1900);await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  const cdp=await context.newCDPSession(page),box=await page.locator('[data-runtime-scene]').boundingBox(),y=Math.min(700,box.y+box.height*.5);
  await page.locator('[data-runtime-scene]').focus();await page.keyboard.press('Home');await page.evaluate(()=>scrollTo(0,0));
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:95,y}]});for(const x of [125,160,200,245])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  assert.ok((await page.evaluate(()=>atlasRuntime.state.reveal))>.2,'real touch opens the mechanism');
  await page.evaluate(()=>scrollTo(0,0));const scroll=await page.evaluate(()=>scrollY);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:190,y:650}]});for(const ty of [610,565,510,450])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:190,y:ty}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(300);
  assert.ok((await page.evaluate(()=>scrollY))>scroll,'vertical touch still scrolls the page');
  if(variant==='alternate')await page.check('input[name=case][value=bronze]');
  const beforeDelete=await page.evaluate(()=>__capabilityProbe.deletes);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>atlasRuntime.state.mode==='fallback');assert.ok((await page.evaluate(()=>__capabilityProbe.deletes))>beforeDelete,'preference switch releases GPU');assert.ok(await page.locator('[data-runtime-fallback]').isVisible());
  if(variant==='alternate'){await page.check('input[name=strap][value=mesh]');assert.equal(await page.locator('#total').textContent(),'7 880 €');}
  const frames=await page.evaluate(()=>atlasRuntime.state.frames);await page.waitForTimeout(2500);assert.equal(await page.evaluate(()=>atlasRuntime.state.frames),frames,'reduced mode has no render loop');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForFunction(()=>atlasRuntime.state.mode==='webgl');await page.waitForTimeout(1600);if(variant==='alternate')assert.deepEqual(await page.evaluate(()=>atlasRuntime.state.config),{case:'bronze',dial:'black',strap:'mesh'});
  await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(30);const hiddenFrames=await page.evaluate(()=>atlasRuntime.state.frames);await page.waitForTimeout(2100);assert.equal(await page.evaluate(()=>atlasRuntime.state.frames),hiddenFrames,'offscreen clock stops');
  await page.evaluate(()=>dispatchEvent(new Event('pagehide')));assert.equal(await page.evaluate(()=>atlasRuntime.state.disposed),true);await context.close();console.log('PASS',variant,'real touch, vertical scroll, preference switch, retained choices, offscreen and disposal');
 }
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'}),page=await context.newPage();await page.goto(`${server.origin}/styles/${ID}/reference/index.html`,{waitUntil:'networkidle'});await page.waitForTimeout(1600);await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
 const before=await page.locator('[data-runtime-scene]').screenshot();await page.evaluate(()=>scrollTo(0,1100));await page.waitForTimeout(60);assert.ok((await page.evaluate(()=>atlasRuntime.state.reveal))>.4,'desktop scroll reveals the dial');assert.ok(!before.equals(await page.locator('[data-runtime-scene]').screenshot()),'scroll changes actual watch pixels');
 await page.locator('[data-motion-toggle]').click();const reveal=await page.evaluate(()=>atlasRuntime.state.reveal);await page.evaluate(()=>scrollTo(0,1400));await page.waitForTimeout(20);assert.equal(await page.evaluate(()=>atlasRuntime.state.reveal),reveal,'pause also freezes scroll-linked motion');await context.close();console.log('PASS desktop scroll pixel change and paused reveal');
}finally{await browser.close();await server.close();}
