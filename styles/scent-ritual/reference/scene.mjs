import {createBottle} from './bottle.mjs';
import {scents} from './data.mjs';

const scene=document.querySelector('[data-runtime-scene]'),canvas=scene.querySelector('canvas'),fallback=scene.querySelector('[data-runtime-fallback]');
const status=document.querySelector('[data-runtime-status]'),toggle=document.querySelector('[data-motion-toggle]'),slider=document.querySelector('#tilt');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let gl=null,renderer=null,raf=0,start=null,progress=1,frames=0,paused=false,disposed=false,inView=true;
let from=-.75,target=0,tilt=-.75,duration=1500,selected=scents[0],generation=0;
const stop=()=>{cancelAnimationFrame(raf);raf=0;start=null;};
const release=()=>{renderer?.release();renderer=null;};
function backup(reason){stop();progress=1;canvas.hidden=true;fallback.hidden=false;document.body.classList.add('static-mode');toggle.disabled=true;toggle.textContent='Static view';status.textContent=`Static fallback: ${reason}. The scent search and samples still work.`;}
function size(){const r=scene.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.25);canvas.width=Math.max(1,Math.round(r.width*d));canvas.height=Math.max(1,Math.round(r.height*d));}
function draw(){if(!renderer||disposed||canvas.hidden||gl.isContextLost())return;renderer.draw({width:canvas.width,height:canvas.height,tilt,phase:progress,tint:selected.tint});document.querySelector('.visual').style.setProperty('--light',String(tilt));frames++;}
function schedule(){if(!raf&&!disposed&&!paused&&!reduced.matches&&inView&&!document.hidden&&!canvas.hidden&&progress<1)raf=requestAnimationFrame(tick);}
function tick(time){raf=0;if(start===null)start=time;progress=Math.min(1,(time-start)/duration);const ease=1-(1-progress)**3;tilt=from+(target-from)*ease;draw();schedule();}
function episode(next,ms=520){stop();from=tilt;target=next;duration=ms;progress=0;if(paused||reduced.matches||canvas.hidden){tilt=target;progress=1;draw();}else schedule();}
async function init(){const ticket=++generation;stop();if(reduced.matches)return backup('reduced motion');await document.fonts.ready;if(disposed||ticket!==generation||reduced.matches)return;
  try{gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,preserveDrawingBuffer:true});if(!gl)return backup('3D unavailable');renderer=createBottle(gl);renderer.label(selected.name,selected.number);size();canvas.hidden=false;draw();fallback.hidden=true;document.body.classList.remove('static-mode');toggle.disabled=false;toggle.textContent=paused?'Resume motion':'Pause motion';status.textContent='3D glass. Move the liquid with the pointer or the slider; on a phone, use the slider.';episode(Number(slider.value)/100,1500);}catch{release();backup('3D could not start');}}
function setTilt(value){const n=Math.max(-1,Math.min(1,value));slider.value=String(Math.round(n*100/5)*5);episode(n);if(canvas.hidden)status.textContent=`Static view. Tilt set to ${slider.value}%. Moving liquid needs 3D and motion switched on.`;}
slider.addEventListener('input',()=>setTilt(Number(slider.value)/100));
scene.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||paused||canvas.hidden||document.hidden||!inView)return;const r=scene.getBoundingClientRect();setTilt(((event.clientX-r.left)/r.width-.5)*2);});
toggle.addEventListener('click',()=>{paused=!paused;toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume motion':'Pause motion';if(paused)stop();else{if(progress===1){tilt=target-.25;episode(target);}else{from=tilt;progress=0;schedule();}}});
const resize=new ResizeObserver(()=>{if(!canvas.hidden){size();draw();}});resize.observe(scene);
const intersection=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView){from=tilt;schedule();}else stop();});intersection.observe(scene);
const visibility=()=>{if(document.hidden)stop();else{from=tilt;schedule();}};document.addEventListener('visibilitychange',visibility);
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();generation++;renderer=null;backup('3D context lost');});
canvas.addEventListener('webglcontextrestored',()=>{if(!disposed){tilt=-.75;init();}});
const change=()=>{generation++;stop();release();if(reduced.matches)backup('reduced motion');else{tilt=-.75;init();}};reduced.addEventListener('change',change);
function dispose(){if(disposed)return;disposed=true;generation++;stop();resize.disconnect();intersection.disconnect();reduced.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility);release();}
addEventListener('pagehide',dispose);
window.atlasRuntime={get state(){return{progress,frames,active:Boolean(raf),disposed,mode:canvas.hidden?'fallback':'webgl',tilt,selected:selected.id,paused,inView};},
  select(id){selected=scents.find(s=>s.id===id)||selected;renderer?.label(selected.name,selected.number);fallback.style.filter={silkas:'none',samanos:'hue-rotate(36deg) saturate(.75)',gintaras:'saturate(1.5)',oras:'saturate(.25)'}[selected.id];fallback.alt=`Static view of the glass bottle. Chosen scent direction: ${selected.name}; the notes are shown alongside.`;episode(0,900);},dispose};
init();
