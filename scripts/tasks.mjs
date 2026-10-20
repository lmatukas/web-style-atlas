import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const STATES = ['todo', 'in_progress', 'review', 'done', 'blocked'];
const CHECKS = ['pass', 'fail', 'not_run'];
const LABELS = {todo:'Laukia',in_progress:'Vykdoma',review:'Laukia peržiūros',done:'Baigta',blocked:'Užblokuota'};

export function validate(data) {
  if (data.schema_version !== 1 || !Array.isArray(data.tasks)) throw Error('Expected schema_version=1 and tasks array');
  const ids = new Set(data.tasks.map(t => t.id));
  if (ids.size !== data.tasks.length) throw Error('Duplicate task ID');
  const seen = new Set();
  for (const t of data.tasks) {
    if (!/^[PS]\d{2}$/.test(t.id) || !t.title || !STATES.includes(t.status)) throw Error(`Invalid task ${t.id}`);
    if (!Array.isArray(t.depends_on) || t.depends_on.some(d => !ids.has(d) || !seen.has(d))) throw Error(`Unknown, cyclic or out-of-order dependency: ${t.id}`);
    if (!Array.isArray(t.checks) || t.checks.some(c => !c.name || !CHECKS.includes(c.status))) throw Error(`Invalid checks: ${t.id}`);
    if (!Array.isArray(t.evidence_paths)) throw Error(`Missing evidence_paths: ${t.id}`);
    if (['in_progress','review'].includes(t.status) && (!t.worker || !t.branch || !t.claimed_at)) throw Error(`Missing ownership: ${t.id}`);
    if (t.status === 'review' && !/^https:\/\/github\.com\/lmatukas\/web-style-atlas\/pull\/\d+$/.test(t.pr_url ?? '')) throw Error(`Missing real PR URL: ${t.id}`);
    if (t.status === 'blocked' && (!t.blocker || !t.next_action)) throw Error(`Missing blocker/next action: ${t.id}`);
    if (t.status === 'done' && (!/^[0-9a-f]{40}$/.test(t.merge_commit ?? '') || !t.pr_url || !t.evidence_paths.length || !t.checks.length || t.checks.some(c => c.status !== 'pass'))) throw Error(`Missing completion evidence: ${t.id}`);
    if (['in_progress','review','done'].includes(t.status) && t.depends_on.some(d => data.tasks.find(x=>x.id===d).status !== 'done')) throw Error(`Incomplete prerequisite: ${t.id}`);
    seen.add(t.id);
  }
  if (data.tasks.filter(t => ['in_progress','review'].includes(t.status)).length > 1) throw Error('Only one active task is allowed');
  return data;
}

export function selectNext(data) {
  validate(data);
  const active = data.tasks.find(t => ['in_progress','review'].includes(t.status));
  if (active) return {action:'reconcile',task:active.id,status:active.status,worker:active.worker,pr_url:active.pr_url};
  const eligible = data.tasks.find(t => t.status === 'todo' && t.depends_on.every(d=>data.tasks.find(x=>x.id===d).status==='done'));
  if (eligible) return {action:'claim',task:eligible.id,card:`docs/tasks/${eligible.id}.md`};
  return {action:data.tasks.every(t=>t.status==='done')?'complete':'blocked',blockers:data.tasks.filter(t=>t.status==='blocked').map(t=>({task:t.id,reason:t.blocker,next_action:t.next_action}))};
}

const cell = value => String(value ?? '—').replace(/\|/g,'\\|').replace(/[\r\n]+/g,' ');
export function render(data) {
  const next = selectNext(data);
  const completed = data.tasks.filter(t=>t.status==='done').length;
  const lines = ['# Darbų lentelė','',
    '<!-- GENERATED from docs/progress.json. Run node scripts/tasks.mjs render. -->','',
    `**Baigta: ${completed}/${data.tasks.length}.**`, '',
    next.action==='claim'?`**Kita užduotis: [${next.task}](tasks/${next.task}.md).**`:next.action==='reconcile'?`**Pirmiausia patikrinti ${next.task}: ${LABELS[next.status]}; vykdytojas ${cell(next.worker)}.**`:next.action==='complete'?'**Visos užduotys baigtos.**':'**Nėra paruoštos užduoties. Patikrink blokatorius ir priklausomybes.**','',
    'Tai paskutinė repo užregistruota būsena. Vykdytojas ir PR atsiranda pradėjus darbą.', '',
    '| Užduotis | Pavadinimas | Būsena | Vykdytojas | Šaka | PR | Atnaujinta UTC | Blokatorius / kitas veiksmas |',
    '|---|---|---|---|---|---|---|---|'];
  for (const t of data.tasks) lines.push(`| [${t.id}](tasks/${t.id}.md) | ${cell(t.title)} | ${LABELS[t.status]} | ${cell(t.worker)} | ${cell(t.branch)} | ${t.pr_url?`[PR](${t.pr_url})`:'—'} | ${cell(t.updated_at)} | ${cell(t.blocker || t.next_action)} |`);
  lines.push('', '[Pradžia](../START_HERE.md) · [Darbo taisyklės](WORKFLOW.md) · [Visas planas](implementation-plan.md)', '');
  return lines.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const data=JSON.parse(readFileSync(resolve(ROOT,'docs/progress.json'),'utf8'));
    const command=process.argv[2] ?? 'next';
    validate(data);
    if(command==='next') console.log(JSON.stringify(selectNext(data),null,2));
    else if(command==='validate') console.log(`PASS: ${data.tasks.length} tasks; remote claims and PR evidence still require GitHub verification.`);
    else if(command==='render') { writeFileSync(resolve(ROOT,'docs/STATUS.md'),render(data)); console.log('Rendered docs/STATUS.md'); }
    else if(command==='check') {if(readFileSync(resolve(ROOT,'docs/STATUS.md'),'utf8')!==render(data)) throw Error('Stale docs/STATUS.md; run render'); console.log('PASS: board matches queue');}
    else throw Error('Usage: node scripts/tasks.mjs next|validate|render|check');
  } catch(e) { console.error(e.message); process.exitCode=1; }
}
