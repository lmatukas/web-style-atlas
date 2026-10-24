---
schema_version: 1
id: openwater-deck
name: Openwater Deck
summary: A long white yacht across an open horizon leads to an interactive deck atlas or a schematic island route and a local seven-night charter enquiry.
family: photographic
tags:
- luxury
- image-led
- precise
- calm
- task-led
best_for:
- hospitality
- travel
- products
avoid_for:
- data
- documentation
density: sparse
image_dependency: high
motion_level: subtle
complexity: medium
signature:
  composition: A stretches a long yacht across a sea horizon before a three-column deck atlas; B pairs a paper invitation with a broad schematic chart and route-planning desk.
  typography: Local Crimson Pro 300 serif headings and Jost 400 technical text with tabular numerals; small tracked nautical labels.
  navigation: Native deck and week links; numbered deck hotspots and explicit route selection with pressed states.
  content_rhythm: Horizon, deck atlas, cabin records, technical table and crew; B follows chart, route choice, exact enquiry and practical notes.
  imagery: One documented CC0 sea photograph; original detailed yacht side silhouette, plan geometry and schematic island map.
  color_and_material: Warm white and sand paper, deep navy text and chart lines, restrained brass labels and pale sea.
  interaction: Four native deck buttons update geometry highlight, dimensions and use; two routes change real map paths and stops; local charter enquiry validates week and guest count.
  motion: A finite 1.5-second wake or route episode settles; explicit pause, reduced-motion, hidden/offscreen suspension and pagehide cleanup.
status: ready
prompt_path: prompts/openwater-deck/prompt.lt.md
---

# Openwater Deck

## Intent

Avelrune is a fictional 34-metre yacht and seven-night charter study. The direction uses maritime space, technical clarity and a warm domestic pace. It presents a vessel or helps visitors prepare a local enquiry. Dimensions, routes, dates and crew are demonstration data, not availability or navigational advice.

## Signature

Preserve five invariants: a long white yacht across an open horizon; navy marine lines on warm paper; a quiet serif with technical tabular sans; a clickable deck atlas versus a route-planning desk; and an exact, honest local charter enquiry. The four-zone plan is an explanatory composite of deck levels, not a construction drawing.

## Typography

Local Crimson Pro 300 provides light, calm serif headings. Local Jost 400 carries controls, specifications, labels and tabular numerals. Both contain Lithuanian glyphs and adjacent full OFL licenses. Body is 17–18 pixels, labels 11–12 pixels and one desktop campaign heading reaches 80 pixels, mobile 54 pixels. No font CDN or artificial condensed text.

## Color and surfaces

Warm white and sand define the house, cabin records and enquiry desk. Navy carries all practical information, chart geometry and selected controls. Brass labels are restrained and contrast-checked; pale sea supports the chart. A light gradient over the real photograph protects headline contrast while the navy bottom ledger protects small specifications.

## Layout A

A full-height arrival sets an original long yacht silhouette across a real horizon with one deck link. A three-column deck atlas follows: invitation, tall plan and selected-zone dossier. Four native numbered buttons open dimensions, area and use while highlighting the corresponding plan geometry. Cabin records follow on sand, then a semantic specification table and a navy crew ending with a week link.

## Layout B

The opening is a paper invitation beside a large schematic island chart. Mobile places the full-height chart before the invitation. Two spacious route choices change the chart path, stop coordinates, labels and selected-route text. A sand enquiry desk places the trip overview beside a form. Week, guest count, name and acknowledgement produce an exact unsent summary; edit and reset are explicit. Practical disclosures explain fictitious routing and lack of availability checks.

## Imagery

One sea photograph by Kyou 1868, Picture of Sea, 28 May 2025, is explicitly CC0 at its Commons file page. RIGHTS.txt records the exact source, image URL and rights statement. The image is orientation-corrected RGB WebP, resized and stripped of metadata. It provides atmosphere and is not claimed as a route location. The yacht, deck and islands are original code geometry, not a copied vessel or real nautical chart. No AI imagery, logos, real crew profiles or remote media.

## Navigation and interaction

Deck hotspots are native buttons with pressed state, 48-pixel targets and adjacent visible descriptions; selecting a number changes the actual SVG highlight and five dossier values. Native Enter/Space and touch match mouse behaviour. Route buttons update the actual SVG path and four map stops and invalidate any prior enquiry summary. The form requires one of three demo weeks, an integer 1–8 guests, a name with a letter and acknowledgement. Confirmation echoes all choices as text nodes. Edit preserves input and focuses week; reset restores two guests, empty week/name, unchecked acknowledgement and the first route. No sending, storage, fake price or payment.

## Motion

A 1.5-second initial yacht/wake or route-drawing episode settles. Choosing a route starts one new finite episode. Pause, live reduced motion, offscreen observation, document visibility and pagehide cleanup control the RAF lifecycle. Reduced motion immediately shows the final complete boat or chart and retains every service choice. No WebGL, sound, perpetual autoplay or intercepted scroll.

## Responsive behavior

Desktop uses 5-percent gutters and 120-pixel chapter spacing. At tablet widths the deck heading spans the plan and dossier pair. On phones the yacht grows beyond the frame as a deliberate side silhouette while enough hull remains visible to identify the vessel; the real horizon remains full height. The tall numbered plan and dossier stack with 64-pixel chapter gaps. B gives the chart its own 720-pixel first scene before the invitation, then full-width route and enquiry rows. Forms and long summary text wrap without horizontal scroll.

## Accessibility

Skip link, one h1, native links/buttons/range-free service controls, visible navy/teal focus and 44-pixel targets. Zone updates announce a concise polite region; route buttons expose pressed state. Error text identifies and focuses the invalid field; exact confirmation is a focusable status region. Table row headers are semantic. Generated diagrams have descriptive SVG labels and explanatory visible text. No external requests or persistence.

## Adaptation

Replace the fictional vessel, dimensions and routes with owner-verified data while preserving horizon/plan/dossier relationships. Replace the photograph only with documented CC0 or public-domain material. The route map remains schematic unless a professional navigation system is deliberately integrated. Production charter needs authoritative availability, approved price/terms, privacy and a backend; keep the local-demo boundary until authorised.

## Avoid

1. Do not turn the deck into a dense industrial equipment dashboard.
2. Do not replace the maritime atlas with terrestrial trail-checklist cards.
3. Do not use generic blue resort booking cards or pretend the enquiry was sent.

## Closest styles

Industrial Spec uses dense technical diagram/index rails and utility specifications. This direction uses a full-height horizon, spacious domestic cabin rhythm and numbered maritime zone atlas. Trail Composer uses terrestrial route assembly and checklist-style planning; here a fixed seven-night sea journey, marine chart and vessel-specific guest limit define navigation. Composition, typography and interaction differ under a neutral vessel-travel brief.
