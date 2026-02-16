# Script para hacer commit y push a main
Set-Location "C:\Users\Usuario\Desktop\tuweben24h.com"

# Configurar remoto si no existe
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    git remote add origin https://github.com/Eskaladigital/tuweben24h.git
} else {
    git remote set-url origin https://github.com/Eskaladigital/tuweben24h.git
}

# Añadir todo, commit y push
git add -A
git status
git commit -m "TuWebEn24h - Proyecto completo: landing, formulario, widget WhatsApp, Supabase, RLS"
git push -u origin main

Write-Host "Listo. Revisa la salida anterior."

