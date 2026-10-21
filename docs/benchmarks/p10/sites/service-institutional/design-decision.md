# Plainword design decision

- **Atlas:** `https://github.com/lmatukas/web-style-atlas`, observed revision `5f35c4ddca6b3be0225108ca8ad1d515d30157a6`.
- **Direction:** `institutional-clear`, ready, variant A — Task and service directory.
- **Visitor task:** small-business owners can identify an editorial service, understand its scope and see a practical next step on phone or laptop.
- **Preserved invariants:**
  1. A stable navy service header with predictable local navigation.
  2. Plain task-based service labels in a scannable directory.
  3. Readable system-sans hierarchy, high-contrast text and visible keyboard focus.
  4. Predictable sections with a useful next step and no unsupported application action.
  5. Local service filtering with a clear result count and empty state.
- **Adaptations:** Replaced public-service language and fictional directory entries with Plainword's three editing services and small-organization audience. Kept the white, pale blue-gray and navy functional surfaces, while using restrained editorial numbering and larger pauses to support the concise business tone. Service rows link to real details on this page; the process has the requested three stages. The sample-first next step describes what to prepare without a contact form, submission claim or real business contact.
- **Assets and type:** No images, external fonts, dependencies or copied atlas assets; system Arial is used.
- **Mobile behavior:** Navigation wraps, search controls stack, service rows reflow, detail cards and process become single-column; content remains readable without horizontal scrolling.
- **Verification:** `python3 -m http.server 8000 --bind 127.0.0.1` served the page and `curl` retrieved it; `node --check script.js` passed; static checks found all fragment links resolving to local IDs and all required copy present; a DOM mock passed matching, empty-state, clear/reset and focus-restoration checks. The available cloud browser showed a missing/invalid bearer-token gateway response for localhost before rendering the page, and no local browser executable was available, so visual and mobile viewport inspection could not be completed here. Mobile CSS was checked for the required reflow and overflow-resistant layout rules.
