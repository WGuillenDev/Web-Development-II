import { useState } from 'react'
import Header from './components/Header'
import Categorias from './components/Categorias'
import Catalogo from './components/Catalogo'
import { categorias, libros } from './data/libros'
import './App.css'

function App() {
  const [seleccionadas, setSeleccionadas] = useState<string[]>([])

  function cambiarCategoria(categoria: string) {
    setSeleccionadas((actuales) =>
      actuales.includes(categoria)
        ? actuales.filter((actual) => actual !== categoria)
        : [...actuales, categoria],
    )
  }

  const librosVisibles = libros.filter((libro) =>
    seleccionadas.length === 0 || seleccionadas.includes(libro.categoria),
  )

  return (
    <div className="aplicacion">
      <Header nombre="LibroTeca" />
      <div className="contenido">
        <Categorias
          categorias={categorias}
          seleccionadas={seleccionadas}
          alCambiar={cambiarCategoria}
          alLimpiar={() => setSeleccionadas([])}
        />
        <Catalogo libros={librosVisibles} filtrado={seleccionadas.length > 0} />
      </div>
    </div>
  )
}
export default App
