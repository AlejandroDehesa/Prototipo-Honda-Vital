@echo off
set ROOT=C:\Users\DAM\Desktop\prototipo_onda_vital

start "OndaVital Backend" cmd /k "cd /d %ROOT%\backend && node app.js"
start "OndaVital Frontend" cmd /k "cd /d %ROOT%\frontend && npm run dev"
start "OndaVital David Agent" cmd /k "cd /d %ROOT%\agent_david && npm run dev"
start "OndaVital Admin Panel" cmd /k "cd /d %ROOT% && node backend\admin_panel\server.js"
start "OndaVital Admin Facil" cmd /k "cd /d %ROOT% && node backend\admin_panel_facil\server.js"

timeout /t 5 /nobreak >nul
start "" http://localhost:5173
start "" http://localhost:5051
start "" http://localhost:5052

echo.
echo Servicios lanzados.
echo Se han abierto las pestanas del navegador.
echo Frontend: http://localhost:5173
echo Panel admin avanzado: http://localhost:5051
echo Panel admin facil: http://localhost:5052
echo.
pause
