// Original analytic 3D glass vessel. Native WebGL; no model or renderer dependency.
const vertex = `attribute vec2 position; varying vec2 uv;
void main(){uv=position;gl_Position=vec4(position,0.,1.);}`;
const fragment = `precision highp float;
varying vec2 uv; uniform vec2 resolution; uniform float tilt, phase;
uniform vec3 tint; uniform sampler2D label;
mat2 turn(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
vec3 local(vec3 p){p.xz=turn(-.19)*p.xz;return p;}
float box(vec3 p,vec3 b,float r){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r;}
float cylinder(vec3 p,vec2 h,float r){vec2 d=abs(vec2(length(p.xz),p.y))-h;return min(max(d.x,d.y),0.)+length(max(d,0.))-r;}
vec2 object(vec3 p){p=local(p);
 float body=box(p-vec3(0.,-.24,0.),vec3(.77,.94,.32),.14);
 float neck=cylinder(p-vec3(0.,.99,0.),vec2(.26,.15),.025);
 float cap=cylinder(p-vec3(0.,1.38,0.),vec2(.59,.24),.07);
 return cap<min(body,neck)?vec2(cap,2.):vec2(min(body,neck),1.);
}
vec3 normal(vec3 p){vec2 e=vec2(.001,0.);return normalize(vec3(object(p+e.xyy).x-object(p-e.xyy).x,object(p+e.yxy).x-object(p-e.yxy).x,object(p+e.yyx).x-object(p-e.yyx).x));}
vec3 room(vec3 d){
 vec3 c=mix(vec3(.99,.97,.93),vec3(.81,.83,.80),smoothstep(-.8,1.,d.y));
 float strip=pow(max(0.,dot(d,normalize(vec3(-.8,.5,1.)))),40.);
 float dark=pow(max(0.,dot(d,normalize(vec3(.9,.1,1.)))),18.);
 return c+vec3(strip*.7)-vec3(dark*.53);
}
void main(){
 vec2 q=uv; q.x*=resolution.x/resolution.y;
 float zoom=max(1.9,1.23/(resolution.x/resolution.y));
 vec3 ro=vec3(q.x*zoom,q.y*zoom+.2,5.);
 vec3 rd=normalize(vec3(.025,-.055,-1.));
 ro.x+=.09*sin(phase*3.14159); float travel=0.;vec2 hit=vec2(0.);
 for(int i=0;i<90;i++){hit=object(ro+rd*travel);if(hit.x<.0015||travel>8.)break;travel+=max(.001,hit.x*.82);}
 if(travel>8.){gl_FragColor=vec4(0.);return;}
 vec3 p=ro+rd*travel,n=normal(p),lp=local(p),ln=local(n);
 vec3 light=normalize(vec3(-.6,.7,1.));
 float diffuse=max(dot(n,light),0.); float fresnel=pow(1.-max(dot(-rd,n),0.),3.);
 vec3 reflection=room(reflect(rd,n)); vec3 color;
 if(hit.y>1.5){
   float ring=.5+.5*cos(length(lp.xz)*140.);float top=smoothstep(.65,.95,n.y);
   color=vec3(.83,.79,.69)*(.56+.44*diffuse)+vec3(.14)*pow(max(dot(reflect(rd,n),light),0.),35.);
   color-=.025*ring*top; color+=.035*sin(lp.y*145.);
 }else{
   vec3 bend=refract(rd,n,.69);vec3 behind=lp+local(bend)*.7;
   float level=-.04+tilt*.28*lp.x+sin(lp.x*7.+phase*8.)*.035*(1.-phase);
   float wet=1.-smoothstep(level-.012,level+.012,behind.y);
   float depth=clamp(.8-abs(lp.x)*.45,.12,1.);
   vec3 transmission=mix(vec3(.95,.95,.89),tint,wet*depth*.88);
   float caustic=pow(max(0.,sin((behind.x+behind.y*.18)*12.+ln.x*4.)),14.);
   color=transmission*room(bend)*1.03+caustic*.13;
   color=mix(color,reflection,clamp(.08+fresnel*.76,0.,.9));
   float edge=pow(abs(ln.x),.7)*.32+pow(abs(ln.y),2.)*.23;
   color*=1.-edge;
   color+=vec3(.32)*pow(max(dot(reflect(rd,n),light),0.),55.);
   color+=vec3(.37)*exp(-pow((lp.x+.70)*46.,2.))*(1.-abs(ln.y));
   color+=vec3(.23)*exp(-pow((lp.x-.69)*55.,2.));
   color+=vec3(.15)*exp(-pow((behind.y-level)*70.,2.))*wet;
   if(lp.z>.445&&abs(lp.x)<.60&&lp.y<.24&&lp.y>-.62){
     vec2 coord=vec2((lp.x+.60)/1.20,1.-(lp.y+.62)/.86);
     vec4 paper=texture2D(label,coord);color=paper.rgb*(.86+.14*diffuse);
   }
 }
 gl_FragColor=vec4(clamp(color,0.,1.),1.);
}`;

export function createBottle(gl) {
  const shaders = [], buffers = [], textures = [];
  const compile = (kind, source) => {
    const shader = gl.createShader(kind); shaders.push(shader);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  };
  const program = gl.createProgram();
  try {
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    const buffer = gl.createBuffer(); buffers.push(buffer); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const texture = gl.createTexture(); textures.push(texture); gl.bindTexture(gl.TEXTURE_2D, texture);
    for (const key of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D, key, gl.CLAMP_TO_EDGE);
    for (const key of [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER]) gl.texParameteri(gl.TEXTURE_2D, key, gl.LINEAR);
    const locations = Object.fromEntries(['resolution','tilt','phase','tint','label'].map(k => [k,gl.getUniformLocation(program,k)]));
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    return {
      label(name, number) {
        const c = document.createElement('canvas'); c.width=768;c.height=512;const ctx=c.getContext('2d');
        ctx.fillStyle='#f8f5eb';ctx.fillRect(0,0,768,512);ctx.fillStyle='#393330';ctx.textAlign='center';
        ctx.font='28px Jost';ctx.fillText('O R S I V E L L E',384,90);
        ctx.font='300 86px "Crimson Pro"';ctx.fillText(name,384,265);
        ctx.font='24px Jost';ctx.fillText('E A U   D E   P A R F U M',384,360);
        ctx.font='24px Jost';ctx.fillText(number+'  /  50 ml',384,422);
        gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);
      },
      draw({width,height,tilt=0,phase=1,tint=[.93,.62,.38]}) {
        gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program);gl.uniform2f(locations.resolution,width,height);gl.uniform1f(locations.tilt,tilt);gl.uniform1f(locations.phase,phase);gl.uniform3fv(locations.tint,tint);gl.uniform1i(locations.label,0);gl.drawArrays(gl.TRIANGLES,0,6);
      },
      release() { for (const b of buffers) gl.deleteBuffer(b);for (const t of textures) gl.deleteTexture(t);for(const s of shaders)gl.deleteShader(s);gl.deleteProgram(program); }
    };
  } catch(error) { for(const b of buffers)gl.deleteBuffer(b);for(const t of textures)gl.deleteTexture(t);for(const s of shaders)gl.deleteShader(s);gl.deleteProgram(program);throw error; }
}
