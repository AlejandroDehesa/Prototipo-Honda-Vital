import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { agentLoop } from './agent.js';

const DEFAULT_PORT = Number(process.env.WEB_PORT || process.env.PORT || 3001);
const STATIC_DIR = resolve(process.cwd(), process.env.WEB_STATIC_DIR || 'web-widget');
const CORS_ORIGIN = process.env.WEB_CORS_ORIGIN || '*';

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

function setCorsHeaders(res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function normalizeSessionId(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, 120);
}

function normalizeMessage(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, 4000);
}

async function readJsonBody(req: IncomingMessage): Promise<any> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf-8');
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('JSON inválido en el body');
  }
}

async function handleChat(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await readJsonBody(req);
    const sessionId = normalizeSessionId(body.sessionId);
    const message = normalizeMessage(body.message);

    if (!sessionId || !message) {
      sendJson(res, 400, {
        error: 'sessionId y message son obligatorios'
      });
      return;
    }

    const reply = await agentLoop(`web:${sessionId}`, message);
    sendJson(res, 200, { reply });
  } catch (error: any) {
    console.error('[WEB] Error en /api/agent/chat:', error);
    sendJson(res, 500, {
      error: error?.message || 'Error procesando el mensaje'
    });
  }
}

async function serveStaticAsset(pathname: string, res: ServerResponse) {
  const cleanPath = pathname.replace(/^\/widget\/?/, '').replace(/^\/+/, '');
  const requestedPath = cleanPath || 'index.html';
  const absolutePath = join(STATIC_DIR, requestedPath);

  if (!absolutePath.startsWith(STATIC_DIR) || !existsSync(absolutePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const file = await readFile(absolutePath);
  const extension = extname(absolutePath).toLowerCase();
  const contentType = CONTENT_TYPES[extension] || 'application/octet-stream';
  setCorsHeaders(res);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(file);
}

export function startWebServer() {
  const server = createServer(async (req, res) => {
    const method = req.method || 'GET';
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    if (method === 'OPTIONS') {
      setCorsHeaders(res);
      res.writeHead(204);
      res.end();
      return;
    }

    if (method === 'GET' && pathname === '/health') {
      sendJson(res, 200, { ok: true, service: 'OpenGravity Web Adapter' });
      return;
    }

    if (method === 'POST' && pathname === '/api/agent/chat') {
      await handleChat(req, res);
      return;
    }

    if (method === 'GET' && (pathname === '/widget' || pathname.startsWith('/widget/'))) {
      await serveStaticAsset(pathname, res);
      return;
    }

    sendJson(res, 404, { error: 'Ruta no encontrada' });
  });

  server.listen(DEFAULT_PORT, () => {
    console.log(`[WEB] OpenGravity Web Adapter escuchando en http://localhost:${DEFAULT_PORT}`);
    console.log(`[WEB] Health: http://localhost:${DEFAULT_PORT}/health`);
    console.log(`[WEB] Widget preview: http://localhost:${DEFAULT_PORT}/widget`);
  });

  return server;
}
