import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const PORT = Number(process.env.PORT || 4173);
const DIST_DIR = resolve(process.cwd(), 'dist');

const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

function sendFile(res, filePath) {
  const extension = extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[extension] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  createReadStream(filePath).pipe(res);
}

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

async function resolveFile(pathname) {
  const cleanedPath = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\\/])+/, '');
  const requestedPath = cleanedPath === '/' ? '/index.html' : cleanedPath;
  const absolutePath = join(DIST_DIR, requestedPath);

  if (!absolutePath.startsWith(DIST_DIR)) {
    return null;
  }

  try {
    const fileStats = await stat(absolutePath);
    if (fileStats.isFile()) {
      return absolutePath;
    }
  } catch {}

  return null;
}

if (!existsSync(DIST_DIR)) {
  console.error('Missing dist directory. Run the build before starting the server.');
  process.exit(1);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const { pathname } = url;

  if (pathname === '/health') {
    sendJson(res, 200, { ok: true, service: 'frontend' });
    return;
  }

  const filePath = await resolveFile(pathname);
  if (filePath) {
    sendFile(res, filePath);
    return;
  }

  sendFile(res, join(DIST_DIR, 'index.html'));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${PORT}`);
});
