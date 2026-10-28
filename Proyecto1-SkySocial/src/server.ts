import 'dotenv/config';
import express, { type Application } from 'express';
import http from 'node:http';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { WebSocketServer, WebSocket, type RawData } from 'ws';
import indexRouter from './routes/index.routes.js';
import type { ChatMessage, PublishEvent, ServerEvent } from './types/chat.types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const PORT = Number(process.env.PORT) || 3000;

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(ROOT_DIR, 'views'));

// Versión de los archivos estáticos: cambia en cada arranque y obliga al navegador a descargar CSS y JS nuevos
app.locals.assetVersion = Date.now().toString(36);

app.use(express.static(path.join(ROOT_DIR, 'public')));
app.use('/', indexRouter);

// Servidor HTTP propio para que el WebSocket pueda compartir el mismo puerto que Express
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Historial en memoria: se pierde al reiniciar el servidor
const messages: ChatMessage[] = [];
const MAX_HISTORY = 100;
const MAX_AUTHOR = 40;
const MAX_CONTENT = 280;

const timeFormat = new Intl.DateTimeFormat('es-CR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Costa_Rica',
});

function send(client: WebSocket, event: ServerEvent): void {
  if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(event));
}

// Valida lo recibido: el navegador tiene sus propios límites, pero no es confiable
function parsePublish(raw: RawData): PublishEvent | null {
  try {
    const data = JSON.parse(raw.toString()) as Partial<PublishEvent>;
    if (data.type !== 'publish' || typeof data.author !== 'string' || typeof data.content !== 'string') return null;

    const author = data.author.trim();
    const content = data.content.trim();
    if (!author || !content || author.length > MAX_AUTHOR || content.length > MAX_CONTENT) return null;

    return { type: 'publish', author, content };
  } catch {
    return null;
  }
}

wss.on('connection', (socket) => {
  // Quien se conecta recibe primero las publicaciones anteriores
  send(socket, { type: 'history', messages });

  socket.on('message', (raw) => {
    const event = parsePublish(raw);
    if (!event) {
      send(socket, { type: 'error', message: `Escribe tu nombre (máx. ${MAX_AUTHOR}) y un texto (máx. ${MAX_CONTENT}).` });
      return;
    }

    const message: ChatMessage = {
      id: randomUUID(),
      author: event.author,
      content: event.content,
      time: timeFormat.format(new Date()),
    };

    messages.push(message);
    if (messages.length > MAX_HISTORY) messages.shift();

    // Se retransmite a todos; own le indica a quien publicó que el mensaje es suyo
    wss.clients.forEach((client) => send(client, { type: 'message', message, own: client === socket }));
  });

  socket.on('error', (error) => console.error('Error en una conexión WebSocket:', error.message));
});

server.listen(PORT, () => {
  console.log(`SkySocial disponible en http://localhost:${PORT}`);
});
