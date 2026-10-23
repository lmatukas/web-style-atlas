import { cpSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fixture, project } from './preview-fixture.mjs';
import { build } from '../../scripts/build.mjs';
export function luxuryFixture() {
  const f = fixture(), { path, root } = f;
  mkdirSync(path('assets/fonts'), { recursive: true });
  for (const file of ['NotoSans-Regular.woff2', 'OFL.txt']) cpSync(join(project, 'tests/fixtures/luxury/fonts', file), path('assets/fonts/' + file));
  cpSync(join(project, 'styles/cinematic-photo/assets/forest.webp'), path('assets/forest.webp'));
  cpSync(join(project, 'styles/cinematic-photo/assets/RIGHTS.txt'), path('assets/RIGHTS.txt'));
  const photo = JSON.parse(readFileSync(join(project, 'styles/cinematic-photo/assets.json'))).assets[0];
  const font = { id: 'body-font', path: 'assets/fonts/NotoSans-Regular.woff2', type: 'font', origin: 'third_party', source_url: 'https://github.com/google/fonts/tree/main/ofl/notosans', creator: 'The Noto Project Authors', license: 'OFL-1.1', license_file: 'assets/fonts/OFL.txt', attribution: 'Noto Sans — The Noto Project Authors (OFL-1.1)', redistribution_allowed: true, modifications: ['Instanced width 100 and weight 400; subset ASCII and Lithuanian glyphs, WOFF2'] };
  const fallback = { id: 'static-object', path: 'assets/fallback.svg', type: 'illustration', origin: 'original', creator: 'Web Style Atlas contributors', license: 'MIT', attribution: 'Web Style Atlas contributors', redistribution_allowed: true, modifications: [] };
  writeFileSync(path('assets.json'), JSON.stringify({ schema_version: 1, assets: [font, photo, fallback] }));
  const tokens = JSON.parse(readFileSync(path('tokens.json')));
  for (const role of ['body', 'display']) tokens.typography[role] = { family: 'Noto Sans', fallback_stack: ['sans-serif'], source: 'local', file: font.path, asset_id: font.id };
  writeFileSync(path('tokens.json'), JSON.stringify(tokens));
  let html = readFileSync(join(project, 'tests/fixtures/runtime/index.html'), 'utf8');
  const svg = html.match(/<svg data-runtime-fallback[\s\S]*?<\/svg>/)[0].replace('data-runtime-fallback hidden', 'xmlns="http://www.w3.org/2000/svg"');
  writeFileSync(path('assets/fallback.svg'), svg);
  html = html.replace(/<svg data-runtime-fallback[\s\S]*?<\/svg>/, '<img data-runtime-fallback hidden src="../assets/fallback.svg" alt="Statinis vario objektas">').replace('</head>', '<link rel="stylesheet" href="tokens.css"><style>body{font-family:"Noto Sans",sans-serif}img[data-runtime-fallback]{width:100%;height:300px}</style></head>').replace('</h1>', '</h1><p>ĄČĘĖĮŠŲŪŽ ąčęėįšųūž</p><img width="240" src="../assets/forest.webp" alt="Miško kadras">');
  for (const page of ['index.html', 'alternate.html']) writeFileSync(path(`reference/${page}`), html);
  let scene = readFileSync(join(project, 'tests/fixtures/runtime/scene.mjs'), 'utf8');
  scene = scene.replace('function init(){try{', "function init(){if(reduced.matches){backup();status.textContent='Statinis vaizdas: sumažintas judesys.';return;}try{");
  writeFileSync(path('reference/scene.mjs'), scene);
  writeFileSync(path('runtime.json'), JSON.stringify({ schema_version: 1, renderer: 'webgl', audio: true, stable_state: 'reduced-motion', motion: 'finite-with-pause', static_fallback: fallback.path }));
  build({ root });
  return f;
}
