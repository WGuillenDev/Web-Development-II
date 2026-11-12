import express from "express";
import cors from "cors";
import db from "./db";

// Tipo que describe una tarea
interface Tarea {
  id: number;
  titulo: string;
  completada: number;
}

const app = express();
app.use(cors());          // Permite peticiones desde React (otro puerto)
app.use(express.json());  // Interpreta el JSON del cuerpo de la petición

// Lista todas las tareas
app.get("/api/tareas", (_req, res) => {
  const tareas = db.prepare("SELECT * FROM tareas").all() as Tarea[];
  res.json(tareas);
});

// Crea una tarea
app.post("/api/tareas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ error: "Título requerido" });
  const r = db.prepare("INSERT INTO tareas (titulo) VALUES (?)").run(titulo);
  res.status(201).json({ id: r.lastInsertRowid, titulo, completada: 0 });
});

// Marca o desmarca una tarea como completada
app.put("/api/tareas/:id", (req, res) => {
  db.prepare("UPDATE tareas SET completada = 1 - completada WHERE id = ?")
    .run(req.params.id);
  res.json({ ok: true });
});

// Elimina una tarea
app.delete("/api/tareas/:id", (req, res) => {
  db.prepare("DELETE FROM tareas WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

app.listen(3001, () => console.log("Servidor en http://localhost:3001"));
