// Chat global: conexión WebSocket, historial, publicaciones en vivo (chat y feed) y formulario
import { paintAvatar } from './avatar.js';
import type { ChatMessage, PublishEvent, ServerEvent } from '../types/chat.types.js';

type Status = 'connecting' | 'online' | 'offline';

const AUTHOR_KEY = 'skysocial-author';
const RECONNECT_MS = 3000;
const STATUS_LABELS: Record<Status, string> = {
  connecting: 'Conectando…',
  online: 'Conectado',
  offline: 'Desconectado',
};

const list = document.querySelector<HTMLElement>('#chat-messages');
const emptyState = document.querySelector<HTMLElement>('#chat-empty');
const template = document.querySelector<HTMLTemplateElement>('#message-template');
const form = document.querySelector<HTMLFormElement>('#composer');
const authorInput = document.querySelector<HTMLInputElement>('#author');
const contentInput = document.querySelector<HTMLTextAreaElement>('#content');
const composerAvatar = document.querySelector<HTMLElement>('.composer__avatar');
const counter = document.querySelector<HTMLElement>('.composer__count');
const status = document.querySelector<HTMLElement>('.status');
const feedLive = document.querySelector<HTMLElement>('#feed-live');
const feedTemplate = document.querySelector<HTMLTemplateElement>('#post-template');
const feedCount = document.querySelector<HTMLElement>('#feed-count');

let socket: WebSocket | null = null;

function setStatus(value: Status): void {
  if (!status) return;
  status.dataset.status = value;
  const label = status.querySelector('.status__label');
  if (label) label.textContent = STATUS_LABELS[value];
}

function scrollToBottom(): void {
  if (list) list.scrollTop = list.scrollHeight;
}

// El texto siempre entra con textContent para que nadie pueda inyectar HTML
function renderMessage(message: ChatMessage, own: boolean): void {
  if (!list || !template) return;
  emptyState?.remove();

  const node = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
  node.classList.toggle('message--own', own);
  node.dataset.id = message.id;
  paintAvatar(node.querySelector<HTMLElement>('.message__avatar')!, message.author);
  node.querySelector('.message__author')!.textContent = message.author;
  node.querySelector('.message__time')!.textContent = message.time;
  node.querySelector('.message__bubble')!.textContent = message.content;

  list.append(node);
  scrollToBottom();
}

// La misma publicación se suma arriba del feed, la más reciente primero
function renderFeedPost(message: ChatMessage): void {
  if (!feedLive || !feedTemplate) return;

  const node = feedTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
  node.dataset.id = message.id;
  paintAvatar(node.querySelector<HTMLElement>('.post__avatar')!, message.author);
  node.querySelector('.post__name')!.textContent = message.author;
  node.querySelector('.post__handle')!.textContent = `Chat global · ${message.time}`;
  node.querySelector('.post__body')!.textContent = message.content;

  feedLive.prepend(node);
  updateFeedCount();
}

// Total del feed: posts de JSONPlaceholder más las publicaciones en vivo
function updateFeedCount(): void {
  if (!feedCount || !feedLive) return;
  feedCount.textContent = String(Number(feedCount.dataset.base ?? 0) + feedLive.childElementCount);
}

function renderSystem(text: string): HTMLElement | null {
  if (!list) return null;
  const notice = document.createElement('p');
  notice.className = 'chat__system';
  notice.textContent = text;
  list.append(notice);
  scrollToBottom();
  return notice;
}

// Un solo aviso de desconexión, aunque se intente publicar varias veces; se quita al reconectar
let offlineNotice: HTMLElement | null = null;

function showOfflineNotice(): void {
  if (offlineNotice?.isConnected) {
    scrollToBottom();
    return;
  }
  offlineNotice = renderSystem('No se pudo publicar: no hay conexión con el servidor. Tu texto se conserva y la conexión se reintenta sola.');
}

// Al conectar (o reconectar) se reemplaza la lista con el historial del servidor.
// En el historial se reconocen como propios los mensajes con el mismo nombre del formulario.
function renderHistory(messages: ChatMessage[]): void {
  if (!list) return;
  list.replaceChildren();
  feedLive?.replaceChildren();
  if (messages.length === 0 && emptyState) list.append(emptyState);
  const ownName = authorInput?.value.trim() ?? '';
  messages.forEach((message) => {
    renderMessage(message, ownName !== '' && message.author === ownName);
    renderFeedPost(message);
  });
  updateFeedCount();
}

function handleEvent(event: ServerEvent): void {
  switch (event.type) {
    case 'history':
      renderHistory(event.messages);
      break;
    case 'message':
      renderMessage(event.message, event.own);
      renderFeedPost(event.message);
      break;
    case 'error':
      renderSystem(event.message);
      break;
  }
}

function connect(): void {
  setStatus('connecting');
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  socket = new WebSocket(`${protocol}://${location.host}`);

  socket.addEventListener('open', () => {
    setStatus('online');
    offlineNotice?.remove();
  });

  socket.addEventListener('message', (event: MessageEvent<string>) => {
    try {
      handleEvent(JSON.parse(event.data) as ServerEvent);
    } catch (error) {
      console.error('Mensaje del servidor no válido:', error);
    }
  });

  // Si el servidor se cae, se reintenta cada pocos segundos
  socket.addEventListener('close', () => {
    setStatus('offline');
    setTimeout(connect, RECONNECT_MS);
  });
}

function renderComposer(): void {
  if (authorInput && composerAvatar) paintAvatar(composerAvatar, authorInput.value);
  if (contentInput && counter) {
    counter.textContent = `${contentInput.value.length} / ${contentInput.maxLength}`;
    counter.classList.toggle('is-near', contentInput.value.length >= contentInput.maxLength * 0.9);
  }
}

function publish(): void {
  if (!authorInput || !contentInput) return;
  const author = authorInput.value.trim();
  const content = contentInput.value.trim();
  if (!author || !content) return;

  if (socket?.readyState !== WebSocket.OPEN) {
    showOfflineNotice();
    return;
  }

  const event: PublishEvent = { type: 'publish', author, content };
  socket.send(JSON.stringify(event));

  try {
    localStorage.setItem(AUTHOR_KEY, author);
  } catch {
    // Sin almacenamiento el nombre no se recuerda, pero el chat sigue funcionando
  }

  contentInput.value = '';
  renderComposer();
  contentInput.focus();
}

function initComposer(): void {
  if (!form || !authorInput || !contentInput) return;

  try {
    authorInput.value = localStorage.getItem(AUTHOR_KEY) ?? '';
  } catch {
    authorInput.value = '';
  }

  authorInput.addEventListener('input', renderComposer);
  contentInput.addEventListener('input', renderComposer);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    publish();
  });

  // Enter publica; Shift + Enter hace un salto de línea
  contentInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  renderComposer();
}

initComposer();
connect();
