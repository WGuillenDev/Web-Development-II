import 'dotenv/config';
import express, { type Application, type Request, type Response } from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const PORT = Number(process.env.PORT) || 3000;

interface PokemonApi {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: { 'official-artwork'?: { front_default: string | null } };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

interface EstadisticaVista {
  etiqueta: string;
  clave: string;
  valor: number;
  porcentaje: number;
}

interface PokemonVista {
  numero: string;
  nombre: string;
  region: string;
  imagen: string | null;
  altura: string;
  peso: string;
  tipos: { clave: string; nombre: string }[];
  habilidades: string;
  estadisticas: EstadisticaVista[];
  total: number;
}

const TIPOS: Record<string, string> = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

const ESTADISTICAS: Record<string, { etiqueta: string; clave: string }> = {
  hp: { etiqueta: 'PS (HP)', clave: 'hp' },
  attack: { etiqueta: 'Ataque', clave: 'atk' },
  defense: { etiqueta: 'Defensa', clave: 'def' },
  'special-attack': { etiqueta: 'At. Especial', clave: 'spa' },
  'special-defense': { etiqueta: 'Def. Especial', clave: 'spd' },
  speed: { etiqueta: 'Velocidad', clave: 'spe' },
};

const STAT_MAXIMO = 150;

const REGIONES: [number, string][] = [
  [151, 'Kanto'],
  [251, 'Johto'],
  [386, 'Hoenn'],
  [493, 'Sinnoh'],
  [649, 'Teselia'],
  [721, 'Kalos'],
  [809, 'Alola'],
  [905, 'Galar'],
  [1025, 'Paldea'],
];

function regionDe(id: number): string {
  return REGIONES.find(([limite]) => id <= limite)?.[1] ?? 'Desconocida';
}

function aVista(datos: PokemonApi): PokemonVista {
  const estadisticas = datos.stats.map((s) => {
    const meta = ESTADISTICAS[s.stat.name] ?? { etiqueta: s.stat.name, clave: 'otro' };
    return {
      etiqueta: meta.etiqueta,
      clave: meta.clave,
      valor: s.base_stat,
      porcentaje: Math.min(100, Math.round((s.base_stat / STAT_MAXIMO) * 100)),
    };
  });

  return {
    numero: '#' + String(datos.id).padStart(3, '0'),
    nombre: datos.name,
    region: regionDe(datos.id),
    imagen: datos.sprites.other?.['official-artwork']?.front_default ?? datos.sprites.front_default,
    altura: (datos.height / 10).toFixed(1) + ' m',
    peso: (datos.weight / 10).toFixed(1) + ' kg',
    tipos: datos.types.map((t) => ({
      clave: t.type.name,
      nombre: TIPOS[t.type.name] ?? t.type.name,
    })),
    habilidades: datos.abilities.map((a) => a.ability.name.replace('-', ' ')).join(', '),
    estadisticas,
    total: datos.stats.reduce((suma, s) => suma + s.base_stat, 0),
  };
}

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response): void => {
  res.render('index', { pokemon: null, error: null, consulta: '' });
});

app.post('/pokemon', async (req: Request, res: Response): Promise<void> => {
  const consulta: string = req.body?.pokemon ? String(req.body.pokemon).trim().toLowerCase() : '';

  if (!consulta) {
    res.render('index', {
      pokemon: null,
      error: 'Por favor, introduce el nombre o número de un Pokémon.',
      consulta,
    });
    return;
  }

  try {
    const pokemonName = encodeURIComponent(consulta);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const respuesta = await axios.get<PokemonApi>(url);

    res.render('index', { pokemon: aVista(respuesta.data), error: null, consulta });
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.render('index', {
        pokemon: null,
        error: `No se encontró ningún Pokémon con el nombre o número "${consulta}".`,
        consulta,
      });
      return;
    }
    console.error('Error al consultar la API:', error.message);
    res.render('index', {
      pokemon: null,
      error: 'Error de conexión: ' + error.message,
      consulta,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
