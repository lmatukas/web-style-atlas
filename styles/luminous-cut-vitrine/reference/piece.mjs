// Single-piece choices: metal, stone, ring size and engraving update the stone, preview and demonstration price.
const form = document.querySelector('#piece-form');
const CARATS = Object.freeze({ '0.5': { label: '0.5 ct', price: 4200 }, '1.0': { label: '1.0 ct', price: 9800 }, '1.5': { label: '1.5 ct', price: 16400 }, '2.0': { label: '2.0 ct', price: 26900 } });
const METALS = Object.freeze({ white: { label: 'White gold', price: 0 }, yellow: { label: 'Yellow gold', price: 0 }, rose: { label: 'Rose gold', price: 0 }, platinum: { label: 'Platinum', price: 650 } });
const ALLOWED = /^[\p{L}0-9 .,&·'-]*$/u;
const money = value => `€${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
const out = name => document.querySelector(`[data-out="${name}"]`);

function selection() {
  const data = new FormData(form), metal = data.get('metal'), carat = data.get('carat'), size = data.get('size');
  const engraving = String(data.get('engraving') || '').trim();
  if (!METALS[metal] || !CARATS[carat] || !/^(4[8-9]|5[0-9]|60)$/.test(size)) return null;
  return { metal, carat, size, engraving, valid: ALLOWED.test(engraving), total: CARATS[carat].price + METALS[metal].price };
}

function render() {
  const s = selection(); if (!s) return;
  const error = document.querySelector('#engraving-error'), input = form.elements.engraving;
  if (s.valid) { error.textContent = ''; input.removeAttribute('aria-invalid'); }
  else { error.textContent = 'Engraving allows letters, numbers, spaces and . , & · \' - only.'; input.setAttribute('aria-invalid', 'true'); }
  document.body.dataset.metal = s.metal;
  out('metal').textContent = METALS[s.metal].label;
  out('carat').textContent = CARATS[s.carat].label;
  out('size').textContent = s.size;
  out('engraving').textContent = s.engraving && s.valid ? `“${s.engraving}”` : 'No engraving';
  out('stone-price').textContent = money(CARATS[s.carat].price);
  out('metal-price').textContent = METALS[s.metal].price ? `+${money(METALS[s.metal].price)}` : 'Included';
  document.querySelector('#piece-total').textContent = money(s.total);
  document.querySelector('[data-engraving-preview]').textContent = s.engraving && s.valid ? s.engraving : 'Your words';
  document.querySelector('[data-engraving-preview]').classList.toggle('placeholder', !(s.engraving && s.valid));
  document.querySelector('[data-count]').textContent = `${s.engraving.length} / 18`;
  const image = document.querySelector('[data-piece-image]');
  image.src = `../assets/ring-${s.metal}.webp`;
  image.alt = `Dawn: ${METALS[s.metal].label.toLowerCase()}, ${CARATS[s.carat].label} brilliant — image of the selected ring`;
  window.atlasRuntime?.setSelection({ metal: s.metal, carat: s.carat });
}

form.addEventListener('input', render);
form.addEventListener('change', render);
form.addEventListener('submit', event => event.preventDefault());
document.querySelector('[data-piece-reset]').addEventListener('click', () => {
  form.querySelector('input[name=metal][value=white]').checked = true;
  form.querySelector('input[name=carat][value="1.0"]').checked = true;
  form.elements.size.value = '54'; form.elements.engraving.value = ''; render();
});
render();
