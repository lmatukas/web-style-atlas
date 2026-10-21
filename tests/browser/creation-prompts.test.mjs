import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdirSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {promptFixture} from '../helpers/creation-prompt-fixture.mjs';
import {serveGallery} from '../../scripts/dev.mjs';
import {launchCanonical} from '../../scripts/previews.mjs';
import {creationSelectionPrompt} from '../../gallery/selection.mjs';
import {loadAtlas} from '../../scripts/validate.mjs';
import {generatedFiles} from '../../scripts/build.mjs';

test('full prompt previews as inert text, copies exact A/B, and supports both clipboard fallbacks under a subpath',{timeout:60000},async t=>{
  const f=promptFixture();t.after(()=>rmSync(f.root,{recursive:true,force:true}));
  const browser=await launchCanonical(),server=await serveGallery(join(f.root,'dist'),{basePath:'/atlas/'});
  try {
    const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
    await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.copiedPrompt=value;}}}));
    await page.goto(server.url,{waitUntil:'networkidle'});
    assert.equal(await page.locator('.card').count(),1);
    await page.getByRole('button',{name:'Preview full creation prompt',exact:true}).focus();await page.keyboard.press('Enter');
    assert.ok(await page.locator('#prompt-preview summary').evaluate(e=>e===document.activeElement));
    const button=page.getByRole('button',{name:'Copy full creation prompt',exact:true});await button.waitFor();
    const style=JSON.parse(generatedFiles(loadAtlas({root:f.root})).get('catalog/index.json')).styles[0];
    for(const variant of ['a','b']) {
      await page.getByRole('button',{name:variant.toUpperCase(),exact:true}).click();
      await page.waitForFunction(()=>!document.getElementById('copy-prompt').disabled);
      const expected=creationSelectionPrompt(style,variant,f.source);
      assert.equal(await page.locator('#creation-prompt-text').textContent(),expected);
      assert.equal(await page.locator('#creation-prompt-text script').count(),0);
      assert.equal(await page.evaluate(()=>window.promptExecuted),undefined);
      await button.click();assert.equal(await page.evaluate(()=>window.copiedPrompt),expected);
      assert.match(await page.locator('#copy-status').textContent(),/Full creation prompt copied/);
    }
    await page.reload({waitUntil:'networkidle'});await page.waitForFunction(()=>!document.getElementById('copy-prompt').disabled);
    assert.match(await page.locator('#selection-prompt').inputValue(),/Pasirinkta kompozicija: B/);
    for(const mode of ['absent','rejected']) {
      await page.evaluate(mode=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:mode==='absent'?undefined:{writeText:async()=>{throw Error('Denied');}}}),mode);
      await button.focus();await page.keyboard.press('Enter');
      await page.locator('#prompt-fallback').waitFor();
      const selected=await page.locator('#selection-prompt').evaluate(e=>({start:e.selectionStart,end:e.selectionEnd,length:e.value.length,focus:e===document.activeElement}));
      assert.equal(selected.start,0);assert.equal(selected.end,selected.length);assert.equal(selected.focus,true);
      assert.equal(await page.locator('#selection-prompt').inputValue(),creationSelectionPrompt(style,'b',f.source));
    }
    await page.locator('#prompt-preview summary').click();
    for(const width of [360,390,768,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);}
    if(process.env.ATLAS_GALLERY_EVIDENCE){mkdirSync(process.env.ATLAS_GALLERY_EVIDENCE,{recursive:true});await page.locator('#handoff').screenshot({path:process.env.ATLAS_GALLERY_EVIDENCE+'/full-prompt-desktop.png'});await page.setViewportSize({width:390,height:844});await page.locator('#handoff').screenshot({path:process.env.ATLAS_GALLERY_EVIDENCE+'/full-prompt-mobile.png'});}
    assert.deepEqual(errors,[]);
  }finally{await server.close();await browser.close();}
});

test('prompt fetch failure never copies a short brief; retry and stale A/B loads are handled',{timeout:60000},async t=>{
  const f=promptFixture();t.after(()=>rmSync(f.root,{recursive:true,force:true}));
  const browser=await launchCanonical(),server=await serveGallery(join(f.root,'dist'),{basePath:'/repo/'});
  try {
    const page=await browser.newPage();const pending=[];let fail=true;
    await page.route('**/prompts/example-style/prompt.lt.md',route=>{if(fail)return route.fulfill({status:404,body:'missing'});pending.push(route);});
    await page.goto(server.url,{waitUntil:'networkidle'});await page.locator('.choose-style').click();
    await page.getByRole('button',{name:'Retry loading prompt'}).waitFor();
    assert.equal(await page.locator('#copy-prompt').isDisabled(),true);assert.equal(await page.locator('#selection-prompt').inputValue(),'');
    fail=false;await page.getByRole('button',{name:'Retry loading prompt'}).click();
    await page.waitForFunction(()=>document.getElementById('copy-prompt').disabled);
    await page.getByRole('button',{name:'B',exact:true}).click();
    await new Promise((resolve,reject)=>{const deadline=Date.now()+5000;const poll=()=>pending.length===2?resolve():Date.now()>deadline?reject(Error('Two prompt requests expected')):setTimeout(poll,20);poll();});
    await pending[1].fulfill({status:200,contentType:'text/plain',body:f.source});
    await page.waitForFunction(()=>!document.getElementById('copy-prompt').disabled);
    await pending[0].fulfill({status:200,contentType:'text/plain',body:f.source});
    await page.waitForLoadState('networkidle');
    assert.match(await page.locator('#selection-prompt').inputValue(),/Pasirinkta kompozicija: B/);
    assert.ok(!(await page.locator('#selection-prompt').inputValue()).includes('- Kompozicija: A.'));
  }finally{await server.close();await browser.close();}
});
