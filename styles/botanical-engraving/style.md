---
schema_version: 1
id: "botanical-engraving"
name: "Botanical Engraving"
summary: "Fine botanical line illustration with plate numbers, accepted names and attached observations, from a garden story to a classified cabinet."
family: "illustrative"
tags: ["annotated", "archival", "reading-led"]
best_for: ["culture", "products", "publishing"]
avoid_for: []
density: "balanced"
image_dependency: "medium"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "A large botanical plate beside story and specimen label; B organizes complete illustrations with numbered classification records.", "typography": "Serif display and italic accepted names, plain readable documentary metadata.", "navigation": "Garden-story route and literal three-plate herbarium index.", "content_rhythm": "Plant, origin story and related specimens versus repeated image/name/observation records.", "imagery": "Three original hatched SVG plant line studies, explicitly stylized rather than scientific identification plates.", "color_and_material": "Quiet herbarium paper and green-black ink, with sparse rules and no noisy texture.", "interaction": "Actual specimen destinations and native source/plate disclosures.", "motion": "Still illustration, stable captions and reduced-motion-safe navigation."}
status: "ready"
prompt_path: prompts/botanical-engraving/prompt.en.md
---

# Botanical Engraving

## Intent

Botanical Engraving connects close-looking illustration with the discipline of a labeled cabinet. It suits a botanical publication, a source-led product story or a small collection whose material origin matters. The fictional Folium cabinet contains three original line studies: sage, lavender and rosemary. A visitor can follow the garden story or inspect complete classified records. The accepted names are checked separately from the fictional collection, and the stylized drawings do not claim scientific identification accuracy.

## Signature

Keep four relationships: a fine line illustration with enough empty space to inspect it; a plate number adjacent to its image; an italic accepted name distinct from the common name; and a short observation tied to a visible feature. Rules separate records instead of enclosing every item in a product card. The page has an ordered cabinet logic rather than a casually scattered collection. Small hatching belongs inside the drawing; body text needs a clean and comfortable surface.

## Typography

Use Georgia for display and Arial for body copy, both with explicit system fallback stacks. The display voice must remain distinct from captions, navigation and sustained reading. Keep paragraphs near sixty characters per line, let long headings wrap, and preserve useful caption sizes. The reference includes ĄČĘĖĮŠŲŪŽ and lowercase glyphs so the actual installed font can be inspected. There are no remote font requests or bundled font binaries. A new licensed font requires a recorded asset before use.

## Color and surfaces

Semantic tokens define the page, supporting surface, readable foreground, secondary labels, action accent, boundary and focus outline. Reference CSS consumes generated tokens.css; artwork may retain its separately authored material palette. Preserve the contrast relationships when replacing colors rather than copying an arbitrary accent. Do not use muted type for essential instructions if it becomes difficult to read. A successful token ratio is only one part of checking the rendered interface and every actual text background.

## Layout A

An understated cabinet identity leads into a broad three-part composition: the garden story title, a large sage plate and a narrow specimen label. The next section explains the fictional collection through two short origin paragraphs. Two smaller companion plates flank a cabinet introduction and a real herbarium link. Name sources and illustration rights finish the page in a native disclosure. The visual sequence moves from one leaf study toward a small coherent collection.

## Layout B

A classified-cabinet introduction pairs with a literal three-plate index. Each specimen occupies a complete horizontal record: illustration and plate caption beside common name, accepted name, study focus and an expandable record. The final classification note explains image, name and observation before linking back to the garden story. Repeated record structure supports careful comparison; it is different from A’s dominant plant, origin narrative and companion composition.

## Imagery

Three original SVG drawings use stems, pointed leaf outlines, midribs, fine vein hatching and clustered flower forms. Sage, lavender and rosemary receive different silhouettes instead of one repeated generic leaf. Original artwork rights are recorded locally under MIT. Kew POWO was consulted only for accepted names; no source images or passages were copied. Keep complete plant silhouettes, attach alt text and captions, and distinguish a stylized commercial illustration from a documented scientific specimen or identification key.

## Navigation and interaction

The visible header connects origin story, herbarium and records. B’s Roman-numbered index leads to actual plant records, each containing a native source disclosure. External name-source links are explicit and optional; no external request is needed for layout or illustrations. Focus stays visible on paper surfaces. There are no fictitious specimen purchases or unimplemented care selectors. Any real product adaptation must add verified product data and actual commerce behavior separately.

## Motion

Content is present immediately. Short state transitions are allowed when they explain an operable control; essential copy never waits for a reveal. The reduced-motion media query removes nonessential animation, transitions and smooth scrolling. If an adaptation introduces movement, keep a useful static composition, avoid autoplay distractions and give visitors control over any sustained activity. A decorative motion effect must not turn the page into a different design direction or hide its navigation.

## Responsive behavior

At 1440 give the main plant a generous field between narrative and narrow label. B uses complete plate/record pairs. At 768 reduce gaps while keeping illustration and its name close; labels may follow the main pair. Below 700 stack title, full plant and specimen record. Companion plates become separate figures, each retaining its caption. At 360 the plate index wraps, scientific names wrap at normal spaces and drawings scale without clipping stems or forcing a horizontal cabinet view.

## Accessibility

Use one main landmark, one descriptive h1, ordered headings, visible keyboard focus and a skip link. Links navigate and buttons change state; native disclosures expose real information. Provide informative alternatives for meaningful images, while purely ornamental geometry stays out of the reading order. Check actual loading, contrast, focus, control coverage and horizontal overflow at 360, 768 and 1440 pixels. The accompanying task evidence records what was executed; these bounded checks are not a full WCAG certification or a guarantee for adapted content.

## Adaptation

Replace the garden story with verified origins and select a small coherent group of specimens or products. Keep accepted nomenclature separate from marketing names and document the source/date of factual taxonomy. Preserve plate numbering, full silhouettes and image/name/observation relationships in another stack. Use properly licensed drawings or original commissioned illustration. If no credible visual material exists, choose a text-led direction instead of filling the cabinet with generic leaves and invented scientific labels.

## Avoid

1. Do not use random decorative leaves without an attached name, plate or observation. 2. Do not present stylized artwork as a scientific identification plate or invent source and provenance records. 3. Do not cover the reading surface in distressed texture or reduce captions to unreadable museum-like fine print.

## Closest styles

Organic Craft and Field Notes are both ready comparisons. Organic Craft uses irregular shaded object stages and making/collection navigation; this direction uses line-drawn plates, accepted names and a classified specimen index. Field Notes uses a narrative annotation margin and chronological travel diary; this cabinet uses taxonomic labels and repeated image/record pairs without a journey sequence. Composition, imagery, navigation and content rhythm differ from both neighbors despite shared warm paper and serif headings.

