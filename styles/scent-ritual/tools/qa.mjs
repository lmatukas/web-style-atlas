import assert from 'node:assert/strict';
import {launchCanonical} from '../../../scripts/previews.mjs';
import {servePreviews} from '../../../scripts/preview-server.mjs';
import {inspectPage} from '../../../scripts/browser-qa.mjs';
const b=await launchCanonical(),s=await servePreviews(process.cwd(),['scent-ritual']);
const url=f=>s.origin+'/styles/scent-ritual/reference/'+f;
const data=[['silkas','Aušros šilkas','Kriaušė · bergamotė','Irisas · baltoji arbata','Muskusas · šviesus medis'],['samanos','Tylos samanos','Žaliasis lapas · citrina','Figa · šalavijas','Samanos · kedras'],['gintaras','Lėtas gintaras','Kardamonas · apelsinas','Arbata · labdanas','Gintaro akordas · santalas'],['oras','Baltas oras','Citrina · rožinis pipiras','Nerolis · žalioji arbata','Baltasis muskusas · vetiverija']];
const expected=['silkas','silkas','silkas','silkas','silkas','silkas','silkas','silkas','silkas','oras','oras','oras','samanos','samanos','samanos','samanos','samanos','samanos','oras','oras','gintaras','samanos','samanos','gintaras','gintaras','gintaras','gintaras'];
let checks=0;
try {
 for(const file of ['index.html','alternate.html'])for(const width of [390,1440]){
  const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});await p.goto(url(file));
  if(file==='index.html')for(const[id,name,top,heart,base]of data){await p.locator(`[data-view=${id}]`).focus();await p.keyboard.press('Enter');assert.equal(await p.locator('[data-note-name]').textContent(),name);for(const[key,v]of [['top',top],['heart',heart],['base',base]])assert.equal(await p.locator(`[data-note-${key}]`).textContent(),v);assert.equal(await p.locator(`[data-view=${id}]`).getAttribute('aria-pressed'),'true');checks++;}
  for(let mask=1;mask<15;mask++){
   await p.locator('#kit-form button[type=reset]').click();const chosen=data.filter((d,i)=>mask&(1<<i));
   for(const[id]of chosen)await p.locator(`[data-pick=${id}]`).click();await p.locator('[name=demo]').check();await p.locator('#kit-form button[type=submit]').click();
   assert.ok(await p.locator('#confirmation').isVisible());const summary=await p.locator('#summary').innerText();for(const d of chosen)for(const value of d.slice(1))assert.ok(summary.includes(value),summary);assert.ok(summary.includes(`iš viso ${chosen.length*2} ml`));assert.equal(await p.locator('#tray .tray-item').count(),chosen.length);checks++;
  }
  await p.locator('#edit-kit').click();assert.equal(await p.locator('#confirmation').isVisible(),false);assert.equal(await p.locator('#tray .tray-item').count(),3);
  await p.locator('[data-pick=silkas]').click();assert.ok((await p.locator('#kit-error').innerText()).includes('tik 3'));assert.equal(await p.locator('#tray .tray-item').count(),3);checks++;
  await p.locator('[data-remove=samanos]').click();assert.equal(await p.locator('[data-pick=samanos]').evaluate(e=>e===document.activeElement),true);await p.locator('[data-pick=silkas]').click();assert.equal(await p.locator('#tray .tray-item').count(),3);checks++;
  await p.locator('#kit-form button[type=submit]').click();assert.ok(await p.locator('#confirmation').isVisible());await p.locator('[name=demo]').uncheck();assert.equal(await p.locator('#confirmation').isVisible(),false);await p.locator('#kit-form button[type=submit]').click();assert.ok(await p.locator('#kit-error').isVisible());assert.equal(await p.locator('[name=demo]').getAttribute('aria-invalid'),'true');checks++;
  await p.locator('#kit-form button[type=reset]').click();assert.equal(await p.locator('#tray .tray-item').count(),0);assert.equal(await p.locator('[name=demo]').isChecked(),false);await p.locator('#kit-form button[type=submit]').click();assert.ok((await p.locator('#kit-error').innerText()).includes('bent vieną'));checks++;
  await inspectPage(p,{label:file+'/'+width});await p.close();
 }
 for(const width of [390,1440]){
  const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});await p.goto(url('alternate.html'));
  await p.locator('#next').click();assert.ok(await p.locator('#quiz-error').isVisible());assert.equal(await p.locator('#answers input').first().evaluate(e=>e===document.activeElement),true);
  for(let a=0;a<3;a++)for(let c=0;c<3;c++)for(let d=0;d<3;d++){
   await p.locator('#reset-quiz').click();for(const value of [a,c,d]){await p.locator(`#answers input[value="${value}"]`).check();await p.locator('#next').click();}
   const id=expected[a*9+c*3+d],record=data.find(x=>x[0]===id);assert.equal(await p.locator('#result-name').innerText(),record[1],`${a}${c}${d}`);assert.equal(await p.locator('#reasons li').count(),3);for(const[key,v]of [['top',record[2]],['heart',record[3]],['base',record[4]]])assert.equal(await p.locator(`[data-note-${key}]`).textContent(),v);assert.equal(await p.locator('#result').evaluate(e=>e===document.activeElement),true);checks++;
  }
  await p.locator('#use-result').click();await p.locator('#use-result').click();assert.equal(await p.locator('#tray .tray-item').count(),1);await p.locator('#edit-quiz').click();assert.equal(await p.locator('#answers input[value="2"]').isChecked(),true);await p.locator('#next').click();await p.locator('#back').click();assert.equal(await p.locator('#answers input[value="2"]').isChecked(),true);await p.locator('#reset-quiz').click();assert.equal(await p.locator('#answers input:checked').count(),0);assert.equal(await p.locator('#tray .tray-item').count(),1);assert.ok((await p.locator('#pyramid-caption').innerText()).includes('išliko'));checks+=4;
  await inspectPage(p,{label:'finder states/'+width});await p.close();
 }
 const p=await b.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});await p.goto(url('index.html'));await p.locator('[data-pick=oras]').tap();assert.equal(await p.locator('#tray .tray-item').count(),1);await p.locator('[data-pick=oras]').tap();assert.equal(await p.locator('#tray .tray-item').count(),0);await p.goto(url('alternate.html'));await p.locator('#answers input[value="1"]').tap();await p.locator('#next').tap();assert.equal(await p.locator('#question-number').innerText(),'02 / AKIMIRKA');checks+=3;await p.close();
 console.log(`PASS S61: ${checks} service cases, all 27 quiz combinations at two widths, exact notes/volumes, tray limit, duplicate, errors, edit/back/reset and actual keyboard/touch.`);
}finally{await b.close();await s.close();}
