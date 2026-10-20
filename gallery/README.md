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
