---
schema_version: 1
id: "swiss-grid"
name: "Swiss Grid"
summary: "Numbered typographic grids, oversized alignment and precise service or portfolio indexes."
family: "typographic"
tags: ["grid", "precise", "asymmetric"]
best_for: ["services", "portfolio"]
avoid_for: []
density: "balanced"
image_dependency: "low"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "Twelve-column alignment, oversized flush-left type and numbered horizontal divisions.", "typography": "One sans-serif family with abrupt scale changes and tight display tracking.", "navigation": "A visible compact numbered index; no hidden mobile drawer.", "content_rhythm": "Long ruled service rows in A; staggered project fields and a colophon in B.", "imagery": "Original CSS typographic studies instead of dependent photography.", "color_and_material": "Warm paper, near-black text, one red signal and hairline dividers.", "interaction": "Underlined text links, offset focus rings and native details disclosures.", "motion": "Only brief link-color changes; reduced motion removes transitions."}
status: "ready"
prompt_path: prompts/swiss-grid/prompt.en.md
---

# Swiss Grid

## Intent

Swiss Grid makes a complex studio offer readable through alignment, numbering and carefully unequal scale. The fictional Form / Order studio helps cultural organisations organise information. Visitors should quickly understand what the studio does, inspect a sample engagement and find a real next step. The design suits services and portfolios whose content can be reduced to precise headings and concise explanations. It does not depend on photographs, rounded interface cards or a fashionable accent. The page feels ordered because unrelated elements share a visible alignment system.

## Signature

Preserve four relationships: a disciplined column grid; headings that occupy several columns while labels occupy one; numbered horizontal service divisions; and substantial unfilled space beside dense useful information. The first composition is a service index with a large opening proposition. The second is an asymmetric catalogue with a narrow persistent identity column. Neither should be converted into equal feature cards. The red signal can become another accessible brand color while these four structural relationships remain intact.

## Typography

Use the display and body font roles from tokens.json. Arial and its system fallbacks give the example a neutral, widely available sans-serif voice, including Lithuanian characters. Display text is tightly spaced and fluid, while body text keeps a comfortable line height and a measure below sixty-five characters. Numbers and short captions establish a secondary hierarchy without a second typeface. Large headings must wrap on words rather than spill beyond their column. Keep body text at least sixteen CSS pixels when adapting the references.

## Color and surfaces

The background is a slightly warm paper field; surface marks an inset technical note. Near-black carries the primary text, muted carries supporting labels, and accent marks the most important link and circular signal. Borders remain legible instead of disappearing into a pale gray. All actual palette roles come from the generated token file. The two contrast systems are dark text on paper and light text on the accent. Never use red body paragraphs as a substitute for hierarchy.

## Layout A

Begin with a compact identity and visible navigation. The large proposition shares its baseline grid with a small studio description. A red circular study balances the oversized text without pretending to be a product image. Four service rows pair a number, a service name and a specific deliverable. A process strip then describes three stages in reading order. A final native disclosure answers a practical engagement question, followed by a contact section and a short demonstration colophon. Every navigation target exists locally.

## Layout B

Replace the full-width service sequence with an identity rail and an asymmetric work catalogue. Project studies alternate wide and narrower geometric fields and carry explicit numbers, titles and captions. A compact project index lets visitors jump directly to the work. The large typographic specimens are original CSS compositions, not thumbnails standing in for missing photography. Finish with a methods note and a colophon. The page remains recognisably Swiss through alignment and scale, but navigation and content rhythm are materially different from A.

## Imagery

There are no external visual assets or font downloads. The circle and project studies are original CSS geometry. They demonstrate typographic relationships, and their textual captions explain their purpose. Keep decorative geometry out of the accessibility tree when its nearby caption already conveys the meaning. If photographs are added in another project, align crops with the same columns and retain concise captions. Do not let an image grid replace the numbered information structure.

## Navigation and interaction

All primary navigation remains visible on mobile and wraps naturally. Links navigate; the engagement question uses native details and summary so keyboard and expanded states work without custom scripting. Each link receives a clearly offset focus outline. Underlines and meaningful labels identify actions independently of color. The contact action reveals actual demonstration contact guidance instead of submitting data or opening a broken email address. No drawer, modal or decorative pseudo-control needs to be maintained.

## Motion

Only short nonessential color transitions use the named duration and easing tokens. The large circle is static. A reduced-motion media query disables transitions and smooth behavior, leaving every section and control usable. Essential information is never introduced by animation, and screenshot generation therefore captures the same complete content as ordinary reading. Avoid auto-scrolling, parallax or rotating type: those effects weaken the precise indexed character.

## Responsive behavior

At 1440 pixels use generous outer margins and an explicit twelve-column structure. At 768 pixels reduce gaps and allow the proposition to occupy more columns. At 360 pixels stack each service label beneath its number, keep navigation visible and place the descriptive copy after the large heading. The portfolio rail becomes a normal top section rather than a narrow side column. Geometric studies remain proportional, and display sizes use clamp with a safe minimum. No fixed-height text container may hide translated content.

## Accessibility

The references target clear landmarks, ordered headings, keyboard navigation, visible focus and adequate token contrast. The evidence records actual 360, 768 and 1440 pixel checks, all four preview inspections, native disclosure operation and a Lithuanian glyph sample. These checks do not constitute full WCAG certification or proof of every assistive-technology combination. Maintain descriptive project captions and preserve meaningful reading order if rebuilding the design in another framework.

## Adaptation

Replace the fictional service names and project studies with a real studio offer while preserving the numbered hierarchy and unequal column widths. A WordPress implementation can use ordinary sections and a native disclosure block; React does not require a shared card component. A longer service list should extend the ruled index rather than compress every row. Dense commerce catalogues may need a different direction. Brand color changes must update semantic tokens and rerun contrast and preview checks.

## Avoid

1. Do not turn the ruled service index into rounded feature cards; it removes the alignment-led identity. 2. Do not center every heading; the consistent left edge is a navigation aid. 3. Do not rely on a red palette alone; a recolored generic landing page is not this direction.

## Closest styles

Architectural Monograph is the nearest ready alignment-led neighbor. Swiss Grid uses large typographic fields, numbered service rows and a practice catalogue rather than building photographs, interpretive plans and analytic figure notes. Its compact practice/project index differs from a building atlas and source-record routes. Kinetic Type is another ready typographic comparison: its whole-word campaign bands, finite settling gesture and giant day/date panels differ from stable column alignment and restrained numbered divisions. These differences in composition, navigation and content rhythm were checked in the complete P13 catalogue review; a shared system sans-serif is not the distinction.
