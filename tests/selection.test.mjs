import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=p=>readFileSync(root+p,'utf8');
const index=JSON.parse(read('catalog/index.json'));
const ready=new Map(index.styles.map(s=>[s.id,s]));
const cases=JSON.parse(read('tests/fixtures/selection-cases.json')).cases;
for(const scenario of cases)test(`selection fixture: ${scenario.id}`,()=>{
  for(const id of scenario.expected_ids){const style=ready.get(id);assert.ok(style,`not ready: ${id}`);assert.equal(style.status,'ready');for(const variant of style.variants)for(const key of ['reference_path','preview_path','preview_mobile_path'])assert.ok(existsSync(root+variant[key]),variant[key]);}
  if(scenario.variant)assert.ok(ready.get(scenario.expected_ids[0]).variants.some(v=>v.id===scenario.variant));
  if(scenario.missing_id)assert.ok(!ready.has(scenario.missing_id));
  if(scenario.id==='unspecified')assert.equal(new Set(scenario.expected_ids.map(id=>ready.get(id).family)).size,3);
  if(scenario.id==='no-images')for(const id of scenario.expected_ids)assert.equal(ready.get(id).image_dependency,'low');
  if(scenario.id==='existing-brand')assert.equal(scenario.preserve_brand,true);
  if(scenario.id==='no-visual-viewer')assert.equal(scenario.claim_visual_inspection,false);
  if(scenario.id==='mixed')assert.equal(scenario.primary,scenario.expected_ids[0]);
});
test('consumer entry links resolve while maintenance routing survives',()=>{
  for(const path of ['START_HERE.md','core/agent-entry.md','core/selection-guide.md','core/skill/SKILL.md'])assert.ok(existsSync(root+path));
  const start=read('START_HERE.md');assert.match(start,/docs\/WORKFLOW.md/);assert.match(start,/docs\/COST_POLICY.md/);assert.match(start,/Claim the eligible task on the remote default branch/);
  const skill=read('core/skill/SKILL.md');for(const match of skill.matchAll(/\]\(([^)]+)\)/g))assert.ok(existsSync(fileURLToPath(new URL(match[1],new URL('../core/skill/SKILL.md',import.meta.url)))));
});
