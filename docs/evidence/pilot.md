# P04 — Three-direction pilot and v1 contract freeze

2026-10-20. Actual rendered pilot reviewed by an agent under owner-authorized
sequential work. S01/S02/S03 were merged independently and verified before this
review. No further style production started before this pilot's acceptance.

## Images actually inspected

All 12 original A/B desktop/mobile PNGs were inspected during their individual
style tasks. For this pilot, six comparison sheets were actually viewed: A
three-up desktop/mobile, B three-up desktop/mobile and the same neutral brief
three-up desktop/mobile. The sheets use original images; mobile sheets show the
opening sections at legible scale, while full-page individual images had already
been inspected. Temporary QA sheets are not committed or used as product assets.

## Observable differences

| Dimension | Swiss Grid | Editorial Journal | Neo Brutalist |
|---|---|---|---|
| Composition | Flush-left large proposition; unequal aligned service columns | Centred masthead; cover text/illustration; narrow essay | Huge poster words; offset stamp; exposed framed programme |
| Typography | Neutral sans, medium weight and sudden scale | Literary serif, italic inflections, long reading measure | Heavy sans, short blunt uppercase headlines |
| Navigation | Numbered practice links and project rail | Departments and article contents | Utility action labels and pressed-state day filter |
| Rhythm | Ruled service rows and staggered work fields | Teasers, editor letter, paragraphs and margin notes | Manifesto bands and strongly framed session rows |
| A/B difference | Service index vs asymmetric project catalogue | Issue cover vs continuous essay | Poster/manifesto vs actual two-day programme |
| Mobile | Rows reflow number/title/description; rail becomes header | Departments stack; notes enter reading flow | Poster stacks; session columns become time/content blocks |

Each actual pair differs in at least three dimensions, including structure.
No pair relies on accent color or subject matter alone. B variants are also
clearly different information tasks; they are not rearranged copies of A.

## Same neutral service brief

Temporary browser DOM adaptations used exactly this identity and leading copy:

- North Commons
- Better work, together.
- Independent advice for small organisations. A clear plan, practical support,
  and space to grow.
- Understand the challenge. Arrange the priorities. Move forward together.

The same copy replaced the brand, h1, primary description and first three section
headings of all A pages, preserving each layout's existing structure. Real
Chromium captured all three at 390 and 1440; all six had no horizontal overflow.
No changes were written to the product pages and no extra generator was added.
This is a controlled leading-content transfer test, not a claim that every lower
paragraph was rewritten into a finished service website.

Actual neutral-image observations: Swiss retains a left information grid and
ruled service rows; Editorial retains a publication masthead, serif reading and
three short columns; Neo retains blunt giant words, thick bands and a framed
manifesto. Mobile remains recognizably different with identical leading words.
The test supports transferability without relying on different photographs.

## Scores and hard gates

| Criterion | Swiss | Editorial | Neo | Evidence |
|---|---:|---:|---:|---|
| Recognition | 2 | 2 | 2 | Four declared invariants present in actual images |
| Distinction | 2 | 2 | 2 | Structural/type/navigation/rhythm differences above |
| A/B distinction | 2 | 2 | 2 | Different tasks and composition, retained direction |
| Hierarchy | 2 | 2 | 2 | Clear title/body/label roles; no inspected collisions |
| Mobile | 2 | 2 | 2 | Intentional stacking, readable copy, no tested overflow |
| Adaptability | 2 | 2 | 2 | Neutral-copy render retains each system |
| Total | 12 | 12 | 12 | Threshold 10, no zero, first two both 2 |

Actual prior style QA covered A/B at 360/768/1440, resources, local navigation,
keyboard focus, native disclosures, reduced motion, Lithuanian samples and real
semantic token consumption. Neo's actual day selector was separately exercised.
The pilot reran source/build/freshness after adding shared quality documents.
Shared-file changes invalidate source hashes; all 12 previews were regenerated,
with unchanged output PNG hashes. No duplicate binary outputs are introduced.

## Decision

Accept the pilot and freeze the current schema_version 1 contract. The examples
proved that separate composition, local assets, two variants and the manifest
model work without schema changes. Future breaking contract changes require
explicit migration evidence; do not silently change field meanings. The reusable
rubric and anti-generic rules are now in core. Full P08 accessibility automation,
360/768/1440 CI coverage and control testing remain future gates, not a claimed
GitHub CI result. Self-review has the normal limits of one evaluator.
