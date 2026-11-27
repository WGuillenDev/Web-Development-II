import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { clerkMiddleware, clerkClient, getAuth } from "@clerk/express";

const app = express();
const port = Number(process.env.PORT) || 3005;

// 1. Permitir peticiones desde el frontend en React
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// 2. Middleware global de Clerk (lee y verifica el token Bearer automáticamente)
app.use(clerkMiddleware());

// Ruta pública (cualquiera puede consultarla)
app.get("/api/public", (_req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "Esta es una ruta pública sin autenticación.",
  });
});

// 3. Ruta protegida para API REST
app.get("/api/protegida", async (req: Request, res: Response) => {
  const { userId, sessionId } = getAuth(req);

  // Si no hay sesión válida, devolvemos 401 JSON (ideal para APIs SPA/React)
  if (!userId) {
    return res.status(401).json({
      ok: false,
      error: "No autorizado. Inicia sesión para acceder a este recurso.",
    });
  }

  // Opcional: obtener los datos completos del usuario desde Clerk
  const user = await clerkClient.users.getUser(userId);

  return res.json({
    ok: true,
    message: "Acceso autorizado por Express + Clerk",
    userId,
    sessionId,
    email: user.emailAddresses[0]?.emailAddress,
    nombre: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
  });
});

app.listen(port, () => {
  console.log(`Backend corriendo en http://localhost:${port}`);
});
