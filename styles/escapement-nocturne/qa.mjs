// S54: real APIs/pixels, 81 independent totals, booking errors, glyphs and widths.
import assert from 'node:assert/strict';
import { launchCanonical } from '../../scripts/previews.mjs';
import { servePreviews } from '../../scripts/preview-server.mjs';
import { runtimePage, probe } from '../../scripts/runtime-qa.mjs';
import { inspectPage } from '../../scripts/browser-qa.mjs';
import { verifyStaticFallbacks } from '../../scripts/luxury-previews.mjs';
import { freezeClock } from '../../scripts/lib/clock.mjs';
const ID='escapement-nocturne',browser=await launchCanonical(),server=await servePreviews(process.cwd(),[ID]);
const runtime={renderer:'webgl',audio:false,static_fallback:'assets/watch.svg'};
const cases=['gold','steel','bronze'],dials=['black','blue','ivory'],straps=['black','brown','mesh'];
const casePrice=[1600,0,600],dialPrice=[0,250,350],strapPrice=[0,180,480];
const money=n=>`${new Intl.NumberFormat('lt-LT',{maximumFractionDigits:0}).format(n)} €`;
let prices=0,checks=0;
async function booking(page){
 const submit=page.getByRole('button',{name:'Parengti vizito patvirtinimą'});
 await submit.click();assert.equal(await page.locator('[aria-invalid=true]').count(),6);assert.equal(await page.evaluate(()=>document.activeElement.id),'salon');
 await page.selectOption('#salon','north');await page.selectOption('#slot','11:30');
 await page.fill('#name','A');await page.fill('#email','netinka');await submit.click();
 assert.match(await page.locator('#error-name').textContent(),/bent 2/);assert.match(await page.locator('#error-email').textContent(),/el. pašto/);
 for(const [day,expected]of [['2025-12-31',/rytojaus/],['2026-01-04',/Sekmadieniais/],['2026-05-01',/90 dienų/]]){await page.fill('#day',day);await submit.click();assert.match(await page.locator('#error-day').textContent(),expected);}
 assert.equal(await page.locator('#slot option[value="14:00"]').isDisabled(),true);
 await page.fill('#day','2026-01-02');await page.fill('#name','Ąžuolas');await page.fill('#email','azuolas@pavyzdys.lt');await page.check('#ack');
 await submit.focus();await page.keyboard.press('Enter');
 const confirmation=page.locator('#visit-confirmation'),text=await confirmation.textContent();
 assert.match(text,/Šiaurės salonas · Vilnius/);assert.match(text,/2026-01-02 · 11:30/);assert.match(text,/niekur neišsiųsti/);assert.match(text,/N.01/);assert.equal(await page.evaluate(()=>document.activeElement.id),'visit-confirmation');
 if(await page.locator('#total').count())assert.ok(text.includes(await page.locator('#total').textContent()),'booking carries the exact total');
 await page.fill('#name','Ona');assert.equal(await confirmation.isVisible(),false,'editing invalidates confirmation');
 await submit.click();assert.ok(await confirmation.isVisible());await page.getByRole('button',{name:'Išvalyti',exact:true}).click();assert.equal(await confirmation.isVisible(),false);assert.equal(await confirmation.textContent(),'');assert.equal(await page.locator('#name').inputValue(),'');assert.equal(await page.locator('#salon').inputValue(),'');
}
try{
 for(const variant of ['index','alternate']){
  const url=`${server.origin}/styles/${ID}/reference/${variant}.html`;
  for(const options of [{},{reduced:true},{webgl:false,audio:false}]){await runtimePage(browser,url,runtime,options);checks++;}
  for(const mode of ['normal','reduced','fallback']){
   const context=await browser.newContext({viewport:{width:390,height:844},timezoneId:'UTC',reducedMotion:mode==='reduced'?'reduce':'no-preference'});await probe(context,{webgl:mode!=='fallback',audio:false});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await context.route('**/*',r=>new URL(r.request().url()).origin===server.origin?r.continue():(errors.push('external request'),r.abort()));
   await freezeClock(page,'2026-01-01T09:14:36.000Z');await page.goto(url,{waitUntil:'networkidle'});await page.clock.runFor(1900);await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
   assert.equal(await page.evaluate(()=>atlasRuntime.state.mode),mode==='normal'?'webgl':'fallback');
   if(mode==='normal'){const [h,m,s]=await page.evaluate(()=>atlasRuntime.state.clockAngles);assert.ok(h>277&&h<278,`hour angle ${h}`);assert.ok(m>87&&m<88);assert.equal(s,222);await page.clock.runFor(1000);assert.equal((await page.evaluate(()=>atlasRuntime.state.clockAngles))[2],228,'actual second advances');await page.locator('[data-motion-toggle]').click();const t=await page.locator('[data-clock]').textContent(),f=await page.evaluate(()=>atlasRuntime.state.frames);await page.clock.runFor(2100);assert.equal(await page.locator('[data-clock]').textContent(),t);assert.equal(await page.evaluate(()=>atlasRuntime.state.frames),f);await page.locator('[data-motion-toggle]').click();await page.clock.runFor(1600);assert.equal(await page.evaluate(()=>atlasRuntime.state.active),false);}
   if(variant==='alternate'){
    for(let c=0;c<3;c++)for(let d=0;d<3;d++)for(let s=0;s<3;s++){
     await page.check(`input[name=case][value=${cases[c]}]`);await page.check(`input[name=dial][value=${dials[d]}]`);await page.check(`input[name=strap][value=${straps[s]}]`);
     const expected=money(6800+casePrice[c]+dialPrice[d]+strapPrice[s]);assert.equal(await page.locator('#total').textContent(),expected);assert.equal(await page.locator('#summary-total').textContent(),expected);assert.deepEqual(await page.evaluate(()=>atlasRuntime.state.config),{case:cases[c],dial:dials[d],strap:straps[s]});prices++;
    }
    await page.getByRole('button',{name:'Atkurti pradinį derinį'}).click();assert.equal(await page.locator('#total').textContent(),money(8400));
    await page.evaluate(()=>scrollTo(0,0));await page.clock.runFor(20);const before=await page.locator('[data-runtime-scene]').screenshot();
    await page.check('input[name=dial][value=ivory]');await page.evaluate(()=>scrollTo(0,0));await page.clock.runFor(20);await page.locator('[data-runtime-fallback]').evaluate(async img=>{if(!img.hidden)await img.decode();});
    assert.ok(!before.equals(await page.locator('[data-runtime-scene]').screenshot()),`${mode}: a material choice changes real pixels`);
   }
   const scene=page.locator('[data-runtime-scene]');await scene.focus();await page.keyboard.press('Home');assert.equal(await page.evaluate(()=>atlasRuntime.state.reveal),0);await page.keyboard.press('End');assert.equal(await page.evaluate(()=>atlasRuntime.state.reveal),1);await page.keyboard.press('ArrowLeft');assert.equal(await page.evaluate(()=>atlasRuntime.state.reveal),.9);
   await page.locator('#reveal').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>atlasRuntime.state.reveal),.01,'native range keyboard interaction');
   await page.getByRole('button',{name:'Atverti mechanizmą'}).click();assert.equal(await page.evaluate(()=>atlasRuntime.state.reveal),1);
   await booking(page);
   if(mode==='normal'){
    await page.evaluate(()=>__capabilityProbe.contexts[0].getExtension('WEBGL_lose_context').loseContext());await page.clock.runFor(50);await page.waitForFunction(()=>atlasRuntime.state.mode==='fallback');assert.ok(await page.locator('[data-runtime-fallback]').isVisible());
    if(variant==='alternate'){await page.check('input[name=case][value=steel]');assert.equal(await page.locator('#total').textContent(),money(6800+350));}
   }
   for(const width of [360,390,768,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${variant}/${mode}/${width}: overflow`);}
   assert.deepEqual(errors,[]);await context.close();checks++;console.log('PASS business',variant,mode);
  }
  for(const width of [360,768,1440]){const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});await page.goto(url,{waitUntil:'networkidle'});await page.evaluate(async()=>{await document.fonts.ready;if([...document.fonts].some(f=>f.status==='error'))throw Error('font load failure');});await inspectPage(page,{label:`S54/${variant}/${width}`});await page.close();checks++;}console.log('PASS accessibility',variant,'360/768/1440');
 }
 await verifyStaticFallbacks({style:ID});console.log(`PASS: ${checks} S54 cases, ${prices} exact configuration prices, canonical browser, fallback preflight.`);
}finally{await browser.close();await server.close();}
