/**
 * HTTP Response: formas de responder al cliente.
 *
 *   res.send(valor)    → texto, HTML u objeto (un objeto se convierte a JSON).
 *   res.json(objeto)   → JSON explícito, con Content-Type: application/json.
 *   res.sendFile(ruta) → un archivo del disco; requiere una ruta absoluta.
 *   res.status(code)   → define el código de estado antes de enviar la respuesta.
 *
 * Ejecutar: npm run respuestas  (o npm start)
 */
import express, { type Request, type Response, type Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// En CommonJS (require) __dirname existe automáticamente; en ES Modules (import) no.
// Se reconstruye así:
//   import.meta.url   → URL del archivo actual (file:///C:/.../respuestas.ts)
//   fileURLToPath     → la convierte en ruta del sistema (C:\...\respuestas.ts)
//   path.dirname      → elimina el nombre del archivo y deja solo la carpeta
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const port: number = 3000;

// Las interfaces describen la forma del JSON que se envía. Solo existen en tiempo de
// compilación: TypeScript avisa si falta un campo o si un tipo no coincide.
interface Address {
  city: string;
  street: string;
}

interface UserResponse {
  name: string;
  lastname: string;
  age: number;
  point: number[];
  address: Address;
}

app.get('/', (req: Request, res: Response): void => {
  res.send('Hola');
});

app.get('/miarchivo', (req: Request, res: Response): void => {
  // path.join arma la ruta con el separador correcto para cada sistema operativo.
  const filePath = path.join(__dirname, 'logo.png');

  // El callback recibe un error si el archivo no existe o no se pudo leer.
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error al enviar el archivo:', err.message);
      // headersSent indica si ya se empezó a responder; evita enviar dos respuestas.
      if (!res.headersSent) {
        res.status(404).send('La imagen logo.png no se encontró.');
      }
    }
  });
});

app.get('/user', (req: Request, res: Response): void => {
  const userData: UserResponse = {
    name: 'Milena',
    lastname: 'Vargas',
    age: 40,
    point: [1, 2, 3],
    address: {
      city: 'Aguas Zarcas',
      street: 'Calle Esquivel'
    }
  };

  // Convierte el objeto a texto JSON y agrega la cabecera Content-Type correspondiente.
  res.json(userData);
});

app.listen(port, (): void => {
  console.log(`La aplicación está en línea en el puerto ${port}`);
});
