---
schema_version: 1
id: midnight-vestibule
name: Midnight Vestibule
summary: A city hotel told at night — a full-screen photograph whose lamps come on, single-image chapters and a booking drawer that slides in with an exact nights total.
family: photographic
tags: [luxury, image-led, cinematic, warm, calm]
best_for: [hospitality, travel, events]
avoid_for: [data, documentation, products]
density: sparse
image_dependency: high
motion_level: subtle
complexity: high
signature:
  composition: A opens on a full-screen night photograph with only the name and one booking action, then alternates single large photographs with short text; B is a room gallery, comparison table and the same drawer.
  typography: Local Cinzel capitals with wide tracking for names and headings, calm Figtree for text and labels.
  navigation: Name and one pill action on the photograph; every booking entry point opens the same side drawer.
  content_rhythm: One chapter, one photograph, three or four sentences; prices and facts stay small and warm.
  imagery: Four public-domain night architecture and interior photographs, cropped so no real lettering appears, darkened and lit by a warm lamp glow.
  color_and_material: Night navy and black with cream text and one warm lamp amber for labels, prices and the drawer edge.
  interaction: A month grid picks arrival then departure; guests, room and extras recalculate an exact demonstration total; capacity and missing steps give clear errors.
  motion: The photograph's lamps come on once in 1.6 seconds and stop; the glow stays on the bridge lamps; the drawer slides in; reduced motion shows the lit image and opens the drawer without sliding.
status: ready
prompt_path: prompts/midnight-vestibule/prompt.en.md
---

# Midnight Vestibule

## Intent

Midnight Vestibule presents a city hotel the way a guest meets it after dark: a lamp-lit bridge in river fog, a warm lobby, a dome above dinner and a quiet spa. The fictional Kelvarre has forty-two rooms and one promise, a calm arrival at any hour. Rooms, prices and nearby places are invented. The direction suits urban hotels, private clubs with rooms, late restaurants and venues whose value is atmosphere at night.

## Signature

Keep five invariants: a night photograph that owns the first screen with only a name and one action; engraved capital headings with wide tracking; single-image chapters with very little text; one warm lamp colour against navy and black; and a booking drawer that slides from the side and always shows the exact total. Nothing on the page competes with the photograph for brightness.

## Typography

Cinzel at 400 sets the name, headings and large numerals in capitals with 0.08–0.4 em tracking. Figtree 400 and 500 carry text, labels and controls. All files are local WOFF2 subsets with full OFL texts and real Lithuanian glyphs, about 43 KB together. Headings stay between 28 and 60 pixels; labels are 12 pixels with about 4 pixels of tracking. Prices use tabular figures.

## Color and surfaces

The room is night navy #0a0f1a; panels use #131b2c and the drawer #0f1626. Cream #f1e8d8 carries text and a warm grey carries captions at more than 7:1. Lamp amber #e4b36a marks labels, prices, the selected dates and the drawer edge. Photographs are darkened slightly so cream text stays readable without heavy boxes.

## Layout A

The first screen is the night bridge photograph at full height. A gradient at the top holds the spaced name and one outlined pill; at the bottom an eyebrow, a two-line heading and one sentence sit on a darker gradient, with a thin tools row for the status and pause. Three ruled facts follow. Five chapters then alternate: the lobby as a tall portrait image beside text, three room cards on a navy panel, the dome restaurant as a full-bleed image with a left gradient, the spa with a marble crop, and the neighbourhood with a facade image and three short places.

## Layout B

The room page starts with a shorter facade band holding the heading and a date strip that mirrors the drawer. Each room is a wide image with a narrow detail column — size, guests, bath, view, nightly rate — alternating sides. A native table compares the three types. Each choose button opens the drawer with that room selected. A vertical edge tab keeps booking one tap away on desktop and becomes a bottom pill on phones.

## Imagery

Five original AI-generated images of invented places, from the Web Style Atlas asset bank: a footbridge with lamps in river fog (landscape and a portrait file for phones), a dark lobby with a stone desk, a restaurant under a glass dome and a dark facade with scattered lit windows. They replaced public-domain photographs of real buildings so the hotel stays wholly invented. CSS crops reuse them for room cards. A radial lamp glow over the hero and band uses blend modes, not extra files, and starts on the bridge lamps. Together the images weigh about 360 KB.

## Navigation and interaction

All booking buttons, the edge tab and the room buttons open one dialog. Focus moves to its title, stays inside while open and returns to the opener; Escape, the close button and the backdrop close it. The month grid has previous and next controls; the first chosen day is arrival, the second departure, up to fourteen nights. A stepper sets one to four guests, radios pick the room, two checkboxes add breakfast and late checkout. Errors name the missing step or the room capacity; confirmation repeats every choice and says nothing was sent.

## Motion

On load the photograph brightens and the lamp glow fades in over 1.6 seconds, then stops; there is no loop. Afterwards the glow stays on the bridge lamps. Pause stops the episode and the glow. The drawer slides in over 420 milliseconds. With reduced motion the lit photograph appears at once and the drawer opens without sliding. Hidden tabs and off-screen scenes stop pending frames; pagehide removes listeners and observers.

## Responsive behavior

At 1440 pixels the hero fills the viewport and chapters use asymmetric two-column grids. Below 1024 pixels chapters, rooms and the neighbourhood become single columns with images first. On phones the masthead wraps links under the name, the hero keeps 92 % of the screen height, facts and room cards stack, the comparison table scrolls inside its own labelled region and the drawer takes the full width.

## Accessibility

Each page has one h1, a main landmark and a labelled navigation. The drawer is a modal dialog with a heading, inert background, focus trap and Escape. Calendar days are buttons with full Lithuanian date labels and pressed states; fieldsets and legends group guests, rooms and extras; errors use an alert and mark invalid groups. Photographs have descriptive alternative text. Contrast pairs are recorded in tokens.json. Outcomes are recorded in docs/evidence/S55.md.

## Adaptation

For a late restaurant, keep the night photograph and drawer but book a table and a time instead of nights. For a club with rooms, replace the three rooms with membership tiers. Use only photographs whose rights allow redistribution and crop out real names. Connect a real availability service only when the project provides one, and keep the demonstration notice until then.

## Avoid

1. Do not fill the first screen with search bars, star ratings or several buttons; the photograph, the name and one action are the welcome.
2. Do not loop the light or animate the city; the lamps come on once and then respond only to the guest.
3. Do not hide the price until the last step; the drawer shows nights, extras and the exact total as choices change.

## Closest styles

Cinematic Photo is a travel magazine with editorial spreads and captions; Midnight Vestibule is a hotel at night that ends every path in a booking drawer, uses engraved capitals instead of an editorial serif and keeps one warm accent on navy. Twilight Expedition is an outdoor journey with a WebGL terrain and route planning; this direction is indoor and urban, photographic rather than rendered, and its task is choosing a room and nights. Structurally, A is a sequence of single-photograph chapters and B is a room gallery with a table, neither of which the neighbours use.
