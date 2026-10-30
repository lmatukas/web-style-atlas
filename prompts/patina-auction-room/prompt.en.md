# Patina Auction Room — website creation prompt

Build a working website in the user's project. Do not change the atlas or its task registry.

## Adapt to the project

- Business name, activity, audience: [FILL IN OR KEEP AN INVENTED DEMONSTRATION].
- Real objects, categories, estimates, provenance and rights: [APPROVED DETAILS].
- Viewing days, times, places and bid steps: [APPROVED DETAILS].
- Technology, integrations and project rules: [FILL IN].

Without an approved integration everything runs locally. Do not build payments, real bids, bookings or emails. Heading accent words stay upright; do not set one italic word in a headline. Say once, in the footer, that the auction studio is invented and the museum objects are not for sale; keep "demo" only on estimates, bids and the timer, because they sit next to real objects. Headings name the objects, dates and viewings. The museum objects are not for sale; the practice lot numbers and estimates have nothing to do with their real value.

## Design direction

A dark grey gallery wall and one large historic object under a warm spotlight. Warm white text, small uppercase labels, a thin red accent only for the timer. The first-screen scene is 70–110 svh; the object takes 60–75% of the width and the short text 28–36 ch. On a phone, keep a large, clear object scene. Use real CC0 or public-domain museum images with full provenance records. Only local OFL WOFF2 files: a high-contrast serif for headings and a monospaced sans for lot numbers, estimates and practical text. Up to two families and three weights, 200 KB for fonts and 1.5 MB for photographs. Lithuanian letters are required.

Keep the five signature features: the dark wall; one object and a controllable light; a serif with monospaced lot information; an inventory catalogue before a single-object file; an honestly working local service. Avoid a white-gallery poster, an architecture project monograph and generic gold price cards.

Headings at weight 300–400, 24–56 px; one campaign heading up to 80 px, 36–56 px on a phone. Text 16–20 px, line height 1.5–1.7. Labels 11–14 px with letter spacing. Between sections 80–160 px on desktop and 48–80 px on a phone. One main action per visible screen; controls at least 44 × 44 px.

## Two different layouts

A — auction catalogue: a large object scene; a row with the lot number, estimate and a demo timer; a catalogue of three to six objects; category and estimate filters that work together, a result count, an empty state and reset; a calendar of viewing days with a local registration form; practical notes.

B — single lot file: a large zoomable object next to a narrow data column; the real object description, provenance and museum accession number; a disclosure with condition notes; a light local bid table. Catalogue links must open exactly the chosen object with its photograph, provenance, estimate and minimum step. An unknown lot parameter falls back to a clear default object. On a phone, the scene and zoom come before the lot details.

## Signature and motion

A warm spotlight follows the pointer across the object. A labelled native range gives keyboard and touch users the same light. A separate 100–180% zoom slider shows its value as text. The light changes the real scene, not just a label. The initial and visitor-started animation settles within 2 s; there is a pause, a live reduced-motion response, stopping when the scene or window is hidden, and pagehide cleanup. Without motion the image stays complete. 3D is not required; if you add it, it needs a real local fallback image and a disabled-WebGL check.

## Local services

Viewing: a name with at least one letter, one of the clear date-and-time choices, 1–4 guests and a demonstration confirmation. Errors name the field and move focus to it. The result repeats the exact name, date, time and number of people, and says nothing was booked or sent. Editing hides the old result; reset clears the data.

Bid: every lot has a starting demo bid and a minimum step. Accept only a safe whole number of at least current + step and an exact multiple of the step. On success, update the current bid and the next minimum bid field. The exact summary has the name, lot number, object name and amount. This is a local, non-binding action. A demonstration confirmation is required. Insert input as text, not HTML.

The three-minute demo timer has pause, extend and reset; time stops in a hidden window. When it runs out, a bid is rejected with a clear error; extending makes bidding possible again. Reset returns that lot's starting bid, step and time. The timer must not disturb a screen reader every second. No data is stored or sent.

## Final check

Both layouts at 360, 390, 768 and 1440 px. One h1, a skip link, focus, keyboard and touch, Lithuanian letters, text contrast of at least 4.5:1 and 3:1 for controls. Check every category and estimate combination, every lot link, viewing times and guest limits, bid steps, empty and invalid fields, the timer running out, pause, extend and reset. Check that motion settles, that light and zoom really change, and that a hidden scene stops and cleans up. The console must have no errors and no external requests. Review all four desktop and phone PNGs and compare them with a light gallery and an architecture monograph for structure, typography and interaction. Deliver a working preview and the checks you actually ran.
