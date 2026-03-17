# Despliegue en Railway

Este proyecto conviene desplegarlo como 3 servicios:

- `frontend`: web publica en React/Vite
- `backend`: API de formularios y reservas
- `agent_david`: agente web para el chat

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

1. En Railway, añade un servicio desde el mismo repo.
2. Configura:
   - `Root Directory`: `backend`
   - `Build Command`: `npm install`
   - `Start Command`: `npm start`
3. Variables:
   - `DB_PATH=/data/database.sqlite`
4. Añade un `Volume` y montalo en `/data`.
5. Cuando termine, copia la URL publica del backend.

## 4. Crea el servicio `agent_david`

1. Añade otro servicio desde el mismo repo.
2. Configura:
   - `Root Directory`: `agent_david`
   - `Build Command`: `npm install`
   - `Start Command`: `npm start`
3. Variables:
   - `ENABLE_WEB=true`
   - `ENABLE_DISCORD=false`
   - `DB_PATH=/data/memory.db`
   - `GROQ_API_KEY=tu_clave_real`
4. Añade un `Volume` y montalo en `/data`.
5. Despliega una primera vez.
6. Copia la URL publica del agente.

## 5. Crea el servicio `frontend`

1. Añade otro servicio desde el mismo repo.
2. Configura:
   - `Root Directory`: `frontend`
   - `Build Command`: `npm install && npm run build`
   - `Start Command`: `npm start`
3. Variables:
   - `VITE_API_URL=https://URL-DEL-BACKEND`
   - `VITE_AGENT_URL=https://URL-DEL-AGENTE`
4. Despliega y copia la URL publica del frontend.

## 6. Ajusta CORS del agente

1. Vuelve al servicio `agent_david`.
2. Cambia:
   - `WEB_CORS_ORIGIN=https://URL-DEL-FRONTEND`
3. Redeply del agente.

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
- Si el navegador bloquea el chat por CORS, revisa `WEB_CORS_ORIGIN` y que tenga exactamente la URL publica del frontend.
