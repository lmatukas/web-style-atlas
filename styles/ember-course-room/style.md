---
schema_version: 1
id: ember-course-room
name: Ember Course Room
summary: A candlelit table becomes a ten-course evening journey or a spatial reservation atelier, with warming light, wine pairings and a real local table-selection service.
family: photographic
tags: [luxury, image-led, warm, cinematic, task-led, calm]
best_for: [hospitality, events, craft]
avoid_for: [data, documentation]
density: sparse
image_dependency: high
motion_level: subtle
complexity: high
signature:
  composition: A pairs a broad sticky food photograph with ten timed course records; B makes a six-table room plan the center of an appointment ledger after a panoramic opening.
  typography: Local Newsreader regular and italic 400 with Jost 400; italic dish names, quiet serif invitations and small tracked sans labels.
  navigation: Menu and room routes stay visible; native previous/next controls complement scrolling; reservation choices, edit and clear are explicit.
  content_rhythm: Candlelit arrival, seasonal introduction, ten small courses, dessert, a paper reservation surface and practical hospitality notes.
  imagery: Three original AI-generated photographs show a candlelit table, trout and pear, paired with an original HTML room plan; no real venue or brand is represented.
  color_and_material: Charcoal and walnut darkness, one amber accent, cream text and a warm paper reservation surface; ceramic, candlewax, linen and glass.
  interaction: The nearest course advances the photograph, clock and room warmth; date, time and party size determine which physical tables can be selected.
  motion: One 1.5-second arrival-light episode settles; scrolling drives later warmth without hijacking. Pause, reduced motion, hidden/offscreen stopping and cleanup remain explicit.
status: ready
prompt_path: prompts/ember-course-room/prompt.en.md
---

# Ember Course Room

## Intent

Velari Ember is an invented small dining room, not an operating restaurant. The menu describes ten fictional seasonal courses with wine and alcohol-free pairings. The reservation is a complete local demonstration, with an explicit availability model and no real booking, message, payment, personal-data storage or backend. AI imagery illustrates mood, not actual premises.

## Signature

Preserve five invariants established before implementation: one large candlelit table photograph; a numbered evening clock tied to courses; delicate italic dish names against tracked sans labels; room light that warms as the evening advances; and a spatial table choice with real capacity constraints. The structure and service must remain recognizable after replacing the fictional name and amber color.

## Typography

Newsreader 400 supplies quiet invitations and its true bundled italic face names the courses. Jost 400 carries readable body text, availability and form instructions. Two OFL families, one weight and three local WOFF2 files include both cases of all Lithuanian letters, with full adjacent licenses. Paragraphs are 17–18 pixels at 1.6 leading; labels 11–13 pixels with 1–3 pixels of tracking. Only the campaign heading reaches 76 pixels on desktop, 52 on phones. Form errors and descriptions use sentence case.

## Color and surfaces

The room begins at #120d0a with warm cream text and one amber highlight. Semantic tokens describe text, muted captions, borders, focus and errors. A warm paper surface supports the service, with dark ink and independent contrast-tested controls. A small amber light field changes intensity; ornaments, gold frames and gradients across interface controls are unnecessary.

## Layout A

A full-height candlelit photograph places the table to the right of a narrow invitation. Ruled evening facts and an unequal seasonal introduction lead to a wide sticky photographic stage beside ten distinct numbered courses. Each has a time, description, wine and alcohol-free pairing. The closest visible course changes the stage, its caption and the evening light; native previous/next buttons provide a non-scroll alternative. Dessert gives the ending space before an inline two-column paper booking surface and concise arrival notes. There are six meaningful chapters rather than a product-card grid.

## Layout B

A panoramic opening with a broad lower invitation leads directly to an appointment atelier. The large room plan occupies the left and a compact date/time ledger the right, sharing a single confirmation action. A confirmation replaces the editing surface with a precise local visit summary. Three atmospheric moments then show the evening from first candle to last ember; a short hospitality ending follows. The content task is selecting a place, not reading ten courses. This is a spatial service composition rather than a reordered A.

## Imagery

Three original built-in AI-generated images are explicitly identified in assets.json and RIGHTS.txt. The table establishes candlewax, dark ceramic, walnut, glass and linen; the two close-ups show trout and a poached pear. They contain no people, lettering, visible brands or real venue. Encoded local WebP files are resized and metadata-free; combined image weight is below 1.5 MB. The room diagram is original semantic HTML/CSS, not a photograph of a real space. All source and tool URLs remain in RIGHTS.txt.

## Navigation and interaction

A's ten-course journey works through ordinary scrolling and native previous/next controls. B's three native moment buttons change both the photograph and light. The room uses six radio-labelled positioned tables with capacities two, four and six. A local deterministic demonstration model exposes available counts per time and rejects closed Mondays, an illustrative sold-out date pattern, the full final slot, out-of-range dates and undersized or occupied tables. Changing date or party size clears stale time/table choices; changing time clears the table. The service validates again on submission, including allergy-note length and explicit demo acknowledgement. Confirmation states date, start/end, party, exact table and zone, menu, pairing and allergy note as text. Edit preserves choices; clear restores defaults and removes the summary. No persistence or network action occurs.

## Motion

One arrival-light episode finishes in 1.5 seconds; there is no looping candle animation. Pause stops automatic light changes and settles arrival. Deliberate course changes remain operable. Reduced motion paints the complete final image at once and changes subsequent choices without transitions or animation loops. Hidden/offscreen scenes stop scheduling; returning does not restart a user-paused episode. Pagehide removes listeners, observers and RAF work, while a restored page resumes with a settled state. The real photographs are the static path.

## Responsive behavior

The desktop table image owns the opening while the short invitation occupies its dark negative space. A pairs about three fifths image with a narrow course ledger. B uses a broad room plan next to its appointment details. At 768 pixels the editorial and service columns stack intentionally. Phone gutters are 24 pixels, section gaps 64, and the hero uses a dedicated tall crop with the dish retained. The compact course stage stays visible during the menu without trapping touch scrolling; room controls keep generous targets and readable text. The form and confirmation become one column.

## Accessibility

Semantic landmarks, one h1, a skip link, visible keyboard focus, native radio/selection controls, labels and associated errors make the page usable without pointing precision. Available, selected, occupied and too-small tables have text as well as color. Required-choice errors focus the first relevant available input; summary receives focus. User notes are inserted as text and never interpreted as markup. A disabled initial form prevents accidental navigation before the module initializes; the noscript notice explains how to use the demo. Both photos and all ten course descriptions remain available without JavaScript. Contrast, resources and keyboard behavior require actual browser checks in addition to screenshots.

## Adaptation

Replace the fictional menu, pairings, dates, room geometry and seating policies with owner-approved facts. Preserve the evening clock, photographic scale, italic course language and actual spatial choice. Production needs verified availability, allergy handling and authorized reservation integration. Keep the explicit local boundary until then. AI pictures are mood illustrations, not evidence of an operating business or ingredient accuracy.

## Avoid

1. Do not turn the menu into a delivery-app grid with price badges, baskets and equal rounded dish cards.
2. Do not substitute ornamental gold fans, stepped borders and a gala invitation axis for candlelight and the intimate table.
3. Do not turn the evening clock into a journal masthead, article departments or a long essay with margin notes.

## Closest styles

Editorial Journal organizes a literary masthead, departments and a narrow essay with margin notes; Ember uses a large sticky photographic stage and ten time-labelled courses. Its local serif/italic and warm sans system differs from journal typography, while a capacity-aware room service replaces reading navigation. Art Deco opens an axial double-rule cultural invitation with geometric fan navigation and three programme movements; Ember opens an unframed candlelit real-material image, then an unequal course ledger or a spatial appointment atelier. Photography versus ornament, italic food language versus geometric display, and course/reservation structure versus programme invitation establish at least three differences for each neighbor. A neutral evening-event brief must retain those structural differences.
