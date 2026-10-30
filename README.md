# Web Style Atlas

Distinct web design directions with working examples and practical instructions
for AI coding agents. Use a direction to build a website in your own project.

**Release 1.4.0: 50 ready directions, each with two working layout variants
(A and B), and 200 current desktop/mobile previews.** Every direction's pages
and creation prompt are now in English; see the [release notes](docs/releases/1.4.0.md).
The [work board](docs/STATUS.md) tracks acceptance and publication separately.

**Live gallery:** [open Web Style Atlas](https://lmatukas.github.io/web-style-atlas/).
The [1.4.0 release notes](docs/releases/1.4.0.md) record the publication run and
live checks. Earlier [1.3.0](docs/releases/1.3.0.md), [1.2.0](docs/releases/1.2.0.md), [1.1.0](docs/releases/1.1.0.md) and
[1.0.0](docs/releases/1.0.0.md) publication history is retained.
Use all 50 source directions through
[the ready catalogue](catalog/index.md), [local gallery](#run-the-gallery), or a real
[desktop preview](styles/swiss-grid/preview.png) / [mobile preview](styles/swiss-grid/preview-mobile.png).

## Full creation prompts

[42 full creation prompts](prompts/README.md) accompany 42 of the 50
directions. In the gallery, choose one, switch A/B, then use **Copy full
creation prompt**. Fill in the project fields and give the complete copy to your
coding agent. The text preserves the defining object, interaction, motion and
runtime requirements; it also has a manual-copy fallback. The other directions keep the shorter selection
prompt.

## Start with one prompt

Open the project where you want the website built. Give your coding agent this
prompt, replacing the bracketed details:

```text
Build a [website purpose] website in this project using [platform/technology].
My audience, content, brand and image availability: [brief].
Find design directions at https://github.com/lmatukas/web-style-atlas.
Read START_HERE.md's consumer route and catalog/index.json at one observed commit.
Show up to three compatible, visually different ready directions with real
preview links, a short fit and a tradeoff. After I choose, read only the chosen
direction's instructions and references, preserve its 3–5 defining features,
and adapt it to my content and approved brand. Write design-decision.md with
the atlas commit, style ID, A/B variant, adaptations and asset rights.
Build the actual website here and check navigation, controls, desktop and mobile.
Keep the atlas read-only; this request does not claim an atlas maintenance task.
```

For an automatic choice, replace the selection sentence with “Choose the strongest
compatible ready direction for me and implement it immediately.” You can also
name an existing style ID and A/B variant directly. Without repository access,
provide the relevant files; a URL alone does not install a skill or grant access.

## Run the gallery

Use Node.js 24 and npm. From a terminal:

```sh
git clone https://github.com/lmatukas/web-style-atlas.git
cd web-style-atlas
npm ci
npm run build
npm run dev
```

Open **http://127.0.0.1:4173/**. Build creates ignored `dist/` locally and does
not need Chromium when using the committed previews. The gallery lets you:

1. Search and filter the ready directions.
2. Switch A/B composition and Desktop/Mobile previews.
3. Compare up to three directions, then choose one and a variant.
4. Use **Copy selection prompt**, fill in your brief and give it to your agent.

For a nested local path, run `npm run dev -- --base /atlas/ --port 4173` and open
http://127.0.0.1:4173/atlas/. This is a local preview, not a deployment command.
The [generated source index](catalog/index.json) remains usable without the gallery.

## Checks and authoring

After installation, these commands do not launch a browser or regenerate PNGs:

```sh
npm run validate
npm run build
npm run check
npm run ci:generated
npm run test:unit
```

`check` verifies generated text, gallery output and committed preview freshness;
`ci:generated` also checks the thin agent wrappers. Run them before publishing
changes. For one changed style, use the scoped commands in
[CONTRIBUTING.md](CONTRIBUTING.md), including actual visual and browser checks.

Preview rendering and browser gates require **Ubuntu 24.04 x64, Node 24.19.0**,
locked Playwright 1.62.1 and Chromium headless shell 151.0.7922.34. Install the
locked browser on that host with:

```sh
npx playwright install --with-deps --only-shell chromium
```

Other hosts can browse/build the gallery, but do not produce canonical preview
updates. See [CI scope and reproduction](docs/CI.md) and the
[data contract](schema/README.md).

## What has actually been tried

The [P10 consumer runs](docs/benchmarks/p10/RESULTS.md) used a real available
`gpt-6-luna` target through the collaboration runtime: three fixed briefs, the
same service brief in three directions, and a React adaptation. All six final
sites passed independent checks at 360/768/1440px. Exact prompts, source outputs,
fixes and reproduction commands are retained. This is a bounded benchmark, not a
success-rate estimate for every model or brief.

The [24-style audit](docs/evidence/catalog-review.md) also replayed the two
candidate-affected retained outputs at all three widths. This replay is separate
from the original independent model executions.

The [39-style audit](docs/evidence/expansion-review.md) reviewed all sixty new
frames and prescribed neighbours. Three isolated, rebranded projects exercised
real WebGL, an HTML day planner and opt-in synthesized audio; exact full prompts,
file hashes and reproduction instructions are in [P17](docs/benchmarks/p17/README.md).
These are same-author replays, not new independent-model trials. Dense technical
labels and adaptation limits remain explicit in the per-direction review.

Optional Codex, Claude Code and IBM Bob entry files are generated from the
[shared consumer skill](core/skill/SKILL.md). The
[compatibility matrix](docs/compatibility.md) distinguishes documented paths,
generated/static checks and native runtimes that were **not tested**. Keep your
target project's instructions and resolve the separate atlas checkout explicitly.

## Limits and licences

Directions guide composition, typography, content rhythm and interaction; they
do not guarantee originality, suitability for every brand or complete WCAG
conformance. Automated axe rules and bounded keyboard/mobile checks supplement
manual review. The examples use fictional services and illustrative data; they
are not functioning booking, payment or contact backends. Your website still
needs its own real content, integration and release checks.

Original code, text and original SVG assets use [MIT](LICENSE).
Third-party photographs keep their own licences. Read each selected style's
`assets.json`, accompanying rights file and [third-party notices](THIRD_PARTY_NOTICES.md)
before reuse. No font files are bundled; named system fonts depend on the device.
Do not copy reference test strings or fictional identity into a real site.

## Contribute or continue the atlas

Read [CONTRIBUTING.md](CONTRIBUTING.md) for one-style PRs and evidence requirements.
[START_HERE.md](START_HERE.md) separates website consumption from atlas maintenance.
For maintenance, the [workflow](docs/WORKFLOW.md) and [cost policy](docs/COST_POLICY.md)
apply; the remote [queue](docs/progress.json) is canonical. Task selection does
not itself create a remote claim. The [full plan](docs/implementation-plan.md)
is available for contributors, and is not required to use the catalogue.

[Lietuviška pradžia →](README.lt.md)
