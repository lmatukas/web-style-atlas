---
schema_version: 1
id: "newspaper-ledger"
name: "Newspaper Ledger"
summary: "Dense editorial columns, strong rules and a clear news hierarchy, paired with a tabular analysis page with explicit units and methods."
family: "editorial"
tags: ["reading-led", "grid", "data-led"]
best_for: ["publishing", "public-information", "data"]
avoid_for: []
density: "dense"
image_dependency: "low"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "Full-width lead above an annotated four-branch plan; a brief strip whose centre column carries a bar chart. B uses article rail, argument and full-width numeric ledger.", "typography": "Serif masthead and compact headlines, sans-serif labels and tabular numbers.", "navigation": "Department strip and persistent visible article contents; mobile wraps into readable rows.", "content_rhythm": "Lead headline, plan beside copy, brief strip with chart, notebook and record; B argument, exact table and method.", "imagery": "Original inline SVG plan and bar chart with units and fictional totals instead of grey placeholder blocks.", "color_and_material": "Warm paper, dark editorial rules and restrained red identifiers.", "interaction": "Real story/section destinations and native editorial-method disclosures.", "motion": "Still reading surfaces with no animated ticker or automatic story changes."}
status: "ready"
prompt_path: prompts/newspaper-ledger/prompt.en.md
---

# Newspaper Ledger

## Intent

Newspaper Ledger gives many related stories a legible common frame. It suits a local publication, an editorial digest or a public-information journal where readers need to see several subjects before choosing one. The fictional Common Ledger studies opening hours through an invented library proposal. Density comes from columns, repeated rules and a strict hierarchy, not from reducing every type size. The visitor can read a front-page overview or follow one question into a complete analytic record.

## Signature

Keep five traits: a substantial masthead above a department rule; unequal lead and brief columns; compact but readable serif headlines; clearly labelled numerical records; and an explicit editorial methods section. Rules connect the issue without turning stories into app cards. The lead remains visibly stronger than the briefs. The analysis has its own contents rail and table rhythm. Every unit and illustration label needs to survive a quick scan and a small screen.

## Typography

Use Georgia for display and Arial for body copy, both with explicit system fallback stacks. The display voice must remain distinct from captions, navigation and sustained reading. Keep paragraphs near sixty characters per line, let long headings wrap, and preserve useful caption sizes. The reference includes ĄČĘĖĮŠŲŪŽ and lowercase glyphs so the actual installed font can be inspected. There are no remote font requests or bundled font binaries. A new licensed font requires a recorded asset before use.

## Color and surfaces

Semantic tokens define the page, supporting surface, readable foreground, secondary labels, action accent, boundary and focus outline. Reference CSS consumes generated tokens.css; artwork may retain its separately authored material palette. Preserve the contrast relationships when replacing colors rather than copying an arbitrary accent. Do not use muted type for essential instructions if it becomes difficult to read. A successful token ratio is only one part of checking the rendered interface and every actual text background.

## Layout A

The lead takes the full width: a kicker, a two-line headline and a standfirst sit above a rule, then a seven-column plan of four branches around a hatched square runs beside a five-column copy column. Each branch box states its weekly hours as current to proposed, and short connectors carry the change. Beneath, a brief strip divides into unequal columns: a short neighbourhood note, a wide numbers column where the +20 total is set beside a bar chart of current and proposed hours, and a narrow opinion note. Below the strip, a four-part community notebook introduces three distinct observations, and an editorial record closes the edition. Story links reach real pages or named sections only.

## Layout B

A large analytic headline sits above a standfirst and byline. A narrow left rail lists argument, figures and method while the main column develops the question. A full-width branch ledger interrupts the prose at a useful point, with row headers, units, a caption and an exact total. Method notes explain the arithmetic and its limitations; a return link closes the reading task. The page prioritizes one argument and its evidence, unlike the multi-story front page.

## Imagery

The reference contains an original inline SVG plan of four fictional libraries around a hatched square, with weekly hours labelled on every box and a delta on every connector. A second original SVG bar chart shows current and proposed hours per branch, with the change printed under each pair. Both carry accessible titles and descriptions, and a caption says the plan is not a street map. The analysis needs no decorative image because its main visual object is a genuine data table. Register any future photograph with proper redistribution rights. Never fill a news composition with uncredited screenshots or let a decorative chart imply a dataset that was not actually supplied.

## Navigation and interaction

Department links reach the issue, community notebook and analysis. The analysis contents links use visible numbered sections, and native disclosures expose the record and method. Link text tells readers what destination exists. Nothing simulates a live ticker, subscriber account or unanswered search field. Active keyboard focus remains visible against paper. Header links wrap on narrow screens without a hidden drawer, and data remains selectable text rather than pixels inside a screenshot.

## Motion

Content is present immediately. Short state transitions are allowed when they explain an operable control; essential copy never waits for a reveal. The reduced-motion media query removes nonessential animation, transitions and smooth scrolling. If an adaptation introduces movement, keep a useful static composition, avoid autoplay distractions and give visitors control over any sustained activity. A decorative motion effect must not turn the page into a different design direction or hide its navigation.

## Responsive behavior

At 1440 pixels preserve the seven-to-five split beneath the lead, the unequal brief columns, the notebook columns and the article contents rail. At 900 the brief strip becomes two columns with the numbers column spanning both rows. At 768 reduce masthead and margins before changing the reading hierarchy. Below 700 the front page becomes lead, plan, briefs, notebook and record. The analysis rail becomes an inline contents list, and the ledger spans the available width with concise column headings. At 360 use readable rows and tabular numbers; avoid forcing a four-column broadsheet into the phone viewport.

## Accessibility

Use one main landmark, one descriptive h1, ordered headings, visible keyboard focus and a skip link. Links navigate and buttons change state; native disclosures expose real information. Provide informative alternatives for meaningful images, while purely ornamental geometry stays out of the reading order. Check actual loading, contrast, focus, control coverage and horizontal overflow at 360, 768 and 1440 pixels. The accompanying task evidence records what was executed; these bounded checks are not a full WCAG certification or a guarantee for adapted content.

## Adaptation

Replace the invented stories and dataset with a real issue and a dated analysis. Keep headline lengths within their column rather than equalising all teasers. Verify calculations and distinguish proposals, observations and forecasts in the copy. A content platform can supply articles and tables, but must preserve row headers, captions and methods. If only one quiet essay exists, choose Editorial Journal instead of manufacturing a dense front page from repeated filler.

## Avoid

1. Do not use grey placeholder boxes with labels as a stand-in for an illustration; every plan element needs a real unit or a real relation. 2. Do not let a three-column brief row carry no visual: the centre column must hold a chart or it reads as an Also-in-this-issue list. 3. Do not make every story equally prominent or hide units, sources or corrections in illegible fine print.

## Closest styles

Editorial Journal is the nearest ready neighbor. Its generous issue cover and sustained single essay differ from this ruled multi-story front page, where a full-width lead opens onto a plan, a brief strip and a chart rather than a split cover and three tidy essay cards. Its literary margin notes become an explicit contents rail and numerical ledger here. Its large quiet reading pauses differ from compact headline clusters and tightly grouped tabular evidence. Typography remains editorial, but composition, navigation, density and content rhythm produce three clear structural differences.
