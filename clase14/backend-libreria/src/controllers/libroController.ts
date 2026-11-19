import type { Request, Response } from 'express';
import { LibroModel } from '../models/libroModel.js';
import type { Libro } from '../types/index.js';

const validarLibro = (datos: Libro): string | null => {
  if (!datos.titulo?.trim()) return 'El título es obligatorio';
  if (!datos.autor?.trim()) return 'El autor es obligatorio';
  if (!datos.genero?.trim()) return 'El género es obligatorio';
  if (typeof datos.precio !== 'number' || datos.precio < 0) return 'El precio debe ser un número válido';
  if (!Number.isInteger(datos.ejemplares) || datos.ejemplares < 0) return 'Los ejemplares deben ser un entero mayor o igual a 0';
  return null;
};

export const getLibros = async (req: Request, res: Response): Promise<void> => {
  try {
    const libros = await LibroModel.obtenerTodos();
    res.json(libros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
};

export const createLibro = async (req: Request, res: Response): Promise<void> => {
  const errorValidacion = validarLibro(req.body);
  if (errorValidacion) {
    res.status(400).json({ error: errorValidacion });
    return;
  }

  try {
    const nuevoLibro = await LibroModel.crear(req.body);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

export const updateLibro = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const errorValidacion = validarLibro(req.body);
  if (errorValidacion) {
    res.status(400).json({ error: errorValidacion });
    return;
  }

  try {
    const actualizado = await LibroModel.actualizar(id, req.body);
    if (!actualizado) {
      res.status(404).json({ error: 'Libro no encontrado' });
      return;
    }
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

export const deleteLibro = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const eliminado = await LibroModel.eliminar(id);
    if (!eliminado) {
      res.status(404).json({ error: 'Libro no encontrado' });
      return;
    }
    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};