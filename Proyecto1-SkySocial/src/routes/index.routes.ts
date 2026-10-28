import { Router, type Request, type Response } from 'express';
import { getFeed } from '../services/posts.service.js';
import { getLocation } from '../services/location.service.js';
import { getWeather } from '../services/weather.service.js';
import type { Weather } from '../types/weather.types.js';

const router = Router();

// IP real del visitante; Node puede entregarla como IPv6 mapeada ("::ffff:190.10.1.5")
function clientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress) ?? '';
  return raw.trim().replace(/^::ffff:/, '');
}

async function getLocalWeather(ip: string): Promise<Weather> {
  const location = await getLocation(ip);
  return getWeather(location);
}

router.get('/', async (req: Request, res: Response): Promise<void> => {
  // allSettled espera ambas consultas aunque una falle, así cada módulo maneja su propio error
  const [weatherResult, feedResult] = await Promise.allSettled([getLocalWeather(clientIp(req)), getFeed()]);

  res.render('index', {
    weather: weatherResult.status === 'fulfilled' ? weatherResult.value : null,
    weatherError: weatherResult.status === 'rejected' ? (weatherResult.reason as Error).message : null,
    posts: feedResult.status === 'fulfilled' ? feedResult.value : [],
    feedError: feedResult.status === 'rejected' ? (feedResult.reason as Error).message : null,
  });
});

export default router;
