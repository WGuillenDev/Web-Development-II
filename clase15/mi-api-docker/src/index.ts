import dotenv from 'dotenv';
import express from 'express';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS hora_actual');

    res.json({
      mensaje: 'API con Node, Express, TypeScript y PostgreSQL funcionando',
      hora_db: result.rows[0].hora_actual,
    });
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error);
    res.status(500).json({ error: 'Error de conexión con la base de datos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
