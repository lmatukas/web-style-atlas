import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,readdirSync,rmSync,mkdirSync,symlinkSync,statSync} from 'node:fs';
import {join} from 'node:path';import {createHash} from 'node:crypto';
import {fixture} from './helpers/preview-fixture.mjs';import {galleryFiles} from '../scripts/gallery.mjs';import {loadAtlas} from '../scripts/validate.mjs';import {build} from '../scripts/build.mjs';
const hash=root=>{const result={};function visit(path){for(const item of readdirSync(join(root,path),{withFileTypes:true})){const p=path+'/'+item.name;if(item.isDirectory())visit(p);else result[p]=createHash('sha256').update(readFileSync(join(root,p))).digest('hex');}}visit('dist');return result;};
test('gallery clean rebuild is byte-identical and keeps authored reference paths',t=>{const{root}=fixture();t.after(()=>rmSync(root,{recursive:true,force:true}));const before=hash(root);const html=readFileSync(join(root,'dist/index.html'),'utf8');assert.match(html,/styles\/example-style\/reference\/index.html/);assert.ok(readFileSync(join(root,'dist/styles/example-style/reference/style.css')));rmSync(join(root,'dist'),{recursive:true});build({root});assert.deepEqual(hash(root),before);});
test('obsolete dist files are removed and unsafe destinations are rejected',t=>{const{root}=fixture();t.after(()=>rmSync(root,{recursive:true,force:true}));writeFileSync(join(root,'dist/obsolete.txt'),'old');build({root});assert.ok(!Object.hasOwn(hash(root),'dist/obsolete.txt'));rmSync(join(root,'dist'),{recursive:true});mkdirSync(join(root,'unrelated'));writeFileSync(join(root,'unrelated/safe.txt'),'keep');symlinkSync(join(root,'unrelated'),join(root,'dist'));assert.throws(()=>build({root}),/symlinks/);assert.equal(readFileSync(join(root,'unrelated/safe.txt'),'utf8'),'keep');});

test('the eleven 1.3.0 directions open the gallery in order with a New badge, then the rest unchanged',()=>{
  const config=JSON.parse(readFileSync(new URL('../gallery/config.json',import.meta.url),'utf8'));
  const index=JSON.parse(readFileSync(new URL('../catalog/index.json',import.meta.url),'utf8'));
  const ids=index.styles.map(s=>s.id);
  assert.equal(config.new_styles.length,11);assert.equal(new Set(config.new_styles).size,11);
  for(const id of config.new_styles)assert.ok(ids.includes(id),`new_styles lists a ready style: ${id}`);
  const html=galleryFiles(loadAtlas(),index).get('dist/index.html').toString();
  const cards=[...html.matchAll(/<article class="card( is-new)?" data-style="([^"]+)">/g)].map(m=>({id:m[2],isNew:Boolean(m[1])}));
  assert.equal(cards.length,ids.length);
  assert.deepEqual(cards.slice(0,11).map(c=>c.id),config.new_styles);
  assert.ok(cards.slice(0,11).every(c=>c.isNew)&&cards.slice(11).every(c=>!c.isNew));
  assert.deepEqual(cards.slice(11).map(c=>c.id),ids.filter(id=>!config.new_styles.includes(id)));
  assert.equal((html.match(/<span class="badge-new">New<\/span>/g)||[]).length,11);
});
