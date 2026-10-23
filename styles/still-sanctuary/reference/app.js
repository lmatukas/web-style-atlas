const $ = s => document.querySelector(s);
const all = s => [...document.querySelectorAll(s)];
const periods = {
  morning: {light:'morning', image:'forest.webp', alt:'Rūko apgaubtos žalios kalvų girios', time:'07:00 — 10:00', title:'Rytas be skubėjimo.', copy:'Tylus pasivaikščiojimas miško taku. Kvėpavimo praktika ir pusryčiai tada, kai norisi. Laikas, kurio nereikia užpildyti.'},
  day: {light:'day', image:'pavilion.webp', alt:'Stiklo paviljonas tarp medžių, iliustracinė architektūros nuotrauka', time:'12:00 — 16:00', title:'Diena savo ritmu.', copy:'Pavėsis, knyga ir ilgi pietūs. Lengvas judesys sode arba valanda visiškos tylos. Pasirinkite, kas tinka šiandien.'},
  evening: {light:'evening', image:'lake.webp', alt:'Ramiame ežere atsispindi vakaro dangus ir kalnai', time:'18:00 — 21:00', title:'Vakaras prie vandens.', copy:'Lėtas pasivaikščiojimas pakrante ir šilta žolelių arbata. Dieną palydime be ekranų, stebėdami besikeičiančią šviesą.'}
};
function choosePeriod(key) {
  const p=periods[key]; document.body.dataset.light=p.light;
  all('[data-period]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.period===key)));
  $('[data-ritual-image]').src='../assets/'+p.image; $('[data-ritual-image]').alt=p.alt;
  $('[data-ritual-time]').textContent=p.time; $('[data-ritual-title]').textContent=p.title; $('[data-ritual-copy]').textContent=p.copy;
  $('[data-ritual-status]').textContent='Pasirinkta: '+({morning:'rytas',day:'diena',evening:'vakaras'})[key]+'.';
}
all('[data-period]').forEach(b=>b.addEventListener('click',()=>choosePeriod(b.dataset.period)));

// A finite, pausable photographic breath. No timer runs once the scene settles.
const scene=$('[data-runtime-scene]'), toggle=$('[data-motion-toggle]'), mq=matchMedia('(prefers-reduced-motion: reduce)');
const state={progress:0,frames:0,active:false,disposed:false,mode:'photograph'};
window.atlasRuntime={state}; let raf=0,start=null,elapsed=0,paused=false,intersecting=true;
function paint(){scene.style.setProperty('--scene-scale',String(1.045-.045*state.progress));scene.style.setProperty('--scene-light',String(.78+.22*state.progress));}
function halt(){cancelAnimationFrame(raf);raf=0;start=null;state.active=false;}
function frame(t){if(state.disposed||!state.active)return;if(start===null)start=t;state.progress=Math.min(1,(elapsed+t-start)/1600);state.frames++;paint();if(state.progress<1&&state.active)raf=requestAnimationFrame(frame);else{elapsed=1600;halt();$('[data-runtime-status]').textContent='Ramus vaizdas';}}
function run(){if(state.active||state.disposed||paused||document.hidden||!intersecting||mq.matches||state.progress===1)return;state.active=true;raf=requestAnimationFrame(frame);}
function stop(){elapsed=state.progress*1600;halt();}
toggle.addEventListener('click',()=>{paused=!paused;if(paused)stop();else run();toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Tęsti judesį':'Pristabdyti';});
function preference(){stop();toggle.disabled=mq.matches;toggle.textContent=mq.matches?'Judesys išjungtas':(paused?'Tęsti judesį':'Pristabdyti');if(mq.matches){state.progress=1;elapsed=1600;state.mode='static';paint();$('[data-runtime-status]').textContent='Statinis vaizdas';}else state.mode='photograph';run();}
function visibility(){if(document.hidden)stop();else run();}
const observer=new IntersectionObserver(([entry])=>{intersecting=entry.isIntersecting;if(!intersecting)stop();else run();});observer.observe(scene);
mq.addEventListener('change',preference);document.addEventListener('visibilitychange',visibility);preference();paint();run();
addEventListener('pagehide',()=>{stop();state.disposed=true;observer.disconnect();mq.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility);},{once:true});

const form=$('#stay-form'), error=$('#form-error'), confirmation=$('#confirmation');
const regions={forest:'Miško slėnis',water:'Ežero pakrantė',garden:'Sodo paviljonai'};
const ritualNames={walk:'Miško pasivaikščiojimas',breath:'Kvėpavimo praktika',tea:'Vakaro arbata'};
const today=new Date();today.setHours(0,0,0,0);const localDate=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
$('#arrival').min=localDate(today);$('#departure').min=localDate(new Date(today.getTime()+86400000));
$('#arrival').addEventListener('change',()=>{$('#departure').min=$('#arrival').value||localDate(today);});
function invalidate(){confirmation.hidden=true;error.hidden=true;all('[aria-invalid="true"]').forEach(e=>e.removeAttribute('aria-invalid'));}
form.addEventListener('input',invalidate);form.addEventListener('change',invalidate);
all('[data-region]').forEach(a=>a.addEventListener('click',()=>{$('#region').value=a.dataset.region;invalidate();}));
form.addEventListener('submit',e=>{e.preventDefault();invalidate();
  const d=new FormData(form),region=d.get('region'),arrival=d.get('arrival'),departure=d.get('departure'),rituals=d.getAll('ritual');
  let message='',bad;
  if(!region){message='Pasirinkite regioną.';bad=$('#region');}
  else if(!arrival||!departure){message='Pasirinkite atvykimo ir išvykimo datas.';bad=!arrival?$('#arrival'):$('#departure');}
  else if(arrival<localDate(today)){message='Atvykimo data negali būti praeityje.';bad=$('#arrival');}
  else if(departure<=arrival){message='Išvykimas turi būti vėliau už atvykimą.';bad=$('#departure');}
  else if((Date.parse(departure)-Date.parse(arrival))/86400000>21){message='Pasirinkite iki 21 nakties viešnagę.';bad=$('#departure');}
  else if(!rituals.length){message='Pasirinkite bent vieną ritualą.';bad=$('#walk');}
  else if(!d.get('demo')){message='Patvirtinkite, kad suprantate demonstracijos sąlygas.';bad=$('#demo');}
  if(message){error.textContent=message;error.hidden=false;bad.setAttribute('aria-invalid','true');bad.focus();return;}
  const nights=(Date.parse(departure)-Date.parse(arrival))/86400000;
  $('#confirmation-text').textContent=`${regions[region]}. Atvykimas ${arrival}, išvykimas ${departure}. Naktys: ${nights}. Ritualai: ${rituals.map(x=>ritualNames[x]).join(', ')}. Tai vietinė demonstracija: užklausa neišsiųsta, vieta nerezervuota.`;
  confirmation.hidden=false;confirmation.focus();
});
form.addEventListener('reset',()=>{invalidate();$('#departure').min=localDate(new Date(today.getTime()+86400000));});
