import { useState } from "react";
import { LibroForm } from "./components/LibroForm";
import { LibroList } from "./components/LibroList";
import type { Libro } from "./types/libro";

type Vista = "lista" | "crear" | "editar";

function App() {
  const [vistaActual, setVistaActual] = useState<Vista>("lista");
  const [libroAEditar, setLibroAEditar] = useState<Libro | null>(null);

  const mostrarLista = () => {
    setLibroAEditar(null);
    setVistaActual("lista");
  };

  const abrirEdicion = (libro: Libro) => {
    setLibroAEditar(libro);
    setVistaActual("editar");
  };

  return (
    <div className="app">
      <nav className="barra">
        <h1 className="barra__marca">Librería</h1>
        <button className={vistaActual === "lista" ? "activo" : ""} onClick={mostrarLista}>
          Ver libros
        </button>
        <button
          className={vistaActual === "crear" ? "activo" : ""}
          onClick={() => {
            setLibroAEditar(null);
            setVistaActual("crear");
          }}
        >
          + Agregar libro
        </button>
      </nav>

      <main className="contenido">
      {vistaActual === "lista" && <LibroList onEdit={abrirEdicion} />}

      {vistaActual === "crear" && <LibroForm onSaved={mostrarLista} onCancel={mostrarLista} />}

      {vistaActual === "editar" && libroAEditar && (
        <LibroForm
          libro={libroAEditar}
          onSaved={mostrarLista}
          onCancel={mostrarLista}
        />
      )}
      </main>
    </div>
  );
}

export default App;
