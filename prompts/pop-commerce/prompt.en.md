# Pop Commerce — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved products, prices, specifications and integrations: [FILL IN OR BUILD A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR FOLLOW THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields are left empty, use the "Tumbelo" demonstration described below. If they are filled in, adapt the name, content and business metaphor to the real project. Keep these features of the direction: a dominant product silhouette; abrupt product-to-practical scale contrast; a visible product name beside its price; a small set of literal purchase choices.

Composition A: a bright single-product offer with finish, quantity and a demo bag. Composition B: a filterable three-product shelf with a demo bag. The brief below describes both; build the chosen one. B has a different content structure and flow of use, not just a different order. In both versions keep the same palette, type voice and honesty rules.

## Original creative brief

Create your own visual expression: original copy, illustrations, composition and details. Use only your own or properly licensed assets. Do not carry over other brands, code, recognisable scenes or combinations of them. Mark the working demonstration name clearly as invented; use real facts only once the user provides reliable content.

The project is TUMBELO, an invented collection of three everyday essentials: the Everyday Bottle (€24, 500 ml, twist cap), the Pause Cup (€16, 300 ml, open rim) and the Day Carry bag (€12, 38 × 42 cm, two handles). Prices, capacities and materials are demonstration content. State plainly that nothing can be bought, that the bag is local to the page and resets on reload, and that there is no checkout, stock, delivery, warranty or personal data. Never add ratings, stock counters, discounts or delivery promises.

Palette: warm cream #fff9ef, a pink surface #f8e2e6, dark plum text #322235, muted text #6e5767, a deep plum accent #58305f with white text, borders #8e7488, a blue focus outline #173ba0, and two broad product fields: sun yellow #f5d950 and rose #fa9caf. Use one bold rounded or plain sans serif (Arial or a licensed geometric sans) with very large product headlines and calm small practical text. Use broad saturated fields with clean edges, not rough frames or hard offset shadows.

Draw the three products as original CSS or SVG illustrations that read before their captions: a screw-cap bottle with a small label, a cup with an open rim and handle, a rectangular bag with two handles. Give the bottle at least two finishes (for example Plum and Sun) that visibly change its colour.

Composition A, the single product: a short demonstration notice and shop navigation with a "Demo bag 0" count. A split offer: the bottle on an oversized sunny stage; beside it a headline ("Good days. On repeat."), one line of purpose, the name and price, a real finish select, a quantity input (whole number 1–9) and "Add to demo bag — €24.00 each" directly next to those options. Then restrained specification rows (capacity, illustrated body, closure, demo price), a related-objects section linking the full shelf, the demo bag and a short scope disclosure.

Composition B, the shelf: a collection proposition and one line of premise. Three category buttons (all essentials, drink, carry) with aria-pressed filter three complete product bays — illustration, name, price, one specification line and an "Add … to demo bag" button — and a polite count ("3 essentials shown"). A set note shows Everyday Bottle + Pause Cup = €40.00 by ordinary addition, with "No invented discount." Then the same demo bag and scope note.

The demo bag lists quantity × name / finish — line total, shows the total in euros, announces each change politely, updates the header count and enables "Clear demo bag" only when it has items. On a phone the product stage comes first at a size that still fits, options sit directly under it, and buttons are large touch targets.

## Final check

Check 360, 390, 768 and 1440 px widths for both compositions. There is no required motion: content is present immediately; short state transitions on controls disappear with prefers-reduced-motion. Check keyboard focus, contrast on every real text background, the console and that there is no horizontal scrolling. A static screenshot alone does not prove that a control works; operate each one.

Functional acceptance: Finish changes the illustration; quantity accepts whole numbers 1–9 with a clear error; the demo bag lists lines and totals, updates a polite status and header count, and clears; category buttons filter the shelf with pressed state and count; nothing pretends to be checkout, stock or payment.

Mark the demonstration project clearly in the page footer.

Deliver a working preview, a summary of the checks actually run, the origin of assets and the remaining limits. Publish publicly only when the user asks. Finish the implementation; a plan alone is not a result.
