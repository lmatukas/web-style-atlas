# Terminal Utility — website creation prompt

Build a working website in the user's project. This is a self-contained creation prompt; do not change the atlas or its task registry.

## Adapt to the project

- Brand and business: [FILL IN YOUR OWN OR KEEP THE DEMONSTRATION].
- Audience and main action: [FILL IN].
- Approved services, log entries, statuses and integrations: [FILL IN OR BUILD A CLEARLY INVENTED DEMONSTRATION].
- Project technology and environment rules: [FILL IN OR FOLLOW THE EXISTING ONES].
- Composition: [A OR B; default A].

If the fields are left empty, use the "Shellwick" demonstration described below. If they are filled in, adapt the name, content and business metaphor to the real project. Keep these features of the direction: a consistent monospace voice; dense but aligned text rows; explicit command, timestamp and status labels; navigation that reads like a text index.

Composition A: a service index of expandable command descriptions and a runbook. Composition B: a filterable chronological operations log with a run summary. The brief below describes both; build the chosen one. B has a different content structure and flow of use, not just a different order. In both versions keep the same palette, type voice and honesty rules.

## Original creative brief

Create your own visual expression: original copy, illustrations, composition and details. Use only your own or properly licensed assets. Do not carry over other brands, code, recognisable scenes or combinations of them. Mark the working demonstration name clearly as invented; use real facts only once the user provides reliable content.

The project is SHELLWICK, an invented independent systems practice that audits, repairs and hands over small technical systems. The page is a website, not an executable terminal: visitors follow links and open explanations, they never type commands. Every log entry, run label and count is a fictional static sample; never call it live monitoring.

Palette: very dark green #101815, a slightly lighter panel #1a2721, pale green text #e0eee4, secondary text #adbbb1, a mint accent #a8e6ae with dark text #142119, rules #6e8274 and a bright focus outline #baf4bd. Use one monospace family (Courier New or a licensed monospace) for everything, with size, weight and spacing creating hierarchy. Keep short measures inside wide bands. No scanlines, glow, CRT curvature or random hexadecimal wallpaper.

Composition A, the service index: a compact header with the name, a tagline and path-like links (/services, /runbook, /log). A prompt-style label ("~/shellwick / services"), a large plain heading ("Less noise. More useful output.") and one sentence on what the practice does. Three native disclosures read like commands — "01 audit", "02 repair", "03 handoff" — each with a one-line purpose, an INPUT line, an OUTPUT line, a boundary note and a link to the related log entries (for example /log?q=handoff). A numbered runbook of three steps ([01] read the real state, [02] make one useful change, [03] leave a usable record). Close with a scope note saying no request is sent and a link to the log.

Composition B, the operations log: a snapshot heading ("The work, in plain text.") and a plain date label. A narrow side panel summarises the fictional run as a definition list (run ID, record type: static sample, changes, notes, network action: none). The wide column holds an entry stream: three filter buttons (all entries, changes, notes) with aria-pressed, a labelled search field, a status bar whose done / open / info segments resize with the visible entries, and a polite count such as "5 entries shown: 3 done, 1 open, 1 info." Each entry shows a text status and kind label with a path (DONE CHANGE / docs/runbook), a short heading and one line. Hidden entries leave the tab order; an empty state explains how to clear. Add a disclosure explaining what the sample represents and a return link.

Statuses always carry text, never colour alone. On a phone, header links wrap, the run summary moves above the stream, filter buttons stay large and long paths wrap instead of scrolling sideways.

## Final check

Check 360, 390, 768 and 1440 px widths for both compositions. There is no required motion: no blinking cursor, typing effect or status pulse; filtering is immediate; prefers-reduced-motion removes the short colour transitions. Check keyboard focus, contrast on every real text background, the console and that there is no horizontal scrolling. A static screenshot alone does not prove that a control works; operate each one.

Functional acceptance: Service disclosures open with a keyboard and link to matching log entries; the log filter buttons expose aria-pressed and combine with the text search; the count and status bar update politely; a ?q= link opens the log pre-filtered; an empty state appears; nothing pretends to execute commands.

Mark the demonstration project clearly in the page footer.

Deliver a working preview, a summary of the checks actually run, the origin of assets and the remaining limits. Publish publicly only when the user asks. Finish the implementation; a plan alone is not a result.
