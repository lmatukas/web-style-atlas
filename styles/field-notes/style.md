---
schema_version: 1
id: "field-notes"
name: "Field Notes"
summary: "Documentary labels, marginal annotations and attached source captions for a readable travel notebook."
family: "tactile"
tags: ["annotated", "reading-led", "warm"]
best_for: ["travel", "publishing", "personal"]
avoid_for: []
density: "balanced"
image_dependency: "medium"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "Narrative fragment beside marginal annotations in A; chronological diary and preparation rail in B.", "typography": "Serif narrative headings, clear sans-serif copy and short monospace documentary labels.", "navigation": "Visible fragment/route links and a three-stop diary index.", "content_rhythm": "Sketch, observation, marginal cross-reference and schematic route; or timed entries.", "imagery": "An original pencil-style sketch and an original clearly schematic three-stop SVG.", "color_and_material": "Warm paper, sand notes, dark brown and restrained rust annotation marks.", "interaction": "Native source disclosures, local stop links and real local preparation checkboxes.", "motion": "Static notebook; brief link transitions removed for reduced motion."}
status: "ready"
prompt_path: prompts/field-notes/prompt.en.md
---

# Field Notes

## Intent

Field Notes presents a journey as a record of observations rather than a destination advertisement. The fictional Cairnwise notebook combines a short travel fragment, marginal annotations and a route diary. It suits personal journals, travel writing and small documentary projects. Readers should understand what was noticed, when it was recorded and which parts are illustrative. The references use an original sketch beside explicitly fictional notes and a schematic route, without implying the drawing documents that invented journey.

## Signature

Keep four invariants: a paper-like reading ground; compact documentary labels; a visible relationship between main writing and marginal notes; and sketches or diagrams with attached source captions. A presents one annotated travel fragment. B rearranges the same visual vocabulary into a chronological route diary with a supporting preparation rail. Texture is restrained and never required to read the page. The notebook identity comes from documenting and cross-referencing information, not from covering every surface in distressed paper.

## Typography

Use Georgia for the journal title and narrative headings, Arial for body information, and the system monospace stack for short field labels. Timestamps and page numbers have consistent roles. Narrative copy should have an easy measure, while annotations are shorter and visually secondary without becoming illegible. Italics can mark an observation, not an entire story. Keep Lithuanian characters readable in both headings and supporting labels. Do not simulate handwriting for navigation, source credits or practical details.

## Color and surfaces

Warm cream carries the main reading surface, a pale sand panel marks notes, dark brown text carries the narrative and a muted rust accent connects cross-references. Thin rules suggest a notebook’s organization without enclosing every paragraph. Interface colors use semantic generated tokens, including focus and diagram-stage surfaces. The sketch keeps to ink, sand and rust on the paper ground. Annotations can feel lightly attached through offset position or a small rule; dense noise and torn-edge effects should not interfere with text.

## Layout A

Begin with a small notebook identity and local fragment/route links. A title and field metadata introduce one observation. The main column holds a framed pencil sketch, its truthful source caption and a short narrative fragment. A narrower margin contains weather-like fictional context, numbered observations and a native source disclosure. A later route sketch pairs three stops with a clear diagram caption, then a closing note links to the separate diary. The reading and margin relationship is the central composition.

## Layout B

A compact diary title leads to a route summary and three chronological entries. Each entry has a time label, a short observation and its own heading. The middle entry contains the sketch with a caption explaining its illustrative role. A preparation rail holds the route diagram and three real native checklist controls. A native source note and return link close the diary. This page supports following a sequence and checking local preparation items, instead of reading A’s single annotated fragment.

## Imagery

The sketch is original, drawn for this demonstration and recorded in the local registry and rights note. It is an illustrative image, not proof of the fictional route. A second original SVG draws a schematic three-stop loop, with labels and an explicit non-geographic caption. Both assets have registry records. For a real travel adaptation, use accurate captions, licensed photographs and verified location data; never attach guessed coordinates to a generic landscape.

## Navigation and interaction

Visible text links reach the fragment, route sketch and separate diary. B’s local stop index links to each chronological entry. Native source disclosures provide attribution without a custom modal. Preparation checkboxes are ordinary local controls with meaningful labels; they do not send data or claim a saved packing list. Keyboard focus remains visible on links, summaries and inputs. Keep decorative page numbers separate from actionable links and avoid hiding essential route context behind a hover-only annotation.

## Motion

The notebook is static and readable immediately. Brief link-color transitions are optional and removed for reduced-motion preferences. No page-turn animation, drifting paper or mandatory map animation is necessary. If a future route diagram animates progress, keep the full route and all observations available as a static equivalent. Avoid scroll-jacking that forces readers to follow a predetermined reading pace. Sketches, captions and notes must remain stable while a reader moves between the main column and margin.

## Responsive behavior

At 1440 pixels A places a narrow note rail beside the wider narrative column. B gives the chronological diary most of the width and keeps preparation information alongside it. At tablet widths reduce margins and rail width while preserving a comfortable reading measure. At 360 pixels move annotations below the relevant introduction, stack diary times above their entries and keep every sketch with its caption. The route diagram scales within its frame and never becomes a horizontally scrolling pseudo-map.

## Accessibility

The references target one page heading, clear main and complementary landmarks, useful image alternatives and visible keyboard focus. The route diagram’s alternative description identifies it as schematic. Native disclosures and checklist inputs expose their real state. Actual checks cover six responsive combinations, image loading, local links, axe, overflow and controls; separate keyboard work verifies checkbox changes. Glyph loading, reduced motion and real token consumption are also tested. These scoped results do not certify the accessibility of every future journal.

## Adaptation

Replace the fictional notes with truthful observations and label estimates or memories as such. Keep a source caption beside each image and use verified route information when describing a real journey. Preserve the narrative-to-margin relationship in A or the timestamp-to-entry sequence in B when implementing in WordPress, React or another platform. Choose a small number of useful annotations rather than inventing decorative metadata. A route sketch can remain schematic if its purpose and limitations are clear to readers.

## Avoid

1. Do not turn the notebook into a uniform product-card grid; documentation and cross-reference relationships should remain visible. 2. Do not imply a real route, location or travel record through an unrelated image and invented coordinates. 3. Do not bury notes in dense distressed textures, tiny handwriting or hover-only annotations.

## Closest styles

Organic Craft and Botanical Engraving are the nearest ready comparisons. Field Notes uses a narrative column with an annotation rail, an original illustrative sketch, a schematic route and timed stops. Organic Craft uses uneven product stages and making/collection links, alternating material and object observations rather than dated notebook entries. Botanical Engraving gives plant plates, accepted names and specimen records a classified index instead of a route diary. Editorial Journal is another comparison: its literary masthead and sustained essay differ from documentary labels and marginal observations. P13 compares the full A/B desktop/mobile compositions beyond their common warm paper and serif voice.
