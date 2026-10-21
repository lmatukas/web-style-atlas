# Design decision

- **Atlas:** [Web Style Atlas](https://github.com/lmatukas/web-style-atlas), revision `5f35c4ddca6b3be0225108ca8ad1d515d30157a6`.
- **Direction:** `institutional-clear`, variant **A — Task and service directory**. This is a ready entry in the catalogue at that revision.
- **Visitor task:** Browse four community workshops, understand what each session involves and filter by words or subject.
- **Why this direction:** The programme needs practical, low-friction discovery for a broad adult audience, including older readers and phone users. The atlas describes this direction as a readable, search-led local directory with an explicit empty state and predictable controls. No imagery is needed.
- **Preserved invariants:** Stable header with visible local navigation; direct, plain-language labels; strong readable text hierarchy; predictable directory rows and an explicit search empty state with reset.
- **Adaptations:** The fictional service entries became four learning workshops with their supplied subjects and session lengths. Search is paired with a category selector; workshop rows use a three-part number/content/duration layout. About and choosing-help sections replace service application guides because there is no booking flow or contact channel.
- **Imagery and type:** No photographs, external images or fonts. System Arial and CSS provide the interface.
- **Mobile behavior:** Header links wrap; controls stack; each workshop changes from three columns to a two-column layout with duration below its description; supporting sections stack.
- **Influence:** None.
- **Verification:** See `README.md` for local run and checks.
