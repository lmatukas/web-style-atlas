# Start here

Web Style Atlas is being built as a visual catalogue of distinct web design
directions for AI coding agents. Read `catalog/index.json` for the actual ready catalogue; the work queue tracks
ongoing implementation. Do not infer completion from planned task cards.

## Continue building the atlas

1. Read `docs/WORKFLOW.md`, `docs/COST_POLICY.md` and fresh remote `docs/progress.json`.
2. Run `node scripts/tasks.mjs next` (no package install required).
3. Reconcile any active task and real GitHub PR state before choosing new work.
4. Claim the eligible task on the remote default branch before implementation.
5. Read `docs/tasks/<ID>.md` and only its referenced plan sections.
6. Complete one task, verify it, publish a PR, record the handoff and stop.

The user only needs to say:

> Atlik kitą užduotį iš šio repo pagal START_HERE.md.

The task selector reads files, not GitHub. Agents must perform the remote checks
and claim protocol themselves; the script does not create a lock or merge a PR.

## Planned prompt-driven expansion

The accepted 1.0.0 catalogue has 24 ready styles. The next approved phase has
15 public creation briefs, 19 queued tasks and a target of 39 ready styles.
Read [the expansion plan](docs/prompt-expansion-plan.md) only when its selected
card requires it. Planned briefs in `prompts/index.json` are not ready styles;
keep using `catalog/index.json` for actual available directions.

## Inspect progress

- [Work board](docs/STATUS.md): task, state, worker, branch, PR and blockers.
- [Canonical state](docs/progress.json): editable machine-readable queue.
- [Pull requests](https://github.com/lmatukas/web-style-atlas/pulls): code, checks and review.
- [Full implementation plan](docs/implementation-plan.md): product and acceptance criteria.

Only completed, accepted implementation counts as progress. Prepared task cards
and scaffolding are not completed product features.

## Use the atlas to build another website

Read `core/agent-entry.md`, `core/selection-guide.md` and the actual ready index.
This is a consumer route: build in the target project, without claiming atlas work.
Honor a specific ready ID or “choose for me” directly; otherwise offer up to three
real diverse previews with a fit and tradeoff, then load only the selected style.
The portable consumer skill is `core/skill/SKILL.md`; reading a URL does not
install it. Never invent unavailable styles, hosting URLs or visual inspections.
If the index is absent/empty, explain that no ready direction is available.
