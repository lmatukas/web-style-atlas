---
schema_version: 1
id: "institutional-clear"
name: "Institutional Clear"
summary: "Clear task labels, searchable services and readable information pages with predictable navigation."
family: "functional"
tags: ["task-led", "precise", "humanist"]
best_for: ["public-information", "services", "documentation"]
avoid_for: []
density: "balanced"
image_dependency: "low"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "Search-led directory in A; narrow contents rail beside a readable service document in B.", "typography": "Clear system sans-serif, sentence-case task headings and readable help text.", "navigation": "Stable institutional header, service links, breadcrumb and local document contents.", "content_rhythm": "Task rows, guide disclosures, preparation lists and numbered procedural sections.", "imagery": "No image requirement; original text mark and structural CSS only.", "color_and_material": "White, pale blue-gray and navy semantic surfaces with clear blue links.", "interaction": "Actual local service search, empty state and reset; native help disclosures.", "motion": "Predictable static information; short link transitions removed for reduced motion."}
status: "ready"
---

# Institutional Clear

## Intent

Institutional Clear helps people find a service and understand the next step. The fictional Northbridge Community Services site demonstrates a task-led directory and a plain information page. It suits public information, practical services and documentation where clarity matters more than a distinctive brand performance. Visitors should be able to scan the available tasks, narrow the list and read a procedure without interpreting decorative interface conventions. All services and rules in the reference are explicitly examples, not real municipal guidance.

## Signature

Retain four invariants: a stable institutional header; plain task-based labels; a strong readable text hierarchy; and predictable information groups with clear next steps. A is a searchable service directory. B is a single service guide with a table of contents, preparation list and numbered process. The navy-and-white palette supports orientation, but the direction should remain recognizable if a supplied institutional brand changes those colors. Information architecture and consistent affordances carry the visual identity.

## Typography

Use system Arial for both display and body roles. Headings are descriptive, sentence case and sized to show their place in the document. Body text remains comfortably readable, including help text and service descriptions. Avoid all-caps paragraphs, oversized promotional slogans or decorative serif contrasts. Labels sit close to their controls. The references include Lithuanian glyphs and use a simple scale that works on a small screen without relying on a downloaded font.

## Color and surfaces

White is the main reading surface, pale blue-gray separates directory or contents areas, and dark navy provides a stable institutional anchor. A deep blue accent marks links and control outlines. Muted text remains readable on both the main and supporting surface. All interface colors come from semantic tokens, with explicit on-accent roles for dark header content. Do not use subdued contrast to make the page look official. Focus and meaningful boundaries need to remain clearly visible.

## Layout A

Open with the fictional service identity, a short navigation bar and a small demonstration notice. A plain question heading leads directly to a labeled local search field. Four service rows describe distinct tasks and link to real destinations in the references. Below, three native guide disclosures explain the additional example services. A short help panel directs readers back to useful sections instead of inventing a contact channel. A clear colophon closes the page with its demonstration status.

## Layout B

Begin with a breadcrumb and a specific service title. A concise summary explains the example room-use task. A contents rail links to preparation, options, process and help sections in the wider reading column. A short definition list supplies sample information, and a numbered sequence explains a fictional request workflow without providing an inert application button. Native questions and a working return link complete the guide. This is a document with navigable sections, not another directory or marketing landing page.

## Imagery

No images or external assets are required. A small original letter mark and structural rules are ordinary text and CSS. The empty asset registry makes this dependency explicit. If a real service needs a map, photograph or document preview, it should answer a concrete user question and have meaningful alternatives and known rights. Decorative people photography should not displace the task directory or imply representation of real service users without an appropriate source and purpose.

## Navigation and interaction

Keep navigation visible and let it wrap on mobile. Search filters the four local service entries by their text, with a clear label, a polite result count and an explicit empty state. A reset control restores the full list. It does not query a server or submit personal information. The guide uses ordinary contents links and native disclosures. Focus is clearly outlined, and the active page is identified in text. Avoid dead application links, hover-only menus or unexplained icon controls.

## Motion

The interface is settled and predictable. Short link-color transitions are optional and removed for reduced-motion preferences. Search updates the local results without moving focus or animating the list. No section reveal, auto-rotating banner or parallax is needed. If a future service adds a multi-step form, preserve focus and explain progress through semantic headings and real state rather than a decorative animation. Essential information must be available immediately in a still page.

## Responsive behavior

At desktop widths the directory uses a broad search area and vertically stacked service rows. The guide gives a compact contents rail beside a readable main column. At tablet widths reduce outer padding without shrinking labels or line height. At 360 pixels navigation wraps, the search/reset controls stack when needed and the guide contents move above the article. Long service names wrap naturally. The page should never require horizontal scrolling to reach a task, read a procedure or operate a disclosure.

## Accessibility

Targets include one main landmark, a single page heading, descriptive links, visible focus and a skip link. The search has a real label and associated help text, while results and the empty state are announced politely. Native disclosures expose their open state. Actual evidence covers six responsive combinations, axe, overflow, resources, controls and keyboard interactions; additional search checks exercise matching, empty results and reset. Glyph loading and real token consumption are separately tested. These bounded checks do not establish complete WCAG certification.

## Adaptation

Begin by listing the real tasks people need to complete, then use their language for headings and links. Replace every fictional service rule with verified local information. Preserve the stable navigation, readable directory rows and contents-to-article relationship when moving into WordPress, React or an institutional design system. Add real application or contact destinations only when their behavior exists. Keep policy dates, eligibility and service ownership accurate rather than carrying example values into a production page.

## Avoid

1. Do not bury the task list under promotional imagery, rotating announcements or vague brand slogans. 2. Do not create official-looking rules, contact details or application actions without verified information and working destinations. 3. Do not replace descriptive labels with icon-only controls, tiny help text or hover-only navigation.

## Closest styles

Swiss Grid is the closest available structured direction. Institutional Clear uses a stable service header and search-led directory instead of a large typographic practice statement, task labels and document contents instead of numbered design sections, and explanatory procedures instead of editorial service rhetoric. Terminal Utility is another available comparison: plain sentence-case service language replaces command notation, a readable contents rail replaces a technical summary panel, and search-led task discovery replaces chronological logs. Humanist Service remains a planned future neighbor.
