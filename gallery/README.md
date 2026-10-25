# Static gallery

`npm run build` validates authored data, regenerates token/index text, renders
this template and copies ready style references/assets/previews into dist/.
Everything is relative to the gallery root, including under a repository subpath.
There is no backend, external font dependency or frontend framework.

For a changed style: build → targeted previews → build → check. Initial build
still works before screenshots exist; the publication check rejects missing/stale
previews. Rebuild after producing previews so dist/ contains the new files.

`npm run dev -- --base /atlas/ --port 4173` serves the already-built dist/ on
loopback. `npm run test:gallery` checks mobile interactions and all real references
under a subpath. `npm run test:previews` is the separate renderer fixture suite.

Keep dist/ untracked and reproducible. Build updates changed files and removes
obsolete generated files; check is read-only and rejects drift. Do not put
hand-authored material in dist/. The source template renders real links and all
ready cards without JavaScript; search, facets and preview switching enhance it.

Comparison allows up to three real ready directions. It persists separately from
filters, so narrowing search does not lose a chosen comparison. `compare`, `style`,
`variant` and `viewport` are restored from the URL; unknown IDs are ignored.
Use one direction as the primary handoff and copy its actual ID/A/B composition.
`config.json` supplies the repository URL. An unset/unsafe URL produces an explicit
ATLAS_REPOSITORY_URL placeholder. Clipboard denial exposes selectable text.

The `Luxury` select (`All directions` / `Luxury only`) filters only styles explicitly tagged `luxury`. Its URL
state is `luxury=1` and combines with the other filters and search. Reset clears
it along with all filter fields. With no ready luxury styles, it honestly shows
the existing empty state; planned cards are never promoted into the catalogue.

A full creation prompt is `prompts/<id>/prompt.lt.md` or `prompt.en.md`. The
preview marks its language, and the short Lithuanian notice appears only for a
Lithuanian brief. The chosen A/B fills the composition line in either language.

`config.json` may list `new_styles` (ready style IDs) and `new_label`. Those
cards render first, in the listed order, with a small badge; every other ready
card follows in catalogue order. IDs that are not ready are skipped, and
`tests/gallery.test.mjs` checks that the listed IDs are real and the order holds.
