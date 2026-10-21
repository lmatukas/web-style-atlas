import { lstatSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT, fail, isId, json, text, localFile, validator, frontmatter, argumentsFor, isMain, existsSync } from './lib/files.mjs';
import { validate as validateQueue, render } from './tasks.mjs';
import {creationPrompt, loadPromptBriefs} from './prompts.mjs';

export const SECTIONS = ['Intent', 'Signature', 'Typography', 'Color and surfaces', 'Layout A', 'Layout B', 'Imagery', 'Navigation and interaction', 'Motion', 'Responsive behavior', 'Accessibility', 'Adaptation', 'Avoid', 'Closest styles'];

export function contrastRatio(foreground, background) {
  const luminance = hex => {
    const rgb = hex.slice(1).match(/../g).map(channel => parseInt(channel, 16) / 255);
    const linear = rgb.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function member(value, values, path, field) {
  if (!values.includes(value)) fail(path, field, `unregistered value ${JSON.stringify(value)}; update core/vocabularies.json explicitly`);
}

function validateTokens(tokens, assets, base) {
  const path = `${base}/tokens.json`;
  for (const [i, pair] of tokens.contrast_pairs.entries()) {
    for (const key of ['foreground', 'background']) {
      if (!Object.hasOwn(tokens.color, pair[key])) fail(path, `/contrast_pairs/${i}/${key}`, `unknown color role ${pair[key]}`);
    }
    // Never allow an authored threshold below the non-text/large-text floor.
    // Body text pairs must declare 4.5; rendered usage is verified in style tasks.
    const threshold = Math.max(3, pair.minimum_ratio);
    const actual = contrastRatio(tokens.color[pair.foreground], tokens.color[pair.background]);
    if (actual + 1e-10 < threshold) fail(path, `/contrast_pairs/${i}`, `contrast ${actual.toFixed(3)}:1 is below ${threshold}:1 (${pair.purpose})`);
  }
  for (const role of ['display', 'body']) {
    const font = tokens.typography[role];
    if (font.source === 'local') {
      const asset = assets.find(a => a.id === font.asset_id);
      if (!asset || asset.type !== 'font' || asset.path !== font.file) fail(path, `/typography/${role}/asset_id`, 'must identify a font asset with the same local file');
    }
  }
  const breakpoints = Object.values(tokens.layout.breakpoints);
  if (new Set(breakpoints).size !== breakpoints.length) fail(path, '/layout/breakpoints', 'breakpoint values must be distinct');
  // CSS custom property values must never escape their declaration or comment.
  const inspect = (value, field = '') => {
    if (typeof value === 'string' && /[;{}\u0000-\u001f]|\/\*|\*\//.test(value)) fail(path, field, 'unsafe CSS token value');
    if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) inspect(child, `${field}/${key}`);
  };
  // Descriptive prose and the glyph sample are not inserted into CSS.
  for (const key of ['color', 'spacing', 'radius', 'shadow', 'layout']) inspect(tokens[key], `/${key}`);
  for (const key of ['display', 'body', 'size', 'weight', 'line_height', 'letter_spacing']) inspect(tokens.typography[key], `/typography/${key}`);
  inspect(tokens.motion.duration, '/motion/duration'); inspect(tokens.motion.easing, '/motion/easing');
}

function validateStyle(root, id, check, vocabulary, briefs) {
  const base = `styles/${id}`, path = `${base}/style.md`;
  const reference = (target, owner, field, optional = false) => {
    try { localFile(root, `${base}/${target}`, { optional }); }
    catch (error) { fail(`${base}/${owner}`, field, error.message); }
  };
  const { metadata, body } = frontmatter(root, path);
  check('style', metadata, path);
  if (metadata.id !== id) fail(path, '/id', `must equal directory ID ${id}`);
  if (metadata.prompt_path !== undefined) {
    creationPrompt(root, id, metadata.prompt_path);
    if (briefs.get(id)?.prompt_path !== metadata.prompt_path) fail(path, '/prompt_path', 'must match this style in prompts/index.json');
  }
  member(metadata.family, vocabulary.families, path, '/family');
  for (const [field, values] of [['tags', vocabulary.tags], ['best_for', vocabulary.use_cases], ['avoid_for', vocabulary.use_cases]]) {
    metadata[field].forEach((value, index) => member(value, values, path, `/${field}/${index}`));
  }
  const headings = [...body.matchAll(/^## (.+?)\s*$/gm)].map(m => m[1]);
  for (const name of SECTIONS) {
    if (headings.filter(h => h === name).length !== 1) fail(path, `/sections/${name}`, 'required exactly once');
  }
  const words = body.trim().split(/\s+/).length;
  if (metadata.status === 'ready' && (words < 700 || words > 1200)) fail(path, '/body', `ready descriptions require 700–1200 words; found ${words}`);
  const tokens = check('tokens', json(root, `${base}/tokens.json`), `${base}/tokens.json`);
  const layouts = check('layouts', json(root, `${base}/layouts.json`), `${base}/layouts.json`);
  const { assets } = check('assets', json(root, `${base}/assets.json`), `${base}/assets.json`);
  const ids = new Set(), paths = new Set();
  for (const [i, asset] of assets.entries()) {
    for (const [key, seen] of [['id', ids], ['path', paths]]) {
      if (seen.has(asset[key])) fail(`${base}/assets.json`, `/assets/${i}/${key}`, 'duplicate asset identity');
      seen.add(asset[key]);
    }
    reference(asset.path, 'assets.json', `/assets/${i}/path`);
    if (!asset.path.startsWith('assets/')) fail(`${base}/assets.json`, `/assets/${i}/path`, 'asset files must live under assets/');
    if (asset.license_file) reference(asset.license_file, 'assets.json', `/assets/${i}/license_file`);
    if (/^(unknown|unspecified|pending|todo|tbd|none)$/i.test(asset.license.trim())) fail(`${base}/assets.json`, `/assets/${i}/license`, 'unresolved license is not redistribution evidence');
  }
  validateTokens(tokens, assets, base);
  for (const [i, variant] of layouts.variants.entries()) {
    // Drafts may be authored before their references exist. Any existing path
    // still goes through the safe resolver; ready styles require both pages.
    reference(variant.reference_path, 'layouts.json', `/variants/${i}/reference_path`, metadata.status === 'draft');
  }
  if (metadata.status === 'ready') localFile(root, `${base}/reference/style.css`);
  return { id, base, metadata, tokens, layouts, assets };
}

export function loadAtlas({ root = ROOT, style } = {}) {
  if (style && !isId(style)) fail('arguments', '--style', 'expected a style ID');
  const check = validator(root);
  const vocabulary = check('vocabularies', json(root, 'core/vocabularies.json'), 'core/vocabularies.json');
  const progress = check('progress', json(root, 'docs/progress.json'), 'docs/progress.json');
  try { validateQueue(progress); } catch (error) { fail('docs/progress.json', '/tasks', error.message); }
  if (text(root, 'docs/STATUS.md') !== render(progress)) fail('docs/STATUS.md', '/', 'stale board; run node scripts/tasks.mjs render');
  const briefs = loadPromptBriefs(root, check, progress, vocabulary);
  const directory = resolve(root, 'styles');
  let ids = [];
  if (existsSync(directory)) {
    if (lstatSync(directory).isSymbolicLink() || !lstatSync(directory).isDirectory()) fail('styles', '/', 'expected a real directory');
    ids = readdirSync(directory, { withFileTypes: true }).filter(entry => {
      if (entry.isSymbolicLink()) fail(`styles/${entry.name}`, '/', 'symlinks are not allowed');
      return entry.isDirectory();
    }).map(entry => entry.name).sort();
    for (const id of ids) if (!isId(id)) fail(`styles/${id}`, '/id', 'invalid style directory ID');
  }
  if (style && !ids.includes(style)) fail(`styles/${style}`, '/id', 'unknown style ID');
  const styles = (style ? [style] : ids).map(id => validateStyle(root, id, check, vocabulary, briefs));
  return { root, styles, check };
}

if (isMain(import.meta.url)) {
  try {
    const options = argumentsFor(process.argv.slice(2));
    const atlas = loadAtlas(options);
    console.log(`PASS: source validation; ${atlas.styles.length} style(s), template excluded. Preview/browser checks are separate.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
