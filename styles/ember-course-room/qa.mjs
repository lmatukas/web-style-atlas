// Focused S62 business acceptance. Run: node styles/ember-course-room/qa.mjs
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {launchCanonical} from '../../scripts/previews.mjs';
import {servePreviews} from '../../scripts/preview-server.mjs';
import {available,bounds,courses,dateState,endTime,firstDate,formatDate,shiftDate,slots,tables} from './reference/data.mjs';
const root=resolve(fileURLToPath(new URL('../../',import.meta.url)));
const fixed=bounds(new Date('2026-01-01T12:00:00'));
let inventory=0,browserCases=0;
assert.equal(courses.length,10);assert.equal(tables.reduce((n,t)=>n+t.capacity,0),24);
assert.equal(endTime('19:30'),'22:00');assert.equal(endTime('20:00'),'22:30');
for(const bad of ['', '2026-02-30','2026-13-01','2026-01-01','2026-03-03'])assert.equal(dateState(bad,fixed),'invalid');
for(let d=0;d<60;d++)for(let guests=1;guests<=6;guests++)for(const time of slots){
 const iso=shiftDate(fixed.min,d),free=available(iso,time,guests,fixed);
 assert.equal(new Set(free.map(t=>t.id)).size,free.length);
 assert.ok(free.every(t=>tables.some(actual=>actual.id===t.id)&&t.capacity>=guests));
 if(new Date(iso+'T12:00:00').getDay()===1||time==='20:00'||dateState(iso,fixed)==='full')assert.equal(free.length,0);
 inventory++;
}
for(const guests of [0,7,2.5,NaN])assert.deepEqual(available(firstDate(fixed),'18:00',guests,fixed),[]);
const browser=await launchCanonical(),server=await servePreviews(root,['ember-course-room']);
try{
 for(const file of ['index','alternate'])for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce',hasTouch:width===390});
  const page=await context.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{const u=new URL(route.request().url());if(u.origin!==server.origin){errors.push('external '+u.href);return route.abort();}if(route.request().method()!=='GET')requests.push(route.request().method());return route.continue();});
  await page.goto(`${server.origin}/styles/ember-course-room/reference/${file}.html`,{waitUntil:'networkidle'});
  const form=page.locator('[data-booking] form'),date=page.locator('#date'),guests=page.locator('#guests'),note=page.locator('#allergies'),confirmation=page.locator('[data-confirmation]');
  await page.getByRole('button',{name:'Peržiūrėti rezervaciją'}).click();assert.match(await page.locator('[data-field-error="time"]').textContent(),/Pasirinkite/);assert.equal(await page.locator('[name="time"]:checked').count(),0);
  const initial=await date.inputValue(),range={min:await date.getAttribute('min'),max:await date.getAttribute('max')};
  let monday=range.min;while(new Date(monday+'T12:00:00').getDay()!==1)monday=shiftDate(monday,1);
  await date.fill(monday);await date.blur();assert.match(await page.locator('[data-availability]').textContent(),/Pirmadieniais/);assert.equal(await page.locator('[name="time"]:not(:disabled)').count(),0);
  let fullDate=range.min;while(dateState(fullDate,range)!=='full')fullDate=shiftDate(fullDate,1);
  await date.fill(fullDate);await date.blur();assert.match(await page.locator('[data-availability]').textContent(),/užpildytas/);assert.equal(await page.locator('[name="time"]:not(:disabled)').count(),0);
  await date.fill(shiftDate(range.min,-1));await date.blur();await page.getByRole('button',{name:'Peržiūrėti rezervaciją'}).click();assert.equal(await date.getAttribute('aria-invalid'),'true');
  await date.fill(initial);await date.blur();
  const pick=async locator=>{if(width===390)await locator.tap();else await locator.click();};
  const time=page.locator('[name="time"]:not(:disabled)').first();await pick(time);let selectedTime=await time.inputValue();
  const small=page.locator('[name="table"]:not(:disabled)').first();await small.focus();await page.keyboard.press('Space');assert.equal(await small.isChecked(),true);
  await guests.selectOption('6');assert.equal(await page.locator('[name="time"]:checked').count(),0);assert.equal(await page.locator('[name="table"]:checked').count(),0);
  const sixTime=page.locator('[name="time"]:not(:disabled)').first();await sixTime.focus();await page.keyboard.press('Space');selectedTime=await sixTime.inputValue();
  const freeTables=await page.locator('[name="table"]:not(:disabled)').evaluateAll(inputs=>inputs.map(i=>i.value));assert.ok(freeTables.length>0&&freeTables.every(id=>tables.find(t=>t.id===id).capacity>=6));
  const sixTable=page.locator('[name="table"]:not(:disabled)').first();await pick(sixTable);
  const alternateTime=await page.locator('[name="time"]:not(:disabled)').evaluateAll((inputs,current)=>inputs.find(i=>i.value!==current)?.value,selectedTime);
  if(alternateTime){await pick(page.locator(`[name="time"][value="${alternateTime}"]`));assert.equal(await page.locator('[name="table"]:checked').count(),0);selectedTime=alternateTime;}
  const finalTable=page.locator('[name="table"]:not(:disabled)').first();await pick(finalTable);const tableId=await finalTable.inputValue();
  const injected='<img src=x onerror="window.s62Injected=true"> ĄČĘĖĮŠŲŪŽ ąčęėįšųūž';await note.fill(injected);await page.locator('#pairing').selectOption('free');
  await page.getByRole('button',{name:'Peržiūrėti rezervaciją'}).click();assert.match(await page.locator('[data-field-error="demo"]').textContent(),/Pažymėkite/);
  await page.locator('[name="demo"]').check();await page.getByRole('button',{name:'Peržiūrėti rezervaciją'}).click();assert.equal(await confirmation.isVisible(),true);
  const result=await confirmation.textContent();assert.ok(result.includes(formatDate(initial)));assert.ok(result.includes(`${selectedTime}–${endTime(selectedTime)}`));assert.ok(result.includes(`Stalas ${tableId}`));assert.ok(result.includes('Nealkoholinis derinimas'));assert.ok(result.includes(injected));assert.equal(await confirmation.locator('img').count(),0);assert.equal(await page.evaluate(()=>window.s62Injected),undefined);assert.match(result,/Stalas neužsakytas/);
  assert.equal(await confirmation.evaluate(e=>e===document.activeElement),true);
  await page.getByRole('button',{name:'Redaguoti pasirinkimus'}).click();assert.equal(await note.inputValue(),injected);assert.equal(await guests.inputValue(),'6');assert.equal(await page.locator('[name="table"]:checked').inputValue(),tableId);
  // Revalidation must reject inventory made stale after selection, even when
  // the change event was deliberately omitted by programmatic modification.
  await page.evaluate(iso=>{document.querySelector('#date').value=iso;},monday);await page.getByRole('button',{name:'Peržiūrėti rezervaciją'}).click();assert.equal(await confirmation.isVisible(),false);assert.equal(await date.getAttribute('aria-invalid'),'true');
  await date.fill(initial);await date.blur();await guests.selectOption('2');await pick(page.locator('[name="time"]:not(:disabled)').first());await pick(page.locator('[name="table"]:not(:disabled)').first());await note.fill('Riešutai');await page.locator('[name="demo"]').check();await page.getByRole('button',{name:'Peržiūrėti rezervaciją'}).click();
  await page.getByRole('button',{name:'Išvalyti santrauką'}).click();assert.equal(await confirmation.isVisible(),false);assert.equal(await note.inputValue(),'');assert.equal(await guests.inputValue(),'2');assert.equal(await page.locator('[name="table"]:checked').count(),0);assert.equal(await page.locator('[name="demo"]').isChecked(),false);assert.equal(await confirmation.locator('dd').count(),0);
  if(file==='index'){
   await page.locator('[data-course-record="0"]').evaluate(e=>e.scrollIntoView({block:'center'}));await page.waitForFunction(()=>document.querySelector('[data-course-count]').textContent==='01 / 10');
   await page.getByRole('button',{name:'Kitas patiekalas',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-course-count]').textContent==='02 / 10');
   await page.locator('[data-course-record="8"]').evaluate(e=>e.scrollIntoView({block:'center'}));await page.waitForFunction(()=>document.querySelector('[data-course-count]').textContent==='09 / 10');assert.match(await page.locator('[data-course-photo]').getAttribute('src'),/pear/);
   await page.getByRole('button',{name:'Sustabdyti šviesą'}).click();const warmth=await page.evaluate(()=>document.documentElement.style.getPropertyValue('--evening'));await page.getByRole('button',{name:'Ankstesnis patiekalas'}).click();assert.equal(await page.evaluate(()=>document.documentElement.style.getPropertyValue('--evening')),warmth);
  }else{
   await pick(page.locator('[data-course-jump="9"]'));assert.equal(await page.locator('[data-course-jump="9"]').getAttribute('aria-pressed'),'true');assert.match(await page.locator('[data-course-photo]').getAttribute('src'),/pear/);assert.equal(await page.locator('[data-course-time]').textContent(),'20:42');
   await page.getByRole('button',{name:'Sustabdyti šviesą'}).click();const warmth=await page.evaluate(()=>document.documentElement.style.getPropertyValue('--evening'));await pick(page.locator('[data-course-jump="0"]'));assert.equal(await page.evaluate(()=>document.documentElement.style.getPropertyValue('--evening')),warmth);
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
  await context.close();browserCases++;console.log(`PASS ${file}/${width}: booking errors, inventory, keyboard/touch, exact summary, edit/reset, stale revalidation, safe notes and signature`);
 }
 for(const file of ['index','alternate']){
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();await page.goto(`${server.origin}/styles/ember-course-room/reference/${file}.html`);assert.equal(await page.locator('[data-booking-fields]').getAttribute('disabled'),'');assert.equal(await page.locator('[type="submit"]').isDisabled(),true);assert.equal(await page.locator('noscript').isVisible(),true);if(file==='index')assert.equal(await page.locator('[data-course-record]').count(),10);await context.close();browserCases++;
 }
 console.log(`PASS S62: ${inventory} date/party/time inventory cases; ${browserCases} complete service/no-JS browser cases.`);
}finally{await browser.close();await server.close();}
