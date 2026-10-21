import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyze, footerText, firstHeading, loadEntries, warningsFor } from '../scripts/distinctiveness.mjs';

const page = (footer, h1 = 'Hello') => `<html><body><h1>${h1}</h1><footer>${footer}</footer></body></html>`;

test('shared asset hashes across styles produce one warning', () => {
  const w = analyze([
    { id: 'a', html: null, assets: [{ path: 'x.webp', sha256: 'h1' }] },
    { id: 'b', html: null, assets: [{ path: 'y.webp', sha256: 'h1' }] },
    { id: 'c', html: null, assets: [{ path: 'z.webp', sha256: 'h2' }] },
  ]);
  assert.equal(w.filter(x => x.kind === 'shared-asset').length, 1);
  assert.deepEqual(w[0].styles, ['a', 'b']);
});

test('same asset repeated inside one style is not a cross-style warning', () => {
  const w = analyze([{ id: 'a', html: null, assets: [{ path: 'x', sha256: 'h' }, { path: 'y', sha256: 'h' }] }]);
  assert.equal(w.length, 0);
});

test('boilerplate phrase shared by threshold styles is reported even with different names', () => {
  const entries = ['one', 'two', 'three'].map(id => ({ id, html: page(`${id} projektas. Fictional reference original design study.`), assets: [] }));
  const w = analyze(entries, { footerThreshold: 3 });
  const b = w.find(x => x.kind === 'footer-boilerplate');
  assert.ok(b, 'boilerplate warning expected');
  assert.deepEqual(b.styles, ['one', 'three', 'two']);
});

test('below threshold no boilerplate warning', () => {
  const entries = ['one', 'two'].map(id => ({ id, html: page('Fictional reference original design study.'), assets: [] }));
  assert.equal(analyze(entries, { footerThreshold: 3 }).filter(x => x.kind === 'footer-boilerplate').length, 0);
});

test('footer and heading extraction strip tags and whitespace', () => {
  assert.equal(footerText('<footer>  A  <span>b</span>\n c </footer>'), 'A b c');
  assert.equal(firstHeading('<h1 class="x">Ką <em>čia</em></h1>'), 'Ką čia');
  assert.equal(footerText('<p>none</p>'), null);
});

test('repository analysis is advisory and reads all styles', () => {
  const entries = loadEntries();
  assert.equal(entries.length, 39);
  assert.ok(Array.isArray(warningsFor()));
});
