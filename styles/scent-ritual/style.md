---
schema_version: 1
id: scent-ritual
name: Scent Ritual
summary: A sculptural glass perfume bottle in liquid pastel light leads to four scent dossiers or a three-question finder, a note pyramid and a personal sample tray.
family: spatial
tags: [luxury, dimensional, product-led, calm, task-led]
best_for: [products, commerce, craft]
avoid_for: [data, documentation]
density: sparse
image_dependency: low
motion_level: subtle
complexity: high
signature:
  composition: A divides a quiet invitation from an oversized glass bottle and continues through linear scent dossiers; B opens a full-width bottle study before a two-column question and note-pyramid atelier.
  typography: Local Crimson Pro 300 display and Jost 400 body; delicate serif rhythm, small tracked labels and generous paragraph spacing.
  navigation: Visible collection/finder links, local section anchors, scent selection, three radio questions, back and edit controls, explicit sample removal.
  content_rhythm: Bottle, four scent records, three note layers, personal tray and sampling ritual; B moves through atmosphere, questions, explained result and tray.
  imagery: Original native WebGL ray-traced glass vessel with liquid, frosted stopper and paper label; code-rendered PNG fallback and original CSS miniature bottles.
  color_and_material: White and graphite with rose, amber, pale green and ivory light; transparent glass edges and an illuminated liquid surface.
  interaction: Pointer or native range input tilts the liquid; all 27 quiz combinations map to an explained scent; up to three distinct 2 ml samples form an exact local summary.
  motion: An initial 1.5-second light and liquid episode settles; later episodes are bounded, with pause, reduced motion, offscreen/hidden suspension and disposal.
status: ready
prompt_path: prompts/scent-ritual/prompt.lt.md
---

# Scent Ritual

## Intent

Orsivelle is a fictional perfume atelier with four imaginary fragrances. Scent Ritual treats perfume as a personal encounter rather than a busy shop. Visitors explore a collection or answer three questions, then compose a small sample tray. Notes describe an invented mood, never a verified formula, safety claim or stock statement. The service is explicitly local: no order, payment, message, storage or delivery occurs. A useful discovery interaction provides the ending to the material-led opening.

## Signature

Preserve five invariants: one monumental transparent glass vessel; liquid pastel light on white; thin serif headings against tracked sans labels; notes organized as three spatial levels; and a small customizable sample tray. Composition differs between a linear collection and an intimate question atelier. Exactly three direction-specific anti-patterns appear below. Glass, liquid and note hierarchy must survive a change of brand or product category; pastel colors alone do not establish this direction.

## Typography

Crimson Pro at weight 300 gives the large headings a quiet, fine-lined voice. Jost 400 carries navigation, questions and ingredient-like note labels. Both are bundled OFL WOFF2 subsets with Lithuanian uppercase and lowercase coverage and full adjacent licenses. Body is 17–18 pixels with generous leading. Labels are normally 11–12 pixels, spaced rather than artificially condensed. Desktop campaign headings reach 80 pixels; phone headings stop at 56. Small metadata never carries the only instruction for a control.

## Color and surfaces

Warm white and graphite hold the practical interface. Rose, pale green, amber and ivory identify four scents through visible names as well as color. Only the visual stages use fluid gradients; forms stay quiet and readable. Control borders, error messages and focus rings use semantic contrast-checked tokens. The shader has a separate original material palette for glass, warm liquid and a frosted stopper. A photograph, grain texture or decorative gold frame is unnecessary.

## Layout A

A narrow typographic invitation sits beside a large bottle occupying the broad right-hand stage. A slim motion strip follows the opening. Four numbered horizontal scent dossiers pair miniature bottles, distinct note descriptions and simple selection controls. The selected scent updates the main scene and a spacious three-row note ledger. A two-column sample atelier pairs its explanation with a physical-looking vial tray and local confirmation. Sampling observations and a native disclosure complete five meaningful chapters.

## Layout B

A full-width pastel bottle study opens with a small invitation in one corner. Below it, a three-tier note pyramid sits beside one question at a time. Radio choices preserve their state when going back. All three answers produce a recommendation and an explicit explanation of each answer's contribution. The pyramid then presents that scent's actual three note groups. A quiet statement about personal choice leads into an editable sample tray. This is a sequential discovery task, not A with reordered catalogue cards.

## Imagery

The bottle is original signed-distance geometry rendered in native WebGL. Rounded glass, a cylindrical neck, a broad frosted stopper, studio reflections, refracted background light and a tilted liquid surface are calculated in a fragment shader. A local canvas draws the fictional paper label after fonts load. The same renderer creates the informative transparent PNG fallback with a neutral atelier label. Small collection bottles and sample vials are original CSS geometry. No photograph, downloaded model, external renderer, AI image or real perfume packaging is used.

## Navigation and interaction

Collection buttons update all visible scent names, notes, material color and pressed state. The finder uses three three-choice questions. Weighted profile distance ranks four scents: place counts three, time two and closeness one; ties follow collection order. Results state that method and never claim scientific personalization. Sample buttons toggle a scent, while the recommendation button only adds it. Duplicates cannot enter the tray. A fourth scent produces an actionable error; removal returns focus to its stable picker. Confirmation requires one to three samples and explicit acknowledgement, then lists names, all notes, 2 ml each and the exact total. Editing retains choices; clearing resets only the tray. Quiz reset retains the independently composed tray and says so.

## Motion

The initial glass and light episode settles after 1.5 seconds. Pointer movement or a keyboard/touch range input starts a short finite liquid tilt. Pause stops ambient episodes, while deliberate range changes remain possible without animation. Reduced motion and unavailable or lost WebGL show the declared image with an honest label; all business controls remain available. Hidden pages and offscreen scenes stop scheduling. Pagehide releases buffers, textures, shaders, observers and media listeners. No orientation permission, sound, scroll hijacking or infinite animation is necessary.

## Responsive behavior

Desktop gives the main object roughly two thirds of the opening and uses 112-pixel chapter spacing. Tablet keeps a distinct bottle/invitation relationship and loosens collection action rows. Phones start with a dedicated tall bottle scene, then a readable invitation. The question and pyramid stack, sample pickers remain two columns, and vial names wrap. Mobile gutters are 24 pixels and section gaps 64 pixels. The original bottle remains complete, with no scaled-down desktop text or trapped vertical touch scrolling.

## Accessibility

There is one h1, a main landmark, a skip link, native navigation, native radio groups, meaningful image alternatives and a visible focus ring. Real range controls work by keyboard and touch. Selected scents expose pressed state, errors announce their cause and confirmation receives focus. Text summaries use text nodes; user choices never become executable markup. Fallback content is present before script initialization. Automated resource, contrast and responsive checks supplement actual screenshot and control inspection.

## Adaptation

Replace fictional identity, scent names and notes only with owner-approved descriptions. Retain the object/light hierarchy, two different journeys and three-level note language. Other small personal products can use a similarly bounded discovery service. A production version needs verified formula and product claims, actual prices, accessibility review and an explicitly authorized commerce backend. Keep the honest local boundary until those capabilities exist.

## Avoid

1. Do not substitute soft clay blobs or embossed dashboard controls for transparent glass and liquid.
2. Do not turn the notes into rustic ceramic stories, distressed paper or handmade collage.
3. Do not replace discovery with a generic product-card grid, automatic cart or fabricated scientific diagnosis.

## Closest styles

Soft Spatial uses opaque CSS volumes, a room and staggered practice layers with system sans typography. Here transparent refractive glass, thin local serif type and a question/pyramid service form a different structure. Organic Craft uses irregular ceramic silhouettes, earthy surfaces and an asymmetric making story. Scent Ritual uses precise glass geometry, fluid light and a numbered scent ledger versus a guided finder. Under a neutral personal-object brief, composition, material, typography and service remain distinct in both comparisons.
