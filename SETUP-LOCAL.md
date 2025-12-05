# 🚀 Setup Local - Inicio Rápido

## ⚠️ IMPORTANTE: Crear .env.local

El servidor está corriendo pero **NECESITAS crear el archivo `.env.local`** para que funcione con Supabase.

### 📝 Paso 1: Crear el archivo

Crea un archivo llamado `.env.local` en la raíz del proyecto:

```
C:\Users\NARCISOPARDOBUENDA\Desktop\tuweben24h.com\.env.local
```

### 📋 Paso 2: Copiar este contenido

Copia y pega esto en el archivo `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 🔑 Paso 3: Obtener tus credenciales

#### Opción A: Si ya tienes un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión
3. Abre tu proyecto
4. Ve a **Settings** → **API**
5. Copia estos valores:
   - **Project URL** → Reemplaza `https://tu-proyecto.supabase.co`
   - **anon/public key** → Reemplaza `tu-anon-key-aqui`

#### Opción B: Si NO tienes proyecto aún

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta (gratis)
3. Click en "New Project"
4. Completa:
   - **Name:** tuweben24h
   - **Database Password:** (guárdala bien)
   - **Region:** Elige el más cercano
5. Click "Create new project"
6. Espera 2-3 minutos a que se inicialice
7. Ve a **Settings** → **API**
8. Copia las credenciales (como en Opción A)

### 🗄️ Paso 4: Ejecutar el SQL

Una vez tengas tu proyecto de Supabase:

1. Ve a **SQL Editor** en el panel de Supabase
2. Click en "New query"
3. Abre el archivo `supabase-schema.sql` de este proyecto
4. Copia TODO el contenido
5. Pégalo en el editor SQL de Supabase
6. Click en "Run" o presiona Ctrl+Enter
7. Verifica que se crearon las tablas en **Table Editor**

### ✅ Paso 5: Reiniciar el servidor

Una vez hayas creado el `.env.local` con las credenciales correctas:

```powershell
# Detener el servidor actual (Ctrl+C en la terminal)
# Luego ejecutar:
npm run dev
```

---

## 🌐 URLs del Proyecto

Una vez el servidor esté corriendo con las credenciales correctas:

### Públicas:
- **Landing:** http://localhost:3000
- **Solicitar:** http://localhost:3000/solicitar
- **Blog:** http://localhost:3000/blog
- **Login Cliente:** http://localhost:3000/cliente/login

### Admin (requiere login):
- **Login Admin:** http://localhost:3000/admin/login
  - Email: `narciso.pardo@outlook.com`
  - Contraseña: `14356830_Np@`
- **Dashboard:** http://localhost:3000/admin
- **Gestión Blog:** http://localhost:3000/admin/blog

---

## 🧪 Pruebas Rápidas

### 1. Probar sin Supabase (solo UI)

Si aún no tienes Supabase configurado, puedes probar:
- ✅ Landing page: http://localhost:3000
- ✅ Formulario (no guardará): http://localhost:3000/solicitar
- ✅ Login admin (UI): http://localhost:3000/admin/login

### 2. Probar con Supabase

Una vez configurado `.env.local` y ejecutado el SQL:
- ✅ Crear solicitud completa
- ✅ Ver solicitudes en dashboard admin
- ✅ Gestionar proyecto completo
- ✅ Acceso como cliente
- ✅ Crear posts de blog

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
```powershell
npm install
```

### Error: "Invalid Supabase URL" o similar
```
1. Verifica que el .env.local existe
2. Verifica que las credenciales son correctas
3. Reinicia el servidor (Ctrl+C y npm run dev)
```

### El servidor no inicia
```powershell
# Matar procesos en puerto 3000
npx kill-port 3000

# Volver a iniciar
npm run dev
```

### No veo las tablas en Supabase
```
1. Ve a SQL Editor
2. Verifica que no hay errores en rojo
3. Ejecuta el SQL de nuevo
4. Ve a Table Editor y actualiza la página
```

---

## 📊 Estado Actual

### ✅ Completado:
- Código instalado
- Dependencias instaladas
- Servidor corriendo en background
- Documentación completa

### ⏳ Por hacer:
1. Crear archivo `.env.local` (TÚ)
2. Configurar proyecto Supabase (TÚ)
3. Ejecutar SQL en Supabase (TÚ)
4. Reiniciar servidor
5. Probar todo

---

## 🎯 Checklist de Inicio

- [ ] Archivo `.env.local` creado
- [ ] Credenciales de Supabase agregadas
- [ ] SQL ejecutado en Supabase
- [ ] Servidor reiniciado
- [ ] Landing page carga: http://localhost:3000
- [ ] Admin login funciona: http://localhost:3000/admin/login
- [ ] Dashboard admin carga
- [ ] Puedo crear una solicitud
- [ ] Veo la solicitud en admin

---

## 💡 Orden Recomendado de Pruebas

1. **Sin BD:** Prueba la UI
   ```
   http://localhost:3000 → Ver landing
   http://localhost:3000/admin/login → Ver login
   ```

2. **Con BD:** Funcionalidad completa
   ```
   /solicitar → Crear solicitud
   /admin → Ver solicitudes
   /admin/proyecto/[id] → Gestionar
   /cliente/login → Acceso cliente
   /admin/blog/nuevo → Crear post
   /blog → Ver blog
   ```

---

## 🆘 Ayuda

Si tienes problemas:

1. **Revisa la consola del navegador** (F12)
2. **Revisa la terminal** donde corre el servidor
3. **Consulta:**
   - [INSTALACION-RAPIDA.md](./INSTALACION-RAPIDA.md)
   - [CREDENCIALES-ADMIN.md](./CREDENCIALES-ADMIN.md)
4. **Verifica:**
   - Que el servidor está corriendo
   - Que el `.env.local` existe y tiene credenciales
   - Que el SQL se ejecutó correctamente

---

**¡Sigue estos pasos y tendrás todo funcionando! 🚀**


