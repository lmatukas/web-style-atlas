// The photograph's lamps come on once (finite episode); afterwards the glow follows the pointer.
const scene = document.querySelector('[data-runtime-scene]');
const toggle = document.querySelector('[data-motion-toggle]');
const status = document.querySelector('[data-runtime-status]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const DURATION = 1600;
let raf = 0, start = 0, progress = 0, frames = 0, phase = 0, paused = false, disposed = false, inView = true;
let gx = 0.5, gy = 0.62;

function apply() {
  const lit = 1 - Math.pow(1 - phase, 3);
  scene.style.setProperty('--lit', lit.toFixed(3));
  scene.style.setProperty('--gx', `${(gx * 100).toFixed(1)}%`);
  scene.style.setProperty('--gy', `${(gy * 100).toFixed(1)}%`);
  frames++;
}
const stop = () => { cancelAnimationFrame(raf); raf = 0; start = 0; };
function schedule() { if (!raf && !paused && !disposed && inView && !document.hidden && progress < 1 && !reduced.matches) raf = requestAnimationFrame(tick); }
function tick(t) {
  raf = 0; if (!start) start = t - progress * DURATION;
  progress = Math.min(1, (t - start) / DURATION); phase = progress; apply();
  if (progress >= 1) status.textContent = 'The lights are on. Move the pointer over the photograph and the lantern glow follows.';
  schedule();
}
function settle(reason) {
  stop(); progress = 1; phase = 1; apply();
  status.textContent = `Static fallback: ${reason}. Booking still works.`;
  toggle.disabled = true; toggle.textContent = 'Static view';
}

toggle.addEventListener('click', () => {
  paused = !paused; toggle.setAttribute('aria-pressed', String(paused));
  toggle.textContent = paused ? 'Resume the light' : 'Pause the light';
  if (paused) stop(); else schedule();
});
function follow(event) {
  if (paused || reduced.matches || disposed || event.pointerType === 'touch') return;
  const r = scene.getBoundingClientRect();
  gx = Math.max(0, Math.min(1, (event.clientX - r.left) / r.width));
  gy = Math.max(0, Math.min(1, (event.clientY - r.top) / r.height));
  apply();
}
scene.addEventListener('pointermove', follow);
const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; if (inView) schedule(); else stop(); });
observer.observe(scene);
const onVisibility = () => { if (document.hidden) stop(); else schedule(); };
document.addEventListener('visibilitychange', onVisibility);
reduced.addEventListener('change', () => { if (reduced.matches) settle('reduced motion'); else { toggle.disabled = false; toggle.textContent = paused ? 'Resume the light' : 'Pause the light'; } });
function dispose() { if (disposed) return; disposed = true; stop(); observer.disconnect(); scene.removeEventListener('pointermove', follow); document.removeEventListener('visibilitychange', onVisibility); }
addEventListener('pagehide', dispose);

window.atlasRuntime = { get state() { return { progress, frames, active: Boolean(raf), disposed, mode: 'html', lit: phase, paused }; }, dispose };
if (reduced.matches) settle('reduced motion');
else { status.textContent = 'Evening. The lanterns come on…'; apply(); schedule(); }
