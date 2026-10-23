// Canonical browser when available; otherwise a local Playwright Chromium for authoring checks.
// Non-canonical runs never write committed previews (those come from the canonical workflow).
import { chromium } from 'playwright';
import { launchCanonical } from '../../../scripts/previews.mjs';
export async function launchForChecks() {
  try { return { browser: await launchCanonical(), canonical: true }; }
  catch (error) {
    if (error.status !== 'not_run') throw error;
    const executablePath = process.env.ATLAS_CHROMIUM || undefined;
    return { browser: await chromium.launch({ headless: true, executablePath }), canonical: false };
  }
}
