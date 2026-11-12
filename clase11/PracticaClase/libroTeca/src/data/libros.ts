export interface Libro {
  id: number
  titulo: string
  autor: string
  categoria: string
  valoracion: number
  portada: string
  descripcion: string
}

export const categorias = ['Ficción', 'Misterio', 'Fantasía', 'Biografía', 'Historia', 'Otros']

// Datos de muestra para practicar componentes, props y filtros.
export const libros: Libro[] = [
  {
    id: 1,
    titulo: 'Bantsatia',
    autor: 'Carlos Zanos',
    categoria: 'Misterio',
    valoracion: 4.8,
    portada: 'portada-misterio',
    descripcion: 'Una historia de misterio entre sombras, secretos y caminos por descubrir.',
  },
  {
    id: 2,
    titulo: 'El nombre del viento',
    autor: 'Patrick Rothfuss',
    categoria: 'Fantasía',
    valoracion: 4.8,
    portada: 'portada-viento',
    descripcion: 'Kvothe cuenta su historia: sus años de aprendizaje, la música y su búsqueda de respuestas en un mundo lleno de magia.',
  },
  {
    id: 3,
    titulo: 'El código Da Vinci',
    autor: 'Dan Brown',
    categoria: 'Misterio',
    valoracion: 4.8,
    portada: 'portada-codigo',
    descripcion: 'Robert Langdon sigue una serie de pistas entre obras de arte, símbolos y secretos históricos.',
  },
]
