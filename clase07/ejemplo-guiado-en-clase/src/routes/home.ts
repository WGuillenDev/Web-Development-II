import { Router, type Request, type Response } from "express";

const router: Router = Router();

router.get("/about", (req: Request, res: Response): void => {
  res.send("Pagina acerca de");
});

router.get("/panel", (req: Request, res: Response): void => {
  res.send("Pagina de panel");
});

export default router;
