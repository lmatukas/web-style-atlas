import assert from 'node:assert/strict';
import {launchCanonical} from '../../../scripts/previews.mjs';
import {servePreviews} from '../../../scripts/preview-server.mjs';
import {inspectPage} from '../../../scripts/browser-qa.mjs';
const browser=await launchCanonical(),server=await servePreviews(process.cwd(),['patina-auction-room']);let checks=0;
const url=page=>server.origin+'/styles/patina-auction-room/reference/'+page;
try{
 const p=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await p.clock.install();await p.goto(url('index.html'));
 for(const cat of ['all','metal','antiquity'])for(const estimate of ['all','low','high']){await p.selectOption('#category',cat);await p.selectOption('#estimate',estimate);const actual=await p.locator('.lot:visible').count();const expected=cat==='all'?(estimate==='all'?3:estimate==='low'?2:1):cat==='metal'?(estimate==='high'?0:2):(estimate==='low'?0:1);assert.equal(actual,expected);checks++;}
 await p.click('#clear-filters');assert.equal(await p.locator('.lot:visible').count(),3);
 for(let slot=1;slot<=6;slot++)for(const guests of [1,4]){await p.locator('#view-form input[name=name]').fill('Ąžuolas Žilvinas');await p.locator('#view-form select').selectOption({index:slot});await p.locator('[name=guests]').fill(String(guests));await p.locator('[name=demo]').check();await p.locator('#view-form .primary').click();const summary=await p.locator('.confirmation').innerText();assert.ok(summary.includes('Ąžuolas Žilvinas'));assert.ok(summary.includes('visitors: '+guests));assert.ok(summary.includes(slot%2?'11:00':'15:00'),JSON.stringify({slot,guests,summary}));checks++;}
 for(const [field,value] of [['name','123'],['guests','0'],['guests','5'],['guests','1.5']]){await p.locator('#view-form button[type=reset]').click();await p.locator('[name=name]').fill('Jonas');await p.locator('[name=slot]').selectOption({index:1});await p.locator('[name=demo]').check();await p.locator(`[name=${field}]`).fill(value);await p.locator('#view-form .primary').click();assert.equal(await p.locator('.error').isVisible(),true);assert.equal(await p.locator('.confirmation').isVisible(),false);checks++;}
 await p.locator('#view-form button[type=reset]').click();await inspectPage(p,{label:'S59 A 390'});
 await p.close();
 for(const [id,start,step,title] of [['001',2200,200,'The long road'],['002',800,100,'Vessel of light'],['003',1200,100,'Bronze silence']]){
  const b=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await b.clock.install();await b.goto(url('alternate.html?lot='+id));assert.equal(await b.locator('[data-lot-title]').innerText(),title);assert.equal(Number(await b.locator('#amount').inputValue()),start+step);
  for(const amount of [start,start+step+1,0,1.5]){await b.locator('[name=name]').fill('Živilė');await b.locator('[name=demo]').check();await b.locator('#amount').fill(String(amount));await b.locator('#bid-form .primary').click();assert.equal(await b.locator('.error').isVisible(),true);checks++;}
  await b.locator('#amount').fill(String(start+step));await b.locator('#bid-form .primary').click();assert.ok((await b.locator('.confirmation').innerText()).includes('LOT '+id));assert.equal(Number(await b.locator('#amount').inputValue()),start+step*2);checks++;
  await b.locator('[name=name]').fill('Tomas');assert.equal(await b.locator('.confirmation').isVisible(),false);
  await b.click('#timer-pause');const before=await b.locator('[data-countdown]').innerText();await b.clock.runFor(5000);assert.equal(await b.locator('[data-countdown]').innerText(),before);await b.click('#timer-pause');await b.clock.runFor(181000);assert.equal(await b.locator('[data-countdown]').innerText(),'00:00');await b.locator('#bid-form .primary').click();assert.match(await b.locator('.error').innerText(),/time is over/);await b.click('#timer-extend');await b.locator('#bid-form .primary').click();assert.equal(await b.locator('.confirmation').isVisible(),true);checks++;
  await b.locator('#bid-form button[type=reset]').click();assert.equal(Number(await b.locator('#amount').inputValue()),start+step);assert.equal(await b.locator('[name=name]').inputValue(),'');assert.equal(await b.locator('.confirmation').isVisible(),false);
  await b.locator('#light').focus();await b.keyboard.press('ArrowRight');assert.ok(Number(await b.locator('#light').inputValue())>58);
  await b.locator('#zoom').fill('150');assert.equal(await b.locator('#zoom-value').innerText(),'150%');assert.equal(await b.locator('[data-runtime-scene]').evaluate(e=>e.style.getPropertyValue('--zoom')),'1.5');checks++;
  await inspectPage(b,{label:'S59 B '+id});await b.close();
 }
 const touch=await browser.newPage({viewport:{width:360,height:780},hasTouch:true,isMobile:true,reducedMotion:'reduce'});await touch.goto(url('alternate.html'));await touch.locator('#zoom').tap();await touch.mouse.wheel(0,550);assert.ok(await touch.evaluate(()=>scrollY)>0);assert.ok(await touch.locator('[data-runtime-scene]').evaluate(e=>e.getBoundingClientRect().height)>=546);await touch.close();checks++;
 console.log('PASS S59: '+checks+' focused combinations, plus exact summary/edit/reset/zoom/clock/keyboard/touch checks.');
}finally{await browser.close();await server.close();}
