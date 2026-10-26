import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response): void => {
  res.render('index', {
    weather: null,
    weatherError: null,
    posts: [],
    feedError: null,
  });
});

export default router;
