---
schema_version: 1
id: "architectural-monograph"
name: "Architectural Monograph"
summary: "Large architectural photographs, interpretive plans and analytic notes form a project monograph and a contrasting indexed building atlas."
family: "photographic"
tags: ["image-led", "precise", "annotated"]
best_for: ["architecture", "portfolio", "publishing"]
avoid_for: []
density: "balanced"
image_dependency: "high"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "Large project photograph with analytic plan/caption pairs in A; a compact index and unequal project spreads in B.", "typography": "Measured sans-serif project titles, quiet body notes and monospaced figure/index labels.", "navigation": "Monograph/atlas page routes and a real numbered table of project anchors.", "content_rhythm": "Photograph, interpretation, plan and detail note versus index then two unequal documented building spreads.", "imagery": "Two rights-documented monochrome architectural photographs and one clearly labeled original interpretive plan diagram.", "color_and_material": "Near-white paper, dark ink, restrained warm action signal and monochrome architectural evidence.", "interaction": "Working project anchors, direct official histories, local rights record and native credit disclosures.", "motion": "Still documentary frames; no parallax, slideshow or camera animation."}
status: "ready"
prompt_path: prompts/architectural-monograph/prompt.en.md
---

# Architectural Monograph

## Intent

Architectural Monograph gives photographs, plans and notes distinct jobs within one calm reading system. The fictional Field / Measure publication studies two invented houses shown in AI-generated illustrations. A develops a focused monograph of Hallvarn House, a long timber house in a snowy meadow; B opens an indexed atlas that also includes Corveline House, a brick and render house on a wooded slope. This direction suits architectural portfolios, building research and carefully documented project publications. It requires meaningful photographs and accurate attribution rather than a generic hero image placed above conventional promotional cards.

## Signature

Preserve four relationships: a large uncrowded architectural photograph; a much smaller factual caption attached to its frame; a drawing or diagram with a precisely stated purpose; and concise analytic prose aligned to a separate reading column. Plans should explain spatial relationships instead of decorating the background. Project titles stay measured rather than becoming oversized graphic posters. An index gives the atlas a documentary browsing rhythm, while the monograph leaves enough space to inspect one building carefully.

## Typography

Use Arial for display and Arial for body copy, both with explicit system fallback stacks. The display voice must remain distinct from captions, navigation and sustained reading. Keep paragraphs near sixty characters per line, let long headings wrap, and preserve useful caption sizes. The reference includes ĄČĘĖĮŠŲŪŽ and lowercase glyphs so the actual installed font can be inspected. There are no remote font requests or bundled font binaries. A new licensed font requires a recorded asset before use.

## Color and surfaces

Semantic tokens define the page, supporting surface, readable foreground, secondary labels, action accent, boundary and focus outline. Reference CSS consumes generated tokens.css; artwork may retain its separately authored material palette. Preserve the contrast relationships when replacing colors rather than copying an arbitrary accent. Do not use muted type for essential instructions if it becomes difficult to read. A successful token ratio is only one part of checking the rendered interface and every actual text background.

## Layout A

A compact publication masthead introduces a project title and a small factual dossier. The broad winter exterior retains the building within its setting and carries a visible figure credit that names the image as an AI-generated illustration. An analytic reading changes to text before a plan relationship section. A labeled detail crop returns to the same photograph at closer scale, followed by source notes and a working disclosure. The sequence separates photographic observation, interpretation and verified building facts instead of presenting every statement as a measured record.

## Layout B

A broad atlas title leads into an accessible two-row project index. Each row links to its building spread. The first spread puts a narrow title and observation beside a large Hallvarn House image; the second gives the Corveline House image a different width and places its note on the opposite side. A short method statement closes the reading sequence before source records. The index, two-project rhythm and cross-project comparison are structurally different from A’s sustained single-building and plan analysis.

## Imagery

Two local monochrome WebP images show the invented Hallvarn House and Corveline House. Both are original AI-generated illustrations from the Web Style Atlas asset bank; they replaced public-domain photographs of real houses so the publication stays wholly invented. The local rights file records tool, date, full prompts and conversion changes. An original SVG interprets the enclosed volume, window band, recessed porch and base; it is explicitly not to scale or a survey. The detail crop is labeled as part of the same photograph rather than a newly photographed viewpoint.

## Navigation and interaction

Visible links connect monograph and atlas. The atlas uses an actual semantic table with scoped column and row headers, meaningful building links and existing fragment destinations. The monograph links directly to its atlas entry and to the local source record. Native source disclosures expose full credit links and a bundled plain-text rights record. No carousel arrows, pretend project filters or enquiry controls imply missing functionality. A reader can move through the material using ordinary keyboard navigation and document headings.

## Motion

Content is present immediately. Short state transitions are allowed when they explain an operable control; essential copy never waits for a reveal. The reduced-motion media query removes nonessential animation, transitions and smooth scrolling. If an adaptation introduces movement, keep a useful static composition, avoid autoplay distractions and give visitors control over any sustained activity. A decorative motion effect must not turn the page into a different design direction or hide its navigation.

## Responsive behavior

At 1440 pixels keep a generous photograph-to-caption ratio and separate narrow factual columns from broader visual fields. The atlas alternates unequal spread proportions. At 768 reduce gaps and title scale while retaining complete photographs. At 360 stack title, dossier, photograph, caption and analytic note in reading order. Index cells wrap instead of requiring horizontal scrolling. The SVG plan stays complete and its nearby prose repeats the key spatial relationships, so a small drawing label is never the only explanation.

## Accessibility

Use one main landmark, one descriptive h1, ordered headings, visible keyboard focus and a skip link. Links navigate and buttons change state; native disclosures expose real information. Provide informative alternatives for meaningful images, while purely ornamental geometry stays out of the reading order. Check actual loading, contrast, focus, control coverage and horizontal overflow at 360, 768 and 1440 pixels. The accompanying task evidence records what was executed; these bounded checks are not a full WCAG certification or a guarantee for adapted content.

## Adaptation

Begin with a real project record, a rights-cleared photograph and one drawing that answers a specific question. Replace demonstration publication details with verified authorship, locations and dates. If a plan is schematic, label it as such and omit invented survey dimensions. Another stack can retain ordinary figures, definition lists, tables and native disclosures. Keep the source and credit attached to each asset during export. A project without architectural photographs should choose another direction rather than substituting gray placeholder rectangles.

## Avoid

1. Do not imply that archival buildings or third-party photographs are the portfolio publisher’s own commissions. 2. Do not treat a schematic diagram as a measured survey or invent construction dimensions. 3. Do not replace the photograph/plan/note hierarchy with equal cards, full-screen slideshows or tiny illegible captions.

## Closest styles

Swiss Grid organizes services with numbered ruled rows and typographic fields; this direction organizes documented photographs, interpretive drawings and factual notes, with project-atlas navigation rather than a service index. Cinematic Photo uses dark breathing space and reflective scene chapters. Architectural Monograph uses light paper, analytic figure captions and explicit project records, preserving uncropped building context rather than immersive portrait scenes. Composition, navigation and content rhythm differ from both neighbors; monochrome imagery alone is not the distinction.

