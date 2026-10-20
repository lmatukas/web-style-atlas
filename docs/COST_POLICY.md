# Cost policy for agents

The user requires low-cost execution. Follow this policy for every task.
It narrows resource use without removing acceptance criteria or required checks.
This is a repository instruction, not an enforced GitHub billing limit.

## Agent credits

- Read the task card and only its required plan sections. Do not load the whole
  plan, all styles, logs or previous discussions on every turn.
- One task, one worker, one implementation PR. Reuse the existing PR when fixing
  the same task. Do not request automatic Copilot reviews or launch additional
  cloud agents/AI APIs unless explicitly requested.
- Use targeted search and concise logs. Read the first relevant failure, fix its
  cause, then rerun that check. After two identical failed attempts without new
  evidence, record the blocker; do not start an unbounded retry loop.
- Choose an available lower-cost model for routine bounded work when the tool
  allows it; never silently upgrade to a premium model or buy additional usage.
- Give a short handoff. Do not repeatedly poll CI every few seconds.

## GitHub Actions

P08 must implement these constraints; until then, validate locally.

- Standard GitHub-hosted Linux only, normally `ubuntu-latest`. No larger/GPU
  runners, custom images, macOS/Windows matrix or new self-hosted infrastructure.
- One lightweight PR validation workflow. Do not duplicate the same suite on
  both feature-branch push and pull_request. No scheduled runs by default.
- Tracking/document-only updates must not launch browser renders, full builds or
  deployments. If branch protection needs an always-present status, keep that
  status and run a cheap dispatcher that truthfully reports what was checked.
  Never bypass required checks using skip-ci or artificial success.
- Use concurrency cancellation for superseded runs of the same PR. Default job
  timeout 10 minutes; browser job 15 minutes; manual release validation 20 minutes.
  Investigate overruns rather than repeatedly increasing limits.
- Check changed styles and shared-file dependents. Run the full catalogue only
  at release gates, when shared changes affect all styles, or for a specific risk.
- Run targeted checks in the existing agent environment first. Push a coherent
  tested change, not each experimental edit. Necessary ownership and review
  tracking commits remain allowed and must be lightweight.
- Rerun only failed jobs after a fix or a demonstrated transient failure.
  Never rerun an unchanged green suite just to reconfirm it.
- Deploy only from accepted main changes that affect the gallery, or explicitly
  for a release; not from claim/status/documentation-only commits.
- If quota or billing blocks CI, record it. Do not buy capacity, increase budgets,
  switch to paid runners or report checks as passed.

## Storage and bandwidth

- No Git LFS, Packages/container publishing, Codespaces creation or extra cache
  capacity for this project without an explicit user request.
- Do not commit node_modules, browser binaries, dist, ZIP archives, videos,
  traces, test reports or temporary screenshots. Keep the required final preview
  images and licensed assets; avoid duplicate source copies.
- Generate only changed previews. Do not commit identical regenerated binaries.
  Optimize final PNGs losslessly; resize source photographs before storing them.
  Target <=1 MiB per preview and <=100 MiB total versioned media. Do not introduce
  a single asset above 5 MiB; optimize it or choose a smaller suitable asset.
- Do not upload successful test output as Actions artifacts. Use job summaries.
  On failure upload only a small diagnostic set with retention-days: 1.
  If a release/deployment needs an artifact, use the shortest supported retention
  (target 1 day) and avoid duplicating the entire source repository.
- Disable test video capture by default; retain traces only for relevant failures.
- Use small dependency caches only when they save meaningful time. Key them by
  lockfile, runtime and OS, not commit SHA. Do not cache screenshots/build outputs.
  Do not increase the repository cache storage allowance.
- Deleting a file in a new Git commit does not remove old binary history.
  Do not rewrite Git history or bulk-delete other repositories' data as cleanup.

## Billing boundary

Repository visibility does not make every GitHub product free. The owner must
set account-level budgets/hard stops for the billed products they use. Agents
may inspect authorized usage but must not increase budgets or enable paid
features under the normal next-task instruction.

P08 acceptance must show bounded triggers, concurrency, timeouts, short artifact
retention and changed-scope testing. Never trade away required verification to
make a task appear complete.

Official billing references (checked 2026-10-20):
- https://docs.github.com/en/billing/concepts/product-billing/github-actions
- https://docs.github.com/en/billing/concepts/product-billing/git-lfs
- https://docs.github.com/en/billing/how-tos/set-up-budgets
