import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { defaultRooms, defaultSections } from '../admin_panel/defaultContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = Number(process.env.ADMIN_PANEL_SIMPLE_PORT || 5052);
const DB_PATH = process.env.DB_PATH || join(__dirname, '../../database.sqlite');
const ADMIN_USER = process.env.ADMIN_PANEL_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PANEL_PASSWORD || 'admin1234';
const SESSION_TTL_MS = Number(process.env.ADMIN_PANEL_SESSION_HOURS || 8) * 60 * 60 * 1000;
const sessions = new Map();

const db = new sqlite3.Database(DB_PATH, (error) => {
  if (error) {
    console.error('Error opening simple admin database:', error.message);
  } else {
    console.log(`Simple admin connected to SQLite database at ${DB_PATH}`);
  }
});

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeDefaults(baseValue, incomingValue) {
  if (Array.isArray(baseValue)) {
    return Array.isArray(incomingValue) ? incomingValue : clone(baseValue);
  }

  if (baseValue && typeof baseValue === 'object') {
    const nextValue = incomingValue && typeof incomingValue === 'object' ? incomingValue : {};
    const merged = {};
    const keys = new Set([...Object.keys(baseValue), ...Object.keys(nextValue)]);

    keys.forEach((key) => {
      if (!(key in baseValue)) {
        merged[key] = nextValue[key];
        return;
      }

      merged[key] = mergeDefaults(baseValue[key], nextValue[key]);
    });

    return merged;
  }

  if (incomingValue === undefined || incomingValue === null) {
    return baseValue;
  }

  return incomingValue;
}

function normalizeText(value, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function normalizeStringList(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => normalizeText(item)).filter(Boolean);
}

function normalizePairList(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => ({
      label: normalizeText(item?.label, `Elemento ${index + 1}`),
      value: normalizeText(item?.value)
    }))
    .filter((item) => item.label || item.value);
}

function slugify(value) {
  return normalizeText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalizeRoomPayload(payload, currentId) {
  const desiredId = slugify(payload?.id || payload?.name || currentId || `sala-${Date.now()}`);
  const images = normalizeStringList(payload?.images);
  const coverImage = normalizeText(payload?.coverImage, images[0] || '');

  return {
    id: desiredId || currentId || `sala-${Date.now()}`,
    name: normalizeText(payload?.name, 'Nueva sala'),
    shortName: normalizeText(payload?.shortName),
    specs: normalizeText(payload?.specs),
    size: normalizeText(payload?.size),
    capacity: normalizeText(payload?.capacity),
    availability: normalizeText(payload?.availability),
    description: normalizeText(payload?.description),
    longDescription: normalizeText(payload?.longDescription),
    features: normalizeStringList(payload?.features),
    pricing: {
      punctual: normalizePairList(payload?.pricing?.punctual),
      prepaid: normalizePairList(payload?.pricing?.prepaid),
      regular: normalizePairList(payload?.pricing?.regular)
    },
    heroImageIndex: Number.isFinite(Number(payload?.heroImageIndex))
      ? Math.max(0, Number(payload.heroImageIndex))
      : 0,
    coverImage,
    images,
    sortOrder: Number.isFinite(Number(payload?.sortOrder)) ? Number(payload.sortOrder) : 999
  };
}

async function initializeDatabase() {
  await run(`CREATE TABLE IF NOT EXISTS admin_sections (
    key TEXT PRIMARY KEY,
    content_json TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS admin_rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    content_json TEXT NOT NULL,
    sort_order INTEGER DEFAULT 999,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    room_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_phone TEXT,
    booking_date TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  for (const [key, value] of Object.entries(defaultSections)) {
    await run(`INSERT OR IGNORE INTO admin_sections (key, content_json) VALUES (?, ?)`, [
      key,
      JSON.stringify(value)
    ]);
  }

  const row = await get(`SELECT COUNT(*) AS count FROM admin_rooms`);
  if (Number(row?.count || 0) === 0) {
    for (const room of defaultRooms) {
      const normalizedRoom = normalizeRoomPayload(room, room.id);
      await run(
        `INSERT INTO admin_rooms (id, name, content_json, sort_order) VALUES (?, ?, ?, ?)`,
        [
          normalizedRoom.id,
          normalizedRoom.name,
          JSON.stringify(normalizedRoom),
          normalizedRoom.sortOrder
        ]
      );
    }
  }
}

async function getSections() {
  const rows = await all(`SELECT key, content_json FROM admin_sections ORDER BY key`);
  return rows.reduce((accumulator, row) => {
    accumulator[row.key] = JSON.parse(row.content_json);
    return accumulator;
  }, {});
}

async function getRooms() {
  const rows = await all(
    `SELECT id, name, content_json, sort_order, updated_at
     FROM admin_rooms
     ORDER BY sort_order ASC, updated_at DESC`
  );

  return rows.map((row) => ({
    ...JSON.parse(row.content_json),
    id: row.id,
    name: row.name,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at
  }));
}

async function getBookings() {
  const rooms = await getRooms();
  const roomMap = new Map(rooms.map((room) => [room.id, room.name]));
  const rows = await all(
    `SELECT id, room_id, user_name, user_email, user_phone, booking_date, status, created_at
     FROM bookings
     ORDER BY datetime(created_at) DESC, booking_date DESC`
  );

  return rows.map((row) => ({
    ...row,
    room_name: roomMap.get(row.room_id) || row.room_id
  }));
}

function createSession(username) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, { username, expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    res.status(401).json({ status: 'error', message: 'Sesion no valida.' });
    return;
  }

  const token = header.slice(7);
  const session = sessions.get(token);

  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    res.status(401).json({ status: 'error', message: 'La sesion ha caducado.' });
    return;
  }

  session.expiresAt = Date.now() + SESSION_TTL_MS;
  req.authToken = token;
  req.user = { username: session.username };
  next();
}

setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt < now) {
      sessions.delete(token);
    }
  }
}, 15 * 60 * 1000).unref();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Simple admin panel API running',
    timestamp: new Date().toISOString(),
    usingDefaultCredentials: ADMIN_USER === 'admin' && ADMIN_PASSWORD === 'admin1234'
  });
});

app.post('/api/auth/login', (req, res) => {
  const username = normalizeText(req.body?.username);
  const password = normalizeText(req.body?.password);

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    res.status(401).json({ status: 'error', message: 'Usuario o contrasena incorrectos.' });
    return;
  }

  const token = createSession(username);
  res.json({ status: 'success', data: { token, user: { username } } });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ status: 'success', data: { user: req.user } });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  sessions.delete(req.authToken);
  res.json({ status: 'success', message: 'Sesion cerrada.' });
});

app.get('/api/public/content-bundle', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        sections: await getSections(),
        rooms: await getRooms(),
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/admin/dashboard', requireAuth, async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        sections: await getSections(),
        rooms: await getRooms(),
        bookings: await getBookings()
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.put('/api/admin/sections/:key', requireAuth, async (req, res) => {
  try {
    const { key } = req.params;
    if (!(key in defaultSections)) {
      res.status(404).json({ status: 'error', message: 'Seccion no encontrada.' });
      return;
    }

    const merged = mergeDefaults(defaultSections[key], req.body || {});
    await run(
      `INSERT INTO admin_sections (key, content_json, updated_at)
       VALUES (?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(key) DO UPDATE SET
         content_json = excluded.content_json,
         updated_at = CURRENT_TIMESTAMP`,
      [key, JSON.stringify(merged)]
    );

    res.json({ status: 'success', message: 'Seccion guardada correctamente.', data: merged });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/admin/rooms', requireAuth, async (req, res) => {
  try {
    res.json({ status: 'success', data: await getRooms() });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/api/admin/rooms', requireAuth, async (req, res) => {
  try {
    const room = normalizeRoomPayload(req.body);
    const existing = await get(`SELECT id FROM admin_rooms WHERE id = ?`, [room.id]);

    if (existing) {
      res.status(409).json({ status: 'error', message: 'Ya existe una sala con ese identificador.' });
      return;
    }

    await run(
      `INSERT INTO admin_rooms (id, name, content_json, sort_order, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [room.id, room.name, JSON.stringify(room), room.sortOrder]
    );

    res.status(201).json({ status: 'success', message: 'Sala creada correctamente.', data: room });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.put('/api/admin/rooms/:id', requireAuth, async (req, res) => {
  try {
    const currentId = req.params.id;
    const existing = await get(`SELECT id FROM admin_rooms WHERE id = ?`, [currentId]);

    if (!existing) {
      res.status(404).json({ status: 'error', message: 'Sala no encontrada.' });
      return;
    }

    const room = normalizeRoomPayload(req.body, currentId);

    if (room.id !== currentId) {
      const duplicate = await get(`SELECT id FROM admin_rooms WHERE id = ?`, [room.id]);
      if (duplicate) {
        res.status(409).json({
          status: 'error',
          message: 'Ya existe otra sala con el identificador indicado.'
        });
        return;
      }
    }

    await run(
      `UPDATE admin_rooms
       SET id = ?, name = ?, content_json = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [room.id, room.name, JSON.stringify(room), room.sortOrder, currentId]
    );

    res.json({ status: 'success', message: 'Sala actualizada correctamente.', data: room });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.delete('/api/admin/rooms/:id', requireAuth, async (req, res) => {
  try {
    const result = await run(`DELETE FROM admin_rooms WHERE id = ?`, [req.params.id]);
    if (result.changes === 0) {
      res.status(404).json({ status: 'error', message: 'Sala no encontrada.' });
      return;
    }

    res.json({ status: 'success', message: 'Sala eliminada.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.patch('/api/admin/bookings/:id/status', requireAuth, async (req, res) => {
  try {
    const nextStatus = normalizeText(req.body?.status);
    if (!['pending', 'approved', 'rejected'].includes(nextStatus)) {
      res.status(400).json({ status: 'error', message: 'Estado no valido.' });
      return;
    }

    const result = await run(`UPDATE bookings SET status = ? WHERE id = ?`, [
      nextStatus,
      req.params.id
    ]);

    if (result.changes === 0) {
      res.status(404).json({ status: 'error', message: 'Reserva no encontrada.' });
      return;
    }

    res.json({ status: 'success', message: `Reserva actualizada a ${nextStatus}.` });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const publicDir = join(__dirname, 'public');
app.use(express.static(publicDir));
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    next();
    return;
  }

  res.sendFile(join(publicDir, 'index.html'));
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Simple admin panel running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize simple admin panel:', error);
    process.exit(1);
  });
