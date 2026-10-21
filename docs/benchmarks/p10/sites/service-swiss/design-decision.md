# Plainword design decision

- **Atlas:** [Web Style Atlas](https://github.com/lmatukas/web-style-atlas), observed revision `5f35c4ddca6b3be0225108ca8ad1d515d30157a6`.
- **Ready direction:** `swiss-grid`, variant A — “Typographic service index”.
- **Visitor task:** Understand editorial support for a small organisation, compare the three services, see how a project proceeds, and know how to prepare a first inquiry.
- **Audience and platform:** Small-business owners reading on phones and laptops; one responsive, plain HTML/CSS page.

## Preserved invariants

1. A disciplined twelve-column alignment system on larger screens, with headings spanning several columns and compact labels using fewer.
2. Oversized, flush-left sans-serif display type with abrupt scale changes and tight tracking.
3. Numbered service rows separated by visible hairline rules rather than equal feature cards.
4. Warm paper, near-black text, muted supporting labels and one restrained red signal.
5. Visible numbered local navigation, underlined text links, offset keyboard focus, and a native details disclosure.

## Adaptations

Plainword replaces the fictional design studio and its four services with three editorial services and the requested three-stage process. The red end section explains how a visitor can prepare a sample and request a conversation through their own chosen channel; it does not imply a real business or send data. Decorative geometry is limited to a small CSS signal. No images, external fonts, external dependencies, testimonials, or fabricated contact details are used.

The desktop grid compresses into a single-column reading flow at 760px and below. Number and service name remain associated while descriptions move underneath; process steps become ordered horizontal divisions; all navigation stays visible and wraps. At 380px, type and gaps tighten while preserving the full local index. Reduced-motion preferences disable smooth scrolling and link transitions.

## Local run

Open `index.html` directly, or from this directory run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Verification

Served the target directory with `python3 -m http.server 8000` and tested in headless Chromium using Playwright. Confirmed HTTP 200, the page title and required headline, three navigation links and three service rows, navigation to `#services`, and native disclosure expansion. At a 360px viewport, document width matched viewport width (360px), with no horizontal overflow. Captured and inspected a full-page mobile screenshot. No automated accessibility audit or other viewport widths were run.
