const socket = new WebSocket(`ws://${location.host}`);
const messagesDiv = document.getElementById('messages');
const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');

function appendMessage(text, type = 'received') {
  const p = document.createElement('p');
  p.className = `chat__message chat__message--${type}`;
  p.textContent = text;
  messagesDiv.appendChild(p);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

socket.onopen = () => appendMessage('Conectado al servidor WebSocket.', 'system');
socket.onmessage = (event) => appendMessage(`Servidor dice: ${event.data}`);
socket.onclose = () => appendMessage('Conexión cerrada.', 'system');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === '' || socket.readyState !== WebSocket.OPEN) return;
  socket.send(text);
  appendMessage(`Tú dijiste: ${text}`, 'sent');
  input.value = '';
});
