# 📘 Guía Completa de Git y GitHub para TuWebEn24h.com

**Última actualización**: 5 de Diciembre de 2025

---

## 🎯 Resumen Rápido (Comandos Esenciales)

### ✅ Para hacer commit y push (lo más común)

```powershell
# 1. Ver qué archivos han cambiado
git status

# 2. Agregar TODOS los cambios
git add -A

# 3. Hacer commit con mensaje descriptivo
git commit -m "Update: Descripción clara de los cambios"

# 4. Subir a GitHub
git push origin main

# 5. Verificar que se subió correctamente
git log --oneline -n 3
```

### ⚡ Comando Todo-en-Uno (para hacer todo de una vez)

```powershell
git add -A && git commit -m "Update: Descripción de cambios" && git push origin main && git status
```

---

## 📚 Guía Detallada Paso a Paso

### 1️⃣ Ver el Estado Actual

Antes de hacer cualquier cosa, **SIEMPRE** verifica el estado:

```powershell
git status
```

**Esto te mostrará:**
- ✅ Archivos modificados (en rojo = sin agregar)
- ✅ Archivos listos para commit (en verde = staged)
- ✅ Archivos nuevos sin seguimiento (untracked)
- ✅ Si estás actualizado con GitHub

---

### 2️⃣ Agregar Archivos al Staging

**Opción 1: Agregar TODO** (recomendado)
```powershell
git add -A
```

**Opción 2: Agregar solo archivos específicos**
```powershell
git add archivo.txt
git add carpeta/
```

**Opción 3: Agregar todos los archivos modificados**
```powershell
git add .
```

---

### 3️⃣ Hacer Commit

**Commit con mensaje en una línea** (recomendado)
```powershell
git commit -m "Update: Descripción clara y concisa"
```

**Ejemplos de buenos mensajes:**
```powershell
git commit -m "Fix: Corregir error en formulario de contacto"
git commit -m "Update: Mejorar diseño del Hero y Navbar"
git commit -m "Add: Agregar componente de WhatsApp"
git commit -m "Remove: Eliminar código obsoleto del dashboard"
git commit -m "Docs: Actualizar README con nuevas instrucciones"
```

**❌ EVITAR mensajes vagos:**
```powershell
# MAL
git commit -m "cambios"
git commit -m "update"
git commit -m "fix"
```

---

### 4️⃣ Subir a GitHub (Push)

```powershell
git push origin main
```

**Si es tu primer push en este proyecto:**
```powershell
git push -u origin main
```

---

### 5️⃣ Verificar que Todo se Subió

```powershell
# Ver los últimos 3 commits
git log --oneline -n 3

# Ver el estado (debería decir "nothing to commit")
git status
```

---

## 🔥 Comandos Útiles del Día a Día

### Ver Historial de Commits
```powershell
# Últimos 5 commits en una línea
git log --oneline -n 5

# Historial completo
git log

# Historial con gráfico
git log --graph --oneline --all
```

### Ver Diferencias (Qué Cambió)
```powershell
# Ver cambios no agregados (working directory)
git diff

# Ver cambios agregados al staging
git diff --staged

# Ver cambios en un archivo específico
git diff archivo.txt
```

### Deshacer Cambios

**Deshacer cambios NO guardados en un archivo**
```powershell
git restore archivo.txt
```

**Quitar archivo del staging (pero mantener cambios)**
```powershell
git restore --staged archivo.txt
```

**Deshacer el último commit (pero mantener cambios)**
```powershell
git reset --soft HEAD~1
```

**⚠️ CUIDADO: Deshacer todo y perder cambios**
```powershell
git reset --hard HEAD
```

---

## 🌿 Trabajar con Ramas (Branches)

### Crear y Usar Ramas
```powershell
# Ver ramas actuales
git branch

# Crear rama nueva
git branch feature/nueva-funcionalidad

# Cambiar a esa rama
git checkout feature/nueva-funcionalidad

# Crear y cambiar en un solo comando
git checkout -b feature/nueva-funcionalidad
```

### Fusionar Ramas (Merge)
```powershell
# Volver a main
git checkout main

# Fusionar la rama
git merge feature/nueva-funcionalidad

# Eliminar la rama después de fusionar
git branch -d feature/nueva-funcionalidad
```

---

## 🔄 Actualizar desde GitHub (Pull)

```powershell
# Traer cambios desde GitHub y fusionar
git pull origin main

# Solo descargar sin fusionar
git fetch origin
```

---

## 🆘 Solución de Problemas Comunes

### ❌ Error: "Your branch is behind 'origin/main'"
**Solución:**
```powershell
git pull origin main
```

### ❌ Error: "fatal: not a git repository"
**Solución:** Estás en la carpeta equivocada
```powershell
cd C:\Users\Usuario\Desktop\tuweben24h.com
```

### ❌ Error: Conflictos al hacer merge
**Solución:**
1. Abre los archivos con conflictos
2. Busca las marcas `<<<<<<<`, `=======`, `>>>>>>>`
3. Edita y elige qué código mantener
4. Guarda el archivo
5. Haz commit:
```powershell
git add archivo-con-conflicto.txt
git commit -m "Fix: Resolver conflictos de merge"
```

### ❌ Olvidé agregar archivos al último commit
**Solución:**
```powershell
git add archivo-olvidado.txt
git commit --amend --no-edit
git push origin main --force
```

### ❌ Quiero ver qué hay en GitHub sin descargar
**Solución:**
```powershell
git fetch origin
git log origin/main
```

---

## 📊 Ver Estado del Repositorio

### Ver Información del Remoto
```powershell
# Ver URL del repositorio en GitHub
git remote -v

# Ver diferencias con GitHub
git fetch origin
git status
```

### Ver Qué Commits Están en GitHub pero no Localmente
```powershell
git fetch origin
git log HEAD..origin/main
```

### Ver Qué Commits Tienes Localmente pero no en GitHub
```powershell
git log origin/main..HEAD
```

---

## 🎨 Configuración Inicial (Solo Una Vez)

### Configurar Nombre y Email
```powershell
git config --global user.name "Narciso Pardo Buendía"
git config --global user.email "narciso.pardo@outlook.com"
```

### Ver Configuración Actual
```powershell
git config --list
```

### Configurar Editor por Defecto
```powershell
# Usar VS Code
git config --global core.editor "code --wait"

# Usar Notepad
git config --global core.editor "notepad"
```

---

## 🔐 Autenticación con GitHub

### Usar Token Personal (Recomendado)
1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Genera un token con permisos `repo`
3. Úsalo como contraseña cuando hagas `push`

### Guardar Credenciales (para no introducirlas siempre)
```powershell
git config --global credential.helper store
```

---

## 📝 Convenciones de Mensajes de Commit

### Prefijos Recomendados:
- `Add:` - Agregar nueva funcionalidad
- `Update:` - Actualizar funcionalidad existente
- `Fix:` - Corregir un bug
- `Remove:` - Eliminar código/archivos
- `Refactor:` - Reestructurar código sin cambiar funcionalidad
- `Docs:` - Cambios en documentación
- `Style:` - Cambios de formato (espacios, comas, etc)
- `Test:` - Agregar o modificar tests
- `Chore:` - Tareas de mantenimiento

### Ejemplos Completos:
```
Add: Implementar sistema de autenticación con Supabase
Update: Mejorar diseño responsive del Hero y CTA
Fix: Corregir error 500 en formulario de solicitudes
Remove: Eliminar componentes obsoletos del dashboard
Refactor: Reorganizar estructura de carpetas del proyecto
Docs: Actualizar README con instrucciones de deploy
Style: Aplicar formato consistente con Prettier
Test: Agregar tests unitarios para utilidades
Chore: Actualizar dependencias de npm
```

---

## 🚀 Flujo de Trabajo Diario Recomendado

### Inicio del Día:
```powershell
# 1. Actualizar desde GitHub
git pull origin main

# 2. Ver estado
git status
```

### Durante el Desarrollo:
```powershell
# Cada vez que completes una funcionalidad pequeña
git add -A
git commit -m "Update: Descripción clara"
```

### Fin del Día (o al terminar funcionalidad):
```powershell
# 1. Verificar cambios
git status
git log --oneline -n 3

# 2. Subir a GitHub
git push origin main

# 3. Confirmar
git status
```

---

## 🔍 Comandos de Inspección Avanzados

### Ver Quién Modificó Cada Línea
```powershell
git blame archivo.txt
```

### Buscar en el Historial
```powershell
# Buscar por mensaje de commit
git log --grep="bug"

# Buscar por autor
git log --author="Narciso"

# Buscar cambios en una función específica
git log -S "funcionBuscada"
```

### Ver Cambios de un Commit Específico
```powershell
git show ac30ea0
```

---

## 📦 Trabajar con .gitignore

### Agregar Archivos a Ignorar
Edita `.gitignore` y agrega:
```
# Dependencias
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Variables de entorno
.env
.env.local
.env*.local

# Logs
*.log

# Sistema operativo
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

### Dejar de Seguir Archivo ya Trackeado
```powershell
git rm --cached archivo.txt
git commit -m "Remove: Dejar de trackear archivo.txt"
```

---

## 🎯 Atajos de PowerShell Útiles

### Crear Alias en PowerShell
Edita tu perfil: `notepad $PROFILE`

Agrega estos alias:
```powershell
function gs { git status }
function ga { git add -A }
function gc { param($msg) git commit -m $msg }
function gp { git push origin main }
function gl { git log --oneline -n 10 }
function gd { git diff }
```

Ahora puedes usar:
```powershell
gs           # = git status
ga           # = git add -A
gc "mensaje" # = git commit -m "mensaje"
gp           # = git push origin main
gl           # = git log --oneline -n 10
gd           # = git diff
```

---

## 🔗 Enlaces Útiles

- **Repositorio GitHub**: https://github.com/davigo33/tuweben24h.com
- **Documentación Git oficial**: https://git-scm.com/doc
- **GitHub Docs**: https://docs.github.com
- **Visualizador interactivo**: https://git-school.github.io/visualizing-git/

---

## 📞 Soporte

Si tienes dudas sobre Git o GitHub:
1. Consulta esta guía
2. Usa `git help <comando>` (ej: `git help commit`)
3. Verifica en GitHub si los cambios se subieron correctamente

---

**¡Con esta guía nunca más tendrás problemas con Git y GitHub! 🚀**

*Creado el: 5 de Diciembre de 2025*  
*Última actualización: 5 de Diciembre de 2025*
