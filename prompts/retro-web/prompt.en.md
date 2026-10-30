# Retro Web — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved entries, dates, links and integrations: [FILL IN OR BUILD A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR FOLLOW THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields are left empty, use the "Mara's little corner" demonstration described below. If they are filled in, adapt the name, content and business metaphor to the real project. Keep these features of the direction: a constrained central page with a visible directory; ordinary underlined links; distinct boxed information regions; honest dated entries grouped by subject.

Composition A: a hand-kept personal portal with a sidebar directory. Composition B: a subject-filed archive with search and expandable entries. The brief below describes both; build the chosen one. B has a different content structure and flow of use, not just a different order. In both versions keep the same palette, type voice and honesty rules.

## Original creative brief

Create your own visual expression: original copy, illustrations, composition and details. Use only your own or properly licensed assets. Do not carry over other brands, code, recognisable scenes or combinations of them. Say once, in the footer, that the brand is invented, and once beside any form or download that nothing is sent. Keep the personal voice, but write concrete entries rather than mood slogans; use real facts only once the user provides reliable content.

The project is MARA'S LITTLE CORNER, the invented personal site of a fictional writer, Mara, who keeps six short observations and making notes. Nostalgia comes from information structure — a directory, boxed regions, underlined links, dates — not from imitating an operating system, browser errors or a visitor counter. Say in the footer that the person and entries are fictional and that nothing is live.

Palette: a pale blue-grey page #c8d2de, cream panels #fffdf4, dark navy text #1f2641, muted text #4b526a, a classic link blue #243cb4, panel borders #5c6981, a deep red focus outline #8c2418 and a night blue #20284b for the small sky box. Use Georgia for the site title and headings and Arial for body text. Links are always underlined. Panels may have a shallow bevel or a 1–2 px border, never a copied system logo.

Composition A, the portal: a site title and tagline above literal navigation (home, now, the archive, about this place). A centred page in two columns. The narrow sidebar holds a boxed "Find your way" directory of arrow links and a small "Tonight's window" box with a CSS moon and a few stars. The wide column holds a "You are here: Home" label, a personal welcome, three "on my desk, lately" paragraphs with their own subjects (not identical feature cards), and a dated "Latest additions" list (date, title, subject tag) with a link to the full archive. About notes with a native disclosure finish the page.

Composition B, the archive: a compact introduction and a return link beside the entry directory. A labelled search field, subject buttons (all, notes, making, links) with aria-pressed and a count ("6 entries"). Six dated entries, each a native disclosure with a title, subject and a short complete note. The search and subject combine; hidden entries leave the focus order; an empty message ("No entries match. Try another word or choose All.") appears with a "Reset the directory" button. A small "How this shelf is arranged" box explains the subjects, and a closing record links back home.

Do not enforce a tiny fixed width: the page is centred with a comfortable maximum width. On a phone the directory stays visible above the content as a short list, panels stack and links remain large enough to tap.

## Final check

Check 360, 390, 768 and 1440 px widths for both compositions. There is no required motion: no blinking text or marquees; prefers-reduced-motion removes short transitions. Check keyboard focus, contrast on every real text background, the console and that there is no horizontal scrolling. A static screenshot alone does not prove that a control works; operate each one.

Functional acceptance: Subject buttons keep pressed state and combine with a case-insensitive search; the count, empty message and reset reflect the visible entries; each entry opens as a native disclosure; hidden entries leave the focus order; no fake guestbook, counter or live status.

Mark the demonstration project clearly in the page footer.

Deliver a working preview, a summary of the checks actually run, the origin of assets and the remaining limits. Publish publicly only when the user asks. Finish the implementation; a plan alone is not a result.
