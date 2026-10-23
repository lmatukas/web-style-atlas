import assert from 'node:assert/strict';
import {launchCanonical} from '../../scripts/previews.mjs';
import {servePreviews} from '../../scripts/preview-server.mjs';
import {runtimePage} from '../../scripts/runtime-qa.mjs';
import {inspectPage} from '../../scripts/browser-qa.mjs';
import {readFileSync} from 'node:fs';
const runtime=JSON.parse(readFileSync(new URL('./runtime.json',import.meta.url)));
const browser=await launchCanonical(), server=await servePreviews(process.cwd(),['still-sanctuary']);
let cases=0,errorsChecked=0;
try {
 for (const file of ['index.html','alternate.html']) {
  const url=server.origin+'/styles/still-sanctuary/reference/'+file;
  for (const options of [{},{reduced:true},{webgl:false,audio:false}]) {await runtimePage(browser,url,runtime,options);cases++;}
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce',hasTouch:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url,{waitUntil:'networkidle'});
  for(const [period,image,phrase] of [['morning','forest','Rytas'],['day','pavilion','Diena'],['evening','lake','Vakaras']]) {
   await page.locator(`[data-period="${period}"]`).tap();
   assert.equal(await page.locator('body').getAttribute('data-light'),period);
   assert.match(await page.locator('[data-ritual-image]').getAttribute('src'),new RegExp(image));
   assert.match(await page.locator('[data-ritual-title]').textContent(),new RegExp(phrase));
   assert.equal(await page.locator('[aria-pressed="true"][data-period]').count(),1);
   await inspectPage(page,{label:file+'/'+period});
  }
  await page.locator('[data-period="morning"]').focus();await page.keyboard.press('Enter');
  assert.equal(await page.locator('body').getAttribute('data-light'),'morning');
  // No-JS form remains honest; JS provides validation and the exact local summary.
  async function submitError(pattern,field) {
   await page.locator('[type="submit"]').click();
   assert.match(await page.locator('#form-error').textContent(),pattern);
   assert.equal(await page.locator(field).evaluate(e=>e===document.activeElement),true);
   assert.equal(await page.locator('#confirmation').isVisible(),false);errorsChecked++;
  }
  await submitError(/regioną/,'#region');
  await page.locator('#region').selectOption('water');await submitError(/datas/,'#arrival');
  await page.locator('#arrival').fill('2020-01-01');await page.locator('#departure').fill('2027-05-10');await submitError(/praeityje/,'#arrival');
  await page.locator('#arrival').fill('2027-05-10');await page.locator('#departure').fill('2027-05-10');await submitError(/vėliau/,'#departure');
  await page.locator('#departure').fill('2027-05-09');await submitError(/vėliau/,'#departure');
  await page.locator('#departure').fill('2027-06-01');await submitError(/21 nakties/,'#departure');
  await page.locator('#departure').fill('2027-05-13');await submitError(/ritualą/,'#walk');
  await page.locator('#walk').check();await submitError(/demonstracijos/,'#demo');
  await page.locator('#demo').check();await page.locator('[name="ritual"][value="tea"]').check();await page.locator('[type="submit"]').click();
  const summary=await page.locator('#confirmation').textContent();
  for(const value of ['Ežero pakrantė','2027-05-10','2027-05-13','Naktys: 3','Miško pasivaikščiojimas','Vakaro arbata','neišsiųsta','nerezervuota'])assert.ok(summary.includes(value),value);
  assert.equal(await page.locator('#confirmation').evaluate(e=>e===document.activeElement),true);
  await page.locator('#region').selectOption('garden');assert.equal(await page.locator('#confirmation').isVisible(),false);
  // Independent UTC date arithmetic, across leap day and the maximum duration.
  for(const [arrival,departure,nights] of [['2028-02-28','2028-03-01',2],['2027-12-31','2028-01-01',1],['2027-04-01','2027-04-22',21]]) {
   await page.locator('#arrival').fill(arrival);await page.locator('#departure').fill(departure);await page.locator('[type="submit"]').click();
   assert.match(await page.locator('#confirmation').textContent(),new RegExp('Naktys: '+nights+'\\.'));
  }
  await page.locator('[type="reset"]').click();
  assert.equal(await page.locator('#region').inputValue(),'');assert.equal(await page.locator('#arrival').inputValue(),'');assert.equal(await page.locator('[name="ritual"]:checked').count(),0);assert.equal(await page.locator('#demo').isChecked(),false);assert.equal(await page.locator('#confirmation').isVisible(),false);
  if(file==='index.html'){await page.locator('[data-region="forest"]').click();assert.equal(await page.locator('#region').inputValue(),'forest');}
  for(const width of [360,390,768,1440]) {
   await page.setViewportSize({width,height:1000});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await page.evaluate(()=>scrollTo(0,0));
   assert.ok(await page.locator('.hero>img').evaluate(e=>e.getBoundingClientRect().height>=innerHeight*.7));
   assert.equal(await page.locator('.hero h1').count(),1);
  }
  assert.deepEqual(errors,[]);cases++;await page.close();
  const normal=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'});
  await normal.goto(url,{waitUntil:'domcontentloaded'});await normal.locator('[data-motion-toggle]').click();
  assert.equal(await normal.evaluate(()=>window.atlasRuntime.state.active),false);
  const frames=await normal.evaluate(()=>window.atlasRuntime.state.frames);await normal.waitForTimeout(100);assert.equal(await normal.evaluate(()=>window.atlasRuntime.state.frames),frames);
  await normal.emulateMedia({reducedMotion:'reduce'});await normal.waitForTimeout(50);
  assert.equal(await normal.evaluate(()=>window.atlasRuntime.state.progress),1);assert.equal(await normal.evaluate(()=>window.atlasRuntime.state.active),false);
  await normal.evaluate(()=>dispatchEvent(new Event('pagehide')));assert.equal(await normal.evaluate(()=>window.atlasRuntime.state.disposed),true);
  cases++;await normal.close();
 }
 console.log(`PASS S56: ${cases} cases, ${errorsChecked} focused validation errors; touch+keyboard ritual, 6 colour-mode axe pages, 8 viewport checks, exact leap/year/max-night summaries, reset, pause/preference/disposal.`);
} finally {await browser.close();await server.close();}
