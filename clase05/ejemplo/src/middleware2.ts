/**
 * Middleware de autenticación con Query Params.
 *
 * Los query params son pares clave=valor después del signo ? en la URL:
 *   http://localhost:3000/panel?login=mile@utn.ac.cr  →  req.query.login
 *
 * El middleware decide si la petición continúa (next) o se rechaza (401).
 *
 * Nota: es un ejemplo didáctico. Enviar credenciales en la URL no es seguro;
 * en una API real se usan tokens en la cabecera Authorization.
 *
 * Ejecutar: npm run middleware2
 */
import express, {
  type Request,
  type Response,
  type NextFunction,
  type Application
} from 'express';

const app: Application = express();
const port: number = 3000;

// login es opcional (?) porque el cliente puede llamar a la URL sin enviarlo.
interface AuthQuery {
  login?: string;
}

// Orden de los genéricos de Request: <Params, ResBody, ReqBody, ReqQuery>.
// Los tres primeros no se usan ({}); AuthQuery en la cuarta posición tipa req.query.
app.use((req: Request<{}, {}, {}, AuthQuery>, res: Response, next: NextFunction): void => {
  if (req.query.login === 'mile@utn.ac.cr') {
    next();
  } else {
    // 401 (Unauthorized): no se llama a next(), así que la ruta nunca se ejecuta.
    res.status(401).send('No autorizado');
  }
});

// Ruta protegida: solo se alcanza si el middleware anterior llamó a next().
app.get('/panel', (req: Request, res: Response): void => {
  res.send('Ingreso al panel de gestión de la información');
});

app.listen(port, (): void => {
  console.log(`La aplicación está en línea en el puerto ${port}`);
});
