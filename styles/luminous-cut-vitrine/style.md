---
schema_version: 1
id: luminous-cut-vitrine
name: Luminous Cut Vitrine
summary: One original round brilliant in an empty ivory vitrine, turned by hand, followed by portrait collection plates, a facet drawing and a working visit booking.
family: ornamental
tags: [luxury, dimensional, product-led, precise, calm]
best_for: [products, commerce, craft]
avoid_for: [data, documentation, publishing]
density: sparse
image_dependency: medium
motion_level: expressive
complexity: high
signature:
  composition: A centres one stone inside a fine vitrine ring with text pushed to the corners; B splits a sticky stone stage from a quiet choice panel.
  typography: Local Bodoni Moda at 400 for headings and numerals, local Alegreya Sans for text and widely spaced uppercase labels.
  navigation: Collection, piece and craft links on the left, a spaced wordmark in the centre and one quiet visit link on the right.
  content_rhythm: Long ivory pauses between few sections; each section holds one idea, one image role and at most one strong action.
  imagery: Original native WebGL round brilliant with 57 facets, double pavilion reflection and spectral fire; renders of the same code for the static view and the collection plates.
  color_and_material: Ivory paper, charcoal text and a thin warm metal accent; colour appears only inside the stone and in the chosen metal.
  interaction: The stone turns under pointer, touch and arrow keys while its facets re-light in real time; booking and piece choices work locally.
  motion: A 1400 ms arrival that settles, then only user-driven turns; pause, static reduced-motion image, context-loss fallback and full disposal.
status: ready
---

# Luminous Cut Vitrine

## Intent

Luminous Cut Vitrine treats one cut stone the way a museum treats one object in a glass case. The fictional house Quenvaire shows a small collection, explains how a brilliant returns light and asks for one thing: a calm visit. Grades, prices and salons are invented. It suits fine jewellery or any small, precise object valued for light and proportion.

## Signature

Five invariants hold the direction together: a single original stone centred in generous ivory space; a thin vitrine ring and corner text instead of a hero card; a high-contrast serif paired with a humanist sans and spaced labels; colour that comes only from the stone's dispersion and the chosen metal; and a service — booking or choosing — that is quiet but complete, with clear errors and a local confirmation. The stone is drawn from 57 computed facets, so its arrows and fire follow real geometry rather than a picture.

## Typography

Bodoni Moda, instanced at weight 400 and optical size 28, and Alegreya Sans Regular and Medium are local WOFF2 subsets with full OFL texts, about 54 KB together. Headings stay between 30 and 56 pixels; only the piece title in B grows to 72 pixels. Labels use 12 pixels, weight 500 and about 2.6 pixels of tracking. Prices use the serif so numbers feel engraved rather than promotional.

## Color and surfaces

Ivory #f7f3ec is the room, a deeper plate tone #ede5d8 holds collection images and summaries, charcoal #1f1c19 carries text and the filled booking action, and a warm metal brown #7a5c2e is reserved for numerals, index marks and the vitrine ring. Borders are drawn at 3:1 or better so choices stay visible on light paper. There are no gold gradients on interface surfaces; the only metallic gradients are the four small metal swatches and the engraving band, which describe the material being chosen.

## Layout A

The first screen is the vitrine: a spaced label at the top, the stone filling about three quarters of the height inside a double hairline ring, stone data at the right edge and, at the bottom, a small serif heading with one outlined pill action. A thin tools row holds the status line and turn and pause buttons. The collection then presents three 4:5 portrait plates — ring, pendant and earrings — with the middle plate lowered to break the grid. The craft section pairs an inline facet drawing (top view and labelled profile) with a large 57 numeral and four ruled steps. Three numbered service columns precede the booking panel.

## Layout B

The piece page is a split product view. The left half is a sticky stage with the same stone now held by six claws; the right half holds a breadcrumb, the title Aušra, and native controls for metal, stone size, ring size and an 18-character engraving shown live on a metal band. A plate-tone summary shows a render of the ring in the chosen metal, every choice, the stone and metal prices and the demonstration total, with one outlined action leading to the booking panel. A two-column specification list and the same booking form, preset to this piece, close the page. A answers "what is this house"; B answers "which version of this piece".

## Imagery

Everything visible is original. `reference/gem.mjs` builds the brilliant from computed facet rings and shades it with a studio environment, a double pavilion reflection and per-channel refraction for fire. Claws, band, bail and chain are smooth metal primitives. `tools/render-stills.mjs` renders the same code to the fallback PNG and six collection WebP files, dedicated under CC0-1.0. No photographs, imported models or AI images are used.

## Navigation and interaction

Dragging with a mouse turns and tilts the stone; a horizontal touch swipe turns it while vertical swipes keep scrolling the page; the focused stage accepts arrow keys, and two buttons turn it as well. Mouse movement over the stage slides the light so facets flicker in real time. In B the metal choice recolours the claws and the summary render, stone size rescales the stone and changes the price. The booking form validates salon, day, a free time, topic, name, contact and acknowledgement; errors appear beside each field and in a summary, and focus moves to the first problem. Confirmation states plainly that nothing was sent.

## Motion

The stone arrives with one 1400 millisecond turn and settles; there is no idle spin. Pause freezes the arrival and hover light. With reduced motion the rendered static stone is shown at once and no animation frame loop starts; missing WebGL and lost contexts show the same labelled image, which still turns with the arrow buttons. Hidden tabs and an off-screen stage stop pending frames; pagehide disconnects observers and deletes GPU buffers and the program.

## Responsive behavior

At 1440 pixels the stone stage takes about 74 % of the viewport height. At 768 pixels craft, booking and details become single columns and the B stage moves above the panel. At 360 and 390 pixels the masthead wraps its links under the wordmark, the vitrine stacks label, a 72 svh stage, stone data, heading and action, and every choice becomes a full-width row. Nothing relies on hover; no page scrolls horizontally.

## Accessibility

There is one h1 per page, labelled navigation, fieldsets with legends for every radio group, native selects and inputs with visible labels, and error text linked through aria-describedby. The stage is a focusable group with an explicit instruction; the status line announces turns and fallback reasons. The inline facet drawing has a title. Focus outlines use the dark metal tone at 7:1 against ivory. Fonts contain real Lithuanian glyphs. Exact automated and manual outcomes are recorded in docs/evidence/S53.md.

## Adaptation

Replace the stone only with another precise object that can be drawn honestly, such as a dial or a coloured gem, keeping the vitrine, ring and single action. Connect the booking to a real calendar only when the project provides one, and swap invented grades and prices for approved data. Without graphics capability, supply a matching render and keep every control working.

## Avoid

1. Do not fill the vitrine with a grid of products or a carousel; one stone with empty space is the composition.
2. Do not add gold gradients, glitter particles or constant spinning to signal luxury; colour belongs to the stone's dispersion and the chosen metal only.
3. Do not fake commerce: no add-to-cart, countdowns or "only two left" urgency; the service is a calm visit with a clear local confirmation.

## Closest styles

Quiet Luxury is a furniture catalogue with a left text column, a framed illustration panel and serif italic headings; Luminous Cut Vitrine centres a live 3D stone with no frame, uses a high-contrast Bodoni and ends in a working booking service. Gallery White Cube is an exhibition with three flat artworks, wall labels and a floor plan in a neutral sans; this direction stages one dimensional object, then portrait product plates and a facet drawing. Structurally, A is a centred vitrine followed by staggered plates and B is a sticky split product page — neither neighbour has a 3D stage or a configurator.
