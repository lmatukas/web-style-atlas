import {courses,imageDescriptions} from './data.mjs';
import {initializeBooking} from './booking.mjs';
const scene=document.querySelector('[data-runtime-scene]'),toggle=document.querySelector('[data-motion-toggle]'),status=document.querySelector('[data-runtime-status]'),media=matchMedia('(prefers-reduced-motion: reduce)');
const state={progress:1,frames:0,active:false,disposed:false,mode:'html',paused:false,reduced:media.matches};
let raf=0,started=0,visible=true,courseIndex=0,restoring=false;
function paint(progress){scene.style.setProperty('--arrival',String(progress));state.progress=progress;}
function settle(){cancelAnimationFrame(raf);raf=0;state.active=false;paint(1);}
function tick(now){if(!state.active||state.disposed)return;const progress=Math.min((now-started)/1500,1);paint(progress);state.frames++;if(progress<1)raf=requestAnimationFrame(tick);else{state.active=false;raf=0;}}
function play(){if(state.disposed||state.reduced||state.paused||document.hidden||!visible){settle();return;}cancelAnimationFrame(raf);paint(0);started=performance.now();state.active=true;raf=requestAnimationFrame(tick);}
function motionLabel(){toggle.textContent=state.paused?'Play the light':'Pause the light';toggle.setAttribute('aria-pressed',String(state.paused));status.textContent=state.reduced?'Calm view · the full menu and booking work.':state.paused?'Light change paused · the menu works.':'The light settles over 1.5 seconds.';}
function toggleMotion(){state.paused=!state.paused;document.documentElement.classList.toggle('motion-paused',state.paused);state.paused?settle():play();motionLabel();}
function reducedChange(){state.reduced=media.matches;settle();motionLabel();}
function visibility(){if(document.hidden)settle();}
function setCourse(index,{move=false}={}){
 index=Math.max(0,Math.min(courses.length-1,index));const changed=index!==courseIndex;courseIndex=index;const c=courses[index];
 for(const image of document.querySelectorAll('[data-course-photo]')){image.src=`../assets/${c.image}.webp`;image.alt=imageDescriptions[c.image];}
 for(const text of document.querySelectorAll('[data-course-title]'))text.textContent=c.name;
 for(const text of document.querySelectorAll('[data-course-time]'))text.textContent=c.time;
 for(const text of document.querySelectorAll('[data-course-chapter]'))text.textContent=c.chapter;
 for(const text of document.querySelectorAll('[data-course-count]'))text.textContent=`${String(index+1).padStart(2,'0')} / 10`;
 for(const el of document.querySelectorAll('[data-course-record]'))el.classList.toggle('current',+el.dataset.courseRecord===index);
 for(const el of document.querySelectorAll('[data-course-jump]'))el.setAttribute('aria-pressed',String(+el.dataset.courseJump===index));
 const previous=document.querySelector('[data-previous]'),next=document.querySelector('[data-next]');if(previous)previous.disabled=index===0;if(next)next.disabled=index===9;
 if(!state.paused)document.documentElement.style.setProperty('--evening',String(index/9));
 if(changed&&move){const article=document.querySelector(`[data-course-record="${index}"]`);article?.scrollIntoView({block:'center',behavior:'instant'});document.querySelector('[data-course-live]').textContent=`${index+1} of 10 · ${c.name} · ${c.time}`;}
}
function scrollCourse(){if(restoring||state.disposed||!document.querySelector('[data-course-record]'))return;const records=[...document.querySelectorAll('[data-course-record]')],target=innerHeight*.58;let chosen=null,distance=Infinity;for(const record of records){const rect=record.getBoundingClientRect();if(rect.bottom<innerHeight*.28||rect.top>innerHeight*.9)continue;const d=Math.abs(rect.top+Math.min(rect.height,240)/2-target);if(d<distance){distance=d;chosen=record;}}if(chosen)setCourse(+chosen.dataset.courseRecord);}
function previous(){setCourse(courseIndex-1,{move:true});}function next(){setCourse(courseIndex+1,{move:true});}
const jumpHandlers=[];for(const button of document.querySelectorAll('[data-course-jump]')){const fn=()=>{setCourse(+button.dataset.courseJump);document.querySelector('[data-course-live]').textContent=`${courses[courseIndex].time} · ${courses[courseIndex].name}`;};button.addEventListener('click',fn);jumpHandlers.push([button,fn]);}
toggle.addEventListener('click',toggleMotion);media.addEventListener('change',reducedChange);document.addEventListener('visibilitychange',visibility);addEventListener('scroll',scrollCourse,{passive:true});document.querySelector('[data-previous]')?.addEventListener('click',previous);document.querySelector('[data-next]')?.addEventListener('click',next);
const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)settle();},{threshold:0});observer.observe(scene);
function dispose(){settle();state.disposed=true;observer.disconnect();removeEventListener('scroll',scrollCourse);document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',reducedChange);toggle.removeEventListener('click',toggleMotion);document.querySelector('[data-previous]')?.removeEventListener('click',previous);document.querySelector('[data-next]')?.removeEventListener('click',next);for(const [button,fn] of jumpHandlers)button.removeEventListener('click',fn);}
function restore(event){if(!event.persisted)return;restoring=true;state.disposed=false;observer.observe(scene);addEventListener('scroll',scrollCourse,{passive:true});document.addEventListener('visibilitychange',visibility);media.addEventListener('change',reducedChange);toggle.addEventListener('click',toggleMotion);document.querySelector('[data-previous]')?.addEventListener('click',previous);document.querySelector('[data-next]')?.addEventListener('click',next);for(const [button,fn] of jumpHandlers)button.addEventListener('click',fn);settle();motionLabel();restoring=false;}
addEventListener('pagehide',dispose);addEventListener('pageshow',restore);
window.atlasRuntime={state};
for(const root of document.querySelectorAll('[data-booking]'))initializeBooking(root);
setCourse(0);motionLabel();play();
