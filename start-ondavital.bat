@echo off
set ROOT=C:\Users\DAM\Desktop\prototipo_onda_vital

start "OndaVital Backend" cmd /k "cd /d %ROOT%\backend && node app.js"
start "OndaVital Frontend" cmd /k "cd /d %ROOT%\frontend && npm run dev"
start "OndaVital David Agent" cmd /k "cd /d %ROOT%\agent_david && npm run dev"

echo.
echo Servicios lanzados.
echo Abre la URL que te muestre Vite para el frontend, normalmente http://localhost:5173
echo.
pause
