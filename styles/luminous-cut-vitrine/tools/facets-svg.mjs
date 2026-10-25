// Prints the inline facet diagram used in reference/index.html, from the same proportions as gem.mjs.
const TAU = Math.PI * 2, rt = 0.56, hc = 0.32, g = 0.018, hp = 0.86, rs = 0.775, rq = 0.44;
const R = 190, cx = 320, top = 230, gy = 548;
const f = n => Math.round(n * 10) / 10;
const P = (r, a) => [f(cx + r * R * Math.cos(a)), f(top + r * R * Math.sin(a))];
const poly = (pts, cls = 'l') => `<polygon class="${cls}" points="${pts.map(p => p.join(',')).join(' ')}"/>`;
const line = (a, b, cls = 'l') => `<line class="${cls}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
const T = k => P(rt, k * TAU / 8), S = k => P(rs, (k + 0.5) * TAU / 8), G = j => P(1, j * TAU / 16);
const parts = [];
// Top view: table, stars, bezels and upper girdle facets.
parts.push(poly(Array.from({ length: 8 }, (_, k) => T(k)), 'l strong'));
for (let k = 0; k < 8; k++) {
  parts.push(poly([T(k), T(k + 1), S(k)]));
  parts.push(poly([T(k), S(k), G(2 * k), S(k - 1)]));
  parts.push(line(S(k), G(2 * k + 1)));
}
parts.push(`<circle class="l strong" cx="${cx}" cy="${top}" r="${R}"/>`);
// Profile: crown, girdle and pavilion with facet edges.
const X = x => f(cx + x * R), Y = y => f(gy - y * R);
const outline = [[X(-rt), Y(hc)], [X(rt), Y(hc)], [X(1), Y(g)], [X(1), Y(-g)], [X(0), Y(-hp)], [X(-1), Y(-g)], [X(-1), Y(g)]];
parts.push(poly(outline, 'l strong'));
for (const x of [-0.7071, 0, 0.7071]) parts.push(line([X(x * rt), Y(hc)], [X(x), Y(g)]));
for (const x of [-0.71, -0.38, 0.38, 0.71]) parts.push(line([X(x), Y(-g)], [X(0), Y(-hp)]));
parts.push(line([X(-1), Y(g)], [X(1), Y(g)])); parts.push(line([X(-1), Y(-g)], [X(1), Y(-g)]));
// Leaders and labels (HTML fonts apply because the SVG is inline).
const label = (y, x0, text) => `<line class="lead" x1="${x0}" y1="${y}" x2="${X(1) + 26}" y2="${y}"/><circle class="dot" cx="${x0}" cy="${y}" r="2.5"/><text x="${X(1) + 34}" y="${y + 4}">${text}</text>`;
parts.push(label(Y(hc), X(rt * 0.6), 'Table'));
parts.push(label(Y((hc + g) / 2), X(0.8), 'Crown'));
parts.push(label(Y(0), X(0.99), 'Girdle'));
parts.push(label(Y(-hp * 0.45), X(0.5), 'Pavilion'));
parts.push(label(Y(-hp), X(0), 'Culet'));
parts.push(`<text class="cap" x="${cx}" y="${top + R + 34}" text-anchor="middle">Top view</text>`);
console.log(`<svg class="facets" viewBox="0 0 640 740" role="img" aria-labelledby="facets-title"><title id="facets-title">Round brilliant diagram: a top view with the table and facets, and below it a profile with the table, crown, girdle, pavilion and culet.</title>${parts.join('')}</svg>`);
