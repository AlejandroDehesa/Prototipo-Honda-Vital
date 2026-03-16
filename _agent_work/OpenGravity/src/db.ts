import Database from 'better-sqlite3';

const dbPath = process.env.DB_PATH || './memory.db';
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

/**
 * Gets the latest message history for a given user.
 */
export function getMessages(userId: string, limit: number = 20) {
  const stmt = db.prepare('SELECT role, content FROM messages WHERE user_id = ? ORDER BY id DESC LIMIT ?');
  const messages = stmt.all(userId, limit) as {role: string, content: string}[];
  // Reverse to get chronological order (oldest to newest)
  return messages.reverse();
}

/**
 * Saves a single message to the persistent store.
 */
export function saveMessage(userId: string, role: string, content: string) {
  const stmt = db.prepare('INSERT INTO messages (user_id, role, content) VALUES (?, ?, ?)');
  stmt.run(userId, role, content);
}
