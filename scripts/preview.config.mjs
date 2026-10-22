// Canonical generation host: Ubuntu 24.04 x64, Node 24.19.0, pinned headless shell.
// P08 must use this host and `npm ci; npx playwright install --with-deps --only-shell chromium`.
export const ENVIRONMENT = Object.freeze({
  node: 'v24.19.0', browser: 'chromium-headless-shell', browser_version: '151.0.7922.34',
  playwright: '1.62.1', platform: 'ubuntu-24.04-x64', device_scale_factor: 1,
  locale: 'en-US', timezone: 'UTC', color_scheme: 'light', reduced_motion: 'reduce',
  fixed_time: '2026-01-01T00:00:00.000Z', random_seed: 1,
  renderer_version: 2
});
// System font resolution on the canonical host (GitHub ubuntu-24.04 runner image).
// Font metrics change line breaks and page height, so a host that resolves these
// families to other files is not canonical. Checked with fc-match before launch.
export const CANONICAL_FONTS = Object.freeze({
  'Arial': '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
  'Courier New': '/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf',
  'Georgia': '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
  'Trebuchet MS': '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
  'DejaVu Sans': '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
  'sans-serif': '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
  'serif': '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
  'monospace': '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
});
export const VIEWPORTS = Object.freeze({ desktop: { width: 1440, height: 1000 }, mobile: { width: 390, height: 844 } });
export const TIMEOUT = 15000;
export const MAX_PNG_BYTES = 1024 * 1024;
export const MANIFEST = 'catalog/previews-manifest.json';
export const previewPath = (style, variant, viewport) => `${style.base}/preview${variant === 'b' ? '-alt' : ''}${viewport === 'mobile' ? '-mobile' : ''}.png`;
