# Quality gates and bounded CI

One PR workflow plus an explicit manual full gate; no push duplicate, schedule,
deployment, AI review, paid runner or account-budget changes. Jobs use standard
ubuntu-24.04 (the canonical renderer OS), Node 24.19.0 and contents:read. Scope
and source jobs time out after 10 minutes, browser after 15. Superseded PR runs
are cancelled. Package/browser/output caches are disabled. Only a small browser
failure diagnostic is uploaded, with one-day retention; successful runs upload
nothing. Tracking/docs changes check queue/board without npm install/build/browser.

`ci-scope.mjs` is dependency-free so the cheap dispatcher needs no package install.
Style-only changes target those existing styles; changed shared render inputs
expand to their dependents. Gallery/index changes check the gallery; its reference
smoke is scoped to changed styles. Manual workflow dispatch validates everything.
Valid drafts remain valid source data; missing draft previews are not a fake
publication failure, and a draft-only change does not need a browser job after
source validation determines that no ready pages are affected.

Before building, CI compares committed tokens/index text against generated values.
It then checks required source/output preview hashes, builds untracked dist and
asserts no committed file changed. CI never runs the preview generator, pushes a
commit or replaces a baseline to hide a failure. Authored style descriptions are
catalogue data. Shared Markdown and consumer skill instructions are not rendering
resources: the preview server forbids them and provenance excludes them, allowing
real documentation-only updates to stay cheap without an untracked dependency.

Browser checks use pinned Playwright/Chromium plus axe-core 4.12.1. At 360, 768
and 1440 they check loading/errors, horizontal overflow, WCAG-tagged axe results,
control obstruction, visible initial keyboard focus, native disclosures and the
real programme day filter. Gallery tests cover facets, URL/selection state and
clipboard fallback under a subpath. Automated checks do not certify full WCAG or
replace visual comparison, reading-order judgment and actual content review.

## Update previews locally

Use Ubuntu 24.04 x64 and Node v24.19.0, then:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npx playwright install --with-deps --only-shell chromium
npm run build
npm run previews -- --style <id>
npm run build
npm run check -- --style <id>
npm run test:browser -- --style <id>
```

Review all four actual images and commit the changed style, catalogue metadata
and manifest. For a shared renderer/tool change, regenerate all affected styles
with `--all`. Unchanged PNG bytes are not rewritten. Do not commit dist, test
outputs, browser downloads or caches. If the standard CDN is broken locally,
the official Chrome for Testing storage URL for the exact pinned version may be
used; never silently substitute an arbitrary browser.

## Regenerate previews in GitHub Actions

When the local machine lacks the pinned Chromium headless shell, run the manual
workflow "Regenerate canonical previews" (`.github/workflows/previews.yml`) with
the branch name and optionally one style id. It renders in the canonical
environment, checks the output, and commits `styles/` and `catalog/` changes to
that branch. It refuses `main`.

The bot's commit does not start "Atlas validation". After it finishes, review
the four PNGs of each changed style, then start "Atlas validation" on the branch
(for example by pushing an empty commit or using the Actions UI).

## Reproduce the gate

```sh
node scripts/ci-scope.mjs --base <observed-40-character-base-sha>
node scripts/ci.mjs validate
node scripts/ci.mjs browser
```

Use `--full` instead of `--base` only for shared-input/release risk or explicit
full verification. `.ci-scope.json` and failure diagnostics are ignored. A missing
browser is NOT_RUN/exit 2, never a passing screenshot check. A quota or permissions
blocker must remain visible; do not buy capacity or loosen gates to merge.

Workflow readiness is a local conclusion. An actual GitHub run is separate
remote evidence: inspect the PR's exact head and jobs before claiming it passed.

The canonical consumer skill also feeds the thin native adapters. Changes to
that source, the adapter generator or generated wrappers run source/unit drift
checks without browser renders. Ordinary shared Markdown remains documentation.
