import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DB_PATH || join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Rooms table
    db.run(`CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      specs TEXT NOT NULL,
      description TEXT,
      capacity TEXT,
      price_info TEXT,
      image_urls TEXT
    )`);

    // Bookings table
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      room_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      user_email TEXT NOT NULL,
      user_phone TEXT,
      booking_date TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES rooms (id)
    )`);

    // Seed rooms if empty
    db.get("SELECT count(*) as count FROM rooms", (err, row) => {
      if (row.count === 0) {
        const rooms = [
          {
            id: 'sala-jardin',
            name: 'Sala Jardín',
            specs: '8.5 x 4.5 m (G1), 32 m2',
            description: 'Sala con vistas/acceso a nuestro jardín-oasis. Incluye Proyector/Sonido, Sillas/Esterillas, Internet, Aire Acondicionado.',
            capacity: '10 pers. con esterillas, 25 sentados'
          },
          {
            id: 'sala-azul',
            name: 'Sala Azul',
            specs: '6.5 x 5 m (G2)',
            description: 'Sala luminosa con camillas y vistas al jardín. Incluye Moqueta, Proyector/Sonido, Internet, Aire Acondicionado.',
            capacity: 'Hasta 10 camillas o 30 personas sentadas'
          },
          {
            id: 'despacho-plus',
            name: 'Despacho +',
            specs: '4 x 3.2 m',
            description: 'Despacho luminoso con vistas al jardín. Incluye Mesa con sillas, Hasta 2 camillas para terapias, Internet, Aire Acondicionado.',
            capacity: 'Hasta 8 sillas para charlas'
          },
          {
            id: 'sala-terapia-a',
            name: 'Sala Terapia A',
            specs: '3 x 2.5 m',
            description: 'Sala para consultas y terapias individuales. Incluye Mesa escritorio, Camilla, Lavabo, Internet.',
            capacity: 'Individual'
          },
          {
            id: 'sala-terapia-b',
            name: 'Sala Terapia B',
            specs: '3 x 2.5 m',
            description: 'Sala para consultas y terapias individuales. Incluye Mesa escritorio o Camilla, Internet.',
            capacity: 'Individual'
          }
        ];

        const stmt = db.prepare("INSERT INTO rooms (id, name, specs, description, capacity) VALUES (?, ?, ?, ?, ?)");
        rooms.forEach(room => {
          stmt.run(room.id, room.name, room.specs, room.description, room.capacity);
        });
        stmt.finalize();
        console.log('Seeded initial rooms data.');
      }
    });
  });
}

export default db;
