---
schema_version: 1
id: "institutional-clear"
name: "Institutional Clear"
summary: "A wayfinding directory for public services: an original floor plan, lettered signs and plain routes from arrival to the next step."
family: "functional"
tags: ["task-led", "precise", "humanist"]
best_for: ["public-information", "services", "documentation"]
avoid_for: []
density: "balanced"
image_dependency: "low"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "A: arrival text beside an original floor plan, then four lettered signage columns. B: one area zoomed in, with a route rail beside a reading column.", "typography": "Plain system sans-serif, sentence-case task headings and large bold letter tiles used like building signs.", "navigation": "White header on a heavy rule, plan letters matched to the directory, breadcrumb and a numbered route rail.", "content_rhythm": "Heavy sign rails start each group: plan, lettered columns, lettered disclosures and dotted three-stop routes.", "imagery": "Original inline SVG floor plans drawn from tokens; no photographs or external assets.", "color_and_material": "White reading surface, navy text rails, deep blue sign tiles and one yellow you-are-here mark.", "interaction": "Actual local service search with result count, empty state and reset; native disclosures and anchor routes.", "motion": "Static, settled information; short link transitions removed for reduced motion."}
status: "ready"
prompt_path: prompts/institutional-clear/prompt.en.md
---

# Institutional Clear

## Intent

Institutional Clear treats a public service website like the entrance of a public building. People arrive with one task and want to know where to go. The fictional Quillmere Community Centre shows the idea. A ground floor plan marks where you stand, letters on the plan match the services, and each guide reads like a short route. The direction suits public information, practical services and documentation where clarity matters more than brand performance. Every room, rule and route in the reference is an example, not real municipal guidance.

## Signature

Keep five invariants. A white header sits on a heavy rule instead of a coloured band. One orientation object, a plan or a route, explains how the information is arranged. Letter tiles connect that object to the content, so the same sign appears on the plan, in the directory and in the notes. Heavy text rails open each group, like the top edge of a sign. Steps are drawn as dotted routes with numbered stops. A is a whole-building directory. B zooms into one area and becomes a guide.

## Typography

Use system Arial for display and body roles. Headings are descriptive and in sentence case. The strongest typographic accent is the letter tile: a bold capital on a deep blue square, sized like a door sign. It carries meaning, so it never becomes decoration. Help text stays readable and labels sit close to their controls. Avoid all-caps paragraphs, promotional slogans and decorative serif contrast. The references include Lithuanian glyphs and do not depend on a downloaded font.

## Color and surfaces

White is the main reading surface. Navy text forms the heavy rails and plan walls. Deep blue marks sign tiles, links and route dots. Pale blue-gray fills corridors and notes. One yellow signal colour is reserved for the you-are-here mark and the access note edge, and it always sits next to dark text. All colours come from semantic tokens, including the SVG fills. Do not lower contrast to look official, and do not spread the yellow into general decoration.

## Layout A

A opens with the arrival statement on the left and the floor plan on the right. A framed note repeats the you-are-here position in text. Below a heavy rail, the directory heading shares a row with a compact search toolbar. Four lettered columns follow, each with a location line, a task link and one sentence. Search filters these columns. Lettered native disclosures then explain what to bring to areas B, C and D. A three-stop route track shows how a room request moves and links to the area guide. A short colophon closes the page.

## Layout B

B begins with a breadcrumb back to the directory and a large area sign. The title, a short summary and a status label sit beside a zoomed plan of Area A with rooms A1 and A2. Under a heavy rail, a numbered route rail on the left links to four sections in the reading column. Preparation is a checklist, room options use the same A1 and A2 codes as the plan, and the review process is a horizontal route. Native questions and a return link finish the guide. There is no booking button, because no booking exists.

## Imagery

Imagery is original inline SVG. The plans are drawn with rectangles, paths and short labels, and every fill uses a token. Each plan has a title and a description, and the same information appears as text nearby. Furniture is drawn lightly so the letters and the route stay dominant. If a real service adds a map, it should answer a real question, match the building and have verified rights. Do not add decorative people photography to make the page feel friendly.

## Navigation and interaction

Navigation stays visible and wraps on small screens. Search filters the four local service entries by text, announces the result count politely, shows an explicit empty state and resets with a real button. It does not call a server or collect personal data. Plan letters, directory entries and disclosures share the same codes. Route rails and breadcrumbs use ordinary links, and focus is clearly outlined. Avoid icon-only controls, hover menus and links to applications that do not exist.

## Motion

The page is still. Short link-colour transitions are optional and are removed when reduced motion is requested. Search updates the list without moving focus or animating rows. The dotted routes are static drawings, not animated paths. Nothing reveals on scroll and nothing rotates. If a future service adds a multi-step form, explain progress with headings and real state, not with movement. Every piece of information is available in the first still frame.

## Responsive behavior

On desktop the plan sits beside the arrival text and the directory uses four columns. Under 900 pixels the plan moves below the text at full width, the directory becomes two columns, the guide head stacks and the route track turns vertical. Under 560 pixels the directory becomes one column and the search controls stack. The plan keeps its letters readable, and the directory works as its legend. No layout needs horizontal scrolling.

## Accessibility

Each page has one main landmark, one page heading, a skip link and visible focus. The search has a real label and help text, and results and the empty state are announced. Plans use role img with a title and a description, while decorative letters are hidden from assistive technology because the text beside them carries the same location. Disclosures are native. Browser checks cover axe, overflow, controls and keyboard disclosures at three widths. These bounded checks are not full WCAG certification.

## Adaptation

Start from a real building or a real service map. List the tasks people come for, give each a short code and use the same code on the plan, in the directory and in the guide. Keep the heavy rails, letter tiles and dotted routes when moving into WordPress, React or an institutional design system. Replace every example rule with verified local information. If there is no physical building, the orientation object can be a route or a process diagram, but it must still match the content letter for letter.

## Avoid

1. Do not return to a coloured top band with a centred search box and a list of links. 2. Do not draw a plan that does not match the content, or use letters, routes and signs as decoration. 3. Do not invent official rules, contact details or application buttons without verified information and working destinations.

## Closest styles

Humanist Service is the nearest ready functional neighbour. It starts with a warm serif conversation, an illustration of two people and fictional profiles. Institutional Clear starts with a building plan, lettered signs and a sans-serif directory, so its composition, imagery and navigation all differ. Swiss Grid uses huge type, a red dot and a numbered service index with wide columns. Institutional Clear keeps type moderate and lets the plan and the letter tiles carry the identity. Terminal Utility shares the plain language but uses command notation and logs instead of signs and routes.
