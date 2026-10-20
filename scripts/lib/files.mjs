import { existsSync, lstatSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv/dist/2020.js';
import { parseDocument } from 'yaml';

export const ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const fail = (file, field, message) => { throw new Error(`${file} ${field}: ${message}`); };
export const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
export const entries = object => Object.entries(object).sort(([a], [b]) => compare(a, b));
export const isId = value => /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(value);

// Reject symlink components even when their target happens to be inside the repo.
// The same resolver guards reads and generated writes, including absent outputs.
export function localFile(root, path, { optional = false } = {}) {
  if (typeof path !== 'string' || !/^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(path) || path.split('/').some(p => p === '.' || p === '..')) {
    fail(path, '/', 'expected a safe relative POSIX file path');
  }
  let current = resolve(root);
  for (const [index, component] of path.split('/').entries()) {
    current = join(current, component);
    let stat;
    try { stat = lstatSync(current); } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      if (optional) continue;
      fail(path, '/', 'file does not exist');
    }
    if (stat?.isSymbolicLink()) fail(path, '/', 'symlinks are not allowed');
    if (stat && index < path.split('/').length - 1 && !stat.isDirectory()) fail(path, '/', 'parent is not a directory');
    if (stat && index === path.split('/').length - 1 && !stat.isFile()) fail(path, '/', 'expected a regular file');
  }
  return current;
}

export function text(root, path) { return readFileSync(localFile(root, path), 'utf8'); }
export function json(root, path) {
  try { return JSON.parse(text(root, path)); } catch (error) { fail(path, '/', error.message); }
}

export function validator(root) {
  const ajv = new Ajv({ allErrors: true, strict: true });
  const directory = resolve(root, 'schema');
  for (const name of readdirSync(directory).filter(n => n.endsWith('.schema.json')).sort()) {
    ajv.addSchema(json(root, `schema/${name}`));
  }
  return (name, data, path) => {
    const check = ajv.getSchema(`${name}.schema.json`);
    if (!check) fail(path, '/', `schema ${name} is missing`);
    if (!check(data)) {
      const error = check.errors[0];
      const suffix = error.keyword === 'required' ? `/${error.params.missingProperty}` : error.keyword === 'additionalProperties' ? `/${error.params.additionalProperty}` : '';
      fail(path, `${error.instancePath}${suffix}` || '/', error.message);
    }
    return data;
  };
}

export function frontmatter(root, path) {
  const source = text(root, path).replace(/^\uFEFF/, '');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) fail(path, '/frontmatter', 'expected a delimited YAML document');
  const document = parseDocument(match[1], { uniqueKeys: true });
  if (document.errors.length) fail(path, '/frontmatter', document.errors[0].message);
  try { return { metadata: document.toJS({ maxAliasCount: 50 }), body: match[2] }; }
  catch (error) { fail(path, '/frontmatter', error.message); }
}

export function argumentsFor(argv, { check = false } = {}) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--style' && !result.style) {
      result.style = argv[++i];
      if (!result.style || !isId(result.style)) fail('arguments', '--style', 'expected a style ID');
    } else if (argv[i] === '--check' && check && !result.check) result.check = true;
    else fail('arguments', argv[i], 'unknown or duplicate argument');
  }
  return result;
}

export const isMain = url => process.argv[1] && fileURLToPath(url) === resolve(process.argv[1]);
export { existsSync };
