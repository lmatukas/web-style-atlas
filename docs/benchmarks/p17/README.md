# P17 — Full creation prompt author replays

These are three real isolated target projects built and checked by the same agent author. They are **not independent model trials** and do not extend the independent P10 model claims. No additional agent or paid AI API was invoked.

The frozen catalogue input is `f9ab3d1781381b705084e0710abd28d56ac15b8e`. `scenarios.json` retains exact ready style, A/B, brand/activity/content, every source-file hash and explicit applied substitutions. `prompts/` retains the exact complete customized prompts, whose SHA-256 values agree with `replay-results.json`. The materializer copies only the selected reference dependency closure into a new external project, then applies those recorded substitutions. It preserves the original objects and working functions. This is a bounded reuse/adaptation test, not a claim that a fresh external model generated an equivalent design from text alone.

| Case | Full prompt / composition | Changed activity and actual result |
|---|---|---|
| library-light | Modular Light / B / WebGL | SIJOS reading-library lighting workshop; real module changes, shade, original depth-tested lamp and local enquiry. |
| volunteer-rhythm | Rhythm Planner / B / HTML | BENDRAS RITMAS volunteer-day planning; new headline and three task names, exact midnight calculation, reorder and current TXT. |
| evening-sound | Membrane Score / A / SVG + Web Audio | GIJŲ VAKARAS creative sound workshop; new headline and mood names, actual user-start synthesis, zero-gain mute and saved recipe restore. |

## Repeat with the locked atlas environment

From the repository root, use three **new** directories outside the checkout:

```sh
node docs/benchmarks/p17/materialize.mjs library-light /tmp/my-proof-library-light
node docs/benchmarks/p17/materialize.mjs volunteer-rhythm /tmp/my-proof-volunteer-rhythm
node docs/benchmarks/p17/materialize.mjs evening-sound /tmp/my-proof-evening-sound
node docs/benchmarks/p17/check-replays.mjs /tmp/my-proof
```

Each directory is a standalone static project with an `index.html`, local runtime files, exact `creation-prompt.lt.md`, `design-decision.md`, original MIT licence and asset rights record. B is mapped to the project index; its A sibling remains `overview.html`. No runtime request returns to the atlas. Source hashes are checked before copying and unused substitutions are rejected. Materialization never overwrites an existing target.

The real checker serves each project independently under `/proof/`, exercises normal/reduced/blocked capability modes, checks actual business output, then runs axe/control/resource checks at 360/390/768/1440. All three resulting desktop and phone pages were captured and actually viewed. Temporary PNGs remain outside Git. The retained machine report contains runtime, prompt/result hashes, file manifests and outcomes rather than duplicate site code or screenshot archives.

## Catalogue audit

`audit.mjs` checks all 15 linked prompts through the actual built gallery under `/atlas/`: 30 exact A/B clipboard copies, complete manual fallback for every B, distribution byte equality and real variant links. It then exercises one substantive actual business route in both variants of every new style (30 paths). The existing S25–S39 evidence retains the larger per-style edge matrices; those unchanged matrices are not redundantly rerun here. Full source, all-style browser/axe, runtime and renderer gates are separate and recorded in `docs/evidence/P17.md`.
