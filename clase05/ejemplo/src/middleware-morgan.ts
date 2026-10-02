/**
 * Middleware de terceros: Morgan.
 *
 * Morgan es un logger de peticiones HTTP publicado en npm. Imprime en la terminal
 * el método, la URL, el código de estado y el tiempo de respuesta de cada petición.
 *
 * Instalación:
 *   npm i morgan                 → dependencia de ejecución.
 *   npm i -D @types/morgan       → tipos para TypeScript (solo en desarrollo).
 *
 * Formato 'dev': salida breve y coloreada según el código de estado
 * (verde 2xx, cian 3xx, amarillo 4xx, rojo 5xx).
 *
 * Ejecutar: npm run morgan
 */
import express, {
  type Request,
  type Response,
  type NextFunction,
  type Application
} from 'express';
import morgan from 'morgan';

const app: Application = express();
const port: number = 3000;

interface AuthQuery {
  login?: string;
}

// Los middlewares se ejecutan en el orden en que se registran. Morgan va primero
// para registrar todas las peticiones, incluidas las que el filtro rechaza con 401.
app.use(morgan('dev'));

// Middleware propio de autenticación (ver middleware2.ts).
app.use((req: Request<{}, {}, {}, AuthQuery>, res: Response, next: NextFunction): void => {
  if (req.query.login === 'mile@utn.ac.cr') {
    next();
  } else {
    res.status(401).send('No autorizado');
  }
});

app.get('/panel', (req: Request, res: Response): void => {
  res.send('Ingreso al panel de gestión de la información');
});

app.listen(port, (): void => {
  console.log(`La aplicación está en línea en el puerto ${port}`);
});
