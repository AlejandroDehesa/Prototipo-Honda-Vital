# Integracion del agente David

La web actual ya carga el widget de chat desde `frontend/index.html` y el widget apunta a:

`http://localhost:3001/api/agent/chat`

Para que el chat funcione con la personalidad inspirada en David Biddle, el servicio integrado en este proyecto es:

`agent_david`

## Arranque

1. Backend web:

```bash
cd backend
npm run dev
```

2. Frontend:

```bash
cd frontend
npm run dev
```

3. Agente David:

```bash
cd agent_david
npm run dev
```

## Archivos clave

- `agent_david/src/persona.ts`
  Define la identidad y la voz del agente.
- `agent_david/src/examples.ts`
  Incluye ejemplos de estilo para fijar mejor el tono.
- `agent_david/src/web.ts`
  Expone `POST /api/agent/chat`.
- `frontend/public/chat-widget.js`
  Widget que habla con el agente en el puerto `3001`.

## Nota

El agente esta configurado para web con `ENABLE_WEB=true` y `ENABLE_DISCORD=false` en `agent_david/.env`.
