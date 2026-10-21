# P10 — actual consumer benchmark

## Execution boundary

Run date: 2026-10-21. Frozen atlas revision:
`5f35c4ddca6b3be0225108ca8ad1d515d30157a6`.
The primary worker invoked the actual available `gpt-6-luna` model alias through
six fresh collaboration threads, sequentially. An exact model snapshot was not
exposed. No Codex CLI, Claude Code or Bob binary was available on PATH; this
benchmark does not establish those native hosts' runtime compatibility.

The three fixed briefs and complete initial prompts are retained in `briefs.json`
and `prompts.json`. All target projects were outside the atlas checkout. The
same Plainword service brief was supplied unchanged for three different ready
directions and a React adaptation. Target agents were asked to build a website,
not told expected benchmark answers. They were prohibited from editing sibling
projects or the atlas, claiming tasks or launching further agents.

## Results

The retained final sources and SHA-256 hashes are in `sites/` and `artifacts.json`.
`results.json` records final execution evidence and exact tool versions. Source
resolution was checked against the ready index and actual selected direction's
style, token, layout, asset-rights and variant reference files at the frozen
revision; no invented style ID or unavailable source was accepted.

| Case | Mode / actual direction | Actual result and preserved structure |
| --- | --- | --- |
| service-swiss | Specific `swiss-grid` A, HTML/CSS | Twelve-column alignment, oversized flush-left type, unequal labels/content and numbered ruled service rows. |
| service-terminal | Specific `terminal-utility` A, HTML/CSS | Monospace command-like labels, purpose panel, compact native service disclosures and a runbook sequence. |
| service-institutional | Specific `institutional-clear` A, HTML/CSS/JS | Stable navy header, search-led directory, readable service details and a practical process guide. |
| photo-portfolio | Choose for me → `cinematic-photo` A, HTML/CSS | Broad photographic cover, serif display text, asymmetric Forest/Water chapters and attached source captions. |
| information-catalogue | Choose for me → `institutional-clear` A, HTML/CSS/JS | Four readable workshop rows; text/category combination, empty state and two actual reset paths. |
| service-react | Specific `swiss-grid` A, React/JSX/CSS | Production build passes beneath `/bench/`; same alignment, oversized type and ruled index retained; all three browser widths pass. |

The first three have meaningfully different composition with the **same** brief:
Swiss uses an asymmetric oversized typographic index; Terminal groups scope in
native disclosures beside a command/purpose panel; Institutional leads into a
search directory, then separate detail panels. This is not a palette-only
comparison. All three reflow into a readable mobile sequence, retain local
navigation and have no photo dependency. The React adaptation must retain the
Swiss alignment, type hierarchy and ruled index while changing implementation.

## Independent checks and findings

The primary worker ran `check.mjs` on the real artifacts using the repository's
locked Playwright/Chromium environment, served under `/bench/`, at
360/768/1440px with reduced motion. Checks include actual required copy, local
navigation clicks, native disclosures, loaded images, page/resource errors,
document overflow, initial visible keyboard focus and WCAG 2 A/AA plus 2.1 A/AA
axe rule tags. Both searchable outputs additionally have actual matching,
empty and reset-state checks. Desktop and mobile screenshots were visually
inspected for each final output. These are bounded checks, not complete WCAG
conformance or an originality guarantee.

All six final artifacts passed these checks: **18 viewport cases**. The retained
React source was additionally materialized into a new target, installed with
`npm ci`, built with Vite 6.4.4 and checked from that independent `dist/` output.
The retained photo materializer was also executed and its output checked;
both photograph hashes matched the selected cinematic direction's source.
Source validation, adapter drift and generated freshness checks passed. The
documentation-only scope does not require rerendering unchanged atlas previews.

Observed issues were retained rather than reported as first-attempt success:

- The first photo output copied the reference's unrelated Lithuanian glyph
  sample into its footer. Raw rendered screenshots were returned to the same
  target, which removed it while preserving the identity and rights disclosure.
  Initial `index.html` SHA-256:
  `360e917006b6c7a322880d6fb7827ead17d8f7e915917e9c839512391a1d01e5`.
- The first React production build emitted root-absolute asset URLs. The nested
  `/bench/` execution actually returned 404 for JS/CSS and rendered no main or
  headline. The raw report and build artifacts were returned to the same target
  for correction, rather than silently replacing its implementation.
- The initial React lock used Vite 6.0.7. An actual npm audit reported one high
  Vite finding and one moderate transitive esbuild finding; the target received
  that output before finalizing. Final versions and audit outcome are recorded
  with the actual final build, not inferred from a package-name change.
- The React target's own verification record also reports earlier 360/768px
  overflow and its title/panel-width correction. Independent final checks found
  no overflow. This earlier finding is target-reported, not a separate primary
  reproduction of the first responsive failure.
- The catalogue resets render in `requestAnimationFrame`. The check initially
  sampled immediately after the click; it was corrected to wait for the visible
  four-result state with a bounded timeout. Both real reset paths are tested.

The target's own records remain in each case's decision/run documents. Swiss
and catalogue targets performed local Playwright checks. Terminal,
Institutional and Photo targets reported their browser gateway/capability
limits honestly. Primary independent Chromium checks are separate evidence;
they do not turn those failed target browser attempts into successes.

No atlas styles, gallery code, dependencies or preview rendering inputs changed.
Photographs are materialized from the existing licensed atlas bytes with hash
verification, not downloaded or assigned to the fictional portfolio owner.
Temporary screenshots, test reports, bundles, dependencies and browser binaries
are not versioned. The retained source package can be materialized into another
new directory using the commands in `README.md`.
