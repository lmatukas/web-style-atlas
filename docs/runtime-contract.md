# Motion and capability acceptance

The public brief registry declares its enhancement and explicit `audio` boolean.
`capabilityModel` maps WebGL briefs to mandatory WebGL; SVG, HTML/Canvas and
optional SVG-or-WebGL briefs are not forced into 3D. Every style with a full
creation prompt must provide `runtime.json`, checked against that model:

```json
{"schema_version":1,"renderer":"webgl","audio":true,"stable_state":"reduced-motion","motion":"finite-with-pause"}
```

This declaration is a requirement, not evidence of success. A ready style enters
the real browser runtime gate in CI. Mandatory WebGL must actually create a
context, issue draw calls with depth testing and produce multiple pixel colors.
A fallback-only scene fails that gate. No CSS substitute qualifies as WebGL.
Audio needs a user-started real source, running/suspended context and real mute
through zero gain. Blocked API tests are separate from successful technology tests.

## Author hooks and visible controls

Use `[data-runtime-scene]` around the object, `[data-runtime-fallback]` on the
informational fallback and `[data-runtime-status]` for its honest visible label.
Use `[data-motion-toggle]` for pause/resume. Audio styles provide buttons
`[data-audio-start]`, `[data-audio-pause]`, `[data-audio-mute]` and an explanatory
`[data-audio-status]`. No context or source starts until a user's click.

Expose `window.atlasRuntime.state` as diagnostics: `progress` (0..1), `frames`,
`active`, `disposed` and `mode`. Never use that diagnostic alone as proof: the
browser gate instruments the actual APIs and compares rendered scene images.
Style-specific tests must exercise the real business controls and exports.

The initial finite episode must visibly change and settle within two seconds.
Subsequent user-driven episodes must also settle; avoid perpetual autoplay.
With reduced motion, draw the informative final state immediately without RAF
loops. Existing PNG capture already uses reduced motion, frozen seeded time and
one-second resource settling. Do not change those preview provenance gates.

`node scripts/runtime-qa.mjs --style <id>` checks both A/B under normal motion,
reduced motion and disabled graphics/audio APIs. It verifies an actual visual
episode, final inactive state, stable reduced captures, real WebGL/audio where
required, labelled fallback, hidden-tab suspension and pagehide cleanup.
Every style also records its specific episode/interaction tests and visual review.

## Lifecycle and static publication

Pause animation and sound when the document is hidden or the scene leaves the
viewport. Resuming visibility must not automatically restart user-paused audio.
On context loss, stop the loop and show the labelled HTML/SVG fallback; optional
restoration must rebuild GPU resources. On pagehide, cancel RAF, disconnect
observers, delete GPU objects, stop sources and close the audio context.

SVGElement does not expose HTMLElement's `hidden` property: add/remove the
`hidden` attribute on SVG fallbacks, rather than setting an expando property.
Keep navigation, descriptions and all primary controls in accessible HTML.
The gallery loads PNGs and prompt text; never embed all scenes into its cards.

## Original fixture and rights

`tests/fixtures/runtime/` is original MIT-licensed code: a shaded, depth-tested
3D copper cuboid, a static authored SVG fallback, finish selection and an opt-in
sine oscillator. It uses WebGL and Web Audio directly, no bundled dependencies,
fonts, recordings, models, external runtime services or CDN requests.

The fixture tests normal/reduced/unavailable modes, offscreen stopping, context
loss with retained finish selection, hidden-tab audio suspension, disposal and
byte-identical repeated PNGs. A deliberately fallback-only version is rejected.
No video or browser binary is committed. Tests produce temporary captures only.

P16 introduces no file under the existing preview dependency roots or renderer
inputs. All 96 existing preview source/output hashes remain checked and current;
no hash exception, baseline rewrite or duplicate PNG is needed.

## Luxury foundation (P25)

New luxury objects use **native WebGL**, no vendored library and no CDN.
Declare `static_fallback` in `runtime.json` as a local `assets/*.svg` or PNG.
This opt-in extends the existing runtime contract; older briefs retain their
existing reduced-motion final-frame acceptance. Luxury-tagged WebGL requires
the declaration. Styles without a creation prompt can declare runtime.json too.

For the new contract, render a useful `<img data-runtime-fallback>` with alt text
inside `[data-runtime-scene]` and a visible `[data-runtime-status]` label.
Reduced motion **and** unavailable/lost WebGL show that image and hide the
canvas. No RAF loop starts in reduced motion. Initialize the fallback visibly
before scripts run and swap only after successful rendering. Maintain keyboard,
touch, pause and lifecycle controls; failure must not disable the service UI.

Before writing four canonical PNG records, `scripts/luxury-previews.mjs` visits A/B at both
viewports with reduced motion, and again with normal motion and WebGL APIs
blocked. It requires the declared local image to decode, be visible, carry alt
text and match the declared URL; a visible canvas or absent status fails.
CI repeats the preflight for every declared fallback style. All local font and image loads must settle without network access. These checks
prove fallback behavior; the existing runtime gate still proves real WebGL.

Fonts require adjacent full OFL.txt, OFL-1.1 WOFF2, actual Lithuanian Unicode cmap
coverage and a combined 200,000-byte budget. Photographs require documented CC0
or public domain, RIGHTS.txt and a combined 1,500,000-byte budget. See the template
README and the executable P25 fixture for asset records and local typography.
