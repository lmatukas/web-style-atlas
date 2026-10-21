# Select a real design direction

Use this guide to build a different website from the atlas. Do not claim an
atlas maintenance task or modify this repository merely to consume a style.
For maintenance requests, follow START_HERE's separate queue route.

1. Read START_HERE and catalog/index.json at one observed revision. Use only its
   ready entries. Do not read every style.md or load all asset folders.
2. Extract the site's purpose, audience, platform, content/image availability,
   existing brand and hard constraints from the request. Ask at most one short
   clarification if a missing answer would materially change the choice. Use
   reasonable stated assumptions for optional details.
3. Choose a mode:
   - **Specific ID:** verify the exact ready ID. Use the requested variant, or
     choose A/B for the content task. Skip the unnecessary three-option round.
   - **Choose for me / pasirink pats:** select the strongest compatible entry,
     record why, and start work without another confirmation.
   - **Show choices (default):** show up to three compatible ready directions,
     preferably different families and structural signatures. Give each a real
     preview/reference link, a one-sentence fit and one material tradeoff. Ask
     which is closest; allow one primary style plus one precisely named influence.
   - **Unknown/unready ID:** explicitly report it unavailable. Offer actual ready
     alternatives; never invent its metadata, preview or implementation.
4. Filter hard constraints first: no image supply excludes image-dependent
   directions unless a rights-cleared image plan is actually available; reject
   incompatible avoid_for, motion/complexity constraints and mandatory brand
   requirements. Preserve existing approved logos, typography and colors. An
   atlas palette is a starting point, not permission to overwrite a brand.
5. Rank remaining entries by declared best_for, requested tags and signature
   relationships. Prefer structural fit over a matching accent color. Break equal
   matches by stable ID order. Diversify families where equally suitable. If
   fewer than three fit, show fewer and explain the limiting constraint. If none
   fit, say so and request a relaxation instead of fabricating a fourth style.
6. Use index paths exactly. With a local checkout, provide actual local files.
   With GitHub access, resolve the observed commit and append the indexed path
   to the verified repository's blob/raw URL as appropriate. Do not construct a
   gallery URL until hosting is actually configured and verified. If images can
   be opened, inspect the offered candidates. Otherwise link the real images and
   explicitly say selection is metadata-based; never claim an unseen inspection.
7. After selection, read only that style's style.md, tokens.json, layouts.json,
   assets.json and the reference needed for the chosen variant. Read its other
   variant only to understand or compare the requested composition. Check rights
   before copying fonts/images. Load one secondary influence only when requested.
   If this ready entry has `prompt_path`, read that exact full creation brief at
   the same revision. Use the selected A/B and fill its project fields from the
   user's request; preserve its specific motion, functions and acceptance checks.
   The gallery's full-prompt copy includes the complete brief and selected A/B.
   Do not replace it with the short selection instruction or load planned briefs
   as ready choices. Entries without this optional field keep the existing route.
8. Write design-decision.md in the target project, then implement the actual
   website in its requested platform. Preserve the chosen direction's 3–5
   invariants while adapting content and responsive behavior. Verify real output,
   navigation, controls, accessibility basics and mobile; a prose plan alone is
   not the finished website.

Decision record: atlas repository and exact revision; ready ID and A/B variant;
visitor task; preserved invariants; brand/content adaptations; licensed image
plan; mobile reflow; optional single secondary influence and its exact scope;
actual checks and any unavailable visual/tool capability.

Capability limits: a URL does not auto-install this skill or guarantee AGENTS
loading. When repo access is unavailable, ask for the selected file package or
page contents. Do not pretend a catalogue was fetched. Existing target-project
instructions and dependencies remain authoritative for implementation.

The six baseline scenarios and two edge cases are retained in
`tests/fixtures/selection-cases.json`; actual scenario walkthroughs are recorded
in docs/evidence/P05.md. This is a portable agent procedure, not an AI API or
vector-search service. Gallery controls are added by later tasks.
