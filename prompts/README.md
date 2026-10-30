# Website creation prompts

This folder holds public, self-contained creation prompts with fields for
adapting them to a project. Each one sets out an A and a B composition,
specific motion, a working function and the checks to run.

These are prepared creation briefs, not a list of finished examples. The
[ready catalogue](../catalog/index.json) shows which styles are actually ready.
The [prompt registry](index.json) links the briefs to tasks S25–S39 and
S52–S62; it is not a second ready status and never makes a missing example
count as ready.

Pick one style's `prompt.en.md`, fill in the fields at the top and give the
whole prompt to your coding agent in a new website project. You can keep the
demonstration theme. On a ready direction's gallery card you can read the full
text and copy it with the A/B you chose. Animation and technology checks come
from P16; the examples come from the matching S tasks.

## Linking a prompt to a ready style

Optionally add this to the YAML metadata of `styles/<id>/style.md`:

```yaml
prompt_path: prompts/<id>/prompt.<language>.md
```

`<language>` is `en` or `lt` and must match the brief's `language` field. Since
1.4.0 every brief is English (`prompt.en.md`); the schema still accepts
`prompt.lt.md` for a future Lithuanian brief.

The path must match the style ID and its `prompts/index.json` entry exactly.
Only an existing local UTF-8 text file of up to 64 KiB is allowed, with no
symlinks or NUL bytes. The registry schema and the source of every brief it
lists are checked even when their examples do not exist yet. The registry is
not a source of ready status.

Each brief in `prompts/index.json` declares an `enhancement`. Directions with
an animated runtime layer (WebGL, SVG, canvas or audio) must ship a matching
`runtime.json` and pass the runtime gate. A plain HTML/CSS direction with at
most short link transitions uses `"enhancement": "static"` and `"audio": false`
and must not declare `runtime.json`.

Build carries this optional field into the generated ready index and copies
into `dist` only the linked prompts of ready styles. The full planning registry
and unlinked briefs never reach `dist`. When a ready link is removed, the
earlier copy in `dist` is removed too. Existing styles without `prompt_path`
keep the earlier selection prompt.

The gallery shows the full text, the project fields and the chosen A/B; the
composition field is filled with the chosen value and the rest of the text is
kept as written. Markdown and any HTML inside it are shown as plain text only.
If the file fails to load, the gallery never copies a short instruction in its
place: you can retry the load. When the clipboard is unavailable or permission
is refused, the same full text is selected for manual copying. The site works
from `dist` under a project subpath, without GitHub access. After copying, fill
in the fields in your own project.

## Writing an English prompt

An English brief lives at `prompts/<id>/prompt.en.md` and has `language: "en"`
in `prompts/index.json`. The gallery fills the selected A/B into this exact
line, so keep it word for word:

```
- Composition: [A OR B; default A].
```

Use `[FILL IN]`-style project fields and end with a `## Final check` section.
A Lithuanian brief, if one is added later, uses
`- Kompozicija: [A ARBA B; numatytoji A].` instead.

The owner's original prompt set and the sources that inspired it are not part
of this public repository. Public prompts contain no names of or links to them.
The prompt texts themselves are used under the repository's MIT licence; this
gives no rights to other people's images, models, fonts or sounds.

[Expansion plan](../docs/prompt-expansion-plan.md) · [Work board](../docs/STATUS.md).
