const $ = selector => document.querySelector(selector);
const all = selector => [...document.querySelectorAll(selector)];

// A finite lighting episode. Manual controls remain useful in static mode.
const scene = $('[data-runtime-scene]');
const light = $('#light');
const slider = $('#light-position');
const toggle = $('[data-motion-toggle]');
const status = $('[data-runtime-status]');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const state = {progress: 0, frames: 0, active: false, disposed: false, mode: 'svg'};
window.atlasRuntime = {state};
let raf = 0, start = null, elapsed = 0, duration = 1600, paused = false, visible = true;
let from = {x: 20, y: 65}, target = {x: 70, y: 40}, position = {...from};
function paint() {
  light.setAttribute('cx', position.x + '%');
  light.setAttribute('cy', position.y + '%');
}
function halt() {
  cancelAnimationFrame(raf);
  raf = 0;
  start = null;
  state.active = false;
}
function stop() { elapsed = state.progress * duration; halt(); }
function frame(time) {
  if (!state.active || state.disposed) return;
  if (start === null) start = time;
  state.progress = Math.min(1, (elapsed + time - start) / duration);
  const t = 1 - Math.pow(1 - state.progress, 3);
  position = {x: from.x + (target.x - from.x) * t, y: from.y + (target.y - from.y) * t};
  state.frames++;
  paint();
  if (state.progress < 1) raf = requestAnimationFrame(frame);
  else { halt(); elapsed = duration; status.textContent = 'The light has settled'; }
}
function run() {
  if (state.active || state.disposed || paused || !visible || document.hidden || preference.matches || state.progress === 1) return;
  state.active = true;
  raf = requestAnimationFrame(frame);
}
function aim(x, y) {
  if (state.disposed) return;
  stop(); from = {...position}; target = {x, y}; elapsed = 0; duration = 420; state.progress = 0;
  if (preference.matches || paused || !visible || document.hidden) {
    position = {...target}; state.progress = 1; paint();
  } else run();
}
function onPointer(event) {
  // Touch keeps normal vertical page scrolling; the native range is the touch control.
  if (event.pointerType === 'touch') return;
  const box = scene.getBoundingClientRect();
  const x = Math.max(10, Math.min(90, (event.clientX - box.left) / box.width * 100));
  const y = Math.max(15, Math.min(85, (event.clientY - box.top) / box.height * 100));
  slider.value = String(Math.round(x)); aim(x, y);
}
function onRange() { aim(Number(slider.value), 40); }
function onToggle() {
  paused = !paused;
  if (paused) { stop(); status.textContent = 'Motion paused'; }
  else run();
  toggle.textContent = paused ? 'Resume motion' : 'Pristabdyti';
  toggle.setAttribute('aria-pressed', String(paused));
}
function onPreference() {
  stop(); toggle.disabled = preference.matches;
  toggle.textContent = preference.matches ? 'Motion off' : paused ? 'Resume motion' : 'Pristabdyti';
  state.mode = preference.matches ? 'static' : 'svg';
  if (preference.matches) {
    position = {...target}; state.progress = 1; elapsed = duration;
    status.textContent = 'Static light'; paint();
  } else run();
}
function onVisibility() { document.hidden ? stop() : run(); }
const observer = new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting; visible ? run() : stop();
});
observer.observe(scene);
scene.addEventListener('pointermove', onPointer);
slider.addEventListener('input', onRange);
toggle.addEventListener('click', onToggle);
preference.addEventListener('change', onPreference);
document.addEventListener('visibilitychange', onVisibility);
paint(); onPreference();
addEventListener('pagehide', () => {
  stop(); state.disposed = true; observer.disconnect();
  scene.removeEventListener('pointermove', onPointer);
  slider.removeEventListener('input', onRange);
  toggle.removeEventListener('click', onToggle);
  preference.removeEventListener('change', onPreference);
  document.removeEventListener('visibilitychange', onVisibility);
}, {once: true});

const cleanName = value => value.trim().replace(/\s+/g, ' ');
const validName = value => cleanName(value).length >= 2 && /\p{L}/u.test(value);
function clearError(form, error) {
  error.hidden = true; error.textContent = '';
  form.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute('aria-invalid'));
}
function fail(error, input, message) {
  error.textContent = message; error.hidden = false;
  input.setAttribute('aria-invalid', 'true'); input.focus(); return false;
}

const reservation = $('#reservation-form');
if (reservation) {
  const events = [
    {id: 'nov06', month: '11', day: '06', title: 'Talk without a stage', time: '19.00', house: 'Vilnius house', seats: 4},
    {id: 'nov14', month: '11', day: '14', title: 'The listening hour', time: '20.00', house: 'River house', seats: 2},
    {id: 'nov27', month: '11', day: '27', title: 'Dinner with a story', time: '19.30', house: 'Vilnius house', seats: 3},
    {id: 'dec04', month: '12', day: '04', title: 'Winter readings', time: '18.30', house: 'River house', seats: 4},
    {id: 'dec12', month: '12', day: '12', title: 'The small music salon', time: '20.00', house: 'Vilnius house', seats: 2},
    {id: 'dec19', month: '12', day: '19', title: 'The last table of the year', time: '19.00', house: 'River house', seats: 1}
  ];
  const error = $('#reservation-error'), confirmation = $('#reservation-confirmation');
  let month = '11';
  const selected = () => events.find(e => e.id === reservation.elements.event?.value && e.month === month);
  function invalidate() { clearError(reservation, error); confirmation.hidden = true; }
  function detail() {
    const event = selected();
    $('#event-title').textContent = event?.title || 'Your chosen evening';
    $('#event-detail').textContent = event ? `2026-${event.month}-${event.day} · ${event.time} · ${event.house}. You can choose up to ${event.seats} ${event.seats === 1 ? 'seat' : 'seats'} (demonstration limit).` : 'Choose a programme entry. We will then prepare a local booking summary.';
    $('#seats').max = String(event?.seats || 4);
  }
  function renderEvents() {
    $('#event-list').replaceChildren();
    for (const event of events.filter(e => e.month === month)) {
      const label = document.createElement('label'); label.className = 'event-row';
      // All event metadata above is fixed authored content, never form input.
      label.innerHTML = `<input type="radio" name="event" value="${event.id}" required aria-describedby="reservation-error"><span class="event-date">${event.day}<small>${month === '11' ? 'NOV' : 'DEC'}</small></span><span class="event-name">${event.title}<small>${event.time} / ${event.house}<br>Up to ${event.seats} ${event.seats === 1 ? 'seat' : 'seats'} · demonstration</small></span>`;
      $('#event-list').append(label);
    }
    all('[data-month]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.month === month)));
    detail();
  }
  all('[data-month]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.month === month) return;
    month = button.dataset.month; invalidate(); renderEvents();
  }));
  reservation.addEventListener('input', () => { invalidate(); detail(); });
  reservation.addEventListener('change', () => { invalidate(); detail(); });
  reservation.addEventListener('submit', event => {
    event.preventDefault(); invalidate();
    const choice = selected(), count = Number($('#seats').value), name = cleanName($('#guest-name').value);
    if (!choice) return fail(error, reservation.querySelector('[name=event]'), 'Choose an evening from the programme.');
    if (!validName(name)) return fail(error, $('#guest-name'), 'Enter your name: at least two characters, including a letter.');
    if (!Number.isInteger(count) || count < 1 || count > choice.seats) return fail(error, $('#seats'), `For this evening, choose a whole number of seats from 1 to ${choice.seats}.`);
    if (!$('#reservation-demo').checked) return fail(error, $('#reservation-demo'), 'Confirm that you understand this is a demonstration.');
    $('#reservation-summary').textContent = `${name} · ${choice.title} · 2026-${choice.month}-${choice.day}, ${choice.time} · ${choice.house} · Seats: ${count}.`;
    confirmation.hidden = false; confirmation.focus();
  });
  reservation.addEventListener('reset', () => {
    invalidate(); queueMicrotask(() => { month = '11'; renderEvents(); });
  });
  renderEvents();
}

const application = $('#application-form');
if (application) {
  let step = 1;
  const error = $('#application-error'), confirmation = $('#application-confirmation'), next = $('#application-next');
  const houses = {vilnius: 'Vilnius house', river: 'River house'};
  const levels = {home: 'House member', friend: 'House friend'};
  function values() {
    return {name: cleanName($('#member-name').value), email: $('#member-email').value.trim(), level: application.elements.level.value, house: $('#club-house').value, referral: application.elements.referral.value, referrer: cleanName($('#referrer').value)};
  }
  function rows() {
    const v = values();
    return [['Full name', v.name], ['Email', v.email], ['Membership level', levels[v.level]], ['Main club house', houses[v.house]], ['How we meet', v.referral === 'member' ? 'A member\'s recommendation: ' + v.referrer : 'An introductory conversation']];
  }
  function summary() {
    const list = $('#application-summary'); list.replaceChildren();
    for (const [label, value] of rows()) {
      const dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = label; dd.textContent = value; list.append(dt, dd);
    }
  }
  function invalidate() {
    clearError(application, error); confirmation.hidden = true; next.disabled = false;
  }
  function referralField() {
    const required = application.elements.referral.value === 'member';
    $('#referrer-field').hidden = !required; $('#referrer').disabled = !required; $('#referrer').required = required;
  }
  function show(number, focus = true) {
    step = number; invalidate();
    all('[data-step]').forEach(section => section.hidden = Number(section.dataset.step) !== step);
    all('[data-step-indicator]').forEach(item => Number(item.dataset.stepIndicator) === step ? item.setAttribute('aria-current', 'step') : item.removeAttribute('aria-current'));
    $('#application-back').hidden = step === 1;
    next.textContent = step === 3 ? 'Prepare application ↗' : 'Next →';
    if (step === 3) summary();
    if (focus) $(`[data-step="${step}"] [data-step-title]`).focus();
  }
  function validate(number) {
    const v = values();
    if (number === 1) {
      if (!validName(v.name)) return fail(error, $('#member-name'), 'Enter your full name: at least two characters, including a letter.');
      if (!v.email || !$('#member-email').validity.valid) return fail(error, $('#member-email'), 'Enter a valid email address.');
      if (!levels[v.level]) return fail(error, application.querySelector('[name=level]'), 'Choose a membership level.');
    }
    if (number === 2) {
      if (!houses[v.house]) return fail(error, $('#club-house'), 'Choose your preferred club house.');
      if (!['member', 'introduction'].includes(v.referral)) return fail(error, application.querySelector('[name=referral]'), 'Choose how we should meet.');
      if (v.referral === 'member' && !validName(v.referrer)) return fail(error, $('#referrer'), 'Enter the recommending member\'s full name.');
    }
    return true;
  }
  application.addEventListener('submit', event => {
    event.preventDefault(); invalidate();
    if (step < 3) { if (validate(step)) show(step + 1); return; }
    // Revalidate earlier steps too; a DOM edit cannot create an inconsistent summary.
    for (const previous of [1, 2]) {
      show(previous, false);
      if (!validate(previous)) return;
    }
    show(3, false);
    if (!$('#application-demo').checked) return fail(error, $('#application-demo'), 'Confirm that you understand this is a local demonstration.');
    $('#application-result').textContent = rows().map(([label, value]) => `${label}: ${value}`).join('. ') + '.';
    confirmation.hidden = false; next.disabled = true; confirmation.focus();
  });
  $('#application-back').addEventListener('click', () => {
    $('#application-demo').checked = false; show(Math.max(1, step - 1));
  });
  application.addEventListener('input', () => { invalidate(); referralField(); if (step === 3) summary(); });
  application.addEventListener('change', () => { invalidate(); referralField(); if (step === 3) summary(); });
  application.addEventListener('reset', () => {
    invalidate(); queueMicrotask(() => { referralField(); show(1); });
  });
  referralField(); show(1, false);
}
