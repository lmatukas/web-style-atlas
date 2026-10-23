import { readFileSync, readdirSync, lstatSync, existsSync } from 'node:fs';
import { dirname, basename } from 'node:path';
import { fail, localFile } from './files.mjs';
import { missingGlyphs } from './font-coverage.mjs';
const photoLicenses = new Set(['CC0-1.0', 'PD-USGov', 'Public domain', 'Public domain (Highsmith dedication)', 'PDM-1.0']);
export function validateAssetPolicy(root, base, assets) {
  let fonts = 0, photos = 0;
  for (const [i, asset] of assets.entries()) {
    const path = `${base}/assets.json`, field = `/assets/${i}`;
    const bytes = readFileSync(localFile(root, `${base}/${asset.path}`));
    if (asset.type === 'font') {
      fonts += bytes.length;
      if (asset.license !== 'OFL-1.1' || !asset.path.endsWith('.woff2')) fail(path, field, 'fonts require OFL-1.1 and a local .woff2 file');
      if (asset.license_file !== `${dirname(asset.path)}/OFL.txt`) fail(path, field, 'font requires adjacent OFL.txt');
      const license = readFileSync(localFile(root, `${base}/${asset.license_file}`), 'utf8');
      if (!/SIL OPEN FONT LICENSE\s+Version 1\.1/i.test(license) || license.length < 3000) fail(path, field, 'OFL.txt must contain the full SIL Open Font License 1.1');
      let missing;
      try { missing = missingGlyphs(bytes); } catch (error) { fail(path, field, error.message); }
      if (missing.length) fail(path, field, `font lacks Lithuanian glyphs: ${missing.join('')}`);
    }
    if (asset.type === 'image' || /\.(webp|jpe?g|png|avif)$/i.test(asset.path)) {
      photos += bytes.length;
      if (!photoLicenses.has(asset.license)) fail(path, field, 'photographs require CC0-1.0 or documented public-domain rights');
      if (!asset.license_file || basename(asset.license_file) !== 'RIGHTS.txt') fail(path, field, 'photographs require RIGHTS.txt');
      const rights = readFileSync(localFile(root, `${base}/${asset.license_file}`), 'utf8');
      if (rights.trim().length < 40) fail(path, field, 'RIGHTS.txt must document source, creator and rights');
    }
  }
  if (fonts > 200_000) fail(`${base}/assets.json`, '/assets', 'font budget exceeds 200 KB per style');
  if (photos > 1_500_000) fail(`${base}/assets.json`, '/assets', 'photograph budget exceeds 1.5 MB per style');
  const inventory = new Set(assets.filter(a => a.type === 'font').map(a => a.path));
  const auditFonts = path => {
    if (!existsSync(`${root}/${base}/${path}`)) return;
    if (lstatSync(`${root}/${base}/${path}`).isSymbolicLink()) fail(`${base}/${path}`, '/', 'symlinks are not allowed');
    for (const entry of readdirSync(`${root}/${base}/${path}`, { withFileTypes: true })) {
      const child = `${path}/${entry.name}`;
      if (entry.isDirectory()) auditFonts(child);
      else if (/\.(woff2?|ttf|otf)$/i.test(entry.name) && !inventory.has(child)) fail(`${base}/${child}`, '/', 'bundled fonts require an OFL font asset record');
    }
  };
  auditFonts('assets');
  const walk = path => {
    if (lstatSync(`${root}/${path}`).isSymbolicLink()) fail(path, '/', 'symlinks are not allowed');
    for (const entry of readdirSync(`${root}/${path}`, { withFileTypes: true })) {
      const child = `${path}/${entry.name}`;
      if (entry.isDirectory()) walk(child);
      else if (/\.(css|html)$/i.test(entry.name)) {
        const source = readFileSync(localFile(root, child), 'utf8').replace(/\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/g, '').replace(/\\([0-9a-f]{1,6})\s?/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16))).replace(/\\([^\n])/g, '$1');
        if (/@import\s+(?:url\(\s*)?["']?\s*(?:https?:|\/\/|data:)/i.test(source) || /@font-face\s*\{[^}]*url\(\s*["']?\s*(?:https?:|\/\/|data:)/i.test(source) || /<link\b[^>]*(?:https?:|\/\/)[^>]*>/i.test(source)) fail(child, '/', 'external stylesheets/fonts are forbidden; bundle local OFL WOFF2 fonts');
      }
    }
  };
  // References may be absent on a draft. All authored reference CSS/HTML is checked.
  if (!existsSync(`${root}/${base}/reference`)) return;
  walk(`${base}/reference`);
}
