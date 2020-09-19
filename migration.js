const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Journal (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL);`
    );
});