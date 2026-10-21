import express, { type Application, type Request, type Response } from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const PORT = 3000;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

// El servidor WebSocket comparte el puerto con el servidor HTTP de Express
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  console.log('Nuevo cliente conectado.');

  ws.on('message', (message: Buffer) => {
    const texto = message.toString();
    console.log(`Mensaje recibido del cliente: ${texto}`);
    ws.send(`Servidor recibió tu mensaje: "${texto}"`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor HTTP y WebSocket corriendo en http://localhost:${PORT}`);
});
