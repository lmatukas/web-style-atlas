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

## 2026-10-20 — P01 scaffold and v1 structural contract

Inspected the real repository `lmatukas/web-style-atlas`, default branch `main`,
initial HEAD `087cc47853b394364bf421f9eeb9f9726dc5bebb`. The initial worktree was
clean and GitHub had no open PRs. Claim commit
`a254f2cab938728ff2d61cf587fe83e42fa42f06` was accepted on main before implementation
on `task/p01-contract`, worker `Codex/839dbcebb83d`.

Preserve the existing plan, queue, dependency graph, routing instructions,
cost policy and MIT holder, Laimonas Matukas. Extend all 38 task cards with the
required execution fields; preserve their bootstrap specifications. Style cards
now name up to two close comparisons, explicitly allowing future neighbors to
remain planned rather than claiming they were inspected.

Use Node.js 24 LTS (`.nvmrc` and package engines). The official release schedule,
checked 2026-10-20, lists v24 support through 2028-04-30 and v26 LTS beginning
2026-10-28: https://github.com/nodejs/Release/blob/main/schedule.json.
Node 26 is therefore not selected early. Pin Ajv and YAML as development-only
dependencies for strict schema compilation and actual YAML parsing; P02 can reuse
them. Queue commands still require no installation.

Adopt JSON Schema draft 2020-12 for metadata, tokens, layouts, assets, vocabulary,
index, preview manifest and progress. `schema/README.md` specifies path bases,
units, font/asset links and the checks that require later semantic validation.
`core/vocabularies.json` is the sole data registry for the 13 planned families,
tags and shared best_for/avoid_for values. The eight signature keys follow the
plan's section 4 dimensions. All authored template files are valid draft examples;
they are not catalogue entries or finished styles. No renderer, gallery, generated
catalogue or CI is claimed by P01. The schema can be refined by pilot evidence
before P04 freezes v1.
