import { api } from "./axiosInstance";
import type { Libro, NuevoLibro } from "../types/libro";

export const obtenerLibros = async (): Promise<Libro[]> => {
  const res = await api.get<Libro[]>("/libros");
  return res.data;
};

export const crearLibro = async (libro: NuevoLibro): Promise<Libro> => {
  const res = await api.post<Libro>("/libros", libro);
  return res.data;
};

export const actualizarLibro = async (id: number, libro: NuevoLibro): Promise<Libro> => {
  const res = await api.put<Libro>(`/libros/${id}`, libro);
  return res.data;
};

export const eliminarLibro = async (id: number): Promise<void> => {
  await api.delete(`/libros/${id}`);
};