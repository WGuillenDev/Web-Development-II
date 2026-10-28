// Publicación del chat global creada por el servidor
export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  time: string;
}

// Evento que envía el navegador al publicar
export interface PublishEvent {
  type: 'publish';
  author: string;
  content: string;
}

// Eventos que envía el servidor a los navegadores
export type ServerEvent =
  | { type: 'history'; messages: ChatMessage[] }
  | { type: 'message'; message: ChatMessage; own: boolean }
  | { type: 'error'; message: string };
