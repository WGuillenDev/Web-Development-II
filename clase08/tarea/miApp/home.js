import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoutes);

app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(app.get('port'), () => {
  console.log(`Servidor activo en http://localhost:${app.get('port')}`);
});
