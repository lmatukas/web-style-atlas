import { createMechanism } from './mechanism.mjs';
import { watchDrawing, MATERIALS, DEFAULTS, BASE_PRICE, totalPrice, angles } from './drawing.mjs';
const $=s=>document.querySelector(s), scene=$('[data-runtime-scene]'), canvas=$('[data-watch-canvas]'), fallback=$('[data-runtime-fallback]'), status=$('[data-runtime-status]'), motion=$('[data-motion-toggle]'), revealInput=$('#reveal'), revealToggle=$('[data-reveal-toggle]'), clock=$('[data-clock]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'), abort=new AbortController(), signal=abort.signal;
const state={progress:1,frames:0,active:false,disposed:false,mode:'fallback',paused:false,visible:true,reveal:.78,config:{...DEFAULTS},gearTurn:0,clockAngles:[]};
window.atlasRuntime={state};
let engine=null,raf=0,tick=0,visible=true,objectURL=null,frameDate=new Date(),staticDate=new Date('2026-01-01T10:08:32'),episodeStart=0,episodeGear=0;
const clamp=x=>Math.max(0,Math.min(1,x));
const money=n=>`${new Intl.NumberFormat('lt-LT',{maximumFractionDigits:0}).format(n)} €`;
function clockText(date){clock.textContent=[date.getHours(),date.getMinutes(),date.getSeconds()].map(n=>String(n).padStart(2,'0')).join(':');state.clockAngles=angles(date);}
function revokeImage(){if(objectURL){URL.revokeObjectURL(objectURL);objectURL=null;}}
function staticImage(){revokeImage();objectURL=URL.createObjectURL(new Blob([watchDrawing(state.config,state.reveal,staticDate)],{type:'image/svg+xml'}));fallback.src=objectURL;fallback.alt=`Zevraqelle N.01: ${Object.keys(MATERIALS).map(k=>MATERIALS[k][state.config[k]].label).join(', ')}; mechanizmas atvertas ${Math.round(state.reveal*100)} %.`;}
function paint(arrival=1){if(state.disposed)return;if(engine){engine.draw({config:state.config,reveal:state.reveal,date:frameDate,arrival,gearTurn:state.gearTurn});state.frames++;}clockText(engine?frameDate:staticDate);}
function cancel(){cancelAnimationFrame(raf);raf=0;clearTimeout(tick);tick=0;state.active=false;}
function scheduleClock(){clearTimeout(tick);if(!engine||state.paused||document.hidden||!visible||state.disposed)return;tick=setTimeout(()=>{frameDate=new Date();paint();scheduleClock();},1000-Date.now()%1000);}
function episode(){if(!engine||state.paused||document.hidden||!visible||state.disposed)return;cancelAnimationFrame(raf);episodeStart=performance.now();episodeGear=state.gearTurn;state.progress=0;state.active=true;
 const frame=now=>{if(!engine||state.paused||document.hidden||!visible||state.disposed){cancel();state.progress=1;return;}const p=clamp((now-episodeStart)/1450),ease=1-Math.pow(1-p,3);state.progress=p;state.gearTurn=episodeGear+ease*.35;paint(ease);if(p<1)raf=requestAnimationFrame(frame);else{raf=0;state.active=false;state.progress=1;scheduleClock();}};
 raf=requestAnimationFrame(frame);
}
function describe(reason=''){status.textContent=engine?(state.paused?'3D vaizdas — judesys ir laikrodis sustabdyti.':'3D mechanizmas — rodyklės rodo jūsų įrenginio laiką.'):`Statinis vaizdas — ${reason||'judesys sumažintas'}; laikas užfiksuotas.`;motion.disabled=!engine;motion.setAttribute('aria-pressed',String(state.paused));motion.textContent=engine?(state.paused?'Tęsti judesį':'Sustabdyti judesį'):'Statinis režimas';}
function useFallback(reason,redraw=false){cancel();if(engine)engine.dispose();engine=null;state.mode='fallback';state.progress=1;canvas.hidden=true;$('[data-watch-lettering]').setAttribute('hidden','');fallback.hidden=false;clockText(staticDate);if(redraw)staticImage();describe(reason);}
function init(){if(state.disposed)return;if(reduced.matches){useFallback('judesys sumažintas');return;}
 try{engine=createMechanism(canvas);state.mode='webgl';canvas.hidden=false;frameDate=new Date();paint(0);fallback.hidden=true;$('[data-watch-lettering]').removeAttribute('hidden');describe();episode();scheduleClock();}
 catch{useFallback('3D neprieinamas');}
}
function setReveal(value,manual=true){state.reveal=clamp(Number(value));revealInput.value=String(Math.round(state.reveal*100));$('#reveal-value').textContent=`${Math.round(state.reveal*100)} %`;revealToggle.setAttribute('aria-pressed',String(state.reveal>.5));revealToggle.textContent=state.reveal>.5?'Uždengti ciferblatą':'Atverti mechanizmą';if(!engine)staticImage();else paint();if(manual)state.progress=1;}
revealInput.addEventListener('input',()=>setReveal(Number(revealInput.value)/100),{signal});
revealToggle.addEventListener('click',()=>setReveal(state.reveal>.5?0:1),{signal});
scene.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowUp')next=state.reveal+.1;if(e.key==='ArrowLeft'||e.key==='ArrowDown')next=state.reveal-.1;if(e.key==='Home')next=0;if(e.key==='End')next=1;if(next!==undefined){e.preventDefault();setReveal(next);}},{signal});
let pointer=null;
scene.addEventListener('pointerdown',e=>{if(e.button!==0)return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY,initial:state.reveal};if(e.pointerType!=='touch')scene.setPointerCapture(e.pointerId);},{signal});
scene.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;if(e.pointerType==='touch'&&Math.abs(dy)>Math.abs(dx)+6){pointer=null;return;}if(Math.abs(dx)>6){setReveal(pointer.initial+dx/Math.max(160,scene.clientWidth*.6));}},{signal});
for(const event of ['pointerup','pointercancel','lostpointercapture'])scene.addEventListener(event,()=>{pointer=null;},{signal});
motion.addEventListener('click',()=>{state.paused=!state.paused;if(state.paused){cancel();state.progress=1;}else{frameDate=new Date();episode();scheduleClock();}describe();},{signal});
const story=$('.story');
function scrollReveal(){if(!story||!engine||reduced.matches||state.paused||!visible||state.disposed)return;const rect=story.getBoundingClientRect();const total=rect.height-innerHeight;if(total>0&&rect.top<0&&rect.bottom>0)setReveal(clamp(-rect.top/total),false);}
addEventListener('scroll',scrollReveal,{passive:true,signal});
const resizeObserver=new ResizeObserver(()=>{paint();});resizeObserver.observe(scene);
const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;state.visible=visible;if(!visible){cancel();state.progress=1;}else{frameDate=new Date();paint();scheduleClock();}},{threshold:0});intersection.observe(scene);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancel();state.progress=1;}else if(visible){frameDate=new Date();paint();scheduleClock();}},{signal});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();staticDate=new Date(frameDate);useFallback('3D kontekstas prarastas',true);},{signal});
reduced.addEventListener('change',()=>{if(reduced.matches){staticDate=new Date(frameDate);useFallback('judesys sumažintas',true);}else{init();}},{signal});
addEventListener('pagehide',()=>{cancel();state.disposed=true;if(engine)engine.dispose();engine=null;revokeImage();resizeObserver.disconnect();intersection.disconnect();abort.abort();},{once:true});
// A real configuration: every choice updates both rendering paths and exact totals.
const configForm=$('#configuration-form');
function configuration(){if(configForm)for(const key of Object.keys(MATERIALS))state.config[key]=configForm.elements[key].value;
 for(const key of Object.keys(MATERIALS)){const target=$(`[data-summary=${key}]`);if(target)target.textContent=MATERIALS[key][state.config[key]].label;}
 scene.dataset.lightDial=String(state.config.dial==='ivory');
 const total=totalPrice(state.config);for(const id of ['#total','#summary-total'])if($(id))$(id).textContent=money(total);if($('#extras'))$('#extras').textContent=money(total-BASE_PRICE);
 $('[data-booking-choice]').textContent=`N.01 · ${Object.keys(MATERIALS).map(k=>MATERIALS[k][state.config[k]].label).join(' · ')} · ${money(total)}`;
 if(!engine)staticImage();else paint();$('#visit-confirmation').hidden=true;
}
if(configForm){configForm.addEventListener('change',configuration,{signal});configForm.addEventListener('reset',e=>{e.preventDefault();for(const key of Object.keys(MATERIALS))configForm.elements[key].value=DEFAULTS[key];configuration();},{signal});}
// Local-only visit preparation. No storage, network, email or true booking.
const form=$('#visit-form'), errors=$('#visit-errors'), confirmation=$('#visit-confirmation');
const todayParts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Vilnius',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const part=type=>todayParts.find(x=>x.type===type).value;
const today=`${part('year')}-${part('month')}-${part('day')}`;
const offsetDay=days=>{const d=new Date(`${today}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10);};
$('#day').min=offsetDay(1);$('#day').max=offsetDay(90);
function clearErrors(){for(const key of ['salon','day','slot','name','email','ack']){$(`#error-${key}`).textContent='';$(`#${key}`).removeAttribute('aria-invalid');}errors.hidden=true;errors.textContent='';}
form.addEventListener('submit',e=>{e.preventDefault();clearErrors();confirmation.hidden=true;
 const data=new FormData(form),issues=[];const issue=(key,message)=>{issues.push(key);$(`#error-${key}`).textContent=message;$(`#${key}`).setAttribute('aria-invalid','true');};
 if(!['north','river'].includes(data.get('salon')))issue('salon','Pasirinkite saloną.');
 const day=String(data.get('day')||''),parsed=new Date(`${day}T12:00:00Z`);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||Number.isNaN(+parsed)||parsed.toISOString().slice(0,10)!==day||day<$('#day').min||day>$('#day').max)issue('day','Rinkitės dieną nuo rytojaus iki 90 dienų.');else if(parsed.getUTCDay()===0)issue('day','Sekmadieniais salonai nedirba. Rinkitės kitą dieną.');
 if(!['10:00','11:30','16:00'].includes(data.get('slot')))issue('slot','Pasirinkite laisvą vizito laiką.');
 const name=String(data.get('name')||'').trim(),email=String(data.get('email')||'').trim();
 if(name.length<2||name.length>60)issue('name','Įrašykite vardą, bent 2 ženklus.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)issue('email','Įrašykite tinkamą el. pašto adresą.');
 if(!data.has('ack'))issue('ack','Patvirtinkite, kad suprantate demonstracinę rezervaciją.');
 if(issues.length){errors.textContent=`Patikrinkite ${issues.length} laukus. Informacija neišsaugota.`;errors.hidden=false;$(`#${issues[0]}`).focus();return;}
 const salon=data.get('salon')==='north'?'Šiaurės salonas · Vilnius':'Upės salonas · Kaunas';
 confirmation.textContent=`${name}, vietinis vizito patvirtinimas parengtas.\n${salon}\n${day} · ${data.get('slot')} · 45 min.\n${$('[data-booking-choice]').textContent}\nKontaktas: ${email}\nTai demonstracija. Tikras vizitas neužsakytas, duomenys niekur neišsiųsti.`;confirmation.hidden=false;confirmation.focus();
},{signal});
form.addEventListener('input',()=>{confirmation.hidden=true;},{signal});
form.addEventListener('reset',()=>{clearErrors();confirmation.hidden=true;confirmation.textContent='';queueMicrotask(()=>$('#salon').focus());},{signal});
// The declared SVG remains the initial reduced/unavailable image for preflight.
clockText(staticDate);init();
if(engine&&document.body.dataset.variant==='a')setReveal(0,false);
if(configForm){const price=totalPrice(state.config);$('#total').textContent=money(price);$('#summary-total').textContent=money(price);$('#extras').textContent=money(price-BASE_PRICE);}
$('[data-booking-choice]').textContent=`N.01 · ${Object.keys(MATERIALS).map(k=>MATERIALS[k][state.config[k]].label).join(' · ')} · ${money(totalPrice(state.config))}`;
