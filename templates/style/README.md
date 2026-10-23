# Authoring template

Copy these four authored files into styles/<approved-style-id> when its task is
eligible. Replace example-style and every instructional value. This directory
is not a catalogue entry and must never appear in the generated index.

The draft metadata and JSON are structurally valid examples, not a ready design.
Author both reference pages, their style.css and any necessary local assets in
the style task. P02 generates reference/tokens.css from tokens.json; P03 generates
the four previews and their manifest. Do not hand-author fake generated output.

Keep the 14 required Markdown sections. Record three to five invariant features
in Signature and three unwanted deviations in Avoid. Reference paths resolve
from the style directory. Asset records and local font references follow
schema/README.md. Complete visual, browser and rights checks before changing
status to ready.

## Local fonts, photographs and 3D (P25)

Keep font binaries in `assets/fonts/`, with the full adjacent `OFL.txt`.
Only OFL-1.1 WOFF2 is accepted; every file must contain both cases of
`ĄČĘĖĮŠŲŪŽ ąčęėįšųūž`. The combined font budget is 200,000 bytes per style.
Use at most two families and three weights. Declare the file in `assets.json`:

```json
{"id":"body-font","path":"assets/fonts/body.woff2","type":"font","origin":"third_party","source_url":"https://example.org/font-source","creator":"Actual font authors","license":"OFL-1.1","license_file":"assets/fonts/OFL.txt","attribution":"Actual authors and OFL-1.1","redistribution_allowed":true,"modifications":["Subset Latin and Lithuanian"]}
```

Set the relevant typography role in `tokens.json` to
`{"family":"Local Body","fallback_stack":["sans-serif"],"source":"local","file":"assets/fonts/body.woff2","asset_id":"body-font"}`.
The build emits local `@font-face` rules in `reference/tokens.css`. Include that
stylesheet in both pages. No external CSS imports, font CDNs or remote links.

Photographs must be CC0-1.0 or documented public domain (`PD-USGov`,
`Public domain`, `PDM-1.0` or the existing Highsmith dedication). Store resized
WebP and a meaningful `assets/RIGHTS.txt` naming the source, creator, rights
and modifications. Add an `image` asset record with that license_file, source URL
and redistribution permission. Combined photographs must fit 1,500,000 bytes.
Do not use AI-generated imagery or bank-specific redistribution licenses.

For original 3D use native WebGL, with no libraries or CDN. Invent the object;
keep useful content and controls in HTML. In `runtime.json` declare:

```json
{"schema_version":1,"renderer":"webgl","audio":false,"stable_state":"reduced-motion","motion":"finite-with-pause","static_fallback":"assets/object.svg"}
```

Both pages must include an HTML scene and a real local image, for example:

```html
<section data-runtime-scene>
  <canvas hidden aria-label="Interactive object"></canvas>
  <img data-runtime-fallback src="../assets/object.svg" alt="Static view of the object">
</section>
<p data-runtime-status role="status">Static view</p>
```

Use `[hidden]{display:none!important}`. Show the static image and hide the
canvas whenever reduced motion is requested, WebGL is unavailable or the
context is lost. Otherwise initialize WebGL and switch visibility only after
successful drawing. Keep pause controls, finite motion and lifecycle cleanup as
specified in `docs/runtime-contract.md`. `node scripts/luxury-previews.mjs --style <id>` tests both
reduced motion and blocked WebGL before it records any PNG success; CI repeats this preflight before browser acceptance.

`tests/helpers/luxury-fixture.mjs` is an executable complete example: it combines
a real bundled OFL font, an existing CC0 photo, original native WebGL and an SVG
fallback without adding a catalogue style. Never copy its invented object as a
finished visual direction. Run the canonical browser fixture through
`node --test --test-name-pattern='P25 canonical' tests/browser/previews.test.mjs`.
