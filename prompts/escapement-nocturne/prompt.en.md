# Escapement Nocturne — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved models, calibre specifications, prices, salons and integrations: [FILL IN OR KEEP A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR APPLY THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields stay empty, use the invented watch atelier "Zevraqelle" and an original concept watch, "Nocturne N.01". Mark the invented figures, prices and salons clearly. Make no real order, visit booking or payment.

## Direction and fixed features

One precisely code-drawn watch on a deep black background owns the first screen. Its case, fine hands, gear wheels, bridges and balance spring should read as one coherent object. Do not use any real watch model or copy any website.

Keep the five features: one large watch; in variant A, three slow story chapters around one sticky object; a light, fine serif with a calm sans; a warm, light ending for the selection and the service; an exact link between the selection, the price and the visit. Avoid a decorative medallion in place of a movement, endless spinning with neon, and fake purchases or hidden surcharges.

Palette: #0b0b0c, #19191b, cream #f0e9dc, clear secondary text #b3ada2, metal accent #c4a477. For the service: #eee7d9 paper, #28251f text and #71572f accent. Surfaces are flat; metal gradients only on the object, never on buttons.

Use local OFL Crimson Pro Light (300) for headings and numbers and geometric Jost 400 for text, or an equivalent pair. No more than two families and three weights, up to 200 KB, Lithuanian letters and full OFL.txt files. Headings 24–56 px; one product heading may go up to 80 px. Labels 11–14 px, uppercase with 1–3 px letter spacing. Tabular numerals for figures. No external font CDN.

## Layouts and real behaviour

A: short editorial texts on the left, a 75 svh watch scene on the right. Chapter one is a calm dial; chapter two, on scroll, a see-through dial and an open gear train; chapter three, a balance detail. Then four figures (40 mm, 72 h, 168 parts, 8.6 mm; all concept values), a close-up of the movement with three craft steps, and a light visit service. One main action per visible screen.

B: the watch on the left, a separate light selection table on the right. Case: warm gold +€1,600, polished steel +€0, bronze +€600. Dial: black +€0, night blue +€250, ivory +€350. Strap: black leather +€0, tobacco leather +€180, steel mesh +€480. Base €6,800. The total is always base + three surcharges. Start: gold, black, black leather — €8,400. Every choice changes the object, the price, the summary and the set-up carried into the visit. Reset returns the starting set-up. Below the table: the full selection summary with base, options and final total, the specifications, then the visit.

Draw an original native WebGL object without external libraries, and provide a real local SVG fallback. In normal mode the hands show the device's real time; one update per second is enough. Opening the dial must work on scroll, with a mouse, a horizontal touch swipe and the keyboard. Also provide a plain range input and a button: nothing may depend on hover or a precise swipe. On a phone, vertical swipes must keep scrolling the page.

Visit form: an invented salon, a date from tomorrow up to 90 days ahead in the Europe/Vilnius calendar, a free time, a first name of at least 2 characters, email, and confirmation that this is a demonstration. Sundays are not allowed; 14:00 is taken in the demonstration. Give each error a text and aria-describedby, a shared error count and focus on the first invalid field. The local confirmation repeats the salon, date, time, the exact watch set-up and price, and says clearly that nothing was sent. Hide a stale confirmation when the selection or form changes; clearing must work. Do not store personal data.

Motion: one arrival of up to 1450 ms, then it stops. After that only the visitor's actions and a meaningful 1 Hz clock, with no constant RAF or spinning. Pause also stops the clock. Reduced motion shows the detailed static SVG right away, with the time frozen and no loops; choices may simply redraw the static image. Unavailable WebGL and a lost context show a clearly labelled fallback. A hidden window or scene does not track time or draw; pagehide frees GPU resources, timers, observers and Blob URLs.

## Final check

Check A and B at 360, 390, 768 and 1440 px. On a phone the scene is at least 72 svh, the watch first, followed by readable chapters or choices; no covered controls and no sideways scrolling.

Test the prices and visible changes of all 27 combinations in normal, reduced-motion and disabled-WebGL modes. Check the real hand directions with a frozen time, scroll/reveal, arrow keys, swipe, pause, a live reduced-motion change, context loss and resource cleanup. Real 3D is checked through the API and pixels, not only a diagnostic object.

Check every form error, a past date, a Sunday, a date too far ahead, a taken time, the accuracy of the confirmation, editing and clearing. Keyboard, visible focus, Lithuanian letters, contrast, accessibility and the loading of every local asset must work. Review the four final A/B desktop/phone images. Record the asset rights and the checks you actually ran. Finish the build; a plan alone is not a result. Publish only when the user asks for it.
