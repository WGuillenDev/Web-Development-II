import 'dotenv/config';
import express, { type Application, type Request, type Response } from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const PORT = Number(process.env.PORT) || 3000;
const API_KEY = process.env.API_KEY;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response): void => {
  res.render('index', { clima: null, error: null });
});

app.post('/clima', async (req: Request, res: Response): Promise<void> => {
  const ciudad: string = req.body?.ciudad ? String(req.body.ciudad).trim() : '';

  if (!ciudad) {
    res.render('index', { clima: null, error: 'Por favor, introduce una ciudad.' });
    return;
  }

  if (!API_KEY) {
    res.render('index', { clima: null, error: 'Falta configurar API_KEY en el archivo .env.' });
    return;
  }

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(ciudad)}&limit=1&appid=${API_KEY}`;
    const geoRespuesta = await axios.get(geoUrl);

    if (!geoRespuesta.data || geoRespuesta.data.length === 0) {
      res.render('index', { clima: null, error: 'No se pudo encontrar la ciudad. Intenta con otra.' });
      return;
    }

    const { lat, lon, name, country } = geoRespuesta.data[0];

    const climaUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;
    const climaRespuesta = await axios.get(climaUrl);
    const datos = climaRespuesta.data;

    const clima = {
      ciudad: name,
      pais: country,
      temp: Math.round(datos.main.temp),
      descripcion: datos.weather[0].description,
      humedad: datos.main.humidity,
      icono: `https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`,
    };

    res.render('index', { clima, error: null });
  } catch (error: any) {
    console.error('Error al consultar la API:', error.response?.data || error.message);
    res.render('index', {
      clima: null,
      error: 'Error de conexión: ' + (error.response?.data?.message || error.message),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
