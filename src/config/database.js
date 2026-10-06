const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS estudiantes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            ci TEXT NOT NULL UNIQUE,
            edad INTEGER,
            carrera TEXT,
            semestre TEXT,
            correo TEXT,
            ciudad TEXT,
            domicilio TEXT,
            matricula TEXT,
            correo_institucional TEXT
        )`);
    }
});

module.exports = db;
