import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, rmSync, statSync, existsSync, mkdirSync, cpSync } from 'node:fs';
import { join } from 'node:path';
import { fixture } from '../helpers/preview-fixture.mjs';
import { renderPreviews, launchCanonical, pngDimensions, checkPreviews, smokePreviews } from '../../scripts/previews.mjs';
import { loadAtlas } from '../../scripts/validate.mjs';
import { build } from '../../scripts/build.mjs';
import { MANIFEST } from '../../scripts/preview.config.mjs';
const setup = t => { const f = fixture(); t.after(() => rmSync(f.root, { recursive: true, force: true })); return f; };

test('canonical Chromium creates four readable full-page PNGs; rerun is a no-op; freshness is read-only', { timeout: 60000 }, async t => {
  const f = setup(t), { root, path } = f;
  const result = await renderPreviews({ root }); assert.equal(result.status, 'pass'); assert.equal(result.styles, 1);
  const manifestPath = join(root, MANIFEST), manifest = JSON.parse(readFileSync(manifestPath));
  assert.equal(manifest.previews.length, 4);
  for (const record of manifest.previews) {
    const png = readFileSync(join(root, record.path)), size = pngDimensions(png);
    assert.equal(size.width, record.viewport === 'desktop' ? 1440 : 390); assert.ok(size.height > 1100);
    assert.ok(png.length < 1024 * 1024);
  }
  build({ root }); build({ root, check: true });
  const smokeManifest = readFileSync(manifestPath);
  assert.equal((await smokePreviews({ root, style: 'example-style' })).status, 'pass');
  assert.deepEqual(readFileSync(manifestPath), smokeManifest);
  const before = [readFileSync(manifestPath), ...manifest.previews.map(p => readFileSync(join(root, p.path)))];
  const mtime = statSync(manifestPath).mtimeMs;
  assert.equal((await renderPreviews({ root, launch: () => { throw new Error('must not launch'); } })).styles, 0);
  assert.equal(statSync(manifestPath).mtimeMs, mtime);
  // Force a second actual render without changing inputs; exact bytes repeat.
  rmSync(manifestPath); await renderPreviews({ root });
  assert.deepEqual(readFileSync(manifestPath), before[0]);
  manifest.previews.forEach((p, i) => assert.deepEqual(readFileSync(join(root, p.path)), before[i + 1]));
  const css = readFileSync(path('reference/style.css'), 'utf8'); writeFileSync(path('reference/style.css'), css + '\nbody { background: #ffdddd; }');
  assert.throws(() => build({ root, check: true }), /stale preview sources/);
  assert.deepEqual(readFileSync(manifestPath), before[0]);
  await renderPreviews({ root });
  assert.notDeepEqual(readFileSync(path('preview.png')), before[1]); build({ root }); build({ root, check: true });
  const svg = readFileSync(path('assets/shape.svg'), 'utf8'); writeFileSync(path('assets/shape.svg'), svg.replace('#315349', '#993344'));
  assert.throws(() => checkPreviews(loadAtlas({ root })), /stale preview sources/);
  writeFileSync(path('assets/shape.svg'), svg);
  const record = JSON.parse(readFileSync(manifestPath)).previews[0], output = join(root, record.path), png = readFileSync(output);
  writeFileSync(output, Buffer.concat([png, Buffer.from('corruption')]));
  assert.throws(() => checkPreviews(loadAtlas({ root })), /output hash\/size mismatch/);
  // Save a single temporary evidence copy outside the repository when requested.
  if (process.env.ATLAS_PREVIEW_EVIDENCE) {
    mkdirSync(process.env.ATLAS_PREVIEW_EVIDENCE, { recursive: true });
    cpSync(path('preview-mobile.png'), join(process.env.ATLAS_PREVIEW_EVIDENCE, 'fixture-mobile.png'));
    cpSync(path('preview.png'), join(process.env.ATLAS_PREVIEW_EVIDENCE, 'fixture-desktop.png'));
  }
});

test('failed resources, fonts, scripts and external requests leave no success records', { timeout: 60000 }, async t => {
  const { root, path } = setup(t), original = readFileSync(path('reference/index.html'), 'utf8');
  const browser = await launchCanonical(); t.after(() => browser.close());
  const launch = async () => ({ newContext: (...args) => browser.newContext(...args), close: async () => {} });
  for (const [html, pattern] of [
    [original.replace('../assets/shape.svg', '../assets/missing.svg'), /HTTP 404|image load failed/],
    [original.replace('</head>', '<style>@font-face { font-family: Broken; src: url(../assets/broken.woff2) } body { font-family: Broken }</style></head>'), /font load failed|bundled fonts require/],
    [original.replace('</body>', '<script>throw new Error("fixture-script-error")</script></body>'), /fixture-script-error/],
    [original.replace('../assets/shape.svg', 'https://example.org/remote.svg'), /external resource blocked|image load failed/],
  ]) {
    if (html.includes('Broken')) writeFileSync(path('assets/broken.woff2'), 'invalid font fixture');
    writeFileSync(path('reference/index.html'), html);
    await assert.rejects(renderPreviews({ root, launch }), pattern);
    if (existsSync(join(root, MANIFEST))) assert.deepEqual(JSON.parse(readFileSync(join(root, MANIFEST))).previews, []);
    assert.equal(existsSync(path('preview.png')), false);
    rmSync(path('assets/broken.woff2'), { force: true });
  }
});

test('failure after A captures publishes no partial success; scoped renders preserve unrelated entries', { timeout: 60000 }, async t => {
  const { root, base, path } = setup(t);
  const original = readFileSync(path('reference/alternate.html'), 'utf8');
  writeFileSync(path('reference/alternate.html'), original.replace('../assets/shape.svg', '../assets/missing.svg'));
  await assert.rejects(renderPreviews({ root }), /HTTP 404|image load failed/);
  assert.deepEqual(JSON.parse(readFileSync(join(root, MANIFEST))).previews, []);
  assert.equal(existsSync(path('preview.png')), false);
  writeFileSync(path('reference/alternate.html'), original);
  await renderPreviews({ root, style: 'example-style' });
  const first = JSON.parse(readFileSync(join(root, MANIFEST))).previews;
  cpSync(join(root, base), join(root, 'styles/second-style'), { recursive: true });
  const md = join(root, 'styles/second-style/style.md');
  writeFileSync(md, readFileSync(md, 'utf8').replace('id: example-style', 'id: second-style'));
  // A different style's source is outside the selected dependency closure.
  await renderPreviews({ root, style: 'second-style' });
  const all = JSON.parse(readFileSync(join(root, MANIFEST))).previews;
  assert.equal(all.length, 8);
  assert.deepEqual(all.filter(p => p.style_id === 'example-style'), first);
  assert.equal((await renderPreviews({ root, launch: () => { throw new Error('up-to-date catalogue must not launch'); } })).styles, 0);
  // Cross-style resources cannot evade the source hash in an --all run.
  const html = readFileSync(path('reference/index.html'), 'utf8');
  writeFileSync(path('reference/index.html'), html.replace('../assets/shape.svg', '/styles/second-style/assets/shape.svg'));
  await assert.rejects(renderPreviews({ root }), /outside style\/shared roots blocked/);
  const retained = JSON.parse(readFileSync(join(root, MANIFEST))).previews;
  assert.equal(retained.length, 4); assert.ok(retained.every(p => p.style_id === 'second-style'));
});

test('P25 canonical fixture renders local OFL/Lithuanian font and CC0 image with reduced/blocked-WebGL static fallback', { timeout: 90000 }, async t => {
  const { renderLuxuryPreviews, verifyStaticFallbacks } = await import('../../scripts/luxury-previews.mjs');
  const { luxuryFixture } = await import('../helpers/luxury-fixture.mjs');
  const f = luxuryFixture(); t.after(() => rmSync(f.root, { recursive: true, force: true }));
  assert.deepEqual(await renderLuxuryPreviews({ root: f.root }), { status: 'pass', styles: 1 });
  build({ root: f.root }); build({ root: f.root, check: true });
  const { servePreviews } = await import('../../scripts/preview-server.mjs');
  const browser = await launchCanonical(), server = await servePreviews(f.root, ['example-style']);
  t.after(async () => { await browser.close(); await server.close(); });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto(`${server.origin}/${f.base}/reference/index.html`); await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.evaluate(() => document.fonts.check('20px "Noto Sans"', 'ĄČĘĖĮŠŲŪŽąčęėįšųūž') && [...document.fonts].some(f => f.family.replaceAll('"', '') === 'Noto Sans' && f.status === 'loaded')), true);
  if (process.env.ATLAS_PREVIEW_EVIDENCE) {
    mkdirSync(process.env.ATLAS_PREVIEW_EVIDENCE, { recursive: true });
    cpSync(f.path('preview-mobile.png'), join(process.env.ATLAS_PREVIEW_EVIDENCE, 'p25-fixture-mobile.png'));
    cpSync(f.path('preview.png'), join(process.env.ATLAS_PREVIEW_EVIDENCE, 'p25-fixture-desktop.png'));
  }
  const { runtimeGate } = await import('../../scripts/runtime-qa.mjs');
  assert.deepEqual(await runtimeGate({ root: f.root }), { styles: 1, cases: 6 });
  // A fallback that is missing only in one mode must fail and invalidate the
  // generation before any new captures; old artifacts remain stale by source hash.
  const scene = readFileSync(f.path('reference/scene.mjs'), 'utf8');
  for (const [modified, pattern] of [
    [scene.replace("status.textContent='Statinis vaizdas: sumažintas judesys.';return;", "fallback.hidden=true;return;"), /reduced motion requires/],
    [scene.replace('if(!gl)return backup();', 'if(!gl){backup();fallback.hidden=true;return;}'), /blocked WebGL requires/],
  ]) {
    writeFileSync(f.path('reference/scene.mjs'), modified);
    await assert.rejects(verifyStaticFallbacks({ root: f.root }), pattern);
  }
});
