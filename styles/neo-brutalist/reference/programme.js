const buttons = [...document.querySelectorAll('[data-day]')];
for (const button of buttons) button.addEventListener('click', () => {
  for (const other of buttons) other.setAttribute('aria-pressed', String(other === button));
  for (const list of document.querySelectorAll('[data-sessions]')) list.hidden = list.dataset.sessions !== button.dataset.day;
  document.getElementById('day-status').textContent = `Showing ${button.dataset.day === 'one' ? 'Saturday' : 'Sunday'}: 4 sessions`;
});
