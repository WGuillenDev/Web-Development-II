import 'dotenv/config';
import express, { type Application } from 'express';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import indexRouter from './routes/index.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const PORT = Number(process.env.PORT) || 3000;

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(ROOT_DIR, 'views'));

// Versión de los archivos estáticos: cambia en cada arranque y obliga al navegador a descargar CSS y JS nuevos
app.locals.assetVersion = Date.now().toString(36);

app.use(express.static(path.join(ROOT_DIR, 'public')));
app.use('/', indexRouter);

// Servidor HTTP propio para que el WebSocket pueda compartir el mismo puerto que Express
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`SkySocial disponible en http://localhost:${PORT}`);
});
