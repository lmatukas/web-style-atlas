import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { luxuryFixture } from './helpers/luxury-fixture.mjs';
import { project } from './helpers/preview-fixture.mjs';
import { join } from 'node:path';
import { loadAtlas } from '../scripts/validate.mjs';
import { missingGlyphs } from '../scripts/lib/font-coverage.mjs';
const setup = t => { const f = luxuryFixture(); t.after(() => rmSync(f.root, { recursive: true, force: true })); return f; };
const mutate = (f, fn) => { const a = JSON.parse(readFileSync(f.path('assets.json'))); fn(a.assets); writeFileSync(f.path('assets.json'), JSON.stringify(a)); };
test('real OFL WOFF2 with Lithuanian glyphs, CC0 photo and declared 3D fallback pass', t => {
  const f = setup(t); assert.equal(loadAtlas({ root: f.root }).styles[0].runtime.static_fallback, 'assets/fallback.svg');
  assert.deepEqual(missingGlyphs(readFileSync(f.path('assets/fonts/NotoSans-Regular.woff2'))), []);
});
test('font policy rejects wrong license, missing/full-text OFL, forged WOFF2 and missing Lithuanian glyphs', t => {
  const f = setup(t), original = readFileSync(f.path('assets.json'));
  mutate(f, a => a[0].license = 'MIT'); assert.throws(() => loadAtlas({ root: f.root }), /license/); writeFileSync(f.path('assets.json'), original);
  mutate(f, a => a[0].license_file = 'assets/RIGHTS.txt'); assert.throws(() => loadAtlas({ root: f.root }), /adjacent OFL/); writeFileSync(f.path('assets.json'), original);
  const ofl = readFileSync(f.path('assets/fonts/OFL.txt')); writeFileSync(f.path('assets/fonts/OFL.txt'), 'OFL'); assert.throws(() => loadAtlas({ root: f.root }), /full SIL/); writeFileSync(f.path('assets/fonts/OFL.txt'), ofl);
  const font = readFileSync(f.path('assets/fonts/NotoSans-Regular.woff2'));
  writeFileSync(f.path('assets/fonts/NotoSans-Regular.woff2'), 'wOF2 not a font'); assert.throws(() => loadAtlas({ root: f.root }), /invalid WOFF2/);
  writeFileSync(f.path('assets/fonts/NotoSans-Regular.woff2'), readFileSync(join(project, 'tests/fixtures/luxury/fonts/NotoSans-ASCII.woff2'))); assert.throws(() => loadAtlas({ root: f.root }), /lacks Lithuanian glyphs/);
  writeFileSync(f.path('assets/fonts/NotoSans-Regular.woff2'), font); rmSync(f.path('assets/fonts/OFL.txt')); assert.throws(() => loadAtlas({ root: f.root }), /file does not exist/);
});
test('photographs require free redistribution rights, meaningful RIGHTS and aggregate budgets', t => {
  const f = setup(t), original = readFileSync(f.path('assets.json'));
  for (const license of ['CC-BY-4.0', 'royalty-free', 'PD-made-up']) { mutate(f, a => a[1].license = license); assert.throws(() => loadAtlas({ root: f.root }), /photographs require/); writeFileSync(f.path('assets.json'), original); }
  for (const license of ['PD-USGov', 'Public domain', 'PDM-1.0']) { mutate(f, a => a[1].license = license); assert.doesNotThrow(() => loadAtlas({ root: f.root })); }
  mutate(f, a => delete a[1].license_file); assert.throws(() => loadAtlas({ root: f.root }), /RIGHTS.txt/); writeFileSync(f.path('assets.json'), original);
  writeFileSync(f.path('assets/RIGHTS.txt'), 'TODO'); assert.throws(() => loadAtlas({ root: f.root }), /document source/);
});
test('asset budgets sum files per style; large photos and fonts fail', t => {
  const f = setup(t); writeFileSync(f.path('assets/forest.webp'), Buffer.alloc(1_500_001)); assert.throws(() => loadAtlas({ root: f.root }), /photograph budget/);
  // WOFF2 validity is checked before the budget; duplicate valid font records
  // exercise the aggregate limit without relying on invalid padding.
  const font = readFileSync(f.path('assets/fonts/NotoSans-Regular.woff2'));
  mutate(f, assets => { for (let i = 0; i < 27; i++) { const path = `assets/fonts/weight-${i}.woff2`; writeFileSync(f.path(path), font); assets.push({ ...assets[0], id: `weight-${i}`, path }); } });
  writeFileSync(f.path('assets/forest.webp'), Buffer.alloc(1)); assert.throws(() => loadAtlas({ root: f.root }), /font budget/);
});
test('approved AI images require generated provenance, full rights fields and the same photo budget', t => {
  const f = setup(t), license = 'AI-generated, original, distributed under the repository MIT terms';
  mutate(f, a => { a[1].license = license; });
  assert.throws(() => loadAtlas({ root: f.root }), /generated origin/);
  mutate(f, a => { a[1].origin = 'generated'; a[1].generation_note = 'Original unbranded fictional dish.'; });
  assert.throws(() => loadAtlas({ root: f.root }), /AI RIGHTS/);
  const rights = 'Tool: Built-in image generation, version not exposed\nDate: 2026-10-24\nPrompt: Original unbranded fictional meal, no people or text.\nModifications: WebP encoding; metadata removed.\n';
  for (const field of ['Tool', 'Date', 'Prompt', 'Modifications']) {
    writeFileSync(f.path('assets/RIGHTS.txt'), rights.replace(new RegExp('^' + field + ':.*\\n', 'm'), ''));
    assert.throws(() => loadAtlas({ root: f.root }), /AI RIGHTS/);
  }
  writeFileSync(f.path('assets/RIGHTS.txt'), rights);
  assert.doesNotThrow(() => loadAtlas({ root: f.root }));
  writeFileSync(f.path('assets/forest.webp'), Buffer.alloc(1_500_001));
  assert.throws(() => loadAtlas({ root: f.root }), /photograph budget/);
});
test('external font CSS imports, font-face URLs and HTML links fail before rendering', t => {
  const f = setup(t), css = readFileSync(f.path('reference/style.css'), 'utf8');
  for (const rule of ['@import url("https://fonts.example/style.css");', '@import "//fonts.example/style.css";', '@font-face {font-family:X;src:url(https://fonts.example/a.woff2)}', '@\\69mport "https://fonts.example/style.css";']) {
    writeFileSync(f.path('reference/style.css'), css + rule); assert.throws(() => loadAtlas({ root: f.root }), /external stylesheets\/fonts/);
  }
  writeFileSync(f.path('reference/style.css'), css);
  writeFileSync(f.path('reference/extra.html'), '<link href="https://fonts.example/style.css" rel="stylesheet">'); assert.throws(() => loadAtlas({ root: f.root }), /external stylesheets\/fonts/);
});
