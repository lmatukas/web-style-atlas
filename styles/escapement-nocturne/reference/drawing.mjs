// Original vector counterpart of the native WebGL watch. No imported artwork.
export const MATERIALS = {
  case: { gold: { label: 'Warm gold', price: 1600, color: '#bb9862' }, steel: { label: 'Polished steel', price: 0, color: '#b8bec1' }, bronze: { label: 'Dark bronze', price: 600, color: '#a87550' } },
  dial: { black: { label: 'Obsidian black', price: 0, color: '#131416' }, blue: { label: 'Night blue', price: 250, color: '#172d40' }, ivory: { label: 'Warm ivory', price: 350, color: '#ddd2b7' } },
  strap: { black: { label: 'Black leather', price: 0, color: '#202024' }, brown: { label: 'Tobacco leather', price: 180, color: '#704831' }, mesh: { label: 'Steel mesh', price: 480, color: '#8b9295' } }
};
export const DEFAULTS = { case: 'gold', dial: 'black', strap: 'black' };
export const BASE_PRICE = 6800;
export const totalPrice = config => BASE_PRICE + Object.keys(MATERIALS).reduce((sum, key) => sum + MATERIALS[key][config[key]].price, 0);
export const angles = date => [((date.getHours() % 12) + date.getMinutes() / 60 + date.getSeconds() / 3600) * 30, (date.getMinutes() + date.getSeconds() / 60) * 6, date.getSeconds() * 6];
const round = n => Math.round(n * 100) / 100;
function gear(x, y, r, teeth, turn, color = 'url(#metal)') {
  const points = Array.from({ length: teeth * 4 }, (_, i) => {
    const a = i / (teeth * 4) * Math.PI * 2, rad = r * ([0, 3].includes(i % 4) ? .91 : 1);
    return `${round(Math.cos(a) * rad)},${round(Math.sin(a) * rad)}`;
  }).join(' ');
  let spokes = '';
  for (let i = 0; i < 5; i++) spokes += `<path d="M-3 -${r*.2} L-5 -${r*.78} L5 -${r*.78} L3 -${r*.2}Z" fill="${color}" transform="rotate(${i*72})"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${turn})"><polygon points="${points}" fill="${color}" stroke="#d1bd92" stroke-width=".7"/><circle r="${r*.76}" fill="#101114" stroke="#795f3c" stroke-width="1.8"/>${spokes}<circle r="${r*.22}" fill="url(#steel)" stroke="#c3b496"/><circle r="${r*.08}" fill="#9d4149"/><path d="M-${r*.075} 0H${r*.075}" stroke="#f1b9a0"/></g>`;
}
export function watchDrawing(config = DEFAULTS, reveal = .78, date = new Date('2026-01-01T10:08:32')) {
  const c = MATERIALS.case[config.case].color, d = MATERIALS.dial[config.dial].color, s = MATERIALS.strap[config.strap].color;
  const light = config.dial === 'ivory', ink = light ? '#463b2a' : '#e6d7b9', hand = light ? '#34373a' : '#e8dbc4';
  const [hour, minute, second] = angles(date), opacity = round(1 - reveal * .93);
  let ticks = '', screws = '', brushing = '', stitches = '', mesh = '';
  for (let i=0;i<60;i++) ticks += `<path d="M400 ${i%5===0?261:254}V${i%5===0?280:261}" transform="rotate(${i*6} 400 500)" stroke="${ink}" stroke-width="${i%5===0?4.6:1.2}"/>`;
  for (const [x,y] of [[300,335],[530,390],[276,620],[508,652],[423,310]]) screws += `<g transform="translate(${x} ${y})"><circle r="8" fill="url(#steel)" stroke="#08090a"/><path d="M-4 -2L4 2" stroke="#262a2e" stroke-width="2"/></g>`;
  for(let i=0;i<12;i++) brushing += `<path d="M196 ${330+i*28}H605" stroke="#e5ddc1" opacity=".035" stroke-width="9"/>`;
  for(let i=0;i<29;i++) {stitches += `<path d="M304 ${i*36}v15M496 ${i*36}v15" stroke="#a09583" stroke-width="1" opacity=".5"/>`;mesh += `<path d="M295 ${i*36}l210 18m-210 0l210 18" stroke="#d4d5d4" opacity=".4" stroke-width="2"/>`;}
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><title>Zevraqelle N.01 — an original mechanical watch</title><defs>
<linearGradient id="metal" x1="0" y1="0" x2="1" y2=".85"><stop stop-color="#ede5cd"/><stop offset=".18" stop-color="${c}"/><stop offset=".33" stop-color="#51483c"/><stop offset=".49" stop-color="${c}"/><stop offset=".69" stop-color="#f1e5c9"/><stop offset=".83" stop-color="${c}"/><stop offset="1" stop-color="#51483b"/></linearGradient>
<linearGradient id="steel"><stop stop-color="#45494c"/><stop offset=".27" stop-color="#d1d3d0"/><stop offset=".55" stop-color="#666b70"/><stop offset=".8" stop-color="#d5d4ca"/><stop offset="1" stop-color="#54595b"/></linearGradient>
<radialGradient id="dial"><stop stop-color="${d}"/><stop offset=".8" stop-color="${d}"/><stop offset="1" stop-color="${light?'#a69a7c':'#050607'}"/></radialGradient>
<linearGradient id="strap"><stop stop-color="#09090b"/><stop offset=".16" stop-color="${s}"/><stop offset=".53" stop-color="${s}"/><stop offset="1" stop-color="#101013"/></linearGradient>
<radialGradient id="glass" cx=".2" cy=".1" r=".95"><stop stop-color="#f3ecd8" stop-opacity=".13"/><stop offset=".6" stop-color="#dae1e8" stop-opacity="0"/><stop offset="1" stop-color="#e4dbc4" stop-opacity=".05"/></radialGradient>
<clipPath id="face"><circle cx="400" cy="500" r="246"/></clipPath><clipPath id="band"><path d="M300 0H500L520 500L500 1000H300L280 500Z"/></clipPath></defs>
<path d="M300 0H500L520 500L500 1000H300L280 500Z" fill="url(#strap)" stroke="#49413a"/>
<g clip-path="url(#band)">${config.strap==='mesh'?mesh:stitches}</g>
<path d="M250 270L275 192Q284 180 304 183L322 240M478 240L496 183Q516 180 525 192L550 270M250 730L275 808Q284 820 304 817L322 760M478 760L496 817Q516 820 525 808L550 730" fill="url(#metal)" stroke="#dbc8a2" stroke-width="1"/>
<rect x="679" y="474" width="38" height="53" rx="8" fill="url(#metal)" stroke="#514632"/><path d="M686 479v43m5-43v43m5-43v43m5-43v43m5-43v43" stroke="#62503a" stroke-width="2"/>
<circle cx="400" cy="505" r="285" fill="#060708" stroke="#282829" stroke-width="3"/><circle cx="400" cy="500" r="282" fill="url(#metal)" stroke="#74654e" stroke-width="1"/>
<circle cx="400" cy="500" r="270" fill="none" stroke="#0c0d0e" stroke-width="3"/><circle cx="400" cy="500" r="263" fill="url(#metal)" stroke="#e4d4b3" stroke-width="1"/><circle cx="400" cy="500" r="251" fill="#0a0c0e"/>
<g clip-path="url(#face)"><circle cx="400" cy="500" r="246" fill="#171b1e"/>
<g opacity=".35">${brushing}</g>
<path d="M180 368Q265 275 379 300L417 351L372 408L289 412L249 506L180 521ZM453 278L597 344L633 470L572 493L528 415L464 395L426 329ZM211 573L298 555L343 616L450 651L528 605L612 637L554 725L346 745L226 672Z" fill="url(#steel)" stroke="#9a9a90" stroke-width="1.2"/>
${gear(342,399,94,38,reveal*24)}${gear(484,456,73,34,-reveal*35)}${gear(351,551,61,28,reveal*50)}${gear(470,623,85,36,-reveal*20)}
<g transform="translate(264 562)"><circle r="53" fill="none" stroke="url(#metal)" stroke-width="10"/><circle r="39" fill="none" stroke="#b99a68" stroke-width="2"/><path d="M0 0C-40-45 58-48 36 11S-41 52-35-3S36-35 24 14S-20 34-20 0S20-20 12 10" fill="none" stroke="#c2a975" stroke-width="1.5"/><path d="M-47 10L47-10" stroke="url(#steel)" stroke-width="10"/><circle r="9" fill="#a24a57"/></g>
${screws}<circle cx="400" cy="500" r="247" fill="url(#dial)" opacity="${opacity}"/>
<path d="M211 340A243 243 0 0 1 610 381" fill="none" stroke="${ink}" opacity=".14"/>
</g><circle cx="400" cy="500" r="247" fill="none" stroke="#8d7c5f" stroke-width=".8"/>
${ticks}<g fill="${ink}" text-anchor="middle" font-family="serif" font-size="29" letter-spacing="3"><text x="400" y="312">XII</text><text x="610" y="510">III</text><text x="400" y="714">VI</text><text x="196" y="510">IX</text></g>
<g text-anchor="middle" fill="${ink}" font-family="sans-serif" letter-spacing="5"><text x="400" y="359" font-size="16">ZEVRAQELLE</text><text x="400" y="643" font-size="10" letter-spacing="3">CALIBRE N.01</text></g>
<g transform="rotate(${hour} 400 500)"><path d="M392 526L392 411L400 367L408 411L408 526Z" fill="${hand}" stroke="#6d5f49" stroke-width="2"/><path d="M400 380V504" stroke="#93826a" stroke-width="1"/></g>
<g transform="rotate(${minute} 400 500)"><path d="M395 535L395 328L400 297L405 328L405 535Z" fill="${hand}" stroke="#6d5f49" stroke-width="1.5"/></g>
<g transform="rotate(${second} 400 500)"><path d="M400 546V282" stroke="${c}" stroke-width="2"/><circle cx="400" cy="542" r="7" fill="none" stroke="${c}" stroke-width="2"/></g><circle cx="400" cy="500" r="10" fill="url(#metal)" stroke="#252321"/>
<circle cx="400" cy="500" r="249" fill="url(#glass)"/><path d="M193 366A248 248 0 0 1 519 282" fill="none" stroke="#f1ead4" stroke-opacity=".24" stroke-width="3"/>
</svg>`;
}
