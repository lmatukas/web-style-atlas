# Real consumer runs — P10

The frozen input revision is `5f35c4ddca6b3be0225108ca8ad1d515d30157a6`.
These are independent website builds by the available `gpt-6-luna` target agent,
invoked through the collaboration runtime in fresh threads, one after another.
The runtime exposes that model alias, not an exact model snapshot/build number.
This is evidence for the shared consumer procedure, not a native Codex CLI,
Claude Code or IBM Bob execution claim. Those binaries were absent on PATH.

`prompts.json` preserves the complete requests, including original absolute
paths; substitute your checkout and new target paths when repeating them.
`followups.json` retains the actual review feedback sent during the runs.
`results.json` records actual artifacts, hashes, source selections and outcomes.
`sites/` retains authored outputs without dependencies, generated bundles,
duplicate atlas photographs or temporary screenshots. `RESULTS.md` records
review findings and limitations separately from the target's own claims.

## Reproduce a retained output

Use Node 24 and the repository's locked development dependencies (`npm ci`).
From the atlas root, materialize one case into a **new** external directory:

```sh
node docs/benchmarks/p10/materialize.mjs service-swiss /tmp/my-atlas-consumer
```

For a plain HTML case, run:

```sh
python3 -m http.server 8000 --directory /tmp/my-atlas-consumer
```

Visit `http://localhost:8000/`. The photo case
materializer copies the already licensed atlas bytes and verifies their hashes;
it does not fetch images from the network. Read its retained attribution file.
For the React adaptation, use its retained package lock and run instructions.

The independent browser check uses the atlas's canonical environment
(Ubuntu 24.04 x64, Node 24.19.0, Playwright 1.62.1, Chromium 151.0.7922.34):

```sh
npx playwright install --with-deps chromium
node docs/benchmarks/p10/check.mjs /tmp/my-atlas-consumer /tmp/consumer-qa service-swiss
```

For a compiled application, give the check its built static output directory.
The check serves under `/bench/`, runs at 360/768/1440px, audits WCAG-tagged
axe rules, navigation, native disclosures, image loading, visible initial
keyboard focus, resource failures and document overflow. Screenshots and
machine reports stay in the supplied temporary output directory. Read the
manual findings too: an automated audit cannot establish complete WCAG
conformance or judge whether two compositions are meaningfully distinct.
