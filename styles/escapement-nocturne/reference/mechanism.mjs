// Original native WebGL watch: bevelled case, applied markers, gear train and hands.
import { MATERIALS, angles } from './drawing.mjs';
const TAU = Math.PI*2;
const rgb = hex => [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);
function ring(outer, inner, depth=.05, teeth=0) {
  const v=[], segments=teeth?teeth*4:128;
  const radius=i=>outer*(teeth&&[0,3].includes(((i%segments)+segments)%4)?.92:1);
  const point=(r,a,z)=>[r*Math.cos(a),r*Math.sin(a),z];
  const tri=(a,b,c,n)=>{for(const p of [a,b,c])v.push(...p,...n);};
  for(let i=0;i<segments;i++) {
    const a=i/segments*TAU,b=(i+1)/segments*TAU,ra=radius(i),rb=radius(i+1);
    const p=point(ra,a,depth/2),q=point(rb,b,depth/2),r=point(inner,a,depth/2),s=point(inner,b,depth/2);
    tri(p,q,r,[0,0,1]);tri(q,s,r,[0,0,1]);
    const n=[Math.cos((a+b)/2),Math.sin((a+b)/2),0];
    tri(point(ra,a,-depth/2),point(rb,b,-depth/2),p,n);tri(point(rb,b,-depth/2),q,p,n);
    if(inner) {const ni=n.map(x=>-x);tri(point(inner,a,-depth/2),r,point(inner,b,-depth/2),ni);tri(r,s,point(inner,b,-depth/2),ni);}
  }
  return new Float32Array(v);
}
function bevel(profile) {
  const v=[],N=160;
  for(let j=0;j<profile.length-1;j++)for(let i=0;i<N;i++) {
    const a=i/N*TAU,b=(i+1)/N*TAU,[ra,za]=profile[j],[rb,zb]=profile[j+1],len=Math.hypot(zb-za,rb-ra)||1;
    for(const [rad,z,t] of [[ra,za,a],[ra,za,b],[rb,zb,a],[ra,za,b],[rb,zb,b],[rb,zb,a]])v.push(rad*Math.cos(t),rad*Math.sin(t),z,(zb-za)/len*Math.cos(t),(zb-za)/len*Math.sin(t),(ra-rb)/len);
  }return new Float32Array(v);
}
function box(w,h,d=.04) {
 const v=[],x=w/2,y=h/2,z=d/2;
 const faces=[[[[-x,-y,z],[x,-y,z],[x,y,z],[-x,y,z]],[0,0,1]],[[[-x,-y,-z],[-x,y,-z],[x,y,-z],[x,-y,-z]],[0,0,-1]],[[[x,-y,-z],[x,y,-z],[x,y,z],[x,-y,z]],[1,0,0]],[[[-x,-y,-z],[-x,-y,z],[-x,y,z],[-x,y,-z]],[-1,0,0]],[[[-x,y,-z],[-x,y,z],[x,y,z],[x,y,-z]],[0,1,0]],[[[-x,-y,-z],[x,-y,-z],[x,-y,z],[-x,-y,z]],[0,-1,0]]];
 for(const [p,n]of faces)for(const i of [0,1,2,0,2,3])v.push(...p[i],...n);return new Float32Array(v);
}
const VERT=`attribute vec3 aPosition;attribute vec3 aNormal;uniform vec3 uOffset;uniform vec2 uBounds;uniform vec3 uRotation;varying vec3 normal;varying vec3 pos;
void main(){float a=uRotation.z;mat3 rz=mat3(cos(a),sin(a),0.,-sin(a),cos(a),0.,0.,0.,1.);a=uRotation.x;mat3 ry=mat3(cos(a),0.,-sin(a),0.,1.,0.,sin(a),0.,cos(a));a=uRotation.y;mat3 rx=mat3(1.,0.,0.,0.,cos(a),sin(a),0.,-sin(a),cos(a));mat3 view=rx*ry;vec3 p=view*(rz*aPosition+uOffset);normal=view*rz*aNormal;pos=p;gl_Position=vec4(p.xy/uBounds,-p.z/12.,1.);}`;
const FRAG=`precision mediump float;varying vec3 normal;varying vec3 pos;uniform vec3 uColor;uniform float uMetal;uniform float uAlpha;
void main(){vec3 n=normalize(normal);vec3 l=normalize(vec3(-.5,.8,1.2));float diffuse=max(0.,dot(n,l));vec3 r=reflect(vec3(0.,0.,-1.),n);float strip=pow(max(0.,1.-abs(r.x+.33)*1.8),8.);float edge=pow(1.-abs(n.z),2.);float polish=pow(max(0.,dot(reflect(-l,n),vec3(0.,0.,1.))),36.);float brushed=sin((pos.x+pos.y*.12)*440.)*.009;vec3 c=uColor*(.24+.63*diffuse+brushed)+uMetal*(vec3(.53,.49,.41)*strip+vec3(.42)*polish+edge*.12);gl_FragColor=vec4(c,uAlpha);}`;
export function createMechanism(canvas) {
 const gl=canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:true});
 if(!gl)throw Error('WebGL unavailable');
 const shaders=[],buffers=[],items=[];
 const shader=(kind,src)=>{const s=gl.createShader(kind);shaders.push(s);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
 const program=gl.createProgram();
 try {gl.attachShader(program,shader(gl.VERTEX_SHADER,VERT));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,FRAG));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));}catch(e){for(const s of shaders)gl.deleteShader(s);gl.deleteProgram(program);throw e;}
 const attr={p:gl.getAttribLocation(program,'aPosition'),n:gl.getAttribLocation(program,'aNormal')};
 const U=Object.fromEntries(['Offset','Bounds','Rotation','Color','Metal','Alpha'].map(x=>[x,gl.getUniformLocation(program,'u'+x)]));
 const mesh=(vertices)=>{const buffer=gl.createBuffer();buffers.push(buffer);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);return{buffer,count:vertices.length/6};};
 const cache=new Map();const shape=(key,fn)=>{if(!cache.has(key))cache.set(key,mesh(fn()));return cache.get(key);};
 const add=(geo,x,y,z,color,metal=.8,extra={})=>items.push({geo,x,y,z,color,metal,angle:0,...extra});
 const R=(o,i,d=.05,t=0)=>shape(`r${o}/${i}/${d}/${t}`,()=>ring(o,i,d,t));
 const B=(w,h,d=.04)=>shape(`b${w}/${h}/${d}`,()=>box(w,h,d));
 for(const sign of [-1,1]){
  add(B(1.92,2.8,.16),0,sign*3.65,-.2,'strap',.1);
  for(const x of [-.88,.88])for(let j=0;j<13;j++)add(B(.015,.1,.012),x,sign*(2.65+j*.175),-.1,'#afa292',.1);
  for(let j=0;j<18;j++)add(B(1.84,.018,.025),0,sign*(2.62+j*.13),-.09,'strap',.5,{meshOnly:true});
  for(const x of [-1.16,1.16])add(B(.33,1.0,.32),x,sign*2.58,-.03,'case',.85,{angle:sign*x*.15});
 }
 add(B(.4,.5,.27),2.96,0,.03,'case',1);
 for(let j=0;j<7;j++)add(B(.017,.48,.29),2.8+j*.05,0,.06,'#6a5945',.6);
 add(shape('case',()=>bevel([[2.5,-.2],[2.75,-.18],[2.85,-.04],[2.82,.17],[2.73,.29],[2.57,.31],[2.49,.2]])),0,0,0,'case',1);
 add(R(2.69,2.665,.035),0,0,.33,'#262426',.3);
 add(R(2.51,2.47,.02),0,0,.31,'case',.9);
 add(R(2.47,0,.06),0,0,-.08,'#151a1e',.18);
 // Bridges, toothed wheels and a balance spring; a conceptual calibre, not CAD.
 for(const [x,y,w,h,a] of [[-.9,1.5,1.3,.32,-.4],[1.1,1.1,1.5,.38,.7],[-1.1,-1.3,1.2,.36,.5],[.65,-1.75,2,.35,-.15]])add(B(w,h,.12),x,y,.03,'#92948e',.85,{angle:a});
 for(const [x,y,r,t,ratio]of [[-.58,1.01,.94,38,1],[.84,.44,.73,34,-1.35],[-.49,-.51,.61,28,1.8],[.70,-1.23,.85,36,-.9]]){
  const group=`gear${x}`;add(R(r,r*.74,.07,t),x,y,.1,'case',.9,{group,ratio});
  for(let j=0;j<5;j++){const a=j*TAU/5;add(B(.055,r*.67,.045),x+Math.sin(a)*r*.4,y+Math.cos(a)*r*.4,.11,'case',1,{gearCenter:[x,y],radial:a,ratio});}
  add(R(r*.22,0,.08),x,y,.14,'#c5c3b7',.9);add(R(.055,0,.03),x,y,.2,'#8d3446',.5);
 }
 add(R(.53,.46,.08),-1.36,-.62,.15,'case',1);add(R(.39,.377,.02),-1.36,-.62,.17,'case',.8);
 for(let j=0;j<7;j++)add(R(.07+j*.042,.064+j*.042,.008),-1.36,-.62,.16,'case',.7);
 add(B(1.0,.07,.07),-1.36,-.62,.2,'#b1b1a6',.8,{angle:.2});add(R(.075,0,.04),-1.36,-.62,.24,'#a14359',.7);
 for(const [x,y]of [[-1,1.65],[1.3,1.1],[-1.24,-1.2],[1.08,-1.52],[.23,1.9]]){add(R(.082,0,.04),x,y,.22,'#c1c4c1',1);add(B(.09,.014,.01),x,y,.247,'#242629',.1,{angle:.5});}
 add(R(2.465,0,.02),0,0,.29,'dial',.13,{dial:true});
 for(let j=0;j<60;j++){
  const a=j*TAU/60,len=j%5===0?.19:.065,r=j%5===0?2.27:2.39;
  add(B(j%5===0?.046:.012,len,.04),Math.sin(a)*r,Math.cos(a)*r,.35,'ink',.6,{angle:-a});
 }
 add(B(.10,1.49,.045),0,.44,.43,'hands',.9,{hand:0,handOffset:.44});
 add(B(.05,2.44,.035),0,.67,.49,'hands',.9,{hand:1,handOffset:.67});
 add(B(.016,2.64,.02),0,.86,.55,'case',1,{hand:2,handOffset:.86});
 add(R(.10,0,.05),0,0,.58,'case',1);
 gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
 let disposed=false;
 return {
  gl,
  draw({config,reveal,date,arrival=1,gearTurn=0}) {
   if(disposed||gl.isContextLost())return;
   const rect=canvas.getBoundingClientRect(),pixel=Math.min(devicePixelRatio||1,1.5),w=Math.round(rect.width*pixel),h=Math.round(rect.height*pixel);if(!w||!h)return;
   if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
   gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(program);
   const aspect=w/h;gl.uniform2f(U.Bounds,aspect<.8?4:5*aspect,aspect<.8?4/aspect:5);
   const colors={case:MATERIALS.case[config.case].color,dial:MATERIALS.dial[config.dial].color,strap:MATERIALS.strap[config.strap].color,ink:config.dial==='ivory'?'#433d30':'#ddcba5',hands:config.dial==='ivory'?'#373b3b':'#e8dac1'};
   const time=angles(date);const yaw=(1-arrival)*-.28,tilt=(1-arrival)*.11;
   for(const item of items){
    if(item.meshOnly&&config.strap!=='mesh')continue;
    let {x,y,z,angle}=item;
    if(item.hand!==undefined){const a=time[item.hand]/180*Math.PI;x=Math.sin(a)*item.handOffset;y=Math.cos(a)*item.handOffset;angle=-a;}
    if(item.gearCenter){const a=item.radial+gearTurn*item.ratio;x=item.gearCenter[0]+Math.sin(a)*Math.hypot(item.x-item.gearCenter[0],item.y-item.gearCenter[1]);y=item.gearCenter[1]+Math.cos(a)*Math.hypot(item.x-item.gearCenter[0],item.y-item.gearCenter[1]);angle=-a;}
    else if(item.group)angle+=gearTurn*item.ratio;
    gl.bindBuffer(gl.ARRAY_BUFFER,item.geo.buffer);gl.enableVertexAttribArray(attr.p);gl.enableVertexAttribArray(attr.n);gl.vertexAttribPointer(attr.p,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(attr.n,3,gl.FLOAT,false,24,12);
    gl.uniform3f(U.Offset,x,y,z);gl.uniform3f(U.Rotation,yaw,tilt,angle);gl.uniform3fv(U.Color,rgb(colors[item.color]||item.color));gl.uniform1f(U.Metal,item.metal);gl.uniform1f(U.Alpha,item.dial?1-reveal*.94:1);gl.depthMask(!item.dial);gl.drawArrays(gl.TRIANGLES,0,item.geo.count);
   }gl.depthMask(true);
  },
  dispose(){if(disposed)return;disposed=true;for(const b of buffers)gl.deleteBuffer(b);for(const s of shaders)gl.deleteShader(s);gl.deleteProgram(program);}
 };
}
