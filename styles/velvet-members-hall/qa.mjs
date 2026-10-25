import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {launchCanonical} from '../../scripts/previews.mjs';
import {servePreviews} from '../../scripts/preview-server.mjs';
import {runtimePage} from '../../scripts/runtime-qa.mjs';
import {inspectPage} from '../../scripts/browser-qa.mjs';
const runtime = JSON.parse(readFileSync(new URL('./runtime.json', import.meta.url)));
const browser = await launchCanonical(), server = await servePreviews(process.cwd(), ['velvet-members-hall']);
let cases = 0, reservations = 0, applications = 0, invalids = 0;
async function focused(page, selector) { assert.ok(await page.locator(selector).first().evaluate(e => e === document.activeElement), selector + ' focused'); invalids++; }
try {
  for (const file of ['index.html', 'alternate.html']) {
    const url = server.origin + '/styles/velvet-members-hall/reference/' + file;
    for (const options of [{}, {reduced: true}, {webgl: false, audio: false}]) { await runtimePage(browser, url, runtime, options); cases++; }
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce', hasTouch: true});
    const errors = [], requests = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/*', route => {
      if (new URL(route.request().url()).origin !== server.origin || route.request().method() !== 'GET') { requests.push(route.request().url()); return route.abort(); }
      return route.continue();
    });
    await page.goto(url, {waitUntil: 'networkidle'});
    const scene = page.locator('[data-runtime-scene]');
    await page.evaluate(() => scrollTo(0, 0));
    const before = await scene.screenshot();
    const rect = await scene.boundingBox();
    await page.mouse.move(rect.x + rect.width * .88, Math.min(700, rect.y + rect.height * .8));
    assert.notEqual(await page.locator('#light').getAttribute('cx'), '70%');
    assert.ok(!before.equals(await scene.screenshot()), 'pointer changes actual cloth pixels');
    await page.locator('#light-position').focus();
    await page.keyboard.press('Home');
    assert.equal(await page.locator('#light').getAttribute('cx'), '10%');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#light').getAttribute('cx'), '11%');
    const range = await page.locator('#light-position').boundingBox();
    await page.touchscreen.tap(range.x + range.width * .8, range.y + range.height / 2);
    assert.ok(Number((await page.locator('#light').getAttribute('cx')).replace('%', '')) > 50, 'real touch changes light');
    assert.equal(await page.evaluate(() => window.atlasRuntime.state.frames), 0, 'reduced motion has no RAF');

    if (file === 'index.html') {
      const submit = page.locator('#reservation-form [type=submit]');
      await submit.click(); await focused(page, '[name=event]');
      await page.locator('[value=nov06]').check(); await submit.click(); await focused(page, '#guest-name');
      await page.locator('#guest-name').fill('123'); await submit.click(); await focused(page, '#guest-name');
      await page.locator('#guest-name').fill('Ąžuolas Žilinskas');
      for (const count of ['', '0', '-1', '1.5', '5']) {
        await page.locator('#seats').fill(count); await submit.click(); await focused(page, '#seats');
        assert.equal(await page.locator('#reservation-confirmation').isVisible(), false);
      }
      await page.locator('#seats').fill('1'); await submit.click(); await focused(page, '#reservation-demo');
      await page.locator('#reservation-demo').check();
      for (const [month, events] of [['11', [['nov06', 4, 'Talk without a stage', '19.00', 'Vilnius house'], ['nov14', 2, 'The listening hour', '20.00', 'River house'], ['nov27', 3, 'Dinner with a story', '19.30', 'Vilnius house']]], ['12', [['dec04', 4, 'Winter readings', '18.30', 'River house'], ['dec12', 2, 'The small music salon', '20.00', 'Vilnius house'], ['dec19', 1, 'The last table of the year', '19.00', 'River house']]]]) {
        await page.locator(`[data-month="${month}"]`).tap();
        for (const [id, capacity, title, time, house] of events) {
          await page.locator(`[name=event][value=${id}]`).check();
          assert.equal(await page.locator('#seats').getAttribute('max'), String(capacity));
          for (let count = 1; count <= capacity; count++) {
            await page.locator('#seats').fill(String(count)); await submit.click();
            const summary = await page.locator('#reservation-confirmation').textContent();
            for (const value of ['Ąžuolas Žilinskas', title, `2026-${month}-${id.slice(-2)}`, time, house, `Seats: ${count}`, 'No seats were booked', 'no data was sent']) assert.ok(summary.includes(value), value);
            reservations++;
          }
          await page.locator('#seats').fill(String(capacity + 1));
          assert.equal(await page.locator('#reservation-confirmation').isVisible(), false);
          await submit.click(); await focused(page, '#seats');
        }
      }
      await page.locator('#seats').fill('1'); await submit.click();
      await page.locator('[data-month="11"]').click();
      assert.equal(await page.locator('[name=event]:checked').count(), 0);
      assert.equal(await page.locator('#reservation-confirmation').isVisible(), false);
      await submit.click(); await focused(page, '[name=event]');
      await page.locator('#reservation-form [type=reset]').click();
      assert.equal(await page.locator('#guest-name').inputValue(), '');
      assert.equal(await page.locator('#seats').inputValue(), '1');
      assert.equal(await page.locator('#reservation-demo').isChecked(), false);
      await inspectPage(page, {label: 'reservation/reset'});
    } else {
      const next = page.locator('#application-next');
      await next.click(); await focused(page, '#member-name');
      await page.locator('#member-name').fill('Ąžuolas Žilinskas');
      await next.click(); await focused(page, '#member-email');
      await page.locator('#member-email').fill('bad-address'); await next.click(); await focused(page, '#member-email');
      await page.locator('#member-email').fill('azuolas@example.test'); await next.click();
      await next.click(); await focused(page, '#club-house');
      await page.locator('#club-house').selectOption('river');
      await page.locator('[name=referral][value=member]').check();
      await next.click(); await focused(page, '#referrer');
      await page.locator('#referrer').fill('1'); await next.click(); await focused(page, '#referrer');
      await page.locator('#referrer').fill('Ūla Čepaitė'); await next.click();
      await next.click(); await focused(page, '#application-demo');
      for (const level of ['home', 'friend']) for (const house of ['vilnius', 'river']) for (const referral of ['introduction', 'member']) {
        await page.locator('#application-form [type=reset]').click();
        await page.locator('#member-name').fill('Ąžuolas Žilinskas');
        await page.locator('#member-email').fill('azuolas@example.test');
        await page.locator(`[name=level][value=${level}]`).check(); await next.click();
        await page.locator('#club-house').selectOption(house);
        await page.locator(`[name=referral][value=${referral}]`).check();
        assert.equal(await page.locator('#referrer').isDisabled(), referral === 'introduction');
        if (referral === 'member') await page.locator('#referrer').fill('Ūla Čepaitė');
        await next.click();
        const expected = ['Ąžuolas Žilinskas', 'azuolas@example.test', level === 'home' ? 'House member' : 'House friend', house === 'river' ? 'River house' : 'Vilnius house', referral === 'member' ? 'A member\'s recommendation: Ūla Čepaitė' : 'An introductory conversation'];
        assert.deepEqual(await page.locator('#application-summary dd').allTextContents(), expected);
        await page.locator('#application-demo').check(); await next.click();
        const result = await page.locator('#application-confirmation').textContent();
        for (const text of [...expected, 'No application was sent', 'no membership was created']) assert.ok(result.includes(text), text);
        assert.ok(await next.isDisabled()); applications++;
        await page.locator('#application-back').click();
        assert.equal(await page.locator('#application-confirmation').isVisible(), false);
        assert.equal(await page.locator('#club-house').inputValue(), house);
        assert.equal(await page.locator('#application-demo').isChecked(), false);
      }
      // A previous recommendation must not leak into an introduction-path summary.
      await page.locator('[name=referral][value=introduction]').check(); await next.click();
      assert.ok(!(await page.locator('#application-summary').textContent()).includes('Ūla'));
      await inspectPage(page, {label: 'application/review'});
      await page.locator('#application-back').click();
      await page.locator('[name=referral][value=member]').check();
      await inspectPage(page, {label: 'application/referral'});
      await page.locator('#application-form [type=reset]').click();
      assert.equal(await page.locator('#member-name').inputValue(), '');
      assert.equal(await page.locator('#member-email').inputValue(), '');
      assert.equal(await page.locator('#club-house').inputValue(), '');
      assert.equal(await page.locator('#referrer').inputValue(), '');
      assert.equal(await page.locator('[name=level]:checked').inputValue(), 'home');
      assert.equal(await page.locator('[data-step-indicator][aria-current]').getAttribute('data-step-indicator'), '1');
      await inspectPage(page, {label: 'application/reset'});
    }
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({width, height: 1000}); await page.evaluate(() => scrollTo(0, 0));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, 'no overflow at ' + width);
      assert.ok(await scene.evaluate(e => e.getBoundingClientRect().height >= innerHeight * .7), '70% tall material at ' + width);
    }
    assert.deepEqual(errors, []); assert.deepEqual(requests, []); cases++; await page.close();

    const motion = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'no-preference'});
    await motion.goto(url, {waitUntil: 'networkidle'});
    await motion.locator('[data-motion-toggle]').click();
    const frames = await motion.evaluate(() => window.atlasRuntime.state.frames);
    await motion.waitForTimeout(120); assert.equal(await motion.evaluate(() => window.atlasRuntime.state.frames), frames);
    await motion.locator('[data-motion-toggle]').click();
    await motion.evaluate(() => scrollTo(0, 0));
    const box = await motion.locator('[data-runtime-scene]').boundingBox();
    await motion.mouse.move(box.x + box.width * .9, 700);
    await motion.waitForTimeout(600); assert.equal(await motion.evaluate(() => window.atlasRuntime.state.active), false);
    await motion.emulateMedia({reducedMotion: 'reduce'});
    const settledFrames = await motion.evaluate(() => window.atlasRuntime.state.frames);
    await motion.waitForTimeout(100); assert.equal(await motion.evaluate(() => window.atlasRuntime.state.frames), settledFrames);
    await motion.evaluate(() => dispatchEvent(new Event('pagehide')));
    assert.equal(await motion.evaluate(() => window.atlasRuntime.state.disposed), true); cases++; await motion.close();
  }
  console.log(`PASS S58: ${cases} cases; ${reservations} exact event-seat confirmations; ${applications} membership/house/referral combinations; ${invalids} focused errors; real pointer/keyboard/touch lighting pixels, eight widths, axe across steps, reset/back/invalidation and runtime lifecycle.`);
} finally { await browser.close(); await server.close(); }
