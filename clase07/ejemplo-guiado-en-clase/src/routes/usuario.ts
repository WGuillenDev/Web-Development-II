import { Router, type Request, type Response } from "express";

const router: Router = Router();

router.get("/UserName", (req: Request, res: Response): void => {
  res.send("¡Ruta UserName funcionando correctamente!");
});

router.post("/profile", (req: Request, res: Response): void => {
  console.log(req.body);
  res.send("Pagina de perfil");
});

export default router;
