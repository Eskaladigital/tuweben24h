# 🗄️ Guía Completa: Configuración de Supabase

Guía paso a paso para configurar tu base de datos en Supabase para tuweben24h.com

---

## 📋 Índice

1. [Crear cuenta y proyecto en Supabase](#1-crear-cuenta-y-proyecto-en-supabase)
2. [Ejecutar el esquema SQL](#2-ejecutar-el-esquema-sql)
3. [Obtener credenciales de API](#3-obtener-credenciales-de-api)
4. [Configurar variables de entorno](#4-configurar-variables-de-entorno)
5. [Verificar configuración](#5-verificar-configuración)
6. [Crear usuario administrador](#6-crear-usuario-administrador)

---

## 1. Crear cuenta y proyecto en Supabase

### Paso 1.1: Acceder a Supabase

1. Ve a **[https://supabase.com](https://supabase.com)**
2. Haz clic en **"Start your project"** o **"Sign in"** si ya tienes cuenta
3. Inicia sesión con GitHub, Google o crea una cuenta con email

### Paso 1.2: Crear nuevo proyecto

1. Una vez dentro del dashboard, haz clic en **"New Project"**
2. Completa el formulario:
   - **Name:** `tuweben24h` (o el nombre que prefieras)
   - **Database Password:** 
     - ⚠️ **IMPORTANTE:** Guarda esta contraseña en un lugar seguro
     - Debe tener al menos 8 caracteres
     - Usa mayúsculas, minúsculas, números y símbolos
   - **Region:** Elige la región más cercana a tus usuarios
     - Para España: `West EU (Ireland)` o `Central EU (Frankfurt)`
3. Haz clic en **"Create new project"**
4. ⏳ Espera 2-3 minutos mientras se inicializa el proyecto

---

## 2. Ejecutar el esquema SQL

### Paso 2.1: Abrir el SQL Editor

1. En el panel izquierdo de Supabase, haz clic en **"SQL Editor"**
2. Haz clic en **"New query"** (botón verde en la parte superior)

### Paso 2.2: Copiar el esquema SQL

1. Abre el archivo `supabase-schema.sql` de tu proyecto
2. Selecciona **TODO** el contenido (Ctrl+A)
3. Copia el contenido (Ctrl+C)

### Paso 2.3: Ejecutar el SQL

1. Pega el contenido en el editor SQL de Supabase (Ctrl+V)
2. Haz clic en **"Run"** o presiona **Ctrl+Enter**
3. Deberías ver un mensaje de éxito: ✅ **"Success. No rows returned"**

### Paso 2.4: Verificar tablas creadas

1. En el panel izquierdo, haz clic en **"Table Editor"**
2. Deberías ver estas tablas creadas:
   - ✅ `solicitudes` - Solicitudes de clientes
   - ✅ `proyecto_eventos` - Timeline de proyectos
   - ✅ `proyecto_archivos` - Archivos de proyectos
   - ✅ `mensajes` - Sistema de chat
   - ✅ `clientes` - Registro de clientes
   - ✅ `blog_posts` - Posts del blog
   - ✅ `email_templates` - Plantillas de email
   - ✅ `email_log` - Historial de emails
   - ✅ `configuracion` - Configuración del sitio

---

## 3. Obtener credenciales de API

### Paso 3.1: Acceder a la configuración de API

1. En el panel izquierdo, haz clic en **"Settings"** (⚙️)
2. Haz clic en **"API"** en el submenú

### Paso 3.2: Copiar las credenciales

Necesitarás estas dos credenciales:

1. **Project URL**
   - Se encuentra en la sección "Project URL"
   - Ejemplo: `https://xxxxxxxxxxxxx.supabase.co`
   - Haz clic en el ícono de copiar 📋

2. **anon public key**
   - Se encuentra en la sección "Project API keys"
   - Busca la clave **"anon"** o **"public"**
   - Haz clic en el ícono de copiar 📋
   - ⚠️ **NO** uses la clave "service_role" (es privada)

---

## 4. Configurar variables de entorno

### Paso 4.1: Crear/editar archivo .env.local

1. En la raíz de tu proyecto (`C:\Users\Usuario\Desktop\tuweben24h.com`)
2. Abre o crea el archivo `.env.local`
3. Si no existe, créalo con este contenido:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Paso 4.2: Reemplazar con tus credenciales

Reemplaza los valores con los que copiaste en el paso 3:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Ejemplo real:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODU2Nzg5MCwiZXhwIjoxOTU0MTQzODkwfQ.abcdefghijklmnopqrstuvwxyz1234567890
```

### Paso 4.3: Guardar el archivo

1. Guarda el archivo (Ctrl+S)
2. ⚠️ **IMPORTANTE:** Asegúrate de que el archivo se llama exactamente `.env.local` (con el punto al inicio)

---

## 5. Verificar configuración

### Paso 5.1: Reiniciar el servidor

Si tienes el servidor corriendo:

1. Detén el servidor (Ctrl+C en la terminal)
2. Inicia el servidor nuevamente:
   ```powershell
   npm run dev
   ```

### Paso 5.2: Probar la conexión

1. Abre tu navegador en `http://localhost:3000`
2. Ve a la página de solicitud: `http://localhost:3000/solicitar`
3. Completa el formulario de prueba
4. Envía la solicitud

### Paso 5.3: Verificar en Supabase

1. Ve a Supabase → **Table Editor** → **solicitudes**
2. Deberías ver tu solicitud de prueba en la tabla
3. ✅ Si aparece, ¡la configuración está correcta!

---

## 6. Crear usuario administrador

### Paso 6.1: Habilitar autenticación por email

1. En Supabase, ve a **Authentication** → **Providers**
2. Asegúrate de que **Email** esté habilitado
3. Opcionalmente configura:
   - **Confirm email:** Desactivado (para desarrollo) o Activado (producción)
   - **Secure email change:** Activado

### Paso 6.2: Crear usuario admin

1. Ve a **Authentication** → **Users**
2. Haz clic en **"Add user"** → **"Create new user"**
3. Completa:
   - **Email:** tu-email@ejemplo.com
   - **Password:** (elige una contraseña segura)
   - **Auto Confirm User:** ✅ Activado (para desarrollo)
4. Haz clic en **"Create user"**

### Paso 6.3: Verificar acceso admin

1. Ve a `http://localhost:3000/admin/login`
2. Inicia sesión con el email y contraseña que creaste
3. Deberías poder acceder al panel de administración

---

## ✅ Checklist de Verificación

Marca cada paso cuando lo completes:

- [ ] Proyecto creado en Supabase
- [ ] Esquema SQL ejecutado correctamente
- [ ] Todas las tablas visibles en Table Editor
- [ ] Credenciales de API copiadas
- [ ] Archivo `.env.local` creado con credenciales correctas
- [ ] Servidor reiniciado después de configurar `.env.local`
- [ ] Formulario de solicitud funciona y guarda datos
- [ ] Datos aparecen en la tabla `solicitudes` de Supabase
- [ ] Usuario administrador creado
- [ ] Login de admin funciona correctamente

---

## 🆘 Solución de Problemas

### Error: "Invalid API key"

**Problema:** La clave API no es válida

**Solución:**
1. Verifica que copiaste la clave **anon/public**, no la service_role
2. Verifica que no hay espacios antes o después de la clave
3. Verifica que el archivo se llama `.env.local` (con punto)
4. Reinicia el servidor después de cambiar `.env.local`

### Error: "Failed to fetch" o "Network error"

**Problema:** No puede conectar con Supabase

**Solución:**
1. Verifica que la URL de Supabase es correcta
2. Verifica tu conexión a internet
3. Verifica que el proyecto de Supabase esté activo (no pausado)

### Las tablas no aparecen

**Problema:** El SQL no se ejecutó correctamente

**Solución:**
1. Ve a SQL Editor → History
2. Revisa si hay errores en la ejecución
3. Ejecuta el SQL nuevamente, puede que algunas tablas ya existan

### No puedo insertar datos

**Problema:** Las políticas RLS están bloqueando las inserciones

**Solución:**
1. Verifica que la política "Permitir inserciones públicas" existe en la tabla `solicitudes`
2. Ve a Table Editor → solicitudes → Policies
3. Si falta, ejecuta este SQL:
   ```sql
   create policy "Permitir inserciones públicas"
     on solicitudes for insert
     with check (true);
   ```

---

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [API Reference](https://supabase.com/docs/reference/javascript/introduction)

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu base de datos estará configurada y lista para usar.

Si tienes dudas o problemas, revisa la sección de "Solución de Problemas" o consulta la documentación de Supabase.







