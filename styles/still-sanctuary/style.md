---
schema_version: 1
id: still-sanctuary
name: Still Sanctuary
summary: Quiet landscapes, warm sand and an interactive day ritual that changes the page light, ending in a useful local stay enquiry.
family: photographic
tags: [luxury, image-led, warm, calm, humanist]
best_for: [hospitality, travel, services]
avoid_for: [data, documentation, commerce]
density: sparse
image_dependency: high
motion_level: subtle
complexity: medium
signature:
  composition: A is a regional landscape directory with numbered horizontal rows; B frames one place with a split opening, a day itinerary and a two-villa comparison.
  typography: Local Newsreader 400 for unhurried sentence-case headings, humanist Figtree 400 for body text and widely spaced small labels.
  navigation: Visible region and place links, native section anchors and one outlined stay action.
  content_rhythm: One landscape, a short invitation, three regions, a morning-to-evening ritual and a quiet enquiry.
  imagery: Original AI-generated forest mist, foggy pines, mountain lake at dusk, a steaming stone bath and a monochrome garden pavilion, explicitly illustrative of invented places.
  color_and_material: Warm sand with deep brown text, olive selection and clay dusk; the body changes light with the chosen hour.
  interaction: Three day buttons update photograph, time, description and page ground; region, dates and chosen rituals produce a local enquiry summary.
  motion: A single 1.6-second photographic breath settles; pause, reduced motion, offscreen suspension and cleanup keep the landscape quiet.
status: ready
prompt_path: prompts/still-sanctuary/prompt.en.md
---

# Still Sanctuary

## Intent

Still Sanctuary presents a small retreat collection through the experience of having time. The invented Auvrėja has three landscape directions and a single-place reference with two illustrative villas. Visitors choose a setting, explore a day, then assemble a stay enquiry. The direction suits retreats, rural hospitality and quiet place-based services. It does not make medical or therapeutic promises. Place names, rooms and rituals are demonstration content; photographs do not document actual accommodation offered by the invented business.

## Signature

Preserve five invariants: one landscape dominating the first screen; warm sand, olive and clay page light; light serif headings paired with a humanist sans; a ruled morning-to-evening control that changes a photograph and the whole page ground; and a local stay enquiry that has meaningful validation. A invites comparison between regions. B follows one place through a day and compares villas. Both make time, rather than a decorative wellness symbol, the main organizing idea.

## Typography

Newsreader at weight 400 and optical size 48 supplies relaxed sentence-case headings. Figtree 400 keeps practical information readable. Both are local OFL WOFF2 subsets with Lithuanian glyphs and full adjacent license texts. Labels are 11–12 pixels with two pixels of tracking; paragraphs are 16–17 pixels with generous leading. Most headings remain within 32–50 pixels, while the opening campaign line reaches 76 pixels on desktop. The mobile heading wraps deliberately instead of being reduced to a caption.

## Color and surfaces

The base is warm sand, with deep brown body text, olive controls and a restrained clay focus colour. Midday moves the page toward warmer light; evening changes the ground to pale clay while retaining dark text. Selection uses a filled olive field and a pressed state rather than colour alone. Thin ruled dividers organize regions, rituals and form groups. There are no floating rounded panels, metallic gradients or shadows pretending to be material. Hero text sits over a dark, token-derived lower gradient.

## Layout A

A slim masthead carries the name, one place link and a stay action. A forest photograph fills the opening, with a short title and one sentence near its lower edge. A centered invitation creates breathing room before three numbered regional rows. Each row has one landscape, a brief description and a link that preselects the region in the enquiry. The day ritual then pairs three time controls with a large image and description. Three simple experience columns and the enquiry complete the visitor journey.

## Layout B

The single-place page begins with a sand title panel beside a large lake photograph. A short facts strip states the invented place scale. The day ritual appears immediately after the opening because the visitor already knows the destination. Two villa descriptions pair photographs with area, guest capacity and a concise difference. They are editorial comparisons, not bookable inventory. The same enquiry contract closes the page. On phones the split opening becomes a full-height photograph with the title low in the scene.

## Imagery

Five original AI-generated images carry the visual weight: mist over forested hills, a mountain lake at dusk and a monochrome garden pavilion, plus foggy pines for the forest region and a steaming stone bath for the bath villa, so no section repeats the photograph just shown above it. They replaced photographs that this style used to share with other directions. The pavilion is a generic architecture illustration, never evidence of a villa one can reserve. Their inventory, prompts and provenance are in assets.json and RIGHTS.txt. No source-site links appear in either reference page. Images have descriptive alternatives, fixed intrinsic dimensions and deliberate cover crops. They can be replaced with licensed owner material without changing the regional structure.

## Navigation and interaction

All navigation is visible and local. Morning, day and evening are ordinary buttons with aria-pressed states; each updates the photo, alternative text, schedule heading, description and body light. The enquiry accepts a region, arrival, departure and at least one ritual. It rejects missing choices, past arrival, reversed or equal dates, stays exceeding twenty-one nights and missing demonstration acknowledgement. Errors identify and focus the relevant field. A valid summary reports every selection and explicitly says nothing was sent or reserved. Reset clears the result.

## Motion

The opening photograph has one finite 1.6-second zoom and lighting episode. It settles completely. Pause retains progress; resume continues only the remaining episode. Reduced motion draws the final image immediately, and changing the preference stops the active loop. Leaving the viewport or hiding the document suspends work. Pagehide cancels animation, disconnects observation and removes listeners. The day selection uses only a short colour transition, removed under reduced motion. No WebGL, audio, video or external runtime is required.

## Responsive behavior

At desktop width the regional rows keep an index, image and text in separate columns; the single-place opening is a true asymmetric split. Tablet layouts reduce the index and move regional descriptions beneath their images. At 360 and 390 pixels the masthead stays compact, photographs retain their scale, ritual controls keep three usable columns and form fields become full-width. Villas and experiences stack in reading order. No horizontal page scrolling, cropped controls or fixed booking overlay is part of the design.

## Accessibility

Use one page heading, a skip link, visible focus, native form elements and explicit labels. Pressed ritual states remain available without a pointer. Photo alternatives update with the actual image. Error and confirmation regions announce useful changes, and invalid fields expose their state. Text and borders use validated semantic contrast pairs for morning, day and evening grounds. Test the actual controls with keyboard and touch, including reset after confirmation, rather than inferring access from markup. Local font files contain both cases of every Lithuanian letter.

## Adaptation

Replace invented regions, schedules and villas only with verified owner information. Keep the region-comparison task in A or the day-at-one-place task in B. Use photographs that remain quiet after a phone crop. A production enquiry needs an explicitly chosen backend and privacy flow; do not silently turn this local demonstration into a real booking system. Preserve the image-and-light relationship when renaming rituals, and retain short practical descriptions instead of adding a large feature grid.

## Avoid

1. Do not use distressed paper, marginal travel notes or invented documentary coordinates.
2. Do not turn the sequence into a dark photographic magazine filmstrip.
3. Do not replace the regional and daily structures with a generic wellness grid and competing booking buttons.

## Closest styles

Field Notes uses annotated writing, sketches and a preparation rail; this direction uses large photographs, a regional directory and a stay enquiry. Cinematic Photo uses dark editorial frames and a scene notebook; this direction uses sand, olive and clay, native day choices and a service task. The structural regional rows and single-place itinerary distinguish it, and it no longer shares any image with Cinematic Photo. Typography, palette and the image-to-form relationship provide further separation from both neighbours.
