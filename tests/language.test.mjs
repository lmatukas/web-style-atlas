import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readdirSync, readFileSync} from 'node:fs';

// Styles whose pages and prompt may still be Lithuanian. Every English
// conversion (P38–P63) removes its own ID; P64 needs this list empty.
// See docs/english-conversion-plan.md.
export const LITHUANIAN_BACKLOG = [
  'midnight-vestibule',
  'still-sanctuary', 'heirloom-weave-ledger', 'velvet-members-hall', 'patina-auction-room',
  'openwater-deck', 'scent-ritual', 'ember-course-room', 'acoustic-sculpture',
  'balcony-builder', 'choreographic-stage', 'discovery-cabinet', 'light-environments',
  'membrane-score', 'modular-light', 'repair-atlas', 'resonant-ribbon',
  'rhythm-planner', 'seasonal-terrain', 'spine-editions', 'trail-composer',
  'twilight-expedition', 'woven-field'
];
const LANGUAGES = ['en', 'lt'];

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');

// Language of every reference page and of the style's brief, per style ID.
export function languageMap() {
  const styles = new Map();
  for (const id of readdirSync(new URL('styles/', root)).sort()) {
    const dir = `styles/${id}/reference/`;
    if (!existsSync(new URL(dir, root))) continue;
    const entries = [];
    for (const file of readdirSync(new URL(dir, root)).filter(f => f.endsWith('.html')).sort()) {
      const lang = /<html\b[^>]*\blang="([^"]*)"/i.exec(read(dir + file))?.[1] ?? null;
      entries.push({source: dir + file, lang});
    }
    styles.set(id, entries);
  }
  for (const brief of JSON.parse(read('prompts/index.json')).prompts) {
    if (!styles.has(brief.style_id)) styles.set(brief.style_id, []);
    styles.get(brief.style_id).push({source: `prompts/index.json (${brief.style_id})`, lang: brief.language});
    const fileLang = /prompt\.([a-z]+)\.md$/.exec(brief.prompt_path)?.[1] ?? null;
    styles.get(brief.style_id).push({source: brief.prompt_path, lang: fileLang});
  }
  return styles;
}

export function languageProblems(styles, backlog = LITHUANIAN_BACKLOG) {
  const problems = [], listed = new Set(backlog);
  if (listed.size !== backlog.length) problems.push('LITHUANIAN_BACKLOG has a duplicate ID');
  for (const id of backlog) if (!styles.has(id)) problems.push(`${id}: in LITHUANIAN_BACKLOG but no such style`);
  for (const [id, entries] of styles) {
    for (const e of entries) if (!LANGUAGES.includes(e.lang)) problems.push(`${e.source}: language ${JSON.stringify(e.lang)}, expected en or lt`);
    const langs = new Set(entries.map(e => e.lang));
    if (langs.has('lt') && langs.has('en')) problems.push(`${id}: mixes lt and en (${entries.map(e => `${e.source}=${e.lang}`).join(', ')})`);
    else if (langs.has('lt') && !listed.has(id)) problems.push(`${id}: lt page or prompt, but not in LITHUANIAN_BACKLOG`);
    else if (listed.has(id) && entries.length && !langs.has('lt')) problems.push(`${id}: already English; remove it from LITHUANIAN_BACKLOG`);
  }
  return problems;
}

test('every style is English unless it is still in the Lithuanian backlog', () => {
  assert.deepEqual(languageProblems(languageMap()), []);
});

test('backlog only shrinks: no duplicates and at most the 26 directions queued in P37', () => {
  assert.ok(LITHUANIAN_BACKLOG.length <= 26);
  assert.equal(new Set(LITHUANIAN_BACKLOG).size, LITHUANIAN_BACKLOG.length);
});

test('language check fails on an unlisted lt page, a listed English style and a mixed style', () => {
  const en = id => [{source: `${id}/index.html`, lang: 'en'}, {source: `${id}/alternate.html`, lang: 'en'}];
  const lt = id => [{source: `${id}/index.html`, lang: 'lt'}, {source: `${id}/alternate.html`, lang: 'lt'}];
  const ok = new Map([['plain', en('plain')], ['old', lt('old')]]);
  assert.deepEqual(languageProblems(ok, ['old']), []);
  assert.match(languageProblems(ok, []).join('\n'), /old: lt page or prompt, but not in LITHUANIAN_BACKLOG/);
  assert.match(languageProblems(ok, ['old', 'plain']).join('\n'), /plain: already English; remove it/);
  const mixed = new Map([['half', [{source: 'half/index.html', lang: 'en'}, {source: 'half/alternate.html', lang: 'lt'}]]]);
  assert.match(languageProblems(mixed, ['half']).join('\n'), /half: mixes lt and en/);
  assert.match(languageProblems(mixed, []).join('\n'), /half: mixes lt and en/);
  const promptOnly = new Map([['brief', [...en('brief'), {source: 'prompts/brief/prompt.lt.md', lang: 'lt'}]]]);
  assert.match(languageProblems(promptOnly, ['brief']).join('\n'), /brief: mixes lt and en/);
  const missing = new Map([['nolang', [{source: 'nolang/index.html', lang: null}]]]);
  assert.match(languageProblems(missing, []).join('\n'), /expected en or lt/);
  assert.match(languageProblems(ok, ['old', 'ghost']).join('\n'), /ghost: in LITHUANIAN_BACKLOG but no such style/);
});
