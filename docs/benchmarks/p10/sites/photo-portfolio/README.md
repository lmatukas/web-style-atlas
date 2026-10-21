# Stillwater portfolio

A dependency-free, one-page fictional landscape photography portfolio. All images are local and their source/rights record is in `assets/RIGHTS.txt`.

## Run locally

From this directory, start any static server. For example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Or open `index.html` directly; the local navigation and disclosures work without JavaScript.

## Verification

Static-server smoke check returned HTTP 200 for the page, stylesheet, both WebP assets, and rights record. A source-level check confirmed all seven local fragment links resolve, all three image elements have alt text and reserved dimensions, and the CSS includes mobile and reduced-motion rules. The forest and lake source files were inspected directly.

A local browser preview attempt was unavailable in this session: the browser returned `Missing or invalid bearer token` for the local server URL. The parent agent independently reports browser checks passed at 360px, 768px, and 1440px. No screenshot-based interaction test was performed here.
