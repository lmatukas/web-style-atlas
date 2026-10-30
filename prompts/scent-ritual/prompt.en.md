# Scent Ritual — website creation prompt

Build a working website in the user's project. Do not change the atlas or its task registry.

## Adapt to the project

- Name, audience and product story: [FILL IN OR KEEP AN INVENTED DEMONSTRATION].
- Approved scents, notes, sample volume and product descriptions: [FILL IN].
- Search questions and an explainable recommendation rule: [FILL IN].
- Technology, existing project rules and authorised integrations: [FILL IN].

Without an approved integration everything runs locally. No real order, payment, sending or storage of customer data. Before using an invented business name, search for it to check it does not match a real company. Note descriptions are not claims about real ingredients, safety or a scientifically chosen scent. Say once, in the footer, that the atelier is invented, and once beside the sample set that nothing is ordered. Headings name scents, notes and sample sizes rather than moods.

## Design direction

A light perfume atelier: a white ground, graphite text, light from pink, amber and greenish liquid. One large original 3D glass bottle with refracted light and moving liquid owns the first screen. The scene is 70–110 svh, the image takes at least 70% of the first screen's height and 60–75% of the desktop width; short text stays within 28–36 ch. Give the phone its own tall bottle composition, not a shrunken desktop page.

Five features to keep: a large clear-glass object; liquid pastel fields of light; a light serif with small uppercase sans labels; a three-level note structure; a personal sample set. Avoid matte clay bubbles, rustic ceramics stories and a generic shop card grid.

Local OFL WOFF2 files: a thin 300–400 serif for headings and a light, clear sans for text, up to two families and three weights, up to 200 KB. All Lithuanian letters, with the full OFL.txt alongside. No CDN. Headings 24–56 px, one campaign heading up to 80 px, 36–56 px on a phone; text 16–20 px with 1.5–1.7 line height; labels 11–14 px with 1–5 px spacing. Between sections 80–160 px on desktop, 48–80 px on a phone. Margins 48–96 and 20–28 px. One main action per visible screen, controls at least 44 × 44 px.

## Two different layouts

A — fragrance collection. A narrow typographic invitation beside a large glass bottle. Then four numbered scent entries with different gradients, small code-drawn bottles and note descriptions. Choosing a scent changes the scene colour, the bottle's liquid and label, every name and the note table. The note table has top, heart and base. It ends with a spacious sample-set studio and three steps for getting to know a scent.

B — finding your scent. On the first screen, a full-width bottle studio with the invitation in one corner. Then one question at a time beside a three-layer note pyramid. Three questions: place, time of day and the closeness you want; three choices each. "Back" keeps the answers. At the end, a clear suggestion and an explanation of how each of the three answers contributed. The pyramid shows the real notes of the suggested demonstration scent. The set can be built independently of the recommendation. A and B must differ in content task and composition, not only in colour.

## Original bottle and signature

Use native WebGL with no external libraries or models. An original rounded glass shape, a neck, a wide matte stopper, a pale paper label, studio reflections and a liquid surface. The pointer tilts the liquid; a native slider gives keyboard and touch users the same control. Phone tilt may be added only with deliberate permission; it is not required when the slider works well. Scrolling on a phone stays free.

Generate a local SVG or PNG fallback from the same original code. It must be informative, have alt text and be visible before JavaScript runs. In reduced-motion mode, without WebGL and after context loss, hide the canvas, show the fallback and an honest status. The opening scene and the background light change finish within 2 s. Further motion happens only after a visitor's action, is finite and has a pause. Stop a hidden window and an off-screen scene; on pagehide, free GPU resources, observers and listeners.

No photographs are needed. Record the original geometry, font origin, authors, licences and render method in assets.json and RIGHTS.txt. Source URLs belong only in the rights records; the examples use local files and an invented name. Do not reproduce any specific real perfume bottle.

## Search and sample service

The three questions must really change the result. Use a clear deterministic rule: place weighs 3, time 2, closeness 1; compare the four scent profiles by weighted distance. The tie-break rule must be clear. Explain all three answers; it is a suggestion, not a diagnosis. Test all 27 combinations. An unanswered question shows an understandable error and focuses an answer. "Change answers" keeps the input; "Start the search again" clears the answers and says the independent set is kept.

Offer four scents, but let the set hold 1–3 different 2 ml samples. The same scent cannot be added twice. A fourth scent triggers a clear error; an earlier one can be removed. The collection and set buttons change the real state, aria-pressed and the quantity. The recommendation button only adds, so pressing it again does not remove a sample that is already in the set.

Confirmation needs at least one sample and the demonstration notice ticked. The summary lists each scent's name, number, all three note groups, 2 ml and the exact total volume. Insert data as text. Say clearly: nothing was ordered, nothing was sent and there is no payment. Any change to the set or the notice removes the old summary. "Edit" keeps the choice; "Clear the set" clears the samples and the confirmation. No storage.

## Final check

Check both layouts at 360, 390, 768 and 1440 px, Lithuanian characters, keyboard, mouse, touch and 200% text. Text contrast of at least 4.5:1, controls at least 3:1. No external requests or console errors. Check real 3D drawing and pixel changes, all four scents, the 27 search combinations, summaries for 1–3 samples, what happens with a fourth and a repeated sample, an empty set, a missing confirmation, editing and reset.

Check pause, settling, a live reduced-motion change, disabled WebGL, context loss, a hidden scene and resource cleanup. Generate and visually review the four final PNGs; up to 1 MiB each. Compare with the soft spatial and organic craft directions at least for structure, typography and material. Deliver working examples and only the results of checks you actually ran.
