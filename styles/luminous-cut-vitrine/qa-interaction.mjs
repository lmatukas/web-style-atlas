// S53 interaction checks: real touch swipe, pause, live reduced-motion switch, GPU disposal and retained choices.
import assert from 'node:assert/strict';
import { servePreviews } from '../../scripts/preview-server.mjs';
import { probe } from '../../scripts/runtime-qa.mjs';
import { launchForChecks } from './tools/browser.mjs';

const ID = 'luminous-cut-vitrine';
const { browser } = await launchForChecks(), server = await servePreviews(process.cwd(), [ID]);
try {
  for (const variant of ['index', 'alternate']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, reducedMotion: 'no-preference' });
    await probe(context, { audio: false });
    const page = await context.newPage(), errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${server.origin}/styles/${ID}/reference/${variant}.html`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => atlasRuntime.state.progress === 1 && !atlasRuntime.state.active);
    const cdp = await context.newCDPSession(page), box = await page.locator('[data-runtime-scene]').boundingBox();
    const y = Math.min(700, box.y + box.height * 0.5), before = await page.evaluate(() => atlasRuntime.state.yaw);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 120, y }] });
    for (const x of [150, 180, 210, 240]) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    assert.ok((await page.evaluate(() => atlasRuntime.state.yaw)) > before, 'real touch swipe turns the stone');
    const toggle = page.locator('[data-motion-toggle]');
    await toggle.click(); assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
    const frames = await page.evaluate(() => atlasRuntime.state.frames);
    await page.mouse.move(150, y); await page.mouse.move(260, y);
    assert.equal(await page.evaluate(() => atlasRuntime.state.frames), frames, 'paused hover does not re-light the stone');
    await toggle.click(); assert.equal(await toggle.getAttribute('aria-pressed'), 'false');
    if (variant === 'alternate') await page.locator('input[name=metal][value=rose]').check();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => atlasRuntime.state.mode === 'fallback');
    assert.ok(await page.locator('[data-runtime-fallback]').isVisible());
    assert.ok(await page.evaluate(() => __capabilityProbe.deletes > 0), 'GPU buffers released on reduced motion');
    if (variant === 'alternate') { await page.locator('input[name=carat][value="1.5"]').check(); assert.equal(await page.locator('#piece-total').textContent(), '16 400 €'); }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => atlasRuntime.state.mode === 'webgl');
    if (variant === 'alternate') { assert.equal(await page.evaluate(() => atlasRuntime.state.metal), 'rose'); assert.equal(await page.evaluate(() => atlasRuntime.state.carat), '1.5'); }
    await page.evaluate(() => dispatchEvent(new Event('pagehide')));
    assert.equal(await page.evaluate(() => atlasRuntime.state.disposed), true);
    assert.deepEqual(errors, []); await context.close();
    console.log('PASS', variant, 'touch swipe, pause, live reduced-motion switch, GPU disposal, retained choices');
  }
} finally { await browser.close(); await server.close(); }
