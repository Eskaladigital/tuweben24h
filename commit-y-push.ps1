# Script para hacer commit y push
# Guardar salida en archivo

$outputFile = "resultado-git.txt"

"================================================" | Out-File $outputFile
"COMMIT Y PUSH - $(Get-Date)" | Out-File $outputFile -Append
"================================================" | Out-File $outputFile -Append
"" | Out-File $outputFile -Append

"=== ESTADO ANTES ===" | Out-File $outputFile -Append
git status | Out-File $outputFile -Append
"" | Out-File $outputFile -Append

"=== AGREGANDO ARCHIVOS ===" | Out-File $outputFile -Append
git add -A 2>&1 | Out-File $outputFile -Append
"" | Out-File $outputFile -Append

"=== HACIENDO COMMIT ===" | Out-File $outputFile -Append
git commit -m "Add: Guías completas de Git/GitHub y documentación actualizada" 2>&1 | Out-File $outputFile -Append
"" | Out-File $outputFile -Append

"=== PUSH A GITHUB ===" | Out-File $outputFile -Append
git push origin main 2>&1 | Out-File $outputFile -Append
"" | Out-File $outputFile -Append

"=== LOG FINAL ===" | Out-File $outputFile -Append
git log --oneline -n 5 | Out-File $outputFile -Append
"" | Out-File $outputFile -Append

"=== ESTADO FINAL ===" | Out-File $outputFile -Append
git status | Out-File $outputFile -Append

Write-Host "Resultado guardado en: $outputFile"
Write-Host "Abre ese archivo para ver los resultados"

