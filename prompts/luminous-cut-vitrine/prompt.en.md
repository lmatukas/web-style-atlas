# Luminous Cut Vitrine — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved pieces, stone details, prices, salons and integrations: [FILL IN OR KEEP A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR APPLY THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields stay empty, use the invented demonstration jewellery house "Quenvaire", three pieces (the "Dawn" ring, the "Dew" pendant and the "Afterglow" earrings) and two invented salons. If they are filled in, rely only on approved information. Keep the five signature features: one original stone in the centre with plenty of empty space; a thin display ring and text in the corners instead of a hero card; a high-contrast serif with a humanist sans and spaced-out labels; colour only in the stone's light and the chosen metal; a quiet but fully working service.

Composition A: a collection display, three portrait 4:5 cards, a craft section with a facet diagram, three services and a visit booking. Composition B: a single-piece page — a sticky stone on the left; metal, stone size, ring size and engraving choices on the right; an exact demonstration price, specifications and the same booking. B has its own structure and job; do not reuse the A sections with only a new background.

## Original creative brief

Write your own copy, proportions, pieces and motion. Do not copy real jewellers' websites, their scenes, piece names or logos. Quenvaire is an invented project. Do not claim awards, certificates, real customers or manufacturing facts. Stone colour, clarity, weight and prices are marked as demonstration values everywhere.

Create an original round brilliant in real native WebGL, without a CDN or an imported model: a table, eight star facets, eight crown facets, sixteen upper girdle facets, eight main pavilion facets and sixteen lower girdle facets, with a thin girdle — 57 in total. Use depth testing, flat facet normals, studio environment light, a double reflection in the pavilion and a different refractive index for each colour channel, so coloured "fire" appears at the facet edges. In layout B, hold the stone in six metal claws. Use a render of the same scene as the static PNG fallback and as the collection card images. If more images are needed, use only CC0 or public-domain shots, or AI images under the project's rules, with their origin recorded.

Palette: ivory #f7f3ec background, a deeper plate colour #ede5d8, charcoal #1f1c19 text and one thin warm-metal accent #7a5c2e for numbers, marks and the display ring. Type: local OFL WOFF2 files — a high-contrast serif for headings (400) and a humanist sans for text and uppercase labels (12 px, 2–3 px letter spacing). Headings 30–56 px, the piece name in layout B up to 72 px. The fonts must include Lithuanian letters and the full OFL.txt; total size up to 200 KB.

In layout A, one stone owns the first screen, with a scene at least 70% of the viewport height. A small label at the top; bottom left, a small serif heading "Light that finds its way."; on the right, one thin-outlined pill action "Discover the collection". Give the phone its own composition: label, a tall stone scene, stone details, heading and action. Do not squeeze the desktop layout.

Signature: the stone turns with the mouse (by dragging), with touch (a horizontal swipe; a vertical swipe still scrolls the page) and with the arrow keys when the scene has focus; there are also two turn buttons. The light in the facets changes in real time with the angle and the pointer position.

In layout B, build the selection: metal (white, yellow or rose gold — included; platinum +€650), stone (0.5 ct €4,200; 1.0 ct €9,800; 1.5 ct €16,400; 2.0 ct €26,900), ring size 48–60 and an engraving of up to 18 characters with a preview on a metal band. Total = stone + metal surcharge. The metal changes the claw colour in the 3D scene and the ring image in the summary; the stone size changes the stone's scale. Characters that cannot be engraved show a clear error. Reset returns to white gold, 1.0 ct, size 54 and an empty engraving.

In both layouts, build a visit booking: salon, one of the next six working days (closed on Sunday), a free time (one time is taken each day), topic, first name, email or phone, and a confirmation that this is a demonstration. Each missing field has its own error, a shared summary and focus on the first invalid field. The confirmation names the exact salon, day, time and topic and says nothing was sent. Make no real payment, order or data transfer.

Motion: one arrival turn of up to 1400 ms, then it stops. After that only the visitor's actions move it. Pause stops the animation and the pointer light. Reduced-motion mode shows the static stone image right away, with no animation loop. Unavailable WebGL and a lost context show the same clearly labelled fallback. Stop work when the window or the scene is hidden; on pagehide, free GPU resources and observers. No audio API is needed.

## Final check

Check both layouts at 360, 390, 768 and 1440 px. Test rotation with a mouse, touch and keyboard, the prices of all 16 metal and stone combinations, the engraving error, reset, every booking error, the confirmation and clearing. Check the real 3D draw calls, the pixel change when another metal is chosen, pause, context loss and resource cleanup. Check reduced motion and blocked WebGL separately. A static image alone does not prove working 3D.

Review the four final A/B desktop/phone images, visible focus, contrast, the console and font loading. Make sure there are no external requests, empty links, fake purchases or hidden choices. Mark the demonstration project clearly in the footer. Deliver a working preview, a summary of the checks you actually ran, asset provenance and the remaining limits. Publish only when the user asks for it. Finish the build; a plan alone is not a result.
