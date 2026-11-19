import { pool } from '../config/db.js';
import type { Libro } from '../types/index.js';

export class LibroModel {
  static async obtenerTodos(): Promise<Libro[]> {
    const res = await pool.query('SELECT * FROM libros ORDER BY id DESC');
    return res.rows;
  }

  static async crear(libro: Libro): Promise<Libro> {
    const { titulo, autor, genero, precio, ejemplares, portada_url } = libro;
    const res = await pool.query(
      'INSERT INTO libros (titulo, autor, genero, precio, ejemplares, portada_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, autor, genero, precio, ejemplares, portada_url || null]
    );
    return res.rows[0];
  }

  static async actualizar(id: number, libro: Libro): Promise<Libro | null> {
    const { titulo, autor, genero, precio, ejemplares, portada_url } = libro;
    const res = await pool.query(
      'UPDATE libros SET titulo = $1, autor = $2, genero = $3, precio = $4, ejemplares = $5, portada_url = $6 WHERE id = $7 RETURNING *',
      [titulo, autor, genero, precio, ejemplares, portada_url || null, id]
    );
    return res.rows[0] || null;
  }

  static async eliminar(id: number): Promise<boolean> {
    const res = await pool.query('DELETE FROM libros WHERE id = $1', [id]);
    return (res.rowCount ?? 0) > 0;
  }
}