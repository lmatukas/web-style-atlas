import assert from 'node:assert/strict';
import {launchCanonical} from '../../scripts/previews.mjs';
import {servePreviews} from '../../scripts/preview-server.mjs';
import {probe} from '../../scripts/runtime-qa.mjs';
const browser=await launchCanonical(),server=await servePreviews(process.cwd(),['obsidian-stage']);
try{
 for(const variant of ['index','alternate']){
  const c=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'no-preference'});await probe(c);const p=await c.newPage();
  await p.goto(`${server.origin}/styles/obsidian-stage/reference/${variant}.html`,{waitUntil:'networkidle'});await p.waitForFunction(()=>atlasRuntime.state.progress===1);
  const cd=await c.newCDPSession(p),rect=await p.locator('[data-runtime-scene]').boundingBox(),y=Math.min(650,rect.y+rect.height*.5);
  const before=await p.evaluate(()=>atlasRuntime.state.rotation);
  await cd.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:150,y}]});
  await cd.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:225,y}]});
  await cd.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  assert.ok((await p.evaluate(()=>atlasRuntime.state.rotation))>before,'Real touch swipe rotates the object');
  await p.locator('[data-motion-toggle]').click();assert.equal(await p.locator('[data-motion-toggle]').getAttribute('aria-pressed'),'true');
  const frozen=await p.evaluate(()=>({frames:atlasRuntime.state.frames,explosion:atlasRuntime.state.explosion}));
  if(variant==='index'){await p.locator('#chapter-2').evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await p.waitForTimeout(100);assert.equal(await p.evaluate(()=>atlasRuntime.state.explosion),frozen.explosion,'Paused scroll must not separate layers');}
  await p.locator('[data-motion-toggle]').click();assert.equal(await p.locator('[data-motion-toggle]').getAttribute('aria-pressed'),'false');
  // A runtime preference change must dispose resources and present the complete SVG.
  await p.emulateMedia({reducedMotion:'reduce'});await p.waitForFunction(()=>atlasRuntime.state.mode==='fallback');assert.ok(await p.locator('[data-runtime-fallback]').isVisible());assert.ok(await p.evaluate(()=>__capabilityProbe.deletes>0));
  await p.locator('input[name=model][value="03"]').check();assert.equal(await p.locator('#total').textContent(),'€449');
  await p.emulateMedia({reducedMotion:'no-preference'});await p.waitForFunction(()=>atlasRuntime.state.mode==='webgl');assert.equal(await p.evaluate(()=>atlasRuntime.state.model),'03');
  await p.evaluate(()=>dispatchEvent(new Event('pagehide')));assert.equal(await p.evaluate(()=>atlasRuntime.state.disposed),true);
  await c.close();console.log('PASS',variant,'real touch, pause, live reduced-motion transition, GPU disposal and retained selection');
 }
}finally{await browser.close();await server.close();}
