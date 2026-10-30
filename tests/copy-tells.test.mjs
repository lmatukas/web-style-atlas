import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readdirSync, readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';

// P82–P86 remove IDs as their last failing reference is rewritten.
// Never add directions or the gallery to this list.
export const COPY_BACKLOG = [
  "acoustic-sculpture",
  "architectural-monograph",
  "art-deco",
  "balcony-builder",
  "bauhaus-geometric",
  "botanical-engraving",
  "cinematic-photo",
  "data-observatory",
  "discovery-cabinet",
  "kinetic-type",
  "membrane-score",
  "newspaper-ledger",
  "organic-craft",
  "patina-auction-room",
  "quiet-luxury",
  "rhythm-planner",
  "seasonal-terrain",
  "soft-spatial",
  "spine-editions",
  "swiss-grid",
  "trail-composer",
  "twilight-expedition"
];

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
const entities = {amp: '&', nbsp: ' ', mdash: '—', ndash: '–', period: '.', excl: '!', quest: '?', quot: '"', apos: "'", rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“'};
function decode(text) {
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, name) => {
    if (name.startsWith('#')) {
      const point = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : Number(name.slice(1));
      return point <= 0x10ffff ? String.fromCodePoint(point) : match;
    }
    return entities[name.toLowerCase()] ?? match;
  });
}
function textOf(html) {
  return decode(html.replace(/<\/?(?:br|p|div|section|article|li|h[1-6]|a|td|th)\b[^>]*>/gi, ' ')
    .replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
}

export function copyProblems(html) {
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  const body = /<body\b[^>]*>([\s\S]*?)<\/body\s*>/i.exec(clean)?.[1] ?? clean;
  const text = textOf(body), problems = [];
  for (const [, headingHtml] of body.matchAll(/<h[12]\b[^>]*>([\s\S]*?)<\/h[12]\s*>/gi)) {
    const heading = textOf(headingHtml);
    const sentences = heading.split(/[.!?]+[”’"']*(?:\s+|$)/u).filter(s => words(s).length);
    const fragments = sentences.length >= 2 && sentences.every(s => words(s).length <= 4);
    const contrast = /^(?:less|not)\b.+[.!?]\s*more\b.+/i.test(heading);
    const countPair = /^(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|several|many)\b.+[.!?]\s*one\b.+/i.test(heading);
    if (fragments || contrast || countPair) problems.push(`formula heading: ${heading}`);
  }
  if (/\bnot\s+just\b/i.test(text)) problems.push('contains "not just"');
  const count = words(text).length, dashes = (text.match(/—/g) ?? []).length;
  // One dash is allowed on a short page; longer pages must stay at <= 1/300 words.
  if (dashes > Math.max(1, count / 300)) problems.push(`${dashes} em dashes in ${count} words (maximum one per 300 words)`);
  for (const [, label] of body.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a\s*>/gi)) {
    if (/^[\s↗↘→←↑↓↔⇒➜➔]+$/u.test(textOf(label))) problems.push('arrow-only link');
  }
  return problems;
}

export function referenceProblems() {
  const styles = new Map();
  for (const id of readdirSync(new URL('styles/', root)).sort()) {
    const dir = `styles/${id}/reference/`;
    if (!existsSync(new URL(dir, root))) continue;
    const failures = [];
    for (const file of readdirSync(new URL(dir, root)).filter(f => f.endsWith('.html')).sort()) {
      failures.push(...copyProblems(read(dir + file)).map(problem => `${dir + file}: ${problem}`));
    }
    styles.set(id, failures);
  }
  return styles;
}

export function backlogProblems(styles, backlog = COPY_BACKLOG) {
  const problems = [], listed = new Set(backlog);
  if (listed.size !== backlog.length) problems.push('COPY_BACKLOG has duplicate IDs');
  for (const id of listed) if (!styles.has(id)) problems.push(`${id}: unknown COPY_BACKLOG direction`);
  for (const [id, failures] of styles) {
    if (failures.length && !listed.has(id)) problems.push(...failures);
    if (!failures.length && listed.has(id)) problems.push(`${id}: clean; remove from COPY_BACKLOG`);
  }
  return problems;
}

test('copy guard detects formulas through inline markup and entities', () => {
  for (const heading of ['Less noise. More clarity.', 'Not another ordinary website. More room for the work you love.', '24 different kinds of work. One place to keep them together.', 'Two layouts. One direction.', 'Keep the <em>idea.</em><br>Make it yours.', 'Built with care! Made to last?', 'First&period; Second&excl;']) {
    assert.match(copyProblems(`<h2>${heading}</h2>`).join('\n'), /formula heading/, heading);
  }
  assert.match(copyProblems('<p>NOT <em>just</em> a colour.</p>').join('\n'), /not just/);
  assert.match(copyProblems('<a href="#details">&#8594;</a>').join('\n'), /arrow-only/);
  assert.deepEqual(copyProblems('<h1>Compare working layouts for your next website.</h1><h2>One practical guide to choosing a layout.</h2><a href="example.html">Open example ↗</a>'), []);
  assert.deepEqual(copyProblems('<h2>Nocturne N.01</h2><h2>Version 2.0</h2><h2>My stops.<span>0 / 4</span></h2>'), []);
  assert.deepEqual(copyProblems('<script>"not just — —"</script><style>/* not just */</style><!-- not just --><p title="not just">A useful layout.</p>'), []);
});

test('em dash allowance uses visible words and decoded entities', () => {
  const page = (count, dashes) => `<p>${Array(count).fill('word').join(' ')} ${dashes}</p>`;
  assert.deepEqual(copyProblems(page(20, '—')), []);
  assert.match(copyProblems(page(300, '&mdash; &#8212;')).join('\n'), /2 em dashes/);
  assert.match(copyProblems(page(599, '— —')).join('\n'), /2 em dashes/);
  assert.deepEqual(copyProblems(page(600, '— —')), []);
  assert.match(copyProblems(page(600, '— — &#x2014;')).join('\n'), /3 em dashes/);
});

test('backlog rejects new failures, stale entries, unknown IDs and duplicates', () => {
  const styles = new Map([['old', ['old/index.html: formula heading']], ['clean', []]]);
  assert.deepEqual(backlogProblems(styles, ['old']), []);
  assert.match(backlogProblems(styles, []).join('\n'), /old\/index.html/);
  assert.match(backlogProblems(styles, ['old', 'clean']).join('\n'), /clean; remove/);
  assert.match(backlogProblems(styles, ['old', 'gallery']).join('\n'), /unknown/);
  assert.match(backlogProblems(styles, ['old', 'old']).join('\n'), /duplicate/);
});

test('reference copy backlog lists exactly the remaining failing directions', () => {
  assert.ok(COPY_BACKLOG.length <= 42, 'P81 started with 42 failing directions; COPY_BACKLOG may only shrink');
  assert.deepEqual(COPY_BACKLOG, [...COPY_BACKLOG].sort(), 'keep the backlog sorted');
  assert.deepEqual(backlogProblems(referenceProblems()), []);
});

test('a pull request can only remove IDs from the base branch copy backlog', t => {
  if (!process.env.GITHUB_EVENT_PATH) return t.skip('PR base comparison runs in GitHub Actions');
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const base = event.pull_request?.base?.sha;
  if (!base) return t.skip('no pull request base in this event');
  assert.match(base, /^[0-9a-f]{40}$/);
  const path = 'tests/copy-tells.test.mjs';
  const git = args => execFileSync('git', args, {cwd: root, encoding: 'utf8'});
  if (!git(['ls-tree', '--name-only', base, '--', path]).trim()) return; // P81 introduces the guard.
  const source = git(['show', `${base}:${path}`]);
  const list = /export const COPY_BACKLOG = (\[[\s\S]*?\]);/.exec(source)?.[1];
  assert.ok(list, 'base COPY_BACKLOG must remain a JSON array literal');
  const previous = new Set(JSON.parse(list));
  assert.deepEqual(COPY_BACKLOG.filter(id => !previous.has(id)), [], 'COPY_BACKLOG may only shrink relative to the PR base');
});

test('gallery template passes without any backlog exemption', () => {
  assert.deepEqual(copyProblems(read('gallery/template.html')), []);
});

test('rendered gallery copy passes including generated cards', async () => {
  const {galleryFiles} = await import('../scripts/gallery.mjs');
  const index = JSON.parse(read('catalog/index.json'));
  const html = galleryFiles({root: fileURLToPath(root)}, index).get('dist/index.html').toString();
  assert.deepEqual(copyProblems(html), []);
  assert.doesNotMatch(html, /\{\{[A-Z]+\}\}/, 'all gallery placeholders must resolve');
});
