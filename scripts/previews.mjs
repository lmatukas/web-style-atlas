import {freezeClock} from './lib/clock.mjs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, lstatSync, renameSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { inflateSync } from 'node:zlib';
import { loadAtlas } from './validate.mjs';
import { ROOT, fail, localFile, json, isId, isMain, compare } from './lib/files.mjs';
import { ENVIRONMENT, VIEWPORTS, TIMEOUT, MAX_PNG_BYTES, MANIFEST, previewPath } from './preview.config.mjs';
import { servePreviews } from './preview-server.mjs';

const require = createRequire(import.meta.url);
const stable = value => Array.isArray(value) ? value.map(stable) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])])) : value;
const serialize = value => JSON.stringify(stable(value), null, 2) + '\n';
const sha = data => createHash('sha256').update(data).digest('hex');
const same = (a, b) => serialize(a) === serialize(b);
export class BrowserUnavailable extends Error { constructor(message) { super(message); this.status = 'not_run'; } }

export function previewArguments(argv) {
  if (argv.length === 1 && argv[0] === '--all') return {};
  if (argv.length === 2 && argv[0] === '--style' && isId(argv[1])) return { style: argv[1] };
  fail('arguments', '/', 'use exactly --style <id> or --all');
}
function walk(root, path) {
  const absolute = `${root}/${path}`;
  if (!existsSync(absolute)) return [];
  if (lstatSync(absolute).isSymbolicLink()) fail(path, '/', 'symlinks are not allowed');
  if (lstatSync(absolute).isFile()) { localFile(root, path); return [path]; }
  return readdirSync(absolute).sort().flatMap(name => walk(root, `${path}/${name}`));
}
export function sourceHash(root, style, environment = ENVIRONMENT) {
  // Conservative dependency closure: all authored files of this style and all
  // allowed shared resource roots, plus renderer/config/server and locked tools.
  // Other styles cannot be requested; output PNGs never hash themselves.
  const outputs = new Set(['a', 'b'].flatMap(v => Object.keys(VIEWPORTS).map(p => previewPath(style, v, p))));
  const paths = [ ...walk(root, style.base).filter(path => !outputs.has(path)), ...walk(root, 'core').filter(path => !path.endsWith('.md') && !path.startsWith('core/skill/')), ...walk(root, 'assets').filter(path => !path.endsWith('.md')),
    'scripts/previews.mjs', 'scripts/preview-server.mjs', 'scripts/preview.config.mjs', 'scripts/lib/files.mjs', 'scripts/lib/clock.mjs', 'package.json', 'package-lock.json' ].sort(compare);
  return sha(serialize({ environment, viewports: VIEWPORTS, files: paths.map(path => [path, sha(readFileSync(localFile(root, path)))]) }));
}

// Validate actual PNG chunks/CRC and inflate image data, not just the extension.
export function pngDimensions(buffer) {
  if (!buffer.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) throw new Error('invalid PNG signature');
  let offset = 8, width, height, end = false; const compressed = [];
  const crc = bytes => { let value = 0xffffffff; for (const byte of bytes) { value ^= byte; for (let i = 0; i < 8; i++) value = (value >>> 1) ^ ((value & 1) ? 0xedb88320 : 0); } return (value ^ 0xffffffff) >>> 0; };
  while (offset + 12 <= buffer.length) {
    const size = buffer.readUInt32BE(offset), next = offset + size + 12;
    if (next > buffer.length) throw new Error('truncated PNG chunk');
    const type = buffer.toString('ascii', offset + 4, offset + 8), data = buffer.subarray(offset + 8, offset + 8 + size);
    if (crc(buffer.subarray(offset + 4, next - 4)) !== buffer.readUInt32BE(next - 4)) throw new Error('invalid PNG CRC');
    if (offset === 8 && type !== 'IHDR') throw new Error('PNG must start with IHDR');
    if (type === 'IHDR') {
      if (width !== undefined || size !== 13) throw new Error('invalid PNG header');
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      if (!width || !height || width > 20000 || height > 50000 || data[8] !== 8 || ![2, 6].includes(data[9]) || data[10] || data[11] || data[12]) throw new Error('unsupported PNG layout');
    }
    if (type === 'IDAT') compressed.push(data);
    if (type === 'IEND') { if (size || next !== buffer.length) throw new Error('invalid PNG end'); end = true; break; }
    offset = next;
  }
  if (!end || !compressed.length) throw new Error('incomplete PNG');
  const header = buffer.subarray(16, 29), channels = header[9] === 6 ? 4 : 3;
  const expected = height * (width * channels + 1);
  const pixels = inflateSync(Buffer.concat(compressed), { maxOutputLength: Math.min(expected, 128 * 1024 * 1024) });
  if (pixels.length !== expected) throw new Error('invalid PNG pixel data');
  return { width, height };
}
function readManifest(atlas, optional = false) {
  if (optional && !existsSync(localFile(atlas.root, MANIFEST, { optional: true }))) return { schema_version: 1, environment: ENVIRONMENT, previews: [] };
  return atlas.check('previews-manifest', json(atlas.root, MANIFEST), MANIFEST);
}
function validateRecords(manifest) {
  if (!same(manifest.environment, ENVIRONMENT)) fail(MANIFEST, '/environment', 'noncanonical or stale environment; regenerate previews');
  const keys = new Set();
  for (const record of manifest.previews) {
    const key = `${record.style_id}/${record.variant}/${record.viewport}`;
    if (keys.has(key)) fail(MANIFEST, '/previews', `duplicate combination ${key}`);
    keys.add(key);
    if (record.path !== previewPath({ base: `styles/${record.style_id}` }, record.variant, record.viewport)) fail(MANIFEST, '/previews/path', 'unexpected preview filename');
    const viewport = VIEWPORTS[record.viewport];
    if (record.width !== viewport.width || record.height < viewport.height) fail(MANIFEST, '/previews', 'invalid full-page dimensions');
  }
}
export function checkPreviews(atlas, { style } = {}) {
  const selected = atlas.styles.filter(s => style ? s.id === style : s.metadata.status === 'ready');
  if (!selected.length) return { styles: 0 };
  const manifest = readManifest(atlas); validateRecords(manifest);
  for (const entry of selected) {
    const records = manifest.previews.filter(p => p.style_id === entry.id), hash = sourceHash(atlas.root, entry);
    if (records.length !== 4) fail(MANIFEST, entry.id, 'expected four A/B desktop/mobile previews; run npm run previews -- --style ' + entry.id);
    for (const record of records) {
      if (record.source_sha256 !== hash) fail(MANIFEST, entry.id, 'stale preview sources; run npm run previews -- --style ' + entry.id);
      const png = readFileSync(localFile(atlas.root, record.path));
      if (png.length > MAX_PNG_BYTES || sha(png) !== record.output_sha256) fail(record.path, '/', 'preview output hash/size mismatch');
      const size = pngDimensions(png);
      if (size.width !== record.width || size.height !== record.height) fail(record.path, '/', 'PNG dimensions do not match manifest');
    }
  }
  return { styles: selected.length };
}
function writeManifest(atlas, manifest) {
  manifest.previews.sort((a, b) => compare(`${a.style_id}/${a.variant}/${a.viewport}`, `${b.style_id}/${b.variant}/${b.viewport}`));
  atlas.check('previews-manifest', manifest, MANIFEST);
  const absolute = localFile(atlas.root, MANIFEST, { optional: true }), contents = serialize(manifest);
  if (existsSync(absolute) && readFileSync(absolute, 'utf8') === contents) return;
  mkdirSync(dirname(absolute), { recursive: true });
  const temporary = localFile(atlas.root, `${MANIFEST}.tmp`, { optional: true });
  writeFileSync(temporary, contents); renameSync(temporary, absolute);
}
export async function launchCanonical() {
  const os = existsSync('/etc/os-release') ? readFileSync('/etc/os-release', 'utf8') : '';
  if (process.version !== ENVIRONMENT.node || process.platform !== 'linux' || process.arch !== 'x64' || !/^ID=ubuntu$/m.test(os) || !/^VERSION_ID="24.04"$/m.test(os)) {
    throw new BrowserUnavailable(`canonical host required: ${ENVIRONMENT.platform}, Node ${ENVIRONMENT.node}`);
  }
  let chromium;
  try {
    if (require('playwright/package.json').version !== ENVIRONMENT.playwright) throw new Error('Playwright version mismatch');
    ({ chromium } = await import('playwright'));
  } catch (error) { throw new BrowserUnavailable(error.message); }
  let browser;
  try { browser = await chromium.launch({ headless: true }); }
  catch (error) { throw new BrowserUnavailable(`Chromium unavailable: ${error.message}`); }
  if (browser.version() !== ENVIRONMENT.browser_version) { await browser.close(); throw new BrowserUnavailable('Chromium version differs from canonical configuration'); }
  return browser;
}
async function bounded(promise) {
  let timer;
  try { return await Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('resource readiness timed out')), TIMEOUT); })]); }
  finally { clearTimeout(timer); }
}
async function capture(browser, origin, path, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, locale: ENVIRONMENT.locale, timezoneId: ENVIRONMENT.timezone, colorScheme: ENVIRONMENT.color_scheme, reducedMotion: ENVIRONMENT.reduced_motion, serviceWorkers: 'block', acceptDownloads: false });
  const errors = [], pending = new Set();
  try {
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) { errors.push(`external resource blocked: ${url.href}`); await route.abort(); }
      else {
        const resource = decodeURIComponent(url.pathname).slice(1), base = path.split('/').slice(0, 2).join('/') + '/';
        if (![base, 'core/', 'assets/'].some(prefix => resource.startsWith(prefix))) {
          errors.push(`resource outside style/shared roots blocked: ${url.href}`); await route.abort();
        } else await route.continue();
      }
    });
    await context.routeWebSocket(/.*/, socket => { errors.push(`WebSocket blocked: ${socket.url()}`); socket.close(); });
    const page = await context.newPage();
    page.setDefaultTimeout(TIMEOUT);
    page.on('pageerror', error => errors.push(`JavaScript: ${error.message}`));
    page.on('request', request => pending.add(request));
    page.on('requestfinished', request => pending.delete(request));
    page.on('requestfailed', request => { pending.delete(request); errors.push(`resource failed: ${request.url()} ${request.failure()?.errorText}`); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`); });
    await freezeClock(page, ENVIRONMENT.fixed_time);
    await page.addInitScript(seed => { Math.random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }, ENVIRONMENT.random_seed);
    await page.goto(`${origin}/${path}`, { waitUntil: 'load', timeout: TIMEOUT });
    await page.clock.runFor(1000);
    await bounded(page.evaluate(async () => {
      for (const image of document.images) image.loading = 'eager';
      await document.fonts.ready;
      const fonts = [...document.fonts].filter(font => font.status === 'error');
      if (fonts.length) throw new Error('font load failed: ' + fonts.map(f => f.family).join(', '));
      await Promise.all([...document.images].map(async image => {
        try { await image.decode(); } catch { throw new Error('image load failed: ' + image.currentSrc); }
        if (!image.naturalWidth) throw new Error('empty image: ' + image.currentSrc);
      }));
      if (document.querySelector('iframe, video, audio')) throw new Error('preview pages must use static media without nested frames');
    }));
    // Network-idle uses Playwright's real timers even while page time is frozen.
    await page.waitForLoadState('networkidle', { timeout: TIMEOUT });
    if (pending.size) errors.push('unfinished resources: ' + [...pending].map(r => r.url()).join(', '));
    if (errors.length) throw new Error(errors.join('\n'));
    const bounds = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }));
    if (bounds.width > 20000 || bounds.height > 50000 || viewport.width * bounds.height * 4 > 128 * 1024 * 1024) throw new Error('page exceeds bounded preview dimensions');
    const png = await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide', scale: 'css', type: 'png', timeout: TIMEOUT });
    if (errors.length) throw new Error(errors.join('\n'));
    const dimensions = pngDimensions(png);
    if (dimensions.width !== viewport.width || dimensions.height < viewport.height) throw new Error(`unexpected screenshot dimensions ${dimensions.width}x${dimensions.height}; expected width ${viewport.width} and height >= ${viewport.height}`);
    if (png.length > MAX_PNG_BYTES) throw new Error('preview exceeds 1 MiB; simplify/resize the source assets');
    return { png, ...dimensions };
  } catch (error) { throw new Error([error.message, ...errors].join('\n')); } finally { await context.close(); }
}
export async function renderPreviews({ root = ROOT, style, launch = launchCanonical } = {}) {
  const atlas = loadAtlas({ root, style }), selected = atlas.styles;
  if (!selected.length) return { status: 'not_run', styles: 0, reason: 'no authored styles to render' };
  for (const entry of selected) {
    for (const variant of entry.layouts.variants) localFile(root, `${entry.base}/${variant.reference_path}`);
    localFile(root, `${entry.base}/reference/tokens.css`);
    localFile(root, `${entry.base}/reference/style.css`);
  }
  const manifest = readManifest(atlas, true);
  if (!same(manifest.environment, ENVIRONMENT)) {
    if (style) fail(MANIFEST, '/environment', 'environment changed; regenerate all styles with npm run previews -- --all');
    manifest.environment = ENVIRONMENT; manifest.previews = [];
  }
  validateRecords(manifest);
  const stale = selected.filter(entry => { try { checkPreviews({ ...atlas, styles: [entry] }, { style: entry.id }); return false; } catch { return true; } });
  if (!stale.length) return { status: 'pass', styles: 0, reason: 'previews already current; browser not launched' };
  // Invalidate selected stale successes BEFORE launch or writes. A failed retry
  // must never leave the previous successful record for the same style.
  const staleIds = new Set(stale.map(s => s.id));
  manifest.previews = manifest.previews.filter(p => !staleIds.has(p.style_id)); writeManifest(atlas, manifest);
  let browser, server;
  try {
    browser = await launch(); server = await servePreviews(root, stale.map(s => s.id));
    for (const entry of stale) {
      const source = sourceHash(root, entry), staged = [];
      for (const variant of entry.layouts.variants) for (const [viewport, dimensions] of Object.entries(VIEWPORTS)) {
        const result = await capture(browser, server.origin, `${entry.base}/${variant.reference_path}`, dimensions);
        staged.push({ path: previewPath(entry, variant.id, viewport), ...result, style_id: entry.id, variant: variant.id, viewport });
      }
      if (sourceHash(root, entry) !== source) throw new Error(`${entry.id}: sources changed during rendering; retry`);
      // Preflight all paths before any output. Only four complete captures can
      // produce a success record; partial PNG writes remain explicitly untracked.
      for (const item of staged) localFile(root, item.path, { optional: true });
      for (const { png, ...record } of staged) {
        const absolute = localFile(root, record.path, { optional: true });
        if (!existsSync(absolute) || !readFileSync(absolute).equals(png)) writeFileSync(absolute, png);
        manifest.previews.push({ ...record, output_sha256: sha(png), source_sha256: source });
      }
      writeManifest(atlas, manifest);
    }
    return { status: 'pass', styles: stale.length };
  } finally { if (server) await server.close(); if (browser) await browser.close(); }
}
// Resource/PNG smoke only. P08 adds overflow, controls and accessibility gates.
// This never regenerates baseline PNGs or changes a manifest.
export async function smokePreviews({ root = ROOT, style } = {}) {
  const atlas = loadAtlas({ root, style });
  const selected = atlas.styles.filter(s => style || s.metadata.status === 'ready');
  if (!selected.length) return { status: 'not_run', styles: 0, reason: 'no selected reference pages' };
  let browser, server;
  try {
    browser = await launchCanonical(); server = await servePreviews(root, selected.map(s => s.id));
    for (const entry of selected) for (const variant of entry.layouts.variants) for (const dimensions of Object.values(VIEWPORTS)) {
      await capture(browser, server.origin, `${entry.base}/${variant.reference_path}`, dimensions);
    }
    return { status: 'pass', styles: selected.length };
  } finally { if (server) await server.close(); if (browser) await browser.close(); }
}
if (isMain(import.meta.url)) {
  try {
    const argv = process.argv.slice(2), smoke = argv[0] === '--test';
    if (smoke) argv.shift();
    const options = previewArguments(smoke && !argv.length ? ['--all'] : argv);
    const result = await (smoke ? smokePreviews(options) : renderPreviews(options));
    console.log(`${result.status.toUpperCase()}: ${JSON.stringify(result)}`);
    if (result.status === 'not_run') process.exitCode = 2;
  } catch (error) { console.error(`${error.status === 'not_run' ? 'NOT_RUN' : 'FAIL'}: ${error.message}`); process.exitCode = error.status === 'not_run' ? 2 : 1; }
}
