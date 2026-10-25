// Native WebGL vitrine: one original round brilliant, turned by pointer, touch and keys.
import { createRenderer } from './gem.mjs';

const scene = document.querySelector('[data-runtime-scene]');
const canvas = scene.querySelector('canvas');
const fallback = scene.querySelector('[data-runtime-fallback]');
const status = document.querySelector('[data-runtime-status]');
const toggle = document.querySelector('[data-motion-toggle]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const variant = document.body.dataset.variant;

const METALS = Object.freeze({ white: [0.84, 0.85, 0.86], yellow: [0.93, 0.74, 0.4], rose: [0.9, 0.62, 0.53], platinum: [0.76, 0.78, 0.82] });
const CARAT_SCALE = Object.freeze({ '0.5': 0.8, '1.0': 1, '1.5': 1.12, '2.0': 1.22 });
const POSE = variant === 'b' ? { pitch: 1.0, yaw: 0.34 } : { pitch: 1.28, yaw: 0.1 };

let gl = null, renderer = null, raf = 0, start = 0, progress = 0, frames = 0, duration = 1400;
let paused = false, disposed = false, inView = true;
let phase = 0, from = 0, target = 1;
let yaw = 0, pitch = 0, glance = 0;
let metal = 'white', carat = '1.0';

const stop = () => { cancelAnimationFrame(raf); raf = 0; start = 0; };
const label = () => `Turned ${Math.round(yaw * 57.3)}°, tilted ${Math.round(pitch * 57.3)}°.`;

function backup(reason) {
  stop(); progress = 1; canvas.hidden = true; fallback.hidden = false;
  document.body.classList.add('static-mode');
  status.textContent = `Static fallback: ${reason}. The arrows still turn the stone, and every choice works.`;
  toggle.disabled = true; toggle.textContent = 'Static view';
}

function size() {
  const rect = scene.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.75);
  canvas.width = Math.max(1, Math.round(rect.width * dpr)); canvas.height = Math.max(1, Math.round(rect.height * dpr));
}

function draw() {
  if (!renderer || disposed || canvas.hidden || gl.isContextLost()) return;
  const aspect = canvas.width / canvas.height, ease = 1 - Math.pow(1 - phase, 3);
  const settle = 1 - ease;
  const rotation = [POSE.pitch - 0.42 * settle + pitch, POSE.yaw - 1.05 * settle + yaw, 0];
  const light = 0.35 - 1.2 * settle + glance + yaw * 0.6;
  const items = variant === 'b'
    ? [{ parts: ['gem', 'head'], rotation, offset: [0, 0.3, 0], scale: CARAT_SCALE[carat], metal: METALS[metal] }]
    : [{ parts: ['gem'], rotation, offset: [0, 0, 0], scale: 1 }];
  const zoom = variant === 'b' ? Math.max(2.2, 2.0 / aspect) : Math.max(1.62, 1.32 / aspect);
  renderer.draw({ width: canvas.width, height: canvas.height, zoom, light, items });
  frames++;
}

function init() {
  if (disposed) return;
  if (reduced.matches) return backup('reduced motion');
  try {
    gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false, preserveDrawingBuffer: true });
    if (!gl) return backup('3D unavailable');
    renderer = createRenderer(gl);
    canvas.hidden = false; size(); draw();
    fallback.hidden = true; document.body.classList.remove('static-mode');
    toggle.disabled = false; toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
    status.textContent = 'Turn the stone with the mouse, a swipe or the arrows. The light in the facets moves with it.';
    episode(1, 1400);
  } catch { renderer = null; backup('3D could not start'); }
}

function episode(next, ms) { from = phase; target = next; progress = 0; duration = ms; stop(); if (paused || reduced.matches) { phase = next; progress = 1; draw(); } else schedule(); }
function schedule() { if (!raf && !paused && !disposed && inView && !document.hidden && !canvas.hidden && progress < 1) raf = requestAnimationFrame(tick); }
function tick(t) { raf = 0; if (!start) start = t; progress = Math.min(1, (t - start) / duration); phase = from + (target - from) * progress; draw(); schedule(); }

function turn(dYaw, dPitch = 0) {
  yaw = Math.max(-3.2, Math.min(3.2, yaw + dYaw)); pitch = Math.max(-0.55, Math.min(0.55, pitch + dPitch));
  if (canvas.hidden) { fallback.style.transform = `rotate(${Math.round(yaw * 30)}deg)`; status.textContent = `Static fallback: ${label()}`; }
  else { draw(); status.textContent = label(); }
}

toggle.addEventListener('click', () => {
  paused = !paused; toggle.setAttribute('aria-pressed', String(paused)); toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
  if (paused) stop(); else { if (progress < 1) start = 0; schedule(); }
});
document.querySelectorAll('[data-turn]').forEach(button => button.addEventListener('click', () => turn(Number(button.dataset.turn) * 0.32)));
scene.addEventListener('keydown', event => {
  const keys = { ArrowLeft: [-0.22, 0], ArrowRight: [0.22, 0], ArrowUp: [0, -0.12], ArrowDown: [0, 0.12] }[event.key];
  if (!keys) return; event.preventDefault(); turn(...keys);
});
let drag = null;
scene.addEventListener('pointerdown', event => { drag = { x: event.clientX, y: event.clientY, type: event.pointerType }; if (event.pointerType !== 'touch') scene.setPointerCapture?.(event.pointerId); });
scene.addEventListener('pointermove', event => {
  if (drag) {
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y; drag.x = event.clientX; drag.y = event.clientY;
    turn(dx * 0.009, drag.type === 'touch' ? 0 : dy * 0.006);
  } else if (event.pointerType === 'mouse' && !canvas.hidden && !paused) {
    const rect = scene.getBoundingClientRect(); glance = ((event.clientX - rect.left) / rect.width - 0.5) * 0.9; draw();
  }
});
for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) scene.addEventListener(type, () => { drag = null; });

const resizeObserver = new ResizeObserver(() => { if (!canvas.hidden) { size(); draw(); } });
resizeObserver.observe(scene);
const intersection = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; if (inView) schedule(); else stop(); });
intersection.observe(scene);
document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else schedule(); });
canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); renderer = null; backup('3D context lost'); });
canvas.addEventListener('webglcontextrestored', () => { if (!disposed && !reduced.matches) { canvas.hidden = false; init(); } });
function release() { renderer?.release(); renderer = null; }
reduced.addEventListener('change', () => { stop(); if (reduced.matches) { release(); backup('reduced motion'); } else { canvas.hidden = false; init(); } });
function dispose() { if (disposed) return; disposed = true; stop(); resizeObserver.disconnect(); intersection.disconnect(); release(); }
addEventListener('pagehide', dispose);

window.atlasRuntime = {
  get state() { return { progress, frames, active: Boolean(raf), disposed, mode: canvas.hidden ? 'fallback' : 'webgl', yaw, pitch, metal, carat }; },
  setSelection(value) { if (value.metal in METALS) metal = value.metal; if (value.carat in CARAT_SCALE) carat = value.carat; draw(); },
  dispose,
};
init();
