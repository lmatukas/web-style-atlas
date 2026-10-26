import {MAX_COMPARE,normalizeComparison,selectionPrompt,creationSelectionPrompt,promptLanguage} from './selection.mjs';
const config=JSON.parse(document.getElementById('atlas-config').textContent);
const atlas=JSON.parse(document.getElementById('atlas-data').textContent);
const styles=new Map(atlas.styles.map(style=>[style.id,style]));
const cards=[...document.querySelectorAll('.card')];
const fields={luxury:document.getElementById('luxury'),q:document.getElementById('search'),family:document.getElementById('family'),purpose:document.getElementById('purpose'),density:document.getElementById('density'),images:document.getElementById('images'),complexity:document.getElementById('complexity')};
let variant='a',viewport='desktop',comparison=[],chosen=null;
const promptCache=new Map();
let promptRequest=0;
async function renderPrompt(style,selectedVariant){
 const request=++promptRequest,copy=document.getElementById('copy-prompt'),textarea=document.getElementById('selection-prompt'),status=document.getElementById('copy-status');
 const full=Boolean(style?.prompt_path);copy.textContent=full?'Copy full creation prompt':'Copy selection prompt';copy.disabled=true;textarea.value='';
 document.getElementById('prompt-preview').hidden=!full;document.getElementById('creation-prompt-text').textContent='';const language=full?promptLanguage(style):null;document.getElementById('prompt-help').hidden=language!=='lt';document.getElementById('creation-prompt-text').lang=language||'en';document.getElementById('retry-prompt').hidden=true;
 if(!style)return;
 if(!full){textarea.value=selectionPrompt(style,selectedVariant,config);copy.disabled=false;return;}
 status.textContent='Loading full creation prompt…';
 try{
  if(!language)throw new Error('Invalid prompt path');
  if(!promptCache.has(style.prompt_path)){
   const response=await fetch(new URL(style.prompt_path,new URL('./',location.href)),{redirect:'error'});
   if(!response.ok)throw new Error('Prompt request failed');
   const source=await response.text();if(!source.trim()||source.length>65536||source.includes('\0'))throw new Error('Invalid prompt text');
   promptCache.set(style.prompt_path,source);
  }
  const value=creationSelectionPrompt(style,selectedVariant,promptCache.get(style.prompt_path));
  if(request!==promptRequest)return;
  textarea.value=value;document.getElementById('creation-prompt-text').textContent=value;copy.disabled=false;status.textContent='Full creation prompt ready. Preview it or copy it for your project.';
 }catch{if(request!==promptRequest)return;status.textContent='The full creation prompt could not be loaded. Retry to copy the complete brief.';document.getElementById('retry-prompt').hidden=false;}
}
function restore(){const query=new URLSearchParams(location.search);for(const[key,field]of Object.entries(fields)){const value=query.get(key)||'';field.value=key==='q'?value:([...field.options].some(o=>o.value===value)?value:'');}comparison=normalizeComparison((query.get('compare')||'').split(','),atlas.styles);chosen=styles.has(query.get('style'))?query.get('style'):null;variant=query.get('variant')==='b'?'b':'a';viewport=query.get('viewport')==='mobile'?'mobile':'desktop';render(false);}
const labels={q:'Search',family:'Families',purpose:'Use cases',density:'Densities',images:'Image needs',complexity:'Complexities',luxury:'Luxury'};
for(const field of Object.values(fields))if(field.tagName==='SELECT')for(const option of field.options)option.dataset.label=option.textContent;
function current(){return Object.fromEntries(Object.entries(fields).map(([key,field])=>[key,field.value]));}
function matches(style,values){const term=values.q.trim().toLowerCase();const text=[style.name,style.summary,...style.tags,...style.best_for].join(' ').toLowerCase();return !((values.luxury&&!style.tags.includes('luxury'))||(term&&!text.includes(term))||(values.family&&style.family!==values.family)||(values.purpose&&!style.best_for.includes(values.purpose))||(values.density&&style.density!==values.density)||(values.images&&style.image_dependency!==values.images)||(values.complexity&&style.complexity!==values.complexity));}
function countWith(values){let total=0;for(const style of atlas.styles)if(matches(style,values))total++;return total;}
const plural=n=>`${n} ${n===1?'direction':'directions'}`;
function renderOptionCounts(values){for(const[key,field]of Object.entries(fields)){if(field.tagName!=='SELECT')continue;for(const option of field.options)option.textContent=`${option.dataset.label} (${countWith({...values,[key]:option.value})})`;}}
function filterName(key,value){if(key==='q')return `search “${value.trim()}”`;const option=[...fields[key].options].find(item=>item.value===value);return `${labels[key]}: ${option?.dataset.label||value}`;}
function renderEmpty(values,count){const list=document.getElementById('empty-fixes'),hint=document.getElementById('empty-hint');list.replaceChildren();if(count)return;const fixes=Object.keys(fields).filter(key=>values[key].trim()).map(key=>({key,count:countWith({...values,[key]:''})})).filter(fix=>fix.count>0).sort((a,b)=>b.count-a.count);hint.textContent=fixes.length?'These filters exclude each other. Remove one:':'No single change brings results back. Reset the filters to start again.';for(const fix of fixes){const item=document.createElement('li'),button=document.createElement('button');button.type='button';button.dataset.removeFilter=fix.key;button.textContent=`${fix.key==='q'?'Clear':'Remove'} ${filterName(fix.key,values[fix.key])} → ${plural(fix.count)}`;button.addEventListener('click',()=>{fields[fix.key].value='';render();fields[fix.key].focus();});item.append(button);list.append(item);}}
function render(update=true){let count=0;const values=current();for(const card of cards){const style=styles.get(card.dataset.style);card.hidden=!matches(style,values);if(!card.hidden)count++;const layout=style.variants.find(v=>v.id===variant);const image=card.querySelector('img'),link=card.querySelector('.preview-link');image.src=viewport==='mobile'?layout.preview_mobile_path:layout.preview_path;image.alt=`${style.name}, composition ${variant.toUpperCase()}, ${viewport}: ${style.signature.composition}`;link.href=image.getAttribute('src');link.dataset.mode=viewport;card.querySelector('.reference-link').href=layout.reference_path;card.querySelector('.variant-name').textContent=layout.title;}
 document.getElementById('result-count').textContent=plural(count);document.getElementById('empty').hidden=count!==0;renderOptionCounts(values);renderEmpty(values,count);
 for(const button of document.querySelectorAll('[data-variant]'))button.setAttribute('aria-pressed',String(button.dataset.variant===variant));for(const button of document.querySelectorAll('[data-viewport]'))button.setAttribute('aria-pressed',String(button.dataset.viewport===viewport));
 renderSelection();
 if(update){const query=new URLSearchParams(location.search);for(const[key,field]of Object.entries(fields)){if(field.value)query.set(key,field.value);else query.delete(key);}if(variant==='b')query.set('variant','b');else query.delete('variant');if(viewport==='mobile')query.set('viewport','mobile');else query.delete('viewport');if(comparison.length)query.set('compare',comparison.join(','));else query.delete('compare');if(chosen)query.set('style',chosen);else query.delete('style');history.replaceState(null,'',location.pathname+(query.size?'?'+query:'')+location.hash);}}
for(const field of Object.values(fields))field.addEventListener(field.type==='search'?'input':'change',()=>render());
for(const button of document.querySelectorAll('[data-variant]'))button.addEventListener('click',()=>{variant=button.dataset.variant;render();});for(const button of document.querySelectorAll('[data-viewport]'))button.addEventListener('click',()=>{viewport=button.dataset.viewport;render();});
document.getElementById('reset').addEventListener('click',()=>{for(const field of Object.values(fields))field.value='';render();fields.q.focus();});
function renderSelection(){
 for(const card of cards){const checkbox=card.querySelector('.compare-choice');checkbox.checked=comparison.includes(card.dataset.style);checkbox.disabled=!checkbox.checked&&comparison.length>=MAX_COMPARE;card.querySelector('.choose-style').setAttribute('aria-pressed',String(chosen===card.dataset.style));}
 document.getElementById('compare-status').textContent=comparison.length?`${comparison.length} of ${MAX_COMPARE} directions selected for comparison.`:`Choose up to ${MAX_COMPARE} directions to compare.`;
 document.getElementById('compare-jump').hidden=!comparison.length;document.getElementById('comparison').hidden=!comparison.length;
 const container=document.getElementById('compare-cards');container.replaceChildren();
 for(const id of comparison){const style=styles.get(id),layout=style.variants.find(v=>v.id===variant);const article=document.createElement('article');article.className='compare-card';const image=document.createElement('img');image.src=viewport==='mobile'?layout.preview_mobile_path:layout.preview_path;image.alt=`${style.name}, ${variant.toUpperCase()} ${viewport}: ${style.signature.composition}`;const title=document.createElement('h3');title.textContent=style.name;const description=document.createElement('p');description.textContent=style.signature.composition;const tradeoff=document.createElement('p');tradeoff.textContent=`Images: ${style.image_dependency}. Complexity: ${style.complexity}.`;const link=document.createElement('a');link.href=layout.reference_path;link.textContent='Open working example ↗';const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+style.name+' from comparison');remove.addEventListener('click',()=>{comparison=comparison.filter(value=>value!==id);render();});article.append(image,title,description,tradeoff,link,document.createElement('br'),remove);container.append(article);}
 const handoff=document.getElementById('handoff');handoff.hidden=!chosen;if(chosen){const style=styles.get(chosen),layout=style.variants.find(v=>v.id===variant);document.getElementById('handoff-heading').textContent=style.name;document.getElementById('chosen-variant').textContent=`${style.id} / Composition ${variant.toUpperCase()} — ${layout.title}`;}
 document.getElementById('copy-status').textContent='';document.getElementById('prompt-fallback').hidden=true;
 void renderPrompt(chosen?styles.get(chosen):null,variant);
}
for(const card of cards){card.querySelector('.preview-prompt')?.addEventListener('click',()=>{chosen=card.dataset.style;render();document.getElementById('prompt-preview').open=true;document.getElementById('handoff').scrollIntoView({block:'start'});document.getElementById('prompt-preview').querySelector('summary').focus();});card.querySelector('.compare-choice').addEventListener('change',event=>{const id=card.dataset.style;comparison=event.target.checked?normalizeComparison([...comparison,id],atlas.styles):comparison.filter(value=>value!==id);render();});card.querySelector('.choose-style').addEventListener('click',()=>{chosen=card.dataset.style;render();document.getElementById('handoff').scrollIntoView({block:'start'});});}
document.getElementById('clear-comparison').addEventListener('click',()=>{comparison=[];render();});
document.getElementById('retry-prompt').addEventListener('click',()=>void renderPrompt(styles.get(chosen),variant));
document.getElementById('copy-prompt').addEventListener('click',async()=>{const textarea=document.getElementById('selection-prompt'),value=textarea.value,request=promptRequest,full=Boolean(styles.get(chosen)?.prompt_path);if(!value)return;try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(value);if(request===promptRequest)document.getElementById('copy-status').textContent=full?'Full creation prompt copied.':'Selection prompt copied.';}catch{if(request!==promptRequest)return;document.getElementById('prompt-fallback').hidden=false;textarea.focus();textarea.select();document.getElementById('copy-status').textContent='Clipboard unavailable. Copy the selected text below.';}});
window.addEventListener('popstate',restore);restore();
