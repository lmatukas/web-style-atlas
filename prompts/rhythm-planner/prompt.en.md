# Rhythm Planner — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved content, photographs and integrations: [FILL IN OR BUILD A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR FOLLOW THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields are left empty, use the "Cadenly" demonstration described below. If they are filled in, adapt the name, content and business metaphor to the real project. Keep these features of the direction: large time digits; bars matching the lengths; a rhythm driven by the input.

Composition A: a typographic clock and a product demonstration. Composition B: a timeline workbench with an editor for three tasks. The starting layout below describes A; if B is chosen, this description of B replaces the starting layout instructions. B has a different content structure and flow of use. In both versions keep the functions accurate, the link between object and content, and the purpose of the motion.

## Original creative brief

Create your own visual expression: original copy, objects, composition and motion sequence. Use only your own or properly licensed assets. Do not carry over other brands, code, recognisable scenes or combinations of them. Say once, in the footer, that the brand is invented, and once beside any form or download that nothing is sent. Headings say what the planner does with tasks and times, not "Less X. More Y." slogans; use real facts only once the user provides reliable content.

Build a visually finished English product presentation website for the invented working day-planning tool "CADENLY". This is a demonstration website with a small local function that really works. Follow the instructions of the user's project environment, make decisions on your own and deliver a working private preview. Do not publish publicly without a separate instruction.

Visual system: deep cobalt blue, light lilac, warm white and black text on light areas. Create an original motif of a typographic clock and timelines. On the first screen, a clear heading "Plan three tasks and see when you finish", large hour digits and three task bars of different lengths. Then briefly show the principle, embed the demonstration, explain the local data handling and give common questions. The priority is a high-end product presentation with space, bold type and careful rhythm, not a dense admin panel.

Build four specific motions. When the site opens, the digits join the hero bars within 650 ms and stop. When "Make a plan" is pressed, the result bars unfold within 500 ms according to the task lengths and stay stable. When the task order changes, the bars rearrange within 250 ms, keeping focus and recalculating the times. When the break length changes, the gaps widen or narrow within 280 ms; the start and end marks change in one clear update. No endless counters or a clock ticking on its own.

In the demonstration the visitor enters three tasks and their lengths in minutes, picks a start time and a break between tasks: 0, 5 or 10 minutes. Generate a consistent plan with no overlaps; do not add a break after the last task. Show the start, the end and the total length; when the plan crosses midnight, mark the next day clearly. Let the visitor reorder the tasks with buttons, correct the input and download the plan as JSON or TXT. Validate empty names, an invalid time and negative or zero lengths. Everything is processed locally, with no AI, no sending to a server and no fake productivity promises.

On a phone, use one column and comfortable controls. Support the keyboard, clear labels, visible focus, contrast and prefers-reduced-motion; replace the bar transitions with an instant update. Content and navigation are reachable in ordinary HTML without 3D, and do not use 3D for decorative effects without a reason. Original English copy, with no lorem ipsum, invented clients, testimonials or awards. Assets and fonts are your own, generated or clearly licensed for use; state their origin briefly in the answer. Without real sending, do not show "sent".

The work is done when the demonstration, recalculation, reordering and download work, and wrong input, midnight, the phone view and reduced motion have been checked. Give the preview link and short check results.

## Final check

Check 360, 390, 768 and 1440 px widths. In normal motion mode check the specific episodes and controls; check reduced motion (`prefers-reduced-motion`) and the required technology fallbacks separately. A static screenshot alone does not prove that an animation or function works. If a required technology is unavailable, state the limit exactly; do not present a decorative fallback as checked 3D or sound.

Functional acceptance: three tasks and 0/5/10 min breaks; no break after the last one; recalculation, midnight and JSON/TXT export are exact.

Mark the demonstration project clearly in the page footer.

Deliver a working preview, a summary of the checks actually run, the origin of assets and the remaining limits. Publish publicly only when the user asks. Finish the implementation; a plan alone is not a result.
