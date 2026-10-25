---
schema_version: 1
id: patina-auction-room
name: Patina Auction Room
summary: A charcoal auction wall, museum bronzes and movable light lead to a filtered catalogue or a single-lot dossier with local bid and viewing demonstrations.
family: photographic
tags:
- luxury
- image-led
- archival
- task-led
- high-contrast
best_for:
- culture
- commerce
- products
avoid_for:
- data
- documentation
density: sparse
image_dependency: high
motion_level: subtle
complexity: medium
signature:
  composition: A features one large wall object before an inventory grid; B is a 65/35 object dossier followed by provenance and a cream bidding desk.
  typography: High-contrast local Bodoni Moda 400 headings and local Patina Mono 400 (renamed IBM Plex subset) lot numbers and practical text.
  navigation: Native catalogue, viewing and lot dossier links; category/estimate filters and explicit reset controls.
  content_rhythm: Exhibition, inventory, viewing desk and notes; B uses object, provenance, condition and bidding.
  imagery: Three documented CC0 museum bronze objects with feathered photographic edges and warm directional light.
  color_and_material: Charcoal gallery wall, warm ivory text and paper desk; red reserved for the demonstration countdown.
  interaction: Pointer spotlight with native range equivalent; lot filters, object zoom, viewing registration and minimum-step local bidding.
  motion: Finite 1.4-second light episodes, pause, immediate reduced-motion state and hidden/offscreen suspension; separately controllable session countdown.
status: ready
prompt_path: prompts/patina-auction-room/prompt.en.md
---

# Patina Auction Room

## Intent

A fictional Orvélume auction study makes historic material and provenance legible. The museum objects remain museum objects, not fictional sale stock. Lot labels, estimates and bids are explicitly invented demo data.

## Signature

Preserve five invariants: charcoal exhibition wall; one museum object with movable warm light; high-contrast serif with monospaced lot data; an inventory catalogue versus a lot dossier; and honest local viewing and bid services.

## Typography

Local Bodoni Moda 400, optical size 28, carries the house name and fine high-contrast headings. Patina Mono 400, a renamed IBM Plex subset, carries tabular estimates and practical text. Both have full OFL files and Lithuanian coverage. Body 16 px; uppercase labels 11–12 px; one desktop campaign heading 74 px, mobile 46 px. No external fonts.

## Color and surfaces

Charcoal wall and warm white light retain a calm museum atmosphere. Warm ivory text and muted labels contrast with the wall. Red appears only on the countdown. The service desk is warm paper with dark ink, visible borders and native input states. Photographic edge masks soften the original backgrounds without changing the objects.

## Layout A

A full-height charcoal arrival stages one Cypriot bronze beside a short statement, with a small lot/estimate/countdown ledger below. A three-object inventory follows category and estimate filters. A cream viewing desk pairs a three-day calendar with six selectable half-hour sessions, name and party size. Native notes explain the demo and image provenance.

## Layout B

The object occupies 65 percent of a tall dossier spread. The narrower column contains lot number, title, date, estimate and one bid link. A zoom range lives below the object. Provenance and native condition disclosure follow, then an unequal cream bid desk. The lot query selects one of three real photographic studies, their actual museum inventory data and distinct minimum bid steps.

## Imagery

Three CC0 museum photographs from the Metropolitan Museum of Art: Japanese bronze vessels 59973 and 59843, and Cypriot vessel 244443. Full API, image and source records, public-domain verification, dates and credits are in assets/RIGHTS.txt. RGB WebP resizing removes metadata; no object recolouring. CSS edge masks and warm light create the exhibition setting. No AI images or imported logos.

## Navigation and interaction

Native links open the selected dossier. Filters combine category and starting estimate, including an empty state and reset. A native range offers keyboard and touch control of the same actual light moved by the pointer. A second range changes the object scale from 100 to 180 percent. Viewing requires a valid slot, a name with a letter, 1–4 integer guests and acknowledgement. Bidding requires a name, current bid plus the minimum increment, a whole increment multiple and acknowledgement. Confirmation reproduces the exact selections using textContent. Inputs invalidate old confirmation; reset restores the local session.

## Motion

The light settles within 1.4 seconds. Pause, live reduced-motion changes, IntersectionObserver offscreen suspension, visibility suspension and pagehide cleanup prevent unnecessary work. Reduced motion gives the final scene immediately without RAF. A separate duration-based three-minute demo countdown offers pause, extension and reset and suspends on hidden tabs. Expired sessions reject bids; extension restores availability. There is no WebGL or required API capability.

## Responsive behavior

Desktop uses 5-percent gutters and 120-pixel chapter spaces. At tablet widths the inventory stays in three columns while headings reduce. Below 650 pixels, A gives the object a tall scene behind a compact heading and a three-column lot ledger. B presents its own full-height image before the dossier text; the zoom remains on the image. Catalogue and service desks stack into deliberate full-width records with 64-pixel chapter gaps. Forms, summaries and long names wrap.

## Accessibility

Skip link, one h1, semantic navigation, native range/select/checkbox/button/number controls, visible focus and 44-pixel targets. Errors focus and identify the field and announce the issue. Confirmations are focusable status regions. Countdown is not a continuously announcing live region. No scroll interception, local storage, external requests or submissions. Contrast pairs include labels, timers, borders, paper and errors.

## Adaptation

Keep the wall/object/ledger relationship with verified rights-cleared objects. Replace museum references with actual authorised sale stock only with owner data. Preserve native filter, zoom and bidding paths even if imagery changes. Production requires server-side auction timing, authenticated bid validation, legal terms and viewing capacity; until then retain explicit local-demo boundaries.

## Avoid

1. Do not turn the wall into a white-cube exhibition poster.
2. Do not replace lot data with an architectural project monograph.
3. Do not use generic gold pricing cards or pretend a local bid was sent.

## Closest styles

Gallery White Cube uses a light wall and curatorial exhibition route; here dark object light, a filterable stock inventory and transaction desk define the structure. Architectural Monograph is a building-led project sequence with plan annotations; here individual artefacts, monospaced lot data, zoom and bid increments define navigation and rhythm. Structure, typography and interaction distinguish both neighbours under a neutral collection brief.
