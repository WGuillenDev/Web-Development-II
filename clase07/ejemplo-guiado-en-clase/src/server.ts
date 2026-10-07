import express, { type Express, type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
// Importar los módulos de rutas con extensión .js
import homeRoutes from "./routes/home.js";
import userRoutes from "./routes/usuario.js";
// 1. Obtener la ruta equivalente a __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app: Express = express();
const PORT = 3000;
// Middleware para procesar JSON (necesario para leer req.body en POST /profile)
app.use(express.json());
// 2. Servir los archivos estáticos usando el __dirname recién creado
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));
app.get("/api/hola", (req: Request, res: Response) => {
  res.json({ mensaje: "¡Hola desde la API!" });
});
// Registrar los routers importados
app.use(homeRoutes);
app.use(userRoutes);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
