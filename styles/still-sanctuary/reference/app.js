const $ = s => document.querySelector(s);
const all = s => [...document.querySelectorAll(s)];
const periods = {
  morning: {light:'morning', image:'forest.webp', alt:'Green wooded hills wrapped in mist', time:'07:00 — 10:00', title:'A morning without hurry.', copy:'A quiet walk along the forest path. Breathing practice, and breakfast whenever you want it. Time that does not need filling.'},
  day: {light:'day', image:'pavilion.webp', alt:'A glass pavilion among the trees, an illustrative architecture photograph', time:'12:00 — 16:00', title:'A day at your own pace.', copy:'Shade, a book and a long lunch. Gentle movement in the garden or an hour of complete quiet. Choose what suits you today.'},
  evening: {light:'evening', image:'lake.webp', alt:'The evening sky and mountains reflected in a calm lake', time:'18:00 — 21:00', title:'An evening by the water.', copy:'A slow walk along the shore and a warm herbal tea. We see the day out without screens, watching the light change.'}
};
function choosePeriod(key) {
  const p=periods[key]; document.body.dataset.light=p.light;
  all('[data-period]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.period===key)));
  $('[data-ritual-image]').src='../assets/'+p.image; $('[data-ritual-image]').alt=p.alt;
  $('[data-ritual-time]').textContent=p.time; $('[data-ritual-title]').textContent=p.title; $('[data-ritual-copy]').textContent=p.copy;
  $('[data-ritual-status]').textContent='Selected: '+({morning:'morning',day:'day',evening:'evening'})[key]+'.';
}
all('[data-period]').forEach(b=>b.addEventListener('click',()=>choosePeriod(b.dataset.period)));

// A finite, pausable photographic breath. No timer runs once the scene settles.
const scene=$('[data-runtime-scene]'), toggle=$('[data-motion-toggle]'), mq=matchMedia('(prefers-reduced-motion: reduce)');
const state={progress:0,frames:0,active:false,disposed:false,mode:'photograph'};
window.atlasRuntime={state}; let raf=0,start=null,elapsed=0,paused=false,intersecting=true;
function paint(){scene.style.setProperty('--scene-scale',String(1.045-.045*state.progress));scene.style.setProperty('--scene-light',String(.78+.22*state.progress));}
function halt(){cancelAnimationFrame(raf);raf=0;start=null;state.active=false;}
function frame(t){if(state.disposed||!state.active)return;if(start===null)start=t;state.progress=Math.min(1,(elapsed+t-start)/1600);state.frames++;paint();if(state.progress<1&&state.active)raf=requestAnimationFrame(frame);else{elapsed=1600;halt();$('[data-runtime-status]').textContent='Settled view';}}
function run(){if(state.active||state.disposed||paused||document.hidden||!intersecting||mq.matches||state.progress===1)return;state.active=true;raf=requestAnimationFrame(frame);}
function stop(){elapsed=state.progress*1600;halt();}
toggle.addEventListener('click',()=>{paused=!paused;if(paused)stop();else run();toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume motion':'Pause';});
function preference(){stop();toggle.disabled=mq.matches;toggle.textContent=mq.matches?'Motion off':(paused?'Resume motion':'Pause');if(mq.matches){state.progress=1;elapsed=1600;state.mode='static';paint();$('[data-runtime-status]').textContent='Static view';}else state.mode='photograph';run();}
function visibility(){if(document.hidden)stop();else run();}
const observer=new IntersectionObserver(([entry])=>{intersecting=entry.isIntersecting;if(!intersecting)stop();else run();});observer.observe(scene);
mq.addEventListener('change',preference);document.addEventListener('visibilitychange',visibility);preference();paint();run();
addEventListener('pagehide',()=>{stop();state.disposed=true;observer.disconnect();mq.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility);},{once:true});

const form=$('#stay-form'), error=$('#form-error'), confirmation=$('#confirmation');
const regions={forest:'Forest valley',water:'Lakeshore',garden:'Garden pavilions'};
const ritualNames={walk:'Forest walk',breath:'Breathing practice',tea:'Evening tea'};
const today=new Date();today.setHours(0,0,0,0);const localDate=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
$('#arrival').min=localDate(today);$('#departure').min=localDate(new Date(today.getTime()+86400000));
$('#arrival').addEventListener('change',()=>{$('#departure').min=$('#arrival').value||localDate(today);});
function invalidate(){confirmation.hidden=true;error.hidden=true;all('[aria-invalid="true"]').forEach(e=>e.removeAttribute('aria-invalid'));}
form.addEventListener('input',invalidate);form.addEventListener('change',invalidate);
all('[data-region]').forEach(a=>a.addEventListener('click',()=>{$('#region').value=a.dataset.region;invalidate();}));
form.addEventListener('submit',e=>{e.preventDefault();invalidate();
  const d=new FormData(form),region=d.get('region'),arrival=d.get('arrival'),departure=d.get('departure'),rituals=d.getAll('ritual');
  let message='',bad;
  if(!region){message='Choose a region.';bad=$('#region');}
  else if(!arrival||!departure){message='Choose arrival and departure dates.';bad=!arrival?$('#arrival'):$('#departure');}
  else if(arrival<localDate(today)){message='The arrival date cannot be in the past.';bad=$('#arrival');}
  else if(departure<=arrival){message='Departure must be later than arrival.';bad=$('#departure');}
  else if((Date.parse(departure)-Date.parse(arrival))/86400000>21){message='Choose a stay of up to 21 nights.';bad=$('#departure');}
  else if(!rituals.length){message='Choose at least one ritual.';bad=$('#walk');}
  else if(!d.get('demo')){message='Confirm that you understand this is a demonstration.';bad=$('#demo');}
  if(message){error.textContent=message;error.hidden=false;bad.setAttribute('aria-invalid','true');bad.focus();return;}
  const nights=(Date.parse(departure)-Date.parse(arrival))/86400000;
  $('#confirmation-text').textContent=`${regions[region]}. Arrival ${arrival}, departure ${departure}. Nights: ${nights}. Rituals: ${rituals.map(x=>ritualNames[x]).join(', ')}. This is a local demonstration: no enquiry was sent and nothing was booked.`;
  confirmation.hidden=false;confirmation.focus();
});
form.addEventListener('reset',()=>{invalidate();$('#departure').min=localDate(new Date(today.getTime()+86400000));});
