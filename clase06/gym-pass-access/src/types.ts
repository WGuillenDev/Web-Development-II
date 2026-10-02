import type { Request } from 'express';

export type Membresia = 'VIP' | 'Standard';

// Todos los middlewares de una ruta comparten el mismo req, por eso usan un único tipo de query.
export interface AccesoQuery {
  pass?: string;
  hora?: string;
}

export type AccesoRequest = Request<{}, {}, {}, AccesoQuery>;

declare global {
  namespace Express {
    interface Locals {
      membresia?: Membresia;
    }
  }
}
