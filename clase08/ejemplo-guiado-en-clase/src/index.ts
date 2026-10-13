import express, { type Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import homeRoutes from './routes/home.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const PORT = 3000;

// Configuración de plantillas (EJS)
app.set('views', path.join(__dirname, '../views')); // Apunta a la carpeta views
app.set('view engine', 'ejs');

// Corrección: header.ejs enlaza /public/index.css, pero la guía no sirve archivos estáticos
app.use('/public', express.static(path.join(__dirname, '../public')));

// Registrar rutas
app.use(homeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
