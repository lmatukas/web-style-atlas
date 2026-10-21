const search = document.querySelector('#service-search');
const clearButton = document.querySelector('#clear-search');
const rows = [...document.querySelectorAll('.service-row')];
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');

function filterServices() {
  const query = search.value.trim().toLowerCase();
  let shown = 0;
  for (const row of rows) {
    const matches = !query || `${row.dataset.search} ${row.textContent}`.toLowerCase().includes(query);
    row.hidden = !matches;
    if (matches) shown += 1;
  }
  count.textContent = `${shown} ${shown === 1 ? 'service' : 'services'} shown`;
  empty.hidden = shown !== 0;
}

search.addEventListener('input', filterServices);
clearButton.addEventListener('click', () => {
  search.value = '';
  filterServices();
  search.focus();
});
