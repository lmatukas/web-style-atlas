const form = document.querySelector('#workshop-filter');
const search = document.querySelector('#search');
const category = document.querySelector('#category');
const cards = [...document.querySelectorAll('.workshop')];
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');

const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();

function updateResults() {
  const query = normalize(search.value);
  const selectedCategory = category.value;
  let visible = 0;

  for (const card of cards) {
    const matchesText = normalize(card.textContent).includes(query);
    const matchesCategory = selectedCategory === 'all' || card.dataset.category === selectedCategory;
    card.hidden = !(matchesText && matchesCategory);
    if (!card.hidden) visible += 1;
  }

  count.textContent = `${visible} ${visible === 1 ? 'workshop' : 'workshops'} shown`;
  empty.hidden = visible !== 0;
}

search.addEventListener('input', updateResults);
category.addEventListener('change', updateResults);
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('reset', () => {
  requestAnimationFrame(() => {
    updateResults();
    search.focus();
  });
});
document.querySelector('#empty-reset').addEventListener('click', () => {
  form.reset();
});
