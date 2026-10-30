const $=s=>document.querySelector(s), all=s=>[...document.querySelectorAll(s)], NS='http://www.w3.org/2000/svg';
function el(tag,attributes,text){const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attributes))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;}
function renderMark(target,initials,variant='round'){
 target.replaceChildren();if(target.tagName.toLowerCase()==='svg')target.setAttribute('aria-label','Monogram '+initials);
 const outline={fill:'none',stroke:'currentColor','stroke-width':1};
 if(variant==='diamond')target.append(el('path',{...outline,d:'M150 15L280 150L150 285L20 150Z'}),el('path',{...outline,d:'M150 28L267 150L150 272L33 150Z'}));
 else target.append(el('circle',{...outline,cx:150,cy:150,r:120}),el('circle',{...outline,cx:150,cy:150,r:111}));
 const checksum=[...initials].reduce((n,c)=>n+c.codePointAt(0),0),count=3+checksum%4;
 for(let i=0;i<count;i++){const y=92+i*21;target.append(el('path',{...outline,'stroke-width':.7,opacity:.4,d:`M48 ${y}Q150 ${y-20}252 ${y}M${y} 48Q${y-20} 150 ${y} 252`}));}
 const letters=[...initials],gap=letters.length===3?54:74,start=150-(letters.length-1)*gap/2;
 letters.forEach((letter,i)=>target.append(el('text',{x:start+i*gap,y:195,'text-anchor':'middle','font-size':letters.length===1?150:128,'font-style':i%2?'italic':'normal',fill:'currentColor',stroke:'currentColor','stroke-width':.35},letter)));
 target.append(el('path',{...outline,d:'M120 237Q150 252 180 237M150 44V61M44 150H61M239 150H256'}));
}
all('[data-monogram]').forEach(s=>renderMark(s,'ES'));
const periods={
 '1926':{image:'purse.webp',alt:'A historic silk purse, around 1795',caption:'1926 / A table by the window',note:'Silk purse study, around 1795. Illustration.',variant:'round'},
 '1956':{image:'gloves.webp',alt:'Historic fringed leather gloves, around 1870',caption:'1956 / The second generation',note:'Leather glove study, around 1870. Illustration.',variant:'diamond'},
 '1986':{image:'folio.svg',alt:'Original drawing of a folding leather case',caption:'1986 / The folding case',note:'Original illustration of a contemporary case.',variant:'round'},
 '2026':{image:'scarf.svg',alt:'Original drawing of a silk square with woven lines',caption:'2026 / Your initials',note:'Original illustration of a contemporary silk square.',variant:'diamond'}
};
let era='1926';
function chooseEra(key){if(!periods[key]||!$('[data-era-image]'))return;era=key;const p=periods[key];$('[data-era-image]').src='../assets/'+p.image;$('[data-era-image]').alt=p.alt;$('[data-era-caption]').textContent=p.caption;$('[data-era-status]').textContent=p.note;all('[data-era-link]').forEach(a=>a.dataset.eraLink===key?a.setAttribute('aria-current','step'):a.removeAttribute('aria-current'));renderMark($('[data-ledger-mark]'),'ES',p.variant);document.body.dataset.era=key;}
all('[data-era-link]').forEach(a=>a.addEventListener('click',()=>chooseEra(a.dataset.eraLink)));
const eraRatios=new Map();const eraObserver=new IntersectionObserver(entries=>{for(const entry of entries)eraRatios.set(entry.target,entry.isIntersecting?entry.intersectionRatio:0);const visible=[...eraRatios].filter(([,r])=>r>0).sort((a,b)=>b[1]-a[1])[0];if(visible)chooseEra(visible[0].dataset.era);},{rootMargin:'-15% 0px -20% 0px',threshold:[0,.1,.25,.5,.75]});all('[data-era]').forEach(n=>eraObserver.observe(n));

const scene=$('[data-runtime-scene]'),motion=$('[data-motion-toggle]'),mq=matchMedia('(prefers-reduced-motion: reduce)');
const state={progress:0,frames:0,active:false,disposed:false,mode:'svg'};window.atlasRuntime={state};let raf=0,started=null,elapsed=0,paused=false,visible=true;
function paint(){scene.style.setProperty('--reveal',String(.45+.55*state.progress));}
function halt(){cancelAnimationFrame(raf);raf=0;started=null;state.active=false;}
function stop(){elapsed=state.progress*1600;halt();}
function frame(t){if(!state.active||state.disposed)return;if(started===null)started=t;state.progress=Math.min(1,(elapsed+t-started)/1600);state.frames++;paint();if(state.progress<1)raf=requestAnimationFrame(frame);else{elapsed=1600;halt();$('[data-runtime-status]').textContent='The mark has settled';}}
function run(){if(state.active||state.disposed||paused||!visible||document.hidden||mq.matches||state.progress===1)return;state.active=true;raf=requestAnimationFrame(frame);}
motion.addEventListener('click',()=>{paused=!paused;paused?stop():run();motion.textContent=paused?'Resume motion':'Pause';motion.setAttribute('aria-pressed',String(paused));});
function preference(){stop();motion.disabled=mq.matches;motion.textContent=mq.matches?'Motion off':paused?'Resume motion':'Pause';if(mq.matches){state.progress=1;elapsed=1600;state.mode='static';$('[data-runtime-status]').textContent='Static mark';paint();}else state.mode='svg';run();}
function visibility(){document.hidden?stop():run();}
const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;visible?run():stop();});observer.observe(scene);mq.addEventListener('change',preference);document.addEventListener('visibilitychange',visibility);preference();paint();
addEventListener('pagehide',()=>{stop();state.disposed=true;observer.disconnect();eraObserver.disconnect();mq.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility);},{once:true});

const form=$('#personal-form'),input=$('#initials'),confirmation=$('#confirmation'),error=$('#form-error'),preview=$('.personal-preview'),mark=$('[data-object-mark]');
const threadNames={green:'Forest green',brown:'Warm brown',wine:'Dark wine'},colours={green:'var(--color-accent)',brown:'var(--color-brown)',wine:'var(--color-wine)'},positions={center:'Centre',corner:'Lower corner'};
let lastValid='ES';
const letters=v=>/^[A-Z\u0104\u010C\u0118\u0116\u012E\u0160\u0172\u016A\u017D]{1,3}$/.test(v);
function selection(){return {initials:input.value.trim().toLocaleUpperCase('lt-LT'),thread:form.elements.thread.value,placement:form.elements.placement.value};}
function invalidate(){error.hidden=true;confirmation.hidden=true;input.removeAttribute('aria-invalid');$('#demo').removeAttribute('aria-invalid');}
function update(){const s=selection();if(letters(s.initials))lastValid=s.initials;preview.style.setProperty('--thread-color',colours[s.thread]);mark.setAttribute('transform',s.placement==='corner'?'translate(330 390) scale(.26)':'translate(180 310) scale(.52)');renderMark(mark,lastValid,s.placement==='corner'?'diamond':'round');$('.live-object').setAttribute('aria-label',`Case with the initials ${lastValid}, ${threadNames[s.thread]}, ${positions[s.placement]}`);$('[data-preview-label]').textContent=`${lastValid} / ${threadNames[s.thread]} / ${positions[s.placement]}`;window.atlasPersonalization={...s,valid:letters(s.initials),displayedInitials:lastValid,era};}
form.addEventListener('input',()=>{invalidate();update();});form.addEventListener('change',()=>{invalidate();update();});
form.addEventListener('submit',e=>{e.preventDefault();invalidate();const s=selection();let message='',bad;if(!letters(s.initials)){message='Enter one to three letters, A–Z or with accents.';bad=input;}else if(!$('#demo').checked){message='Confirm that you understand this is a demonstration.';bad=$('#demo');}if(message){error.textContent=message;error.hidden=false;bad.setAttribute('aria-invalid','true');bad.focus();return;}input.value=s.initials;update();$('#confirmation-text').textContent=`Folding leather case. Initials: ${s.initials}. Thread colour: ${threadNames[s.thread]}. Place: ${positions[s.placement]}. Summary only: no order was created, no data was sent and no payment is taken.`;confirmation.hidden=false;confirmation.focus();});
form.addEventListener('reset',()=>{invalidate();requestAnimationFrame(()=>{lastValid='ES';update();});});update();
