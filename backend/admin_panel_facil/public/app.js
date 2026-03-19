const storageKey = 'onda-vital-admin-simple-token';
const adminBasePath = window.location.pathname.startsWith('/admin-facil') ? '/admin-facil' : '';

const state = {
  token: localStorage.getItem(storageKey) || '',
  user: null,
  sections: {},
  rooms: [],
  bookings: [],
  activeTab: 'inicio',
  roomDraft: null,
  roomDraftOriginalId: null,
  feedback: null,
  loading: false
};

const appNode = document.getElementById('app');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function setFeedback(type, message) {
  state.feedback = { type, message };
  render();
}

function clearFeedback() {
  state.feedback = null;
}

function linesToArray(value) {
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToLines(items) {
  return Array.isArray(items) ? items.join('\n') : '';
}

function pairsToLines(items) {
  return Array.isArray(items)
    ? items.map((item) => `${item.label || ''} = ${item.value || ''}`).join('\n')
    : '';
}

function linesToPairs(value) {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split('=');
      return {
        label: (label || '').trim(),
        value: rest.join('=').trim()
      };
    })
    .filter((item) => item.label || item.value);
}

function getEmptyRoom() {
  return {
    id: '',
    name: '',
    shortName: '',
    sortOrder: state.rooms.length + 1,
    specs: '',
    size: '',
    capacity: '',
    availability: '',
    description: '',
    longDescription: '',
    coverImage: '',
    heroImageIndex: 0,
    images: [],
    features: [],
    pricing: {
      punctual: [],
      prepaid: [],
      regular: []
    }
  };
}

async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  if (state.token) {
    headers.set('Authorization', `Bearer ${state.token}`);
  }

  const response = await fetch(`${adminBasePath}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data?.message || 'No se pudo completar la peticion.');
    error.status = response.status;
    throw error;
  }

  return data;
}

async function loadDashboard() {
  state.loading = true;
  render();

  try {
    const me = await apiFetch('/api/auth/me', { method: 'GET' });
    state.user = me.data.user;

    const dashboard = await apiFetch('/api/admin/dashboard', { method: 'GET' });
    state.sections = dashboard.data.sections;
    state.rooms = dashboard.data.rooms;
    state.bookings = dashboard.data.bookings;

    if (!state.roomDraft && state.rooms.length > 0) {
      state.roomDraft = deepClone(state.rooms[0]);
      state.roomDraftOriginalId = state.rooms[0].id;
    }

    clearFeedback();
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem(storageKey);
      state.token = '';
      state.user = null;
    }
    setFeedback('error', error.message);
  } finally {
    state.loading = false;
    render();
  }
}

async function saveSection(key, payload) {
  await apiFetch(`/api/admin/sections/${key}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

function collectText(id) {
  return document.getElementById(id)?.value || '';
}

function collectNumber(id) {
  return Number(document.getElementById(id)?.value || 0);
}

function renderLogin() {
  const feedback = state.feedback
    ? `<div class="feedback ${state.feedback.type}">${escapeHtml(state.feedback.message)}</div>`
    : '';

  appNode.innerHTML = `
    <div class="page login">
      <div class="login-card">
        <div class="login-copy">
          <h1>Panel facil para Onda Vital</h1>
          <p>
            He dejado esta version pensada para un cliente que quiere verlo todo claro, grande y
            sin tecnicismos.
          </p>
          <ul>
            <li>Inicio: textos importantes de la web</li>
            <li>Salas: fotos, precios y descripciones</li>
            <li>Reservas: aprobar o rechazar en un clic</li>
          </ul>
        </div>
        <div class="login-form-wrap">
          <h2>Entrar al panel</h2>
          <p>Usa el usuario y la contrasena del panel.</p>
          ${feedback}
          <form id="login-form">
            <div class="field">
              <label>Usuario</label>
              <input name="username" value="admin" />
            </div>
            <div class="field">
              <label>Contrasena</label>
              <input name="password" type="password" value="admin1234" />
            </div>
            <button class="btn" type="submit">${state.loading ? 'Entrando...' : 'Entrar'}</button>
          </form>
          <div class="friendly-note">
            Credenciales por defecto: <code>admin</code> / <code>admin1234</code>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderShell(content) {
  const feedback = state.feedback
    ? `<div class="feedback ${state.feedback.type}">${escapeHtml(state.feedback.message)}</div>`
    : '';

  return `
    <div class="page layout">
      <aside class="side">
        <div class="brand">
          <strong>Onda Vital Admin Facil</strong>
          <span>${escapeHtml(state.user?.username || 'Invitado')}</span>
        </div>
        <p>Version simplificada para que el cliente vea todo de forma mas amable y directa.</p>
        <div class="tabs">
          <button class="tab ${state.activeTab === 'inicio' ? 'active' : ''}" data-action="tab" data-tab="inicio">Inicio y textos</button>
          <button class="tab ${state.activeTab === 'salas' ? 'active' : ''}" data-action="tab" data-tab="salas">Salas</button>
          <button class="tab ${state.activeTab === 'reservas' ? 'active' : ''}" data-action="tab" data-tab="reservas">Reservas</button>
        </div>
        <div class="actions" style="margin-top:20px">
          <button class="btn-soft" data-action="reload">Recargar</button>
          <button class="btn-danger" data-action="logout">Salir</button>
        </div>
      </aside>
      <main class="main">
        <div class="hero">
          <div>
            <h1>Panel sencillo</h1>
            <p>Todo el contenido importante en pantallas claras y con botones simples.</p>
          </div>
        </div>
        <div class="stats">
          <div class="stats-card">
            <span>Textos editables</span>
            <strong>8</strong>
          </div>
          <div class="stats-card">
            <span>Salas activas</span>
            <strong>${state.rooms.length}</strong>
          </div>
          <div class="stats-card">
            <span>Reservas pendientes</span>
            <strong>${state.bookings.filter((item) => item.status === 'pending').length}</strong>
          </div>
        </div>
        ${feedback}
        ${content}
      </main>
    </div>
  `;
}

function renderInicio() {
  const hero = state.sections.hero || {};
  const philosophy = state.sections.philosophy || { cards: [] };
  const firstVisit = state.sections.firstVisit || { steps: [] };
  const testimonials = state.sections.testimonials || { items: [] };
  const contact = state.sections.contact || {};
  const rentals = state.sections.roomRentals || { highlights: [] };
  const policies = state.sections.bookingPolicies || {};

  const philosophyCards = philosophy.cards || [];
  const visitSteps = firstVisit.steps || [];
  const reviewItems = testimonials.items || [];
  const highlights = rentals.highlights || [];

  return renderShell(`
    <div class="editor-grid">
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>Portada principal</h2>
            <p>Solo lo esencial: titulo, texto corto y frases de confianza.</p>
          </div>
          <button class="btn" data-action="save-hero">Guardar portada</button>
        </div>
        <div class="field">
          <label>Titulo grande</label>
          <input id="hero-title" value="${escapeHtml(hero.title || '')}" />
        </div>
        <div class="field">
          <label>Texto corto</label>
          <textarea id="hero-description">${escapeHtml(hero.description || '')}</textarea>
        </div>
        <div class="double">
          <div class="field">
            <label>Boton principal</label>
            <input id="hero-primary-label" value="${escapeHtml(hero.primaryCtaLabel || '')}" />
          </div>
          <div class="field">
            <label>Destino boton principal</label>
            <input id="hero-primary-target" value="${escapeHtml(hero.primaryCtaTarget || '')}" />
          </div>
        </div>
        <div class="double">
          <div class="field">
            <label>Boton secundario</label>
            <input id="hero-secondary-label" value="${escapeHtml(hero.secondaryCtaLabel || '')}" />
          </div>
          <div class="field">
            <label>Destino boton secundario</label>
            <input id="hero-secondary-target" value="${escapeHtml(hero.secondaryCtaTarget || '')}" />
          </div>
        </div>
        <div class="field">
          <label>Frases cortas de confianza</label>
          <span>Una por linea</span>
          <textarea id="hero-trust-items">${escapeHtml(arrayToLines(hero.trustItems))}</textarea>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>Metodo y primera visita</h2>
            <p>Titulos y bloques principales para explicar el trabajo de forma clara.</p>
          </div>
          <button class="btn" data-action="save-method">Guardar metodo</button>
        </div>
        <div class="double">
          <div class="field">
            <label>Titulo del metodo</label>
            <input id="philosophy-title" value="${escapeHtml(philosophy.title || '')}" />
          </div>
          <div class="field">
            <label>Subtitulo del metodo</label>
            <input id="philosophy-subtitle" value="${escapeHtml(philosophy.subtitle || '')}" />
          </div>
        </div>
        ${[0, 1, 2]
          .map(
            (index) => `
              <div class="double">
                <div class="field">
                  <label>Bloque ${index + 1} titulo</label>
                  <input id="ph-card-title-${index}" value="${escapeHtml(philosophyCards[index]?.title || '')}" />
                </div>
                <div class="field">
                  <label>Bloque ${index + 1} numero</label>
                  <input id="ph-card-number-${index}" value="${escapeHtml(philosophyCards[index]?.number || '')}" />
                </div>
              </div>
              <div class="field">
                <label>Bloque ${index + 1} texto</label>
                <textarea id="ph-card-text-${index}">${escapeHtml(philosophyCards[index]?.text || '')}</textarea>
              </div>
            `
          )
          .join('')}
        <div class="double">
          <div class="field">
            <label>Titulo primera visita</label>
            <input id="visit-title" value="${escapeHtml(firstVisit.title || '')}" />
          </div>
          <div class="field">
            <label>Subtitulo primera visita</label>
            <input id="visit-subtitle" value="${escapeHtml(firstVisit.subtitle || '')}" />
          </div>
        </div>
        ${[0, 1, 2, 3]
          .map(
            (index) => `
              <div class="double">
                <div class="field">
                  <label>Paso ${index + 1} titulo</label>
                  <input id="visit-step-title-${index}" value="${escapeHtml(visitSteps[index]?.title || '')}" />
                </div>
                <div class="field">
                  <label>Paso ${index + 1} numero</label>
                  <input id="visit-step-number-${index}" value="${escapeHtml(visitSteps[index]?.number || '')}" />
                </div>
              </div>
              <div class="field">
                <label>Paso ${index + 1} texto</label>
                <textarea id="visit-step-text-${index}">${escapeHtml(visitSteps[index]?.text || '')}</textarea>
              </div>
            `
          )
          .join('')}
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>Opiniones y contacto</h2>
            <p>Resenas visibles y datos basicos de contacto.</p>
          </div>
          <button class="btn" data-action="save-contact">Guardar contacto</button>
        </div>
        <div class="double">
          <div class="field">
            <label>Titulo opiniones</label>
            <input id="reviews-title" value="${escapeHtml(testimonials.title || '')}" />
          </div>
          <div class="field">
            <label>Subtitulo opiniones</label>
            <input id="reviews-subtitle" value="${escapeHtml(testimonials.subtitle || '')}" />
          </div>
        </div>
        ${[0, 1, 2]
          .map(
            (index) => `
              <div class="double">
                <div class="field">
                  <label>Opinion ${index + 1} autor</label>
                  <input id="review-author-${index}" value="${escapeHtml(reviewItems[index]?.author || '')}" />
                </div>
                <div class="field">
                  <label>Opinion ${index + 1} servicio</label>
                  <input id="review-service-${index}" value="${escapeHtml(reviewItems[index]?.service || '')}" />
                </div>
              </div>
              <div class="field">
                <label>Opinion ${index + 1} texto</label>
                <textarea id="review-text-${index}">${escapeHtml(reviewItems[index]?.text || '')}</textarea>
              </div>
            `
          )
          .join('')}
        <div class="field">
          <label>Titulo de contacto</label>
          <input id="contact-title" value="${escapeHtml(contact.title || '')}" />
        </div>
        <div class="field">
          <label>Texto de contacto</label>
          <textarea id="contact-description">${escapeHtml(contact.description || '')}</textarea>
        </div>
        <div class="double">
          <div class="field">
            <label>Direccion</label>
            <span>Una linea por campo</span>
            <textarea id="contact-location">${escapeHtml(arrayToLines(contact.locationLines))}</textarea>
          </div>
          <div class="field">
            <label>Telefono y email</label>
            <span>Una linea por campo</span>
            <textarea id="contact-lines">${escapeHtml(arrayToLines(contact.contactLines))}</textarea>
          </div>
        </div>
        <div class="field">
          <label>Horarios</label>
          <span>Una linea por campo</span>
          <textarea id="contact-schedule">${escapeHtml(arrayToLines(contact.scheduleLines))}</textarea>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>Alquiler y condiciones</h2>
            <p>Cabecera de salas y lista de normas para reservar.</p>
          </div>
          <button class="btn" data-action="save-rentals">Guardar alquiler</button>
        </div>
        <div class="double">
          <div class="field">
            <label>Titulo alquiler</label>
            <input id="rentals-title" value="${escapeHtml(rentals.title || '')}" />
          </div>
          <div class="field">
            <label>Texto pequeno superior</label>
            <input id="rentals-eyebrow" value="${escapeHtml(rentals.eyebrow || '')}" />
          </div>
        </div>
        <div class="field">
          <label>Texto explicativo</label>
          <textarea id="rentals-intro">${escapeHtml(rentals.intro || '')}</textarea>
        </div>
        ${[0, 1, 2]
          .map(
            (index) => `
              <div class="double">
                <div class="field">
                  <label>Destacado ${index + 1} izquierda</label>
                  <input id="highlight-label-${index}" value="${escapeHtml(highlights[index]?.label || '')}" />
                </div>
                <div class="field">
                  <label>Destacado ${index + 1} derecha</label>
                  <input id="highlight-value-${index}" value="${escapeHtml(highlights[index]?.value || '')}" />
                </div>
              </div>
            `
          )
          .join('')}
        <div class="field">
          <label>Titulo de condiciones</label>
          <input id="policies-title" value="${escapeHtml(policies.title || '')}" />
        </div>
        <div class="field">
          <label>Condiciones</label>
          <span>Una condicion por linea</span>
          <textarea id="policies-items">${escapeHtml(arrayToLines(policies.items))}</textarea>
        </div>
      </section>
    </div>
  `);
}

function renderSalas() {
  const room = state.roomDraft || getEmptyRoom();

  return renderShell(`
    <div class="editor-card">
      <div class="section-head">
        <div>
          <h2>Salas</h2>
          <p>Panel simple para cambiar nombre, fotos, precios y descripcion de cada sala.</p>
        </div>
        <div class="actions">
          <button class="btn-soft" data-action="new-room">Nueva sala</button>
          <button class="btn" data-action="save-room">${state.roomDraftOriginalId ? 'Guardar sala' : 'Crear sala'}</button>
          ${state.roomDraftOriginalId ? `<button class="btn-danger" data-action="delete-room">Eliminar sala</button>` : ''}
        </div>
      </div>
      <div class="rooms-layout">
        <div class="rooms-list">
          ${state.rooms
            .map(
              (item) => `
                <div class="room-item ${state.roomDraftOriginalId === item.id ? 'active' : ''}">
                  <strong>${escapeHtml(item.name)}</strong>
                  <span>${escapeHtml(item.shortName || item.id)}</span>
                  <span>Orden ${escapeHtml(item.sortOrder)}</span>
                  <div class="actions" style="margin-top:10px">
                    <button class="btn-soft" data-action="edit-room" data-room-id="${item.id}">Abrir</button>
                  </div>
                </div>
              `
            )
            .join('')}
        </div>
        <div>
          <div class="double">
            <div class="field">
              <label>Nombre de la sala</label>
              <input id="room-name" value="${escapeHtml(room.name || '')}" />
            </div>
            <div class="field">
              <label>Nombre corto</label>
              <input id="room-short-name" value="${escapeHtml(room.shortName || '')}" />
            </div>
          </div>
          <div class="double">
            <div class="field">
              <label>Identificador</label>
              <input id="room-id" value="${escapeHtml(room.id || '')}" />
            </div>
            <div class="field">
              <label>Orden</label>
              <input id="room-order" type="number" value="${escapeHtml(room.sortOrder || 0)}" />
            </div>
          </div>
          <div class="double">
            <div class="field">
              <label>Medidas</label>
              <input id="room-specs" value="${escapeHtml(room.specs || '')}" />
            </div>
            <div class="field">
              <label>Tamano</label>
              <input id="room-size" value="${escapeHtml(room.size || '')}" />
            </div>
          </div>
          <div class="field">
            <label>Capacidad</label>
            <input id="room-capacity" value="${escapeHtml(room.capacity || '')}" />
          </div>
          <div class="field">
            <label>Disponibilidad</label>
            <input id="room-availability" value="${escapeHtml(room.availability || '')}" />
          </div>
          <div class="field">
            <label>Descripcion corta</label>
            <textarea id="room-description">${escapeHtml(room.description || '')}</textarea>
          </div>
          <div class="field">
            <label>Descripcion larga</label>
            <textarea id="room-long-description">${escapeHtml(room.longDescription || '')}</textarea>
          </div>
          <div class="double">
            <div class="field">
              <label>Imagen de portada</label>
              <input id="room-cover-image" value="${escapeHtml(room.coverImage || '')}" />
            </div>
            <div class="field">
              <label>Numero de imagen destacada</label>
              <input id="room-hero-index" type="number" value="${escapeHtml(room.heroImageIndex || 0)}" />
            </div>
          </div>
          <div class="field">
            <label>Fotos</label>
            <span>Una ruta por linea</span>
            <textarea id="room-images">${escapeHtml(arrayToLines(room.images))}</textarea>
          </div>
          <div class="field">
            <label>Equipamiento</label>
            <span>Una linea por elemento</span>
            <textarea id="room-features">${escapeHtml(arrayToLines(room.features))}</textarea>
          </div>
          <div class="field">
            <label>Precios por hora o por dias</label>
            <span>Formato: nombre = precio</span>
            <textarea id="room-pricing-punctual">${escapeHtml(pairsToLines(room.pricing?.punctual))}</textarea>
          </div>
          <div class="field">
            <label>Precios prepago</label>
            <span>Formato: nombre = precio</span>
            <textarea id="room-pricing-prepaid">${escapeHtml(pairsToLines(room.pricing?.prepaid))}</textarea>
          </div>
          <div class="field">
            <label>Precios horario fijo</label>
            <span>Formato: nombre = precio</span>
            <textarea id="room-pricing-regular">${escapeHtml(pairsToLines(room.pricing?.regular))}</textarea>
          </div>
        </div>
      </div>
    </div>
  `);
}

function renderReservas() {
  return renderShell(`
    <div class="editor-card">
      <div class="section-head">
        <div>
          <h2>Reservas</h2>
          <p>Aqui el cliente puede verlas todas y cambiar el estado con botones claros.</p>
        </div>
      </div>
      <div class="booking-list">
        ${state.bookings.length === 0 ? '<div class="box" style="padding:18px">No hay reservas todavia.</div>' : ''}
        ${state.bookings
          .map(
            (booking) => `
              <div class="booking">
                <div class="booking-top">
                  <div>
                    <strong>${escapeHtml(booking.user_name)}</strong>
                    <p>${escapeHtml(booking.room_name)} · ${escapeHtml(booking.booking_date)}</p>
                    <small>${escapeHtml(booking.user_email)}${booking.user_phone ? ` · ${escapeHtml(booking.user_phone)}` : ''}</small>
                  </div>
                  <span class="pill ${escapeHtml(booking.status)}">${escapeHtml(booking.status)}</span>
                </div>
                <div class="actions" style="margin-top:12px">
                  <button class="btn-soft" data-action="booking-status" data-booking-id="${booking.id}" data-status="pending">Pendiente</button>
                  <button class="btn" data-action="booking-status" data-booking-id="${booking.id}" data-status="approved">Aprobar</button>
                  <button class="btn-danger" data-action="booking-status" data-booking-id="${booking.id}" data-status="rejected">Rechazar</button>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `);
}

function render() {
  if (!state.token) {
    renderLogin();
    return;
  }

  if (state.activeTab === 'salas') {
    appNode.innerHTML = renderSalas();
    return;
  }

  if (state.activeTab === 'reservas') {
    appNode.innerHTML = renderReservas();
    return;
  }

  appNode.innerHTML = renderInicio();
}

async function saveHero() {
  await saveSection('hero', {
    ...state.sections.hero,
    title: collectText('hero-title'),
    description: collectText('hero-description'),
    primaryCtaLabel: collectText('hero-primary-label'),
    primaryCtaTarget: collectText('hero-primary-target'),
    secondaryCtaLabel: collectText('hero-secondary-label'),
    secondaryCtaTarget: collectText('hero-secondary-target'),
    trustItems: linesToArray(collectText('hero-trust-items'))
  });
}

async function saveMethod() {
  await saveSection('philosophy', {
    ...state.sections.philosophy,
    title: collectText('philosophy-title'),
    subtitle: collectText('philosophy-subtitle'),
    cards: [0, 1, 2].map((index) => ({
      number: collectText(`ph-card-number-${index}`),
      title: collectText(`ph-card-title-${index}`),
      text: collectText(`ph-card-text-${index}`)
    }))
  });

  await saveSection('firstVisit', {
    ...state.sections.firstVisit,
    title: collectText('visit-title'),
    subtitle: collectText('visit-subtitle'),
    steps: [0, 1, 2, 3].map((index) => ({
      number: collectText(`visit-step-number-${index}`),
      title: collectText(`visit-step-title-${index}`),
      text: collectText(`visit-step-text-${index}`)
    }))
  });
}

async function saveContact() {
  await saveSection('testimonials', {
    ...state.sections.testimonials,
    title: collectText('reviews-title'),
    subtitle: collectText('reviews-subtitle'),
    items: [0, 1, 2].map((index) => ({
      id: state.sections.testimonials?.items?.[index]?.id || `review-${index + 1}`,
      author: collectText(`review-author-${index}`),
      service: collectText(`review-service-${index}`),
      text: collectText(`review-text-${index}`)
    }))
  });

  await saveSection('contact', {
    ...state.sections.contact,
    title: collectText('contact-title'),
    description: collectText('contact-description'),
    locationLines: linesToArray(collectText('contact-location')),
    contactLines: linesToArray(collectText('contact-lines')),
    scheduleLines: linesToArray(collectText('contact-schedule'))
  });
}

async function saveRentals() {
  await saveSection('roomRentals', {
    ...state.sections.roomRentals,
    title: collectText('rentals-title'),
    eyebrow: collectText('rentals-eyebrow'),
    intro: collectText('rentals-intro'),
    highlights: [0, 1, 2].map((index) => ({
      label: collectText(`highlight-label-${index}`),
      value: collectText(`highlight-value-${index}`)
    }))
  });

  await saveSection('bookingPolicies', {
    ...state.sections.bookingPolicies,
    title: collectText('policies-title'),
    items: linesToArray(collectText('policies-items'))
  });
}

async function saveRoomDraft() {
  const payload = {
    id: collectText('room-id'),
    name: collectText('room-name'),
    shortName: collectText('room-short-name'),
    sortOrder: collectNumber('room-order'),
    specs: collectText('room-specs'),
    size: collectText('room-size'),
    capacity: collectText('room-capacity'),
    availability: collectText('room-availability'),
    description: collectText('room-description'),
    longDescription: collectText('room-long-description'),
    coverImage: collectText('room-cover-image'),
    heroImageIndex: collectNumber('room-hero-index'),
    images: linesToArray(collectText('room-images')),
    features: linesToArray(collectText('room-features')),
    pricing: {
      punctual: linesToPairs(collectText('room-pricing-punctual')),
      prepaid: linesToPairs(collectText('room-pricing-prepaid')),
      regular: linesToPairs(collectText('room-pricing-regular'))
    }
  };

  const path = state.roomDraftOriginalId
    ? `/api/admin/rooms/${state.roomDraftOriginalId}`
    : '/api/admin/rooms';
  const method = state.roomDraftOriginalId ? 'PUT' : 'POST';

  await apiFetch(path, {
    method,
    body: JSON.stringify(payload)
  });
}

async function updateBookingStatus(bookingId, status) {
  await apiFetch(`/api/admin/bookings/${bookingId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

async function logout() {
  try {
    if (state.token) {
      await apiFetch('/api/auth/logout', { method: 'POST', body: JSON.stringify({}) });
    }
  } catch (error) {
    console.warn(error);
  }

  localStorage.removeItem(storageKey);
  state.token = '';
  state.user = null;
  state.sections = {};
  state.rooms = [];
  state.bookings = [];
  state.roomDraft = null;
  state.roomDraftOriginalId = null;
  clearFeedback();
  render();
}

document.addEventListener('submit', async (event) => {
  if (event.target.id !== 'login-form') {
    return;
  }

  event.preventDefault();
  state.loading = true;
  render();

  const formData = new FormData(event.target);

  try {
    const response = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password')
      })
    });

    state.token = response.data.token;
    localStorage.setItem(storageKey, state.token);
    await loadDashboard();
  } catch (error) {
    setFeedback('error', error.message);
  } finally {
    state.loading = false;
    render();
  }
});

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) {
    return;
  }

  try {
    if (button.dataset.action === 'tab') {
      state.activeTab = button.dataset.tab;
      clearFeedback();
      render();
      return;
    }

    if (button.dataset.action === 'reload') {
      await loadDashboard();
      return;
    }

    if (button.dataset.action === 'logout') {
      await logout();
      return;
    }

    if (button.dataset.action === 'save-hero') {
      await saveHero();
      await loadDashboard();
      state.activeTab = 'inicio';
      setFeedback('success', 'Portada guardada.');
      return;
    }

    if (button.dataset.action === 'save-method') {
      await saveMethod();
      await loadDashboard();
      state.activeTab = 'inicio';
      setFeedback('success', 'Metodo y primera visita guardados.');
      return;
    }

    if (button.dataset.action === 'save-contact') {
      await saveContact();
      await loadDashboard();
      state.activeTab = 'inicio';
      setFeedback('success', 'Opiniones y contacto guardados.');
      return;
    }

    if (button.dataset.action === 'save-rentals') {
      await saveRentals();
      await loadDashboard();
      state.activeTab = 'inicio';
      setFeedback('success', 'Alquiler y condiciones guardados.');
      return;
    }

    if (button.dataset.action === 'new-room') {
      state.roomDraft = getEmptyRoom();
      state.roomDraftOriginalId = null;
      clearFeedback();
      render();
      return;
    }

    if (button.dataset.action === 'edit-room') {
      const room = state.rooms.find((item) => item.id === button.dataset.roomId);
      state.roomDraft = room ? deepClone(room) : getEmptyRoom();
      state.roomDraftOriginalId = room?.id || null;
      clearFeedback();
      render();
      return;
    }

    if (button.dataset.action === 'save-room') {
      await saveRoomDraft();
      await loadDashboard();
      state.activeTab = 'salas';
      state.roomDraft = null;
      state.roomDraftOriginalId = null;
      setFeedback('success', 'Sala guardada.');
      return;
    }

    if (button.dataset.action === 'delete-room') {
      if (!state.roomDraftOriginalId) {
        return;
      }

      const confirmed = window.confirm('Se borrara esta sala. Quieres continuar?');
      if (!confirmed) {
        return;
      }

      await apiFetch(`/api/admin/rooms/${state.roomDraftOriginalId}`, {
        method: 'DELETE'
      });
      await loadDashboard();
      state.activeTab = 'salas';
      state.roomDraft = null;
      state.roomDraftOriginalId = null;
      setFeedback('success', 'Sala eliminada.');
      return;
    }

    if (button.dataset.action === 'booking-status') {
      await updateBookingStatus(button.dataset.bookingId, button.dataset.status);
      await loadDashboard();
      state.activeTab = 'reservas';
      setFeedback('success', 'Estado de la reserva actualizado.');
    }
  } catch (error) {
    setFeedback('error', error.message);
  }
});

render();

if (state.token) {
  loadDashboard();
}
