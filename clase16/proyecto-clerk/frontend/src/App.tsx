import { useState } from "react";
import {
  Show,
  SignIn,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/react";

export default function App() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [resultado, setResultado] = useState<string>("");
  const [cargando, setCargando] = useState(false);

  const llamarRutaProtegida = async () => {
    setCargando(true);
    setResultado("");

    try {
      // Obtiene el token JWT actual de la sesión de Clerk
      const token = await getToken();

      const response = await fetch("http://localhost:3005/api/protegida", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setResultado(JSON.stringify(data, null, 2));
    } catch {
      setResultado("Error al conectar con el backend en http://localhost:3005");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: "720px",
        margin: "2rem auto",
        padding: "1.5rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* 1. Si el usuario NO está autenticado, Clerk renderiza todo el login/registro */}
      <Show when="signed-out">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1>Bienvenido</h1>
          <p>Inicia sesión o crea una cuenta para continuar:</p>
          <SignIn />
        </div>
      </Show>

      {/* 2. Si el usuario SÍ está autenticado, mostramos el panel y probamos Express */}
      <Show when="signed-in">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Panel Protegido</h2>
            <p style={{ margin: "0.25rem 0 0", color: "#555" }}>
              Sesión activa como:{" "}
              <strong>{user?.primaryEmailAddress?.emailAddress}</strong>
            </p>
          </div>
          <UserButton />
        </header>

        <section style={{ marginTop: "1.5rem" }}>
          <button
            onClick={llamarRutaProtegida}
            disabled={cargando}
            style={{
              padding: "0.65rem 1.2rem",
              fontSize: "1rem",
              cursor: "pointer",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#111827",
              color: "#ffffff",
            }}
          >
            {cargando ? "Consultando..." : "Consultar /api/protegida en Express"}
          </button>

          {resultado && (
            <pre
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#1e293b",
                color: "#f8fafc",
                borderRadius: "8px",
                overflowX: "auto",
              }}
            >
              {resultado}
            </pre>
          )}
        </section>
      </Show>
    </main>
  );
}
