---
schema_version: 1
id: "data-observatory"
name: "Data Observatory"
summary: "Explicit units, synchronized metrics and accurate quantitative marks with a searchable comparison table."
family: "technical"
tags: ["data-led", "precise", "task-led"]
best_for: ["data", "public-information", "documentation"]
avoid_for: []
density: "dense"
image_dependency: "low"
motion_level: "subtle"
complexity: "medium"
signature: {"composition": "Quantitative overview with bar chart in A; exact filtered/sortable comparison table in B.", "typography": "Compact sans-serif headings, tabular numerals and explicit unit/period labels.", "navigation": "Stable overview/comparison/method links and local dataset controls.", "content_rhythm": "Synchronized metrics, chart, reading note and methodology; or exact comparison rows.", "imagery": "Code-native fixed-scale bars from one bundled six-location simulated dataset.", "color_and_material": "Deep navy surfaces, pale labels and one turquoise measure accent.", "interaction": "Actual period switching, location search and numeric/name sorting with accessible state.", "motion": "Immediate data updates, fixed chart scale and no count-up animation; reduced-motion honored."}
status: "ready"
---

# Data Observatory

## Intent

Data Observatory helps readers inspect a small dataset through a concise overview and a precise comparison table. The fictional Public Room observatory uses simulated library visits to show a complete local data interface. It suits analytical pages, public information and operational reporting. Visitors should understand the unit, period, source boundary and relationship between summary and detail. No value is live or externally sourced: the bundled six-location dataset is an explicit demonstration, and every visible calculation comes from that same source.

## Signature

Keep four invariants: explicit metric units and periods; consistent numerical alignment; restrained quantitative marks with readable labels; and a clear path from overview to detailed comparison. A combines three summary measures with a horizontal bar chart and period controls. B replaces that dashboard rhythm with a searchable, sortable comparison table. Dense information should remain organized rather than compressed indiscriminately. The dark blue palette supports the example, but the style’s identity comes from accurate encoding and inspectable relationships.

## Typography

Use system Arial for headings and descriptions, with tabular numerals for values and short monospace metadata labels where useful. Display headings are compact enough to leave room for data. Align comparable numbers to the same edge and keep units close to their measure. Labels and captions remain readable rather than fading into decorative microtype. Lithuanian glyphs are included in the colophon, and all font roles work without an external download.

## Color and surfaces

A deep navy ground and slightly raised blue surface organize the dashboard. Pale text, readable muted labels and a turquoise quantitative accent provide a limited hierarchy. A warm secondary focus color makes keyboard position easy to find. All interface and chart colors use generated semantic tokens. Bars share one color because they encode the same measure; positive change is written numerically rather than requiring green-versus-red interpretation. Do not add gradients or ornamental glows that imply extra data dimensions.

## Layout A

A stable observatory header leads to a plain title, source label and two real period buttons. Three summary measures show total visits, number of locations and largest location count. A broad horizontal bar chart uses a fixed zero-to-500 scale for both periods, with names and exact values beside the marks. A supporting reading note explains the change from the baseline. Native method details and a working comparison link close the overview. Metrics and chart are synchronized from the bundled records.

## Layout B

Begin with a comparison title and clear period context. A labeled local location search and a result count precede a semantic table with Q1, Q2 and absolute change columns. Real header buttons sort locations or numeric values, expose their direction through aria-sort and preserve focus. A short interpretation note explains what a visit count does and does not mean, followed by method details and a return link. This page supports exact comparison rather than repeating the overview’s cards and chart.

## Imagery

No photographs, icons or external chart library are required. Original HTML and CSS encode the quantitative marks, and a small bundled JavaScript record array is the common source. An empty media asset registry is intentional. The chart’s scale is numeric and fixed, not an illustrative image guessed from a prompt. Future adaptations can use a chart library when the data requires it, but should preserve accessible labels, explicit units and a tabular route to the underlying values.

## Navigation and interaction

Visible header links connect overview, comparison and method notes. A’s buttons switch between Q1 and Q2, update pressed state, exact values, summary measures and a polite status message. B’s search filters local records; sortable headers change row order and announce the result count and current sort. Empty results receive a readable message. Native method disclosures expose their real state. No control claims to refresh a network source, export a file or save a filter unless that behavior exists.

## Motion

Data changes are immediate and predictable, with no count-up animation or bouncing bars. Short link-color transitions are optional and removed by reduced-motion preferences. The chart stays on the same scale across periods so readers can compare its lengths without an animated rescaling. Search and sorting preserve focus. If a future live implementation refreshes records, it should explain freshness and avoid unexpectedly moving the row a person is inspecting. Still screenshots must show meaningful complete data.

## Responsive behavior

At 1440 pixels the overview places the chart beside a narrow reading note and keeps the summary measures in one row. The comparison uses a broad but bounded table. At tablet widths reduce gaps while retaining the chart labels and exact values. At 360 pixels stack metrics and the reading note, wrap period controls and use compact table spacing with readable numbers. The four-column table fits the viewport without hiding a measure or requiring horizontal document scrolling.

## Accessibility

Targets include one main landmark, one page heading, descriptive controls and visible keyboard focus. Chart values are available as ordinary labeled text, while decorative bar fills are hidden from assistive technology. The table uses caption, scoped headers and actual sort state. Search, period changes and empty results have polite status messages. Evidence records six responsive axe/resource/control combinations and additional calculation, scale, filter and sorting checks. These bounded checks supplement visual inspection and do not certify every future analytical page.

## Adaptation

Begin with a defined question and a verified dataset. Replace the simulated records, source description and period labels together, then derive every metric from that source. Preserve a common scale when comparing bars across periods and state when a metric is a count rather than unique people. The same semantic figures, buttons and table can move into WordPress or React without copying this exact dataset. If source data is missing, report the gap instead of inventing reassuring dashboard numbers.

## Avoid

1. Do not invent live values, freshness or source authority to make a dashboard look complete. 2. Do not encode comparable quantities on changing undocumented scales or rely on color alone to communicate change. 3. Do not hide exact values behind hover-only charts, decorative gauges or a table that cannot be used on a small screen.

## Closest styles

Terminal Utility is the nearest available technical neighbor. Data Observatory uses measured bars and aligned metric groups instead of command disclosures, overview/comparison/method navigation instead of service/log routes, and synchronized quantitative summaries instead of chronological text entries. Institutional Clear is another available comparison: a data question, numerical density and sortable comparison replace service-task discovery and procedural reading. Industrial Spec remains a planned future neighbor, whose dimensional engineering-sheet structure has not yet been implemented.
