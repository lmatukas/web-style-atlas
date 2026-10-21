import {cpSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fixture, project} from './preview-fixture.mjs';
import {build} from '../../scripts/build.mjs';

export function promptFixture() {
  const result = fixture(), {root, path} = result;
  const registry = JSON.parse(readFileSync(join(project, 'prompts/index.json')));
  const brief = {...registry.prompts[0], style_id: 'example-style', prompt_path: 'prompts/example-style/prompt.lt.md'};
  const source = readFileSync(join(project, registry.prompts[0].prompt_path), 'utf8') + '\n<script>window.promptExecuted=true</script>\n';
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
