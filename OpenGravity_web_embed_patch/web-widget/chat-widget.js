const config = {
  endpoint: '/api/agent/chat',
  title: 'OpenGravity',
  subtitle: 'Asistente integrado',
  placeholder: 'Escribe tu mensaje...',
  launcherLabel: 'Chat',
  welcomeMessage: '',
  ...(window.OPEN_GRAVITY_CONFIG || {})
};

const storageKey = 'opengravity_web_session_id';
let sessionId = localStorage.getItem(storageKey);
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem(storageKey, sessionId);
}

const launcher = document.createElement('button');
launcher.id = 'og-chat-launcher';
launcher.type = 'button';
launcher.textContent = config.launcherLabel;

const widget = document.createElement('section');
widget.id = 'og-chat-widget';
widget.className = 'og-hidden';
widget.innerHTML = `
  <div class="og-chat-header">
    <div>
      <h3>${config.title}</h3>
      <p>${config.subtitle}</p>
    </div>
    <button class="og-chat-close" type="button" aria-label="Cerrar chat">×</button>
  </div>
  <div class="og-chat-messages" id="og-chat-messages"></div>
  <div class="og-chat-footer">
    <form class="og-chat-form" id="og-chat-form">
      <input class="og-chat-input" id="og-chat-input" type="text" placeholder="${config.placeholder}" autocomplete="off" />
      <button class="og-chat-send" type="submit">Enviar</button>
    </form>
  </div>
`;

document.body.appendChild(launcher);
document.body.appendChild(widget);

const closeBtn = widget.querySelector('.og-chat-close');
const messagesEl = widget.querySelector('#og-chat-messages');
const form = widget.querySelector('#og-chat-form');
const input = widget.querySelector('#og-chat-input');

function addMessage(text, role, extraClass = '') {
  const div = document.createElement('div');
  div.className = `og-msg ${role === 'user' ? 'og-msg-user' : 'og-msg-bot'} ${extraClass}`.trim();
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

if (config.welcomeMessage) {
  addMessage(config.welcomeMessage, 'bot');
}

launcher.addEventListener('click', () => {
  widget.classList.remove('og-hidden');
  input.focus();
});

closeBtn.addEventListener('click', () => {
  widget.classList.add('og-hidden');
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  input.focus();

  const typingEl = addMessage('Pensando...', 'bot', 'og-typing');

  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId,
        message
      })
    });

    const data = await response.json();
    typingEl.remove();

    if (!response.ok) {
      addMessage(data.error || 'Error del servidor', 'bot');
      return;
    }

    addMessage(data.reply || 'Sin respuesta', 'bot');
  } catch (error) {
    console.error('[OpenGravity Widget] Error:', error);
    typingEl.remove();
    addMessage('No se pudo conectar con el asistente.', 'bot');
  }
});
