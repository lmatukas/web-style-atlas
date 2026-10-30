# Velvet Members Hall — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Club houses, rooms, events and membership levels: [FILL IN APPROVED DETAILS].
- Recommendation rules, real availability and integrations: [FILL IN].
- Technology and project rules: [APPLY THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields stay empty, use the invented private club "Orvelleth", with an Old Town house and a River house. One footer line says the club and its houses are invented; the booking and application forms each carry one short note that nothing is sent. Name rooms, dates, times and seat counts in the copy instead of mood words such as quiet or unhurried. Do not invent prices, member counts, awards, real bookings or email sending.

Keep the five signature features: folds of cherry velvet running through the first screen, with a light the visitor controls; ink margins and restrained brass; a light serif with a true italic and a narrow sans; either a spacious club introduction or an asymmetric personal letter; real, working local membership and event-seat services.

## Original creative brief

A: a full-height velvet scene with a plain heading on the left, "Six club evenings across two houses". One main action into the programme. Then three rooms in an uneven layout of text and entries, a two-month event programme with a booking table, two membership levels and native disclosures with practical notes. The event service is part of the programme, not a decorative link.

B: a vertical velvet scene on the left and a cream personal invitation letter on the right. On a phone, the scene has its own strong first screen and the letter follows it. Then a wide cream application table with a step indicator and one active form step, shared principles of conduct and practical notes. This is an application task, not a reshuffled club introduction.

Palette: cherry #3b0f17, ink black #100e10, warm brass #c7a976, cream #f3e9d7. The velvet folds move between deep wine and softly lit cherry. Keep a dark ground behind text. On the form paper use deep ink and clear borders. No decorative gold everywhere, no generic rounded cards, no Art Deco fans.

Local OFL fonts: Cormorant Garamond 400 with a separate true italic, and Barlow Condensed 400 for labels, text and controls. Another original pair with the same character is fine. Up to two families and three files, total size up to 200 KB, WOFF2 with Lithuanian letters and full OFL.txt files. Text 18 px, plain headings 38–56 px, one campaign heading up to 80 px, up to 54 px on a phone. Small uppercase labels 11–12 px with 2–3 px spacing.

Imagery: original SVG folds built from long curves and dark–light bands, a subtle directional velvet pile and one warm elliptical light. No photographs are needed. Do not replace the material with a flat cherry background. The first image fills at least 70% of the viewport height, on a phone too. Source URLs go only in the rights file; the example page has no external links.

Signature: the pointer moves a real light across the fabric. A clearly labelled native slider beside it gives keyboard and touch users the same action. Do not lock vertical scrolling and do not require dragging. The intro settles in 1.6 s, and a visitor's correction in 420 ms. There is a pause. Reduced motion shows the complete static fabric, and manual choices update at once. Stop the loop when the window or scene is hidden; when leaving the page, free resources and listeners. No WebGL or audio is needed.

Event seat service: two months, at least three demonstration events each, with clear dates, times, club houses and different seat limits. Changing the month clears the previous choice. The chosen entry updates the event summary and the maximum number of seats. Require a name, a whole number of seats from 1 to the event limit and confirmation of the local demonstration. Errors move focus to the actual invalid control. The confirmation shows the exact name, event, date, time, house and seat count, and says no seats were booked, no data was sent and no payment is taken. Changing a choice hides the old summary. Reset clears the name, event and consent and returns to the first month and one seat.

Membership application: step one asks for a full name, a valid email and a House member or House friend level. Step two asks for the preferred Old Town house or River house and how we should meet. This can be an existing member's recommendation, which needs the recommender's name, or an equal introductory conversation without a recommendation. The hidden recommendation field must be disabled and not required. Step three shows an exact review of every choice, a way back to edit and a required confirmation of the local demonstration. Going back keeps the data and clears the old confirmation. Reset clears everything and returns to step one. Validate the earlier steps again before the final result. Insert names and other input with textContent, not HTML. Do not store or send any data.

## Final check

Check both layouts at 360, 390, 768 and 1440 px, one h1, the skip link, focus, Lithuanian letters and contrast. Review the four final desktop and phone PNGs. Compare with an ornamental Art Deco invitation and a choreographic stage at least for structure, typography and interaction.

Test the real changes of the light spot with a mouse, keyboard and touch, the intro settling, pause, a live reduced-motion change, stopping a hidden scene and pagehide cleanup. In the forms, check every event and seat limit, both memberships, both houses and both recommendation paths. Try empty and invalid data, the exact result, going back, editing, hiding the old summary and reset. Check accessibility in the opened form steps too. The console must have no errors and no external assets may load. Deliver a working preview and the checks you actually ran; publish only when the user asks.
