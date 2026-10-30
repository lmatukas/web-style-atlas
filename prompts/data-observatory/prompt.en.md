# Data Observatory — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved datasets, units, sources and integrations: [FILL IN OR BUILD A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR FOLLOW THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields are left empty, use the "Tallyhall Observatory" demonstration described below. If they are filled in, adapt the name, content and business metaphor to the real project. Keep these features of the direction: explicit units and periods; consistent numeric alignment; restrained quantitative marks with readable labels; a clear path from overview to detailed comparison.

Composition A: an overview with summary measures, a paired-dot chart and period buttons. Composition B: a searchable, sortable comparison table with stated extremes. The brief below describes both; build the chosen one. B has a different content structure and flow of use, not just a different order. In both versions keep the same palette, type voice and honesty rules.

## Original creative brief

Create your own visual expression: original copy, illustrations, composition and details. Use only your own or properly licensed assets. Do not carry over other brands, code, recognisable scenes or combinations of them. Mark the working demonstration name clearly as invented; use real facts only once the user provides reliable content.

The project is TALLYHALL OBSERVATORY, an invented public data page showing simulated quarterly visits to six fictional library locations. Every value is simulated and bundled with the page; say so in the header and method notes. No control may claim to refresh, export or fetch a live source.

Use one small data array as the single source for every view: North 280 → 330, East 240 → 280, Central 360 → 400, Riverside 180 → 220, Hill 160 → 190, West 280 → 300 (Q1 → Q2 visits). Q2 total is 1,720 across 6 locations; Central is largest; North grew most (+50) and West least (+20). Visits count entries, not unique people.

Palette: pale grey-green #eef2ee, white panels #ffffff, dark green text #1c2a25, secondary text #4f6159, a teal accent #1f6b5c with white text, borders #8c9c94 and an orange focus outline #b4541c. Use Arial (or a licensed sans) with tabular, right-aligned numbers.

Composition A, the overview: a stable header with the observatory name, a "simulated library data" label and links (overview, compare locations, method). A plain title, a one-line scope and two real period buttons, Q1 and Q2, with aria-pressed and a polite status ("Q2 selected; 1,720 visits across 6 locations."). Three summary measures — total visits, locations, largest location count — recalculate for the chosen period. A paired-dot chart in HTML/CSS: one row per location, a hollow Q1 dot and a filled Q2 dot on one fixed 0–500 scale joined by a hairline, with the location name and the exact value for the selected period beside each row. Do not rescale between periods. Beside the chart, a finding in words ("All six places grew. North gained most: +50. Central still has the most, 400.") and a note on what a visit counts. A native method disclosure explains how each measure is calculated. Link to the comparison.

Composition B, the comparison: a title and period context, a labelled location search with a polite count and current sort ("6 locations shown; sorted by Q2, descending."), and a semantic table with Location, Q1, Q2 and Change columns. Column headers are buttons that sort ascending or descending, set aria-sort and keep focus. Show a readable empty message when nothing matches. A note states the extremes in words; a method disclosure and a return link close the page.

Never lead with a row of KPI cards, gauges or hover-only values. On a phone the chart rows keep names and values readable at full width, and the table keeps four short columns without tiny text.

## Final check

Check 360, 390, 768 and 1440 px widths for both compositions. There is no required motion: data changes are immediate, with no count-up or bouncing bars; prefers-reduced-motion removes short colour transitions. Check keyboard focus, contrast on every real text background, the console and that there is no horizontal scrolling. A static screenshot alone does not prove that a control works; operate each one.

Functional acceptance: Q1/Q2 buttons update pressed state, summary measures, exact values and a polite status; dots are positioned from the data on one fixed 0–500 scale; the table search filters names with a count and empty message; header sort buttons reorder rows, set aria-sort and keep focus; all numbers agree.

Mark the demonstration project clearly in the page footer.

Deliver a working preview, a summary of the checks actually run, the origin of assets and the remaining limits. Publish publicly only when the user asks. Finish the implementation; a plan alone is not a result.
