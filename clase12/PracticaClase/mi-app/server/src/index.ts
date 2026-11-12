import express from "express";
import cors from "cors";
import db from "./db";

// Tipo que describe un producto
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

const app = express();
app.use(cors());          // Permite peticiones desde React (otro puerto)
app.use(express.json());  // Interpreta el JSON del cuerpo de la petición

// Lista todos los productos
app.get("/api/productos", (_req, res) => {
  const productos = db.prepare("SELECT * FROM productos").all() as Producto[];
  res.json(productos);
});

// Crea un producto
app.post("/api/productos", (req, res) => {
  const { nombre, precio, stock } = req.body;
  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: "Nombre, precio y stock requeridos" });
  }
  const r = db.prepare("INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)")
    .run(nombre, precio, stock);
  res.status(201).json({ id: r.lastInsertRowid, nombre, precio, stock });
});

// Actualiza el stock de un producto
app.put("/api/productos/:id", (req, res) => {
  const { stock } = req.body;
  if (stock === undefined || stock < 0) {
    return res.status(400).json({ error: "Stock inválido" });
  }
  db.prepare("UPDATE productos SET stock = ? WHERE id = ?")
    .run(stock, req.params.id);
  res.json({ ok: true });
});

// Elimina un producto
app.delete("/api/productos/:id", (req, res) => {
  db.prepare("DELETE FROM productos WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

app.listen(3001, () => console.log("Servidor en http://localhost:3001"));
