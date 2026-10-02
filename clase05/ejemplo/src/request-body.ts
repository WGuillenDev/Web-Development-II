/**
 * Request Body: datos que el cliente envía dentro de la petición, no en la URL.
 *
 * Se usa en POST, PUT y PATCH para enviar información estructurada o sensible
 * (formularios, contraseñas, objetos JSON) que no debe quedar visible en la URL.
 *
 * Express no interpreta el body por defecto: hay que registrar un middleware
 * por cada formato. El cliente indica el formato con la cabecera Content-Type.
 *
 * Ejecutar: npm run body
 * Probar con Thunder Client: POST http://localhost:3000/user, pestaña Body.
 */
import express, { type Request, type Response, type Application } from 'express';

const app: Application = express();
const port: number = 3000;

// Sin estos middlewares, req.body llega como undefined.
app.use(express.text()); // Content-Type: text/plain → req.body es un string.
app.use(express.json()); // Content-Type: application/json → req.body es un objeto.
// Content-Type: application/x-www-form-urlencoded (formularios HTML) → objeto.
// Todos los valores llegan como string. extended: false usa el parser simple de Node.
app.use(express.urlencoded({ extended: false }));

app.post('/user', (req: Request, res: Response): void => {
  // Muestra en la terminal del servidor los datos recibidos.
  console.log(req.body);
  res.send('Nuevo usuario creado');
});

app.listen(port, (): void => {
  console.log(`La aplicación está en línea en el puerto ${port}`);
});
