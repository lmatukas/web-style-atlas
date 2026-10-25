---
schema_version: 1
id: velvet-members-hall
name: Velvet Members Hall
summary: Wine velvet folds, a movable pool of light and an intimate club programme lead to a seat reservation or a three-step personal membership letter.
family: tactile
tags: [luxury, warm, cinematic, task-led, asymmetric]
best_for: [hospitality, culture, services, events]
avoid_for: [data, documentation]
density: sparse
image_dependency: low
motion_level: subtle
complexity: medium
signature:
  composition: A is a full-width velvet arrival followed by unequal room and programme spreads; B places a tall velvet panel beside a cream invitation and a progressive application worktable.
  typography: Local Cormorant Garamond 400 with a real italic face, paired with narrow Barlow Condensed 400 and small tracked labels.
  navigation: A quiet house masthead, native programme and membership links, two month controls and explicit application back/reset actions.
  content_rhythm: An invitation, three rooms, a six-evening programme, two membership levels and native house notes; B follows the personal letter and three-step application.
  imagery: Original code-generated velvet folds, broad curved folds and a warm light pool; no photographs, borrowed logos or decorative picture frames.
  color_and_material: Deep cherry velvet and ink-black margins, warm brass labels and cream type; the application uses cream paper with wine-black ink.
  interaction: Pointer and native range controls move actual light across velvet; month and event choices change seat limits, while referral and house choices change the membership letter.
  motion: A 1.6-second opening light sweep settles; user adjustments settle in 420ms; pause, hidden/offscreen suspension and immediate reduced-motion controls remain available.
status: ready
prompt_path: prompts/velvet-members-hall/prompt.en.md
---

# Velvet Members Hall

## Intent

Velvet Members Hall is an intimate private-club direction for the fictional house Orvelleth. It gives social hospitality a tactile, quiet identity through generated velvet and a personal invitation. Visitors can discover rooms, select a sample evening and prepare a local seat reservation, or follow a separate membership application. Programme dates, capacity and membership benefits are explicitly demonstration data.

## Signature

Preserve five invariants: full-height wine velvet with a movable light pool; ink margins and restrained brass labels; a light serif with true italic and narrow sans; a spacious club programme versus an asymmetric personal invitation; and working local membership and seat services. Long curve-defined folds and a soft cross-light create material without raster assets. Text retains a dark backing so lighting changes never sacrifice legibility.

## Typography

Cormorant Garamond 400 supplies headings, room numerals and the house name. A genuine italic face gives the second phrase of headings an intimate, written cadence. Barlow Condensed 400 carries text, labels and form controls without artificial horizontal scaling. All three files are local WOFF2 with Latin and Lithuanian coverage and adjacent full OFL licenses. Main text is 18 pixels, small practical notes 15–16 pixels, and tracked uppercase labels 11–12 pixels. One campaign heading reaches 80 pixels on desktop and 54 on phones; normal section headings stay within 38–56 pixels.

## Color and surfaces

Deep cherry folds rise out of wine-black shadow. Brass is reserved for light, fine boundaries and short labels. Cream text stays readable against the richest fold colour. Ink-black margins let the material breathe; no gold gradient is used as a substitute for the cloth. The membership letter and application are cream with dark ink, clear borders and explicit radio states. Error colours differ between dark and paper surfaces.

## Layout A

A full-height velvet arrival carries a short invitation on the left, a quiet house marker on the right and one programme link. A rooms spread pairs an introductory statement with three numbered records. The evening section holds a short sticky introduction beside the November/December programme and an inline reservation desk. Six radio rows expose dates, times, houses and demonstration seat limits. Two spacious membership descriptions lead to the alternate application. Native disclosures close the house story with practical boundaries.

## Layout B

The opening is an asymmetric spread: a tall velvet panel and a cream personal letter with three small step records. On phones the entire velvet scene comes first and the letter follows. The application is a broad cream worktable with a step rail and one changing form panel. Step one collects name, email and membership level. Step two selects a main house and either a member recommendation or an introductory conversation. Step three presents an exact review and requires the local-demo acknowledgement. A house-values section and practical notes finish the page.

## Imagery

Only original inline SVG and CSS are used for the material and light. Curved bands share a fold gradient; an elliptical radial light moves across the actual surface. A second dark gradient protects the copy. This is a code-generated texture, the explicit S58 exception to photograph-led luxury scenes. No WebGL, AI imagery, photography, stock license, recording or third-party model is involved. Asset records contain only the three licensed fonts; RIGHTS.txt documents their sources and the original MIT artwork.

## Navigation and interaction

Native house and section links preserve scrolling and keyboard behaviour. The light follows the pointer over the scene; a labelled native range provides equivalent keyboard and touch access. Switching months clears the prior evening selection and invalidates any confirmation. Reservation checks require an event, a name containing a letter, an integer seat count within that event's limit and a demonstration acknowledgement. The exact date, time, house and count appear in the local summary. The membership form preserves choices when going back, conditionally requires the recommending name, and revalidates earlier steps before confirmation. All user text is inserted as text, never HTML.

## Motion

The opening light moves for 1.6 seconds and stops. Subsequent pointer or range adjustments run finite 420-millisecond episodes. Pause preserves current progress; manual choices can still update immediately. Reduced motion displays the final surface with zero animation loops. Preference changes apply live. Leaving the scene or hiding the document suspends work; pagehide cancels the frame, disconnects observation and removes runtime listeners. Native scrolling is never intercepted. The static SVG is the actual complete material, so unsupported graphics APIs do not remove the scene or forms.

## Responsive behavior

Desktop uses generous 64-pixel margins, 120-pixel section spacing and unequal spreads. Tablet reduces gutters while retaining the contrasting visitor tasks. At 650 pixels the room, programme and application layouts stack; the programme introduction stops sticking. The invitation keeps its lighting controls on the cloth, before the long mobile letter. The mobile hero keeps a tall material surface and deliberately wrapped heading, rather than shrinking a desktop composition. Application steps become a compact horizontal rail, each with readable labels. Event dates and names retain separate columns. Forms occupy the available width, buttons wrap naturally and long names or email addresses wrap inside summaries.

## Accessibility

Use a skip link, one page heading, visible focus and native buttons, ranges, radios, selects and disclosures. Errors announce and focus the offending control. Step changes focus their heading; confirmations are focused status regions. Hidden referral fields are also disabled and cease to be required. Month buttons expose pressed state and the step rail exposes current step. Reduced motion retains every choice, and touch gestures keep vertical scrolling. Contrast pairs cover dark text, cream paper, brass, control boundaries and both error treatments. No personal data is persisted or transmitted.

## Adaptation

Replace the invented house with verified owner copy and real programme data. Keep spacious hospitality records rather than a universal card grid. Preserve a recommendation-free introduction path unless actual policy requires otherwise. A production membership service needs explicit privacy, admission and pricing rules plus an authorised backend; a real reservation needs availability checked at submission. Until those exist, retain the clear local-demo confirmation. The velvet can become another generated woven material, but keep a legible copy zone, finite light and equivalent manual controls.

## Avoid

1. Do not replace the velvet with Art Deco fan, diamond or stepped-frame ornaments.
2. Do not turn the club programme into a choreographic performer stage or draggable rehearsal diagram.
3. Do not build generic gold-on-black pricing cards with decorative, nonfunctional application buttons.

## Closest styles

Art Deco centres an axial geometric invitation and fan navigation; this direction uses irregular material folds, an unequal club programme and a progressive membership letter. Its italic serif and condensed practical text also differ from the architectural ornament and symmetrical rules. Choreographic Stage makes performers, rehearsal movement and stage geometry the subject; here the light is a quiet material interaction and the useful tasks are seats and membership. Structure, navigation, material and motion distinguish both neighbours even with a neutral evening-club brief. Brass and darkness alone are not the distinguishing evidence.
