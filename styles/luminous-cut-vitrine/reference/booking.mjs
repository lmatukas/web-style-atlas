// Local demonstration booking: salon, day, time and topic. Nothing is sent or stored.
const form = document.querySelector('#visit-form');
const days = form.querySelector('[data-days]');
const times = form.querySelector('[data-times]');
const summary = form.querySelector('#visit-errors');
const confirmation = document.querySelector('#visit-confirmation');
const WEEKDAYS = ['sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis', 'ketvirtadienis', 'penktadienis', 'šeštadienis'];
const SHORT = ['Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št'];
const MONTHS = ['sausio', 'vasario', 'kovo', 'balandžio', 'gegužės', 'birželio', 'liepos', 'rugpjūčio', 'rugsėjo', 'spalio', 'lapkričio', 'gruodžio'];
const SLOTS = ['11:00', '13:00', '15:00', '17:00'];
const SALONS = Object.freeze({ old: 'Senamiesčio salonas', river: 'Krantinės salonas' });
const defaultTopic = form.dataset.defaultTopic || '';
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Six opening days after today, Sundays closed. One slot per day is shown as already taken.
const openDays = [];
for (let offset = 1; openDays.length < 6; offset++) {
  const date = new Date(Date.now() + offset * 86400000);
  if (date.getDay() !== 0) openDays.push(date);
}
openDays.forEach((date, index) => {
  const id = `day-${index}`, value = iso(date);
  days.insertAdjacentHTML('beforeend', `<label class="chip" for="${id}"><input type="radio" id="${id}" name="day" value="${value}" data-index="${index}"><span><b>${SHORT[date.getDay()]}</b> ${date.getDate()}</span></label>`);
});
const dayText = value => { const d = openDays.find(x => iso(x) === value); return d ? `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()} d.` : ''; };

function renderTimes() {
  const chosen = form.querySelector('input[name=day]:checked');
  const taken = chosen ? (Number(chosen.dataset.index) * 3 + 1) % SLOTS.length : -1;
  const previous = form.querySelector('input[name=time]:checked')?.value;
  times.innerHTML = SLOTS.map((slot, index) => {
    const busy = index === taken, id = `time-${index}`;
    return `<label class="chip${busy ? ' busy' : ''}" for="${id}"><input type="radio" id="${id}" name="time" value="${slot}"${busy ? ' disabled' : ''}${!busy && slot === previous ? ' checked' : ''}><span>${slot}${busy ? ' <small>užimta</small>' : ''}</span></label>`;
  }).join('');
  form.querySelector('[data-times-hint]').textContent = chosen ? `Laisvi laikai ${dayText(chosen.value)}` : 'Pirmiausia pasirinkite dieną.';
}

const fields = {
  salon: { test: d => Boolean(SALONS[d.get('salon')]), message: 'Pasirinkite saloną.', focus: () => form.querySelector('input[name=salon]') },
  day: { test: d => Boolean(dayText(d.get('day'))), message: 'Pasirinkite dieną.', focus: () => form.querySelector('input[name=day]') },
  time: { test: d => SLOTS.includes(d.get('time')), message: 'Pasirinkite laisvą laiką.', focus: () => form.querySelector('input[name=time]:not(:disabled)') },
  topic: { test: d => Boolean(d.get('topic')), message: 'Pasirinkite vizito temą.', focus: () => form.elements.topic },
  name: { test: d => String(d.get('name')).trim().length >= 2, message: 'Įrašykite vardą (bent 2 raidės).', focus: () => form.elements.name },
  contact: { test: d => /^\S+@\S+\.\S+$/.test(String(d.get('contact')).trim()) || /^\+?[0-9 ]{8,15}$/.test(String(d.get('contact')).trim()), message: 'Įrašykite el. paštą arba telefono numerį.', focus: () => form.elements.contact },
  ack: { test: d => d.get('ack') === 'yes', message: 'Pažymėkite, kad suprantate demonstracinę rezervaciją.', focus: () => form.elements.ack },
};

function clearErrors() {
  summary.textContent = '';
  for (const key of Object.keys(fields)) {
    const note = form.querySelector(`#error-${key}`); if (note) note.textContent = '';
    form.querySelector(`[data-field="${key}"]`)?.classList.remove('invalid');
    for (const el of form.querySelectorAll(`[name="${key}"]`)) el.removeAttribute('aria-invalid');
  }
}

form.addEventListener('change', event => { if (event.target.name === 'day') renderTimes(); confirmation.textContent = ''; confirmation.hidden = true; });
form.addEventListener('submit', event => {
  event.preventDefault(); clearErrors();
  const data = new FormData(form), failed = Object.entries(fields).filter(([, f]) => !f.test(data));
  if (failed.length) {
    for (const [key, f] of failed) {
      form.querySelector(`#error-${key}`).textContent = f.message;
      form.querySelector(`[data-field="${key}"]`)?.classList.add('invalid');
      for (const el of form.querySelectorAll(`[name="${key}"]`)) el.setAttribute('aria-invalid', 'true');
    }
    summary.textContent = failed.length === 1 ? 'Liko vienas laukas: ' + failed[0][1].message : `Patikrinkite ${failed.length} laukus. ${failed[0][1].message}`;
    failed[0][1].focus()?.focus();
    return;
  }
  const topic = form.elements.topic.selectedOptions[0].textContent;
  confirmation.hidden = false;
  confirmation.textContent = `Vizitas rezervuotas demonstracijai: ${SALONS[data.get('salon')]}, ${dayText(data.get('day'))}, ${data.get('time')}. Tema: ${topic}. Tai vietinė demonstracija: kvietimas neišsiųstas, duomenys niekur neperduoti.`;
  confirmation.focus();
});
form.addEventListener('reset', event => {
  event.preventDefault(); form.querySelectorAll('input[type=radio],input[type=checkbox]').forEach(input => { input.checked = false; });
  form.elements.name.value = ''; form.elements.contact.value = ''; form.elements.topic.value = defaultTopic;
  clearErrors(); renderTimes(); confirmation.textContent = ''; confirmation.hidden = true;
});
form.elements.topic.value = defaultTopic;
renderTimes();
