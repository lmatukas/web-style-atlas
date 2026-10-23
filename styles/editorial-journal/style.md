---
schema_version: 1
id: "editorial-journal"
name: "Editorial Journal"
summary: "A literary issue cover and long-form essay, with serif reading rhythm, margin notes and quiet paper surfaces."
family: "editorial"
tags: ["reading-led", "warm", "annotated"]
best_for: ["publishing", "culture", "personal"]
avoid_for: []
density: "balanced"
image_dependency: "low"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "Literary masthead and unequal cover columns; narrow essay measure with a note margin.", "typography": "Georgia serif headlines and reading text with quiet sans-serif metadata.", "navigation": "Publication departments in A; issue return and article contents in B.", "content_rhythm": "Cover, departments and editor letter versus continuous argument and pull quotation.", "imagery": "An original CSS still-life on the cover and an original SVG line drawing of a cup in the department column and the essay.", "color_and_material": "Ivory paper, deep ink, muted olive and restrained editorial rules.", "interaction": "Underlined local story links and native reading-note disclosure.", "motion": "Short color transitions only; reading remains still."}
status: "ready"
---

# Editorial Journal

## Intent

Editorial Journal is a reading-led direction for a small independent publication. The fictional Plainroom journal explores ordinary spaces and the people who care for them. It invites a visitor to read one substantial story rather than scan an interchangeable product pitch. Its character comes from a bookish masthead, a strong serif voice, quiet section labels and deliberate changes in reading measure. This direction is useful for essays, cultural publishing and reflective studio writing.

## Signature

Keep four traits: a large literary masthead; a serif headline paired with restrained sans-serif metadata; a clear narrow reading column; and editorial pauses made from quotations, margin notes and illustrations. The issue page distributes attention between a leading story and shorter departments. The essay page concentrates attention down one long argument. These are different reading tasks and should retain distinct structures. Whitespace is not leftover space: it separates a caption, a quotation and the next paragraph so each has an identifiable role.

## Typography

Georgia supplies the display and reading voice, with a system serif fallback; the navigation and small metadata use the body sans-serif role only when a quiet label is needed. Use italic serif text for an editorial accent rather than synthetic handwritten lettering. Paragraphs have generous line height and a reading measure around sixty characters. Headlines can cross two columns on an issue page, but the essay body remains narrow. The references include a visible Lithuanian glyph sample. Keep footnotes readable rather than treating them as decorative fine print.

## Color and surfaces

Warm ivory supports long reading sessions, dark brown-black carries the text, and a muted olive accent marks links and small editorial signals. Surface is a slightly deeper paper tone for the original illustration and notes. The palette is defined through semantic tokens and used by the CSS composition. Avoid low-contrast beige typography. Borders use a real legible color and separate departments without boxing every story. An inset note must still read as part of the article, not as a floating application widget.

## Layout A

Start with an issue line, then an unusually large centred masthead and a short horizontal department navigation. The cover story uses an asymmetric two-column arrangement: a literary title and standfirst on one side, a large original CSS still-life on the other. A small caption anchors the illustration. Three story teasers follow as ruled editorial columns with different category labels. The first column carries a small original cup drawing as its visual anchor. Finish with an editor letter, a subscription-purpose note that makes no false form promise, and a publication colophon. Every story link goes to the working alternate essay.

## Layout B

Begin with a compact publication mark and a return link instead of repeating the giant masthead. Centre the article title and a short standfirst above the reading area. The main column moves through three titled sections, an inset quotation and a closing observation. The objects section floats the cup drawing beside its text with a short side note; on mobile it takes full width. A narrow margin carries numbered notes and a native disclosure with reading context. On wide screens the margin sits beside the corresponding argument. On mobile it enters the normal reading order after the main introduction.

## Imagery

The cover still-life is original CSS: a pale circular window, an olive tabletop and an outlined chair. It is not a placeholder photograph or borrowed editorial image. A nearby caption identifies it as an illustration. The essay works without an image because its primary material is language. The blue cup is an original SVG drawing (`reference/cup.svg`) used in two places, so it needs no rights record. Replacements need descriptive captions and explicit provenance before redistribution.

## Navigation and interaction

Department labels on the issue page are ordinary local anchor links. A reader can open the essay, jump between its sections and return to the issue. The reading-notes disclosure uses native keyboard interaction and expanded state. Focus is visible on both light paper and olive-accent links; underlining distinguishes links from plain text. There is no artificial sign-up field, payment button or empty search interface. Long pages should retain a simple table of contents rather than conceal navigation inside a custom overlay.

## Motion

Movement is limited to short link-color changes. Reading content never fades in on scroll or changes position after loading. With reduced motion, transitions disappear entirely. The decorative chair and window remain static at all times. A future adaptation can add a subtle image reveal only if it does not change reading order, hide the initial story or require animation to understand a caption. The underlying editorial rhythm must work on paper and in a still screenshot.

## Responsive behavior

At 1440 pixels the cover divides title and illustration across unequal columns; departments form three editorial columns beneath. At 768 pixels reduce the masthead, let the standfirst wrap naturally and keep captions close to their subjects. At 360 pixels the cover becomes a sequence of title, illustration, caption and story links. The essay margin becomes an inline notes section, and quotations use smaller fluid type. Body copy remains at least sixteen pixels. Never shrink an entire newspaper-like spread into an unreadably tiny mobile layout.

## Accessibility

Targets include semantic article and aside landmarks, one page-level heading, ordered section headings, descriptive links, visible keyboard focus and sufficient declared contrast. Actual evidence records all six viewport and variant combinations, four image inspections, reduced-motion behavior and native disclosure operation. The CSS still-life is decorative with a textual caption, so assistive technology does not encounter meaningless shape labels. No certification or universal screen-reader compatibility is claimed. An adaptation with real content should also check editorial link language and reading complexity.

## Adaptation

Replace the fictional essays with a real publication issue and an actual long-form story. Keep the relationship between a short cover proposition and a narrow article argument, even if WordPress or another content system supplies the text. Use excerpt lengths that fit the editorial hierarchy instead of equalising every department into the same card. Photography is optional; a publication without rights-cleared imagery can remain strongly typographic. A dense breaking-news portal should use the ready newspaper-ledger direction rather than overloading these spacious reading surfaces.

## Avoid

1. Do not replace the serif reading voice with an oversized app-dashboard font; the literary hierarchy matters. 2. Do not set three serif teasers as a text-only band; anchor the row with an illustration or photograph. 3. Do not box the teasers in beige cards with serif headings; separators and columns establish editorial rhythm.

## Closest styles

Newspaper Ledger is the nearest ready editorial neighbor. Editorial Journal uses a generous literary masthead, a few department excerpts and a sustained essay with margin contents and a pull quote. Newspaper Ledger uses a denser front page with simultaneous lead/sidebar stories, stronger editorial rules and a numeric analysis ledger. Department and essay navigation differ from issue sections, analysis and record routes. Field Notes is another comparison: its documentary annotations, route sketch and timed observations differ from literary reading. P13 compares the actual A/B computer and phone compositions, rather than treating the shared warm serif palette as proof.
