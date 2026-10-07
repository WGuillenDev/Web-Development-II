import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import path from "path";
import { fileURLToPath } from "url";
// Compatibilidad para obtener __dirname con ES Modules / NodeNext
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app: Application = express();
const PORT = 3000;
// Middleware para procesar JSON en peticiones POST/PUT
app.use(express.json());
// 1. Configurar la carpeta 'public' como fuente de archivos estáticos
// Nota: __dirname apunta a 'dist/' cuando se compila o 'src/' al ejecutarse con tsx,
// por lo que subimos un nivel con '..' para llegar a la raíz donde está 'public'
app.use(express.static(path.join(__dirname, "../public")));
// 2. Endpoint de API de prueba para responder al HTML
app.get("/api/saludo", (req: Request, res: Response) => {
  res.json({ mensaje: "¡Hola desde la API de Express con TypeScript!" });
});
// 3. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
