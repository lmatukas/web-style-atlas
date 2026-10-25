import {cpSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fixture, project} from './preview-fixture.mjs';
import {build} from '../../scripts/build.mjs';

const LT_SAMPLE = `# Example Style — svetainės kūrimo promptas

Sukurk veikiančią svetainę vartotojo projekte. Atlaso ar jo darbų registro nekeisk.

## Pritaikyk projektui

- Prekės ženklas ir veikla: [ĮRAŠYK SAVO ARBA PALIK DEMONSTRACIJĄ].
- Auditorija ir pagrindinis veiksmas: [ĮRAŠYK].
- Kompozicija: [A ARBA B; numatytoji A].

A kompozicija: pirmas išdėstymas. B kompozicija: antras išdėstymas su kita turinio struktūra.

## Baigimo patikra

Patikrink 360, 390, 768 ir 1440 px pločius, klaviatūrą ir sumažintą judesį. Užbaik įgyvendinimą; vien planas nėra rezultatas.
`;

export function promptFixture() {
  const result = fixture(), {root, path} = result;
  const registry = JSON.parse(readFileSync(join(project, 'prompts/index.json')));
  // Real briefs are converted to English one by one (P38–P63), so the
  // Lithuanian prompt used to test lt support is a fixed sample here.
  const brief = {...registry.prompts[0], style_id: 'example-style', language: 'lt', prompt_path: 'prompts/example-style/prompt.lt.md'};
  const source = LT_SAMPLE + '\n<script>window.promptExecuted=true</script>\n';
  const promptFile = join(root, brief.prompt_path);
  mkdirSync(join(root, 'prompts/example-style'), {recursive: true});
  writeFileSync(promptFile, source);
  registry.prompts = [brief];
  writeFileSync(join(root, 'prompts/index.json'), JSON.stringify(registry));
  const md = path('style.md');
  writeFileSync(md, readFileSync(md, 'utf8').replace('status: ready', `status: ready\nprompt_path: ${brief.prompt_path}`));
  for (const name of ['preview.png', 'preview-mobile.png', 'preview-alt.png', 'preview-alt-mobile.png']) {
    cpSync(join(project, 'styles/swiss-grid/preview.png'), path(name));
  }
  writeFileSync(path('runtime.json'), JSON.stringify({schema_version:1,renderer:'webgl',audio:true,stable_state:'reduced-motion',motion:'finite-with-pause'}));
  build({root});
  return {...result, source, brief, promptFile, registry};
}
