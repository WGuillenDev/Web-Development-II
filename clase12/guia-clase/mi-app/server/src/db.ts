import Database from "better-sqlite3";
// Abre (o crea) el archivo de la base de datos
export const db: Database.Database = new Database("tareas.db");

// Crea la tabla si no existe (SQLite guarda los booleanos como 0 y 1)
db.exec(`
  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    completada INTEGER DEFAULT 0
  )
`);
export default db;
