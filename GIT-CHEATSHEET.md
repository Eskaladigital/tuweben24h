# 🚀 Git Cheat Sheet - Referencia Rápida

**Para usar cuando tengas prisa y necesites recordar comandos rápido**

---

## ⚡ Los 5 Comandos Más Usados

```powershell
# 1. Ver qué cambió
git status

# 2. Agregar todo
git add -A

# 3. Hacer commit
git commit -m "Update: Descripción"

# 4. Subir a GitHub
git push origin main

# 5. Ver historial
git log --oneline -n 5
```

---

## 🎯 Flujo Completo en 1 Línea

```powershell
git add -A && git commit -m "Update: Cambios realizados" && git push origin main && git status
```

---

## 📝 Mensajes de Commit Rápidos

```powershell
git commit -m "Add: Nueva funcionalidad"
git commit -m "Update: Mejorar diseño"
git commit -m "Fix: Corregir bug en formulario"
git commit -m "Remove: Eliminar código obsoleto"
git commit -m "Docs: Actualizar documentación"
```

---

## 🔄 Actualizar desde GitHub

```powershell
git pull origin main
```

---

## 👀 Ver Cambios

```powershell
# Ver qué cambió (sin agregar)
git diff

# Ver qué cambió (agregado al staging)
git diff --staged

# Ver últimos commits
git log --oneline -n 10
```

---

## ⏪ Deshacer Cambios

```powershell
# Deshacer cambios en archivo (sin commit)
git restore archivo.txt

# Quitar del staging (mantener cambios)
git restore --staged archivo.txt

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1
```

---

## 🌿 Ramas Básicas

```powershell
# Crear y cambiar a rama nueva
git checkout -b nombre-rama

# Volver a main
git checkout main

# Fusionar rama
git merge nombre-rama

# Eliminar rama
git branch -d nombre-rama
```

---

## 🔍 Información del Repo

```powershell
# URL del repositorio
git remote -v

# Ver todas las ramas
git branch -a

# Ver configuración
git config --list
```

---

## 🆘 Problemas Comunes

### Estás atrasado respecto a GitHub
```powershell
git pull origin main
```

### Olvidaste agregar archivo al commit
```powershell
git add archivo.txt
git commit --amend --no-edit
```

### Quieres ver si hay cambios en GitHub
```powershell
git fetch origin
git status
```

---

## 💡 Tip Pro

### Crea alias en PowerShell para ir más rápido:

Edita: `notepad $PROFILE`

```powershell
function gs { git status }
function ga { git add -A }
function gc { param($msg) git commit -m $msg }
function gp { git push origin main }
function gl { git log --oneline -n 10 }
```

Luego solo escribe: `gs`, `ga`, `gc "mensaje"`, `gp`, `gl`

---

**📚 Para más detalles, consulta: GUIA-GIT-GITHUB.md**

**🔗 Repo:** https://github.com/davigo33/tuweben24h.com









