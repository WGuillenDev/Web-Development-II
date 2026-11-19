export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  genero: string;
  precio: number;
  ejemplares: number;
  portada_url?: string | null;
}