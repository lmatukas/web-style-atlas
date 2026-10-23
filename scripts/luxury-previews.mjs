// Additive capability preflight: the established pixel renderer and its source
// hashes stay unchanged, preserving all existing accepted preview artifacts.
import { loadAtlas } from './validate.mjs';
import { launchCanonical, renderPreviews } from './previews.mjs';
import { servePreviews } from './preview-server.mjs';
import { freezeClock } from './lib/clock.mjs';
import { ROOT, isMain } from './lib/files.mjs';
import { ENVIRONMENT, VIEWPORTS, TIMEOUT } from './preview.config.mjs';
import { previewArguments } from './previews.mjs';

export async function verifyStaticFallbacks({ root = ROOT, style, launch = launchCanonical } = {}) {
  const selected = loadAtlas({ root, style }).styles.filter(s => s.runtime?.static_fallback);
  if (!selected.length) return { status: 'pass', styles: 0 };
  let browser, server;
  try {
    browser = await launch(); server = await servePreviews(root, selected.map(s => s.id));
    for (const entry of selected) for (const variant of entry.layouts.variants) for (const viewport of Object.values(VIEWPORTS)) for (const blocked of [false, true]) {
      const context = await browser.newContext({ viewport, reducedMotion: blocked ? 'no-preference' : 'reduce', locale: ENVIRONMENT.locale, timezoneId: ENVIRONMENT.timezone, serviceWorkers: 'block' });
      try {
        const errors = [];
        await context.route('**/*', async route => {
          const url = new URL(route.request().url()), path = decodeURIComponent(url.pathname).slice(1);
          if (url.origin !== server.origin || ![entry.base + '/', 'core/', 'assets/'].some(p => path.startsWith(p))) { errors.push('external or cross-style resource blocked'); await route.abort(); }
          else await route.continue();
        });
        await context.routeWebSocket(/.*/, socket => { errors.push('WebSocket blocked'); socket.close(); });
        const page = await context.newPage(); page.setDefaultTimeout(TIMEOUT);
        page.on('pageerror', error => errors.push(error.message));
        page.on('requestfailed', r => errors.push(`resource failed: ${r.url()}`));
        page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
        if (blocked) await page.addInitScript(() => {
          const get = HTMLCanvasElement.prototype.getContext;
          HTMLCanvasElement.prototype.getContext = function(type, ...args) { return /^(webgl2?|experimental-webgl)$/.test(type) ? null : get.call(this, type, ...args); };
        });
        await freezeClock(page, ENVIRONMENT.fixed_time);
        await page.goto(`${server.origin}/${entry.base}/${variant.reference_path}`, { waitUntil: 'load', timeout: TIMEOUT });
        await page.clock.runFor(1000);
        await page.waitForLoadState('networkidle', { timeout: TIMEOUT });
        const expected = new URL(`../${entry.runtime.static_fallback}`, page.url()).href;
        const valid = await page.evaluate(async expected => {
          await document.fonts.ready;
          const visible = element => element && element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().height > 0 && getComputedStyle(element).visibility !== 'hidden' && getComputedStyle(element).display !== 'none' && Number(getComputedStyle(element).opacity) > 0;
          const image = document.querySelector('img[data-runtime-fallback]'), scene = document.querySelector('[data-runtime-scene]'), status = document.querySelector('[data-runtime-status]');
          if (!image) return false;
          try { await image.decode(); } catch { return false; }
          return visible(image) && image.currentSrc === expected && image.naturalWidth > 0 && Boolean(image.alt.trim()) && visible(status) && Boolean(status.textContent.trim()) && scene?.contains(image) && ![...scene.querySelectorAll('canvas')].some(visible);
        }, expected);
        if (!valid || errors.length) throw new Error(`${entry.id}/${variant.id}: ${blocked ? 'blocked WebGL' : 'reduced motion'} requires visible declared static fallback, alt text, status and hidden canvas${errors.length ? ': ' + errors.join('; ') : ''}`);
      } finally { await context.close(); }
    }
    return { status: 'pass', styles: selected.length };
  } finally { if (server) await server.close(); if (browser) await browser.close(); }
}
export async function renderLuxuryPreviews(options = {}) {
  await verifyStaticFallbacks(options);
  return renderPreviews(options);
}
if (isMain(import.meta.url)) {
  try { const result = await renderLuxuryPreviews(previewArguments(process.argv.slice(2))); console.log(`${result.status.toUpperCase()}: ${JSON.stringify(result)}`); }
  catch (error) { console.error(`${error.status === 'not_run' ? 'NOT_RUN' : 'FAIL'}: ${error.message}`); process.exitCode = error.status === 'not_run' ? 2 : 1; }
}
