import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Reference pages link only to local files. Source URLs belong in assets/RIGHTS.txt.
const ALLOWED_HOSTS = new Set(['www.w3.org']);
// Fingerprints of retired demo names (one or two words, exact case forms).
const RETIRED = new Set(["3ddd6ccbcc06d7d3","495f70e0e6185d0c","5e0c8336aff087a8","6a7fe424ee3597e0","1c361bb3f98e3714","207bba0220ff49c9","04086d6e27217bd7","e7784cf00990c7f5","fc5e5674ca535729","edca4c8901ba3d17","d7a560101874df71","faf4cec4bc508b56","2a59f405c4a69277","40ecd86b2fe8b6ae","c6281a5300dac70f","912df7bbd0e43ee8","4352edcee0ab65ec","d64ee4608edb51ef","44b6fe52419631de","606e86879a6357b4","2a396bad00331108","a6df114bd22dddaf","0d5ecc5cd77de278","f6e59484fe790f2c","a2ba731a7e7d2424","629f5fc2b706305f","8ab91fe7c9f1d0d8","70a60af488215d3a","cbfd527d1e6e4fc3","d7b917409c48e4c7","43d5542683d5fa54"]);
const fingerprint = s => createHash('sha256').update(s).digest('hex').slice(0, 16);

const pages = readdirSync('styles').flatMap(id => {
  const dir = join('styles', id, 'reference');
  return existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith('.html')).map(f => join(dir, f)) : [];
});

test('reference pages carry no external website links', () => {
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    for (const [, host] of html.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)) {
      assert.ok(ALLOWED_HOSTS.has(host.toLowerCase()), `${page} links to ${host}; move it to assets/RIGHTS.txt`);
    }
  }
});

test('reference pages do not reuse retired demo names', () => {
  for (const page of pages) {
    const words = readFileSync(page, 'utf8').replace(/<[^>]+>/g, ' ').match(/[\p{L}]+/gu) ?? [];
    words.forEach((word, i) => {
      for (const candidate of [word, i + 1 < words.length ? `${word} ${words[i + 1]}` : null]) {
        if (candidate) assert.ok(!RETIRED.has(fingerprint(candidate)), `${page} reuses a retired demo name near "${word}"`);
      }
    });
  }
});
