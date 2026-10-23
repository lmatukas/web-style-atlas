import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Public reference pages must not link to outside websites or reuse names that
// belong to real companies. Source records live in each style's assets/RIGHTS.txt.
const RETIRED_NAMES = [
  'Afterlight', 'Form Assembly', 'Waymark', 'Northbridge', 'Common Ground',
  'Relay Works', 'Public Room', 'Small Wonders', 'Loud Assembly', 'Ellis Editions',
];
const RETIRED_WORDS = ['Mora'];
// Ordinary phrases in lowercase prose; only their name forms are retired.
const EVERYDAY_PHRASES = new Set(['Public Room', 'Common Ground']);
const ALLOWED_HOSTS = new Set(['www.w3.org']);

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

test('reference pages do not reuse retired real-world brand names', () => {
  for (const page of pages) {
    // Strip inline tags so a logo split as "small<br><span>wonders" still matches.
    const html = readFileSync(page, 'utf8').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    for (const name of RETIRED_NAMES) {
      const forms = [name, name.toUpperCase()];
      if (!EVERYDAY_PHRASES.has(name)) forms.push(name.toLowerCase());
      for (const form of forms) assert.ok(!html.includes(form), `${page} uses retired name ${form}`);
    }
    for (const word of RETIRED_WORDS) {
      assert.ok(!new RegExp(`\\b(${word}|${word.toUpperCase()}|${word.toLowerCase()})\\b`).test(html), `${page} uses retired name ${word}`);
    }
  }
});
