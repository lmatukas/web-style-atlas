# Midnight Vestibule — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved rooms, prices, extras, photographs and integrations: [FILL IN OR KEEP A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR APPLY THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields stay empty, use the invented demonstration city hotel "Kelvarre" with three room types. If they are filled in, rely only on approved information. Keep the five signature features: a night photograph owns the first screen, with only the name and one action on it; engraved uppercase headings with wide spacing; sections of one large photograph and a short text each; one warm lamp colour on a night-blue ground; a booking drawer that slides in from the side and always shows the exact total.

Composition A: a full-screen night photograph, three facts, sections — lobby, rooms, restaurant under the dome, spa, surroundings — and the drawer. Composition B: a shorter photograph band with the chosen dates, a room gallery (a large photograph and a narrow description, alternating sides), a comparison table and the same drawer. B has its own structure and job; do not reuse the A sections with only a new background.

## Original creative brief

Write your own copy, room descriptions, prices and composition. Do not copy real hotel websites, their names or logos. Kelvarre is an invented project. Do not claim stars, awards or reviews.

Use 2–4 CC0 or public-domain photographs of night architecture and interiors (WebP, up to 1.5 MB in total). Crop them so no real lettering, signs or names show. Use AI images only under the project's rules and with their origin recorded. Rights and sources belong in the rights file only, not on the page.

Palette: night blue #0a0f1a, panels #131b2c, drawer #0f1626, cream text #f1e8d8, warm lamp colour #e4b36a for labels, prices, chosen dates and the drawer edge. Type: local OFL WOFF2 files — an engraved-style serif in uppercase for headings (0.08–0.4 em spacing) and a calm sans for text. The fonts must include Lithuanian letters and the full OFL.txt, up to 200 KB.

On the first screen, a night photograph at full height. At the top, only a spaced-out name and one pill button, "Book". At the bottom, a small label, a two-line heading "The night begins in the lobby." and one sentence. On a phone the photograph and heading fill almost the whole screen.

Signature: the booking drawer slides in from the right. It holds a month grid (first tap sets arrival, the second sets departure, up to 14 nights), a guest count of 1–4, the room type and extras. Rooms: City room €240 a night for up to 2 guests; Gallery suite €360 for up to 3; Dome apartment €520 for up to 4. Breakfast €28 per person per night, late check-out €40 once. Total = nights × rate + breakfast + late check-out, recalculated at once. Errors: no dates chosen, no room chosen, too many guests for the room, demonstration not confirmed. The confirmation names the exact room, dates, nights, guests, extras and total, and says nothing was sent. Reset clears everything. The drawer is a modal dialog: focus stays inside, Escape closes it, focus returns to the button.

Motion: on load, the lanterns in the photograph come on once over 1.6 s and stop; after that a warm glow follows the pointer. Pause stops both. Reduced-motion mode shows the lit photograph right away and the drawer opens without sliding. Stop work when the window or the scene is hidden; on pagehide, free the observers. No WebGL or audio is needed.

## Final check

Check both layouts at 360, 390, 768 and 1440 px. Test the drawer, calendar, guests, rooms, extras, every error, the confirmation and reset with a keyboard and a mouse. Recalculate several combinations of dates, guests and rooms. Make sure the lantern episode ends, pause works and reduced motion shows the final image with no loop.

Review the four final A/B desktop/phone images, visible focus, contrast, the console and font loading. Make sure there are no external requests, empty links, fake bookings or real names in the photographs. Say once, in the footer, that the hotel, rooms and prices are invented, and once beside the booking that nothing is sent. Headings name rooms, sizes, times and places; avoid mood words such as quiet. Deliver a working preview, a summary of the checks you actually ran, asset provenance and the remaining limits. Publish only when the user asks for it. Finish the build; a plan alone is not a result.
