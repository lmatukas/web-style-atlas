---
schema_version: 1
id: escapement-nocturne
name: Escapement Nocturne
summary: A live mechanical watch on deep black, opened by scroll or hand, followed by an exact-price personalisation desk and a complete local salon visit.
family: spatial
tags: [luxury, metallic, precise, dimensional, product-led, calm]
best_for: [products, commerce, craft]
avoid_for: [documentation, data, public-information]
density: sparse
image_dependency: low
motion_level: expressive
complexity: high
signature:
  composition: A holds one watch right of three editorial scroll chapters; B reverses the weight into a left object and warm light selection desk, then a full-width ledger.
  typography: Local Crimson Pro Light headings and numerals, geometric Jost 400 text, tabular figures and small tracked uppercase labels.
  navigation: An unframed wordmark and quiet local links; chapter anchors in A and an explicit selection-review-fitting route in B.
  content_rhythm: Long dark watch chapters lead to ruled figures and a cropped mechanism; the service changes to warm paper with visible form boundaries.
  imagery: Original native WebGL bevelled watch and gear train, plus a detailed original SVG generated from code, without photography or borrowed models.
  color_and_material: Near-black stage, warm cream text and one restrained bronze accent; material colour belongs to the watch and swatches.
  interaction: The dial opens under scroll, pointer drag, touch, arrows and a native range; case, dial and strap choices change the view, total and booking snapshot.
  motion: A 1450 ms arrival settles; the requested live clock updates once a second while visible, with pause and no perpetual RAF; reduced and unavailable graphics use a frozen static SVG.
status: ready
prompt_path: prompts/escapement-nocturne/prompt.en.md
---

# Escapement Nocturne

## Intent

This direction reveals the inside of an apparently quiet object. Zevraqelle is an invented time atelier showing the Nocturne N.01 concept: first an intimate watch story, then a precise choice and a visit. All model specifications, premiums and salons are explicitly fictional. It is a product-service concept.

## Signature

Preserve five invariants, written before implementation: one full-height watch with a legible gear train; three slow editorial chapters around one sticky object rather than repeated hero images; a restrained light serif/sans pair and small spaced labels; a transition from deep black presentation to warm light decision surfaces; and a complete material-price-visit chain. The applied hour marks, fine hands and open balance make the object identifiable as a watch without a brand logo.

## Typography

Crimson Pro Light (300) carries headings and large numerals; geometric Jost at 400 carries text, labels and controls. Both are bundled OFL WOFF2 subsets including both cases of Lithuanian letters. Two families and two files stay far below 200 KB. Headings stay at 38–56 px, with B’s single product name up to 67 px. Labels use 11–12 px and 1–3 px tracking. Tabular numerals keep time, measurement, price and percentages stable.

## Color and surfaces

The stage is #0b0b0c, the supporting graphite #19191b, the text #f0e9dc and the muted text #b3ada2. The only interface metal is #c4a477. The light service uses #eee7d9 with #28251f text, #71572f accent and #8b7d67 control boundaries. Metallic gradients appear only on the drawn watch; interface surfaces stay flat. Errors have text as well as colour.

## Layout A

An unframed wordmark and three quiet links introduce a two-column narrative: short editorial copy left, one large sticky watch right. Three chapters move from exterior to gear train to balance. Scroll reveals the movement; the native range, button, horizontal drag and arrow keys offer the same inspection without scrolling. Four large ruled figures follow, then a close crop of the very same SVG movement opposite a three-step craft list. The warm paper visit section pairs an invitation with a genuine local form.

## Layout B

The watch is on the left and the choice panel on warm paper on the right. Three numbered fieldsets offer case, dial and strap with visible prices and native radio controls. The selected object updates immediately, the total includes all premiums and reset restores the original configuration. A full-width paper ledger lists every choice, base, extras and total before a fitting action. Dark specifications and the complete light visit form close the page. Unlike A, this is a decision desk without three scrolling story chapters.

## Imagery

`reference/mechanism.mjs` builds a native WebGL watch from original bevel profiles, rings, toothed wheels, spokes, bridges, jewels, applied markers, straps and moving hands. It uses depth testing and a small studio reflection shader, with no external libraries. `reference/drawing.mjs` authors a detailed SVG counterpart with a balance spring, metal gradients, real clock angles and all configurable materials. The declared local `assets/watch.svg` is the default informative static view. Later static choices create and revoke local SVG Blob URLs from the same generator. No photo, imported model, texture or AI-generated image is used.

## Navigation and interaction

In A scroll progressively removes dial opacity; the focused watch accepts arrows and Home/End, horizontal pointer or touch drag works alongside vertical page scrolling, and the native slider/button always works. In B all 27 case/dial/strap combinations change the object and price. The base is 6800 €, cases add 1600/0/600 €, dials 0/250/350 €, and straps 0/180/480 €. Every price is explicitly demonstrative. The summary and visit confirmation carry an exact snapshot of the selected materials and total.

The visit requires a salon, a day from tomorrow through 90 days in the salon’s Europe/Vilnius calendar, a free slot, a name, an email and acknowledgement. Sundays and the disabled 14:00 slot are rejected. Errors appear beside the relevant field, a count is announced and focus moves to the first error. Confirmation uses text nodes, lists the exact choice and says nothing was sent. Editing hides stale confirmation; reset clears its contents. No personal data is persisted.

## Motion

The 1450 ms watch arrival and brief gear movement settle. The task’s live clock then updates the hands discretely once per second; there is no idle spinning and no perpetual animation frame. Pause stops both the clock and episodes. Offscreen/hidden pages stop timers and RAF. Reduced motion shows the declared static watch at 10:08:32 and starts neither RAF nor a clock timer; deliberate choices redraw just one static SVG. A live reduced-motion switch disposes the GPU and freezes the last time. Lost/unavailable WebGL shows a labelled static image and leaves every business control working. Pagehide cancels work, disconnects observers, revokes Blob URLs and deletes buffers, shaders and program.

## Responsive behavior

At 1440 the watch holds a 75–76 svh stage and dominates the first screen. At 768 the narrow editorial column and watch remain legible; the booking fields stack as needed. At 360/390 the full-height watch comes first, the chapters become ordinary reading sections and the choice panel follows the object. Both stages keep at least 72 svh; controls and forms use the full available width. No sticky header, drawer or floating price bar can cover focused controls. Text supports zoom and long Lithuanian labels.

## Accessibility

Both pages have one h1, a main landmark, a skip link and a labelled navigation. Native fieldsets, radio groups, selects, date, email and range controls retain keyboard behavior. Focus rings contrast with both surfaces; visible errors have aria-describedby and aria-invalid. The scene gives explicit keyboard instructions and a real image alternative. Status text tells the truth about live, paused and frozen modes. Rendering checks inspect actual API calls and pixels.

## Adaptation

Use this direction for another precision object only if its exterior can honestly open into a meaningful mechanism or material section. Preserve the large object, editorial pacing, tabular evidence, material selections and local service. Replace fictional specifications, premiums and salons with owner-approved data before a real launch. Supply a matching informative fallback and keep its material choices synchronized. A real booking backend is a separate, explicitly configured integration.

## Avoid

1. Do not substitute a decorative clock icon, gold medal or stock watch photograph for an inspectable movement.
2. Do not turn the mechanism into endless spinning, neon glow, particles or a scrolling lock; the live time and one reveal are enough.
3. Do not add cart urgency, hidden material premiums or a fake booked appointment; show one exact total and the local-demo boundary.

## Closest styles

Art Deco uses a centred green ceremonial invitation, stepped ornament and programme navigation. This direction uses an asymmetrical full-height product, a progressive mechanical reveal and a complete choice-to-visit service. Industrial Spec is a cool dense engineering sheet with orthographic dimensions and revision rows. Escapement Nocturne has sparse black editorial chapters, a dimensional object and a warm decision panel. Across both comparisons, composition/navigation, typography/density and material/interaction differ; subject matter alone is not the distinction. Obsidian Stage also has a product narrative, but its exploded rectangular recorder and light comparison table differ from the circular live calibre, dial-opacity reveal, and three material fieldsets here.
