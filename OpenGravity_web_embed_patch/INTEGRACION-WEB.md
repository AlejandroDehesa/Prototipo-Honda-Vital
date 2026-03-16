# Integración web mínima de OpenGravity

Este paquete mantiene tu agente tal como está y solo añade una capa web simple.

## Qué se ha añadido

- `src/web.ts`
  - expone `POST /api/agent/chat`
  - expone `GET /health`
  - sirve el preview del widget en `/widget`
- `src/index.ts`
  - ahora puede arrancar Discord, web o ambas cosas con variables de entorno
- `web-widget/chat-widget.js`
  - widget flotante reutilizable para pegar dentro de tu web
- `web-widget/chat-widget.css`
  - estilos del widget
- `web-widget/index.html`
  - preview local del widget

## Variables de entorno nuevas

Añade estas a tu `.env` del proyecto donde vive el agente:

```env
ENABLE_DISCORD=true
ENABLE_WEB=true
WEB_PORT=3001
WEB_CORS_ORIGIN=*
WEB_STATIC_DIR=web-widget
```

## Cómo probar el agente por web sin tocar tu proyecto principal todavía

1. Copia `src/web.ts` dentro de tu proyecto del agente.
2. Sustituye `src/index.ts` por la versión incluida.
3. Copia la carpeta `web-widget/`.
4. Enciende el agente:

```bash
npm run dev
```

5. Abre:

```text
http://localhost:3001/widget
```

Si responde, la parte web ya está bien.

## Cómo meterlo dentro de tu web actual

### Opción más simple

Copia estos dos archivos a tu proyecto web:

- `web-widget/chat-widget.js`
- `web-widget/chat-widget.css`

Y luego añade esto en tu HTML principal antes de cerrar `</body>`:

```html
<link rel="stylesheet" href="/ruta/chat-widget.css" />
<script>
  window.OPEN_GRAVITY_CONFIG = {
    endpoint: 'http://localhost:3001/api/agent/chat',
    title: 'OpenGravity',
    subtitle: 'Asistente IA',
    placeholder: 'Escribe tu mensaje...',
    launcherLabel: 'Chat',
    welcomeMessage: 'Hola. Soy el mismo agente que ya usabas en Discord.'
  };
</script>
<script type="module" src="/ruta/chat-widget.js"></script>
```

### Si tu web y el agente están en dominios distintos

Pon en el `.env` del agente:

```env
WEB_CORS_ORIGIN=https://tu-dominio.com
```

## Flujo exacto que queda

- Tu página carga el widget
- El widget envía mensajes a `/api/agent/chat`
- `src/web.ts` llama a `agentLoop(sessionId, message)`
- tu agente responde usando la misma memoria SQLite y las mismas tools

## Importante

- no se ha tocado `agent.ts`
- no se ha tocado `db.ts`
- no se ha tocado la lógica de tools
- Discord puede seguir funcionando igual

## Recomendación práctica

Primero haz que funcione el preview en `http://localhost:3001/widget`.
Después lo metemos dentro de tu página real.
