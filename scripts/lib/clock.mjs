// Install before the target epoch: install() starts a running clock, so pausing
// at that same instant can race a few milliseconds of real browser time.
// This runs on a blank page before navigation; no application timers are skipped.
export async function freezeClock(page, time = '2026-01-01T00:00:00.000Z') {
  const epoch = new Date(time).getTime();
  if (!Number.isFinite(epoch)) throw new Error('A valid fixed capture time is required');
  await page.clock.install({time: new Date(epoch - 60000)});
  await page.clock.pauseAt(new Date(epoch));
}
