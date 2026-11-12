interface CategoriasProps {
  categorias: string[]
  seleccionadas: string[]
  alCambiar: (categoria: string) => void
  alLimpiar: () => void
}

function Categorias({ categorias, seleccionadas, alCambiar, alLimpiar }: CategoriasProps) {
  return (
    <aside className="categorias" aria-labelledby="titulo-categorias">
      <h2 id="titulo-categorias">Categorías <span aria-hidden="true">⌃</span></h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria}>
            <label className={seleccionadas.includes(categoria) ? 'categoria seleccionada' : 'categoria'}>
              <input
                type="checkbox"
                checked={seleccionadas.includes(categoria)}
                onChange={() => alCambiar(categoria)}
              />
              {categoria}
            </label>
          </li>
        ))}
      </ul>
      <div className="pie-categorias">
        {seleccionadas.length > 0 && (
          <button className="limpiar" type="button" onClick={alLimpiar}>Mostrar todos</button>
        )}
      </div>
    </aside>
  )
}

export default Categorias
