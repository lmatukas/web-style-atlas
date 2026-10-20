import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from '../../scripts/build.mjs';
export const project = fileURLToPath(new URL('../../', import.meta.url));
export function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'atlas-p03-'));
  for (const path of ['gallery', 'schema', 'core', 'scripts', 'package.json', 'package-lock.json', 'docs/progress.json', 'docs/STATUS.md']) {
    mkdirSync(join(root, path.includes('.') ? path.slice(0, path.lastIndexOf('/')) || '.' : path), { recursive: true });
    cpSync(join(project, path), join(root, path), { recursive: true });
  }
  const base = 'styles/example-style';
  mkdirSync(join(root, 'styles'));
  cpSync(join(project, 'templates/style'), join(root, base), { recursive: true });
  mkdirSync(join(root, base, 'reference'), { recursive: true });
  mkdirSync(join(root, base, 'assets'), { recursive: true });
  const md = join(root, base, 'style.md');
  writeFileSync(md, readFileSync(md, 'utf8').replace('status: draft', 'status: ready'));
  writeFileSync(join(root, base, 'assets/shape.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="120" height="80" fill="#315349"/></svg>');
  const html = title => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="style.css"><title>${title}</title></head><body><main><h1>${title}</h1><p>Render fixture — Lithuanian: ą č ę ė į š ų ū ž.</p><img loading="lazy" src="../assets/shape.svg" alt="Green rectangular fixture"><p id="determinism"></p><section><h2>Below the fold</h2><p>A full-page capture includes this section.</p></section></main><script>document.querySelector('#determinism').textContent = Date.now() + ' / ' + Math.random();</script></body></html>`;
  writeFileSync(join(root, base, 'reference/index.html'), html('Preview fixture A'));
  writeFileSync(join(root, base, 'reference/alternate.html'), html('Preview fixture B'));
  writeFileSync(join(root, base, 'reference/style.css'), 'body { margin: 0; color: var(--color-text); background: var(--color-background); font: 20px sans-serif; } main { padding: 24px; } h1 { animation: appear 10s infinite; } section { margin-top: 1100px; } @keyframes appear { from { opacity: .4; } to { opacity: 1; } }');
  build({ root });
  return { root, base, path: file => join(root, base, file) };
}
