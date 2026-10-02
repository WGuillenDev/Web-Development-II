/**
 * Enrutamiento en Express.
 *
 * Una ruta asocia una petición HTTP con la función que la atiende:
 *   app.METHOD(PATH, HANDLER)
 *   - METHOD:  verbo HTTP (get, post, put, patch, delete).
 *   - PATH:    URL relativa al servidor ('/', '/about').
 *   - HANDLER: función (req, res) que construye la respuesta.
 *
 * Express evalúa las rutas en el orden en que se declaran y ejecuta la primera que coincide.
 *
 * Ejecutar: npm run enrutamiento
 */
import express, { type Request, type Response, type Application } from 'express';

// Application, Request y Response son los tipos que TypeScript provee para Express.
const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response): void => {
  res.send('Hola mundo');
});

app.get('/about', (req: Request, res: Response): void => {
  res.send('Acerca de ');
});

app.get('/contacto', (req: Request, res: Response): void => {
  res.send('Para contactarnos');
});

// app.use sin PATH coincide con cualquier petición. Por eso se declara al final:
// solo se ejecuta cuando ninguna ruta anterior respondió, y devuelve 404 (Not Found).
app.use((req: Request, res: Response): void => {
  res.status(404).send('No se encontró tu ruta');
});

// Inicia el servidor y lo deja escuchando peticiones en el puerto indicado.
app.listen(port, (): void => {
  console.log(`La aplicación está en línea en el puerto ${port}`);
});
