// Side drawer booking: arrival and departure on a month grid, guests, room, breakfast and late checkout.
// Exact demonstration totals; nothing leaves the page.
const drawer = document.querySelector('#booking');
const panel = drawer.querySelector('.drawer-panel');
const form = drawer.querySelector('#booking-form');
const grid = drawer.querySelector('[data-calendar]');
const monthLabel = drawer.querySelector('[data-month]');
const errors = drawer.querySelector('#booking-errors');
const confirmation = drawer.querySelector('#booking-confirmation');
const outside = [...document.body.children].filter(el => el !== drawer && el.tagName !== 'SCRIPT');

export const ROOMS = Object.freeze({
  city: { name: 'Miesto kambarys', rate: 240, capacity: 2 },
  gallery: { name: 'Galerijos liuksas', rate: 360, capacity: 3 },
  dome: { name: 'Kupolo apartamentai', rate: 520, capacity: 4 },
});
export const BREAKFAST = 28, LATE = 40, MAX_NIGHTS = 14;
const MONTHS = ['sausis', 'vasaris', 'kovas', 'balandis', 'gegužė', 'birželis', 'liepa', 'rugpjūtis', 'rugsėjis', 'spalis', 'lapkritis', 'gruodis'];
const MONTHS_OF = ['sausio', 'vasario', 'kovo', 'balandžio', 'gegužės', 'birželio', 'liepos', 'rugpjūčio', 'rugsėjo', 'spalio', 'lapkričio', 'gruodžio'];
const WEEKDAYS = ['sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis', 'ketvirtadienis', 'penktadienis', 'šeštadienis'];
const money = v => `${String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const human = s => { const d = parse(s); return `${MONTHS_OF[d.getMonth()]} ${d.getDate()} d.`; };
const nightsBetween = (a, b) => Math.round((parse(b) - parse(a)) / 86400000);

const now = new Date(Date.now());
const first = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const minMonth = new Date(first.getFullYear(), first.getMonth(), 1);
const maxMonth = new Date(minMonth.getFullYear(), minMonth.getMonth() + 2, 1);
let view = new Date(minMonth), arrival = null, departure = null, opener = null;

function renderCalendar() {
  monthLabel.textContent = `${MONTHS[view.getMonth()]} ${view.getFullYear()}`;
  drawer.querySelector('[data-prev]').disabled = view <= minMonth;
  drawer.querySelector('[data-next]').disabled = view >= maxMonth;
  const lead = (new Date(view.getFullYear(), view.getMonth(), 1).getDay() + 6) % 7;
  const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  let html = '';
  for (let i = 0; i < lead; i++) html += '<span class="day-blank" aria-hidden="true"></span>';
  for (let d = 1; d <= days; d++) {
    const date = new Date(view.getFullYear(), view.getMonth(), d), value = iso(date);
    const disabled = date < first, start = value === arrival, end = value === departure;
    const inside = arrival && departure && value > arrival && value < departure;
    const label = `${MONTHS_OF[date.getMonth()]} ${d} d., ${WEEKDAYS[date.getDay()]}${start ? ', atvykimas' : ''}${end ? ', išvykimas' : ''}`;
    html += `<button type="button" class="day${start ? ' start' : ''}${end ? ' end' : ''}${inside ? ' inside' : ''}" data-date="${value}" aria-label="${label}" aria-pressed="${start || end}"${disabled ? ' disabled' : ''}>${d}</button>`;
  }
  grid.innerHTML = html;
}

function selection() {
  const data = new FormData(form), room = ROOMS[data.get('room')] ? data.get('room') : null;
  const guests = Number(data.get('guests')), nights = arrival && departure ? nightsBetween(arrival, departure) : 0;
  const breakfast = data.get('breakfast') === 'yes', late = data.get('late') === 'yes';
  const stay = room ? ROOMS[room].rate * nights : 0, meals = breakfast ? BREAKFAST * guests * nights : 0, extra = late ? LATE : 0;
  return { room, guests, nights, breakfast, late, stay, meals, extra, total: stay + meals + extra };
}

function render() {
  const s = selection();
  drawer.querySelector('[data-out=dates]').textContent = arrival ? (departure ? `${human(arrival)} – ${human(departure)}` : `${human(arrival)} – pasirinkite išvykimą`) : 'Pasirinkite atvykimo dieną';
  drawer.querySelector('[data-out=nights]').textContent = s.nights ? `${s.nights} ${s.nights === 1 ? 'naktis' : s.nights < 10 ? 'naktys' : 'naktų'}` : '—';
  drawer.querySelector('[data-out=stay]').textContent = s.room && s.nights ? `${s.nights} × ${money(ROOMS[s.room].rate)} = ${money(s.stay)}` : '—';
  drawer.querySelector('[data-out=meals]').textContent = s.breakfast ? (s.nights ? money(s.meals) : `${money(BREAKFAST)} asmeniui už naktį`) : 'Neįtraukta';
  drawer.querySelector('[data-out=late]').textContent = s.late ? money(LATE) : 'Neįtraukta';
  drawer.querySelector('#booking-total').textContent = money(s.total);
  drawer.querySelector('[data-guests]').textContent = String(s.guests);
  drawer.querySelector('[data-minus]').disabled = s.guests <= 1;
  drawer.querySelector('[data-plus]').disabled = s.guests >= 4;
  document.querySelectorAll('[data-booking-summary]').forEach(el => { el.textContent = s.nights ? `${human(arrival)} – ${human(departure)} · ${s.guests} sv.` : 'Datos nepasirinktos'; });
  window.atlasBooking = { arrival, departure, ...s };
}
function clearMessages() { errors.textContent = ''; errors.hidden = true; confirmation.textContent = ''; confirmation.hidden = true; form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid')); }

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-date]'); if (!button || button.disabled) return;
  const value = button.dataset.date; clearMessages();
  if (!arrival || departure || value <= arrival) { arrival = value; departure = null; }
  else if (nightsBetween(arrival, value) > MAX_NIGHTS) { errors.hidden = false; errors.textContent = `Ilgiausia demonstracinė viešnagė — ${MAX_NIGHTS} naktų.`; }
  else departure = value;
  renderCalendar(); render(); grid.querySelector(`[data-date="${value}"]`)?.focus();
});
drawer.querySelector('[data-prev]').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCalendar(); });
drawer.querySelector('[data-next]').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCalendar(); });
drawer.querySelector('[data-minus]').addEventListener('click', () => { form.elements.guests.value = String(Math.max(1, Number(form.elements.guests.value) - 1)); clearMessages(); render(); });
drawer.querySelector('[data-plus]').addEventListener('click', () => { form.elements.guests.value = String(Math.min(4, Number(form.elements.guests.value) + 1)); clearMessages(); render(); });
form.addEventListener('change', () => { clearMessages(); render(); });

form.addEventListener('submit', event => {
  event.preventDefault(); clearMessages();
  const s = selection(), problems = [];
  if (!arrival || !departure) problems.push(['dates', 'Pasirinkite atvykimo ir išvykimo dienas kalendoriuje.']);
  if (!s.room) problems.push(['room', 'Pasirinkite kambario tipą.']);
  else if (s.guests > ROOMS[s.room].capacity) problems.push(['room', `${ROOMS[s.room].name}: daugiausia ${ROOMS[s.room].capacity} svečiai. Rinkitės didesnį kambarį.`]);
  if (!form.elements.ack.checked) problems.push(['ack', 'Pažymėkite, kad suprantate demonstracinę rezervaciją.']);
  if (problems.length) {
    errors.hidden = false; errors.textContent = problems.map(p => p[1]).join(' ');
    for (const [key] of problems) form.querySelectorAll(`[name="${key}"]`).forEach(el => el.setAttribute('aria-invalid', 'true'));
    const key = problems[0][0];
    (key === 'dates' ? grid.querySelector('.day:not(:disabled)') : form.querySelector(`[name="${key}"]:checked, [name="${key}"]`))?.focus();
    return;
  }
  confirmation.hidden = false;
  confirmation.textContent = `Rezervacija paruošta demonstracijai: ${ROOMS[s.room].name}, ${human(arrival)} – ${human(departure)}, ${s.nights} n., ${s.guests} sv.${s.breakfast ? ', su pusryčiais' : ''}${s.late ? ', vėlyvas išvykimas' : ''}. Suma ${money(s.total)}. Tai vietinė demonstracija: niekas neišsiųsta ir nerezervuota.`;
  confirmation.focus();
});
form.addEventListener('reset', event => {
  event.preventDefault(); arrival = departure = null; view = new Date(minMonth);
  form.elements.guests.value = '2'; form.querySelectorAll('input[type=radio],input[type=checkbox]').forEach(i => { i.checked = false; });
  clearMessages(); renderCalendar(); render();
});

function focusables() { return [...panel.querySelectorAll('button:not(:disabled),input:not(:disabled),[tabindex="0"],a[href]')].filter(el => el.offsetParent !== null); }
export function open(trigger, room) {
  opener = trigger || document.activeElement;
  if (room && ROOMS[room]) { form.querySelector(`input[name=room][value=${room}]`).checked = true; clearMessages(); render(); }
  drawer.hidden = false; outside.forEach(el => el.setAttribute('inert', ''));
  document.documentElement.classList.add('drawer-open');
  void panel.offsetWidth; // commit the closed position so the CSS transition runs without a frame callback
  drawer.classList.add('open');
  drawer.querySelector('#booking-title').focus();
}
export function close() {
  drawer.classList.remove('open'); outside.forEach(el => el.removeAttribute('inert'));
  document.documentElement.classList.remove('drawer-open');
  drawer.hidden = true; opener?.focus?.();
}
document.querySelectorAll('[data-open-booking]').forEach(b => b.addEventListener('click', event => { event.preventDefault(); open(b, b.dataset.room); }));
drawer.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
drawer.addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); close(); return; }
  if (event.key !== 'Tab') return;
  const items = focusables(); if (!items.length) return;
  const firstItem = items[0], last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === firstItem) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); firstItem.focus(); }
});
// The edge tab appears only while no other booking action (masthead or a primary room CTA) is on screen,
// so one primary action is visible at a time, including between sections.
const edge = document.querySelector('.edge-tab'), masthead = document.querySelector('.masthead');
if (edge && masthead) {
  edge.classList.add('tucked');
  const onScreen = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.isIntersecting ? onScreen.add(entry.target) : onScreen.delete(entry.target);
    edge.classList.toggle('tucked', onScreen.size > 0);
  });
  for (const rival of [masthead, ...document.querySelectorAll('main .primary[data-open-booking]')]) observer.observe(rival);
}
renderCalendar(); render();
window.atlasDrawer = { open, close };
