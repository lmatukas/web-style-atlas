# Design decision — Stillwater

- **Atlas:** `https://github.com/lmatukas/web-style-atlas`, observed revision `5f35c4ddca6b3be0225108ca8ad1d515d30157a6`.
- **Direction / variant:** `cinematic-photo`, ready variant **A — Photographic cover and selected scenes**. Chosen as the strongest fit because photography is the central content and the request calls for a calm portfolio sequence.
- **Visitor task:** Art directors can understand the two series and prepare a project brief; exhibition visitors can browse the image-led work and find image provenance.
- **Preserved invariants:**
  1. Broad, dominant photographic opening with deliberate crop.
  2. Deep green-black field and generous dark breathing space around imagery.
  3. Quiet serif display type paired with small, attached image captions.
  4. Slow sequence of scenes rather than a generic feature-card grid.
  5. Visible local section navigation, native disclosures and clear keyboard focus.
- **Adaptations:** Dusklore's travel journal became Stillwater, a fictional landscape-photography portfolio with Forest and Water series. Copy explicitly distinguishes the fictional portfolio identity from the source photographers. Variant A's selected-scene rhythm is adapted to two separate series chapters, with a responsive asymmetric desktop layout that stacks in reading order on phones. Inquiry preparation is a practical, local checklist; the page does not collect or send project details and includes no invented contact channel.
- **Licensed image plan:** Copied only the atlas direction's bundled `forest.webp`, `lake.webp`, and `RIGHTS.txt` to `assets/`. The forest is credited to Austin Schmid via Wikimedia Commons, CC0 1.0; the lake is credited to NPS / M. Reed via Wikimedia Commons, a U.S. government public-domain work. Captions and the source disclosure retain these distinctions. Source declarations and local modifications are recorded in `assets/RIGHTS.txt`; CSS applies the display crops. The Stillwater identity does not claim authorship of these examples.
- **Mobile behavior:** At 700px and below, visible navigation wraps, the portrait hero keeps its title at the lower dark edge, series imagery and notes stack, and inquiry copy becomes one column. Images reserve explicit intrinsic dimensions; reduced-motion disables smooth scrolling and transitions.
- **Secondary influence:** None.
- **Checks:** A static-server smoke check returned HTTP 200 for page, CSS, both image assets and the rights note; source validation confirmed all local fragment links resolve and images have alt text and reserved dimensions. The bundled photographs were inspected directly. A local browser preview in this session returned `Missing or invalid bearer token`, so no local browser interaction test was performed here. The parent agent independently reports browser checks at 360px, 768px and 1440px; see `README.md`.
