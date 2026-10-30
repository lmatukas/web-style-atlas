# Changelog

## 1.5.0 — published 2026-10-30

50 ready directions, 100 working layout variants and 200 current previews.
Every direction has a full creation prompt and copy without AI-template signs.

- Full English creation prompts for all 50 directions (P66, P68–P74).
- Gallery: an empty filter result lists each active filter with the count it
  would bring back (P67); gallery copy rewritten in plain sentences (P81).
- Seven demo brands that matched real names renamed; generated images replace
  photographs of real buildings in Midnight Vestibule and Architectural
  Monograph; Ember Course Room has its own B hero; Still Sanctuary repeats
  fewer photographs (P75–P79).
- An audit of AI-template signs (P80), then all 50 directions rewritten:
  plain headlines with a fact from the page, the direction's own vocabulary,
  one footer disclaimer plus one note per form, no arrows on in-page links,
  fewer em dashes and no real city names (P82–P86). A copy-lint test guards
  every page and the gallery; its backlog is empty.
- Cursor-following glow removed where it was only atmosphere; decorative
  italic heading words made upright in nine directions (P87).

Published on 2026-10-30: [release run 41052213639](https://github.com/lmatukas/web-style-atlas/actions/runs/41052213639)
passed verify and deploy on `00e78fe`. See [1.5.0 release notes](docs/releases/1.5.0.md).

## 1.4.0 — published 2026-10-25

50 ready directions, 100 working layout variants and 200 current previews.
All directions are now in English.

- Converted the 26 directions that were still Lithuanian (P38–P63): both
  reference pages, script messages, QA and the full creation prompt of each.
  Layout, palette, fonts, imagery and motion are unchanged.
- Demo brands that were real Lithuanian phrases got new invented names, each
  checked with a web search; invented brands were kept.
- Every converted direction has its own footer; the shared-footer advisory is
  gone.
- Prompts accept `prompt.en.md` next to `prompt.lt.md`, and a language test
  keeps every page and brief in one language. The gallery's luxury filter
  reads in English.
- Fixed leftover Lithuanian words in five converted luxury scripts and added a
  test for common interface words (P65).

Published on 2026-10-25: [release run 40222604044](https://github.com/lmatukas/web-style-atlas/actions/runs/40222604044)
passed verify and deploy on `f61a4d2`. See [1.4.0 release notes](docs/releases/1.4.0.md).

## 1.3.0 — published 2026-10-24

50 ready directions, 100 working layout variants and 200 current previews.

- Added eleven luxury directions: Obsidian Stage, Luminous Cut Vitrine,
  Escapement Nocturne, Midnight Vestibule, Still Sanctuary, Heirloom Weave
  Ledger, Velvet Members Hall, Patina Auction Room, Openwater Deck, Scent Ritual
  and Ember Course Room. They open the gallery with a New badge.
- Added the luxury foundations: bundled OFL fonts with licence checks, rights
  rules for photographs and AI-generated images, native WebGL scenes with
  required static fallbacks, a luxury authoring guide, tag and gallery filter.
- Audited the collection and resolved every finding before release: first-screen
  image height in five directions, one primary action per screen in two, a
  keyboard reveal defect in Escapement Nocturne and shared images flagged by the
  distinctiveness check.
- The distinctiveness check now accepts identical licensed font files across
  directions only with a licence file and a rights entry; images keep the
  no-duplicate rule.

Published on 2026-10-24: [release run 40131531770](https://github.com/lmatukas/web-style-atlas/actions/runs/40131531770)
passed verify and deploy on `ebffb46`. See [1.3.0 release notes](docs/releases/1.3.0.md).

## 1.2.0 — published 2026-10-23

39 ready directions, 78 working layout variants and 156 current previews.

- Reworked twelve directions: Institutional Clear, Quiet Luxury, Newspaper
  Ledger, Soft Spatial, Data Observatory, Editorial Journal, Terminal Utility,
  Art Deco, Gallery White Cube, Industrial Spec, Balcony Builder and Field Notes.
- Added a distinctiveness check, a LT/EN content language policy and a uniform
  `style.md` frontmatter format.
- Cleaned shared footer and copy templates; refreshed demo content and source
  records in reference pages.
- Extended the rights and source audit and the final quality and evidence check.
- The release workflow now reads the version from `package.json` and derives
  catalogue counts instead of using fixed values.

Published on 2026-10-23: [release run 39905598141](https://github.com/lmatukas/web-style-atlas/actions/runs/39905598141)
passed verify and deploy on `6fa771f`. See [1.2.0 release notes](docs/releases/1.2.0.md).

## 1.1.0 — published 2026-10-21

39 ready directions, 78 working A/B references and 156 current previews.

- Added fifteen directions from Acoustic Sculpture through Membrane Score,
  with complete creation prompts, actual local business controls, finite motion,
  reduced-motion paths and explicit WebGL/audio API fallbacks where required.
- Added full-prompt A/B preview and exact copying to the gallery, including
  manual fallback, project fields and subpath-safe local prompt distribution.
- Accepted P17's sixty new frame inspections, all prescribed neighbour pairs,
  thirty business paths and three isolated WebGL/HTML/audio author replays.
  Replays are explicitly separate from independent P10 model trials.
- Refresh version-dependent preview provenance through the canonical renderer;
  keep the existing manual release workflow, bounded gates and opt-in publish.

Published and opened on 2026-10-21: [release run 39659487799](https://github.com/lmatukas/web-style-atlas/actions/runs/39659487799) passed verify and deploy on `b089ab898428d70ba2fd1583d4d8db4e0438e8bb`. Actual live 39-card search/reset, B/mobile selection, exact full-prompt copy and a working new reference were checked. See [1.1.0 release evidence](docs/releases/1.1.0.md). No separate tag or GitHub Release was created.

## 1.0.0 — published 2026-10-21

Completed 24-direction source catalogue: 48 references and 96 current previews.

- Added Gallery White Cube, Newspaper Ledger, Industrial Spec, Retro Web,
  Y2K Chrome, Art Deco, Botanical Engraving, Kinetic Type, Soft Spatial,
  Architectural Monograph, Pop Commerce and Humanist Service.
- Real category/search, day, quantity, local bag and service-outline controls
  remain truthful demonstrations; no checkout or booking backend is implied.
- Audited all 96 actual A/B desktop/mobile frames, every close pair and nearest
  comparisons; per-style rubric and compact-label limits retained.
- Replayed the two candidate-affected retained consumer outputs separately from
  original independent P10 model trials. Native-host limits remain explicit.
- Extended manual release verification to 24/48/96; publication remains opt-in
  after successful full gates, with one-day static artifact retention.
- Updated image-rights summary for the two public-domain Highsmith building
  photographs and new original illustrations.

Published and opened on 2026-10-21: manual release run 39585598844 passed both
verify and deploy on source `468676949d05be7d7f870ed52bea945d553adf65`.
The actual 24-style gallery and its primary controls were checked after deployment.
See [1.0.0 publication and checks](docs/releases/1.0.0.md).
No separate tag or GitHub Release was created.

## 0.1.0 — published 2026-10-21

First usable catalogue: 12 ready directions, each with two compositions and
desktop/mobile previews (24 HTML references, 48 PNGs).

- Bauhaus Geometric, Cinematic Photo, Data Observatory, Editorial Journal,
  Field Notes, Institutional Clear, Neo Brutalist, Organic Craft, Playful Cutout,
  Quiet Luxury, Swiss Grid and Terminal Utility.
- Search/filter gallery, up to three comparisons, A/B and mobile/desktop views,
  and a copyable selection prompt with a clipboard fallback.
- Canonical style descriptions, tokens, layouts, asset rights, deterministic
  catalogue, preview provenance checks and scoped CI.
- Portable consumer instructions and thin Codex, Claude Code and Bob adapters.
  Native-host compatibility remains explicitly limited to recorded evidence.
- Retained P10 consumer trials: six executions, three briefs, three directions
  for one brief and one React adaptation, with observed corrections recorded.
- Manual full release gate and opt-in GitHub Pages deployment, with no automatic
  deployment on tracking commits or pull requests.

Published and opened on 2026-10-21. See [0.1.0 release evidence](docs/releases/0.1.0.md).
No separate tag or GitHub Release was created.
