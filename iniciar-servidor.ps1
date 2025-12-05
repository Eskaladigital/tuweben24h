# Script para iniciar servidor en nueva ventana de PowerShell

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  INICIANDO SERVIDOR DE DESARROLLO" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Cambiar al directorio del proyecto
$projectPath = "C:\Users\Usuario\Desktop\tuweben24h.com"
Set-Location $projectPath

Write-Host "[1/3] Cerrando procesos Node.js existentes..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Write-Host "   - Procesos cerrados" -ForegroundColor Green
Write-Host ""

Write-Host "[2/3] Limpiando cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   - Cache limpiada" -ForegroundColor Green
} else {
    Write-Host "   - No hay cache" -ForegroundColor Green
}
Write-Host ""

Write-Host "[3/3] Iniciando servidor..." -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Servidor en http://localhost:3000" -ForegroundColor Green
Write-Host "  Presiona Ctrl+C para detener" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Iniciar npm run dev
npm run dev

