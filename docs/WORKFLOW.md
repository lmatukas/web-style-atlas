# Shared task workflow

## Source of truth and states

The remote default branch's `docs/progress.json` is canonical; `docs/STATUS.md`
is generated from it. GitHub PR state provides merge evidence. Never use a chat
summary or an old checkout as current state.

`todo` → `in_progress` → `review` → `done`.
Use `blocked` with one concrete reason and next action when work cannot continue.
Never mark unrun checks as passed. `review` requires a real open PR; `done`
requires a merged implementation plus the required checks and evidence.

This workflow extends the original plan with `worker`, timestamps, `pr_url`,
`merge_commit`, and `handoff`. Preserve these fields when P01 implements schemas.
Do not regenerate existing task states back to todo.

## On every "next task" request

1. Confirm repository `lmatukas/web-style-atlas`, default branch and remote HEAD.
   Fetch current files and inspect open task PRs, including draft PRs. Do not
   overwrite unrelated uncommitted changes; use an isolated checkout if needed.
2. If an `in_progress` task exists, do not claim another. Resume it only when
   this is the same worker/session or there is a documented handoff. Otherwise
   report who owns it and its branch/PR. Age alone does not release ownership.
3. If a `review` task exists, fetch the PR's current status. If merged, verify
   required checks/evidence, record the actual merge commit, set `done` on main,
   then select the next task. If open, address actionable review findings only
   under the same-worker/handoff rule; otherwise report the PR awaiting review.
   Merge only with existing authorization and successful required checks.
4. If a PR was closed without merge, do not mark done. Record the situation as
   blocked or todo only after reconciling who owns the work and what is retained.
5. If no active task remains, select the first todo task in queue order whose
   dependencies are all done. A blocked task itself is never silently reclaimed;
   independent eligible work may proceed. If nothing is eligible, report the
   exact dependency/blocker, not an invented new task.
6. A real open task PR missing from the registry must be reconciled before new
   work. Never start a second implementation of the same task.

## Claim before coding

On fresh remote main, set the selected record to `in_progress` with a specific
worker label (agent/tool plus a session identifier, not just "AI"), UTC
`claimed_at`, `updated_at`, the intended task branch and `base_commit`.
Run `node scripts/tasks.mjs validate` and `node scripts/tasks.mjs render`.
Commit only the state and generated board as `chore: claim P01 by <worker>`
(replace P01 as needed), then publish that commit to main before editing code.

Use a normal non-force push based on the observed main HEAD, or a GitHub API ref
update with that exact expected SHA and force=false. If the head changed or the
push is rejected, fetch and re-evaluate the queue. Do not automatically rebase
and replay a claim, and never force-push a claim. Two racing claims cannot both
be accepted from the same base using this protocol.

Create the task implementation branch from the accepted claim commit. Record
the branch in the claim, for example `task/p01-contract`. Do not impersonate a
GitHub user as an assignee: the worker label is a registry value, not an account.

If main is protected, publish a claim-only PR and wait until it is merged before
implementation; this means unattended claiming is unavailable under that policy.
If there is no write access, report it. A local claim is not visible to others.

## Implementation and handoff

- Read the selected card. Implement one task within its allowed files.
- Keep task cards and states intact; extend existing scaffold rather than reset it.
- Run the required checks and write a short `docs/evidence/<ID>.md` with actual
  commands, outcomes, visual inspection status and remaining gaps.
- Commit implementation to the task branch and open a PR titled `[P01] ...`.
  The implementation PR must not contain a speculative `done` state.
- Update the canonical main record to `review`, including the actual `pr_url`,
  implementation `evidence_commit`, check results, evidence paths and a concise
  handoff. Fetch fresh main first and use the same non-force/CAS update rule.
  Evidence paths may live on the linked task branch until it is merged.
- Keep implementation commits separate from main tracking commits. Do not carry
  a stale copy of progress.json/STATUS.md into the PR. If main changed while
  implementing, reconcile tracker state before merging; never revert new claims.
- After merge, an authorized coordinator or the next agent verifies the PR and
  evidence, records `merge_commit` and marks done with a small tracking commit.
  Do not ask the user to manually edit the registry.

If interrupted, write the current commit, next action and blocker before leaving.
For transfer to another worker, record an explicit handoff and previous owner.
Never silently abandon, reclaim or mark done an old task.

## Human-readable board

Whenever the registry changes, run `node scripts/tasks.mjs render` and commit
both files atomically. `node scripts/tasks.mjs check` rejects a stale board.
This is a shared record, not live activity telemetry. It shows the last published
state; an agent that cannot write back cannot update it.

## Short final response

Task ID — review/done/blocked; one sentence about the result; actual PR link;
check result; next action. A request for one task ends after that task's handoff.
The next user request can always be the same: "Atlik kitą užduotį iš šio repo."
