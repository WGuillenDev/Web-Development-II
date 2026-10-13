import express, { Router, type Request, type Response } from 'express';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
}

const router: Router = Router();

router.get('/', (req: Request, res: Response): void => {
  const isActive: boolean = false;
  const usuarios: Usuario[] = [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Rojas"
    },
    {
      id: 2,
      nombre: "Maria",
      apellido: "Salas"
    }
  ];
  // Corrección: la guía envía "title", pero index.ejs imprime "titulo" (igual que /about)
  res.render('index', { titulo: 'Index page', isActive, usuarios });
});

router.get('/about', (req: Request, res: Response): void => {
  const titulo: string = 'Ya puedo pasar valores al html desde express';
  res.render('index', { titulo });
});

router.get('/panel', (req: Request, res: Response): void => {
  res.render('panel');
});

export default router;
