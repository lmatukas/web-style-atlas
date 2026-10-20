# Data contract v1

These JSON Schemas use draft 2020-12. Schema IDs are local filenames; register
all files in this directory with a validator before resolving references. No
network access is needed to compile them. They describe authored data and the
generated formats. The P02 build and P03 renderer implement their semantic
checks; schema validation alone does not prove rendering succeeded.

| Schema | Document | Scope |
|---|---|---|
| style | YAML frontmatter of style.md | Metadata and eight signature dimensions |
| tokens | tokens.json | Semantic palette, font roles, scales and contrast pairs |
| layouts | layouts.json | Ordered A/B variants and section requirements |
| assets | assets.json | Local asset identity, provenance and redistribution |
| vocabularies | core/vocabularies.json | Central families, tags and shared use cases |
| index | catalog/index.json | Ready metadata, style path and A/B reference/preview paths |
| previews-manifest | catalog/previews-manifest.json | Environment, source hashes and PNG hashes |
| progress | docs/progress.json | All 38 tasks, ownership and evidence fields |

All documents have schema_version 1. Unknown object fields are rejected except
named color roles and bounded named scales. Empty assets and an empty index are
valid. Style metadata always declares all required fields, including empty
avoid_for when appropriate. A draft may be incomplete as a product, but its
authored JSON and metadata must still satisfy the structural contract.

Paths are relative POSIX paths without traversal, absolute roots, URLs or query
strings. Asset paths and layout reference_path resolve from the owning style
directory; index and preview paths resolve from the repository root. Local font
file and asset_id are required together; asset_id identifies the assets.json
record containing its license. System fonts have neither field. The language_test
string is a test sample, not a font-coverage claim.

Color references in contrast_pairs name roles from color (no literal colors).
Font sizes and spacing use explicit CSS lengths, zero may be unitless, line
heights are unitless numbers, duration is integer milliseconds and breakpoint
values are integer CSS pixels. Scales contain at most 12 named entries each.
Shadow values are CSS expressions; use color variables when a shadow needs a
color. Breakpoints must be applied consistently by the reference CSS.

P02 must add semantic validation beyond JSON Schema: vocabulary membership,
directory/metadata ID equality, required Markdown sections, word budget, unique
IDs and paths, safe existing file resolution, asset/font references, legal
evidence, color-role references and contrast calculations. Schema cannot prove
license ownership or inspect visual behavior. P03 validates source/output hashes,
render completeness and the four preview combinations per ready style. A source
hash covers all rendering inputs, not just HTML; the renderer owns the canonical
dimensions and environment. Do not add a wall-clock timestamp to deterministic
generated output.

Only ready entries go into the public index. Preview names are preview.png,
preview-mobile.png, preview-alt.png and preview-alt-mobile.png. P02 builds source
data without demanding previews that P03 has not generated yet; publication
checks require current files and manifest evidence. Index metadata intentionally
mirrors the style frontmatter; contract tests guard that shared shape.

The progress schema preserves the bootstrap's worker, timestamps, pr_url,
merge_commit and handoff. scripts/tasks.mjs remains responsible for dependency
order, one active task and generated board consistency. Remote claim ownership
and GitHub merge evidence still require the WORKFLOW protocol.

P03 pins the preview environment in `scripts/preview.config.mjs`: Ubuntu 24.04
x64, Node v24.19.0, Playwright 1.62.1 / Chromium Headless Shell 151.0.7922.34,
DPR 1, en-US, UTC, light scheme and reduced motion. Environment fields also
record the fixed clock, random seed and renderer version. Full-page PNG width
matches the 1440 or 390 CSS-pixel viewport; height may exceed 1000 or 844.
The source hash conservatively covers the style directory (excluding its four
PNG outputs), shared core/assets roots, renderer, server, settings, path helper
and package/lock files. Reference resources outside these roots are rejected.
`npm run check` verifies current source and output hashes without a browser or
writes; draft previews are optional unless a style is selected explicitly.
