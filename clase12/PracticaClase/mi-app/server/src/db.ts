import Database from "better-sqlite3";
// Abre (o crea) el archivo de la base de datos
export const db: Database.Database = new Database("inventario.db");

// Crea la tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
  )
`);
export default db;
