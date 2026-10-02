/**
 * Métodos de petición HTTP (verbos).
 *
 * Una ruta se identifica por la combinación MÉTODO + URL. Por eso la misma URL
 * '/products' puede tener un comportamiento distinto según el verbo (CRUD):
 *
 *   GET    → Read:   obtener datos. No modifica el servidor.
 *   POST   → Create: crear un recurso nuevo.
 *   PUT    → Update: reemplazar el recurso completo.
 *   PATCH  → Update: modificar solo algunos campos del recurso.
 *   DELETE → Delete: eliminar el recurso.
 *
 * El navegador solo realiza peticiones GET desde la barra de direcciones;
 * para probar los demás métodos se usa un cliente HTTP como Thunder Client.
 *
 * Ejecutar: npm run metodos
 */
import express, { type Request, type Response, type Application } from 'express';

const app: Application = express();
const port: number = 3000;

app.get('/products', (req: Request, res: Response): void => {
  res.send('Lista de Productos');
});

app.post('/products', (req: Request, res: Response): void => {
  res.send('Creando Productos');
});

app.put('/products', (req: Request, res: Response): void => {
  res.send('Actualizando Productos');
});

app.delete('/products', (req: Request, res: Response): void => {
  res.send('Borrando Productos');
});

app.patch('/products', (req: Request, res: Response): void => {
  res.send('Actualizando una parte de Productos');
});

app.listen(port, (): void => {
  console.log(`La aplicación está en línea en el puerto ${port}`);
});
