import type { Response, NextFunction } from 'express';
import type { AccesoRequest, Membresia } from '../types.js';
import { escaparHtml, renderTarjeta } from '../views/tarjeta.js';

function normalizarPase(valor: string): Membresia | undefined {
  const pase = valor.trim().toLowerCase();
  if (pase === 'vip') return 'VIP';
  if (pase === 'standard') return 'Standard';
  return undefined;
}

export function validarMembresia(req: AccesoRequest, res: Response, next: NextFunction): void {
  const { pass } = req.query;

  if (!pass) {
    res.status(401).send(
      renderTarjeta({
        estado: 'denegado',
        titulo: 'Acceso denegado',
        mensaje: 'Debes presentar tu pase de membresía para ingresar.',
        detalles: { Motivo: 'Sin pase', Ejemplo: '?pass=VIP o ?pass=Standard' }
      })
    );
    return;
  }

  const membresia = normalizarPase(pass);

  if (!membresia) {
    res.status(400).send(
      renderTarjeta({
        estado: 'denegado',
        titulo: 'Pase no reconocido',
        mensaje: `El pase <strong>${escaparHtml(pass)}</strong> no es una membresía válida.`,
        detalles: { 'Membresías válidas': 'VIP, Standard' }
      })
    );
    return;
  }

  // Disponible para los siguientes middlewares y la ruta durante esta petición.
  res.locals.membresia = membresia;
  next();
}
