import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {promptFixture} from './helpers/creation-prompt-fixture.mjs';
import {build} from '../scripts/build.mjs';
import {loadAtlas} from '../scripts/validate.mjs';
import {creationSelectionPrompt, promptLanguage, selectionPrompt} from '../gallery/selection.mjs';
import {creationPrompt} from '../scripts/prompts.mjs';
import {scopeFor} from '../scripts/ci-scope.mjs';

test('ready full prompt is portable; planned briefs stay out of dist and ready index', t => {
  const f = promptFixture(); t.after(() => rmSync(f.root, {recursive:true,force:true}));
  const planned = {...f.brief, task_id:'S26', style_id:'future-style', prompt_path:'prompts/future-style/prompt.lt.md'};
  mkdirSync(join(f.root, 'prompts/future-style')); writeFileSync(join(f.root, planned.prompt_path), 'Planned only');
  f.registry.prompts.push(planned); writeFileSync(join(f.root, 'prompts/index.json'), JSON.stringify(f.registry));
  build({root:f.root});
  const index = JSON.parse(readFileSync(join(f.root, 'dist/catalog/index.json')));
  assert.equal(index.styles.length, 1); assert.equal(index.styles[0].prompt_path, f.brief.prompt_path);
  assert.equal(readFileSync(join(f.root, 'dist', f.brief.prompt_path), 'utf8'), f.source);
  assert.equal(existsSync(join(f.root, 'dist', planned.prompt_path)), false);
  assert.equal(existsSync(join(f.root, 'dist/prompts/index.json')), false);
  writeFileSync(f.path('style.md'), readFileSync(f.path('style.md'), 'utf8').replace('status: ready', 'status: draft'));
  build({root:f.root}); assert.equal(existsSync(join(f.root, 'dist', f.brief.prompt_path)), false);
});

test('prompt relation rejects traversal, foreign URLs, another style, missing files and symlinks', t => {
  const f=promptFixture(); t.after(()=>rmSync(f.root,{recursive:true,force:true}));
  const md=readFileSync(f.path('style.md'),'utf8');
  for(const path of ['../private.md','https://example.org/prompt.md','/prompts/example-style/prompt.lt.md','prompts/example-style/../prompt.lt.md','prompts/example-style/%2e%2e/prompt.lt.md','prompts/other-style/prompt.lt.md']) {
    writeFileSync(f.path('style.md'),md.replace(`prompt_path: ${f.brief.prompt_path}`,`prompt_path: ${JSON.stringify(path)}`));
    assert.throws(()=>build({root:f.root}),/prompt_path/);
  }
  writeFileSync(f.path('style.md'),md); rmSync(f.promptFile);
  assert.throws(()=>build({root:f.root}),/does not exist/);
  writeFileSync(join(f.root,'other.md'),'text'); symlinkSync(join(f.root,'other.md'),f.promptFile);
  assert.throws(()=>build({root:f.root}),/symlinks/);
});

test('brief validation checks schema, unique identities, relation and actual UTF-8 source', t => {
  const f=promptFixture();t.after(()=>rmSync(f.root,{recursive:true,force:true}));
  for(const value of ['', '\0', Buffer.from([0xff]), 'x'.repeat(65537)]) {
    writeFileSync(f.promptFile,value); assert.throws(()=>loadAtlas({root:f.root}),/nonempty|UTF-8|64 KiB/);
  }
  writeFileSync(f.promptFile,f.source);
  f.registry.prompts.push(f.brief);writeFileSync(join(f.root,'prompts/index.json'),JSON.stringify(f.registry));
  assert.throws(()=>loadAtlas({root:f.root}),/duplicate/);
  f.registry.prompts=[];writeFileSync(join(f.root,'prompts/index.json'),JSON.stringify(f.registry));
  assert.throws(()=>loadAtlas({root:f.root}),/must match/);
  f.registry.prompts=[{...f.brief,prompt_path:'https://example.org/prompt'}];writeFileSync(join(f.root,'prompts/index.json'),JSON.stringify(f.registry));
  assert.throws(()=>loadAtlas({root:f.root}),/prompt_path/);
});

test('English prompt path prompts/<id>/prompt.en.md is valid and fills the English composition line', t => {
  const f=promptFixture();t.after(()=>rmSync(f.root,{recursive:true,force:true}));
  const enPath='prompts/example-style/prompt.en.md';
  const source='# Example — creation prompt\n\n## Adapt to the project\n\n- Composition: [A OR B; default A].\n\n## Final check\n';
  rmSync(f.promptFile);writeFileSync(join(f.root,enPath),source);
  f.registry.prompts=[{...f.brief,language:'en',prompt_path:enPath}];writeFileSync(join(f.root,'prompts/index.json'),JSON.stringify(f.registry));
  writeFileSync(f.path('style.md'),readFileSync(f.path('style.md'),'utf8').replace(`prompt_path: ${f.brief.prompt_path}`,`prompt_path: ${enPath}`));
  build({root:f.root});
  const style=JSON.parse(readFileSync(join(f.root,'dist/catalog/index.json'))).styles[0];
  assert.equal(style.prompt_path,enPath);assert.equal(readFileSync(join(f.root,'dist',enPath),'utf8'),source);
  assert.equal(promptLanguage(style),'en');
  const value=creationSelectionPrompt(style,'b',source);
  assert.match(value,/^Selected direction: .+\nSelected composition: B — /);
  assert.ok(value.includes('- Composition: B.'));assert.ok(!value.includes('[A OR B; default A]'));
  assert.equal(promptLanguage({...style,prompt_path:'prompts/other-style/prompt.en.md'}),null);
  assert.equal(promptLanguage({...style,prompt_path:'prompts/example-style/prompt.de.md'}),null);
});

test('prompt language must match the file name and be lt or en', t => {
  const f=promptFixture();t.after(()=>rmSync(f.root,{recursive:true,force:true}));
  f.registry.prompts=[{...f.brief,language:'en'}];writeFileSync(join(f.root,'prompts/index.json'),JSON.stringify(f.registry));
  assert.throws(()=>loadAtlas({root:f.root}),/prompt_path.*expected prompts\/example-style\/prompt\.en\.md/);
  const dePath='prompts/example-style/prompt.de.md';writeFileSync(join(f.root,dePath),f.source);
  f.registry.prompts=[{...f.brief,language:'de',prompt_path:dePath}];writeFileSync(join(f.root,'prompts/index.json'),JSON.stringify(f.registry));
  assert.throws(()=>loadAtlas({root:f.root}),/language|prompt_path/);
  assert.throws(()=>creationPrompt(f.root,'example-style',f.brief.prompt_path,'de'),/unknown prompt language/);
  assert.equal(creationPrompt(f.root,'example-style',f.brief.prompt_path,'lt'),f.source);
  assert.throws(()=>creationPrompt(f.root,'example-style',f.brief.prompt_path,'en'),/expected prompts\/example-style\/prompt\.en\.md/);
});

test('creation copy preserves every source instruction and resolves selected A/B while legacy stays unchanged', t => {
  const f=promptFixture();t.after(()=>rmSync(f.root,{recursive:true,force:true}));
  const style=JSON.parse(readFileSync(join(f.root,'catalog/index.json'))).styles[0];
  for(const variant of ['a','b']) {
    const value=creationSelectionPrompt(style,variant,f.source);
    assert.equal(value.split('\n\n').slice(1).join('\n\n'),f.source.replace('- Kompozicija: [A ARBA B; numatytoji A].',`- Kompozicija: ${variant.toUpperCase()}.`));
    assert.match(value,new RegExp(`Pasirinkta kompozicija: ${variant.toUpperCase()}`));
    assert.ok(value.includes('[ĮRAŠYK'));assert.ok(value.includes('## Baigimo patikra'));
  }
  assert.throws(()=>creationSelectionPrompt(style,'c',f.source));
  assert.throws(()=>creationSelectionPrompt({...style,status:'draft'},'a',f.source));
  assert.match(selectionPrompt(style,'b'),/Composition: B/);
  const ready=JSON.parse(readFileSync(new URL('../catalog/index.json',import.meta.url))).styles;
  const legacy=ready.find(s=>s.id==='swiss-grid');assert.ok(legacy);assert.equal(legacy.prompt_path,undefined);
  assert.match(selectionPrompt(legacy,'b'),/Composition: B/);
});

test('prompt-only changes run source/unit/gallery checks without selecting style renders',()=>{
  for(const path of ['prompts/index.json','prompts/acoustic-sculpture/prompt.lt.md','scripts/prompts.mjs','schema/prompt-briefs.schema.json','tests/browser/creation-prompts.test.mjs']) {
    const s=scopeFor([path],['swiss-grid']);assert.ok(s.validation&&s.unit&&s.gallery&&s.browser);
    assert.equal(s.all,false);assert.deepEqual(s.styles,[]);
  }
});
