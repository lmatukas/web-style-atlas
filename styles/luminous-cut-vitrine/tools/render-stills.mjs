// Renders the original WebGL stone into static PNG stills (fallback and collection views).
// Usage: node styles/luminous-cut-vitrine/tools/render-stills.mjs <outDir> [preset[:metal][:light]] ...
import { mkdirSync } from 'node:fs';
import { launchForChecks } from './browser.mjs';
import { servePreviews } from '../../../scripts/preview-server.mjs';

const [out = 'test-results/s53-stills', ...requested] = process.argv.slice(2);
const jobs = (requested.length ? requested : ['hero', 'ring:yellow', 'pendant:white', 'earrings:platinum']).map(spec => {
  const [preset, metal = 'white', light = '0.35', w = '900', h = '900'] = spec.split(':');
  return { preset, metal, light, w, h, name: `${preset}-${metal}` };
});
mkdirSync(out, { recursive: true });
const { browser } = await launchForChecks(), server = await servePreviews(process.cwd(), ['luminous-cut-vitrine']);
try {
  for (const job of jobs) {
    const page = await browser.newPage({ viewport: { width: Number(job.w), height: Number(job.h) }, deviceScaleFactor: 1 });
    const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(`${server.origin}/styles/luminous-cut-vitrine/tools/stage.html?preset=${job.preset}&metal=${job.metal}&light=${job.light}&w=${job.w}&h=${job.h}`);
    await page.waitForFunction(() => window.ready === true, null, { timeout: 15000 });
    if (errors.length) throw Error(errors.join('; '));
    await page.locator('canvas').screenshot({ path: `${out}/${job.name}.png`, omitBackground: true });
    await page.close(); console.log('rendered', job.name);
  }
} finally { await browser.close(); await server.close(); }
