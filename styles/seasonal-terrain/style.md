---
schema_version: 1
id: "seasonal-terrain"
name: "Seasonal Terrain"
summary: "An irregular three-layer soil study connects the year’s seasons to a useful vegetable basket and delivery brief."
family: "tactile"
tags: ["warm", "handmade", "dimensional", "task-led"]
best_for: ["commerce", "craft", "products"]
avoid_for: ["data"]
density: "balanced"
image_dependency: "low"
motion_level: "expressive"
complexity: "high"
signature: {"composition": "A centered large harvest invitation opens into a broad irregular soil cross-section; B begins with a complete four-season year calendar and a stepped basket builder.", "typography": "Large comfortable serif statements contrast with practical sans-serif season, ingredient and delivery labels.", "navigation": "Visible soil, seasons and basket anchors; twelve real month buttons lead into the selected seasonal basket.", "content_rhythm": "Terrain, four-season strip and farming principles lead to a basket; the alternate starts with the annual calendar and concrete configuration steps.", "imagery": "Original irregular three-stratum WebGL landform with procedural leaves; fixed camera and an informative authored SVG cross-section.", "color_and_material": "Cream paper, burnt clay and dark olive frame uneven earth strata; texture comes from geometry rather than a distressed bitmap.", "interaction": "Season changes plants and ingredient examples; size and delivery frequency determine a consistent local enquiry summary. Keyboard layer markers expose real notes.", "motion": "Finite lateral soil opening, 500ms seasonal leaf change, layer highlighting and ingredient reflow; reduced state is fixed, with an honest non-WebGL fallback."}
status: "ready"
prompt_path: "prompts/seasonal-terrain/prompt.en.md"
---

# Seasonal Terrain

## Intent

Seasonal Terrain connects a seasonal food proposition to the ground that makes it imaginable. The fictional Glebora presents vegetable baskets and regenerative farming as an explicitly illustrative project. The visitor explores an irregular soil cross-section, chooses a season and prepares a consistent basket enquiry. There is no claimed harvest, real farmer certification, price, stock level or completed order. The interface should feel earthy and useful without treating agricultural language as proof of actual practice.

## Signature

Preserve five relationships: an uneven three-stratum landform; a fixed camera that keeps the layers intelligible; leaves that change with the selected season; a visible connection between that season and ingredient examples; and an ordinary HTML basket summary. The terrain must look like an eroded piece of ground, not a sealed rectangular display case. The same seasonal logic organizes both references even though one starts with a broad landscape statement and the other with an annual calendar.

## Typography

Use large unhurried serif headings with clear practical sans-serif labels. Georgia and its serif fallback give the harvest statement warmth; Arial and its explicit fallbacks keep month buttons, quantities and delivery choices straightforward. Avoid tiny handwritten labels or a distressed imitation of a farm sign. Paragraphs have a moderate reading measure and enough line height for Lithuanian copy. Accented glyphs remain real text, and no font binaries or external requests are needed.

## Color and surfaces

Cream provides a quiet ground, burnt clay gives the soil a recognizable material family and dark olive carries secondary emphasis. A slightly darker clay action color keeps white button labels above the body-text contrast threshold. Material tokens separately describe the three earthy strata and green leaves. Every interface surface consumes generated tokens. Geometry supplies the tactile irregularity, so there is no need for a large noise texture that competes with readable instructions.

## Layout A

A opens with a centered harvest statement and a short truthful explanation. A broad ground study sits below it rather than beside a generic split-screen sales card. Three compact layer markers explain the cross-section. The seasonal strip then changes the illustrative ingredients, followed by three explicit farming principles. A substantial clay basket section contains real size and delivery choices, a changing produce arrangement and a local enquiry draft. A delivery note explains the demonstration boundary.

## Layout B

B begins with the complete year divided into four seasonal columns and twelve month choices. The visitor can scan or select a month before seeing the corresponding ingredients. The next region pairs a smaller terrain annotation with a numbered three-step basket configuration. This is a calendar-to-selection task, not A with its hero moved lower. A compact principles ledger and delivery explanation follow. The current chosen month is clear without implying that the site knows live harvest availability.

## Imagery

All terrain is original procedural geometry: an irregular elliptical outline, wavy soil boundaries, visible cross-section walls and independent strata. Leaves are authored three-dimensional folded forms placed on the upper ground, with seasonal changes in height and silhouette. The camera does not orbit. A matching original SVG conveys three layers and plants when WebGL is unavailable. No borrowed farm photograph, agricultural certification, product package or real producer portrait is introduced.

## Navigation and interaction

Navigation remains visible, and month or season buttons expose their actual pressed state. Layer markers respond to both pointer and keyboard focus, highlight one surface and reveal one useful sentence. Basket size changes the number and arrangement of ingredient examples; delivery frequency changes the exact summary. A draft button validates the local delivery-place field and generates selectable text. Clipboard failure selects that same text for manual copying. No purchase or payment destination is simulated.

## Motion

The first visible terrain episode separates its strata laterally by a modest amount and stops. Season changes morph the leaves over half a second while the camera stays fixed; product examples update in the same choice. Layer highlighting is a restrained temporary state. Ingredient reflow uses a short bounded entrance instead of a perpetual motion field. Pause/resume controls affect active geometry work, reduced motion presents the informative final state immediately, and pagehide releases GPU resources and observers.

## Responsive behavior

At desktop width A uses a broad centered composition with the complete terrain visible under the headline. B gives four seasonal columns equal calendar status before a different selection region. At tablet widths calendar columns wrap in pairs and controls retain comfortable targets. At 390 and 360 pixels the headline wraps naturally, the terrain stays completely inside its stage and the basket becomes a single readable sequence. Essential annotations stay outside the canvas and do not rely on hover.

## Accessibility

Keep one h1, a main landmark, ordered headings and a visible skip link. Use labelled native select fields for size and delivery, and real buttons for month and layer choices. Focus must remain distinguishable against cream and clay surfaces. The canvas description and labelled SVG fallback explain the same object in ordinary document flow. Live messages describe local draft validation and copying honestly. Actual task evidence records browser, contrast, focus, API and overflow checks without claiming accessibility certification.

## Adaptation

A local food or seasonal craft project can replace the fictional ingredients with verified information while preserving terrain-to-calendar-to-summary relationships. A real business must supply its own delivery area, stock rules, prices and checkout separately. Keep the month-to-season mapping explicit instead of inferring a visitor location or current growing conditions. The fixed-camera landform can be implemented in another stack with the same HTML controls and reduced-motion final state. The full creation prompt provides concrete project adaptation fields.

## Avoid

Exactly three changes break this direction: replacing the eroded three-layer terrain with a rectangular product box; decorating the page with unverified ecological seals or farmer endorsements; and letting the basket summary disagree with the selected season, size or frequency. These are recognizable material, honesty and functional failures. Do not reduce the direction to a cream background and a few green leaf icons while removing its annual structure and direct configuration task.

## Closest styles

Organic Craft is a ready neighbor with uneven ceramic objects, asymmetric stages and making or collection navigation. Seasonal Terrain uses a broad soil section, an explicit year calendar and a basket configuration flow, while its material subject is layered ground rather than freestanding vessels. Field Notes is also ready but organizes documentary photographs, marginal observations and timed diary stops. Here the geometry is original rather than photographic, the annual choices are interactive, and the summary is a practical product brief rather than a travel record.
