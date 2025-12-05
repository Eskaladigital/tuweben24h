@echo off
echo ================================================
echo   Verificacion de Estado de Git
echo ================================================
echo.
echo === ULTIMOS COMMITS ===
git log --oneline -n 5
echo.
echo === ESTADO ACTUAL ===
git status
echo.
echo === ARCHIVOS NUEVOS CREADOS ===
if exist "GUIA-GIT-GITHUB.md" echo [OK] GUIA-GIT-GITHUB.md existe
if exist "GIT-CHEATSHEET.md" echo [OK] GIT-CHEATSHEET.md existe
if exist "RESUMEN-ACTUALIZACION-GIT.md" echo [OK] RESUMEN-ACTUALIZACION-GIT.md existe
echo.
pause
