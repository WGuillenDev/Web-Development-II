import 'dotenv/config';
import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req: Request, res: Response): void => {
    res.render('index', { countries: null, error: null });
});

app.post('/country', async (req: Request, res: Response): Promise<void> => {
    const countryName = req.body.country ? req.body.country.trim() : '';

    if (!countryName) {
        res.render('index', { countries: null, error: 'Por favor, introduce el nombre de un país.' });
        return;
    }

    try {
        const url = `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(countryName)}`;

        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        const rawText = await respuesta.text();

        console.log(`Código HTTP Status: ${respuesta.status}`);
        console.log(`Cuerpo de la respuesta:`, rawText);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const rawData = JSON.parse(rawText);
        const countriesData = rawData.data?.objects || [];

        res.render('index', { countries: countriesData, error: null });

    } catch (error: any) {
        console.error('Error capturado en el catch:', error.message);
        res.render('index', { countries: null, error: `Error técnico: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
