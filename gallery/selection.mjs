export const MAX_COMPARE=3;
export function normalizeComparison(ids,styles){const known=new Set(styles.filter(s=>s.status==='ready').map(s=>s.id));return[...new Set(ids)].filter(id=>known.has(id)).slice(0,MAX_COMPARE);}
export function repositoryURL(value){try{const url=new URL(value);if(url.protocol!=='https:'||url.hostname!=='github.com'||url.username||url.password||url.search||url.hash||!/^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/.test(url.pathname))return null;return url.href.replace(/\/$/,'').replace(/\.git$/,'');}catch{return null;}}
export function selectionPrompt(style,variant,config={}){if(!style||style.status!=='ready'||!style.variants.some(v=>v.id===variant))throw new Error('Select an actual ready style and A/B variant.');const repo=repositoryURL(config.repository_url)||'[ATLAS_REPOSITORY_URL — configure before use]';const layout=style.variants.find(v=>v.id===variant);return `Build my website using Web Style Atlas.\nRepository: ${repo}\nPrimary style ID: ${style.id}\nComposition: ${variant.toUpperCase()} — ${layout.title}\n\nRead START_HERE.md and the current ready catalogue at that repository. Resolve and record its exact revision. Load only styles/${style.id}/style.md, styles/${style.id}/tokens.json, styles/${style.id}/layouts.json, styles/${style.id}/assets.json and ${layout.reference_path} as needed.\n\nPreserve these relationships:\n- ${style.signature.composition}\n- ${style.signature.typography}\n- ${style.signature.navigation}\n- ${style.signature.content_rhythm}\n\nKeep my approved brand and adapt the layout to my real content and requested platform. Check image/font redistribution rights. Write design-decision.md in my project with the atlas revision, ID, variant, invariants and mobile reflow. Build and verify the actual website; do not modify the atlas queue.\n\nMy website brief: [ADD PURPOSE, CONTENT, BRAND AND PLATFORM].`;}

// Full prompts live at prompts/<id>/prompt.<language>.md. Each language has its
// own composition placeholder line and short header.
const CREATION_TEXT = {
  lt: {
    slot: /^- Kompozicija: \[A ARBA B; numatytoji A\]\.$/m,
    fill: v => `- Kompozicija: ${v}.`,
    header: (style, v, title) => `Pasirinkta kryptis: ${style.name} (${style.id})\nPasirinkta kompozicija: ${v} — ${title}\nUžpildyk projekto pritaikymo laukus arba palik demonstracinį turinį.`
  },
  en: {
    slot: /^- Composition: \[A OR B; default A\]\.$/m,
    fill: v => `- Composition: ${v}.`,
    header: (style, v, title) => `Selected direction: ${style.name} (${style.id})\nSelected composition: ${v} — ${title}\nFill in the project fields or keep the demonstration content.`
  }
};
export function promptLanguage(style) {
  const match = /^prompts\/([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\/prompt\.(lt|en)\.md$/.exec(style?.prompt_path ?? '');
  return match && match[1] === style.id ? match[2] : null;
}
export function creationSelectionPrompt(style, variant, source) {
  const language = promptLanguage(style);
  if (!style || style.status !== 'ready' || !style.variants.some(v => v.id === variant) ||
      !language || typeof source !== 'string' || !source.trim()) {
    throw new Error('Select a ready style with a valid full creation prompt and A/B variant.');
  }
  const text = CREATION_TEXT[language], layout = style.variants.find(v => v.id === variant), v = variant.toUpperCase();
  return `${text.header(style, v, layout.title)}\n\n${source.replace(text.slot, text.fill(v))}`;
}
