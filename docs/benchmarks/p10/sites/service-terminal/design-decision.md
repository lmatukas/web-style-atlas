# Plainword design decision

- **Atlas:** [Web Style Atlas](https://github.com/lmatukas/web-style-atlas), observed revision `5f35c4ddca6b3be0225108ca8ad1d515d30157a6`.
- **Direction:** `terminal-utility`, variant A — command-like service index.
- **Visitor task:** understand the editorial services, learn the working process and see a clear, honest next step on a phone or laptop.
- **Influence:** none.

## Preserved invariants

1. System monospace typography throughout, using Courier New with local fallbacks.
2. Compact, aligned service rows with concise command-like labels.
3. Explicit input/output/scope labels that make the offer concrete.
4. Plain text local section navigation and native, keyboard-operable disclosures.
5. Dark green-black surfaces, pale text and restrained green accent; no imagery or external font assets.

## Adaptations

The fictional systems-practice copy was replaced with Plainword's copy-editing, proofreading and document-structure services. A three-step runbook now follows the requested process: share a sample, agree a scope, review and hand off. Closing copy explains the next step without a submission form or implied contact channel. Desktop uses a two-column introduction and process layout; under 700px those regions stack, service labels wrap naturally, and navigation remains visible. The page uses HTML/CSS only, with native `<details>` controls and local anchors; there is no JavaScript.

## Verification

Run `python3 -m http.server 8000` from this directory, then open `http://localhost:8000/`. A Python `HTMLParser` check passed for the single page heading, English document language, three native disclosures, required content, six local links resolving to page IDs, and zero external assets. I attempted a browser preview, but the available cloud browser returned a bearer-token error for localhost and disallowed `file:` URLs, so I could not inspect the rendered page or test mobile behavior there.
