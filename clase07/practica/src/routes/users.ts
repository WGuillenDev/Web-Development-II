import { Router, type Request, type Response } from "express";

const router: Router = Router();

router.get("/users", (req: Request, res: Response): void => {
  res.json({ mensaje: "Módulo de usuarios activo" });
});

router.post("/profile", (req: Request, res: Response): void => {
  const { nombre, correo } = req.body;
  res.json({ mensaje: `Perfil de ${nombre} registrado con el correo ${correo}` });
});

export default router;
