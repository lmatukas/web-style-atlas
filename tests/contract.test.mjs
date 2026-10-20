import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import Ajv from 'ajv/dist/2020.js';
import { parseDocument } from 'yaml';
import { validate as validateQueue } from '../scripts/tasks.mjs';

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const json = p => JSON.parse(read(p));
const schemaNames = ['style', 'tokens', 'layouts', 'assets', 'vocabularies', 'index', 'previews-manifest', 'progress'];
const ajv = new Ajv({ allErrors: true, strict: true });
for (const name of schemaNames) ajv.addSchema(json(`schema/${name}.schema.json`));
const validate = (name, value) => {
  const check = ajv.getSchema(`${name}.schema.json`);
  const valid = check(value);
  return { valid, errors: ajv.errorsText(check.errors) };
};
const pass = (name, value) => {
  const result = validate(name, value);
  assert.equal(result.valid, true, `${name}: ${result.errors}`);
};
const fail = (name, value) => assert.equal(validate(name, value).valid, false);
const source = read('templates/style/style.md');
const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
assert.ok(match, 'template has delimited YAML frontmatter');
const document = parseDocument(match[1], { uniqueKeys: true });
assert.deepEqual(document.errors, []);
const metadata = document.toJSON();

test('all contract schemas compile under strict draft 2020-12', () => {
  for (const name of schemaNames) assert.equal(typeof ajv.getSchema(`${name}.schema.json`), 'function');
});

test('draft template JSON and YAML satisfy the contract without becoming a style', () => {
  pass('style', metadata);
  for (const name of ['tokens', 'layouts', 'assets']) pass(name, json(`templates/style/${name}.json`));
  assert.equal(metadata.status, 'draft');
  assert.equal(existsSync(new URL('../styles/example-style', import.meta.url)), false);
  const requiredSections = ['Intent', 'Signature', 'Typography', 'Color and surfaces', 'Layout A', 'Layout B', 'Imagery', 'Navigation and interaction', 'Motion', 'Responsive behavior', 'Accessibility', 'Adaptation', 'Avoid', 'Closest styles'];
  assert.deepEqual([...match[2].matchAll(/^## (.+)$/gm)].map(m => m[1]), requiredSections);
  const words = match[2].trim().split(/\s+/).length;
  assert.ok(words >= 700 && words <= 1200, `template body: ${words} words`);
});

test('shared vocabulary owns all family/tag/use-case values', () => {
  const vocabulary = json('core/vocabularies.json');
  pass('vocabularies', vocabulary);
  assert.ok(vocabulary.families.includes(metadata.family));
  for (const tag of metadata.tags) assert.ok(vocabulary.tags.includes(tag));
  for (const value of [...metadata.best_for, ...metadata.avoid_for]) assert.ok(vocabulary.use_cases.includes(value));
  const plan = read('docs/implementation-plan.md');
  const plannedFamilies = [...new Set([...plan.matchAll(/^\| S\d{2} `[^`]+` \| [^|]+ \/ ([a-z]+) \|/gm)].map(m => m[1]))].sort();
  assert.deepEqual([...vocabulary.families].sort(), plannedFamilies);
});

test('metadata rejects missing dimensions, unknown fields, bad enums and oversized summaries', () => {
  let value = structuredClone(metadata); delete value.signature.content_rhythm; fail('style', value);
  value = { ...metadata, summary: 'x'.repeat(241) }; fail('style', value);
  value = { ...metadata, density: 'medium' }; fail('style', value);
  value = { ...metadata, id: '../unsafe' }; fail('style', value);
  value = { ...metadata, invented: true }; fail('style', value);
});

test('tokens reject translucent colors, unbounded scales and unlicensed local font references', () => {
  let value = json('templates/style/tokens.json'); value.color.text = '#00000080'; fail('tokens', value);
  value = json('templates/style/tokens.json'); value.spacing = Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`size-${i}`, '1rem'])); fail('tokens', value);
  value = json('templates/style/tokens.json'); value.typography.body.source = 'local'; fail('tokens', value);
  Object.assign(value.typography.body, { file: 'assets/body.woff2', asset_id: 'body-font' }); pass('tokens', value);
  value.typography.body.file = '../body.woff2'; fail('tokens', value);
});

test('layouts require exactly A and B in order with distinct canonical reference paths', () => {
  const value = json('templates/style/layouts.json');
  fail('layouts', { ...value, variants: [value.variants[0]] });
  fail('layouts', { ...value, variants: [...value.variants].reverse() });
  value.variants[1].reference_path = 'reference/index.html'; fail('layouts', value);
});

test('assets require redistribution permission and origin-specific evidence', () => {
  const asset = { id: 'sample-image', path: 'assets/sample.png', type: 'image', origin: 'third_party', source_url: 'https://example.org/photo', creator: null, license: 'CC0-1.0', attribution: 'None required', redistribution_allowed: true, modifications: [] };
  pass('assets', { schema_version: 1, assets: [asset] });
  fail('assets', { schema_version: 1, assets: [{ ...asset, redistribution_allowed: false }] });
  const generated = { ...asset, origin: 'generated' }; delete generated.source_url;
  fail('assets', { schema_version: 1, assets: [generated] });
  generated.generation_note = 'Test fixture only; no actual generated asset is bundled.';
  pass('assets', { schema_version: 1, assets: [generated] });
  const external = { ...asset }; delete external.source_url; fail('assets', { schema_version: 1, assets: [external] });
  fail('assets', { schema_version: 1, assets: [{ ...asset, type: 'font' }] });
  for (const path of ['/tmp/photo.png', '../photo.png', 'assets/../photo.png', 'https://example.org/photo.png', 'assets\\photo.png']) {
    fail('assets', { schema_version: 1, assets: [{ ...asset, path }] });
  }
});

test('public index excludes drafts and carries compact A/B paths', () => {
  pass('index', { schema_version: 1, styles: [] });
  const entry = { ...metadata, status: 'ready', style_path: 'styles/example-style/style.md', variants: [
    { id: 'a', title: 'A', reference_path: 'styles/example-style/reference/index.html', preview_path: 'styles/example-style/preview.png', preview_mobile_path: 'styles/example-style/preview-mobile.png' },
    { id: 'b', title: 'B', reference_path: 'styles/example-style/reference/alternate.html', preview_path: 'styles/example-style/preview-alt.png', preview_mobile_path: 'styles/example-style/preview-alt-mobile.png' }
  ] };
  pass('index', { schema_version: 1, styles: [entry] });
  fail('index', { schema_version: 1, styles: [{ ...entry, status: 'draft' }] });
  const indexProperties = json('schema/index.schema.json').properties.styles.items.properties;
  for (const [key, definition] of Object.entries(json('schema/style.schema.json').properties)) {
    if (key !== 'status') assert.deepEqual(indexProperties[key], definition, `index metadata drift: ${key}`);
  }
});

test('preview manifest requires source and output hash plus a render environment', () => {
  const manifest = { schema_version: 1, environment: { node: '24', browser: 'test-fixture', browser_version: 'fixture', platform: 'linux', device_scale_factor: 1, locale: 'en-US', timezone: 'UTC' }, previews: [{ style_id: 'example-style', variant: 'a', viewport: 'desktop', path: 'styles/example-style/preview.png', width: 1440, height: 1000, output_sha256: 'a'.repeat(64), source_sha256: 'b'.repeat(64) }] };
  pass('previews-manifest', manifest);
  delete manifest.previews[0].source_sha256; fail('previews-manifest', manifest);
});

test('all 38 cards and canonical dependencies survive the scaffold extension', () => {
  const queue = json('docs/progress.json');
  pass('progress', queue); validateQueue(queue);
  const ids = [...Array.from({ length: 14 }, (_, i) => `P${String(i + 1).padStart(2, '0')}`), ...Array.from({ length: 24 }, (_, i) => `S${String(i + 1).padStart(2, '0')}`)].sort();
  assert.deepEqual(queue.tasks.map(t => t.id).sort(), ids);
  assert.deepEqual(readdirSync(new URL('../docs/tasks', import.meta.url)).map(p => p.replace(/\.md$/, '')).sort(), ids);
  const planIds = [...read('docs/implementation-plan.md').matchAll(/^\| S\d{2} `([^`]+)`/gm)].map(m => m[1]);
  const cardIds = [];
  for (const task of queue.tasks) {
    const card = read(`docs/tasks/${task.id}.md`);
    for (const field of ['Goal', 'Depends on', 'Read first', 'Allowed changes', 'Steps', 'Checks', 'Done when', 'Out of scope']) {
      assert.match(card, new RegExp(`^## ${field}$`, 'm'), `${task.id}: ${field}`);
    }
    assert.ok(card.includes(`${task.depends_on.join(', ') || 'None'} (canonical docs/progress.json).`));
    if (task.id.startsWith('S')) {
      cardIds.push(card.match(/Style ID: `([^`]+)`/)[1]);
      assert.match(card, /Closest styles: `[^`]+`/);
    }
  }
  assert.deepEqual(cardIds, planIds);
  assert.ok(queue.tasks.filter(t => ['in_progress', 'review'].includes(t.status)).length <= 1);
});

test('progress schema preserves ownership and requires real review/completion evidence fields', () => {
  const queue = json('docs/progress.json');
  Object.assign(queue.tasks[0], { status: 'review', worker: 'contract-fixture', claimed_at: '2026-10-20T00:00:00Z', updated_at: '2026-10-20T00:00:00Z', branch: 'task/fixture', base_commit: 'c'.repeat(40), pr_url: null, evidence_commit: null, merge_commit: null, checks: [], evidence_paths: [], handoff: null });
  fail('progress', queue);
  Object.assign(queue.tasks[0], { pr_url: 'https://github.com/lmatukas/web-style-atlas/pull/1', evidence_commit: 'a'.repeat(40), checks: [{ name: 'fixture', status: 'pass' }], evidence_paths: ['docs/evidence/P01.md'], handoff: 'Schema fixture only.' });
  pass('progress', queue);
  queue.tasks[0].status = 'done'; fail('progress', queue);
  queue.tasks[0].merge_commit = 'b'.repeat(40); pass('progress', queue);
  queue.tasks[0].checks[0].status = 'not_run'; fail('progress', queue);
});
