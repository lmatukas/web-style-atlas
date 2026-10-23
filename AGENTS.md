# Web Style Atlas agent entry

Read `START_HERE.md` first. A request such as "do the next task", "continue",
or "atlik kitą užduotį" means execute the next eligible task under the protocol
in `docs/WORKFLOW.md`. Do not ask the user for a task ID or plan section.

The canonical work queue is `docs/progress.json` on the current remote default
branch. `docs/STATUS.md` is its generated human-readable view. Before editing,
read fresh remote state and inspect open task pull requests. Claim work remotely
before implementation; a local edit is not a shared claim. One active task at a
time. Never reset someone else's claim just because it is old.

Read only the selected task card and its required plan sections. Implement one
task, run its checks, publish the result as a pull request, record its URL and
handoff, and stop. `review` is not `done`: dependencies become available only
after the implementation is merged and its acceptance evidence is verified.

The user does not need to repeat these rules in every prompt. Ordinary reversible
implementation choices do not require another confirmation. Respect actual
repository permissions and merge authorization; never bypass protection rules.

If later generators replace this file, preserve this routing and workflow.
This bootstrap is not a completed P01; P01 must inspect and extend existing work.

For a request to build a different website using this atlas, follow the consumer
instructions in START_HERE instead of changing the atlas or claiming queue work.

## Cost control

Read `docs/COST_POLICY.md` before executing work. No paid runners, automatic AI
review loops, unnecessary full-suite reruns or large artifacts. Preserve this
policy in any future generated agent instructions. Required checks still apply.

## Authorship and references

Record authorship as `agent/<id>` in task worker fields and evidence author lines,
and as "Web Style Atlas contributors" in asset records. Commit messages carry no
trailers or session links. Reference pages link only to local files and use
invented names that were checked for uniqueness; source URLs live in the style's
`assets/RIGHTS.txt`. `tests/neutral-names.test.mjs` checks the reference pages.
