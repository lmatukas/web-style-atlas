---
{
  "schema_version": 1,
  "id": "gallery-white-cube",
  "name": "Gallery White Cube",
  "summary": "Artwork-first exhibition walls and concentrated single-work views, with captions behaving like quiet museum labels.",
  "family": "restrained",
  "tags": [
    "minimal",
    "image-led",
    "calm"
  ],
  "best_for": [
    "culture",
    "portfolio"
  ],
  "avoid_for": [],
  "density": "sparse",
  "image_dependency": "high",
  "motion_level": "subtle",
  "complexity": "low",
  "signature": {
    "composition": "Three artworks hang at different scales on a broad white wall; B isolates one tall painting beside an index.",
    "typography": "Plain sans-serif names and readable small identification labels; no promotional display typography.",
    "navigation": "Visible exhibition and work links; B adds a numbered collection index.",
    "content_rhythm": "Look at work, read the label, pause, then encounter a short curatorial note.",
    "imagery": "Three original vector paintings with distinct aspect ratios and material palettes.",
    "color_and_material": "Neutral white architecture supports bounded colored artwork, without tinted product stages.",
    "interaction": "Actual work links and native reproduction-note disclosures; no fictitious purchase controls.",
    "motion": "Still artwork with reduced-motion-safe navigation; no reveals or automatic slides."
  },
  "status": "ready"
}
---

# Gallery White Cube

## Intent

Gallery White Cube gives artworks the first and largest claim on attention. It suits a small exhibition, a collection of original studies or an artist portfolio with coherent individual pieces. The page acts like a room: white space separates works rather than behaving as unused advertising space. Its visitor can scan the exhibition, identify a work and open a concentrated record. Content is explicitly fictional here; the three vector paintings demonstrate composition without borrowing a real artist’s identity.

## Signature

Preserve four relationships: artwork dominates the page; each work keeps its own aspect ratio; identification sits outside the painted area; and the exhibition wall gives way to a focused single-work record. Keep the wall asymmetric without treating placement as random. The painting is allowed to have its own palette, but labels and architecture stay neutral. A numbered work index belongs to object navigation, not a decorative counter or a product carousel.

## Typography

Use Arial for display and Arial for body copy, both with explicit system fallback stacks. The display voice must remain distinct from captions, navigation and sustained reading. Keep paragraphs near sixty characters per line, let long headings wrap, and preserve useful caption sizes. The reference includes ĄČĘĖĮŠŲŪŽ and lowercase glyphs so the actual installed font can be inspected. There are no remote font requests or bundled font binaries. A new licensed font requires a recorded asset before use.

## Color and surfaces

Semantic tokens define the page, supporting surface, readable foreground, secondary labels, action accent, boundary and focus outline. Reference CSS consumes generated tokens.css; artwork may retain its separately authored material palette. Preserve the contrast relationships when replacing colors rather than copying an arbitrary accent. Do not use muted type for essential instructions if it becomes difficult to read. A successful token ratio is only one part of checking the rendered interface and every actual text background.

## Layout A

A compact institutional header opens into a modest exhibition title. Below, three paintings occupy unequal wall positions: a tall interrupted red study, a low blue folded form and a warm curved ribbon. Attached labels identify each work after it has been seen. A narrow curatorial statement follows the exhibition wall, then practical demonstration and rights notes close the page. The wall is a spatial arrangement of different original works, not identical cards with interchangeable images.

## Layout B

The selected painting occupies a tall left field. A narrow right dossier carries title, medium, format, date and a numbered exhibition index. Beneath this concentrated first view, a looking note explains one relationship inside the painting; a smaller companion work changes the pace before collection-record details close the page. This composition starts with a particular work and its record, unlike the exhibition overview. The index and companion link give truthful paths back into the collection.

## Imagery

Interval in red, A folded distance and A current, held are original SVG digital paintings, registered with MIT rights and a local rights record. Their broad color fields, sharp folds and curved bands are finished abstract compositions, not gray placeholders. Alt text describes the visible form. Keep artwork uncropped, avoid decorative shadows and never add a simulated frame unless the actual object includes one. A real adaptation needs explicit reproduction rights for every represented artwork.

## Navigation and interaction

The compact visible navigation links the exhibition, selected work and viewing notes. Painting links lead to the separate record; the record index includes the overview and a companion anchor. Native disclosures expose meaningful rights or record information without a custom modal. Hover is understated and keyboard focus stays visible on the white ground. There is no invented booking, purchase or zoom action. A real collection can add pagination only when it has actual destinations.

## Motion

Content is present immediately. Short state transitions are allowed when they explain an operable control; essential copy never waits for a reveal. The reduced-motion media query removes nonessential animation, transitions and smooth scrolling. If an adaptation introduces movement, keep a useful static composition, avoid autoplay distractions and give visitors control over any sustained activity. A decorative motion effect must not turn the page into a different design direction or hide its navigation.

## Responsive behavior

At 1440 pixels preserve the offset wall hanging and the broad painting-to-narrow-label relationship. At 768 reduce gaps while maintaining two wall positions; the single-work dossier may still sit beside the image. Below 700 stack the paintings and put every label immediately after its image. Stack the selected painting before its record, and let the header wrap. At 360 each work remains complete within its own ratio; no cropped edges, sideways wall pan or tiny forced columns.

## Accessibility

Use one main landmark, one descriptive h1, ordered headings, visible keyboard focus and a skip link. Links navigate and buttons change state; native disclosures expose real information. Provide informative alternatives for meaningful images, while purely ornamental geometry stays out of the reading order. Check actual loading, contrast, focus, control coverage and horizontal overflow at 360, 768 and 1440 pixels. The accompanying task evidence records what was executed; these bounded checks are not a full WCAG certification or a guarantee for adapted content.

## Adaptation

Start from three to six real works, their verified titles and reproduction records. Set the hierarchy from their visual weight instead of making every piece the same box. In another platform, use semantic figures and captions plus real collection links. Preserve the separate overview and single-record reading tasks even if the site uses templates. If no credible artworks are available, choose a lower-image-dependency direction rather than filling the exhibition with stock illustrations unrelated to its subject.

## Avoid

1. Do not replace the wall with identical rounded shop cards or price badges. 2. Do not overlay headings and actions on artwork where they interrupt the work. 3. Do not make labels microscopic or hide them until hover to imitate a gallery aesthetic.

## Closest styles

Quiet Luxury is the nearest ready neighbor. Its warm product stages and isolated furniture silhouettes differ from white exhibition architecture with several works in their own aspect ratios. Its sparse collection-to-object flow becomes a wall-to-numbered-record flow here. Its serif object headings and product specifications differ from plain identification labels, medium/date records and curatorial pauses. These are composition, navigation, content-rhythm and typography differences, not simply a brighter background. Planned Architectural Monograph remains a future comparison, not a ready neighbor.

