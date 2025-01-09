import Database from 'better-sqlite3';

const db = new Database('database.db', { verbose: console.log }); // Optional: Log queries for debugging

const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      number INTEGER
    )
  `;
  db.prepare(sql).run();
  console.log('Table created or already exists.');
};

createTable();
