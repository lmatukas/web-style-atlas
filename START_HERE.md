# Start here

Web Style Atlas is being built as a visual catalogue of distinct web design
directions for AI coding agents. The current repository contains the implementation
plan and work queue; design styles are not implemented yet.

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

## Inspect progress

- [Work board](docs/STATUS.md): task, state, worker, branch, PR and blockers.
- [Canonical state](docs/progress.json): editable machine-readable queue.
- [Pull requests](https://github.com/lmatukas/web-style-atlas/pulls): code, checks and review.
- [Full implementation plan](docs/implementation-plan.md): product and acceptance criteria.

Only completed, accepted implementation counts as progress. Prepared task cards
and scaffolding are not completed product features.

## Use the atlas to build another website

When `catalog/index.json` exists and contains ready styles, follow
`core/selection-guide.md`, read that index, show appropriate visual choices and
load only the selected style. Never invent unavailable styles or previews.
Before the catalogue exists, explain that it is under construction.
