import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync, symlinkSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { contrastRatio, loadAtlas } from '../scripts/validate.mjs';
import { build } from '../scripts/build.mjs';
import { argumentsFor, localFile } from '../scripts/lib/files.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));
function fixture(t, { status = 'ready', id = 'example-style' } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'atlas-p02-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const path of ['gallery', 'schema', 'core/vocabularies.json', 'docs/progress.json', 'docs/STATUS.md']) {
    mkdirSync(join(root, path.includes('.') ? path.slice(0, path.lastIndexOf('/')) : path), { recursive: true });
    cpSync(join(source, path), join(root, path), { recursive: true });
  }
  const base = `styles/${id}`;
  mkdirSync(join(root, 'styles'), { recursive: true });
  cpSync(join(source, 'templates/style'), join(root, base), { recursive: true });
  const md = join(root, base, 'style.md');
  writeFileSync(md, readFileSync(md, 'utf8').replace('id: example-style', `id: ${id}`).replace('status: draft', `status: ${status}`));
  mkdirSync(join(root, base, 'reference'), { recursive: true });
  for (const page of ['index.html', 'alternate.html']) writeFileSync(join(root, base, 'reference', page), '<!doctype html><link rel="stylesheet" href="tokens.css"><p>Pipeline fixture only</p>\n');
  writeFileSync(join(root, base, 'reference/style.css'), 'body { color: var(--color-text); background: var(--color-background); }\n');
  const change = (file, mutate) => { const path = join(root, base, file); const value = JSON.parse(readFileSync(path, 'utf8')); mutate(value); writeFileSync(path, JSON.stringify(value)); };
  return { root, base, md, change };
}

test('a complete source fixture validates before previews exist', t => {
  const { root } = fixture(t);
  const atlas = loadAtlas({ root });
  assert.equal(atlas.styles.length, 1);
  assert.equal(existsSync(join(root, 'styles/example-style/preview.png')), false);
  build({ root });
  const index = JSON.parse(readFileSync(join(root, 'catalog/index.json')));
  assert.equal(index.styles[0].id, 'example-style');
  assert.equal(index.styles[0].variants[1].preview_mobile_path, 'styles/example-style/preview-alt-mobile.png');
});

test('wrong directory ID reports source file and field', t => {
  const { root, md } = fixture(t);
  writeFileSync(md, readFileSync(md, 'utf8').replace('id: example-style', 'id: another-style'));
  assert.throws(() => loadAtlas({ root }), /styles\/example-style\/style.md \/id: must equal/);
});

test('missing required field and bad enum report actionable JSON pointers', t => {
  const { root, md } = fixture(t);
  const original = readFileSync(md, 'utf8');
  writeFileSync(md, original.replace('family: typographic\n', ''));
  assert.throws(() => loadAtlas({ root }), /style.md \/family: must have required property/);
  writeFileSync(md, original.replace('density: balanced', 'density: tiny'));
  assert.throws(() => loadAtlas({ root }), /style.md \/density: must be equal/);
});

test('malformed/duplicate YAML is parsed by YAML and fails with context', t => {
  const { root, md } = fixture(t);
  writeFileSync(md, readFileSync(md, 'utf8').replace('schema_version: 1', 'schema_version: 1\nschema_version: 1'));
  assert.throws(() => loadAtlas({ root }), /style.md \/frontmatter:.*unique/i);
});

test('unknown vocabulary, missing sections and ready word budget are rejected', t => {
  const { root, md } = fixture(t);
  const original = readFileSync(md, 'utf8');
  writeFileSync(md, original.replace('family: typographic', 'family: invented'));
  assert.throws(() => loadAtlas({ root }), /\/family: unregistered/);
  writeFileSync(md, original.replace('## Intent', '## Removed'));
  assert.throws(() => loadAtlas({ root }), /\/sections\/Intent/);
  const start = original.indexOf('\n# Example Style Template');
  writeFileSync(md, original.slice(0, start) + [...original.matchAll(/^## .+$/gm)].map(m => m[0]).join('\n'));
  assert.throws(() => loadAtlas({ root }), /\/body:.*700–1200/);
});

test('a missing authored reference or registered asset fails source validation', t => {
  const { root, base, change } = fixture(t);
  rmSync(join(root, base, 'reference/alternate.html'));
  assert.throws(() => loadAtlas({ root }), /reference\/alternate.html.*does not exist/);
  writeFileSync(join(root, base, 'reference/alternate.html'), '<!doctype html>');
  change('assets.json', data => data.assets.push({ id: 'missing', path: 'assets/missing.png', type: 'image', origin: 'original', creator: null, license: 'MIT', attribution: 'Fixture', redistribution_allowed: true, modifications: [] }));
  assert.throws(() => loadAtlas({ root }), /assets\/missing.png.*does not exist/);
});

test('local fonts must link to a matching font asset and bundled license', t => {
  const { root, base, change } = fixture(t);
  change('tokens.json', data => Object.assign(data.typography.body, { source: 'local', file: 'assets/body.woff2', asset_id: 'body-font' }));
  assert.throws(() => loadAtlas({ root }), /\/typography\/body\/asset_id/);
  mkdirSync(join(root, base, 'assets'));
  cpSync(join(source, 'tests/fixtures/luxury/fonts/NotoSans-Regular.woff2'), join(root, base, 'assets/body.woff2'));
  change('assets.json', data => data.assets.push({ id: 'body-font', path: 'assets/body.woff2', type: 'font', origin: 'third_party', source_url: 'https://example.org/font', creator: null, license: 'OFL-1.1', license_file: 'assets/OFL.txt', attribution: 'Test fixture', redistribution_allowed: true, modifications: [] }));
  assert.throws(() => loadAtlas({ root }), /assets\/OFL.txt.*does not exist/);
  cpSync(join(source, 'tests/fixtures/luxury/fonts/OFL.txt'), join(root, base, 'assets/OFL.txt'));
  build({ root });
  assert.match(readFileSync(join(root, base, 'reference/tokens.css'), 'utf8'), /src: url\("\.\.\/assets\/body.woff2"\)/);
});

test('contrast calculations reject low contrast and unknown color roles', t => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21);
  assert.equal(contrastRatio('#ffffff', '#ffffff'), 1);
  const { root, change } = fixture(t);
  change('tokens.json', data => { data.color.text = '#eeeeee'; });
  assert.throws(() => loadAtlas({ root }), /tokens.json \/contrast_pairs\/0: contrast .*below 4.5/);
  change('tokens.json', data => { data.contrast_pairs[0].foreground = 'missing'; });
  assert.throws(() => loadAtlas({ root }), /\/contrast_pairs\/0\/foreground: unknown color role/);
});

test('drafts omit references and word budget until ready; never enter either public index', t => {
  const { root, base, md } = fixture(t, { status: 'draft' });
  rmSync(join(root, base, 'reference'), { recursive: true });
  // All four authored files and required sections still exist and validate.
  const original = readFileSync(md, 'utf8');
  const start = original.indexOf('\n# Example Style Template');
  writeFileSync(md, original.slice(0, start) + [...original.matchAll(/^## .+$/gm)].map(m => m[0]).join('\n'));
  build({ root });
  assert.deepEqual(JSON.parse(readFileSync(join(root, 'catalog/index.json'))).styles, []);
  assert.doesNotMatch(readFileSync(join(root, 'catalog/index.md'), 'utf8'), /Example Style Template/);
  build({ root, check: true });
});

test('two builds are byte-identical and unchanged generated files are not rewritten', t => {
  const { root, base } = fixture(t);
  build({ root });
  const paths = [`${base}/reference/tokens.css`, 'catalog/index.json', 'catalog/index.md'];
  const before = paths.map(path => ({ text: readFileSync(join(root, path), 'utf8'), mtime: statSync(join(root, path)).mtimeMs }));
  build({ root });
  paths.forEach((path, i) => {
    assert.equal(readFileSync(join(root, path), 'utf8'), before[i].text);
    assert.equal(statSync(join(root, path)).mtimeMs, before[i].mtime);
  });
});

test('changing a real token changes its generated CSS variable; check detects drift without writing', t => {
  const { root, base, change } = fixture(t, { status: 'draft' });
  build({ root });
  const path = join(root, base, 'reference/tokens.css');
  const before = readFileSync(path, 'utf8');
  change('tokens.json', data => { data.spacing.medium = '1.25rem'; });
  assert.throws(() => build({ root, check: true }), /tokens.css.*generated drift/);
  assert.equal(readFileSync(path, 'utf8'), before);
  build({ root });
  assert.match(readFileSync(path, 'utf8'), /--spacing-medium: 1.25rem;/);
});

test('failed validation does not partially update generated output', t => {
  const { root, change } = fixture(t);
  build({ root });
  const before = readFileSync(join(root, 'catalog/index.json'), 'utf8');
  change('tokens.json', data => { data.color.text = '#ffffff'; });
  assert.throws(() => build({ root }), /contrast/);
  assert.equal(readFileSync(join(root, 'catalog/index.json'), 'utf8'), before);
});

test('unknown styles and unsafe CLI arguments are errors rather than empty success', t => {
  const { root } = fixture(t);
  assert.throws(() => loadAtlas({ root, style: 'missing' }), /unknown style ID/);
  assert.throws(() => build({ root, style: 'missing' }), /unknown style ID/);
  for (const args of [['--style'], ['--style', '../bad'], ['--unknown'], ['--style', 'example-style', '--style', 'example-style']]) assert.throws(() => argumentsFor(args));
  assert.deepEqual(argumentsFor(['--style', 'example-style']), { style: 'example-style' });
});

test('symlink assets and generated output destinations are rejected without modifying the target', t => {
  const { root, base } = fixture(t);
  const target = join(root, 'outside.txt'); writeFileSync(target, 'unchanged');
  symlinkSync(target, join(root, base, 'reference/tokens.css'));
  assert.throws(() => build({ root }), /tokens.css.*symlinks/);
  assert.equal(readFileSync(target, 'utf8'), 'unchanged');
  for (const path of ['../outside.txt', '/outside.txt', 'a/../outside.txt', 'a\\b']) assert.throws(() => localFile(root, path));
});

test('CSS injection in authored token values is rejected', t => {
  const { root, change } = fixture(t);
  change('tokens.json', data => { data.shadow.none = 'none; color: red'; });
  assert.throws(() => build({ root }), /tokens.json \/shadow\/none: unsafe CSS/);
});

test('targeted validation ignores unrelated source errors and rejects missing requested IDs', t => {
  const { root } = fixture(t);
  cpSync(join(root, 'styles/example-style'), join(root, 'styles/broken-style'), { recursive: true });
  assert.throws(() => loadAtlas({ root }), /styles\/broken-style\/style.md \/id/);
  assert.equal(loadAtlas({ root, style: 'example-style' }).styles.length, 1);
});

test('catalogue ordering is stable and Markdown metadata cannot inject rows or HTML', t => {
  const { root, md } = fixture(t);
  cpSync(join(root, 'styles/example-style'), join(root, 'styles/another-style'), { recursive: true });
  const other = join(root, 'styles/another-style/style.md');
  writeFileSync(other, readFileSync(other, 'utf8').replace('id: example-style', 'id: another-style'));
  writeFileSync(md, readFileSync(md, 'utf8').replace('name: Example Style Template', 'name: "<script> | [link]"'));
  build({ root });
  assert.deepEqual(JSON.parse(readFileSync(join(root, 'catalog/index.json'))).styles.map(style => style.id), ['another-style', 'example-style']);
  const output = readFileSync(join(root, 'catalog/index.md'), 'utf8');
  assert.doesNotMatch(output, /<script>/);
  assert.match(output, /&lt;script&gt; &#124; &#91;link&#93;/);
});

test('duplicate asset records and unresolved licenses are rejected', t => {
  const { root, base, change } = fixture(t);
  mkdirSync(join(root, base, 'assets'));
  writeFileSync(join(root, base, 'assets/image.svg'), '<svg/>');
  const asset = { id: 'image', path: 'assets/image.svg', type: 'image', origin: 'original', creator: null, license: 'MIT', attribution: 'Fixture', redistribution_allowed: true, modifications: [] };
  change('assets.json', data => { data.assets = [asset, { ...asset, id: 'second-image' }]; });
  assert.throws(() => loadAtlas({ root }), /assets.json \/assets\/1\/path: duplicate/);
  change('assets.json', data => { data.assets = [{ ...asset, license: 'unknown' }]; });
  assert.throws(() => loadAtlas({ root }), /assets.json \/assets\/0\/license: unresolved/);
});

test('a symlink reference cannot read data outside its style', t => {
  const { root, base } = fixture(t);
  const path = join(root, base, 'reference/alternate.html');
  rmSync(path);
  symlinkSync(join(root, 'docs/progress.json'), path);
  assert.throws(() => loadAtlas({ root }), /layouts.json \/variants\/1\/reference_path:.*symlinks/);
});

test('validate CLI reports failures with nonzero exit status', () => {
  const result = spawnSync(process.execPath, ['scripts/validate.mjs', '--style', 'nonexistent-style'], { cwd: source, encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /styles\/nonexistent-style \/id: unknown style ID/);
});

test('ready publication check requires an actual preview manifest', t => {
  const { root } = fixture(t);
  build({ root });
  assert.throws(() => build({ root, check: true }), /previews-manifest.json.*file does not exist/);
});
