# Openwater Deck — website creation prompt

Build a working website in the user's project. Do not change the atlas or its task registry.

## Adapt to the project

- Business name, audience, yacht or residence: [FILL IN OR KEEP AN INVENTED DEMONSTRATION].
- Real deck dimensions, cabins, crew and technical data: [APPROVED DETAILS].
- Approved routes, weeks, guest limits, pricing and integrations: [FILL IN].
- Technology and existing project rules: [FILL IN].

Without an approved integration everything runs locally. No real availability, sending, booking or payment. Use an invented name, demonstration weeks and a clear local-demonstration label. The schematic map is not for navigation.

## Design direction

White and warm sand, deep sea blue for text and thin lines, a very restrained brass accent. On the first screen, a large real CC0 or public-domain photograph of a sea horizon and an original, code-drawn long silhouette of a white yacht. One heading and one button. The scene is 70–110 svh, the object takes 60–75% of the desktop width, and text stays within 28–36 ch. The phone gets its own full horizon composition.

Five features to keep: a long white yacht on the horizon; blue nautical lines on warm paper; a calm light serif and a technical sans with tabular figures; a deck atlas before a route-planning table; an honest local charter enquiry. Avoid a dense industrial equipment panel, a land-trek checklist and generic blue resort booking cards.

Only local OFL WOFF2 files, up to two families and three weights; 200 KB for fonts, 1.5 MB for photographs. Lithuanian letters are required. Headings at weight 300–400, 24–56 px, one campaign heading up to 80 px; 36–56 px on a phone. Text 16–20 px, line height 1.5–1.7. Small uppercase labels 11–14 px with 1–5 px spacing. Between sections 80–160 px on desktop and 48–80 px on a phone. Controls at least 44 × 44 px. One main CTA per visible screen.

## Two different layouts

A — yacht introduction: a large horizon scene; an interactive deck plan with four clear zones; cabin entries; a semantic specification table; an ending about crew roles and service. On the plan, the visitor can choose the sun terrace, the salon, the owner's cabin and the swim platform. A click changes the real SVG zone highlight, the description, dimensions, area and use. The numbers are native buttons with aria-pressed that work with a mouse, Enter/Space and touch. Note when the plan combines information from several decks; do not pretend it is a construction drawing.

B — charter enquiry: a wide schematic island map next to a personal invitation; two seven-night routes; a week and guest form; an exact local summary and practical notes. Choosing a route changes the SVG path geometry, the stop coordinates, the four names, the heading and the choice beside the form. On a phone the map gets its own tall first screen and the invitation follows it. Do not make A and B differ only by colour.

## Service

Offer three clear demonstration weeks with start and end dates, 1–8 guests, a name and a required demonstration confirmation. No price or real availability until the owner approves them. The name has at least one letter; the guest count is a whole number within limits; the week must be from the allowed list. Errors are understandable, announced and move focus to the field.

The confirmation repeats the exact name, route, every stop, the week dates, seven nights and the guest count. Insert input as text, not HTML. Say clearly that this is a local demonstration: the yacht was not booked, no data was sent and no payment is taken. Changing the route or input removes the old confirmation. "Edit" keeps the input and returns focus to the week; "Start over" returns the first route, an empty week and name, two guests and an unticked confirmation. Do not store data.

## Motion and accessibility

One finite 1.5–2 s scene where the yacht/wave or the route appears. Choosing a route may start one new finite animation. Pause, a live reduced-motion change, stopping when the scene or window is hidden, and pagehide cleanup. No constant autoplay and no scroll hijacking. Without motion the complete yacht or map is visible at once. WebGL is not needed; if 3D is added, an informative static local fallback and a blocked-WebGL check are required.

A skip link, one h1, correct SVG descriptions, a semantic table, visible focus and local links. Text contrast of at least 4.5:1, 3:1 for controls. Small figures must stay legible. Photograph source, author, licence and edits go in the RIGHTS file. Do not show real people or a real operator's approval.

## Final check

Both layouts at 360, 390, 768 and 1440 px; all four final PNGs reviewed. Test the four zones with a mouse, keyboard and touch; the real SVG highlight and exact dimensions; both routes and the change in path and stops; all three weeks and the guest limits, errors, the exact summary, editing, hiding the confirmation and reset. Check that motion settles, pause, reduced motion, a hidden window and cleanup. The console must have no errors and no external requests. Compare with a technical industrial direction and a land-trip plan at least for structure, typography and interaction. Deliver a working preview and the checks you actually ran.
