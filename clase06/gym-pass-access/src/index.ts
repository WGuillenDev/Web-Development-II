import express, { type Request, type Response, type Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { validarMembresia } from './middlewares/validarMembresia.js';
import {
  controlHorario,
  formatearHora,
  HORARIO_VIP,
  obtenerHora
} from './middlewares/controlHorario.js';
import type { AccesoRequest } from './types.js';
import { renderTarjeta } from './views/tarjeta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();
const port: number = 3000;

// Se registra antes que las rutas para que también queden en el log los accesos rechazados.
app.use(morgan('dev'));

// Sirve los archivos de public/: index.html en "/" y la hoja de estilos en "/css/style.css".
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/gimnasio', validarMembresia, (req: AccesoRequest, res: Response): void => {
  const membresia = res.locals.membresia!;

  res.send(
    renderTarjeta({
      estado: membresia === 'VIP' ? 'vip' : 'standard',
      titulo: 'Bienvenido al gimnasio',
      mensaje: 'Acceso concedido al área general: máquinas, pesas y cardio.',
      detalles: { Membresía: membresia, Área: 'General' }
    })
  );
});

// El orden importa: controlHorario depende de la membresía que guarda validarMembresia.
app.get('/vip', validarMembresia, controlHorario, (req: AccesoRequest, res: Response): void => {
  res.send(
    renderTarjeta({
      estado: 'vip',
      titulo: 'Bienvenido al área VIP',
      mensaje: 'Acceso concedido: sauna, spa y entrenador personal.',
      detalles: {
        Membresía: 'VIP',
        'Hora de ingreso': formatearHora(obtenerHora(req.query.hora)),
        'Horario VIP': HORARIO_VIP
      }
    })
  );
});

app.use((req: Request, res: Response): void => {
  res.status(404).send(
    renderTarjeta({
      estado: 'denegado',
      titulo: 'Ruta no encontrada',
      mensaje: 'Esta área no existe. <a href="/">Volver al inicio</a>'
    })
  );
});

app.listen(port, (): void => {
  console.log(`Gym Pass Access en línea: http://localhost:${port}`);
});
