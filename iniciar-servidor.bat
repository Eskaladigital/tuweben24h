@echo off
echo ================================================
echo   REINICIANDO SERVIDOR DE DESARROLLO
echo ================================================
echo.

echo [1/4] Cerrando procesos Node.js...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel%==0 (echo   - Procesos Node cerrados) else (echo   - No habia procesos Node activos)

echo.
echo [2/4] Limpiando cache de Next.js...
if exist ".next" (
    rmdir /s /q ".next"
    echo   - Cache limpiada
) else (
    echo   - No hay cache para limpiar
)

echo.
echo [3/4] Verificando dependencias...
if exist "node_modules" (
    echo   - Dependencias OK
) else (
    echo   - Instalando dependencias...
    call npm install
)

echo.
echo [4/4] Iniciando servidor de desarrollo...
echo.
echo ================================================
echo   Servidor corriendo en http://localhost:3000
echo   Presiona Ctrl+C para detener
echo ================================================
echo.

npm run dev

