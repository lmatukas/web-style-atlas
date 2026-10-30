# Editorial Journal — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved stories, authors, images and integrations: [FILL IN OR BUILD A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR FOLLOW THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields are left empty, use the "Plainroom" demonstration described below. If they are filled in, adapt the name, content and business metaphor to the real project. Keep these features of the direction: a large literary masthead; a serif reading voice with quiet sans-serif labels; a narrow reading column with margin notes; an original drawn illustration.

Composition A: a literary issue cover with three departments and an editor's letter. Composition B: a long-form essay with a contents margin, a pull quote and an end note. The brief below describes both; build the chosen one. B has a different content structure and flow of use, not just a different order. In both versions keep the same palette, type voice and honesty rules.

## Original creative brief

Create your own visual expression: original copy, illustrations, composition and details. Use only your own or properly licensed assets. Do not carry over other brands, code, recognisable scenes or combinations of them. Say once, in the footer, that the brand is invented, and once beside any form or download that nothing is sent. Headlines come from concrete details in the stories (a table, a cup, a courtyard), not "slower living" slogans; use real facts only once the user provides reliable content.

The project is PLAINROOM, an invented small independent journal about ordinary spaces and the people who care for them. A visitor should want to read one substantial story slowly, not scan a product pitch. Write original English stories, a fictional byline and an editor's letter. Do not imply real reporting, research or contributors.

Palette: warm ivory paper #f7f3e8, a deeper paper surface #e9e2d1, brown-black text #29271f, muted labels #665d50, a muted olive accent #53582e for links and small editorial signals, and legible borders #776d5d. Use Georgia (with a system serif fallback) for the masthead, headlines and reading text, italic serif for accents, and a plain system sans serif only for small labels and navigation. Body text at least 16 px, line height generous, measure near sixty characters. No remote fonts.

Composition A, the issue page: a small issue line, then an unusually large centred masthead and a short horizontal row of department links. The cover story sits in an asymmetric two-column spread: the title, a standfirst, a byline and a "Read the cover story" link on one side, and a large original illustration on the other — for example a still life of a round window, a tabletop and an outlined chair drawn in CSS or SVG — with a short caption saying it is an illustration. Below, three story teasers as ruled editorial columns with different department labels (objects, places, practice); anchor the row with one small drawing so it is not a bare text band. Close with an editor's letter and a link to the long read.

Composition B, the essay page: a compact publication mark and a "Back to the issue" link instead of the giant masthead. A centred title, a standfirst and byline, then one narrow reading column with three titled sections, a contents list in a narrow margin, a native details element with a short note on the essay, an inset pull quotation and one drawing floated beside its text with a figure caption. End with a short end note and a return link. On a phone the margin contents become an inline list above the text and the drawing takes the full width.

Interaction is reading navigation: department anchors, essay section links, the native disclosure and the return link. Do not add a fake newsletter field, search box, paywall or share counter. Motion is limited to short link colour changes; content never fades in on scroll, and the page must read exactly the same as a still screenshot. Separate teasers with rules and columns, not beige cards.

On a phone the cover becomes title, illustration, caption and story links in that order; reduce the masthead before shrinking reading text. Use semantic article and aside landmarks, one h1, ordered headings and visible focus on paper and on olive links.

## Final check

Check 360, 390, 768 and 1440 px widths for both compositions. There is no required motion: confirm that no reading content fades in or moves after load, and that link colour changes disappear with prefers-reduced-motion. Check keyboard focus, contrast on every real text background, the console and that there is no horizontal scrolling. A static screenshot alone does not prove that a control works; operate each one.

Functional acceptance: Department links and essay contents reach real sections; the essay notes disclosure opens and closes with a keyboard; all reading content is visible without waiting for animation.

Mark the demonstration project clearly in the page footer.

Deliver a working preview, a summary of the checks actually run, the origin of assets and the remaining limits. Publish publicly only when the user asks. Finish the implementation; a plan alone is not a result.
