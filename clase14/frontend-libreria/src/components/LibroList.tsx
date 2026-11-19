import { useEffect, useState } from "react";
import { obtenerLibros, eliminarLibro } from "../api/libroApi";
import type { Libro } from "../types/libro";

interface LibroListProps {
  onEdit: (libro: Libro) => void;
}

export function LibroList({ onEdit }: LibroListProps) {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fallidas, setFallidas] = useState<Set<number>>(new Set());

  const marcarFallida = (id: number) => {
    setFallidas((prev) => new Set(prev).add(id));
  };

  useEffect(() => {
    const cargar = async () => {
      try {
        setLibros(await obtenerLibros());
      } catch {
        setError("No se pudo cargar el catálogo. Verifica que el servidor esté activo.");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const handleEliminar = async (libro: Libro) => {
    if (!window.confirm(`¿Eliminar "${libro.titulo}" del catálogo?`)) return;

    try {
      await eliminarLibro(libro.id);
      setLibros((prev) => prev.filter((l) => l.id !== libro.id));
    } catch {
      setError("No se pudo eliminar el libro.");
    }
  };

  if (cargando) return <p className="estado">Cargando catálogo...</p>;

  return (
    <section>
      <h2>Catálogo de libros</h2>
      {error && <p className="mensaje mensaje--error">{error}</p>}

      {libros.length === 0 && !error ? (
        <p className="estado">No hay libros registrados todavía.</p>
      ) : (
        <div className="catalogo">
          {libros.map((libro) => (
            <article key={libro.id} className="libro">
              {libro.portada_url && !fallidas.has(libro.id) ? (
                <img
                  className="libro__portada"
                  src={libro.portada_url}
                  alt={`Portada de ${libro.titulo}`}
                  onError={() => marcarFallida(libro.id)}
                />
              ) : (
                <div
                  className="libro__portada libro__portada--vacia"
                  role="img"
                  aria-label={`Portada no disponible de ${libro.titulo}`}
                >
                  <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
              )}

              <div className="libro__info">
                <h3>{libro.titulo}</h3>
                <p className="libro__autor">{libro.autor}</p>
                <span className="libro__genero">{libro.genero}</span>
                <p className="libro__precio">₡{libro.precio.toLocaleString("es-CR")}</p>
                <p className={libro.ejemplares === 0 ? "libro__stock libro__stock--agotado" : "libro__stock"}>
                  {libro.ejemplares === 0 ? "Agotado" : `${libro.ejemplares} ejemplares`}
                </p>
              </div>

              <div className="libro__acciones">
                <button onClick={() => onEdit(libro)}>Editar</button>
                <button className="boton--peligro" onClick={() => handleEliminar(libro)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}