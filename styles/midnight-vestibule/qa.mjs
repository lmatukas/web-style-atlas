// S55 style checks: runtime gate, drawer dialog, calendar, exact totals, errors, widths and accessibility.
import assert from 'node:assert/strict';
import { servePreviews } from '../../scripts/preview-server.mjs';
import { runtimePage } from '../../scripts/runtime-qa.mjs';
import { inspectPage } from '../../scripts/browser-qa.mjs';
import { freezeClock } from '../../scripts/lib/clock.mjs';
import { launchCanonical } from '../../scripts/previews.mjs';
import { chromium } from 'playwright';

const ID = 'midnight-vestibule';
let browser, canonical = true;
try { browser = await launchCanonical(); } catch (error) { if (error.status !== 'not_run') throw error; canonical = false; browser = await chromium.launch({ headless: true, executablePath: process.env.ATLAS_CHROMIUM || undefined }); }
const server = await servePreviews(process.cwd(), [ID]);
const RATE = { city: 240, gallery: 360, dome: 520 };
const money = v => `€${String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
let cases = 0, totals = 0;

async function pickDates(page, a, b) {
  const days = page.locator('#booking .day:not(:disabled)');
  await days.nth(a).click(); await days.nth(b).click();
  return b - a;
}

async function booking(page, variant) {
  const opener = page.locator('[data-open-booking]').first();
  await opener.click();
  await page.waitForFunction(() => !document.querySelector('#booking').hidden);
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'booking-title', 'focus moves into the drawer');
  assert.equal(await page.evaluate(() => document.querySelector('main').inert), true, 'background is inert');
  const form = page.locator('#booking-form');
  await form.getByRole('button', { name: 'Confirm booking' }).click();
  const err = await page.locator('#booking-errors').textContent();
  assert.match(err, /arrival and departure/); assert.match(err, /room type/); assert.match(err, /demonstration booking/);
  const nights = await pickDates(page, 2, 5);
  assert.equal(nights, 3);
  for (const room of Object.keys(RATE)) for (const breakfast of [false, true]) for (const late of [false, true]) for (const guests of [1, 2]) {
    await page.locator(`#booking input[name=room][value=${room}]`).check();
    await page.locator('#booking input[name=breakfast]').setChecked(breakfast);
    await page.locator('#booking input[name=late]').setChecked(late);
    while (Number(await page.locator('[data-guests]').textContent()) > guests) await page.locator('[data-minus]').click();
    while (Number(await page.locator('[data-guests]').textContent()) < guests) await page.locator('[data-plus]').click();
    const expected = RATE[room] * nights + (breakfast ? 28 * guests * nights : 0) + (late ? 40 : 0);
    assert.equal(await page.locator('#booking-total').textContent(), money(expected), `${room}/${breakfast}/${late}/${guests}`);
    totals++;
  }
  await page.locator('#booking input[name=room][value=city]').check();
  await page.locator('[data-plus]').click(); await page.locator('[data-plus]').click();
  assert.equal(await page.locator('[data-guests]').textContent(), '4');
  assert.equal(await page.locator('[data-plus]').isDisabled(), true);
  await page.locator('#booking input[name=ack]').check();
  await form.getByRole('button', { name: 'Confirm booking' }).click();
  assert.match(await page.locator('#booking-errors').textContent(), /at most 2 guests/);
  await page.locator('#booking input[name=room][value=dome]').check();
  await page.locator('#booking input[name=ack]').check();
  await page.locator('#booking input[name=breakfast]').setChecked(true);
  await page.locator('#booking input[name=late]').setChecked(false);
  await form.getByRole('button', { name: 'Confirm booking' }).focus(); await page.keyboard.press('Enter');
  const text = await page.locator('#booking-confirmation').textContent();
  assert.match(text, /Dome apartment, \d{1,2} \w+ – \d{1,2} \w+, 3 nights, 4 guests, with breakfast\. Total/);
  assert.match(text, new RegExp(money(520 * 3 + 28 * 4 * 3)));
  assert.match(text, /nothing was sent/);
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'booking-confirmation');
  // Long stays are refused.
  const days = page.locator('#booking .day:not(:disabled)');
  await page.locator('[data-next]').click();
  await days.first().click();
  await page.locator('[data-next]').click();
  await page.locator('#booking .day:not(:disabled)').nth(20).click();
  assert.match(await page.locator('#booking-errors').textContent(), /14 nights/);
  await form.getByRole('button', { name: 'Clear' }).click();
  assert.equal(await page.locator('#booking-total').textContent(), money(0));
  assert.equal(await page.locator('#booking input[name=room]:checked').count(), 0);
  // Focus trap and Escape.
  await page.keyboard.press('Shift+Tab');
  assert.ok(await page.evaluate(() => document.querySelector('#booking').contains(document.activeElement)), 'focus stays in drawer');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#booking').isHidden(), true);
  assert.equal(await page.evaluate(() => document.querySelector('main').inert), false);
  if (variant === 'alternate.html') {
    await page.locator('[data-room=gallery]').click();
    assert.equal(await page.locator('#booking input[name=room][value=gallery]').isChecked(), true, 'room button preselects');
    await pickDates(page, 1, 3);
    assert.equal(await page.locator('#booking-total').textContent(), money(720));
    await page.locator('#booking .close').click();
    assert.match(await page.locator('[data-booking-summary]').textContent(), /2 guests/);
  }
}

try {
  for (const variant of ['index.html', 'alternate.html']) {
    const url = `${server.origin}/styles/${ID}/reference/${variant}`;
    for (const options of [{}, { reduced: true }]) { await runtimePage(browser, url, { renderer: 'html', audio: false }, { ...options, audio: false }); cases++; }
    for (const mode of ['normal', 'reduced']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
      const page = await context.newPage(), errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await context.route('**/*', route => new URL(route.request().url()).origin === server.origin ? route.continue() : (errors.push('external ' + route.request().url()), route.abort()));
      await freezeClock(page); await page.goto(url, { waitUntil: 'networkidle' }); await page.clock.runFor(1800);
      assert.equal(await page.evaluate(() => atlasRuntime.state.progress), 1);
      if (mode === 'normal') {
        const toggle = page.locator('[data-motion-toggle]');
        await toggle.click(); assert.equal(await toggle.getAttribute('aria-pressed'), 'true'); await toggle.click();
      } else assert.match(await page.locator('[data-runtime-status]').textContent(), /Static fallback/);
      await booking(page, variant);
      for (const width of [360, 390, 768, 1440]) { await page.setViewportSize({ width, height: 1000 }); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${variant}/${mode}/${width} overflow`); }
      await page.evaluate(() => dispatchEvent(new Event('pagehide')));
      assert.equal(await page.evaluate(() => atlasRuntime.state.disposed), true);
      assert.deepEqual(errors, []); await context.close(); cases++;
      console.log('business', variant, mode, 'ok');
    }
    for (const width of [360, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { await document.fonts.ready; if ([...document.fonts].some(f => f.status === 'error')) throw Error('font load failed'); });
      await inspectPage(page, { label: `${ID}/${variant}/${width}` });
      await page.locator('[data-open-booking]').first().click();
      await page.waitForFunction(() => document.querySelector('#booking').classList.contains('open'));
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const violations = await page.evaluate(async () => (await axe.run(document.querySelector('#booking'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })).violations.map(v => v.id));
      assert.deepEqual(violations, [], `${variant}/${width} drawer axe`);
      await page.close(); cases++;
    }
    console.log('accessibility', variant, '360/768/1440 page and open drawer ok');
  }
  console.log(`PASS: ${cases} S55 cases, ${totals} exact totals; browser ${canonical ? 'canonical' : 'local Playwright Chromium (non-canonical)'}.`);
} finally { await browser.close(); await server.close(); }
