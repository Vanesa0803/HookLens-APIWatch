const { DatabaseSync } = require("node:sqlite");
const path = require("path");

// Create or open the database file
const dbPath = path.join(__dirname, "hooklens.db");
const db = new DatabaseSync(dbPath);

// Create tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS webhooks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        webhook_id TEXT NOT NULL,
        method TEXT NOT NULL,
        headers TEXT,
        body TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (webhook_id) REFERENCES webhooks(id)
    );
`);

module.exports = db;