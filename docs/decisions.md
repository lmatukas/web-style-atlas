# Decisions

## 2026-10-20 — Shared next-task workflow

Keep the implementation plan and 38 tasks in the repository. Agents select eligible work from docs/progress.json, publish ownership before coding, and update the generated docs/STATUS.md. One task is active at a time. Review is not completion; dependencies unlock only after merge and evidence verification. This bootstrap does not complete P01.

## 2026-10-20 — Cost-constrained execution

The user requested reduced AI credits, Actions usage and storage. `docs/COST_POLICY.md`
is mandatory for future tasks and P08. Use standard Linux runners, targeted checks,
no duplicate push/PR suites, no scheduled jobs by default, short failure-artifact
retention and no Git LFS/paid infrastructure. Required checks and ownership tracking
remain intact. Billing budgets are separate account settings; this change does not
claim to set them or reduce already accrued charges.
