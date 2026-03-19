# Despliegue en Railway

Guia revisada para Railway el 19 de marzo de 2026.

Este proyecto conviene desplegarlo como 3 servicios:

- `frontend`: web publica en React/Vite
- `backend`: API de formularios y reservas
- `agent_david`: agente web para el chat

He dejado un `railway.json` dentro de cada carpeta para que Railway tome el `build`, `start` y `healthcheck` desde el repo.

## 1. Sube el repo a GitHub

1. Crea un repositorio nuevo en GitHub.
2. Sube esta carpeta completa.
3. Comprueba que se vean las carpetas `frontend`, `backend` y `agent_david`.

## 2. Crea el proyecto en Railway

1. Entra en Railway.
2. Pulsa `New Project`.
3. Elige `Deploy from GitHub repo`.
4. Selecciona este repositorio.

## 3. Crea el servicio `backend`

1. Anade un servicio desde el mismo repo.
2. En `Settings > Source`, fija `Root Directory` a `backend`.
3. Si Railway no detecta el config file automaticamente, en `Settings > Config as Code` usa `/backend/railway.json`.
4. En `Variables`, crea:
   - `DB_PATH=/data/database.sqlite`
5. En `Volumes`, anade un volumen montado en `/data`.
6. En `Networking`, pulsa `Generate Domain`.
7. Guarda la URL publica del backend.

## 4. Crea el servicio `agent_david`

1. Anade otro servicio desde el mismo repo.
2. En `Settings > Source`, fija `Root Directory` a `agent_david`.
3. Si hace falta, en `Settings > Config as Code` usa `/agent_david/railway.json`.
4. En `Variables`, crea:
   - `ENABLE_WEB=true`
   - `ENABLE_DISCORD=false`
   - `DB_PATH=/data/memory.db`
   - `GROQ_API_KEY=tu_clave_real`
5. En `Volumes`, anade un volumen montado en `/data`.
6. En `Networking`, pulsa `Generate Domain`.
7. Guarda la URL publica del agente.

## 5. Crea el servicio `frontend`

1. Anade otro servicio desde el mismo repo.
2. En `Settings > Source`, fija `Root Directory` a `frontend`.
3. Si hace falta, en `Settings > Config as Code` usa `/frontend/railway.json`.
4. En `Variables`, crea:
   - `VITE_API_URL=https://URL-DEL-BACKEND`
   - `VITE_AGENT_URL=https://URL-DEL-AGENTE`
5. Despliega el servicio.
6. En `Networking`, pulsa `Generate Domain`.
7. Guarda la URL publica del frontend.

## 6. Ajusta CORS del agente

1. Vuelve al servicio `agent_david`.
2. Cambia o anade:
   - `WEB_CORS_ORIGIN=https://URL-DEL-FRONTEND`
3. Haz redeploy del agente.

## 7. Verificaciones finales

Comprueba estas rutas:

- Frontend: abre la URL publica
- Backend: `https://URL-DEL-BACKEND/api/status`
- Agente: `https://URL-DEL-AGENTE/health`

Luego prueba:

- enviar formulario de contacto
- enviar solicitud de reserva
- abrir el widget y mandar un mensaje

## 8. Problemas tipicos

- Si el frontend sigue llamando a `localhost`, revisa que `VITE_API_URL` y `VITE_AGENT_URL` esten puestas en Railway y vuelve a desplegar el frontend.
- Si el chat responde con error, normalmente falta `GROQ_API_KEY`.
- Si al redeploy desaparecen reservas o memoria, falta montar el `Volume` en `/data`.
- Si el servicio despliega pero no es accesible, entra en `Networking` y genera el dominio publico.
- Si el navegador bloquea el chat por CORS, revisa `WEB_CORS_ORIGIN` y que tenga exactamente la URL publica del frontend.
