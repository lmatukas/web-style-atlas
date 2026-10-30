# Audit: where the atlas reads as a standard AI-generated website

Checked: 2026-10-30 (P80). Scope: the 50 directions' A/B reference pages,
their scripts and CSS, the public gallery (`gallery/template.html`) and the
READMEs. Previews, prompts and history files were not scored, but prompts
that repeat the flagged copy are included in the fix tasks.

## 1. How people recognise AI-generated sites

Designers, studios and forum threads in 2025–2026 list the same signs again
and again. One Show HN study ran deterministic CSS/DOM checks on 1,590
submissions and found 4+ of these patterns on 22% of them and 2–3 on another
32%. The recurring signs fall into four groups.

**Copy**

- Weightless headline pairs that could sell anything ("Build faster. Ship
  smarter."), sentence fragments and "everything in threes".
- Negative parallelism: "not just X", "it's not X, it's Y", "No X. No Y."
- Em dashes everywhere; buzzwords such as "seamless", "elevate", "unlock".
- Proof nobody can check: round stats, vague testimonials, logo walls.

**Typography and colour**

- One default font everywhere (Inter, Roboto, Arial), or one italic serif
  word dropped into a sans headline.
- Purple-to-blue gradients, gradient text, glow and neon on dark.
- Light grey text on white, or grey on colour.

**Layout and components**

- A centred hero with a pill badge above the headline.
- A small all-caps label above every heading, often numbered ("01 / …").
- Three identical icon cards in a row; the same radius and shadow on
  everything; one-sided accent borders; glass cards; emoji as icons.

**Motion**

- Every block fading in on scroll.
- A glow that follows the cursor (no effect on phones).
- Pulsing dots, bouncing buttons.

The common fix advice is the same everywhere: write specific copy, read
every headline aloud and rewrite any that could fit a competitor, cut
decoration that has no job, keep one distinctive detail, and check the
result on a phone, with a keyboard and with reduced motion.

## 2. What the atlas already avoids

Measured on all 100 reference pages:

- no gradient text (`background-clip: text`), no glassmorphism
  (`backdrop-filter`), no emoji icons, no fake testimonials, ratings, logo
  walls or round "trusted by" numbers;
- no centred hero with a badge pill;
- no purple-to-blue gradient backgrounds (the few violet accents belong to
  directions where colour is the subject, such as Y2K Chrome and
  Neo Brutalist);
- reduced-motion and keyboard checks run on every direction.

The visual systems are mostly distinct. The problem is the **copy** and a few
**repeated components**, which make different directions sound and feel like
the same generator.

## 3. Findings, ranked

### F1 — Formula headlines (high, 40 of 50 directions)

89 unique h1/h2 headlines follow the same template: two or three very short
sentences or fragments. Three sub-forms repeat across directions that should
have nothing in common:

| Form | Examples (direction) |
| --- | --- |
| Less X. More Y. / Not X. More Y. | "Less fuss. More everyday." (Pop Commerce), "Less noise. More useful output." (Terminal Utility), "Less screen. More horizon." (Twilight Expedition), "Less waiting. More making." (Kinetic Type), "Less guessing. More room." (Rhythm Planner), "Not more plans. More sea." (Openwater Deck), "Not more plans. More room for yourself." (Still Sanctuary), "Not louder. More character." (Resonant Ribbon), "Fewer things. More attention." (Trail Composer) |
| N things. One thing. | "Two sketches. One decision." (Acoustic Sculpture), "Four cabins. One horizon." (Openwater Deck), "Three parts. One idea." (Repair Atlas), "Two views. One object." (Industrial Spec), "A hundred years. One thread." (Heirloom Weave Ledger), "Three stops. One morning." (Field Notes), "Three themes. Four beginnings." (Spine Editions), "Two houses. Two horizons." (Architectural Monograph) |
| Word. Word. Word. | "Notice. Try. Stop." (Choreographic Stage), "Observe. Change. Verify." (Terminal Utility), "Plane. Joint. Light." (Modular Light), "Image. Name. Observation." (Botanical Engraving), "Patina. Form. Provenance." (Patina Auction Room), "Volume. Band. Porch." (Architectural Monograph), three consecutive headings "LOOK." / "TRY." / "SHARE." (Kinetic Type) |

Why it matters: this is the single strongest "written by a model" signal in
the atlas. The headlines are interchangeable between directions, so they
also weaken each direction's identity.

What to write instead: one plain sentence that only this business could say,
with a concrete noun or number from the page (for example, a sentence that names
the cabins, the deck and a departure time instead of "Four cabins. One
horizon."). Keep a
fragment only where the direction's voice really is telegraphic (Terminal
Utility's command index, Kinetic Type's poster words), and then at most once
per page.

### F2 — The same calm, slow brand voice everywhere (high)

41 directions use the same mood words: "quiet" 43×, "calm" 26×, "slow" or
"slowly" 39×, "hurry" 15×, "soft" 31×, "unhurried" 5× ("pause" 92× is partly
a real control label). A tasting room, a sailing deck, a sanctuary, a
sound studio and a newspaper all promise "no hurry". Worst: Still Sanctuary
(29), Openwater Deck (17), Acoustic Sculpture (16), Ember Course Room (15),
Choreographic Stage (14), Membrane Score (14).

What to write instead: give each direction its own subject vocabulary
(tides and knots for the deck, grams and kHz for the recorder, weave counts
for the textile ledger). Calm is a visual quality; it does not need to be
announced in every paragraph.

### F3 — Disclaimer overload (high in 9 directions)

Honest labelling is required (one clear footer line, plus a note where a
form could be mistaken for a real booking or purchase). Many pages repeat
"fictional", "demonstration", "illustrative", "invented" far beyond that:
Ember Course Room 25, Newspaper Ledger 23, Art Deco 22, Openwater Deck 22,
Velvet Members Hall 16, Institutional Clear 15, Field Notes 14, Gallery
White Cube 14, Heirloom Weave Ledger 14. The repetition reads like a cautious
model, not a publication.

What to write instead: one footer line, one note next to each action that
could be mistaken for a real transaction, and nothing else.

### F4 — An all-caps label above every heading (medium, almost all)

Nearly every section starts with a small uppercase label, often numbered
("01 / THE IDEA", "02 / A SIMPLE WAY FORWARD"): 17–20 labels per page pair in
Obsidian Stage, Choreographic Stage, Scent Ritual, Velvet Members Hall and
Still Sanctuary; numbered labels 13–14 in Repair Atlas and Woven Field.

What to do: keep labels where they carry information (a date, a plate
number, a price tier, a step in a real process); delete the ones that repeat
the heading.

### F5 — An arrow on every link (medium)

363 arrow glyphs (↗ → ↘ ↓) sit in link text across the reference pages, so
nearly every link ends in an arrow. It is a known template habit and it
makes screen readers announce symbols.

What to do: keep arrows only for links that leave the page or download
something; use plain words elsewhere.

### F6 — Em dash habit (medium in 8 directions)

Measured per 1,000 words of page copy: Escapement Nocturne 17.7, Still
Sanctuary 11.6, Neo Brutalist 11.4, Swiss Grid 10.9, Field Notes 9.7,
Openwater Deck 9.5, Acoustic Sculpture 9.4, Bauhaus Geometric 9.1.
Labels such as "01 — THE SURFACE" also count.

What to do: use a full stop, comma, colon or en dash for ranges; keep at
most one em dash per section.

### F7 — One italic serif word in a headline (medium)

The gallery's own hero ("Find your *direction.*") and several directions
(Ember Course Room 8, Heirloom Weave Ledger 8, Velvet Members Hall 7, Quiet
Luxury 5 italic accents in headings) use the single italic word that design
writers now call overused.

What to do: keep it only where the italic is the direction's documented
type signature (Ember's italic course names), not as a decoration in every
heading.

### F8 — Glow that follows the cursor (medium, 9 directions)

Acoustic Sculpture, Escapement Nocturne, Light Environments, Luminous Cut
Vitrine, Midnight Vestibule, Patina Auction Room, Scent Ritual, Velvet
Members Hall and Woven Field move a light or glow with the pointer. It does
nothing on phones and is now a recognised AI-site effect.

What to do: keep it where the pointer controls the subject (light direction
in Light Environments, the thread field in Woven Field, the bottle tilt in
Scent Ritual); remove or replace it with a finite, purposeful episode where
it is only atmosphere.

### F9 — Default fonts (low, 38 directions)

38 directions use system Arial and/or Georgia (a few Trebuchet or DejaVu).
This was a deliberate no-binaries rule for the early directions, but the
"one default font everywhere" sign is real: many directions look alike at
text level. Fixing it needs licensed font files and rights records, so it is
listed as optional (P87).

### F10 — The public gallery (high, small)

`gallery/template.html` is the atlas's first impression and uses several of
the signs at once:

| Text | Sign |
| --- | --- |
| "Find your *direction.*" | italic serif accent word (F7) |
| "Distinct visual systems. Working examples." | formula fragments (F1) |
| "Choose a structure, not just a color." | negative parallelism |
| "Keep the idea. Make it yours." | formula headline (F1) |
| "Local references. Honest provenance." | formula fragments (F1) |
| "A FIELD GUIDE FOR THE WEB", "FROM REFERENCE TO REAL WEBSITE", "YOUR CHOSEN DIRECTION" | all-caps label above each heading (F4) |
| "01 Compare real compositions.", "02 Choose a direction and variant.", "03 Give your agent the source and your brief." | numbered three-step row |
| "Source & instructions ↗", "Start here ↗", "Compare selected ↓" | arrow habit (F5) |

What to write instead: say what the site is and does in one or two plain
sentences ("50 website design directions, each with two working page
layouts and a prompt you can give a coding agent"), and keep the three
steps only if they are real instructions.

## 4. Per-direction table

Formula headlines are unique h1/h2 matches; disclaimer words count
"fictional / demonstration / illustrative / invented / imagined / made up /
not a real / no real"; eyebrow labels count elements with an eyebrow, label,
kicker or overline class. Score = 2 × formula headlines + disclaimer, em dash,
label, italic and glow penalties; it only orders the work.

| Style | Formula headlines (examples) | Disclaimer words | Em dash / 1000 words | Eyebrow labels | Italic accent in headings | Cursor glow | Score |
| --- | --- | --- | --- | --- | --- | --- | --- |
| openwater-deck | Your home. Further from shore.; Four cabins. One horizon.; A calm pace. Exact numbers. | 22 | 9.5 | 12 | 0 | no | 18 |
| still-sanctuary | Not more plans. More room for yourself.; No need to hurry. Not even here.; Your stay. Your rhythm. | 11 | 11.6 | 19 | 0 | no | 14 |
| obsidian-stage | Feels like less. Holds much more.; Precision. From the inside.; Long days. Always ready. | 12 | 5.2 | 17 | 0 | no | 12 |
| velvet-members-hall | Three rooms. Your evening's pace.; A close circle. Open to curiosity. | 16 | 2.5 | 19 | 7 | yes | 10 |
| pop-commerce | Good days. On repeat.; A little set. A lot of days.; Less fuss. More everyday. | 11 | 5.3 | 7 | 0 | no | 9 |
| modular-light | Plane. Joint. Light.; The same shape. A different mood.; Touch less. Understand more. | 1 | 5.0 | 13 | 0 | no | 9 |
| heirloom-weave-ledger | A hundred years. One thread.; Craft does not age. It is handed on. | 14 | 3.9 | 15 | 8 | no | 9 |
| choreographic-stage | Off the ground. Into possibility.; The form stays. The relation shifts.; Notice. Try. Stop. | 4 | 0.0 | 20 | 1 | no | 9 |
| resonant-ribbon | Sound. From one ribbon.; Not louder. More character.; Closer to form. Closer to sound. | 0 | 6.0 | 11 | 1 | no | 8 |
| repair-atlas | An object. Once more.; Three parts. One idea.; Replace a part. Rethink the whole. | 3 | 0.0 | 10 | 0 | no | 8 |
| woven-field | From a single line. Into a shared rhythm.; Not a mass of colour. A relation of threads.; Choose a direction. Build a relation. | 0 | 0.0 | 9 | 1 | yes | 7 |
| terminal-utility | Less noise. More useful output.; Observe. Change. Verify.; Clear boundaries. Predictable work. | 10 | 4.1 | 5 | 0 | no | 7 |
| scent-ritual | A small set. Many discoveries. | 12 | 7.2 | 20 | 0 | yes | 7 |
| playful-cutout | Try a little. Try a little more.; A flat piece. A fresh thought.; Take the idea. Leave it open. | 8 | 4.6 | 7 | 2 | no | 7 |
| neo-brutalist | Less watching. More doing.; Be curious. Be considerate. Make room. | 9 | 11.4 | 8 | 0 | no | 7 |
| industrial-spec | Compare the envelope. Keep the evidence.; Two views. One object. | 12 | 3.3 | 7 | 0 | no | 7 |
| humanist-service | A little help. A clearer next step.; First we listen. Then we make a plan. | 12 | 2.8 | 8 | 0 | no | 7 |
| field-notes | Three stops. One morning. | 14 | 9.7 | 10 | 2 | no | 7 |
| escapement-nocturne | Open it. Understand it. | 11 | 17.7 | 13 | 2 | yes | 7 |
| ember-course-room | Small things. A calm evening. | 25 | 2.9 | 12 | 8 | no | 7 |
| bauhaus-geometric | Simple elements. Unexpected possibilities.; Choose less. Arrange with intent. | 11 | 9.1 | 9 | 2 | no | 7 |
| rhythm-planner | Three tasks. A clear end.; Less guessing. More room.; Arrange time. Don't chase it. | 4 | 0.0 | 8 | 0 | no | 6 |
| patina-auction-room | Patina. Form. Provenance. | 12 | 3.5 | 8 | 1 | yes | 6 |
| quiet-luxury | One language. Two proportions.; A seam. A gap. A visible frame. | 6 | 7.5 | 7 | 5 | no | 5 |
| newspaper-ledger | One more hour. A different afternoon. | 23 | 2.0 | 9 | 0 | no | 5 |
| balcony-builder | A small start. Lots of curiosity.; Three choices. Your green corner. | 4 | 0.0 | 12 | 0 | no | 5 |
| art-deco | Order at the edges. Warmth at the centre. | 22 | 3.6 | 4 | 0 | no | 5 |
| architectural-monograph | Volume. Band. Porch.; Two houses. Two horizons. | 9 | 3.4 | 8 | 0 | no | 5 |
| acoustic-sculpture | Two sketches. One decision. | 4 | 9.4 | 10 | 0 | yes | 5 |
| soft-spatial | Small presence. Room to breathe.; Warm surface. Cool shadow. | 4 | 3.9 | 8 | 0 | no | 4 |
| organic-craft | A family resemblance. Never quite the same.; Good objects. Honest information. | 7 | 5.3 | 8 | 3 | no | 4 |
| membrane-score | Three voices. Your interval.; Pick a beginning. Change the flow. | 2 | 0.0 | 10 | 0 | no | 4 |
| luminous-cut-vitrine | — | 12 | 2.9 | 10 | 0 | yes | 4 |
| kinetic-type | LESS WAITING. MORE MAKING.; TWO DAYS. WIDE OPEN. | 7 | 8.1 | 4 | 0 | no | 4 |
| discovery-cabinet | A small thing. A big discovery.; Open one. Notice more. | 4 | 3.4 | 10 | 1 | no | 4 |
| twilight-expedition | Less screen. More horizon. | 4 | 6.4 | 13 | 1 | no | 3 |
| trail-composer | Fewer things. More attention. | 11 | 0.0 | 10 | 0 | no | 3 |
| institutional-clear | — | 15 | 2.4 | 7 | 0 | no | 3 |
| gallery-white-cube | — | 14 | 3.4 | 0 | 0 | no | 3 |
| botanical-engraving | Image. Name. Observation. | 9 | 3.3 | 9 | 0 | no | 3 |
| swiss-grid | — | 4 | 10.9 | 2 | 0 | no | 2 |
| spine-editions | Three themes. Four beginnings. | 6 | 0.0 | 10 | 0 | no | 2 |
| midnight-vestibule | — | 9 | 2.6 | 10 | 0 | yes | 2 |
| light-environments | — | 2 | 3.2 | 12 | 2 | yes | 2 |
| data-observatory | Central leads both periods. West grew least. | 5 | 4.7 | 6 | 0 | no | 2 |
| cinematic-photo | Take the feeling. Leave the place whole. | 5 | 4.8 | 9 | 2 | no | 2 |
| y2k-chrome | — | 9 | 4.7 | 6 | 1 | no | 1 |
| seasonal-terrain | — | 2 | 9.0 | 9 | 2 | no | 0 |
| retro-web | — | 5 | 3.0 | 2 | 0 | no | 0 |
| editorial-journal | — | 7 | 2.4 | 9 | 3 | no | 0 |

## 5. Fix plan (queued as P81–P87)

| Task | Scope |
| --- | --- |
| P81 | Gallery copy (F10) and a copy-lint test with a shrinking backlog, so new formula headlines, "not just" lines and arrow-only links cannot come back |
| P82 | Rewrite batch 1: openwater-deck, still-sanctuary, obsidian-stage, velvet-members-hall, pop-commerce, modular-light, heirloom-weave-ledger, choreographic-stage, resonant-ribbon, repair-atlas |
| P83 | Rewrite batch 2: woven-field, terminal-utility, scent-ritual, playful-cutout, neo-brutalist, industrial-spec, humanist-service, field-notes, escapement-nocturne, ember-course-room |
| P84 | Rewrite batch 3: bauhaus-geometric, rhythm-planner, patina-auction-room, quiet-luxury, newspaper-ledger, balcony-builder, art-deco, architectural-monograph, acoustic-sculpture, soft-spatial |
| P85 | Rewrite batch 4: organic-craft, membrane-score, luminous-cut-vitrine, kinetic-type, discovery-cabinet, twilight-expedition, trail-composer, institutional-clear, gallery-white-cube, botanical-engraving |
| P86 | Rewrite batch 5: swiss-grid, spine-editions, midnight-vestibule, light-environments, data-observatory, cinematic-photo, y2k-chrome, seasonal-terrain, retro-web, editorial-journal |
| P87 | Optional visual pass: cursor glow where it is only atmosphere (F8), italic accents (F7), and a decision on licensed fonts for the system-font directions (F9) |

Each rewrite task uses the fix prompt below for its ten directions and
removes them from the copy-lint backlog.

## 6. Fix prompt

```text
Work in the GitHub repo lmatukas/web-style-atlas. Follow AGENTS.md,
START_HERE.md and docs/WORKFLOW.md. Claim the next queued task (P82–P86) and
read docs/audits/ai-template-audit.md first.

For each direction listed in the task card, rewrite the copy of
styles/<id>/reference/index.html and alternate.html (and any text the
scripts write into the page) so it no longer reads like a standard
AI-generated website. Keep the layout, palette, type, motion, A/B structure,
working functions, QA behaviour and the invented brand name.

Rules:
1. Headlines (F1): no "Less X. More Y.", "Not X. Y.", "N things. One thing."
   or "Word. Word. Word." patterns, and no run of very short sentences.
   Write one plain sentence that only this business could say, using a
   concrete noun, number, place or object from the page. A telegraphic
   fragment is allowed once per page only where the direction's documented
   voice needs it.
2. Voice (F2): remove generic mood words (quiet, calm, slow, unhurried,
   no hurry, soft, pause as a mood) unless they describe a real feature.
   Use the direction's own subject vocabulary instead.
3. Honesty (F3): keep exactly one footer line saying the brand and content
   are invented, plus one short note beside any form or button that could
   be mistaken for a real booking, purchase or sending. Delete every other
   "fictional / demonstration / illustrative / invented" mention.
4. Labels (F4): keep an uppercase label only when it carries information
   (date, number, price, plate, step of a real process). Delete labels that
   repeat the heading, and numbered "01 /" labels that number nothing.
5. Links (F5): no arrow glyphs except for links that open another page or a
   file; link text says where it goes.
6. Punctuation (F6): at most one em dash per section; en dashes for ranges.
7. No new claims: no testimonials, ratings, awards, client names, round
   statistics, real companies, real places or real people.
8. Plain English, short sentences, varied sentence length. No "not just",
   "it's not X, it's Y", "seamless", "elevate", "unlock", "curated",
   "crafted", "journey".

Also update the direction's creation prompt (prompts/<id>/prompt.en.md) and
its style.md wherever they quote or prescribe the old headlines, and update
qa.mjs if it asserts old text. Remove the directions from the copy-lint
backlog in tests/copy-tells.test.mjs (added by P81).

Checks: npm run validate, npm run build, npm run check, unit tests, each
direction's QA, browser and runtime QA; regenerate previews only through the
"Regenerate canonical previews" workflow; read every new headline aloud and
make sure it could not belong to another direction. Record before/after
headlines per direction in docs/evidence/<task>.md. One PR per task; merge
when CI is green; no AI trailers or session links in commits.
```

## 7. Sources

- [Scoring Show HN submissions for AI design patterns](https://www.adriankrebs.ch/blog/design-slop/)
- [Signs of AI slop in design: 21 patterns](https://www.paralect.com/blog/signs-of-ai-slop-in-design)
- [20 Signs a Website Was Made by AI](https://scalr.sg/blog/20-signs-a-website-was-made-by-ai/)
- [Is your website AI slop? How to tell, and how to fix it](https://dev.to/laurilllll/is-your-website-ai-slop-how-to-tell-and-how-to-fix-it-1fn5)
- [AI Slop Fonts and Gradients: The Tells That Give Away AI Design](https://www.925studios.co/blog/ai-slop-design-tells)
- [AI Slop Pattern Catalog (pixelslop)](https://cdn.jsdelivr.net/npm/pixelslop@0.3.8/dist/skill/resources/ai-slop-patterns.md)
- [How to Spot AI Writing, According to Wikipedia](https://www.beutlerink.com/blog/how-to-spot-ai-writing)
