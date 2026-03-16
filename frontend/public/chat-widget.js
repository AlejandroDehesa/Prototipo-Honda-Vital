const config = {
  endpoint: 'http://localhost:3001/api/agent/chat',
  title: 'David',
  subtitle: 'Asistente de bienestar, salas y primera visita',
  avatarUrl: '/david-hero.jpg',
  placeholder: 'Escribe tu mensaje...',
  launcherLabel: 'IA',
  welcomeMessage:
    'Hola. Puedo orientarte sobre salas, precios, primera visita o el enfoque de David. Que te gustaria explorar?',
  ...(window.OPEN_GRAVITY_CONFIG || {})
};

const storageKey = 'ondavital_david_session_id_v2';
const voicePreferenceKey = 'ondavital_david_voice_enabled';
let sessionId = localStorage.getItem(storageKey);
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem(storageKey, sessionId);
}

let voiceEnabled = localStorage.getItem(voicePreferenceKey) === 'true';

const launcher = document.createElement('button');
launcher.id = 'og-chat-launcher';
launcher.type = 'button';
launcher.textContent = config.launcherLabel;

const widget = document.createElement('section');
widget.id = 'og-chat-widget';
widget.className = 'og-hidden';
widget.innerHTML = `
  <div class="og-chat-header">
    <div class="og-chat-header-main">
      <img class="og-chat-avatar og-chat-avatar-header" src="${config.avatarUrl}" alt="${config.title}" />
      <div>
        <h3>${config.title}</h3>
        <p>${config.subtitle}</p>
      </div>
    </div>
    <button class="og-chat-close" type="button" aria-label="Cerrar chat">x</button>
  </div>
  <div class="og-chat-messages" id="og-chat-messages"></div>
  <div class="og-chat-footer">
    <div class="og-chat-prompts">
      <button class="og-chat-prompt" type="button" data-prompt="Que sala me recomiendas para un grupo pequeno?">Sala ideal</button>
      <button class="og-chat-prompt" type="button" data-prompt="Cuales son los precios de las salas?">Precios</button>
      <button class="og-chat-prompt" type="button" data-prompt="Que ocurre en la primera visita?">Primera visita</button>
    </div>
    <label class="og-chat-voice-toggle">
      <input id="og-chat-voice-toggle" type="checkbox" ${voiceEnabled ? 'checked' : ''} />
      <span>Escuchar respuestas</span>
    </label>
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
const voiceToggle = widget.querySelector('#og-chat-voice-toggle');
const promptButtons = widget.querySelectorAll('.og-chat-prompt');

function getPreferredVoice() {
  const synth = window.speechSynthesis;
  if (!synth) return null;

  const voices = synth.getVoices();
  if (!voices.length) return null;

  const scoreVoice = (voice) => {
    const name = (voice.name || '').toLowerCase();
    const lang = (voice.lang || '').toLowerCase();
    let score = 0;

    if (lang.startsWith('es-es')) score += 6;
    else if (lang.startsWith('es')) score += 4;

    if (name.includes('jorge')) score += 6;
    if (name.includes('alvaro')) score += 6;
    if (name.includes('antonio')) score += 6;
    if (name.includes('enrique')) score += 5;
    if (name.includes('diego')) score += 5;
    if (name.includes('carlos')) score += 5;
    if (name.includes('male')) score += 4;
    if (name.includes('man')) score += 3;

    if (name.includes('google')) score += 2;
    if (voice.default) score += 1;

    if (name.includes('female')) score -= 3;
    if (name.includes('woman')) score -= 3;
    if (name.includes('monica')) score -= 4;
    if (name.includes('paulina')) score -= 4;
    if (name.includes('helena')) score -= 4;

    return score;
  };

  const sortedVoices = [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a));

  return (
    sortedVoices[0] ||
    voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith('es')) ||
    voices.find((voice) => voice.default) ||
    voices[0]
  );
}

function speakText(text) {
  if (!voiceEnabled || !('speechSynthesis' in window) || !text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const preferredVoice = getPreferredVoice();
  if (preferredVoice) {
    utterance.voice = preferredVoice;
    utterance.lang = preferredVoice.lang || 'es-ES';
  } else {
    utterance.lang = 'es-ES';
  }

  utterance.rate = 0.9;
  utterance.pitch = 0.92;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function addMessage(text, role, extraClass = '') {
  const wrapper = document.createElement('div');
  wrapper.className = `og-msg-row ${role === 'user' ? 'og-msg-row-user' : 'og-msg-row-bot'}`;

  if (role === 'bot') {
    const avatar = document.createElement('img');
    avatar.className = 'og-chat-avatar og-chat-avatar-msg';
    avatar.src = config.avatarUrl;
    avatar.alt = config.title;
    wrapper.appendChild(avatar);
  }

  const div = document.createElement('div');
  div.className = `og-msg ${role === 'user' ? 'og-msg-user' : 'og-msg-bot'} ${extraClass}`.trim();
  div.textContent = text;
  wrapper.appendChild(div);

  messagesEl.appendChild(wrapper);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  if (role === 'bot' && !extraClass.includes('og-typing')) {
    speakText(text);
  }
  return wrapper;
}

if (config.welcomeMessage) {
  addMessage(config.welcomeMessage, 'bot');
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    getPreferredVoice();
  };
} else if (voiceToggle) {
  voiceToggle.checked = false;
  voiceToggle.disabled = true;
}

launcher.addEventListener('click', () => {
  widget.classList.remove('og-hidden');
  input.focus();
});

window.addEventListener('ondavital:open-chat', () => {
  widget.classList.remove('og-hidden');
  input.focus();
});

closeBtn.addEventListener('click', () => {
  widget.classList.add('og-hidden');
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
});

if (voiceToggle) {
  voiceToggle.addEventListener('change', (event) => {
    voiceEnabled = event.target.checked;
    localStorage.setItem(voicePreferenceKey, String(voiceEnabled));

    if (!voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });
}

promptButtons.forEach((button) => {
  button.addEventListener('click', () => {
    input.value = button.dataset.prompt || '';
    input.focus();
  });
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
    addMessage(
      'No se pudo conectar con el asistente. Asegurate de que el servicio de David este corriendo en el puerto 3001.',
      'bot'
    );
  }
});
