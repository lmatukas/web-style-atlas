// Release gate used by .github/workflows/release.yml.
// Reads the version from package.json and derives catalogue counts, so a new
// release only needs package.json, CHANGELOG.md and docs/releases/<version>.md.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';
import { previewLimit, formatLimit, MAX_MEDIA_BYTES } from './preview.config.mjs';

const MEDIA = /\.(png|webp|jpe?g|avif|gif|svg|woff2?|mp4|webm)$/i;
function mediaBytes(dir) {
  let total = 0;
  if (!existsSync(dir)) return 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) total += mediaBytes(path);
    else if (MEDIA.test(entry.name)) total += statSync(path).size;
  }
  return total;
}

export function releaseGate(root = '.') {
  const read = path => readFileSync(`${root}/${path}`, 'utf8');
  const { version } = JSON.parse(read('package.json'));
  assert.match(version, /^\d+\.\d+\.\d+$/, `package.json version "${version}" is not x.y.z`);
  const lock = JSON.parse(read('package-lock.json'));
  assert.equal(lock.version, version, 'package-lock.json version differs from package.json');
  assert.ok(read('CHANGELOG.md').split('\n').some(line => line.startsWith(`## ${version} `)), `CHANGELOG.md has no "## ${version}" entry`);
  assert.ok(existsSync(`${root}/docs/releases/${version}.md`), `docs/releases/${version}.md is missing`);

  const styles = JSON.parse(read('catalog/index.json')).styles;
  assert.ok(styles.length > 0, 'catalogue is empty');
  let variants = 0, previews = 0;
  for (const style of styles) {
    assert.equal(style.status, 'ready', `${style.id} is not ready`);
    assert.equal(style.variants.length, 2, `${style.id} must have exactly two variants`);
    for (const variant of style.variants) {
      variants++;
      assert.ok(existsSync(`${root}/${variant.reference_path}`), `missing ${variant.reference_path}`);
      for (const preview of [variant.preview_path, variant.preview_mobile_path]) {
        const limit = previewLimit(style);
        assert.ok(statSync(`${root}/${preview}`).size <= limit, `${preview} exceeds ${formatLimit(limit)}`);
        previews++;
      }
    }
  }
  assert.equal(previews, styles.length * 4, 'each style needs four previews');
  const media = mediaBytes(`${root}/styles`) + mediaBytes(`${root}/assets`);
  assert.ok(media <= MAX_MEDIA_BYTES, `versioned media ${media} bytes exceeds ${formatLimit(MAX_MEDIA_BYTES)}`);
  return { version, styles: styles.length, variants, previews, media };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const r = releaseGate();
    const line = `${r.version}: ${r.styles} styles / ${r.variants} variants / ${r.previews} previews`;
    console.log(process.argv.includes('--summary')
      ? `Verified ${r.version} catalogue (${r.styles} styles, ${r.variants} references, ${r.previews} previews). Public URL must still be opened after deployment.`
      : line);
  } catch (error) {
    console.error(`Release gate failed: ${error.message}`);
    process.exitCode = 1;
  }
}
