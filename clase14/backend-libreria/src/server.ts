import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import libroRoutes from './routes/libroRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Definición de Rutas
app.use('/api/libros', libroRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
