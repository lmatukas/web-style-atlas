// Read-only distinctiveness signals across style directories.
// Warnings only: these never fail validation. See docs/tasks/P19.md.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const FOOTER_THRESHOLD = 3;
const PREVIEW = /^preview.*\.png$/;
const TEXT = /\.(html|css|js|mjs|md|json|txt)$/;

const normalise = value => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
export const footerText = html => {
  const match = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i);
  return match ? normalise(match[1]) : null;
};
export const firstHeading = html => {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? normalise(match[1]) : null;
};

// Licensed font reuse (owner decision, P36): an identical font binary may appear in several styles
// only when, in every one of them, it sits at assets/fonts/<family>/<file>, that folder carries its
// licence (OFL.txt or LICENSE.txt) and the style's assets/RIGHTS.txt names the family. Anything else,
// including photos and every other binary, keeps the zero-duplicate rule and stays a warning.
const FONT = /^assets\/fonts\/([^/]+)\/[^/]+\.(woff2?|ttf|otf)$/i;
export function licensedFont(entry, path) {
  const match = path.match(FONT);
  if (!match) return false;
  const family = match[1].toLowerCase();
  return Boolean(entry.fontLicences?.includes(family)) && (entry.rights ?? '').toLowerCase().includes(family);
}

// Pure: entries = [{ id, html|null, assets: [{ path, sha256 }], rights?, fontLicences? }]
// Returns { warnings, accepted }: accepted lists shared resources covered by an explicit policy.
export function classify(entries, options = {}) {
  const accepted = [];
  const byId = new Map(entries.map(e => [e.id, e]));
  const warnings = analyze(entries, options).filter(w => {
    if (w.kind !== 'shared-asset') return true;
    const places = w.detail.split(', ');
    const ok = places.every(place => { const i = place.indexOf('/'); return licensedFont(byId.get(place.slice(0, i)), place.slice(i + 1)); });
    if (ok) accepted.push({ kind: 'shared-licensed-font', styles: w.styles, detail: w.detail });
    return !ok;
  });
  return { warnings, accepted };
}

export function analyze(entries, { footerThreshold = FOOTER_THRESHOLD } = {}) {
  const warnings = [];
  const byHash = new Map();
  for (const entry of entries) {
    for (const asset of entry.assets) {
      if (!byHash.has(asset.sha256)) byHash.set(asset.sha256, []);
      byHash.get(asset.sha256).push(`${entry.id}/${asset.path}`);
    }
  }
  for (const [hash, places] of byHash) {
    const ids = new Set(places.map(p => p.split('/')[0]));
    if (ids.size > 1) warnings.push({ kind: 'shared-asset', styles: [...ids].sort(), detail: places.sort().join(', ') });
  }
  const footers = new Map();
  const headings = new Map();
  for (const entry of entries) {
    if (!entry.html) continue;
    const f = footerText(entry.html);
    if (f) { if (!footers.has(f)) footers.set(f, []); footers.get(f).push(entry.id); }
    const h = firstHeading(entry.html);
    if (h) { if (!headings.has(h)) headings.set(h, []); headings.get(h).push(entry.id); }
  }
  for (const [text, ids] of footers) {
    if (ids.length >= footerThreshold) warnings.push({ kind: 'shared-footer', styles: ids.sort(), detail: text });
  }
  // Boilerplate: the same 5-word phrase in >= threshold footers, even when names differ.
  const shingles = new Map();
  for (const entry of entries) {
    if (!entry.html) continue;
    const f = footerText(entry.html);
    if (!f) continue;
    const words = f.toLowerCase().match(/\p{L}+/gu) ?? [];
    const seen = new Set();
    for (let i = 0; i + 5 <= words.length; i++) seen.add(words.slice(i, i + 5).join(' '));
    for (const phrase of seen) {
      if (!shingles.has(phrase)) shingles.set(phrase, new Set());
      shingles.get(phrase).add(entry.id);
    }
  }
  const boiler = [...shingles].filter(([, ids]) => ids.size >= footerThreshold);
  // Keep only maximal phrases: drop a phrase if a longer kept phrase has the same style set.
  const kept = boiler.filter(([p, ids]) => !boiler.some(([q, jds]) => q !== p && q.includes(p) && jds.size === ids.size && [...ids].every(x => jds.has(x))));
  if (kept.length) {
    const styles = [...new Set(kept.flatMap(([, ids]) => [...ids]))].sort();
    const examples = kept.map(([p]) => p).sort((a, b) => b.length - a.length).slice(0, 2).map(p => `"${p}"`);
    warnings.push({ kind: 'footer-boilerplate', styles, detail: `${kept.length} shared phrase(s), e.g. ${examples.join(', ')}` });
  }
  for (const [text, ids] of headings) {
    if (ids.length > 1) warnings.push({ kind: 'shared-heading', styles: ids.sort(), detail: text });
  }
  return warnings.sort((a, b) => a.kind.localeCompare(b.kind) || a.styles.join().localeCompare(b.styles.join()));
}

function hashFile(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

// Reads styles/<id>/reference/index.html and non-text, non-preview assets.
export function loadEntries(root = ROOT) {
  const styles = resolve(root, 'styles');
  if (!existsSync(styles)) return [];
  return readdirSync(styles).filter(name => statSync(join(styles, name)).isDirectory()).sort().map(id => {
    const dir = join(styles, id);
    const indexPath = join(dir, 'reference', 'index.html');
    const html = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : null;
    const assets = [];
    const walk = current => {
      for (const name of readdirSync(current)) {
        const full = join(current, name);
        if (statSync(full).isDirectory()) { walk(full); continue; }
        if (PREVIEW.test(name) || TEXT.test(name)) continue;
        assets.push({ path: relative(dir, full), sha256: hashFile(full) });
      }
    };
    walk(dir);
    const rightsPath = join(dir, 'assets', 'RIGHTS.txt'), fontsDir = join(dir, 'assets', 'fonts');
    const rights = existsSync(rightsPath) ? readFileSync(rightsPath, 'utf8') : '';
    const fontLicences = existsSync(fontsDir) ? readdirSync(fontsDir).filter(f => ['OFL.txt', 'LICENSE.txt'].some(l => existsSync(join(fontsDir, f, l)))).map(f => f.toLowerCase()) : [];
    return { id, html, assets, rights, fontLicences };
  });
}

export function warningsFor(root = ROOT) {
  return classify(loadEntries(root)).warnings;
}

export function acceptedFor(root = ROOT) {
  return classify(loadEntries(root)).accepted;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { warnings, accepted } = classify(loadEntries());
  for (const w of warnings) console.warn(`WARN ${w.kind}: ${w.styles.join(', ')} — ${w.detail}`);
  for (const a of accepted) console.log(`ACCEPTED ${a.kind}: ${a.styles.join(', ')} — ${a.detail}`);
  console.log(`distinctiveness: ${warnings.length} warning(s), ${accepted.length} accepted by policy; advisory only.`);
}
