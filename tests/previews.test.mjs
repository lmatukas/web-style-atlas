import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, rmSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fixture, project } from './helpers/preview-fixture.mjs';
import { previewArguments, sourceHash, renderPreviews, BrowserUnavailable, pngDimensions, checkPreviews } from '../scripts/previews.mjs';
import { loadAtlas } from '../scripts/validate.mjs';
import { servePreviews } from '../scripts/preview-server.mjs';
import { ENVIRONMENT, MANIFEST } from '../scripts/preview.config.mjs';
const setup = t => { const f = fixture(); t.after(() => rmSync(f.root, { recursive: true, force: true })); return f; };

test('preview CLI requires one explicit safe scope', () => {
  assert.deepEqual(previewArguments(['--all']), {});
  assert.deepEqual(previewArguments(['--style', 'example-style']), { style: 'example-style' });
  for (const args of [[], ['--style'], ['--style', '../a'], ['--all', '--style', 'a'], ['--all', '--all']]) assert.throws(() => previewArguments(args));
});
test('provenance covers style sources, assets, shared resources, toolchain and environment', t => {
  const { root, base, path } = setup(t), style = { base };
  const original = sourceHash(root, style);
  for (const file of ['reference/style.css', 'assets/shape.svg', 'tokens.json', 'style.md']) {
    const before = readFileSync(path(file)); writeFileSync(path(file), Buffer.concat([before, Buffer.from('\n')]));
    assert.notEqual(sourceHash(root, style), original, file); writeFileSync(path(file), before);
  }
  for (const file of ['core/vocabularies.json', 'scripts/preview-server.mjs', 'scripts/previews.mjs', 'scripts/preview.config.mjs', 'package-lock.json']) {
    const absolute = join(root, file), before = readFileSync(absolute); writeFileSync(absolute, Buffer.concat([before, Buffer.from('\n')]));
    assert.notEqual(sourceHash(root, style), original, file); writeFileSync(absolute, before);
  }
  writeFileSync(path('preview.png'), 'output is excluded');
  assert.equal(sourceHash(root, style), original);
  assert.notEqual(sourceHash(root, style, { ...ENVIRONMENT, locale: 'lt-LT' }), original);
});
test('browser unavailable is not_run and invalidates stale successful records before launch', async t => {
  const { root } = setup(t), target = join(root, MANIFEST);
  writeFileSync(target, JSON.stringify({ schema_version: 1, environment: ENVIRONMENT, previews: [{ style_id: 'example-style', variant: 'a', viewport: 'desktop', path: 'styles/example-style/preview.png', width: 1440, height: 1000, source_sha256: 'a'.repeat(64), output_sha256: 'b'.repeat(64) }] }));
  await assert.rejects(renderPreviews({ root, launch: async () => { throw new BrowserUnavailable('fixture missing browser'); } }), error => error.status === 'not_run' && /fixture missing/.test(error.message));
  assert.deepEqual(JSON.parse(readFileSync(target)).previews, []);
  assert.throws(() => checkPreviews(loadAtlas({ root })), /expected four/);
});
test('manifest rejects duplicate combinations, wrong names, wrong environment', t => {
  const { root } = setup(t), target = join(root, MANIFEST), atlas = loadAtlas({ root });
  const record = { style_id: 'example-style', variant: 'a', viewport: 'desktop', path: 'styles/example-style/preview.png', width: 1440, height: 1000, source_sha256: 'a'.repeat(64), output_sha256: 'b'.repeat(64) };
  const manifest = { schema_version: 1, environment: ENVIRONMENT, previews: [record, { ...record, output_sha256: 'c'.repeat(64) }] };
  writeFileSync(target, JSON.stringify(manifest)); assert.throws(() => checkPreviews(atlas), /duplicate combination/);
  manifest.previews = [{ ...record, path: 'styles/example-style/wrong.png' }];
  writeFileSync(target, JSON.stringify(manifest)); assert.throws(() => checkPreviews(atlas), /unexpected preview filename/);
  manifest.previews = []; manifest.environment = { ...ENVIRONMENT, locale: 'lt-LT' };
  writeFileSync(target, JSON.stringify(manifest)); assert.throws(() => checkPreviews(atlas), /noncanonical or stale environment/);
});
test('server restricts methods, shared roots, traversal, missing files and symlinks', async t => {
  const { root, path } = setup(t);
  symlinkSync(join(root, 'package.json'), path('assets/linked.json'));
  const server = await servePreviews(root, ['example-style']); t.after(() => server.close());
  const get = path => fetch(server.origin + path);
  assert.equal((await get('/styles/example-style/reference/index.html')).status, 200);
  assert.equal((await get('/styles/example-style/reference/style.css')).headers.get('content-type'), 'text/css; charset=utf-8');
  assert.equal((await get('/package.json')).status, 403);
  assert.equal((await get('/styles/other-style/reference/index.html')).status, 403);
  assert.equal((await get('/styles/example-style/assets/missing.png')).status, 404);
  assert.equal((await get('/styles/example-style/assets/linked.json')).status, 404);
  assert.equal((await get('/styles/example-style/assets/%2e%2e%2f%2e%2e%2fpackage.json')).status, 404);
  assert.equal((await fetch(server.origin + '/core/vocabularies.json', { method: 'POST' })).status, 405);
});
test('PNG reader rejects disguised or truncated images', () => {
  assert.throws(() => pngDimensions(Buffer.from('not a PNG')), /signature/);
  assert.throws(() => pngDimensions(Buffer.from('89504e470d0a1a0a', 'hex')), /incomplete/);
});

test('real missing-browser launcher reports not_run with a separate empty browser cache', t => {
  const { root } = setup(t);
  const code = "import {launchCanonical} from './scripts/previews.mjs'; try { const b=await launchCanonical(); await b.close(); process.exitCode=1; } catch(e) { console.error(e.status + ': ' + e.message); process.exitCode=e.status === 'not_run' ? 2 : 1; }";
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', code], { cwd: project, env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: join(root, 'empty-browser-cache') }, encoding: 'utf8', timeout: 10000 });
  assert.equal(result.status, 2); assert.match(result.stderr, /not_run:.*(Chromium unavailable|canonical host required)/);
});
test('environment migration requires --all and clears prior success before an unavailable render', async t => {
  const { root } = setup(t), target = join(root, MANIFEST);
  writeFileSync(target, JSON.stringify({ schema_version: 1, environment: { ...ENVIRONMENT, locale: 'lt-LT' }, previews: [] }));
  const launch = async () => { throw new BrowserUnavailable('migration fixture'); };
  await assert.rejects(renderPreviews({ root, style: 'example-style', launch }), /regenerate all styles/);
  await assert.rejects(renderPreviews({ root, launch }), error => error.status === 'not_run');
  assert.deepEqual(JSON.parse(readFileSync(target)).environment, ENVIRONMENT);
  assert.deepEqual(JSON.parse(readFileSync(target)).previews, []);
});
