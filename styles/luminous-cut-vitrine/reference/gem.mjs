// Original round brilliant geometry and studio-light shader for Luminous Cut Vitrine.
// No model files, textures or rendering libraries. MIT, Web Style Atlas contributors.
const TAU = Math.PI * 2;
export const FACET_COUNT = 57;

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = a => { const l = Math.hypot(...a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const ring = (r, angle, y) => [r * Math.cos(angle), y, r * Math.sin(angle)];

// Facet proportions: table 56 %, crown 16 %, pavilion 43 % of the diameter.
export function brilliant({ rt = 0.56, hc = 0.32, g = 0.018, hp = 0.86, rs = 0.775, rq = 0.44 } = {}) {
  const out = [];
  const crownY = r => g + (hc - g) * (1 - r) / (1 - rt);
  const coneY = r => -g - (hp - g) * (1 - r);
  const T = k => ring(rt, k * TAU / 8, hc), S = k => ring(rs, (k + 0.5) * TAU / 8, crownY(rs));
  const G = j => ring(1, j * TAU / 16, g), B = j => ring(1, j * TAU / 16, -g);
  const Q = k => ring(rq, (k + 0.5) * TAU / 8, coneY(rq)), C = [0, -hp, 0];
  const facet = (points, id) => {
    let n = [0, 0, 0];
    for (let i = 0; i < points.length; i++) { const a = points[i], b = points[(i + 1) % points.length]; n[0] += (a[1] - b[1]) * (a[2] + b[2]); n[1] += (a[2] - b[2]) * (a[0] + b[0]); n[2] += (a[0] - b[0]) * (a[1] + b[1]); }
    n = norm(n);
    const centre = points.reduce((s, p) => [s[0] + p[0] / points.length, s[1] + p[1] / points.length, s[2] + p[2] / points.length], [0, 0, 0]);
    if (dot(n, centre) < 0) { n = n.map(v => -v); points = [...points].reverse(); }
    for (let i = 1; i < points.length - 1; i++) for (const p of [points[0], points[i], points[i + 1]]) out.push(...p, ...n, id);
  };
  facet(Array.from({ length: 8 }, (_, k) => T(k)), 0);
  for (let k = 0; k < 8; k++) facet([T(k), T(k + 1), S(k)], 1 + k);
  for (let k = 0; k < 8; k++) facet([T(k), S(k), G(2 * k), S(k - 1)], 9 + k);
  for (let k = 0; k < 8; k++) { facet([S(k), G(2 * k + 1), G(2 * k)], 17 + 2 * k); facet([S(k), G(2 * k + 2), G(2 * k + 1)], 18 + 2 * k); }
  for (let k = 0; k < 8; k++) facet([B(2 * k), Q(k - 1), C, Q(k)], 33 + k);
  for (let k = 0; k < 8; k++) { facet([B(2 * k), B(2 * k + 1), Q(k)], 41 + 2 * k); facet([B(2 * k + 1), B(2 * k + 2), Q(k)], 42 + 2 * k); }
  for (let j = 0; j < 16; j++) facet([G(j), G(j + 1), B(j + 1), B(j)], 60 + j);
  return out;
}

// Smooth metal primitives share the vertex layout; facet id -1 marks metal.
function cylinder(out, a, b, r, seg = 14) {
  const axis = norm(sub(b, a)), helper = Math.abs(axis[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = norm(cross(axis, helper)), v = cross(axis, u);
  for (let i = 0; i < seg; i++) {
    const p = [i / seg * TAU, (i + 1) / seg * TAU].map(t => [Math.cos(t), Math.sin(t)]);
    const n = p.map(([c, s]) => [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s]);
    const at = (base, k) => [base[0] + n[k][0] * r, base[1] + n[k][1] * r, base[2] + n[k][2] * r];
    for (const [base, k] of [[a, 0], [b, 0], [b, 1], [a, 0], [b, 1], [a, 1]]) out.push(...at(base, k), ...n[k], -1);
  }
}
function sphere(out, c, r, seg = 12) {
  for (let i = 0; i < seg; i++) for (let j = 0; j < seg; j++) {
    const P = (a, b) => { const t = a / seg * Math.PI, f = b / seg * TAU, n = [Math.sin(t) * Math.cos(f), Math.cos(t), Math.sin(t) * Math.sin(f)]; return [...n.map((v, k) => c[k] + v * r), ...n, -1]; };
    for (const [a, b] of [[i, j], [i + 1, j], [i + 1, j + 1], [i, j], [i + 1, j + 1], [i, j + 1]]) out.push(...P(a, b));
  }
}
function torus(out, c, R, r, axis = 'y', seg = 72, side = 12, flatten = 1) {
  const point = (a, b) => {
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    let p = [(R + r * cb) * ca, r * sb * flatten, (R + r * cb) * sa], n = norm([cb * ca, sb / flatten, cb * sa]);
    if (axis === 'z') { p = [p[0], p[2], p[1]]; n = [n[0], n[2], n[1]]; }
    return [p[0] + c[0], p[1] + c[1], p[2] + c[2], ...n, -1];
  };
  for (let i = 0; i < seg; i++) for (let j = 0; j < side; j++) {
    const a = i / seg * TAU, b = j / side * TAU, da = TAU / seg, db = TAU / side;
    for (const [x, y] of [[a, b], [a + da, b], [a + da, b + db], [a, b], [a + da, b + db], [a, b + db]]) out.push(...point(x, y));
  }
}
// Six-claw head under the stone: claws grip the crown just above the girdle.
export function head(out = []) {
  for (let k = 0; k < 6; k++) {
    const a = (k + 0.5) * TAU / 6, at = (r, y) => ring(r, a, y);
    const tip = at(0.9, 0.085), knee = at(1.035, -0.03), low = at(0.66, -0.6), base = at(0.27, -1.02);
    cylinder(out, tip, knee, 0.042); cylinder(out, knee, low, 0.05); cylinder(out, low, base, 0.046);
    sphere(out, tip, 0.05); sphere(out, knee, 0.05); sphere(out, low, 0.05);
  }
  torus(out, [0, -0.56, 0], 0.72, 0.038, 'y', 64, 10);
  torus(out, [0, -1.02, 0], 0.28, 0.05, 'y', 48, 10);
  return out;
}
// A slim upright band seen from its front, used for still renders and the B detail.
export function band(out = [], { y = -2.36, R = 1.34, r = 0.13 } = {}) { torus(out, [0, y, 0], R, r, 'z', 128, 14, 0.62); return out; }
export function bail(out = [], { y = 1.22 } = {}) {
  torus(out, [0, y, 0], 0.2, 0.045, 'z', 48, 10);
  // Fine chain: two catenary-like strands rising from the bail.
  for (const side of [-1, 1]) { let prev = [0.12 * side, y + 0.16, 0]; for (let i = 1; i <= 24; i++) { const t = i / 24, p = [side * (0.12 + 2.6 * t), y + 0.16 + 3.2 * t * t * 0.9 + 0.5 * t, -0.2 * t]; cylinder(out, prev, p, 0.018, 8); prev = p; } }
  return out;
}

export const VERTEX = `attribute vec3 position;attribute vec3 normal;attribute float facet;
uniform vec3 rotation;uniform vec3 offset;uniform float scale;uniform float aspect;uniform float zoom;uniform float camDist;
varying vec3 vN;varying vec3 vP;varying float vF;varying vec3 vO;
vec3 rot(vec3 p){float a=rotation.x,b=rotation.y,c=rotation.z;
p=vec3(p.x*cos(b)+p.z*sin(b),p.y,-p.x*sin(b)+p.z*cos(b));
p=vec3(p.x,p.y*cos(a)-p.z*sin(a),p.y*sin(a)+p.z*cos(a));
return vec3(p.x*cos(c)-p.y*sin(c),p.x*sin(c)+p.y*cos(c),p.z);}
void main(){vec3 q=rot(position)*scale+offset;vN=rot(normal);vP=q;vF=facet;vO=position;float w=(camDist-q.z)/camDist;gl_Position=vec4(q.x/(zoom*aspect),q.y/zoom,-q.z/12.*w,w);}`;

// Studio environment: bright ivory ceiling, four soft boxes, dark flags and a dark floor.
export const FRAGMENT = `precision highp float;
uniform float light;uniform float camDist;uniform vec3 metal;uniform vec3 up;uniform float fire;uniform vec3 rotation;
varying vec3 vN;varying vec3 vP;varying float vF;varying vec3 vO;
vec3 rot(vec3 p){float a=rotation.x,b=rotation.y,c=rotation.z;
p=vec3(p.x*cos(b)+p.z*sin(b),p.y,-p.x*sin(b)+p.z*cos(b));
p=vec3(p.x,p.y*cos(a)-p.z*sin(a),p.y*sin(a)+p.z*cos(a));
return vec3(p.x*cos(c)-p.y*sin(c),p.x*sin(c)+p.y*cos(c),p.z);}
vec3 env(vec3 d){float a=atan(d.x,d.y)+light;
float front=smoothstep(-.55,.55,d.z*.75+d.y*.55);
vec3 c=mix(vec3(.04,.04,.045),vec3(.74,.72,.70),front);
float box=smoothstep(.34,.04,abs(sin(a*3.)))*front;c+=vec3(.62,.61,.59)*box;
float flag=smoothstep(.28,.0,abs(cos(a*2.+.4)))*smoothstep(.1,.85,d.z);c*=1.-.9*flag;
c*=.78+.3*(.5+.5*sin(a*5.+d.z*5.+d.x*3.));float lens=smoothstep(.955,.992,d.z);c*=1.-.93*lens;return c;}
float hash(float x){x=floor(x+.5);return fract(sin(x*91.7+3.1)*43758.5453);}
void main(){vec3 n=normalize(vN);vec3 V=normalize(vP-vec3(0.,0.,camDist));if(dot(n,V)>0.)n=-n;vec3 R=reflect(V,n);
if(vF<-.5){vec3 e=env(R);float s=pow(max(dot(R,normalize(vec3(-.4,.7,.6))),0.),40.);vec3 mc=metal*(.34+.86*e+.22*max(R.z,0.))+vec3(s*.6);gl_FragColor=vec4(pow(clamp(mc,0.,1.),vec3(.95)),1.);return;}
float ci=max(dot(-V,n),0.);float F=.17+.83*pow(1.-ci,5.);
float ang=atan(vO.z,vO.x)+3.14159265;float sector=floor(ang/.39269908);float ca=(sector+.5)*.39269908-3.14159265;float tilt=mod(sector,2.)<.5?.712:.79;
vec3 m=normalize(rot(vec3(cos(ca)*sin(tilt),-cos(tilt),sin(ca)*sin(tilt))));float cb=ca+3.14159265;vec3 m2=normalize(rot(vec3(cos(cb)*sin(tilt),-cos(tilt),sin(cb)*sin(tilt))));
vec3 jitter=(vec3(hash(vF+sector*3.1),hash(vF+7.+sector),hash(vF+13.))-.5)*.32;
vec3 tg=refract(V,n,1./2.42);if(dot(tg,tg)<.01)tg=R;vec3 dg=normalize(reflect(reflect(tg,m),m2)+jitter);
vec3 tr=refract(V,n,1./2.395);if(dot(tr,tr)<.01)tr=R;vec3 dr=normalize(reflect(reflect(tr,m),m2)+jitter);
vec3 tb=refract(V,n,1./2.455);if(dot(tb,tb)<.01)tb=R;vec3 db=normalize(reflect(reflect(tb,m),m2)+jitter);
dr=normalize(dg+(dr-dg)*fire);db=normalize(dg+(db-dg)*fire);
vec3 inner=vec3(env(dr).r,env(dg).g,env(db).b);
inner=pow(inner,vec3(1.35))*1.12;vec3 c=mix(inner,env(R),F);
float spark=pow(max(dot(R,normalize(vec3(sin(light*1.7)*.5,.8,.45))),0.),220.);
c+=vec3(spark*2.2);
if(vF>59.)c=mix(c,vec3(.78,.77,.75)*(.6+.4*env(R)),.55);
c=c/(1.+.18*c);gl_FragColor=vec4(pow(clamp(c*1.12,0.,1.),vec3(.95)),1.);}`;

// Builds GPU buffers once; draw() renders a list of placed objects.
export function createRenderer(gl) {
  const compile = (type, source) => { const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { const log = gl.getShaderInfoLog(s); gl.deleteShader(s); throw Error('Shader: ' + log); } return s; };
  const program = gl.createProgram(), vs = compile(gl.VERTEX_SHADER, VERTEX), fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program); gl.deleteShader(vs); gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error('Program link failed');
  const buffers = new Map();
  const upload = (name, data) => { const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW); buffers.set(name, { buffer, count: data.length / 7 }); };
  upload('gem', brilliant()); upload('head', head()); upload('band', band()); upload('bail', bail());
  const loc = {}; for (const n of ['rotation', 'offset', 'scale', 'aspect', 'zoom', 'camDist', 'light', 'metal', 'up', 'fire']) loc[n] = gl.getUniformLocation(program, n);
  const attr = { position: gl.getAttribLocation(program, 'position'), normal: gl.getAttribLocation(program, 'normal'), facet: gl.getAttribLocation(program, 'facet') };
  gl.enable(gl.DEPTH_TEST);
  function draw({ width, height, zoom = 2.2, light = 0, items = [] }) {
    gl.viewport(0, 0, width, height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); gl.useProgram(program);
    gl.uniform1f(loc.aspect, width / height); gl.uniform1f(loc.zoom, zoom); gl.uniform1f(loc.camDist, 7); gl.uniform1f(loc.light, light); gl.uniform1f(loc.fire, 5.5);
    for (const item of items) {
      const [a, b, c] = item.rotation, up = [0, Math.cos(a), Math.sin(a)];
      // Rotated object up axis (yaw does not move it; pitch and roll do).
      const upR = [up[0] * Math.cos(c) - up[1] * Math.sin(c), up[0] * Math.sin(c) + up[1] * Math.cos(c), up[2]];
      gl.uniform3f(loc.rotation, a, b, c); gl.uniform3f(loc.offset, ...item.offset); gl.uniform1f(loc.scale, item.scale); gl.uniform3f(loc.up, ...upR); gl.uniform3f(loc.metal, ...(item.metal || [0.85, 0.85, 0.86]));
      for (const name of item.parts) {
        const { buffer, count } = buffers.get(name); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(attr.position); gl.vertexAttribPointer(attr.position, 3, gl.FLOAT, false, 28, 0);
        gl.enableVertexAttribArray(attr.normal); gl.vertexAttribPointer(attr.normal, 3, gl.FLOAT, false, 28, 12);
        gl.enableVertexAttribArray(attr.facet); gl.vertexAttribPointer(attr.facet, 1, gl.FLOAT, false, 28, 24);
        gl.drawArrays(gl.TRIANGLES, 0, count);
      }
    }
  }
  function release() { if (!gl.isContextLost()) { for (const { buffer } of buffers.values()) gl.deleteBuffer(buffer); gl.deleteProgram(program); } buffers.clear(); }
  return { draw, release };
}
