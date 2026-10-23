// Original depth-tested geometry; no model, texture or rendering dependency.
const scene = document.querySelector('[data-runtime-scene]');
const canvas = scene.querySelector('canvas');
const fallback = scene.querySelector('[data-runtime-fallback]');
const status = document.querySelector('[data-runtime-status]');
const toggle = document.querySelector('[data-motion-toggle]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const variant = document.body.dataset.variant;
let gl, program, meshes = [], raf = 0, start = 0, progress = 0, frames = 0;
let paused = false, disposed = false, inView = true, rotation = 0, scrollRotation = 0, explosion = 0;
let finish = 'graphite', model = '01', from = 0, target = 1, phase = 0;
let mountedInStory = false;
const heroMount = scene.parentElement;
const storyMount = document.querySelector('[data-story-mount]');
const story = document.querySelector('.construction');
const stop = () => { cancelAnimationFrame(raf); raf = 0; start = 0; };
function backup(reason) {
  stop(); progress = 1; canvas.hidden = true; fallback.hidden = false;
  if (mountedInStory) { heroMount.append(scene); mountedInStory = false; }
  document.body.classList.add('static-mode');
  document.querySelector('.lineup')?.classList.remove('live');
  status.textContent = `Statinis vaizdas: ${reason}. Visi pasirinkimai veikia.`;
  toggle.disabled = true; toggle.textContent = 'Statinis vaizdas';
}
function shader(type, source) {
  const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); throw Error('Shader compilation failed'); }
  return s;
}
function mesh(vertices, color, part = 0, metal = 0) {
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  meshes.push({buffer, count: vertices.length / 6, color, part, metal});
}
function vertex(list, p, n) { list.push(...p, ...n); }
function triangle(list, a, b, c, n) { for (const p of [a,b,c]) vertex(list,p,n); }
function roundedBox(x,y,z,w,h,depth,r,color,part=0,metal=0) {
  const outline=[];
  for (let corner=0;corner<4;corner++) {
    const angle=corner*Math.PI/2;
    const cx=x+(corner===0||corner===3?1:-1)*(w/2-r);
    const cy=y+(corner<2?1:-1)*(h/2-r);
    for(let i=0;i<=10;i++) { const a=angle+i/10*Math.PI/2; outline.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]); }
  }
  const v=[];
  for(let i=0;i<outline.length;i++) {
    const a=outline[i],b=outline[(i+1)%outline.length],front=z+depth/2,back=z-depth/2;
    triangle(v,[x,y,front],[...a,front],[...b,front],[0,0,1]);
    triangle(v,[x,y,back],[...b,back],[...a,back],[0,0,-1]);
    const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),n=[dy/len,-dx/len,0];
    triangle(v,[...a,back],[...b,back],[...b,front],n);triangle(v,[...a,back],[...b,front],[...a,front],n);
  }
  mesh(v,color,part,metal);
}
function disc(x,y,z,r,color,part=2) {
  const v=[];for(let i=0;i<96;i++){const a=i/96*Math.PI*2,b=(i+1)/96*Math.PI*2;triangle(v,[x,y,z],[x+Math.cos(a)*r,y+Math.sin(a)*r,z],[x+Math.cos(b)*r,y+Math.sin(b)*r,z],[0,0,1]);}mesh(v,color,part,.25);
}
function torus(x,y,z,r,t,color,part=2) {
  const v=[];
  const point=(a,b)=>[[x+(r+t*Math.cos(b))*Math.cos(a),y+(r+t*Math.cos(b))*Math.sin(a),z+t*Math.sin(b)],[Math.cos(b)*Math.cos(a),Math.cos(b)*Math.sin(a),Math.sin(b)]];
  for(let i=0;i<96;i++)for(let j=0;j<10;j++) {
    const a=i/96*Math.PI*2,b=j/10*Math.PI*2,da=Math.PI*2/96,db=Math.PI*2/10;
    for(const pair of [[a,b],[a+da,b],[a+da,b+db],[a,b],[a+da,b+db],[a,b+db]])vertex(v,...point(...pair));
  }mesh(v,color,part,.8);
}
function geometry() {
  roundedBox(0,0,0,2.16,4.08,.32,.48,[.4,.46,.55],0,.85);
  roundedBox(0,0,.175,2.08,4,.05,.45,[.16,.20,.27],0,.6);
  roundedBox(0,0,.205,1.84,3.65,.035,.35,[.09,.17,.19],1,.2);
  roundedBox(0,0,.24,2.02,3.94,.045,.42,[.10,.13,.18],2,.4);
  disc(0,.45,.273,.86,[.06,.08,.12]);
  torus(0,.45,.29,.84,.022,[.53,.62,.73]);
  disc(0,.45,.281,.78,[.018,.032,.057]);
  torus(0,.45,.30,.65,.012,[.38,.61,.79]);
  for(let i=0;i<8;i++) {const heights=[.12,.24,.18,.36,.52,.31,.18,.09];roundedBox((i-3.5)*.073,.45,.31,.015,heights[i],.008,.007,[.62,.85,.98],2,.05);}
  torus(0,-1.05,.30,.18,.018,[.48,.56,.67]);disc(0,-1.05,.305,.165,[.04,.06,.10]);disc(0,-1.05,.308,.042,[.64,.86,.98]);
  for(let i=0;i<15;i++)roundedBox((i-7)*.06,1.66,.275,.018,.16,.012,.008,[.012,.018,.03],2,.2);
  roundedBox(0,-1.61,.28,.48,.012,.01,.005,[.53,.61,.71],2,.3);
  roundedBox(0,-1.67,.28,.22,.01,.01,.004,[.53,.61,.71],2,.3);
  roundedBox(1.09,.4,.01,.05,.44,.12,.02,[.45,.52,.61],0,.8);
}
function init() {
  if(disposed)return;
  if(reduced.matches)return backup('sumažintas judesys');
  try {
    gl=canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:true});
    if(!gl)return backup('3D nepasiekiamas');
    program=gl.createProgram();
    const vs=shader(gl.VERTEX_SHADER,`attribute vec3 position;attribute vec3 normal;uniform vec3 rotation;uniform vec3 offset;uniform float scale;uniform float spread;uniform float aspect;uniform float zoom;varying vec3 N;varying vec3 P;
    vec3 rotate(vec3 p){float a=rotation.x,b=rotation.y,c=rotation.z;p=vec3(p.x,p.y*cos(a)-p.z*sin(a),p.y*sin(a)+p.z*cos(a));p=vec3(p.x*cos(b)+p.z*sin(b),p.y,-p.x*sin(b)+p.z*cos(b));return vec3(p.x*cos(c)-p.y*sin(c),p.x*sin(c)+p.y*cos(c),p.z);}
    void main(){vec3 p=position;p.z+=spread;p=rotate(p)*scale+offset;N=rotate(normal);P=p;gl_Position=vec4(p.x/(zoom*aspect),p.y/zoom,-p.z/20.,1.);}`);
    const fs=shader(gl.FRAGMENT_SHADER,`precision mediump float;uniform vec3 color;uniform float metal;uniform float silver;varying vec3 N;varying vec3 P;void main(){vec3 n=normalize(N);vec3 l=normalize(vec3(-.65,.8,1.2));float diffuse=max(0.,dot(n,l));float rim=pow(1.-abs(n.z),3.);float spec=pow(max(dot(reflect(-l,n),normalize(vec3(.2,.3,4.)-P*.12)),0.),48.);vec3 c=mix(color,color*1.55+vec3(.12),silver*metal);c=c*(.32+diffuse*.82)+vec3(.72,.83,1.)*spec*metal+vec3(.14,.21,.31)*rim;gl_FragColor=vec4(c,1.);}`);
    gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Program link failed');
    meshes=[];geometry();gl.useProgram(program);gl.enable(gl.DEPTH_TEST);
    canvas.hidden=false;fallback.hidden=true;document.body.classList.remove('static-mode');
    document.querySelector('.lineup')?.classList.add('live');
    toggle.disabled=false;toggle.textContent=paused?'Tęsti judesį':'Pristabdyti judesį';
    status.textContent='Sukite rodyklėmis arba braukite horizontaliai. Slinkite pažinti sluoksnius.';
    resize();episode(1,1400);draw();
  } catch { backup('3D paleisti nepavyko'); }
}
function uniform(name,...values) { const loc=gl.getUniformLocation(program,name);if(values.length===3)gl.uniform3f(loc,...values);else gl.uniform1f(loc,values[0]); }
function draw() {
  if(!gl||disposed||canvas.hidden||gl.isContextLost())return;
  gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(program);
  const aspect=canvas.width/canvas.height,small=aspect<.8;
  uniform('aspect',aspect);uniform('zoom',variant==='b'?2.6:2.55);
  const objects=variant==='b'?[{x:small?-1.12:-2.65,s:small?.24:.77},{x:0,s:small?1.13:1.12},{x:small?1.12:2.65,s:small?.28:1.03}]:[{x:0,s:small?.94:1}];
  for (let k=0;k<objects.length;k++) {
    const item=objects[k];uniform('offset',item.x,variant==='b'&&small&&k!==1?-.35:0,0);
    const modelScale=variant==='a'?({ '01':1,'02':1.025,'03':1.05}[model]):1;
    uniform('scale',item.s*modelScale);uniform('rotation',.09,-.35+rotation+scrollRotation+(.35*(1-phase)),small?.14:(variant==='b'?-.12:-.24));
    uniform('silver',finish==='silver'?1:0);
    for (const m of meshes) {
      gl.bindBuffer(gl.ARRAY_BUFFER,m.buffer);
      for(const [name,offset]of[['position',0],['normal',12]]){const at=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(at);gl.vertexAttribPointer(at,3,gl.FLOAT,false,24,offset);}
      uniform('color',...m.color);uniform('metal',m.metal);uniform('spread',m.part*explosion*.62);gl.drawArrays(gl.TRIANGLES,0,m.count);
    }
  }frames++;
}
let duration=1400;
function episode(next,ms=550) {from=phase;target=next;progress=0;duration=ms;stop();schedule();}
function schedule(){if(!raf&&!paused&&!disposed&&!reduced.matches&&inView&&!document.hidden&&!canvas.hidden&&progress<1)raf=requestAnimationFrame(tick);}
function tick(t){raf=0;if(!start)start=t;progress=Math.min(1,(t-start)/duration);phase=from+(target-from)*(1-Math.pow(1-progress,3));draw();schedule();}
function resize(){if(disposed)return;const rect=scene.getBoundingClientRect();const dpr=Math.min(devicePixelRatio,1.5);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);draw();}
toggle.addEventListener('click',()=>{paused=!paused;toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Tęsti judesį':'Pristabdyti judesį';if(paused)stop();else{if(progress<1){from=phase;start=0;}schedule();}});
function turn(value){rotation+=value*.22;draw();if(canvas.hidden){fallback.style.transform=`rotate(${rotation*12}deg)`;}status.textContent=canvas.hidden?'Statinis vaizdas: pakeistas peržiūros kampas.':`Pasuktas įrenginio vaizdas. Kampas ${Math.round(rotation*180/Math.PI)}°.`;}
document.querySelectorAll('[data-turn]').forEach(b=>b.addEventListener('click',()=>turn(Number(b.dataset.turn))));
let pointer;
scene.addEventListener('pointerdown',e=>{pointer={x:e.clientX,y:e.clientY};});
scene.addEventListener('pointerup',e=>{if(pointer){const x=e.clientX-pointer.x,y=e.clientY-pointer.y;if(Math.abs(x)>20&&Math.abs(x)>Math.abs(y))turn(x>0?1:-1);pointer=null;}});
scene.addEventListener('pointercancel',()=>{pointer=null;});
function onScroll(){
 if(!story||canvas.hidden||disposed)return;
 const box=story.getBoundingClientRect();
 const shouldMount=box.top<innerHeight*.45&&box.bottom>innerHeight*.45;
 if(shouldMount!==mountedInStory){(shouldMount?storyMount:heroMount).append(scene);mountedInStory=shouldMount;document.querySelector('.story-backup').hidden=shouldMount;resize();}
 if(paused)return;
 const amount=Math.max(0,Math.min(1,(innerHeight*.45-box.top)/(box.height-innerHeight*.6)));
 explosion=Math.sin(amount*Math.PI)**2;scrollRotation=amount*1.1;draw();
}
addEventListener('scroll',onScroll,{passive:true});
const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(scene);
const intersection=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)schedule();else stop();});intersection.observe(scene);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else schedule();});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();backup('3D ryšys prarastas');});
canvas.addEventListener('webglcontextrestored',()=>{if(!disposed&&!reduced.matches)init();});
function release(){if(gl&&!gl.isContextLost()){for(const m of meshes)gl.deleteBuffer(m.buffer);if(program)gl.deleteProgram(program);}meshes=[];program=null;}
reduced.addEventListener('change',()=>{stop();if(reduced.matches){release();backup('sumažintas judesys');}else init();});
function dispose(){if(disposed)return;disposed=true;stop();resizeObserver.disconnect();intersection.disconnect();removeEventListener('scroll',onScroll);release();}
addEventListener('pagehide',dispose);
window.atlasRuntime={get state(){return{progress,frames,active:Boolean(raf),disposed,mode:canvas.hidden?'fallback':'webgl',rotation,explosion,finish,model};},setSelection(value){finish=value.finish;model=value.model;scene.style.setProperty('--finish-filter',finish==='silver'?'brightness(1.7) saturate(.5)':'none');fallback.style.filter=finish==='silver'?'brightness(1.7) saturate(.5)':'none';draw();},dispose};
init();
