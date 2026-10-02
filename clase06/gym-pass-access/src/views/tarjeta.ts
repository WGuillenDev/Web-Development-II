import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export type EstadoTarjeta = 'vip' | 'standard' | 'denegado';

export interface DatosTarjeta {
  estado: EstadoTarjeta;
  titulo: string;
  mensaje: string;
  detalles?: Record<string, string>;
}

const ETIQUETAS: Record<EstadoTarjeta, string> = {
  vip: 'VIP',
  standard: 'Standard',
  denegado: 'Denegado'
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Se lee una sola vez al iniciar el servidor, no en cada petición.
const PLANTILLA = readFileSync(path.join(__dirname, '..', '..', 'views', 'tarjeta.html'), 'utf-8');

// Previene XSS: todo valor que provenga del cliente debe escaparse antes de insertarlo en el HTML.
export function escaparHtml(texto: string): string {
  return texto
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderTarjeta({ estado, titulo, mensaje, detalles = {} }: DatosTarjeta): string {
  const filas = Object.entries(detalles)
    .map(
      ([clave, valor]) =>
        `<li><span>${escaparHtml(clave)}</span><strong>${escaparHtml(valor)}</strong></li>`
    )
    .join('');

  const valores: Record<string, string> = {
    estado,
    etiqueta: ETIQUETAS[estado],
    titulo: escaparHtml(titulo),
    mensaje,
    detalles: filas
  };

  // Se usa una función como reemplazo para que caracteres como "$" en los datos se inserten literalmente.
  return PLANTILLA.replaceAll(/\{\{(\w+)\}\}/g, (_, clave: string) => valores[clave] ?? '');
}
