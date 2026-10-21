# Agent compatibility

Checked 2026-10-21. A repository link is an explicit reading source, not an
installation. The universal route works without a native adapter: ask the agent
to read START_HERE.md from this repository, follow its consumer route and build
in your target project. Native discovery remains host-specific.

| Tool | Documented | Generated | Smoke-tested | Native runtime |
|---|---|---|---|---|
| Codex | yes, official local skills docs | `.agents/skills/web-style-atlas/SKILL.md` | source/metadata/root resolution only | not-tested; CLI absent, version unavailable |
| Claude Code | yes, official skills docs | `.claude/skills/web-style-atlas/SKILL.md` | source/metadata/root resolution only | not-tested; CLI absent, version unavailable |
| IBM Bob IDE | yes, official skills docs | `.bob/skills/web-style-atlas/SKILL.md` | source/metadata/root resolution only | not-tested; IDE/CLI absent, version unavailable |
| Current Codex Work session, explicit read | existing file/network tools | no adapter needed | direct consumer source read and decision smoke | current host; host build version unavailable |

“Generated” means deterministic files exist. “Smoke-tested” here means local
file resolution, YAML identity and preservation checks passed on Node v24.19.0,
not that a native agent discovered or executed the skill. No row claims complete
runtime support. No additional agent or paid API was launched.

## Verified locations and sources

- Codex: [official local skill documentation](https://learn.chatgpt.com/docs/build-skills)
  (the older developers.openai.com/codex/skills URL redirects here). It documents
  repository `.agents/skills` discovery and required name/description metadata.
  This establishes the generated project path, not a tested CLI version.
- Claude Code: [official skills documentation](https://code.claude.com/docs/en/skills).
  It documents project `.claude/skills/<name>/SKILL.md`, personal locations and
  skill loading from a directory added with `--add-dir`. File access and skill
  discovery are distinct; host policy can limit discovery. No local CLI test.
- IBM Bob: [official IDE skills documentation](https://bob.ibm.com/docs/ide/features/skills).
  It documents project `.bob/skills/<name>/SKILL.md`, global skill directories,
  name/description metadata and activation approval settings. Those are Bob IDE
  docs; no Bob Shell parity or installed-version claim is inferred.

Sources are documentation snapshots checked on the date above. Recheck the
installed tool's docs and record its actual version before a native smoke test.

## In this repository and in another project

The generated wrappers point to the existing canonical `core/skill/SKILL.md`;
they do not duplicate style descriptions. In this checkout an atlas ancestor of
the wrapper supplies the root. Existing root AGENTS.md remains the maintenance
entry and is not regenerated or copied over another project's instructions.

When using an external atlas checkout, explicitly provide its absolute root as
`WEB_STYLE_ATLAS_ROOT` in the agent environment or request. A copied wrapper
does not make the target project the atlas. Validate the atlas package identity
and required entry/catalogue files, then resolve canonical links against that
atlas root. Paths with spaces are supported by the local resolver tests. Do not
infer an external checkout from the target project's git root.

If the host can only read URLs, use the explicit repository URL, resolve its
actual revision and read source files at that revision. If it cannot view PNGs,
offer genuine image paths and state that visual inspection was unavailable. If
source access is absent, request the files rather than inventing a selection.

No installation command in this task writes into a destination project. For an
optional native setup, first inspect existing project instructions and skills,
then add only a non-conflicting entry through that host's supported mechanism.
Keep the separate atlas checkout accessible. Do not replace AGENTS.md, CLAUDE.md
or an existing same-name skill. The generator refuses unmarked files and symlink
destinations before writing any output.

## Reproduce and extend

```sh
node scripts/adapters.mjs
node scripts/adapters.mjs --check
node --test tests/adapters.test.mjs
```

Only the three allowlisted project skill files are generated. No home directory,
host settings, approval switches or target project is modified. The canonical
consumer skill already existed; these are wrappers, not new personal skills.
CI checks drift before building. Adapter-only changes run source/unit checks
without rendering the catalogue; shared CI changes use the existing broader gate.

For a native runtime test, record the tool/version, source revision, project and
external roots, observed discovery, selected ID/variant, read files and target
output. Change only that tool's runtime status after the actual test. Current
evidence: [P09](evidence/P09.md). The end-to-end website exercise is task P10.
