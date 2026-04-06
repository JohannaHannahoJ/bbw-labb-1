/**
 * Installationsfil för SQLite
 */

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/courses.db");

// skapa tabell
db.run(`
    CREATE TABLE IF NOT EXISTS courses (
        course_id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
        name TEXT,
        syllabus TEXT,
        progression TEXT,
        course_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    )
`);

module.exports = db;