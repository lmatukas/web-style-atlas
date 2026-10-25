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
  city: { name: 'City room', rate: 240, capacity: 2 },
  gallery: { name: 'Gallery suite', rate: 360, capacity: 3 },
  dome: { name: 'Dome apartment', rate: 520, capacity: 4 },
});
export const BREAKFAST = 28, LATE = 40, MAX_NIGHTS = 14;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_OF = MONTHS;
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const money = v => `€${String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const human = s => { const d = parse(s); return `${d.getDate()} ${MONTHS_OF[d.getMonth()]}`; };
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
    const label = `${WEEKDAYS[date.getDay()]} ${d} ${MONTHS_OF[date.getMonth()]}${start ? ', arrival' : ''}${end ? ', departure' : ''}`;
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
  drawer.querySelector('[data-out=dates]').textContent = arrival ? (departure ? `${human(arrival)} – ${human(departure)}` : `${human(arrival)} – choose departure`) : 'Choose an arrival day';
  drawer.querySelector('[data-out=nights]').textContent = s.nights ? `${s.nights} ${s.nights === 1 ? 'night' : 'nights'}` : '—';
  drawer.querySelector('[data-out=stay]').textContent = s.room && s.nights ? `${s.nights} × ${money(ROOMS[s.room].rate)} = ${money(s.stay)}` : '—';
  drawer.querySelector('[data-out=meals]').textContent = s.breakfast ? (s.nights ? money(s.meals) : `${money(BREAKFAST)} per person per night`) : 'Not included';
  drawer.querySelector('[data-out=late]').textContent = s.late ? money(LATE) : 'Not included';
  drawer.querySelector('#booking-total').textContent = money(s.total);
  drawer.querySelector('[data-guests]').textContent = String(s.guests);
  drawer.querySelector('[data-minus]').disabled = s.guests <= 1;
  drawer.querySelector('[data-plus]').disabled = s.guests >= 4;
  document.querySelectorAll('[data-booking-summary]').forEach(el => { el.textContent = s.nights ? `${human(arrival)} – ${human(departure)} · ${s.guests} ${s.guests === 1 ? 'guest' : 'guests'}` : 'No dates chosen'; });
  window.atlasBooking = { arrival, departure, ...s };
}
function clearMessages() { errors.textContent = ''; errors.hidden = true; confirmation.textContent = ''; confirmation.hidden = true; form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid')); }

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-date]'); if (!button || button.disabled) return;
  const value = button.dataset.date; clearMessages();
  if (!arrival || departure || value <= arrival) { arrival = value; departure = null; }
  else if (nightsBetween(arrival, value) > MAX_NIGHTS) { errors.hidden = false; errors.textContent = `The longest demonstration stay is ${MAX_NIGHTS} nights.`; }
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
  if (!arrival || !departure) problems.push(['dates', 'Choose arrival and departure days in the calendar.']);
  if (!s.room) problems.push(['room', 'Choose a room type.']);
  else if (s.guests > ROOMS[s.room].capacity) problems.push(['room', `${ROOMS[s.room].name}: at most ${ROOMS[s.room].capacity} guests. Choose a larger room.`]);
  if (!form.elements.ack.checked) problems.push(['ack', 'Tick the box to confirm this is a demonstration booking.']);
  if (problems.length) {
    errors.hidden = false; errors.textContent = problems.map(p => p[1]).join(' ');
    for (const [key] of problems) form.querySelectorAll(`[name="${key}"]`).forEach(el => el.setAttribute('aria-invalid', 'true'));
    const key = problems[0][0];
    (key === 'dates' ? grid.querySelector('.day:not(:disabled)') : form.querySelector(`[name="${key}"]:checked, [name="${key}"]`))?.focus();
    return;
  }
  confirmation.hidden = false;
  confirmation.textContent = `Booking ready for the demonstration: ${ROOMS[s.room].name}, ${human(arrival)} – ${human(departure)}, ${s.nights} ${s.nights === 1 ? 'night' : 'nights'}, ${s.guests} ${s.guests === 1 ? 'guest' : 'guests'}${s.breakfast ? ', with breakfast' : ''}${s.late ? ', late check-out' : ''}. Total ${money(s.total)}. This is a local demonstration: nothing was sent and nothing was booked.`;
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
