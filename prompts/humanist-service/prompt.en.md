# Humanist Service — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved services, people, process and integrations: [FILL IN OR BUILD A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR FOLLOW THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields are left empty, use the "Nearwell" demonstration described below. If they are filled in, adapt the name, content and business metaphor to the real project. Keep these features of the direction: warm conversational serif headings; visible person-to-person context; plain task labels next to a clear next action; a paced numbered path that explains what happens next.

Composition A: a warm service introduction with tasks, people and a first step. Composition B: a patient three-step planner that builds a local session outline. The brief below describes both; build the chosen one. B has a different content structure and flow of use, not just a different order. In both versions keep the same palette, type voice and honesty rules.

## Original creative brief

Create your own visual expression: original copy, illustrations, composition and details. Use only your own or properly licensed assets. Do not carry over other brands, code, recognisable scenes or combinations of them. Mark the working demonstration name clearly as invented; use real facts only once the user provides reliable content.

The project is NEARWELL, an invented service that gives patient, one-to-one digital help with everyday tasks: a phone, files, email. A visitor should feel they can take one small step without being rushed. It is not a real support line or booking service: no appointment is created and no personal information is requested. The people are illustrated fictional profiles, never verified staff, qualifications or testimonials.

Palette: warm off-white #fff8ef, a peach surface #f6dfcc, dark green-grey text #323a32, muted labels #68645a, a warm brick accent #914a30 with white text, borders #8f8778 and a blue focus outline #245d85. Use Georgia (or a licensed humane serif) for conversational headings and Arial for practical copy, labels and controls. Warmth comes from wording, space and illustration, never from low contrast or a pile of rounded cards.

Draw one original SVG scene of two people working together over a laptop at a table, with a short caption, and two small CSS or SVG portrait illustrations for the fictional profiles.

Composition A, the introduction: a visible identity with three literal links (ways we help, the people, how it works). A conversational invitation such as "A little help. A clearer next step." with one reassuring sentence and a link to the session path, beside the illustration. Three service rows describe familiar tasks in plain words (feel at home with your phone, give your files a place, get comfortable with email), each with a link that opens the planner with that topic preselected (for example `?topic=files`). Two illustrated profiles with a name, a focus area and one short quote. A first-step section explains that you choose a topic, see what to prepare and read a session outline, and links to it. Close with a note that the service is fictional and a native disclosure explaining what the demo does.

Composition B, the planner: a short invitation ("Let us take it one step at a time.") and three complete numbered stages. 1: choose a topic with real radio buttons (phone, files, email) inside a fieldset with a legend. 2: a preparation list that is replaced to match the topic, plus radio buttons for the session format (at the same table, guided call) with a note that changes — for a call, warn not to share passwords, payment details or private files. 3: a "Show my demo plan" button reveals a local outline naming the topic and format, a three-item session outline and the line "Local outline only. No booking has been made." Move focus to the result; a "Change my choices" button hides it and returns focus to the selected topic. Changing any choice hides a stale result. Unknown query values keep the default topic. Finish with a reassurance section and the same scope note.

Do not add name, email or phone fields. On a phone, the illustration follows the invitation, service rows keep their link next to the task, radios are large touch targets and the three stages read top to bottom.

## Final check

Check 360, 390, 768 and 1440 px widths for both compositions. There is no required motion: content is present immediately; nonessential transitions disappear with prefers-reduced-motion. Check keyboard focus, contrast on every real text background, the console and that there is no horizontal scrolling. A static screenshot alone does not prove that a control works; operate each one.

Functional acceptance: Topic radios replace the preparation list; the format radios change the note; submitting shows a local outline and focuses it; "Change my choices" returns focus to the topic; a service link can preselect a known topic; nothing is booked, saved or sent.

Mark the demonstration project clearly in the page footer.

Deliver a working preview, a summary of the checks actually run, the origin of assets and the remaining limits. Publish publicly only when the user asks. Finish the implementation; a plan alone is not a result.
