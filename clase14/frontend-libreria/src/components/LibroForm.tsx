import { useState, type FormEvent } from "react";
import { actualizarLibro, crearLibro } from "../api/libroApi";
import type { Libro, NuevoLibro } from "../types/libro";

interface LibroFormProps {
  libro?: Libro;
  onSaved: () => void;
  onCancel: () => void;
}

interface CamposFormulario {
  titulo: string;
  autor: string;
  genero: string;
  precio: string;
  ejemplares: string;
  portada_url: string;
}

function camposIniciales(libro?: Libro): CamposFormulario {
  return {
    titulo: libro?.titulo ?? "",
    autor: libro?.autor ?? "",
    genero: libro?.genero ?? "",
    precio: libro ? String(libro.precio) : "",
    ejemplares: libro ? String(libro.ejemplares) : "",
    portada_url: libro?.portada_url ?? "",
  };
}

export function LibroForm({ libro, onSaved, onCancel }: LibroFormProps) {
  const [campos, setCampos] = useState(() => camposIniciales(libro));
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  const actualizarCampo = (campo: keyof CamposFormulario, valor: string) => {
    setCampos((actuales) => ({ ...actuales, [campo]: valor }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const precio = Number(campos.precio);
    const ejemplares = Number(campos.ejemplares);
    if (!Number.isFinite(precio) || precio < 0) {
      setError("Ingresa un precio válido, igual o mayor que cero.");
      return;
    }
    if (!Number.isInteger(ejemplares) || ejemplares < 0) {
      setError("Ingresa una cantidad entera de ejemplares, igual o mayor que cero.");
      return;
    }

    const datos: NuevoLibro = {
      titulo: campos.titulo.trim(),
      autor: campos.autor.trim(),
      genero: campos.genero.trim(),
      precio,
      ejemplares,
      portada_url: campos.portada_url.trim() || null,
    };

    setGuardando(true);
    setError(null);
    try {
      if (libro) {
        await actualizarLibro(libro.id, datos);
      } else {
        await crearLibro(datos);
      }
      onSaved();
    } catch {
      setError(`No se pudo ${libro ? "actualizar" : "crear"} el libro. Inténtalo de nuevo.`);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section>
      <h2>{libro ? "Editar libro" : "Agregar libro"}</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <label>
          Título
          <input
            required
            value={campos.titulo}
            onChange={(event) => actualizarCampo("titulo", event.currentTarget.value)}
          />
        </label>
        <label>
          Autor
          <input
            required
            value={campos.autor}
            onChange={(event) => actualizarCampo("autor", event.currentTarget.value)}
          />
        </label>
        <label>
          Género
          <input
            required
            value={campos.genero}
            onChange={(event) => actualizarCampo("genero", event.currentTarget.value)}
          />
        </label>
        <label>
          Precio
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={campos.precio}
            onChange={(event) => actualizarCampo("precio", event.currentTarget.value)}
          />
        </label>
        <label>
          Ejemplares
          <input
            required
            type="number"
            min="0"
            step="1"
            value={campos.ejemplares}
            onChange={(event) => actualizarCampo("ejemplares", event.currentTarget.value)}
          />
        </label>
        <label>
          URL de portada (opcional)
          <input
            type="url"
            value={campos.portada_url}
            onChange={(event) => actualizarCampo("portada_url", event.currentTarget.value)}
          />
        </label>

        {error && <p className="mensaje mensaje--error" role="alert">{error}</p>}

        <div className="formulario__acciones">
          <button type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : libro ? "Guardar cambios" : "Crear libro"}
          </button>
          <button type="button" className="boton--secundario" onClick={onCancel} disabled={guardando}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
