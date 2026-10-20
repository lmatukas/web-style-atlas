---
schema_version: 1
id: "neo-brutalist"
name: "Neo Brutalist"
summary: "Loud poster language, exposed frames and hard shadows paired with a genuinely usable event programme."
family: "expressive"
tags: ["poster", "high-contrast", "playful"]
best_for: ["events", "campaign", "culture"]
avoid_for: []
density: "dense"
image_dependency: "low"
motion_level: "subtle"
complexity: "medium"
signature: {"composition": "Oversized poster words and offset stamp; thick framed programme in B.", "typography": "Heavy sans-serif with abrupt display/body scale contrast.", "navigation": "Blunt utility links and accessible day-selector buttons.", "content_rhythm": "Manifesto bands and exposed rows replace generic feature cards.", "imagery": "Original CSS symbols and hard-edged type, without required photography.", "color_and_material": "Lemon field, violet signal, near-black thick borders and hard shadows.", "interaction": "Pressed-state day filtering, local links and native access disclosure.", "motion": "Short link changes; no flashing or running marquee."}
status: "ready"
---

# Neo Brutalist

## Intent

Neo Brutalist is an outspoken direction for an independent ideas event. The fictional Loud Assembly brings designers, organisers and curious neighbours into the same room. It should feel immediate, public and slightly unruly while remaining genuinely usable. Oversized language, exposed borders and strong fields carry the offer. This is appropriate for campaigns, cultural events and organisations with a clear voice. It is less suitable when the primary task is sustained quiet reading or comparison across hundreds of small product records.

## Signature

Preserve four concrete traits: large poster-like words; thick visible outlines; hard offset shadows rather than soft depth; and bands of information that interrupt a regular page rhythm. The geometry is deliberately blunt. A tilted label or circular stamp is allowed, but the words still have a clear reading order. A uses a poster and manifesto sequence. B uses a framed programme whose columns can be inspected like a public notice. Both express the same voice without becoming the same landing page recolored.

## Typography

Use a heavy system sans-serif for display and body roles, giving headlines substantial weight and tight tracking. Scale contrast is abrupt: a short large proposition can sit beside a small practical date. Keep uppercase for short headlines and labels, not long paragraphs. Body explanations use ordinary sentence case and a comfortable line height. The largest heading is fluid and wraps deliberately on small screens. Numbers in the programme align with a consistent column edge rather than floating decoratively around event titles.

## Color and surfaces

Lemon yellow is the main paper field, pale violet is a supporting surface, and a saturated dark violet is an action field. Near-black borders and type remain visible everywhere they are used. Light text only appears on the dark accent. Every CSS palette reference comes from tokens.json via generated custom properties. Hard shadows reuse the text color; there is no hidden second palette. The page should retain its structural identity if another accessible brand palette replaces yellow and violet.

## Layout A

Begin with a bordered utility header showing the event identity and a working programme link. The primary poster pairs the three-line proposition with an offset circular label and a short practical event description. A full-width accent band states the date and place. The manifesto then uses oversized numbered statements separated by exposed rules. A session preview contrasts a dense list with a large side statement. Finish with an attendance explanation, a native access disclosure and an explicit fictional-event footer. There is no false checkout.

## Layout B

Open with a utility mast and a compact huge programme heading. A two-button day selector filters an actual local session list. Session rows use time, title, format and location columns within a thick grid; each day has distinct real demonstration content. A panel below lists the venue and accessibility guidance, then a short code of conduct and return link close the page. The programme is a usable inspection task. It is structurally different from the expressive poster, even though outlines, scale and blunt labels connect them.

## Imagery

The direction does not need photographs. Its circle, stars, offset blocks and outlines are original CSS shapes with no separate licensing requirement. Decorative symbols remain out of the accessibility tree. Do not substitute gray image placeholders for missing assets or introduce unrelated stock portraits to fill a gap. If an adaptation adds speaker photography, record redistribution rights, use local files and keep captions within the framed information system. Visual force should come from the structure before it comes from an asset.

## Navigation and interaction

The programme link opens the real B composition. Day buttons expose their selected state with aria-pressed and update a polite live status; inactive sessions are genuinely hidden. Keyboard focus uses an offset outline, and active selection has text and border changes as well as color. A native disclosure handles the access question. All navigation fragments resolve locally. The attendance area clearly explains that no ticket is sold and no data is collected, rather than displaying a decorative purchase button that implies a working payment system.

## Motion

A small hover translation can reinforce the hard-shadow metaphor on obvious links, but the references limit motion to brief color transitions. No marquee, flashing text or auto-running ticker is necessary for recognition. Reduced-motion mode disables transitions and keeps all poster words and schedule entries visible. Programme filtering is an immediate state change, not a long animated rearrangement. The large stamp remains still. Motion must never delay access to dates, venues or session information.

## Responsive behavior

At 1440 pixels let the poster use very large words and an intentionally disproportionate secondary stamp. At 768 pixels reduce the stamp and align practical information under the main message. At 360 pixels stack the poster, keep thick borders inside the viewport and wrap every short label safely. The B programme changes from a four-column row to a clear time-and-content stack; location follows the title. Day buttons remain large enough to operate. No page-level horizontal scrolling is permitted simply to preserve a desktop table.

## Accessibility

The examples target one page heading, ordered sections, useful landmarks, clear actions, visible focus and adequate token contrast. The source validator checks declared color pairs; actual browser evidence separately checks both compositions at three widths, reduced motion, local resources and keyboard behavior. Day state and live announcements are tested explicitly. The strong style is not an excuse to use blinking content, tiny body copy or ambiguous control labels. These checks are scoped demonstrations and are not a blanket claim of full WCAG compliance.

## Adaptation

Replace the fictional event with a campaign or programme that has a short strong proposition and practical information. Preserve exposed borders, scale contrast and readable information bands even if the destination platform uses different components. Keep programme data close to its accessible filter logic. A campaign without multiple days should remove the selector rather than leave a disabled imitation. Real tickets need a real verified booking destination and accurate legal information. Treat the visual demo and the operational event system as separate deliverables.

## Avoid

1. Do not soften all boundaries into pastel rounded cards; the exposed construction is a defining trait. 2. Do not make every line gigantic; practical details need a calm secondary scale. 3. Do not add flashing marquees or fake purchase controls; neither is required for an assertive, usable poster.

## Closest styles

Compared with swiss-grid, Neo Brutalist changes restrained hairlines into thick exposed frames, orderly ruled service rows into manifesto bands and a programme grid, and quiet indexed navigation into blunt action labels and interactive day selection. Compared with editorial-journal it also changes literary serif pacing into heavy short poster language. The planned bauhaus-geometric neighbor is not yet available: its future geometry should organise modular space rather than imitate these rough frames and offset labels. The pilot will compare actual A/B images across all three completed directions.
