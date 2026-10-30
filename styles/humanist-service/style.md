---
schema_version: 1
id: "humanist-service"
name: "Humanist Service"
summary: "Warm serif guidance, approachable illustrated people and a clear three-step path make practical service help feel patient and understandable."
family: "functional"
tags: ["humanist", "warm", "task-led"]
best_for: ["services", "public-information"]
avoid_for: []
density: "balanced"
image_dependency: "medium"
motion_level: "subtle"
complexity: "low"
signature: {"composition": "Welcoming person-to-person scene beside a plain invitation in A; a numbered vertical service path in B.", "typography": "Warm Georgia display at conversational scale with readable Arial labels and practical body text.", "navigation": "Visible help/people/process links and direct topic routes into the example planner.", "content_rhythm": "Invitation, named tasks, illustrated team and first-step reassurance versus topic, preparation and local plan outline.", "imagery": "Original illustration of two fictional people learning together; simple illustrative team portraits.", "color_and_material": "Cream, warm peach, terracotta actions and dark olive text, with gentle curves and open reading space.", "interaction": "Actual topic/format radio choices update preparation, local plan summary and keyboard focus; native scope notes.", "motion": "Quiet immediate guidance and stable path; no rotating people, timed steps or reveal gates."}
status: "ready"
prompt_path: prompts/humanist-service/prompt.en.md
---

# Humanist Service

## Intent

Humanist Service helps a person take a practical next step without feeling rushed. The fictional Nearwell digital-help service introduces ordinary tasks, approachable illustrated people and a simple example session path. It suits people-led support, local services and practical guidance where confidence matters alongside clarity. The references do not provide a real support line or booking service. They demonstrate how a warm invitation can lead directly to a useful task, truthful expectations and a short plan without demanding private information.

## Signature

Preserve four traits: warm conversational serif headings; visible person-to-person context; plain task labels close to a clear next action; and a paced numbered path that explains what happens next. Warmth comes from wording, space and illustration rather than from low contrast or a pile of rounded feature cards. Keep practical copy in a neutral readable sans-serif. A welcoming scene should support the available help, while the process composition should give the visitor control over an understandable sequence.

## Typography

Use Georgia for display and Arial for body copy, both with explicit system fallback stacks. The display voice must remain distinct from captions, navigation and sustained reading. Keep paragraphs near sixty characters per line, let long headings wrap, and preserve useful caption sizes. The reference includes ĄČĘĖĮŠŲŪŽ and lowercase glyphs so the actual installed font can be inspected. There are no remote font requests or bundled font binaries. A new licensed font requires a recorded asset before use.

## Color and surfaces

Semantic tokens define the page, supporting surface, readable foreground, secondary labels, action accent, boundary and focus outline. Reference CSS consumes generated tokens.css; artwork may retain its separately authored material palette. Preserve the contrast relationships when replacing colors rather than copying an arbitrary accent. Do not use muted type for essential instructions if it becomes difficult to read. A successful token ratio is only one part of checking the rendered interface and every actual text background.

## Layout A

A visible service identity and three literal links lead to a conversational invitation beside an original illustration of two people at a laptop. Three service rows describe familiar tasks and open the planner with the matching topic. Two illustrated fictional profiles then introduce the human context without pretending to be verified professionals or customer testimonials. A first-step section explains the process and links its actual path. A scope note and native disclosure close the page with clear demonstration limits.

## Layout B

The process opens with a short invitation and three complete numbered stages. First choose a topic with real radio controls. Second read topic-specific preparation and choose an example session format. Third reveal a local outline with the chosen topic and format. A short reassurance section and scope note complete the page. This is a continuous practical path with visible preparation and review, not a second marketing introduction or a catalogue of identical service cards.

## Imagery

The scene is an original SVG showing two fictional people learning over a laptop. Its local rights note records original MIT authorship. The small profile portraits are CSS illustrations, not stock photographs or claimed real staff identities. Their warm surface palette stays inside the artwork. Informative scene alternative text describes the activity; decorative portrait shapes are hidden because adjacent text provides their fictional name and role. An adaptation using real portraits must obtain appropriate rights and avoid inventing qualifications or endorsements.

## Navigation and interaction

A service link can preselect a safe known topic through the query string; unknown values keep the default. Radio controls retain native keyboard semantics. Topic changes replace the actual preparation list; session format changes its explanatory note. Submitting reveals a complete local summary and focuses the result. The change-choices action returns focus to the selected topic. Changing either choice hides stale results. No name, password, email address or personal file is requested or sent, and refreshing restores the documented initial state.

## Motion

Content is present immediately. Short state transitions are allowed when they explain an operable control; essential copy never waits for a reveal. The reduced-motion media query removes nonessential animation, transitions and smooth scrolling. If an adaptation introduces movement, keep a useful static composition, avoid autoplay distractions and give visitors control over any sustained activity. A decorative motion effect must not turn the page into a different design direction or hide its navigation.

## Responsive behavior

At 1440 pixels the welcoming illustration receives a broad stage beside the invitation, while the service path aligns large stage numbers with a readable content column. At 768 reduce outer space and title scale before shrinking form labels or people beyond recognition. At 360 stack the scene, task rows and fictional profiles in order; stage numbers move above their content. Native controls remain large and labels wrap. The summary and change action stay inside the flow without a modal or horizontally scrolling progress rail.

## Accessibility

Use one main landmark, one descriptive h1, ordered headings, visible keyboard focus and a skip link. Links navigate and buttons change state; native disclosures expose real information. Provide informative alternatives for meaningful images, while purely ornamental geometry stays out of the reading order. Check actual loading, contrast, focus, control coverage and horizontal overflow at 360, 768 and 1440 pixels. The accompanying task evidence records what was executed; these bounded checks are not a full WCAG certification or a guarantee for adapted content.

## Adaptation

Start with the actual tasks people ask about and name one useful outcome for each. Replace the fictional team and process with verified service details. Preserve short preparation lists, honest expectations and clear control over the next step when moving into another platform. A real booking system needs an explicit connection, accurate availability and truthful confirmation; the local outline is not that system. Keep private information out of example tasks and let a person revisit choices without losing their orientation.

## Avoid

1. Do not confuse a friendly voice with vague task names, tiny low-contrast text or hidden actions. 2. Do not invent staff qualifications, client testimonials or a booking confirmation from an illustrative service example. 3. Do not replace the patient numbered path with an institutional search directory, a dense policy document or an animated onboarding gate.

## Closest styles

Institutional Clear is the nearest ready functional neighbor. Its stable navy header, searchable service directory and contents-to-document guide establish official task orientation. Humanist Service instead uses warm serif conversation, an original person-to-person scene and named fictional profiles, followed by a paced topic/preparation/outline path. Topic links and native choice controls replace directory search and article contents. Composition, navigation and content rhythm all differ; changing an institutional palette to cream would not establish this direction.

