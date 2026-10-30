# Neo Brutalist — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved events, sessions, venue details and integrations: [FILL IN OR BUILD A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR FOLLOW THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields are left empty, use the "Shoutmoot" demonstration described below. If they are filled in, adapt the name, content and business metaphor to the real project. Keep these features of the direction: large poster-like words; thick visible outlines; hard offset shadows instead of soft depth; bands of information that break a regular rhythm.

Composition A: a loud event poster with a numbered manifesto. Composition B: a framed two-day programme with a working day filter. The brief below describes both; build the chosen one. B has a different content structure and flow of use, not just a different order. In both versions keep the same palette, type voice and honesty rules.

## Original creative brief

Create your own visual expression: original copy, illustrations, composition and details. Use only your own or properly licensed assets. Do not carry over other brands, code, recognisable scenes or combinations of them. Say once, in the footer, that the brand is invented, and once beside any form or download that nothing is sent. Keep one shouted headline per page; other headings state facts about the sessions, and the venue is invented, not a real city; use real facts only once the user provides reliable content.

The project is SHOUTMOOT, an invented independent ideas event that brings designers, organisers and curious neighbours into one working room. It should feel immediate, public and slightly unruly while staying fully usable. All dates, sessions and the venue are fictional; say so near the programme and in the attendance section.

Palette: loud yellow ground #f6ee3e, a pale violet surface #eee7ff, near-black text and borders #18151c, dark olive labels #47412f, violet accent #5732c6 with white text, and a violet focus outline #4b279e. Use one heavy sans serif (Arial Black/Arial or a licensed grotesque) in very large uppercase for poster words and a calm normal weight for practical details. Construction is exposed: thick black borders, hard offset shadows with no blur, square corners. A tilted label or a round stamp is allowed if reading order stays clear.

Composition A, the poster: a bordered utility header with the event name and a working programme link. The poster pairs a three-line proposition such as "MAKE SOME NOISE." with an offset circular stamp and a short practical description, and a call to "find your session" that opens B. A full-width violet band states dates and place. A manifesto of three oversized numbered statements separated by exposed rules. A session preview contrasts a dense list of three timed sessions with a large side statement. Close with an attendance note, a native "What about access?" disclosure and a link to the practical notes.

Composition B, the programme: a utility mast with a return link, a compact huge heading and one line of instruction. Two buttons, "Day 01 / Saturday" and "Day 02 / Sunday", filter a real local session list with four different sessions per day. Each row shows time, title, format and location inside a thick grid. Selected state uses aria-pressed plus a border and text change, not colour alone, and a polite live line says "Showing Saturday: 4 sessions". Inactive sessions are truly hidden. Below, a panel with the venue and getting-in guidance (written as placeholders for verified information), then a short code of conduct and a return link.

Practical details use a calmer secondary scale; not every line is gigantic. No marquee, flashing text, ticker or fake purchase button. On a phone poster words wrap without overflow, shadows shrink, session rows stack time above title and the day buttons stay large touch targets.

## Final check

Check 360, 390, 768 and 1440 px widths for both compositions. There is no required motion: links may change colour briefly; day filtering is an immediate state change; prefers-reduced-motion removes all transitions. Check keyboard focus, contrast on every real text background, the console and that there is no horizontal scrolling. A static screenshot alone does not prove that a control works; operate each one.

Functional acceptance: The two day buttons show only that day’s sessions, expose aria-pressed and update a polite status line; the access disclosure works with a keyboard; the page states no tickets are sold and no data is collected.

Mark the demonstration project clearly in the page footer.

Deliver a working preview, a summary of the checks actually run, the origin of assets and the remaining limits. Publish publicly only when the user asks. Finish the implementation; a plan alone is not a result.
