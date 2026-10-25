# Ember Course Room — website creation prompt

Build a working website in the user's project. Do not change the atlas or its task registry.

## Adapt to the project

- Restaurant, audience, place and season story: [FILL IN OR KEEP AN INVENTED DEMONSTRATION].
- Real tasting menu, length, course and drink descriptions: [FILL IN].
- Approved room plan, table capacity, opening hours and booking rules: [FILL IN].
- Images, rights, technology and an authorised booking integration: [FILL IN].

Without an approved integration the booking stays local, with no real sending, payment, order or storage of customer data. Search for the example business name to check it does not match a real company. Do not use real restaurants' marks, look or unapproved ratings. AI images are mood illustrations, not proof of a real dish, ingredients or a working restaurant.

## Design direction

Candlelit darkness (~#120d0a), one warm amber accent and cream text. One large image — a dark table, a ceramic plate, glass, linen and a circle of candlelight. The first screen is 70–110 svh, the image itself at least 70% of the height and about 60–75% of the width on desktop. A short invitation within 28–36 ch: the name, the season and one button, "Book an evening". On a phone, build its own tall composition that keeps the plate and candle visible, not a shrunken desktop page.

Five fixed features: a large candlelit table image; a numbered evening clock; a true serif italic for courses and small uppercase sans labels; light that warms as you scroll; a real choice of place on a room plan. The design identity must survive a change of name and accent colour.

Local OFL WOFF2 files: an elegant 300–400 serif with a true italic for course names, and a calm sans 400 for text. Up to two families, three weights and 200 KB; all Lithuanian letters, the full OFL.txt with the fonts, no CDN. Headings 24–56 px, one campaign heading up to 80 px, 36–56 px on a phone. Text 16–20 px, 1.5–1.7 line height; labels 11–14 px with 1–5 px spacing. Between sections 80–160 px on desktop, 48–80 px on a phone; margins 48–96 and 20–28 px. Control targets at least 44 × 44 px. One main CTA per visible screen.

## Two different layouts

A — the tasting menu's progress. A large table image with a short invitation beside it. Then an asymmetric season introduction and the menu: a wide sticky photograph scene beside 8–12 numbered courses. Each has an evening time, a short description, and a wine and a non-alcoholic pairing. As you scroll, the active course, the scene photograph, the time, the chapter name and the strength of the warm light change. Native previous / next course arrows work too. The dessert image leaves a pause; then a light booking section and arrival notes. There may be fewer photographs than courses: then label the chapter mood clearly and do not present each text as an exact photograph.

B — table booking atelier. A panoramic evening image with a wide invitation at the bottom; below it a spacious room plan on the left and a compact date-and-time log on the right. One shared confirmation action. Once a time is chosen, the tables that are really free and fit the group are shown. The confirmation gives an exact local summary. Then three clickable moments of the evening change one photograph and the light, and practical arrival notes close the page. B is a spatial choice tool, not a reshuffled A menu.

## Signature and motion

The evening time, the course, the photograph and the light change together. Scrolling stays natural — no locking or section snapping. Clear alternative controls work with keyboard and touch. Content must be readable even when the signature scenes are off screen.

One opening light episode ends within 1.5–2 s. No constant candle flicker, automatic carousel or sound. Pause stops the background light change, but the menu and booking still work. Reduced motion shows the complete final image at once; when a choice changes, the image updates without animation. When the window is hidden or the scene leaves the screen, scheduling stops. On pagehide, release RAF, observers and listeners; coming back from the browser's cache restores working controls. WebGL is not needed; the local photograph is the static path.

## Working booking

1. Choose a date from tomorrow up to 60 days ahead, 1–6 guests, a time, a specific table, a drink pairing and an optional allergy note of up to 300 characters.
2. Build a clear local model of demonstration availability. In the example, Mondays are closed and some dates and the latest time are full. The list of free times and the tables depend on the date and the number of guests. This is not a real availability claim.
3. The room plan must make spatial sense: windows, the entrance, the kitchen, six tables in different places, their visible capacity and state. Only a free table of the right size can be chosen. Chosen, free, taken and too-small places are marked with text and shape, not colour alone.
4. When the date or guest count changes, clear the old time and table; when the time changes, clear the old table. Say what needs choosing again. Check every constraint again on submit rather than trusting a greyed-out button.
5. Errors are clear, tied to their controls, with a visible message and focus on the first invalid choice. Check the date against the local calendar, with no UTC day shift. The length is counted from the chosen time, not from the start of the menu story.
6. Require a clear acknowledgement that this is a demonstration. The summary lists the date, start and end, guests, table number and place, the menu, the drink choice and the exact note. Label: "Local summary. The booking was not sent." Allergy arrangements are not treated as confirmed.
7. "Edit" keeps the choices. "Clear" removes the summary and the choices so you can start again. Do not collect a name or email if the local demonstration does not need them. No localStorage or backend. Show notes as text, not HTML.
8. Until JavaScript initialises, the form is disabled and cannot trigger an accidental GET or other submission. Noscript explains the limit; the menu and photographs are still visible.

## Image and font rights

Use 2–4 real CC0 or public-domain table and food photographs. If no suitable free-licence image exists, original AI illustrations are allowed under the tool's terms for commercial use and distribution. Do not use a stock library with its own restrictive licence. Record each file's origin, creator, licence and edits in assets.json and RIGHTS.txt. For AI images, record the tool / available version, the date, the full prompt and any manual edits, with the licence "AI-generated, original, distributed under the repository MIT terms". Do not pass off an AI image as a real restaurant photograph. No trademarks, people, known products or a living artist's style. Check images for fake lettering and distorted objects.

Images are local WebP with metadata removed, up to 1.5 MB in total; fonts up to 200 KB. Source and tool URLs go only in the rights records. The page itself has only local links. The four canonical A/B desktop / phone PNG previews may be up to 3 MiB, because the direction depends heavily on photography; other versioned media must stay within the project budget.

## Accessibility, distinction and checks

One h1, clear landmarks, a skip link, consistent headings, real labels and visible focus. With a keyboard, touch and mouse you can move through the menu, choose a time and table, confirm, edit and clear. Images have meaningful alt text. Text has contrast of at least 4.5:1, large text and control borders at least 3:1, and the light booking section has its own contrast-pair evidence. Check 360, 390, 768 and 1440 px, Lithuanian letters, text zoom, disabled JavaScript, reduced motion, a hidden window and pagehide.

Closest neighbours: Editorial Journal and Art Deco. The first relies on a literary masthead, chapters and a narrow essay with notes; here there is a large sticky photograph, evening courses and a spatial service. The second is an ornamental, axial evening invitation with geometric navigation and an event programme; here there is natural material, a true italic, a dark table and a capacity-checking booking. At least three differences from each, including structure, must remain after applying a neutral event brief.

Avoid exactly these three anti-patterns: delivery-app dish cards with a basket; gold Art Deco fans and stepped frames; a magazine masthead and long essays with margin notes. Deliver four actually reviewed PNGs, a rubric of at least 10/12 with no zero, and evidence for all ten luxury conditions. Do not mark checks you did not run as PASS.
