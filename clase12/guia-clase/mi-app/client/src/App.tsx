import { useEffect, useState } from "react";
interface Tarea {
  id: number;
  titulo: string;
  completada: number;
}
const API = "http://localhost:3001/api/tareas";

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState("");

  // Obtiene las tareas del servidor y actualiza el estado
  const cargar = async () => {
    const res = await fetch(API);
    setTareas(await res.json());
  };

  // Carga las tareas una sola vez al abrir la página
  useEffect(() => { cargar(); }, []);

  // Envía el formulario: crea la tarea en la base de datos y refresca la lista
  const agregar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    setTitulo("");
    cargar();
  };
  // Alterna una tarea entre pendiente y completada, según su id
  const alternar = async (id: number) => {
    await fetch(`${API}/${id}`, { method: "PUT" });
    cargar();
  };

  // Elimina una tarea según su id
  const borrar = async (id: number) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargar();
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Mis tareas</h1>
      <form onSubmit={agregar}>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)}
               placeholder="Nueva tarea" />
        <button>Agregar</button>
      </form>
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            <span onClick={() => alternar(t.id)}
                  style={{ cursor: "pointer",
                           textDecoration: t.completada ? "line-through" : "none" }}>
              {t.titulo}
            </span>
            <button onClick={() => borrar(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
