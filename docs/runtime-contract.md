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
