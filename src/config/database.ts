import sqlite3 from 'sqlite3';
import path from 'path';

const sqlite = sqlite3.verbose();

const getDatabasePath = (): string => {
  if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_DB_PATH || ':memory:';
  }
  return process.env.DB_PATH || path.resolve(__dirname, '../../database.sqlite');
};

export const createDatabaseConnection = (dbPath: string = getDatabasePath()): sqlite3.Database => {
  const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
      console.error(`[DB Error] No se pudo conectar a SQLite en ${dbPath}:`, err.message);
    }
  });

  // Inicializar esquema
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      ci TEXT NOT NULL UNIQUE,
      edad INTEGER NOT NULL,
      carrera TEXT NOT NULL,
      semestre TEXT NOT NULL,
      correo TEXT NOT NULL,
      ciudad TEXT,
      domicilio TEXT,
      matricula TEXT NOT NULL,
      correo_institucional TEXT NOT NULL,
      turno TEXT,
      fecha_induccion TEXT,
      codigo_verificacion TEXT,
      fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Migraciones seguras para columnas adicionales si la tabla ya existía
    const columnasExtra = [
      'ALTER TABLE estudiantes ADD COLUMN turno TEXT',
      'ALTER TABLE estudiantes ADD COLUMN fecha_induccion TEXT',
      'ALTER TABLE estudiantes ADD COLUMN codigo_verificacion TEXT',
      'ALTER TABLE estudiantes ADD COLUMN fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP'
    ];

    columnasExtra.forEach((alterSql) => {
      db.run(alterSql, () => {
        // Ignorar si la columna ya existe
      });
    });
  });

  return db;
};

export const db = createDatabaseConnection();
export default db;
