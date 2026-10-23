import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { releaseGate } from '../scripts/release-gate.mjs';

test('release gate passes on the current repository and derives counts', () => {
  const result = releaseGate('.');
  const styles = JSON.parse(readFileSync('catalog/index.json', 'utf8')).styles.length;
  assert.equal(result.version, JSON.parse(readFileSync('package.json', 'utf8')).version);
  assert.deepEqual([result.styles, result.variants, result.previews], [styles, styles * 2, styles * 4]);
});

test('release gate rejects a version without lock, changelog and release notes', () => {
  const root = mkdtempSync(join(tmpdir(), 'release-gate-'));
  try {
    for (const path of ['package.json', 'package-lock.json', 'CHANGELOG.md', 'catalog', 'docs/releases']) cpSync(path, join(root, path), { recursive: true });
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    writeFileSync(join(root, 'package.json'), JSON.stringify({ ...pkg, version: '9.9.9' }));
    assert.throws(() => releaseGate(root), /package-lock\.json version differs/);
    const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));
    writeFileSync(join(root, 'package-lock.json'), JSON.stringify({ ...lock, version: '9.9.9' }));
    assert.throws(() => releaseGate(root), /CHANGELOG\.md has no "## 9\.9\.9" entry/);
    writeFileSync(join(root, 'CHANGELOG.md'), '## 9.9.9 — prepared\n');
    assert.throws(() => releaseGate(root), /docs\/releases\/9\.9\.9\.md is missing/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('photo-led styles get a larger preview limit; others keep 1 MiB', async () => {
  const { previewLimit, MAX_PNG_BYTES, MAX_PHOTO_PNG_BYTES } = await import('../scripts/preview.config.mjs');
  assert.equal(previewLimit({ image_dependency: 'high' }), MAX_PHOTO_PNG_BYTES);
  assert.equal(previewLimit({ image_dependency: 'medium' }), MAX_PNG_BYTES);
  assert.equal(previewLimit(), MAX_PNG_BYTES);
  assert.equal(MAX_PNG_BYTES, 1024 * 1024);
  assert.equal(MAX_PHOTO_PNG_BYTES, 3 * 1024 * 1024);
});
