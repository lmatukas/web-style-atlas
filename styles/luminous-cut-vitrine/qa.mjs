// S53 style checks: runtime gate cases, business logic, widths, accessibility and fallback preflight.
import assert from 'node:assert/strict';
import { servePreviews } from '../../scripts/preview-server.mjs';
import { runtimePage, probe } from '../../scripts/runtime-qa.mjs';
import { inspectPage } from '../../scripts/browser-qa.mjs';
import { verifyStaticFallbacks } from '../../scripts/luxury-previews.mjs';
import { freezeClock } from '../../scripts/lib/clock.mjs';
import { launchForChecks } from './tools/browser.mjs';

const ID = 'luminous-cut-vitrine';
const { browser, canonical } = await launchForChecks();
const server = await servePreviews(process.cwd(), [ID]);
const runtime = { renderer: 'webgl', audio: false, static_fallback: 'assets/stone.png' };
const CARAT = { '0.5': 4200, '1.0': 9800, '1.5': 16400, '2.0': 26900 }, METAL = { white: 0, yellow: 0, rose: 0, platinum: 650 };
const money = v => `€${String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
let cases = 0, prices = 0;

async function booking(page) {
  const form = page.locator('#visit-form');
  await form.getByRole('button', { name: 'Clear' }).click();
  await form.getByRole('button', { name: 'Book a visit' }).click();
  assert.match(await page.locator('#visit-errors').textContent(), /Check 6 fields|Check 7 fields/);
  assert.equal(await page.evaluate(() => document.activeElement?.name), 'salon', 'focus moves to the first missing field');
  assert.ok((await page.locator('#visit-form .field-error:not(:empty)').count()) >= 6);
  await page.locator('input[name=salon][value=river]').check();
  await page.locator('input[name=day]').nth(2).check();
  const busy = page.locator('input[name=time]:disabled');
  assert.equal(await busy.count(), 1, 'one slot is taken each day');
  await page.locator('input[name=time]:not(:disabled)').first().check();
  const time = await page.locator('input[name=time]:checked').inputValue();
  await page.selectOption('#topic', 'care');
  await page.fill('#name', 'A');
  await page.fill('#contact', 'none');
  await form.getByRole('button', { name: 'Book a visit' }).click();
  assert.match(await page.locator('#error-name').textContent(), /at least 2/);
  assert.match(await page.locator('#error-contact').textContent(), /email address/);
  assert.match(await page.locator('#error-ack').textContent(), /demonstration booking/);
  await page.fill('#name', 'Ana'); await page.fill('#contact', 'ana@example.com'); await page.locator('#visit-form input[name=ack]').check();
  await page.keyboard.press('Tab');
  await form.getByRole('button', { name: 'Book a visit' }).focus(); await page.keyboard.press('Enter');
  const text = await page.locator('#visit-confirmation').textContent();
  assert.match(text, new RegExp(`Riverside salon, \\w+ \\d{1,2} \\w+, ${time}\\. Topic: Care and cleaning`));
  assert.match(text, /no data left this page/);
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'visit-confirmation');
  await form.getByRole('button', { name: 'Clear' }).click();
  assert.equal(await page.locator('#visit-confirmation').isVisible(), false);
  assert.equal(await page.locator('input[name=salon]:checked').count(), 0);
}

async function piece(page, mode) {
  for (const carat of Object.keys(CARAT)) for (const metal of Object.keys(METAL)) {
    await page.locator(`input[name=metal][value=${metal}]`).check();
    await page.locator(`input[name=carat][value="${carat}"]`).check();
    assert.equal(await page.locator('#piece-total').textContent(), money(CARAT[carat] + METAL[metal]));
    assert.equal(await page.evaluate(() => atlasRuntime.state.metal), metal);
    assert.equal(await page.evaluate(() => atlasRuntime.state.carat), carat);
    assert.match(await page.locator('[data-piece-image]').getAttribute('src'), new RegExp(`ring-${metal}\\.webp$`));
    prices++;
  }
  await page.selectOption('#size', '57'); assert.equal(await page.locator('[data-out=size]').textContent(), '57');
  await page.fill('#engraving', 'Always · You'); assert.equal(await page.locator('[data-engraving-preview]').textContent(), 'Always · You');
  assert.equal(await page.locator('[data-out=engraving]').textContent(), '“Always · You”');
  await page.fill('#engraving', '<b>'); assert.match(await page.locator('#engraving-error').textContent(), /Engraving allows/);
  assert.equal(await page.locator('#engraving').getAttribute('aria-invalid'), 'true');
  await page.getByRole('button', { name: 'Restore the original set-up' }).click();
  assert.equal(await page.locator('#piece-total').textContent(), money(9800));
  assert.equal(await page.locator('[data-out=size]').textContent(), '54');
  assert.equal(await page.locator('#engraving-error').textContent(), '');
  if (mode === 'normal') {
    await page.evaluate(() => scrollTo(0, 0)); await page.clock.runFor(50);
    const before = await page.locator('[data-runtime-scene]').screenshot();
    await page.locator('input[name=metal][value=yellow]').check(); await page.evaluate(() => scrollTo(0, 0)); await page.clock.runFor(50);
    assert.ok(!before.equals(await page.locator('[data-runtime-scene]').screenshot()), 'metal changes rendered pixels');
    const small = await page.locator('[data-runtime-scene]').screenshot();
    await page.locator('input[name=carat][value="2.0"]').check(); await page.evaluate(() => scrollTo(0, 0)); await page.clock.runFor(50);
    assert.ok(!small.equals(await page.locator('[data-runtime-scene]').screenshot()), 'stone size changes rendered pixels');
  }
}

try {
  for (const variant of ['index.html', 'alternate.html']) {
    const url = `${server.origin}/styles/${ID}/reference/${variant}`;
    for (const options of [{}, { reduced: true }, { webgl: false, audio: false }]) { await runtimePage(browser, url, runtime, options); cases++; }
    for (const mode of ['normal', 'reduced', 'fallback']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
      await probe(context, { webgl: mode !== 'fallback', audio: false });
      const page = await context.newPage(), errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await context.route('**/*', route => new URL(route.request().url()).origin === server.origin ? route.continue() : (errors.push('external ' + route.request().url()), route.abort()));
      await freezeClock(page); await page.goto(url, { waitUntil: 'networkidle' }); await page.clock.runFor(1600);
      await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
      assert.equal(await page.evaluate(() => atlasRuntime.state.mode), mode === 'normal' ? 'webgl' : 'fallback');
      if (variant === 'alternate.html') await piece(page, mode);
      await booking(page);
      const scene = page.locator('[data-runtime-scene]');
      await scene.focus(); const yaw = await page.evaluate(() => atlasRuntime.state.yaw);
      await page.keyboard.press('ArrowRight'); assert.ok((await page.evaluate(() => atlasRuntime.state.yaw)) > yaw, 'arrow key turns the stone');
      await page.locator('[data-turn="-1"]').click(); await page.locator('[data-turn="-1"]').click();
      assert.ok((await page.evaluate(() => atlasRuntime.state.yaw)) < yaw, 'buttons turn the stone');
      if (mode !== 'normal') assert.match(await page.locator('[data-runtime-status]').textContent(), /Static fallback/);
      for (const width of [360, 390, 768, 1440]) { await page.setViewportSize({ width, height: 1000 }); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${variant}/${mode}/${width} overflow`); }
      if (mode === 'normal') {
        await page.evaluate(() => scrollTo(0, 0)); await scene.scrollIntoViewIfNeeded(); const drag = await scene.boundingBox(); const before = await page.evaluate(() => atlasRuntime.state.yaw);
        await page.mouse.move(drag.x + drag.width / 2, drag.y + drag.height / 2); await page.mouse.down(); await page.mouse.move(drag.x + drag.width / 2 + 80, drag.y + drag.height / 2 + 20, { steps: 4 }); await page.mouse.up();
        assert.ok((await page.evaluate(() => atlasRuntime.state.yaw)) > before, 'mouse drag turns the stone');
        await page.evaluate(() => __capabilityProbe.contexts[0].getExtension('WEBGL_lose_context').loseContext());
        await page.waitForFunction(() => atlasRuntime.state.mode === 'fallback');
        assert.ok(await page.locator('[data-runtime-fallback]').isVisible());
        if (variant === 'alternate.html') { await page.locator('input[name=metal][value=platinum]').check(); assert.equal(await page.locator('#piece-total').textContent(), money(26900 + 650)); }
      }
      assert.deepEqual(errors, []); await context.close(); cases++;
      console.log('business', variant, mode, 'ok');
    }
    for (const width of [360, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { await document.fonts.ready; if ([...document.fonts].some(f => f.status === 'error')) throw Error('font load failed'); });
      await inspectPage(page, { label: `${ID}/${variant}/${width}` }); await page.close(); cases++;
    }
    console.log('accessibility', variant, '360/768/1440 ok');
  }
  await verifyStaticFallbacks({ style: ID, launch: async () => (await launchForChecks()).browser });
  console.log(`PASS: ${cases} S53 cases, ${prices} exact price checks, static fallback preflight; browser ${canonical ? 'canonical' : 'local Playwright Chromium (non-canonical)'}.`);
} finally { await browser.close(); await server.close(); }
