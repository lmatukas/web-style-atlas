---
{
  "schema_version": 1,
  "id": "industrial-spec",
  "name": "Industrial Spec",
  "summary": "Numbered engineering-sheet compositions with dimensioned elevations, explicit units and revision records, plus an orthographic comparison layout.",
  "family": "technical",
  "tags": [
    "precise",
    "annotated",
    "product-led"
  ],
  "best_for": [
    "products",
    "documentation"
  ],
  "avoid_for": [],
  "density": "dense",
  "image_dependency": "low",
  "motion_level": "subtle",
  "complexity": "low",
  "signature": {
    "composition": "A dimensional drawing beside a large product identifier and document tag; B aligned orthographic views over a comparison ledger.",
    "typography": "Plain industrial sans-serif display and monospaced document identifiers, units and revision labels.",
    "navigation": "Numbered document sections and an explicit assembly-comparison destination.",
    "content_rhythm": "Drawing, dimensional record, assembly rows and document boundaries; B views, comparison table and selection context.",
    "imagery": "Original inline vector elevations with consistent labeled envelope proportions.",
    "color_and_material": "Cool sheet surfaces, dark drawing ink and bounded yellow document strip.",
    "interaction": "Real sheet/section links and native concept-boundary disclosures, without fake download or specification selectors.",
    "motion": "Stable dimension lines and text; no rotating product or decorative scanning effect."
  },
  "status": "ready"
}
---

# Industrial Spec

## Intent

Industrial Spec turns a technical object into an inspectable document. It suits component records, technical product catalogues and engineering-documentation landing pages where dimensions and revision boundaries matter. The fictional M–04 enclosure provides a consistent subject without claiming that it can be manufactured or installed. Readers can inspect a single object, compare two envelope records and understand the limits of the supplied data. The drawing and units do more work than promotional language.

## Signature

Preserve four relationships: a bold component identifier adjacent to a dimensioned view; small revision and status labels; aligned unit-bearing specification rows; and a separate comparison sheet. The drawing uses real orthographic proportions for its stated envelope, while the page states that screen scale is not a production scale. A bounded signal-color strip identifies the document rather than highlighting every cell. Keep the distinction between a number being supplied and a product being proven suitable.

## Typography

Use Arial for display and Arial for body copy, both with explicit system fallback stacks. The display voice must remain distinct from captions, navigation and sustained reading. Keep paragraphs near sixty characters per line, let long headings wrap, and preserve useful caption sizes. The reference includes ĄČĘĖĮŠŲŪŽ and lowercase glyphs so the actual installed font can be inspected. There are no remote font requests or bundled font binaries. A new licensed font requires a recorded asset before use.

## Color and surfaces

Semantic tokens define the page, supporting surface, readable foreground, secondary labels, action accent, boundary and focus outline. Reference CSS consumes generated tokens.css; artwork may retain its separately authored material palette. Preserve the contrast relationships when replacing colors rather than copying an arbitrary accent. Do not use muted type for essential instructions if it becomes difficult to read. A successful token ratio is only one part of checking the rendered interface and every actual text background.

## Layout A

A compact document header leads into a three-part product plate: the identifier and descriptor, front elevation, and narrow status strip. The dimensional record follows as a heading beside a definition list. Three numbered construction observations identify housing, inlet and record without pretending to provide fabrication steps. Document notes and a native boundary disclosure close the sheet. This order lets a reader see the object before inspecting every dimension or reading its limitations.

## Layout B

Open with the comparison question rather than repeating the product title. A small drawing-set index sits beside matched front and side elevations; the front and side share their height and represent different envelope dimensions. A broad comparison ledger then lists M–04 and M–06 values in the same units. Selection context and concept limitations close the page. It is a views-to-comparison reading task, not the same product plate with a second color.

## Imagery

Both technical illustrations are original inline SVG, so no external image assets or fonts are required. The front rectangle maps 300 by 180 millimetres to a 480 by 288 drawing field; its 120-millimetre opening maps to diameter 192. The side envelope maps 120 by 180 to 192 by 288. Captions and accessible labels identify these as fictional elevations. Dimension geometry supports the labels but is not a tolerance, certification or build instruction.

## Navigation and interaction

Visible header links reach the component record, comparison and document notes. Numbered section links locate dimensional evidence without a nested application menu. Native details controls open the concept boundary. Every apparent action has a real destination; there is no empty CAD download, unimplemented product selector or quotation form. Keyboard focus is distinct against both sheet and signal surfaces, and specification values remain text that can be selected and read aloud.

## Motion

Content is present immediately. Short state transitions are allowed when they explain an operable control; essential copy never waits for a reveal. The reduced-motion media query removes nonessential animation, transitions and smooth scrolling. If an adaptation introduces movement, keep a useful static composition, avoid autoplay distractions and give visitors control over any sustained activity. A decorative motion effect must not turn the page into a different design direction or hide its navigation.

## Responsive behavior

At 1440 keep the drawing dominant, the identifier beside it and the status tag narrow. The comparison uses two matched elevation fields. At 768 reduce the product label and let the status band sit below the primary pair if needed. Below 700 stack identifier, drawing and status in reading order; orthographic views become separate complete figures. At 360 table headings stay concise, long status values wrap, and dimensions remain part of an uncropped view rather than spilling sideways.

## Accessibility

Use one main landmark, one descriptive h1, ordered headings, visible keyboard focus and a skip link. Links navigate and buttons change state; native disclosures expose real information. Provide informative alternatives for meaningful images, while purely ornamental geometry stays out of the reading order. Check actual loading, contrast, focus, control coverage and horizontal overflow at 360, 768 and 1440 pixels. The accompanying task evidence records what was executed; these bounded checks are not a full WCAG certification or a guarantee for adapted content.

## Adaptation

Replace concept values with a verified product record, keeping explicit units, revision status and responsible source. Add tolerances or certification only when evidence supports them. Preserve the dimension-to-object relationship and the distinction between product record and comparison in another platform. If the input has no reliable drawings, create an honest illustration and label its limits. Do not imitate an engineering sheet merely to make speculative performance values look authoritative.

## Avoid

1. Do not use random technical numbers or inconsistent dimension geometry as decoration. 2. Do not replace orthographic evidence with glowing code panels or a rotating object that hides the record. 3. Do not imply certification, build readiness or live product availability for the fictional concepts.

## Closest styles

Terminal Utility is the nearest ready technical neighbor. Its command disclosures and chronological log become object elevations, dimensional records and aligned comparison sheets here. Its console notation and dark monospaced atmosphere differ from industrial sans-serif labels on light drafting surfaces. Its navigation locates commands and event types; this direction locates document sections, views and component records. Composition, information rhythm, imagery and navigation all change structurally while both retain technical clarity.

