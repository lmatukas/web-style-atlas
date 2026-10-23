# Contributing a direction

A new direction must differ in composition, typography, navigation or content
rhythm. A recoloured copy of an existing layout is not another style. Start
with the nearest ready neighbors in the [catalogue](catalog/index.md), the
[anti-generic rules](core/anti-generic.md) and the
[visual rubric](core/quality-rubric.md).

## One task, one style, one PR

1. Read [START_HERE](START_HERE.md), the [workflow](docs/WORKFLOW.md),
   [cost policy](docs/COST_POLICY.md) and fresh remote `docs/progress.json`.
   Reconcile active work and open PRs. Select an eligible style task with
   `npm run tasks:next`; the helper reads local files and does not claim remotely.
   Publish ownership on fresh remote main before implementation. Do not replace
   another worker's claim or start the next style inside this PR.
2. Read that task card and only its required plan sections. Work from the
   accepted claim in its task branch. Preserve unrelated work and tracker state.
3. Copy the four authored files from [templates/style](templates/style/) to
   `styles/<approved-id>/`. Follow the [v1 data contract](schema/README.md).
   Replace the draft identity and every instructional value; keep all required
   sections, tokens, A/B layouts and asset declarations. Record 3–5 invariants,
   exactly three direction-specific anti-patterns and concrete adaptations.
4. Build `reference/index.html`, `reference/alternate.html` and local CSS/JS.
   A and B must change composition and content presentation while preserving
   the direction. Use realistic English copy and meaningful controls. Links
   must lead somewhere real; omit fake forms, testimonials and contact actions.
   Include intentional mobile reflow, visible keyboard focus, reduced-motion
   handling and sufficient text/control contrast. Keep test samples out of
   ordinary visitor-facing copy when adapting a reference to a real website.
5. Record every local asset's source, creator, licence, redistribution permission,
   modifications and attribution in `assets.json`. Keep required licence text
   beside the asset. Check those rights before copying; repository MIT does not
   relicense third-party work. System fonts require no bundled font file.
6. Generate and verify the changed style as below. Inspect all four actual
   desktop/mobile PNGs and the functioning pages. Compare the closest existing
   direction in the same viewport. Record at least three dimensional differences,
   including one structural difference; identify planned neighbors honestly.
7. Complete the rubric: at least 10/12, no zero, recognition and neighbor
   distinction both 2. A score does not excuse broken controls, unresolved rights,
   stale previews or a failed check. Keep an unfinished direction `draft`.
   When it meets acceptance, set `ready`, regenerate its final outputs and rerun
   affected checks because style metadata participates in preview provenance.
8. Record actual commands, outcomes, four-image observations, comparisons,
   rubric scores and remaining limits in `docs/evidence/<TASK_ID>.md`. Open a PR
   titled `[TASK_ID] ...`, link evidence and record `review` on fresh remote main.
   The task becomes `done` only after an authorized merge and verification of the
   exact implementation and its checks. Follow the shared tracking protocol.

## Language

Visitor-facing copy follows the language policy in
[core/language-policy.md](core/language-policy.md).

## Reproduce the affected checks

Install dependencies with `npm ci`. Replace `STYLE_ID` in these commands with
the actual directory ID; it is a placeholder, not a literal catalogue entry.
Generate previews on the canonical Ubuntu 24.04 x64 / Node 24.19.0 host using
the locked browser:

```sh
npx playwright install --with-deps --only-shell chromium
npm run validate -- --style STYLE_ID
npm run build -- --style STYLE_ID
npm run previews -- --style STYLE_ID
npm run build -- --style STYLE_ID
npm run check -- --style STYLE_ID
npm run test:browser -- --style STYLE_ID
```

The second build packages the new previews into the gallery. The generator
creates `reference/tokens.css`, the catalogue indexes and local `dist/`; the
renderer creates four real PNGs and updates `catalog/previews-manifest.json`.
Do not hand-edit generated data or label unrendered PNGs as current.

Commit the style sources, four final PNGs, generated token CSS, affected catalogue
files and acceptance evidence. Do not commit `dist/`, dependencies, browser
binaries, temporary screenshots, traces or test reports. Keep each preview
within 1 MiB and follow media limits in the cost policy.

Shared render inputs can invalidate all styles. Use the CI scope rules in
[docs/CI.md](docs/CI.md); run the complete gate when a shared change requires it.
Do not broaden an unchanged green run merely to repeat it. Adapter edits must
also pass `node scripts/adapters.mjs --check`; regenerate wrappers from the shared
skill rather than maintaining three independent instruction bodies.

## Public claims and PR review

Use actual ready IDs, real paths and observed revisions. Distinguish metadata
selection from a viewed preview, a static check from a native host execution,
and an accessibility audit from complete conformance. Record unavailable tools
as not run. Never fabricate benchmark conversations or guarantee originality.
Retain original copyright and third-party notices in reused material.

### Luxury assets and static 3D

Read `docs/runtime-contract.md` and `templates/style/README.md` before adding
local fonts, photographs or native WebGL. Bundle full OFL-1.1 font licenses and
actual Lithuanian glyph coverage; photographs require CC0/public-domain rights
records. The per-style totals are 200 KB of fonts and 1.5 MB of photographs.

For a style declaring `runtime.static_fallback`, generate its previews through
`node scripts/luxury-previews.mjs --style <id>`. This additive entry point checks
A/B at both viewports with reduced motion and blocked WebGL, then delegates to
the unchanged canonical PNG renderer. CI repeats the capability preflight and
real runtime gate independently, so a bypass of this authoring command cannot
make a broken fallback acceptable. Existing styles without that declaration
retain their accepted renderer and previews.
