# Common Table workshop catalogue

A one-page, fictional workshop catalogue using plain HTML, CSS and vanilla JavaScript. It has local text search, a subject filter, result count, empty state and reset controls.

## Run locally

Open `index.html` in a browser, or serve this directory with any static file server. For example, from this directory run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Checks

No build step or dependencies are required. Playwright verification against the local server covered text search (`90 minutes`), subject filtering (`Art`), a no-match query, the empty-state reset and the form reset. Both reset controls restored all four workshops and the `All subjects` selection. At a 390px viewport the document had no horizontal overflow; the mobile layout and full page were visually inspected. The responsive layout uses a 620px breakpoint to stack the controls and workshop metadata. The page uses native form controls, semantic landmarks and visible keyboard focus.
