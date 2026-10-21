# Plainword design decision

- **Atlas:** `https://github.com/lmatukas/web-style-atlas`, observed revision `5f35c4ddca6b3be0225108ca8ad1d515d30157a6`
- **Direction:** `swiss-grid`, ready; variant A, “Typographic service index”
- **Visitor task:** Understand Plainword’s editorial services and process, then know a truthful first step.

## Preserved invariants

1. A disciplined twelve-column alignment grid, with the opening promise set flush left.
2. Unequal label, headline and supporting-copy column widths.
3. Numbered service divisions separated by visible horizontal rules.
4. Warm paper, near-black text, a restrained red signal and hairline borders.
5. One system sans-serif family with abrupt type scale changes and visible numbered navigation.

## Adaptations

The fictional design studio became Plainword, an independent editorial service for small organizations. The service index has three rows—copy-editing, proofreading and document structure—and the process has three requested steps. The next-step panel explains that visitors can prepare a short sample and that scope is agreed first; it explicitly identifies this demonstration as fictional and provides no fake submission or contact action. The reference’s extra service row and fictional FAQ answer were replaced with the supplied content and a practical native disclosure.

No images, remote fonts or external assets are used. CSS geometry is limited to the small red signal. On narrow screens, the hero and service explanations stack, navigation stays visible and wraps, and the three process steps become a single reading-order column. Focus indicators, a skip link, native disclosure and reduced-motion behavior are included.

## Run and build

Run `npm ci`, then `npm run dev` for local development. Run `npm run build` to create the static production site in `dist/`; `npm run preview` serves that build locally. Vite uses relative asset paths so the production output can be hosted beneath a nested URL.

## Verification

`npm ci` and `npm run build` passed with the retained package versions: React `18.3.1`, React DOM `18.3.1`, Vite `6.4.4` and `@vitejs/plugin-react` `4.3.4`. `npm audit --omit=dev` reported zero vulnerabilities; the final full audit also reported zero vulnerabilities.

The atlas P10 Chromium check passed against the production build under `/bench/` at 360, 768 and 1440 pixels: all required copy and local anchors were present, navigation reached each section, the disclosure opened, the keyboard focus indicator was visible, and there was no horizontal overflow, browser error, failed request or external asset. I inspected the rendered desktop and mobile screenshots.

The first verification pass found two issues and they were corrected before delivery. The initial Vite build emitted root-absolute `/assets/` paths, which failed under `/bench/`; `base: './'` now emits nested-safe relative paths. The first responsive check also found overflow at 360 and 768 pixels; the mobile title size and red panel width were adjusted, and the tablet panel was constrained to the viewport. A preliminary dependency audit found vulnerable Vite `6.0.7` and transitive esbuild; Vite was upgraded to `6.4.4`, the lockfile was regenerated, and the final audit is clean.
