import { useRef, useState } from 'react'
import type { Libro } from '../data/libros'

interface CatalogoProps {
  libros: Libro[]
  filtrado: boolean
}

function Catalogo({ libros, filtrado }: CatalogoProps) {
  const [favoritos, setFavoritos] = useState<number[]>([])
  const [agregados, setAgregados] = useState<number[]>([])
  const [detalle, setDetalle] = useState<Libro | null>(null)
  const [mensaje, setMensaje] = useState('')
  const dialogo = useRef<HTMLDialogElement>(null)

  function alternarFavorito(libro: Libro) {
    const existe = favoritos.includes(libro.id)
    setFavoritos((actuales) => existe
      ? actuales.filter((id) => id !== libro.id)
      : [...actuales, libro.id],
    )
    setMensaje(`${libro.titulo}: ${existe ? 'eliminado de' : 'guardado en'} favoritos.`)
  }

  function alternarAgregado(libro: Libro) {
    const existe = agregados.includes(libro.id)
    setAgregados((actuales) => existe
      ? actuales.filter((id) => id !== libro.id)
      : [...actuales, libro.id],
    )
    setMensaje(`${libro.titulo}: ${existe ? 'retirado de' : 'añadido a'} tu biblioteca.`)
  }

  return (
    <main className="catalogo" aria-labelledby="titulo-catalogo">
      <div className="titulo-catalogo">
        <h2 id="titulo-catalogo">Catálogo interactivo</h2>
        <p>— {filtrado ? 'Categorías seleccionadas' : 'Explorar todos'} ({libros.length} {libros.length === 1 ? 'resultado' : 'resultados'})</p>
      </div>

      <div className="rejilla-libros">
        {libros.map((libro) => (
          <article className="tarjeta-libro" key={libro.id}>
            <div className="fondo-portada" role="img" aria-label={`Portada de ${libro.titulo}`}>
              <div className={`portada ${libro.portada}`} />
            </div>
            <div className="datos-libro">
              <div className="fila-titulo">
                <h3 title={libro.titulo}>{libro.titulo}</h3>
                <span className="valoracion" aria-label={`${libro.valoracion} de 5 estrellas`}>
                  {libro.valoracion}<span aria-hidden="true">★</span>
                </span>
              </div>
              <p className="autor">{libro.autor}</p>
              <p className="genero">{libro.categoria}</p>
              <div className="acciones-libro">
                <button
                  className="boton-detalles"
                  type="button"
                  onClick={() => {
                    setDetalle(libro)
                    dialogo.current?.showModal()
                  }}
                >Ver Detalles</button>
                <button
                  className="boton-icono"
                  type="button"
                  aria-label={`${agregados.includes(libro.id) ? 'Retirar' : 'Añadir'} ${libro.titulo} ${agregados.includes(libro.id) ? 'de' : 'a'} tu biblioteca`}
                  aria-pressed={agregados.includes(libro.id)}
                  onClick={() => alternarAgregado(libro)}
                >
                  <span className="simbolo-anadir" aria-hidden="true">{agregados.includes(libro.id) ? '✓' : '+'}</span>
                  <span>{agregados.includes(libro.id) ? 'Añadido' : 'Añadir'}</span>
                </button>
                <button
                  className="boton-icono"
                  type="button"
                  aria-label={`${favoritos.includes(libro.id) ? 'Quitar' : 'Marcar'} ${libro.titulo} como favorito`}
                  aria-pressed={favoritos.includes(libro.id)}
                  onClick={() => alternarFavorito(libro)}
                >
                  <span className="corazon" aria-hidden="true">{favoritos.includes(libro.id) ? '♥' : '♡'}</span>
                  <span>Favorito</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {libros.length === 0 && (
        <div className="sin-resultados">
          <h3>No hay libros en estas categorías</h3>
          <p>Seleccioná otra categoría o pulsá “Mostrar todos”.</p>
        </div>
      )}
      <p className="estado" role="status">{mensaje}</p>

      <dialog ref={dialogo} className="detalle-libro" aria-labelledby="titulo-detalle">
        {detalle && (
          <>
            <p className="detalle-categoria">{detalle.categoria}</p>
            <h2 id="titulo-detalle">{detalle.titulo}</h2>
            <p className="detalle-autor">{detalle.autor}</p>
            <p>{detalle.descripcion}</p>
            <p className="detalle-valoracion">★ {detalle.valoracion} / 5</p>
          </>
        )}
        <form method="dialog">
          <button className="boton-detalles" type="submit">Cerrar</button>
        </form>
      </dialog>
    </main>
  )
}

export default Catalogo
