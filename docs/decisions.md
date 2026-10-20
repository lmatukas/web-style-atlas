# Decisions

## 2026-10-20 — Shared next-task workflow

Keep the implementation plan and 38 tasks in the repository. Agents select eligible work from docs/progress.json, publish ownership before coding, and update the generated docs/STATUS.md. One task is active at a time. Review is not completion; dependencies unlock only after merge and evidence verification. This bootstrap does not complete P01.
