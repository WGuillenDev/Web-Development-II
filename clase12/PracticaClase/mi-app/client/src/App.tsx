import { useEffect, useState } from "react";
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}
const API = "http://localhost:3001/api/productos";

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  // Obtiene los productos del servidor y actualiza el estado
  const cargar = async () => {
    const res = await fetch(API);
    setProductos(await res.json());
  };

  // Carga los productos una sola vez al abrir la página
  useEffect(() => { cargar(); }, []);

  // Envía el formulario: crea el producto en la base de datos y refresca la lista
  const agregar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || precio === "" || stock === "") return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio: Number(precio), stock: Number(stock) }),
    });
    setNombre("");
    setPrecio("");
    setStock("");
    cargar();
  };

  // Suma o resta unidades al stock (cambio: 1 o -1), sin permitir negativos
  const cambiarStock = async (p: Producto, cambio: number) => {
    if (p.stock + cambio < 0) return;
    await fetch(`${API}/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: p.stock + cambio }),
    });
    cargar();
  };

  // Elimina un producto según su id
  const borrar = async (id: number) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargar();
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Inventario de productos</h1>
      <form onSubmit={agregar}>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)}
               placeholder="Nombre" />
        <input type="number" min="0" step="0.01" value={precio}
               onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" />
        <input type="number" min="0" step="1" value={stock}
               onChange={(e) => setStock(e.target.value)} placeholder="Stock" />
        <button>Agregar</button>
      </form>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            <span>{p.nombre} - Precio: {p.precio} - Stock: {p.stock}</span>
            <button onClick={() => cambiarStock(p, 1)}>+</button>
            <button onClick={() => cambiarStock(p, -1)}>-</button>
            <button onClick={() => borrar(p.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
