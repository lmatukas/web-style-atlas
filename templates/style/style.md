---
schema_version: 1
id: example-style
name: Example Style Template
summary: An instructional draft for authoring a distinct design direction; never a ready catalogue entry.
family: typographic
tags: [grid, precise]
best_for: [services, portfolio]
avoid_for: []
density: balanced
image_dependency: low
motion_level: subtle
complexity: low
signature:
  composition: Describe column logic, asymmetry, scale and negative space.
  typography: Describe font roles, hierarchy, line length and heading rhythm.
  navigation: Describe orientation, active states and mobile navigation.
  content_rhythm: Describe how lists, text, images and sections alternate.
  imagery: Describe image character, aspect ratios, cropping and captions.
  color_and_material: Describe semantic surfaces, borders and depth.
  interaction: Describe hover, focus, disclosure and control states.
  motion: Describe the purpose, limits and reduced-motion alternative.
status: draft
---

# Example Style Template

## Intent

Replace this instructional draft with a specific design direction. Explain the
visitor's task, the content the direction serves and the visual relationship that
makes it recognizable. Use realistic English content in both references. Keep the
completed description around 700–1200 words. A copied template is not a finished
style and must remain draft until its required evidence exists.

## Signature

Write three to five characteristics that an implementing agent must preserve,
such as a narrow reading column beside large images or an indexed navigation
rail. Explain each through observable relationships, sizes or ordering. Describe
all eight dimensions in the frontmatter. Color alone must not carry the identity.
When a destination platform changes, preserve these characteristics while adapting
the implementation to the platform's existing components and content model.

## Typography

Assign display and body roles, fallback stacks, weights, line heights and letter
spacing in tokens.json. Describe which hierarchy levels use them and how headings
wrap at small widths. Name a suitable reading measure and explain how captions
relate to the main text. If a local font is introduced, record its file and asset
ID, include its redistribution license and check the actual loaded font. Test
ĄČĘĖĮŠŲŪŽ and their lowercase forms; merely writing them here proves no coverage.

## Color and surfaces

Replace the template palette with semantic colors appropriate to the direction.
Declare every foreground/background combination actually used in contrast_pairs.
Describe the roles of the page, raised surfaces, borders, accent and focus ring.
Examples must consume generated tokens.css variables rather than introduce a
parallel hardcoded palette. Document gradients in CSS and inspect text over their
full range. A passing token calculation alone does not verify a rendered page.

## Layout A

Describe the primary composition in reading order, including navigation, column
relationships and section transitions. Update the first variant in layouts.json
and implement reference/index.html. Every section needs a purpose, a concrete
pattern and content requirements. Avoid a generic sequence of hero, feature
cards, testimonials and CTA unless that structure follows from this direction's
actual information needs. Use headings, captions and action labels with meaning.

## Layout B

Describe a second composition that retains the same signature but changes the
spatial arrangement and content rhythm. Update the second variant and implement
reference/alternate.html. Explain a visible difference in navigation, content
ordering, scale or text/image relationships. A different accent color, reordered
cards or substituted photographs alone does not establish a second composition.
Both variants must remain useful pages with an identifiable visitor task.

## Imagery

Specify subject, crop, aspect ratio, placement and caption treatment. A direction
with low image dependency can work through type and CSS geometry. A direction
that depends on photography needs suitable licensed photographs rather than gray
placeholders. Keep files local and resize them before committing. Register every
third-party or generated asset in assets.json with its origin, rights and changes.
Do not treat an image URL or the repository MIT license as permission to copy.

## Navigation and interaction

Explain how visitors find their position and next action. Describe keyboard
focus, hover, active and expanded states for each real control. Use links for
navigation and buttons for actions; give disclosures meaningful accessible names.
If a mobile menu exists, document its open and closed states, focus behavior and
escape handling. Do not include decorative controls that imply unavailable
features. Prefer a simple visible navigation list when it serves the content.

## Motion

Describe what moves, why it helps and when it stops. Use named duration and easing
tokens. Keep essential text readable without animation and avoid making content
discovery depend on motion. For prefers-reduced-motion, remove nonessential
transforms and transitions while preserving control state and information. If the
direction needs no animation, set motion_level to none and keep the behavior
consistent across both references.

## Responsive behavior

Describe the reading order and layout changes at 360, 768 and 1440 CSS pixels.
Specify which columns stack, how captions move, where navigation wraps and how
large type scales. Avoid horizontal page overflow, cropped text and fixed heights
that hide translated or longer content. Preserve the composition's hierarchy at
mobile widths instead of shrinking the desktop page. Record each variant's
specific reflow in layouts.json.

## Accessibility

State the accessibility targets, the checks actually performed and known gaps
separately. Check text contrast, meaningful structure, keyboard operation, focus
visibility, image alternatives and reduced motion in the rendered references.
Inspect text over images and disabled or selected states. Record the environment
and outcomes in the style evidence. Do not claim certification, unconditional AAA
conformance or a passing browser check that was never run.

## Adaptation

Explain how to replace content, brand colors, images and platform components while
retaining the signature. Mention likely constraints such as absent photography or
dense product information. Give a concrete fallback when the direction can adapt;
otherwise list the unsuitable use case in avoid_for. Keep tags and use cases in
the shared vocabulary, proposing a documented addition when a real need arises.

## Avoid

List exactly three undesirable deviations and why each damages the direction.
Replace these instructional examples: reducing identity to an accent color;
replacing the composition with interchangeable rounded cards; adding decorative
animation that obscures reading or navigation. Make the final deviations specific
enough for another agent to recognize in its own implementation.

## Closest styles

Name up to two relevant catalogue neighbors and compare at least three signature
dimensions, including composition, navigation or content rhythm. Cite only actual
style IDs, and distinguish a planned neighbor from an implemented comparison.
Record the first-style baseline honestly when no ready neighbor exists. Finish
with the evidence needed to show that both variants and their desktop/mobile
previews preserve the stated differences.
