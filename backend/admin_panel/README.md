# Panel Admin Onda Vital

Este modulo crea un panel de administracion independiente para editar contenido del sitio sin tocar archivos existentes.

## Que incluye

- Login sencillo con usuario y contrasena.
- Edicion de textos de la home, contacto, alquiler y condiciones.
- CRUD completo de salas.
- Gestion de reservas guardadas en `database.sqlite`.
- Endpoint publico con snapshot de contenido en `/api/public/content-bundle`.

## Archivos nuevos

- `backend/admin_panel/server.js`
- `backend/admin_panel/defaultContent.js`
- `backend/admin_panel/public/*`

## Como arrancarlo

1. Copia `backend/admin_panel/.env.example` a `backend/admin_panel/.env`.
2. Cambia `ADMIN_PANEL_USER` y `ADMIN_PANEL_PASSWORD`.
3. Ejecuta:

```powershell
node backend/admin_panel/server.js
```

4. Abre:

```text
http://localhost:5051
```

## Importante

- El panel ya funciona y guarda datos reales en `database.sqlite`.
- La web actual todavia no lee este contenido porque no se ha permitido modificar archivos existentes.
- Cuando se permita integrar la web, el endpoint listo para consumir es:

```text
http://localhost:5051/api/public/content-bundle
```
