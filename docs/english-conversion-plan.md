# English conversion plan (P37–P64)

## Why

The owner decided on 2026-10-23 that the atlas is international: visible
content is English (`core/language-policy.md`, last section). Release 1.3.0
still ships 26 Lithuanian directions (52 reference pages with `lang="lt"`,
26 `prompt.lt.md` files), including all eleven new luxury directions that open
the gallery, plus a Lithuanian luxury filter in the gallery. That policy said
existing Lithuanian styles change only through a separate task. These are
those tasks: one style per task, so any agent can take the next one, finish it
in one session and leave a clean handoff.

## Order

P37 → P38 … P48 (the eleven luxury directions, in gallery order) → P49 … P63
(the other fifteen, alphabetical) → P64 release 1.4.0.

P37 adds the shared tooling every conversion relies on. Luxury directions go
first because visitors see them first.

## P37 foundation (shared, done once)

1. **Prompt language.** `scripts/prompts.mjs` and
   `schema/prompt-briefs.schema.json` accept `prompts/<id>/prompt.<language>.md`
   where `<language>` is `lt` or `en` and matches the brief's `language`.
   Nothing else about prompt validation is loosened. Tests cover a valid `en`
   brief, a mismatched path and an unknown language.
2. **Language backlog test.** `tests/language.test.mjs` reads every
   `styles/*/reference/*.html` `lang` attribute and `prompts/index.json`.
   A constant `LITHUANIAN_BACKLOG` lists the 26 IDs that may still be `lt`.
   The test fails when a page outside the list is not `en`, and also when a
   listed ID is already fully English (so each conversion must remove its ID).
   Mixed `lt`/`en` inside one style fails.
3. **Gallery filter in English.** `gallery/template.html`: label `Luxury`,
   options `All directions` / `Luxury only`, no `lang="lt"`. Update
   `gallery/README.md` and any gallery test that matches the old words. The
   URL parameter stays the same.
4. **Policy.** Append a short section to `core/language-policy.md` that points
   to this plan and states the conversion rules below.

## Conversion rules (every style task)

**Translate, do not redesign.** Composition, palette, type, motion, imagery,
A/B structure and interactions stay as they are. Only language and the
consequences of language change.

1. **Visible text** in `reference/index.html` and `reference/alternate.html`,
   plus every string the style's scripts write into the page (`*.mjs` in
   `reference/`: messages, summaries, confirmations, aria-labels, live-region
   text, validation errors, `<title>`, `alt`, `<meta name="description">`).
   Set `<html lang="en">`.
2. **Natural English.** Short, concrete, the same tone as the original. Do not
   translate word by word. Keep headlines at roughly the same visual length;
   English is often shorter, so check that a short headline still holds the
   composition. Use English number formats where the page shows them as text
   (`1,250`, `18 h`), and keep `€` prices with the symbol before the amount
   (`€249`).
3. **Demo brand.** An invented word (for example `Veylqor`, `Auvrėja`,
   `Keliata`) stays unchanged. A brand that is a real Lithuanian phrase (for
   example `Vėjo archyvas`, `Taktas`) gets a new invented name: not an English
   dictionary word, easy to read, and with no real company, product or site of
   that name. Check it with a web search when the agent can; record the query
   and result in the evidence. Without web search, record the check as
   `not_run` in the handoff so the owner can confirm it. Update the name
   everywhere the old one appears (pages, scripts, `style.md`, prompt,
   `prompts/index.json` `demo_brand`, QA).
4. **Footer.** Write a footer that belongs to this style only. No shared
   boilerplate sentence (the P19 `footer-boilerplate` advisory names seven of
   these styles today). The diacritic sample `ĄČĘĖĮŠŲŪŽ` may stay once as a
   technical glyph line, as the policy allows; no Lithuanian words around it.
5. **QA scripts.** Update `qa.mjs` / `check.mjs` selectors and expected
   strings to the English text. Keep every case: do not delete an assertion
   because its string changed, translate it. Sums, counts and states stay
   exactly the same.
6. **Metadata.** `style.md` and `tokens.json`: translate any Lithuanian prose
   or labels; keep field names and values that are not language.
7. **Prompt.** `git mv prompts/<id>/prompt.lt.md prompts/<id>/prompt.en.md`,
   translate it fully (same sections, same numbers, same five signature
   features), and set `language: "en"` and the new `prompt_path` in
   `prompts/index.json`, `style.md` and anything generated from them. Font
   coverage requirements in the prompt stay (fonts may keep Lithuanian
   glyphs).
8. **Backlog.** Remove the style's ID from `LITHUANIAN_BACKLOG`.
9. **Previews.** Regenerate the four canonical PNGs with the
   **Regenerate canonical previews** workflow for this style and branch. Open
   all four and compare with the previous ones: the layout must look the same
   apart from the language. Note any line-break or fit change and fix it if it
   weakens the composition.
10. **Leave alone.** Fonts, images, WebGL scenes (except strings), colours,
    layout CSS (except a fix needed because English text length changed),
    other styles and shared scripts.

## Checks (every style task)

- `npm run validate`, `npm run build`, `npm run check`
- `node --test tests/*.test.mjs` (includes `language`, `neutral-names`,
  `creation-prompts`)
- `node styles/<id>/qa.mjs` (or `check.mjs`) — all cases pass
- `node scripts/distinctiveness.mjs` — no new warning for this style
- `grep -P '[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]'` over the style's reference pages,
  scripts and prompt returns only the technical glyph line (and invented brand
  letters, if kept)
- Canonical previews for this style; four PNGs inspected

## P64 release 1.4.0

After P38–P63 are done: `LITHUANIAN_BACKLOG` is empty, every page is `en`,
every brief is `en`, the P19 footer advisory is gone. Bump to 1.4.0, write
CHANGELOG and `docs/releases/1.4.0.md` (neutral wording: "all directions now
in English"), regenerate all previews through the workflow, open the PR. The
owner merges and runs **Verify release and optionally publish Pages**; live
checks are recorded afterwards, as in 1.3.0.
