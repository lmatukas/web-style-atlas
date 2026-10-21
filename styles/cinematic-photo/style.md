---
schema_version: 1
id: "cinematic-photo"
name: "Cinematic Photo"
summary: "Large photographic frames, dark breathing space and a slow scene sequence for visual storytelling."
family: "photographic"
tags: ["image-led", "cinematic", "calm"]
best_for: ["travel", "portfolio", "hospitality"]
avoid_for: ["documentation", "data"]
density: "balanced"
image_dependency: "high"
motion_level: "subtle"
complexity: "medium"
signature: {"composition": "Broad photographic cover and dark breathing space; centred vertical scene filmstrip in B.", "typography": "Quiet serif narrative headings and small neutral caption hierarchy.", "navigation": "Visible journal links and numbered local chapter anchors.", "content_rhythm": "Large real photographic scenes interrupted by short reflections.", "imagery": "Rights-documented local forest mist and sunset lake photographs, deliberately cropped.", "color_and_material": "Deep green-black, off-white, muted captions and a restrained warm signal.", "interaction": "Local scene navigation, visible focus and native credit disclosure.", "motion": "Static frames with short link transitions; no required video or parallax."}
status: "ready"
---

# Cinematic Photo

## Intent

Cinematic Photo is a photographic direction for a visual travel journal, a place-led portfolio or an atmospheric hospitality story. The fictional Afterlight journal uses real landscapes to invite unhurried attention. A visitor should feel the scale of an image before reading supporting prose. Photography controls the sequence, while typography provides a small number of clear narrative anchors. The direction requires a credible image supply; a gradient or generic gray rectangle cannot replace its primary material. No video, autoplay or WebGL is necessary.

## Signature

Preserve four relationships: large deliberate photographic frames; substantial dark negative space around them; restrained captions that remain attached to their images; and a slow sequence of scenes instead of a feature-card grid. A begins with one dominant image and then moves into a broader editorial introduction and selected scene. B reads vertically as a numbered visual notebook. Keep each photograph large enough to reveal composition, weather and light. The page should still communicate its visual identity when all animation is turned off.

## Typography

Use a quiet serif display voice for the few narrative headings and a neutral sans-serif for navigation, captions and practical metadata. Headings are large but not so frequent that they compete with each image. Body copy uses a comfortable line height and a moderate measure; captions are smaller but remain readable. Italics can mark a reflective phrase, not an entire paragraph. The actual references use system Georgia and Arial fallbacks, and include Lithuanian characters. Brand adaptations may change families while retaining the display-to-caption relationship.

## Color and surfaces

Deep green-black is the base surface. Off-white supports readable text, muted pale green carries secondary captions, and a light warm accent marks a small action or chapter signal. All interface colors use generated semantic tokens. Photographic colors remain inside the licensed image assets rather than forming a second hardcoded UI palette. Text over the hero sits in the darkest portion of a token-derived gradient; other prose is placed on an opaque background. Inspect the actual crop and text contrast at every responsive width.

## Layout A

A narrow masthead gives the journal identity and visible local navigation. The large opening photograph is framed by dark space, with a short title near its lower edge and a discreet caption beneath. A generous introduction then explains the journal in a few deliberate lines. A selected-scene section pairs the sunset lake photograph with a short observation and a link to the working visual notebook. A final approach note describes the editorial pace. The footer provides a clear demonstration identity and concise image credits without imitating a travel booking service.

## Layout B

Replace the broad cover composition with a centred title and a compact chapter index. Two numbered scenes follow in a narrow vertical filmstrip: first forest mist, then a lake at sunset. Each scene gives the photograph its own frame, a meaningful caption and a short paragraph. A final reflection closes the sequence, followed by an image-credit disclosure and a return link. The page is intended to be read through rather than browsed as a card catalogue. Captions and chapter numbers create orientation without overwhelming the photographs.

## Imagery

The actual local assets are a misty forest photographed by Austin Schmid and Sprague Lake at sunset credited to NPS/M. Reed. Their source pages and licensing declarations are recorded in assets.json and the bundled rights note. The forest source declares pre-2017 CC0 publication; the NPS photograph is identified as a public-domain government work. Assets are resized, metadata-stripped and encoded locally. They are examples from different locations, not evidence of one continuous reported journey. Never relabel an unrelated stock photograph as a specific destination.

## Navigation and interaction

Navigation is visible and small, with ordinary links to local sections and the second composition. The notebook uses numbered chapter anchors. A native image-credit disclosure provides source context without a custom modal. Keyboard focus is clearly offset from links, and every informative image has a subject-based alternative description. There is no pretend player, fake booking button or unimplemented carousel. When an adaptation needs a gallery, introduce it as a real operable control with the same caption discipline rather than adding decorative arrows.

## Motion

Movement is optional and very limited. The references use short link-color transitions and no animated image movement. Reduced-motion removes the transitions entirely. Do not add scroll-jacking, forced parallax or autoplay to manufacture a cinematic label. Framing, crop, negative space and the ordering of scenes should create the atmosphere on their own. A still screenshot must contain complete readable content, and the first frame should work before any optional enhancement runs.

## Responsive behavior

At 1440 pixels the cover photograph is broad and framed, while the selected scene uses unequal image-and-text columns. At 768 pixels reduce margins and display scale without moving captions away from their photographs. At 360 pixels keep a meaningful portrait crop of the hero, place the title over its darker lower edge and stack the selected scene. The B filmstrip remains one column at every width, with chapter numbers moving above their image. Images have reserved aspect ratios so loading does not push essential navigation around.

## Accessibility

Targets include clear landmarks, one page heading, usable local navigation, visible focus, meaningful alternatives and adequate token contrast. Evidence records the actual six variant/viewport combinations, four preview inspections and image loading. The P08 browser gate separately runs axe, overflow, control and keyboard checks. Automated contrast tools cannot fully judge text over every part of a photograph, so the actual responsive hero crops must also be inspected visually. These scoped checks are not a claim of complete WCAG certification.

## Adaptation

Begin with two or more photographs that share a coherent visual treatment and have documented redistribution rights. Replace the fictional journal copy with truthful editorial or place information. Preserve the large-frame-to-small-caption relationship and the slow sequence when moving to WordPress, React or another platform. If a project has no image budget or no rights-cleared photographs, choose a low-image direction instead. Record actual destination names carefully, keep credit information with the assets and avoid adding a booking workflow unless it is genuinely implemented.

## Avoid

1. Do not substitute placeholder gradients for the photographic story; the direction depends on real imagery. 2. Do not cover busy bright areas with small pale text; move text onto a reliable surface. 3. Do not add autoplay video or scroll-jacking as a shortcut to atmosphere; framing and sequence should do the work.

## Closest styles

Architectural Monograph is the nearest ready photographic neighbor. Cinematic Photo gives atmospheric real landscape frames a dark setting, restrained serif narrative and slow scene-filmstrip rhythm. Architectural Monograph uses light paper, documented building photographs, an interpretive plan and analytic source captions. Scene/chapter navigation differs from a numbered project atlas and figure-record routes. Field Notes also uses a forest image, but its annotation rail, schematic route and timed notebook entries make the document primary rather than the photographic sequence. P13 compares all actual A/B desktop/mobile frames; image scale, navigation and reading rhythm carry the difference.
