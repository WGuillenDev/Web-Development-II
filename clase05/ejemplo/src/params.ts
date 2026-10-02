/**
 * Request Params: variables dinámicas dentro de la URL.
 *
 * Se declaran en la ruta con dos puntos (:) y se leen en req.params:
 *   Ruta:   /users/:id
 *   URL:    http://localhost:3000/users/42
 *   Valor:  req.params.id === '42'
 *
 * Usos comunes en APIs REST: identificar un recurso para consultarlo (GET),
 * actualizarlo (PUT/PATCH) o eliminarlo (DELETE), y anidar recursos
 * (/users/42/orders/3).
 *
 * Importante: los params siempre llegan como string.
 *
 * Ejecutar: npm run params
 */
import express, { type Request, type Response, type Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Reconstrucción de __dirname en ES Modules (ver respuestas.ts).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const port: number = 3000;

// Cada interfaz describe los params de una ruta. Se pasa como primer genérico de
// Request<Params> para que TypeScript conozca y autocomplete req.params.
interface HelloParams {
  username: string;
}

interface MathParams {
  x: string;
  y: string;
}

interface UserParams {
  username: string;
}

interface PersonaParams {
  nombre: string;
  edad: string;
}

// Ejemplo 1: un parámetro. GET /Hello/Ana → "Hola Ana"
app.get('/Hello/:username', (req: Request<HelloParams>, res: Response): void => {
  // Desestructuración: equivale a const username = req.params.username;
  const { username } = req.params;
  res.send(`Hola ${username}`);
});

// Ejemplo 2: varios parámetros. GET /add/2/3 → "Result: 5"
app.get('/add/:x/:y', (req: Request<MathParams>, res: Response): void => {
  // Se convierten a número; sin parseInt, '2' + '3' concatenaría y daría '23'.
  const x = parseInt(req.params.x, 10);
  const y = parseInt(req.params.y, 10);

  // Si el valor no es numérico, parseInt devuelve NaN. Se responde 400 (Bad Request)
  // y return corta la ejecución para no enviar una segunda respuesta.
  if (isNaN(x) || isNaN(y)) {
    res.status(400).send('Error: Ambos parámetros deben ser números enteros válidos.');
    return;
  }

  const result: number = x + y;
  res.send(`Result: ${result}`);
});

// Ejemplo 3: acceso condicional a un archivo según el parámetro recibido.
// GET /users/mile/imagen → envía logo.png; con otro usuario se niega el acceso.
app.get('/users/:username/imagen', (req: Request<UserParams>, res: Response): void => {
  const { username } = req.params;

  if (username === 'mile') {
    const filePath = path.join(__dirname, 'logo.png');

    res.sendFile(filePath, (err) => {
      if (err && !res.headersSent) {
        console.error('Error al enviar la imagen:', err.message);
        res.status(404).send('La imagen logo.png no se encontró en el servidor.');
      }
    });
    return;
  }
  res.send('El usuario no tiene acceso a la imagen');
});

// Práctica de clase: recibir nombre y edad por la URL y mostrarlos en el navegador.
// GET /persona/Wilberth/19 → "Hola Wilberth, tienes 19 años"
app.get('/persona/:nombre/:edad', (req: Request<PersonaParams>, res: Response): void => {
  const { nombre } = req.params;
  const edad = parseInt(req.params.edad, 10);

  if (isNaN(edad)) {
    res.status(400).send('Error: la edad debe ser un número entero válido.');
    return;
  }

  res.send(`Hola ${nombre}, tienes ${edad} años`);
});

app.listen(port, (): void => {
  console.log(`Servidor en línea en el puerto ${port}`);
});
