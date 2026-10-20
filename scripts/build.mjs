import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, posix } from 'node:path';
import { checkPreviews } from './previews.mjs';
import { loadAtlas } from './validate.mjs';
import { ROOT, fail, entries, localFile, argumentsFor, isMain, existsSync } from './lib/files.mjs';

const ordered = value => Array.isArray(value) ? value.map(ordered) : value && typeof value === 'object' ? Object.fromEntries(entries(value).map(([key, child]) => [key, ordered(child)])) : value;
export const serialize = value => `${JSON.stringify(ordered(value), null, 2)}\n`;
const cssName = value => value.replaceAll('_', '-');
const quoted = value => JSON.stringify(value);

export function tokenCSS(tokens) {
  const properties = new Map();
  const put = (name, value) => {
    if (properties.has(name)) fail('tokens.json', name, 'CSS custom-property name collision');
    properties.set(name, value);
  };
  const scale = (prefix, values, suffix = '') => {
    for (const [name, value] of entries(values)) put(`--${prefix}-${cssName(name)}`, `${value}${suffix}`);
  };
  scale('color', tokens.color);
  for (const role of ['display', 'body']) {
    const font = tokens.typography[role];
    const generic = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong']);
    put(`--font-${role}`, [quoted(font.family), ...font.fallback_stack.map(name => generic.has(name) ? name : quoted(name))].join(', '));
  }
  for (const [group, prefix] of [['size', 'font-size'], ['weight', 'font-weight'], ['line_height', 'line-height'], ['letter_spacing', 'letter-spacing']]) scale(prefix, tokens.typography[group]);
  for (const group of ['spacing', 'radius', 'shadow']) scale(group, tokens[group]);
  scale('motion-duration', tokens.motion.duration, 'ms');
  scale('motion-easing', tokens.motion.easing);
  put('--layout-content-max-width', tokens.layout.content_max_width);
  put('--layout-text-max-width', tokens.layout.text_max_width);
  scale('breakpoint', tokens.layout.breakpoints, 'px');
  const lines = ['/* Generated from tokens.json. Do not edit. */', ':root {'];
  for (const [name, value] of entries(Object.fromEntries(properties))) lines.push(`  ${name}: ${value};`);
  lines.push('}', '');
  const faces = new Set();
  for (const role of ['display', 'body']) {
    const font = tokens.typography[role];
    if (font.source !== 'local') continue;
    const url = posix.relative('reference', font.file);
    const face = `@font-face {\n  font-family: ${quoted(font.family)};\n  src: url(${quoted(url)});\n  font-display: swap;\n}\n`;
    if (!faces.has(face)) { faces.add(face); lines.push(face); }
  }
  // A CSS custom property cannot be used in @media conditions. Authors use the
  // documented numeric breakpoints in media queries; browser checks verify them.
  lines.push('/* Breakpoint variables document the values; use numeric @media conditions. */', '/* With prefers-reduced-motion: reduce, remove nonessential motion in style.css. */', '');
  return lines.join('\n');
}

export function generatedFiles(atlas) {
  const files = new Map();
  for (const style of atlas.styles) files.set(`${style.base}/reference/tokens.css`, tokenCSS(style.tokens));
  const ready = atlas.styles.filter(style => style.metadata.status === 'ready');
  const index = { schema_version: 1, styles: ready.map(style => ({
    ...style.metadata,
    style_path: `${style.base}/style.md`,
    variants: style.layouts.variants.map(variant => ({
      id: variant.id, title: variant.title, reference_path: `${style.base}/${variant.reference_path}`,
      preview_path: `${style.base}/${variant.id === 'a' ? 'preview.png' : 'preview-alt.png'}`,
      preview_mobile_path: `${style.base}/${variant.id === 'a' ? 'preview-mobile.png' : 'preview-alt-mobile.png'}`
    }))
  })) };
  atlas.check('index', index, 'catalog/index.json');
  files.set('catalog/index.json', serialize(index));
  const cell = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '&#124;').replace(/[\r\n]+/g, ' ').replaceAll('[', '&#91;').replaceAll(']', '&#93;').replaceAll('`', '&#96;').replaceAll('\\', '&#92;');
  const markdown = ['# Web Style Atlas', '', '<!-- GENERATED from ready style metadata and layouts. Do not edit. -->', '', `Ready styles: ${ready.length}. Drafts and templates are excluded.`, '', '| Style | Family | Summary | Variants |', '|---|---|---|---|'];
  for (const style of index.styles) {
    const variants = style.variants.map(variant => `[${variant.id.toUpperCase()}: ${cell(variant.title)}](../${variant.reference_path})`).join(' · ');
    markdown.push(`| [${cell(style.name)}](../${style.style_path}) | ${cell(style.family)} | ${cell(style.summary)} | ${variants} |`);
  }
  markdown.push('');
  files.set('catalog/index.md', markdown.join('\n'));
  return files;
}

export function build({ root = ROOT, style, check = false } = {}) {
  // Indexes always reflect the complete catalogue. A style-scoped build changes
  // only that style's tokens, but still validates every indexed entry.
  const atlas = loadAtlas({ root });
  if (style && !atlas.styles.some(entry => entry.id === style)) fail(`styles/${style}`, '/id', 'unknown style ID');
  const files = generatedFiles(atlas);
  const selected = [...files].filter(([path]) => !style || path.startsWith('catalog/') || path.startsWith(`styles/${style}/`));
  // Preflight all destinations before writing any generated file.
  const outputs = selected.map(([path, contents]) => ({ path, contents, absolute: localFile(root, path, { optional: true }) }));
  if (check) {
    for (const { path, contents, absolute } of outputs) {
      if (!existsSync(absolute) || readFileSync(absolute, 'utf8') !== contents) fail(path, '/', 'generated drift; run npm run build');
    }
    checkPreviews(atlas, { style });
  } else {
    for (const { contents, absolute } of outputs) {
      if (existsSync(absolute) && readFileSync(absolute, 'utf8') === contents) continue;
      mkdirSync(dirname(absolute), { recursive: true });
      writeFileSync(absolute, contents);
    }
  }
  return { styles: atlas.styles.length, outputs: selected.length, ready: atlas.styles.filter(entry => entry.metadata.status === 'ready').length };
}

if (isMain(import.meta.url)) {
  try {
    const options = argumentsFor(process.argv.slice(2), { check: true });
    const result = build(options);
    console.log(`PASS: ${options.check ? 'generated text matches' : 'generated text built'}; ${result.styles} style(s), ${result.outputs} output(s), ${result.ready} ready. Preview freshness checked for publication in check mode.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
