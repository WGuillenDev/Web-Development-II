/**
 * Middleware: función que se ejecuta entre la llegada de la petición (Request)
 * y el envío de la respuesta (Response). Actúa como filtro, procesador o capa
 * de seguridad.
 *
 * Firma: (req, res, next)
 *   - req:  información de la petición.
 *   - res:  objeto para construir la respuesta.
 *   - next: función que pasa el control al siguiente middleware o ruta.
 *           El tercer parámetro es lo que distingue a un middleware de una ruta.
 *
 * Un middleware debe terminar de una de dos formas:
 *   - Llamar a next() para continuar (con next(error) se reporta un fallo).
 *   - Enviar una respuesta con res, lo que corta el flujo.
 * Si no hace ninguna de las dos, la petición queda colgada.
 *
 * Ejecutar: npm run middleware1
 */
import express, {
  type Request,
  type Response,
  type NextFunction,
  type Application
} from 'express';

const app: Application = express();
const port: number = 3000;

// Middleware global (logger): al declararse con app.use antes de las rutas,
// se ejecuta en todas las peticiones, sin importar la URL.
app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log('Paso por una función Middleware');
  next();
});

app.get('/profile', (req: Request, res: Response): void => {
  res.send('Pagina de perfil');
});

app.get('/about', (req: Request, res: Response): void => {
  res.send('Pagina acerca de');
});

app.listen(port, (): void => {
  console.log(`La aplicación está en línea en el puerto ${port}`);
});
