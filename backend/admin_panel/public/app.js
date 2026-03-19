const API_BASE = '';
const storageKey = 'onda-vital-admin-token';

const sectionSchemas = [
  {
    key: 'hero',
    label: 'Hero',
    description: 'Titular principal, llamadas a la accion e imagen de portada.',
    fields: [
      { key: 'title', label: 'Titulo principal', type: 'text' },
      { key: 'description', label: 'Descripcion', type: 'textarea' },
      { key: 'primaryCtaLabel', label: 'CTA principal', type: 'text' },
      { key: 'primaryCtaTarget', label: 'Destino CTA principal', type: 'text' },
      { key: 'secondaryCtaLabel', label: 'CTA secundaria', type: 'text' },
      { key: 'secondaryCtaTarget', label: 'Destino CTA secundaria', type: 'text' },
      { key: 'heroImage', label: 'Imagen principal', type: 'text' },
      { key: 'trustItems', label: 'Mensajes de confianza', type: 'string-list' }
    ]
  },
  {
    key: 'philosophy',
    label: 'Filosofia',
    description: 'Encabezado y bloques del metodo.',
    fields: [
      { key: 'title', label: 'Titulo', type: 'text' },
      { key: 'subtitle', label: 'Subtitulo', type: 'text' },
      {
        key: 'cards',
        label: 'Bloques',
        type: 'object-list',
        fields: [
          { key: 'number', label: 'Numero', type: 'text' },
          { key: 'title', label: 'Titulo', type: 'text' },
          { key: 'text', label: 'Texto', type: 'textarea' }
        ]
      }
    ]
  },
  {
    key: 'servicesOverview',
    label: 'Servicios',
    description: 'Panel principal de quiropractica, Resosense y salas.',
    fields: [
      { key: 'title', label: 'Titulo', type: 'text' },
      { key: 'subtitle', label: 'Subtitulo', type: 'text' },
      {
        key: 'primary',
        label: 'Servicio principal',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titulo', type: 'text' },
          { key: 'description', label: 'Descripcion', type: 'textarea' },
          { key: 'ctaLabel', label: 'Texto boton', type: 'text' },
          { key: 'ctaTarget', label: 'Destino boton', type: 'text' },
          { key: 'features', label: 'Puntos destacados', type: 'string-list' }
        ]
      },
      {
        key: 'secondary',
        label: 'Servicios secundarios',
        type: 'object-list',
        fields: [
          { key: 'id', label: 'Identificador', type: 'text' },
          { key: 'title', label: 'Titulo', type: 'text' },
          { key: 'description', label: 'Descripcion', type: 'textarea' },
          { key: 'ctaLabel', label: 'Texto boton', type: 'text' },
          { key: 'ctaTarget', label: 'Destino boton', type: 'text' }
        ]
      }
    ]
  },
  {
    key: 'firstVisit',
    label: 'Primera Visita',
    description: 'Pasos de la primera consulta.',
    fields: [
      { key: 'title', label: 'Titulo', type: 'text' },
      { key: 'subtitle', label: 'Subtitulo', type: 'text' },
      { key: 'ctaLabel', label: 'Texto boton', type: 'text' },
      { key: 'ctaTarget', label: 'Destino boton', type: 'text' },
      {
        key: 'steps',
        label: 'Pasos',
        type: 'object-list',
        fields: [
          { key: 'number', label: 'Numero', type: 'text' },
          { key: 'title', label: 'Titulo', type: 'text' },
          { key: 'text', label: 'Texto', type: 'textarea' }
        ]
      }
    ]
  },
  {
    key: 'testimonials',
    label: 'Testimonios',
    description: 'Resenas visibles en la home.',
    fields: [
      { key: 'title', label: 'Titulo', type: 'text' },
      { key: 'subtitle', label: 'Subtitulo', type: 'text' },
      {
        key: 'items',
        label: 'Testimonios',
        type: 'object-list',
        fields: [
          { key: 'id', label: 'Identificador', type: 'text' },
          { key: 'text', label: 'Texto', type: 'textarea' },
          { key: 'author', label: 'Autor', type: 'text' },
          { key: 'service', label: 'Servicio', type: 'text' }
        ]
      }
    ]
  },
  {
    key: 'contact',
    label: 'Contacto',
    description: 'Textos de contacto, datos visibles y opciones del formulario.',
    fields: [
      { key: 'title', label: 'Titulo', type: 'text' },
      { key: 'description', label: 'Descripcion', type: 'textarea' },
      { key: 'locationTitle', label: 'Titulo ubicacion', type: 'text' },
      { key: 'locationLines', label: 'Lineas ubicacion', type: 'string-list' },
      { key: 'contactTitle', label: 'Titulo contacto', type: 'text' },
      { key: 'contactLines', label: 'Lineas contacto', type: 'string-list' },
      { key: 'scheduleTitle', label: 'Titulo horarios', type: 'text' },
      { key: 'scheduleLines', label: 'Lineas horarios', type: 'string-list' },
      { key: 'formTitle', label: 'Titulo formulario', type: 'text' },
      { key: 'formDisclaimer', label: 'Texto legal', type: 'textarea' },
      {
        key: 'serviceOptions',
        label: 'Opciones del selector',
        type: 'object-list',
        fields: [
          { key: 'value', label: 'Valor', type: 'text' },
          { key: 'label', label: 'Etiqueta', type: 'text' }
        ]
      }
    ]
  },
  {
    key: 'roomRentals',
    label: 'Alquiler',
    description: 'Cabecera de la pagina de salas.',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Titulo', type: 'text' },
      { key: 'intro', label: 'Intro', type: 'textarea' },
      {
        key: 'highlights',
        label: 'Destacados',
        type: 'object-list',
        fields: [
          { key: 'label', label: 'Etiqueta', type: 'text' },
          { key: 'value', label: 'Valor', type: 'text' }
        ]
      }
    ]
  },
  {
    key: 'bookingPolicies',
    label: 'Condiciones',
    description: 'Normas y politicas visibles en la ficha de sala.',
    fields: [
      { key: 'title', label: 'Titulo', type: 'text' },
      { key: 'items', label: 'Condiciones', type: 'string-list' }
    ]
  }
];

const roomSchema = {
  fields: [
    { key: 'id', label: 'Identificador', type: 'text' },
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'shortName', label: 'Nombre corto', type: 'text' },
    { key: 'sortOrder', label: 'Orden', type: 'number' },
    { key: 'specs', label: 'Medidas', type: 'text' },
    { key: 'size', label: 'Tamano', type: 'text' },
    { key: 'capacity', label: 'Capacidad', type: 'text' },
    { key: 'availability', label: 'Disponibilidad', type: 'text' },
    { key: 'description', label: 'Descripcion corta', type: 'textarea' },
    { key: 'longDescription', label: 'Descripcion larga', type: 'textarea' },
    { key: 'coverImage', label: 'Imagen de portada', type: 'text' },
    { key: 'heroImageIndex', label: 'Indice imagen destacada', type: 'number' },
    { key: 'images', label: 'Galeria de imagenes', type: 'string-list' },
    { key: 'features', label: 'Equipamiento', type: 'string-list' },
    {
      key: 'pricing',
      label: 'Tarifas',
      type: 'group',
      fields: [
        {
          key: 'punctual',
          label: 'Por hora o por dias',
          type: 'object-list',
          fields: [
            { key: 'label', label: 'Etiqueta', type: 'text' },
            { key: 'value', label: 'Precio', type: 'text' }
          ]
        },
        {
          key: 'prepaid',
          label: 'Prepago',
          type: 'object-list',
          fields: [
            { key: 'label', label: 'Etiqueta', type: 'text' },
            { key: 'value', label: 'Precio', type: 'text' }
          ]
        },
        {
          key: 'regular',
          label: 'Horario fijo',
          type: 'object-list',
          fields: [
            { key: 'label', label: 'Etiqueta', type: 'text' },
            { key: 'value', label: 'Precio', type: 'text' }
          ]
        }
      ]
    }
  ]
};

const state = {
  token: localStorage.getItem(storageKey) || '',
  user: null,
  sections: {},
  rooms: [],
  bookings: [],
  activePanel: 'hero',
  roomDraft: null,
  roomDraftOriginalId: null,
  feedback: null,
  loading: true
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

function setFeedback(type, message) {
  state.feedback = { type, message };
  render();
}

function clearFeedback() {
  state.feedback = null;
}

async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  if (state.token) {
    headers.set('Authorization', `Bearer ${state.token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
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
      state.token = '';
      state.user = null;
      localStorage.removeItem(storageKey);
    }

    setFeedback('error', error.message);
  } finally {
    state.loading = false;
    render();
  }
}

function createDefaultValue(fields) {
  return fields.reduce((result, field) => {
    if (field.type === 'group') {
      result[field.key] = createDefaultValue(field.fields);
      return result;
    }

    if (field.type === 'string-list' || field.type === 'object-list') {
      result[field.key] = [];
      return result;
    }

    if (field.type === 'number') {
      result[field.key] = 0;
      return result;
    }

    result[field.key] = '';
    return result;
  }, {});
}

function getValueAtPath(target, path) {
  return path.split('.').reduce((value, segment) => {
    if (value === undefined || value === null) {
      return undefined;
    }

    if (/^\d+$/.test(segment)) {
      return value[Number(segment)];
    }

    return value[segment];
  }, target);
}

function setValueAtPath(target, path, nextValue) {
  const segments = path.split('.');
  const last = segments.pop();
  const parent = segments.reduce((value, segment) => {
    if (/^\d+$/.test(segment)) {
      return value[Number(segment)];
    }
    return value[segment];
  }, target);

  if (/^\d+$/.test(last)) {
    parent[Number(last)] = nextValue;
  } else {
    parent[last] = nextValue;
  }
}

function getRootTarget(rootKey) {
  if (rootKey === 'roomDraft') {
    return state.roomDraft;
  }
  return state.sections[rootKey];
}

function getSchemaForRoot(rootKey) {
  if (rootKey === 'roomDraft') {
    return roomSchema;
  }
  return sectionSchemas.find((section) => section.key === rootKey);
}

function findFieldConfig(fields, pathSegments) {
  let currentFields = fields;
  let found = null;

  for (const segment of pathSegments) {
    if (/^\d+$/.test(segment)) {
      continue;
    }

    found = currentFields.find((field) => field.key === segment);
    if (!found) {
      return null;
    }

    if (found.type === 'group' || found.type === 'object-list') {
      currentFields = found.fields || [];
    } else {
      currentFields = [];
    }
  }

  return found;
}

function renderFieldHtml(rootKey, field, value, pathPrefix = '') {
  const fieldPath = pathPrefix ? `${pathPrefix}.${field.key}` : field.key;

  if (field.type === 'group') {
    return `
      <div class="fieldset">
        <div class="fieldset-title">${escapeHtml(field.label)}</div>
        <div class="field-grid">
          ${field.fields.map((nestedField) => renderFieldHtml(rootKey, nestedField, value?.[field.key] || {}, fieldPath)).join('')}
        </div>
      </div>
    `;
  }

  if (field.type === 'string-list') {
    const items = Array.isArray(value?.[field.key]) ? value[field.key] : [];
    return `
      <div class="section-card">
        <h3>${escapeHtml(field.label)}</h3>
        <div class="collection">
          ${items.length === 0 ? `<div class="muted-box">Todavia no hay elementos.</div>` : ''}
          ${items
            .map(
              (item, index) => `
                <div class="collection-item">
                  <div class="field">
                    <label>${escapeHtml(field.label)} ${index + 1}</label>
                    <input data-root="${rootKey}" data-path="${fieldPath}.${index}" value="${escapeHtml(item)}" />
                  </div>
                  <div class="inline-actions actions-right">
                    <button class="danger-btn" data-action="remove-list-item" data-root="${rootKey}" data-path="${fieldPath}" data-index="${index}">Eliminar</button>
                  </div>
                </div>
              `
            )
            .join('')}
        </div>
        <div class="panel-actions">
          <button class="ghost-btn" data-action="add-list-item" data-root="${rootKey}" data-path="${fieldPath}" data-kind="string-list">Anadir linea</button>
        </div>
      </div>
    `;
  }

  if (field.type === 'object-list') {
    const items = Array.isArray(value?.[field.key]) ? value[field.key] : [];
    return `
      <div class="section-card">
        <h3>${escapeHtml(field.label)}</h3>
        <div class="collection">
          ${items.length === 0 ? `<div class="muted-box">Todavia no hay elementos.</div>` : ''}
          ${items
            .map(
              (item, index) => `
                <div class="collection-item">
                  <div class="item-toolbar actions-right">
                    <button class="danger-btn" data-action="remove-list-item" data-root="${rootKey}" data-path="${fieldPath}" data-index="${index}">Eliminar</button>
                  </div>
                  <div class="field-grid">
                    ${field.fields
                      .map((nestedField) =>
                        renderFieldHtml(rootKey, nestedField, item, `${fieldPath}.${index}`)
                      )
                      .join('')}
                  </div>
                </div>
              `
            )
            .join('')}
        </div>
        <div class="panel-actions">
          <button class="ghost-btn" data-action="add-list-item" data-root="${rootKey}" data-path="${fieldPath}" data-kind="object-list">Anadir bloque</button>
        </div>
      </div>
    `;
  }

  const currentValue =
    pathPrefix && Object.keys(value || {}).length > 0 ? value[field.key] : value?.[field.key];
  const inputType = field.type === 'number' ? 'number' : 'text';

  if (field.type === 'textarea') {
    return `
      <div class="field">
        <label>${escapeHtml(field.label)}</label>
        <textarea data-root="${rootKey}" data-path="${fieldPath}">${escapeHtml(currentValue || '')}</textarea>
      </div>
    `;
  }

  return `
    <div class="field">
      <label>${escapeHtml(field.label)}</label>
      <input type="${inputType}" data-root="${rootKey}" data-path="${fieldPath}" value="${escapeHtml(currentValue ?? '')}" />
    </div>
  `;
}

function renderLogin() {
  const feedback = state.feedback
    ? `<div class="feedback ${state.feedback.type}">${escapeHtml(state.feedback.message)}</div>`
    : '';

  appNode.innerHTML = `
    <div class="shell login-layout">
      <div class="login-card">
        <div class="login-brand">
          <h1>Panel de administracion para Onda Vital</h1>
          <p>
            Este panel permite editar el contenido principal del sitio, gestionar salas y revisar
            reservas, todo desde archivos nuevos y sin tocar la app actual.
          </p>
          <ul>
            <li>Edicion de home y textos clave</li>
            <li>CRUD completo de salas</li>
            <li>Revision de reservas recibidas</li>
          </ul>
        </div>
        <div class="login-panel">
          <h2>Acceso</h2>
          <p>Entra con el usuario configurado para el panel.</p>
          ${feedback}
          <form id="login-form" class="field-grid">
            <div class="field">
              <label>Usuario</label>
              <input name="username" value="admin" autocomplete="username" />
            </div>
            <div class="field">
              <label>Contrasena</label>
              <input type="password" name="password" value="admin1234" autocomplete="current-password" />
            </div>
            <button class="btn" type="submit">${state.loading ? 'Entrando...' : 'Entrar al panel'}</button>
          </form>
          <div class="hint-card">
            Credenciales por defecto: <code>admin</code> / <code>admin1234</code>. Cambialas en
            <code>backend/admin_panel/.env</code> antes de publicar.
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderOverview() {
  const pendingCount = state.bookings.filter((booking) => booking.status === 'pending').length;
  return `
    <div class="grid three">
      <div class="stats-card">
        <span class="subtle">Secciones editables</span>
        <strong>${sectionSchemas.length}</strong>
        <span class="subtle">Home, contacto, alquiler y condiciones</span>
      </div>
      <div class="stats-card">
        <span class="subtle">Salas configuradas</span>
        <strong>${state.rooms.length}</strong>
        <span class="subtle">Con galerias, textos y tarifas</span>
      </div>
      <div class="stats-card">
        <span class="subtle">Reservas pendientes</span>
        <strong>${pendingCount}</strong>
        <span class="subtle">Solicitudes por revisar</span>
      </div>
    </div>
  `;
}

function renderSectionEditor(section) {
  const data = state.sections[section.key] || {};
  return `
    <div class="editor-card">
      <div class="panel-head">
        <div>
          <h2>${escapeHtml(section.label)}</h2>
          <p>${escapeHtml(section.description)}</p>
        </div>
      </div>
      <div class="field-grid">
        ${section.fields.map((field) => renderFieldHtml(section.key, field, data)).join('')}
      </div>
      <div class="panel-actions">
        <button class="btn" data-action="save-section" data-section="${section.key}">Guardar cambios</button>
      </div>
    </div>
  `;
}

function renderRoomsPanel() {
  const room = state.roomDraft || getEmptyRoom();
  return `
    <div class="editor-card">
      <div class="panel-head">
        <div>
          <h2>Salas</h2>
          <p>Edita fichas completas con tarifas, galeria, capacidad y equipamiento.</p>
        </div>
        <div class="inline-actions">
          <button class="ghost-btn" data-action="new-room">Nueva sala</button>
          <button class="btn" data-action="save-room">${state.roomDraftOriginalId ? 'Guardar sala' : 'Crear sala'}</button>
          ${state.roomDraftOriginalId ? `<button class="danger-btn" data-action="delete-room">Eliminar sala</button>` : ''}
        </div>
      </div>
      <div class="room-layout">
        <div class="room-list">
          ${state.rooms
            .map(
              (item) => `
                <div class="room-pill ${state.roomDraftOriginalId === item.id ? 'active' : ''}">
                  <strong>${escapeHtml(item.name)}</strong>
                  <span>${escapeHtml(item.id)}</span>
                  <span>Orden ${escapeHtml(item.sortOrder)}</span>
                  <div class="inline-actions">
                    <button class="ghost-btn" data-action="edit-room" data-room-id="${item.id}">Editar</button>
                  </div>
                </div>
              `
            )
            .join('')}
        </div>
        <div class="field-grid">
          ${roomSchema.fields.map((field) => renderFieldHtml('roomDraft', field, room)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderBookingsPanel() {
  return `
    <div class="editor-card">
      <div class="panel-head">
        <div>
          <h2>Reservas</h2>
          <p>Consulta solicitudes y cambia su estado sin entrar en la base de datos.</p>
        </div>
        <button class="ghost-btn" data-action="refresh-dashboard">Actualizar</button>
      </div>
      <div class="booking-table">
        ${state.bookings.length === 0 ? '<div class="empty-card">Todavia no hay reservas registradas.</div>' : ''}
        ${state.bookings
          .map(
            (booking) => `
              <div class="booking-card booking-row">
                <div>
                  <strong>${escapeHtml(booking.user_name)}</strong>
                  <span>${escapeHtml(booking.user_email)}</span>
                  <span>${escapeHtml(booking.user_phone || 'Sin telefono')}</span>
                </div>
                <div>
                  <strong>${escapeHtml(booking.room_name)}</strong>
                  <span>Fecha solicitada: ${escapeHtml(booking.booking_date)}</span>
                  <span>Creada: ${escapeHtml(booking.created_at || '-')}</span>
                </div>
                <div>
                  <span class="tag ${escapeHtml(booking.status)}">${escapeHtml(booking.status)}</span>
                </div>
                <div class="booking-actions">
                  <button class="status-btn" data-action="set-booking-status" data-booking-id="${booking.id}" data-status="pending">Pendiente</button>
                  <button class="status-btn" data-action="set-booking-status" data-booking-id="${booking.id}" data-status="approved">Aprobar</button>
                  <button class="status-btn" data-action="set-booking-status" data-booking-id="${booking.id}" data-status="rejected">Rechazar</button>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderSnapshotPanel() {
  const snapshot = JSON.stringify(
    {
      sections: state.sections,
      rooms: state.rooms
    },
    null,
    2
  );

  return `
    <div class="editor-card">
      <div class="panel-head">
        <div>
          <h2>Snapshot publico</h2>
          <p>Este JSON sale desde <code>/api/public/content-bundle</code> y queda listo para integrar en la web cuando se permita tocarla.</p>
        </div>
      </div>
      <textarea class="snapshot" readonly>${escapeHtml(snapshot)}</textarea>
    </div>
  `;
}

function renderDashboard() {
  const activeSection = sectionSchemas.find((section) => section.key === state.activePanel);
  const feedback = state.feedback
    ? `<div class="feedback ${state.feedback.type}">${escapeHtml(state.feedback.message)}</div>`
    : '';

  appNode.innerHTML = `
    <div class="shell layout">
      <aside class="sidebar">
        <div class="brand-chip">
          <strong>Onda Vital Admin</strong>
          <span>${escapeHtml(state.user?.username || 'Invitado')}</span>
        </div>
        <div class="nav">
          ${sectionSchemas
            .map(
              (section) => `
                <button data-action="open-panel" data-panel="${section.key}" class="${state.activePanel === section.key ? 'active' : ''}">
                  ${escapeHtml(section.label)}
                </button>
              `
            )
            .join('')}
          <button data-action="open-panel" data-panel="rooms" class="${state.activePanel === 'rooms' ? 'active' : ''}">Salas</button>
          <button data-action="open-panel" data-panel="bookings" class="${state.activePanel === 'bookings' ? 'active' : ''}">Reservas</button>
          <button data-action="open-panel" data-panel="snapshot" class="${state.activePanel === 'snapshot' ? 'active' : ''}">Snapshot</button>
        </div>
        <div class="sidebar-footer">
          <button class="ghost-btn" data-action="refresh-dashboard">Recargar datos</button>
          <button class="danger-btn" data-action="logout">Cerrar sesion</button>
        </div>
      </aside>
      <main class="main">
        <div class="topbar">
          <div>
            <h1>Panel de administracion</h1>
            <p>Modulo nuevo e independiente para editar contenido sin modificar archivos existentes.</p>
          </div>
        </div>
        ${feedback}
        ${renderOverview()}
        <div style="height: 18px"></div>
        ${activeSection ? renderSectionEditor(activeSection) : ''}
        ${state.activePanel === 'rooms' ? renderRoomsPanel() : ''}
        ${state.activePanel === 'bookings' ? renderBookingsPanel() : ''}
        ${state.activePanel === 'snapshot' ? renderSnapshotPanel() : ''}
      </main>
    </div>
  `;
}

function render() {
  if (!state.token) {
    renderLogin();
    return;
  }

  renderDashboard();
}

function handleInput(event) {
  const target = event.target;
  if (!target.matches('[data-root][data-path]')) {
    return;
  }

  const rootKey = target.dataset.root;
  const path = target.dataset.path;
  const root = getRootTarget(rootKey);

  if (!root) {
    return;
  }

  const nextValue = target.type === 'number' ? Number(target.value || 0) : target.value;
  setValueAtPath(root, path, nextValue);
}

function handleAddListItem(button) {
  const root = getRootTarget(button.dataset.root);
  const path = button.dataset.path;
  const current = getValueAtPath(root, path);
  const schema = getSchemaForRoot(button.dataset.root);
  const field = findFieldConfig(schema.fields, path.split('.'));

  if (!Array.isArray(current) || !field) {
    return;
  }

  if (button.dataset.kind === 'string-list') {
    current.push('');
  } else {
    current.push(createDefaultValue(field.fields || []));
  }

  render();
}

function handleRemoveListItem(button) {
  const root = getRootTarget(button.dataset.root);
  const path = button.dataset.path;
  const current = getValueAtPath(root, path);
  const index = Number(button.dataset.index);

  if (!Array.isArray(current)) {
    return;
  }

  current.splice(index, 1);
  render();
}

async function saveSection(sectionKey) {
  try {
    const payload = state.sections[sectionKey];
    await apiFetch(`/api/admin/sections/${sectionKey}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    setFeedback('success', 'Seccion guardada correctamente.');
  } catch (error) {
    setFeedback('error', error.message);
  }
}

async function saveRoom() {
  try {
    const payload = state.roomDraft;
    const path = state.roomDraftOriginalId
      ? `/api/admin/rooms/${state.roomDraftOriginalId}`
      : '/api/admin/rooms';
    const method = state.roomDraftOriginalId ? 'PUT' : 'POST';

    await apiFetch(path, {
      method,
      body: JSON.stringify(payload)
    });

    await loadDashboard();

    const matchingRoom = state.rooms.find((room) => room.id === payload.id) || state.rooms[0] || null;
    state.roomDraft = matchingRoom ? deepClone(matchingRoom) : getEmptyRoom();
    state.roomDraftOriginalId = matchingRoom ? matchingRoom.id : null;
    state.activePanel = 'rooms';
    setFeedback('success', 'Sala guardada correctamente.');
  } catch (error) {
    setFeedback('error', error.message);
  }
}

async function deleteRoom() {
  if (!state.roomDraftOriginalId) {
    return;
  }

  const confirmed = window.confirm('Esta accion eliminara la sala seleccionada. Continuar?');
  if (!confirmed) {
    return;
  }

  try {
    await apiFetch(`/api/admin/rooms/${state.roomDraftOriginalId}`, {
      method: 'DELETE'
    });

    await loadDashboard();
    state.activePanel = 'rooms';
    state.roomDraft = state.rooms[0] ? deepClone(state.rooms[0]) : getEmptyRoom();
    state.roomDraftOriginalId = state.rooms[0]?.id || null;
    setFeedback('success', 'Sala eliminada correctamente.');
  } catch (error) {
    setFeedback('error', error.message);
  }
}

async function updateBookingStatus(bookingId, status) {
  try {
    await apiFetch(`/api/admin/bookings/${bookingId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    await loadDashboard();
    state.activePanel = 'bookings';
    setFeedback('success', `Reserva actualizada a ${status}.`);
  } catch (error) {
    setFeedback('error', error.message);
  }
}

async function logout() {
  try {
    if (state.token) {
      await apiFetch('/api/auth/logout', { method: 'POST', body: JSON.stringify({}) });
    }
  } catch (error) {
    console.warn(error);
  } finally {
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

document.addEventListener('input', handleInput);

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) {
    return;
  }

  const action = button.dataset.action;

  if (action === 'open-panel') {
    state.activePanel = button.dataset.panel;
    if (state.activePanel === 'rooms' && !state.roomDraft) {
      state.roomDraft = state.rooms[0] ? deepClone(state.rooms[0]) : getEmptyRoom();
      state.roomDraftOriginalId = state.rooms[0]?.id || null;
    }
    clearFeedback();
    render();
    return;
  }

  if (action === 'logout') {
    await logout();
    return;
  }

  if (action === 'refresh-dashboard') {
    await loadDashboard();
    return;
  }

  if (action === 'add-list-item') {
    handleAddListItem(button);
    return;
  }

  if (action === 'remove-list-item') {
    handleRemoveListItem(button);
    return;
  }

  if (action === 'save-section') {
    await saveSection(button.dataset.section);
    return;
  }

  if (action === 'new-room') {
    state.roomDraft = getEmptyRoom();
    state.roomDraftOriginalId = null;
    clearFeedback();
    render();
    return;
  }

  if (action === 'edit-room') {
    const selected = state.rooms.find((room) => room.id === button.dataset.roomId);
    state.roomDraft = selected ? deepClone(selected) : getEmptyRoom();
    state.roomDraftOriginalId = selected?.id || null;
    clearFeedback();
    render();
    return;
  }

  if (action === 'save-room') {
    await saveRoom();
    return;
  }

  if (action === 'delete-room') {
    await deleteRoom();
    return;
  }

  if (action === 'set-booking-status') {
    await updateBookingStatus(button.dataset.bookingId, button.dataset.status);
  }
});

render();

if (state.token) {
  loadDashboard();
}
