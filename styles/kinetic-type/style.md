---
schema_version: 1
id: "kinetic-type"
name: "Kinetic Type"
summary: "Oversized words become the campaign composition, with brief finite type motion and a contrasting date-led two-day programme."
family: "typographic"
tags: ["typographic-motion", "poster", "high-contrast"]
best_for: ["campaign", "events", "culture"]
avoid_for: []
density: "balanced"
image_dependency: "low"
motion_level: "expressive"
complexity: "low"
signature: {"composition": "Three stacked oversized word fields establish the campaign; B uses giant date numerals and ruled session rows.", "typography": "Heavy tight sans-serif display carries composition, with plain readable copy and monospaced time labels.", "navigation": "Literal idea/weekend/notes links and two real day buttons with current state.", "content_rhythm": "Word poster, manifesto and verbs versus date-led day programme and closing type statement.", "imagery": "Letterforms, scale, rules and negative space replace decorative pictures.", "color_and_material": "Deep green-black field, pale type and a single acid accent word/action role.", "interaction": "Actual Saturday/Sunday panels, pressed states and live day count; native practical disclosures.", "motion": "One short finite typographic settling gesture; full static layout under reduced motion."}
status: "ready"
prompt_path: prompts/kinetic-type/prompt.en.md
---

# Kinetic Type

## Intent

Kinetic Type makes words the main visual material. It suits a short campaign, a cultural gathering or a programme whose message can be carried by very few strong phrases. The fictional Open Form weekend gives its oversized language a clear purpose: invite a visitor to think, make and share, then inspect a real two-day programme. Large type needs a disciplined reading sequence, useful supporting copy and truthful actions. Its identity should remain clear in the canonical still previews.

## Signature

Preserve four traits: oversized word fields with deliberate line breaks; a sharp change between display and practical scale; a finite settling gesture that never hides text; and dates or verbs treated as major structural elements. The acid accent belongs to one word or action, not every paragraph. Letterforms create the composition instead of illustrating a conventional hero. The programme must preserve the same energetic hierarchy while giving times and descriptions enough space to be understood.

## Typography

Use Arial for display and Arial for body copy, both with explicit system fallback stacks. The display voice must remain distinct from captions, navigation and sustained reading. Keep paragraphs near sixty characters per line, let long headings wrap, and preserve useful caption sizes. The reference includes ĄČĘĖĮŠŲŪŽ and lowercase glyphs so the actual installed font can be inspected. There are no remote font requests or bundled font binaries. A new licensed font requires a recorded asset before use.

## Color and surfaces

Semantic tokens define the page, supporting surface, readable foreground, secondary labels, action accent, boundary and focus outline. Reference CSS consumes generated tokens.css; artwork may retain its separately authored material palette. Preserve the contrast relationships when replacing colors rather than copying an arbitrary accent. Do not use muted type for essential instructions if it becomes difficult to read. A successful token ratio is only one part of checking the rendered interface and every actual text background.

## Layout A

A compact event identity and visible links precede three large word fields: Make, Room and For Ideas. A small lower band gives context and a real route to the calendar. A manifesto changes from word-image to readable argument, then three large verbs structure practical observations. A final notes block explains the fictional weekend and opens a native disclosure. This campaign is carried by type and information rhythm rather than an absent photograph or a decorative icon.

## Layout B

The programme begins with a large two-line proposition. Two actual day controls select Saturday or Sunday; the selected date appears as a giant numeral beside the day name. Three ruled rows keep each session’s time, title, description and type together. A closing typographic statement changes pace before practical notes. The calendar’s date/time hierarchy and interactive day panels differ structurally from A’s word poster, manifesto and verb sequence.

## Imagery

No external photographs, font files or image downloads are required. Letterforms, line breaks, rules and empty space create the visual fields. All readable words remain semantic HTML rather than text baked into an image. Keep decorative effects out of the accessibility tree and avoid duplicating a headline solely to make an outline shadow. If another project adds imagery, it must remain subordinate to the type-led composition and have a specific purpose and documented rights.

## Navigation and interaction

Header links connect the idea, programme and practical notes. Day controls are actual buttons with aria-pressed; a polite live region reports the selected date and three visible sessions. Only the current day panel participates in reading and focus order. Clicking or keyboard activation keeps focus on the chosen button. Native details hold scope information. There are no simulated ticket or registration actions. The available content is six complete authored sessions, not an empty schedule frame.

## Motion

A brief finite word-settling animation moves the campaign type by a small amount while retaining full opacity. It ends in under two seconds and does not repeat, scroll the page or require a pause to read the phrase. Practical copy and controls remain still. Reduced-motion removes animation, transitions and smooth navigation, leaving the complete composition in place. The browser evidence separately checks the ordinary finite behavior and the reduced static state; motion is not a prerequisite for access.

## Responsive behavior

At 1440 let the poster words span broad horizontal fields, while smaller copy aligns to a clear baseline below. Programme rows divide time, content and session type. At 768 reduce letter scale and gaps before sacrificing line breaks. Below 700 the manifesto and verb sections stack, date controls wrap and session metadata follows the title. At 360 preserve whole words, visible action labels and a complete date numeral without horizontal overflow or a clipped animated edge.

## Accessibility

Use one main landmark, one descriptive h1, ordered headings, visible keyboard focus and a skip link. Links navigate and buttons change state; native disclosures expose real information. Provide informative alternatives for meaningful images, while purely ornamental geometry stays out of the reading order. Check actual loading, contrast, focus, control coverage and horizontal overflow at 360, 768 and 1440 pixels. The accompanying task evidence records what was executed; these bounded checks are not a full WCAG certification or a guarantee for adapted content.

## Adaptation

Choose one short real message and establish its line breaks before adding supporting sections. Use actual event dates and sessions, preserving a separate truthful programme rather than turning all words into another decorative poster. Another stack can use ordinary headings, rows, buttons and hidden panels; no canvas or animation library is needed. Retain the finite motion limit and reduced equivalent. A longer institutional explanation needs another direction instead of compressing paragraphs into giant type.

## Avoid

1. Do not use continuous marquees, blinking phrases or mandatory scroll-driven reading. 2. Do not animate essential words out of view or make the message depend on a moving sequence. 3. Do not replace the date/session hierarchy with identical cards or fake booking controls.

## Closest styles

Swiss Grid is the nearest ready typographic neighbor. Its aligned service rows, compact numbered practice index and deliberate empty columns differ from broad word fields, emphatic verbs and date-led day panels here. Swiss uses type to organize a stable information grid; this direction lets a short phrase occupy whole compositional bands and settle through finite motion. Its calendar navigation and time-to-session rhythm also differ from the studio’s service and project catalogue. Composition, navigation, motion and content rhythm establish the distinction beyond a shared sans-serif voice.

