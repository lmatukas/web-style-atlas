---
schema_version: 1
id: "spine-editions"
name: "Spine Editions"
summary: "A vertical book spine, thematic edition shelves and original openable excerpts lead to a device-local reading list."
family: "editorial"
tags: ["reading-led", "annotated", "archival"]
best_for: ["publishing", "culture"]
avoid_for: ["data"]
density: "balanced"
image_dependency: "low"
motion_level: "expressive"
complexity: "medium"
signature: {"composition": "A tall spine and thematic shelves; B filtered index beside an excerpt reader.", "typography": "Georgia editorial reading with plain sans metadata and page identifiers.", "navigation": "Theme controls, edition/reader/list anchors and actual A/B siblings.", "content_rhythm": "Catalogue-to-reading sequence versus immediate index-to-excerpt spread.", "imagery": "Original CSS spine and sliding cover, four authored edition excerpts.", "color_and_material": "Paper white, ink blue and readable cinnabar red.", "interaction": "Theme filtering, open/close excerpts and validated persistent local reading list.", "motion": "600ms lines, 300ms filter reveal, 450ms cover and active process margin."}
status: "ready"
prompt_path: "prompts/spine-editions/prompt.en.md"
---

# Spine Editions

## Intent

Spine Editions presents a small independent publishing concept through the physical logic of a book. The fictional Raštmė imprint explores cities, architecture and everyday culture through four original demonstration editions. Visitors discover a theme, open a readable excerpt and explicitly retain an edition in a device-local reading list. This is a publishing catalogue and reading space, without invented sales, reviews, author credentials or availability claims. Its quiet tone leaves room for words while the vertical spine supplies a strong recognizable object.

## Signature

Keep five invariants: a tall vertical ink-blue book spine; generous paper margins; red page and paragraph identifiers; original readable excerpts; and a persistent reading list with a truthful local boundary. A begins with a large spine fragment beside a publishing thought, then divides the catalogue into three thematic shelves. B compresses the spine and places a filtered edition index beside the reading surface. Both retain editorial spacing and a clear difference between finding a book and reading it.

## Typography

Georgia carries the editorial headline, edition titles and excerpt body, while Arial supplies practical navigation, labels and page metadata. These system roles do not require a downloaded font. Paragraphs use a generous line height and a measure around sixty characters, with ordinary selectable text. The vertical spine uses restrained letter spacing rather than heavily distorted glyphs. Real Lithuanian titles and paragraphs exercise accented letters. On phones reading measure is maintained through padding and natural wrapping.

## Color and surfaces

Paper white is the ground, ink blue carries text and the physical book cover, and cinnabar red marks page identity, active filters and important actions. A slightly deeper paper surface distinguishes the open reading area from the catalogue. Generated semantic tokens own the interface palette. The red has sufficient contrast for readable links and focus on paper; white labels remain clear on dark blue and the red action. Borders separate editorial relationships without turning each publication into an application card.

## Layout A

A broad first screen pairs one tall book spine with a short publishing thought and a two-line headline. Theme controls precede three actual shelves for cities, architecture and everyday life. Four edition records carry page numbers, descriptions and working open actions. The reading area then reveals the selected original excerpt. A device-local list, three-stage publishing process and clearly fictional contact note finish the reading route. The sequence is catalogue first, then sustained reading.

## Layout B

B opens with a small spine and compressed editorial proposition. A narrow edition index containing all four records sits alongside the large reading area. Theme filtering narrows this index while a selected excerpt remains available in the right column. The local list follows this working spread, before process and scope notes. Phones place the compact two-column edition index before the full-width reader. This index-to-excerpt relationship changes the navigation and task rhythm rather than simply reordering A’s shelves.

## Imagery

Original CSS geometry creates the spine, cover and opening surface. No borrowed cover design, photograph, font binary, publisher mark or scan appears. A cover label repeats the current original edition title; readable text remains ordinary HTML below the covering enhancement. All four titles, descriptions and two-paragraph excerpts were authored for the reference. The asset registry is empty because the physical motif is code-native geometry, not an uncredited image. Future real editions need their own rights-cleared covers.

## Navigation and interaction

Visible links reach editions, reader and list and connect the actual sibling composition. Native theme buttons expose pressed state and keep focus while visible records change. Opening an edition updates its page, description and excerpt and focuses a reading heading. Closing restores the initiating visible control. Add avoids duplicate records. The list validates stored IDs, restores across both variants, supports individual removal and clears only its own storage key. Unavailable storage is reported without claiming persistence.

## Motion

Opening headlines settle sequentially over 600 milliseconds. Theme records reposition over a finite 300-millisecond reveal while filter focus stays in place. The selected cover slides sideways over 450 milliseconds to expose readable prose; closing has a corresponding finite return. In the process section a margin identifier follows the visible stage without shifting the paragraph text. Pause, hidden-document suspension, offscreen runtime suspension and pagehide cleanup bound the enhancement. Reduced motion uses immediate complete states.

## Responsive behavior

Desktop A gives the tall spine its own broad margin, then uses shelf names beside edition records. B gives the edition index a narrow left column and the reader a substantial right surface. Tablet gaps contract before the working spread stacks. At 390 and 360 pixels a smaller vertical spine remains recognizable, shelf records become a reading sequence and the excerpt gains a comfortable single measure. Buttons wrap without clipping titles. The process marker remains a narrow margin rather than covering the text.

## Accessibility

Provide one main landmark, one h1, clear section headings, a skip link and visible focus. Cover shapes are decorative; the selected title, description and excerpt remain accessible text. Filter state and status messages identify available records. The closed excerpt is hidden from reading and keyboard order. Opening and closing have explicit useful focus behavior. Native scope disclosure remains keyboard-operable. Evidence records rendered axe/control checks and additional filter, persistence and keyboard cases rather than claiming unconditional certification.

## Adaptation

Replace fictional edition records with verified publisher metadata and rights-cleared excerpts. Preserve title, theme, description and readable sample relationships; a commerce integration requires real inventory, checkout and terms rather than extending this demonstration’s copy. Keep stable edition IDs and version the stored list when the catalogue changes. Other frameworks can implement the same native links, filters and open reading region. The three shelves may change topic while the vertical spine, margins and page numbering remain intact.

## Avoid

Exactly three anti-patterns break this direction: replacing the spine and page-margin structure with interchangeable product tiles; presenting borrowed excerpts or invented biographies as real publishing content; and claiming that a reading list was saved when device storage failed. Do not add fake checkout or subscription controls to make the editorial catalogue appear commercially complete.

## Closest styles

Editorial Journal uses an issue masthead, literary lead and a sustained single essay with margin notes. Spine Editions uses a physical vertical spine, theme shelves and selected book excerpts linked to a retained reading list. Object construction, navigation and content task differ. Newspaper Ledger uses simultaneous reports, strong dense rules and a numeric analytic ledger. Here quiet edition records, a cover reveal and individual reading replace multi-story reporting, analysis navigation and tabular evidence. Corresponding actual ready previews establish distinctions beyond a shared serif voice.
