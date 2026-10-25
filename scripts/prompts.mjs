import {readFileSync} from 'node:fs';
import {fail, localFile, json, existsSync} from './lib/files.mjs';

export const PROMPT_LANGUAGES = ['lt', 'en'];
export const promptPathFor = (id, language) => `prompts/${id}/prompt.${language}.md`;

// The prompt file name carries its language: prompts/<id>/prompt.<language>.md.
// With a known brief language only that one path is accepted.
export function creationPrompt(root, id, path, language) {
  if (language !== undefined && !PROMPT_LANGUAGES.includes(language)) fail(String(path), '/language', `unknown prompt language ${JSON.stringify(language)}; expected ${PROMPT_LANGUAGES.join(' or ')}`);
  const expected = language === undefined ? PROMPT_LANGUAGES.map(l => promptPathFor(id, l)) : [promptPathFor(id, language)];
  if (!expected.includes(path)) fail(String(path), '/prompt_path', `expected ${expected.join(' or ')}`);
  const bytes = readFileSync(localFile(root, path));
  if (bytes.length > 65536) fail(path, '/', 'creation prompt exceeds 64 KiB');
  let source;
  try { source = new TextDecoder('utf-8', {fatal: true, ignoreBOM: true}).decode(bytes); }
  catch { fail(path, '/', 'expected UTF-8 text'); }
  if (!source.trim() || source.includes('\0')) fail(path, '/', 'expected nonempty creation prompt text without NUL');
  return source;
}

export function loadPromptBriefs(root, check, progress, vocabulary) {
  if (!existsSync(localFile(root, 'prompts/index.json', {optional: true}))) return new Map();
  const registry = check('prompt-briefs', json(root, 'prompts/index.json'), 'prompts/index.json');
  const briefs = new Map(), tasks = new Set();
  for (const brief of registry.prompts) {
    if (briefs.has(brief.style_id) || tasks.has(brief.task_id)) fail('prompts/index.json', '/prompts', 'duplicate style or task');
    if (!progress.tasks.some(task => task.id === brief.task_id)) fail('prompts/index.json', '/task_id', 'unknown task');
    if (!vocabulary.families.includes(brief.family)) fail('prompts/index.json', '/family', 'unregistered family');
    creationPrompt(root, brief.style_id, brief.prompt_path, brief.language);
    briefs.set(brief.style_id, brief); tasks.add(brief.task_id);
  }
  return briefs;
}
