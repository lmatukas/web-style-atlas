import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { localFile } from './lib/files.mjs';

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf', '.ico': 'image/x-icon' };
export async function servePreviews(root, styleIds) {
  const allowed = path => path.startsWith('core/') || path.startsWith('assets/') || styleIds.some(id => path.startsWith(`styles/${id}/`));
  const server = createServer((req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
      const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).slice(1);
      if (!allowed(path) || ((path.startsWith('core/') || path.startsWith('assets/')) && (path.endsWith('.md') || path.startsWith('core/skill/')))) { res.writeHead(403).end('Forbidden'); return; }
      const body = readFileSync(localFile(root, path));
      res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(404).end('Local resource missing or unsafe'); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  return { origin: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve, reject) => { server.closeAllConnections(); server.close(error => error ? reject(error) : resolve()); }) };
}
