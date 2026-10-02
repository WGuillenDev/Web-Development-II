import type { Response, NextFunction } from 'express';
import type { AccesoRequest } from '../types.js';
import { renderTarjeta } from '../views/tarjeta.js';

const HORA_APERTURA = 6;
const HORA_CIERRE = 22; // Exclusiva: a las 22:00 el área ya está cerrada.

export function formatearHora(hora: number, minutos = '00'): string {
  return `${String(hora).padStart(2, '0')}:${minutos}`;
}

export const HORARIO_VIP = `${formatearHora(HORA_APERTURA)} a ${formatearHora(HORA_CIERRE - 1, '59')}`;

// ?hora=0..23 permite simular la hora para pruebas; si no es válida se usa la hora del servidor.
export function obtenerHora(horaSimulada: string | undefined): number {
  if (horaSimulada !== undefined) {
    const hora = Number(horaSimulada);
    if (Number.isInteger(hora) && hora >= 0 && hora <= 23) {
      return hora;
    }
  }
  return new Date().getHours();
}

// Requiere que validarMembresia se ejecute antes, ya que lee res.locals.membresia.
export function controlHorario(req: AccesoRequest, res: Response, next: NextFunction): void {
  const { membresia } = res.locals;

  if (membresia !== 'VIP') {
    res.status(403).send(
      renderTarjeta({
        estado: 'denegado',
        titulo: 'Área exclusiva VIP',
        mensaje: 'Tu membresía no incluye acceso al área VIP.',
        detalles: { 'Tu membresía': membresia ?? 'Desconocida', 'Requerida': 'VIP' }
      })
    );
    return;
  }

  const hora = obtenerHora(req.query.hora);

  if (hora < HORA_APERTURA || hora >= HORA_CIERRE) {
    res.status(403).send(
      renderTarjeta({
        estado: 'denegado',
        titulo: 'Área VIP cerrada',
        mensaje: 'El área VIP no está disponible a esta hora.',
        detalles: { 'Hora de ingreso': formatearHora(hora), 'Horario VIP': HORARIO_VIP }
      })
    );
    return;
  }

  next();
}
