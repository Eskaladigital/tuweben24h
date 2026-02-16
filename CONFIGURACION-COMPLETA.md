# ⚙️ Configuración Completa - Todo lo que Falta

Guía paso a paso para configurar todas las funcionalidades implementadas.

---

## 📋 Checklist de Configuración

### ✅ Ya Configurado
- [x] Base de datos Supabase
- [x] Tablas creadas
- [x] Variables de entorno básicas

### ⚠️ Pendiente de Configurar

---

## 1. 📧 Sistema de Emails (Resend)

### Paso 1.1: Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta (gratis hasta 3,000 emails/mes)
3. Verifica tu email

### Paso 1.2: Obtener API Key

1. En Resend dashboard, ve a **API Keys**
2. Haz clic en **"Create API Key"**
3. Nombre: `tuweben24h-production`
4. Copia la clave (empieza con `re_...`)

### Paso 1.3: Verificar dominio (Opcional pero recomendado)

1. Ve a **Domains** en Resend
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio: `tuweben24h.com`
4. Agrega los registros DNS que te indique
5. Espera verificación (puede tardar hasta 24h)

### Paso 1.4: Configurar variables de entorno

Agrega a tu `.env.local`:

```env
RESEND_API_KEY=re_tu_api_key_aqui
ADMIN_EMAIL=narciso.pardo@outlook.com
```

**En producción (Vercel/Netlify):**
- Agrega estas variables en el dashboard de tu plataforma

---

## 2. 📦 Supabase Storage

### Paso 2.1: Ejecutar script SQL

1. Ve a Supabase → **SQL Editor**
2. Abre el archivo `supabase-storage-setup.sql`
3. Copia TODO el contenido
4. Pégalo en el SQL Editor
5. Ejecuta (Run)

### Paso 2.2: Verificar buckets creados

1. Ve a Supabase → **Storage**
2. Deberías ver dos buckets:
   - ✅ `proyectos` (privado)
   - ✅ `blog` (público)

### Paso 2.3: Configurar políticas (ya están en el SQL)

Las políticas se crean automáticamente al ejecutar el SQL.

---

## 3. 🔐 Autenticación Mejorada (Supabase Auth)

### Paso 3.1: Habilitar Email Auth

1. Ve a Supabase → **Authentication** → **Providers**
2. Asegúrate de que **Email** esté habilitado
3. Configura:
   - **Confirm email:** Activado (producción) o Desactivado (desarrollo)
   - **Secure email change:** Activado

### Paso 3.2: Crear usuario admin

1. Ve a **Authentication** → **Users**
2. Haz clic en **"Add user"** → **"Create new user"**
3. Completa:
   - **Email:** tu-email-admin@ejemplo.com
   - **Password:** (elige una contraseña segura)
   - **Auto Confirm User:** ✅ Activado
   - **User Metadata:**
     ```json
     {
       "nombre": "Tu Nombre",
       "role": "admin"
     }
     ```
4. Haz clic en **"Create user"**

### Paso 3.3: Actualizar código de login admin

El código ya está preparado para usar Supabase Auth. Solo necesitas actualizar la página de login admin para usar las nuevas funciones.

---

## 4. 📊 Google Analytics

### Paso 4.1: Crear cuenta de Google Analytics

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Crea una cuenta (si no tienes)
3. Crea una propiedad para `tuweben24h.com`
4. Obtén el **Measurement ID** (formato: `G-XXXXXXXXXX`)

### Paso 4.2: Configurar variable de entorno

Agrega a tu `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**En producción:**
- Agrega esta variable en Vercel/Netlify

### Paso 4.3: Verificar funcionamiento

1. Reinicia el servidor
2. Abre tu sitio
3. Ve a Google Analytics → **Realtime**
4. Deberías ver tu visita

---

## 5. 🛡️ Seguridad del Formulario

### ✅ Ya Implementado

- ✅ Rate limiting (5 solicitudes por IP cada 15 minutos)
- ✅ Validación de campos requeridos
- ✅ Validación de email
- ✅ Sanitización de inputs (prevención XSS)
- ✅ Límite de longitud de campos

### Configuración Adicional (Opcional)

#### reCAPTCHA (Opcional)

1. Ve a [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Crea un sitio
3. Obtén Site Key y Secret Key
4. Agrega a `.env.local`:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key
   RECAPTCHA_SECRET_KEY=tu_secret_key
   ```

---

## 6. 🔍 SEO Avanzado

### Paso 6.1: Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad: `tuweben24h.com`
3. Verifica propiedad (DNS o archivo HTML)
4. Envía sitemap: `https://tuweben24h.com/sitemap.xml`

### Paso 6.2: Verificar sitemap

1. Ve a `http://localhost:3000/sitemap.xml` (o tu dominio)
2. Deberías ver todas las rutas listadas

### Paso 6.3: robots.txt

Ya existe en `public/robots.txt`. Verifica que esté correcto.

---

## 📝 Variables de Entorno Completas

Tu archivo `.env.local` debería tener:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://gdrjpnpeaktqhdvbbhxw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Emails (Resend)
RESEND_API_KEY=re_tu_api_key_aqui
ADMIN_EMAIL=narciso.pardo@outlook.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL (para producción)
NEXT_PUBLIC_SITE_URL=https://tuweben24h.com

# reCAPTCHA (opcional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key
RECAPTCHA_SECRET_KEY=tu_secret_key
```

---

## ✅ Verificación Final

### Checklist de Funcionalidades

- [ ] Emails se envían al cliente y admin
- [ ] Archivos se pueden subir a Supabase Storage
- [ ] Rate limiting funciona (intenta enviar 6 formularios seguidos)
- [ ] Google Analytics registra visitas
- [ ] Login admin funciona con Supabase Auth
- [ ] Sitemap.xml es accesible
- [ ] robots.txt es accesible

---

## 🚀 Próximos Pasos

1. ✅ Configurar Resend y probar emails
2. ✅ Ejecutar SQL de Storage y probar subida
3. ✅ Configurar Google Analytics
4. ✅ Crear usuario admin en Supabase Auth
5. ✅ Verificar sitemap en Google Search Console
6. ✅ Deploy a producción
7. ✅ Configurar variables de entorno en producción

---

## 🆘 Solución de Problemas

### Emails no se envían
- Verifica que `RESEND_API_KEY` esté configurada
- Revisa logs del servidor para errores
- Verifica que el dominio esté verificado en Resend (si usas dominio personalizado)

### Storage no funciona
- Verifica que ejecutaste `supabase-storage-setup.sql`
- Verifica que los buckets existan en Supabase → Storage
- Revisa las políticas RLS

### Analytics no funciona
- Verifica que `NEXT_PUBLIC_GA_MEASUREMENT_ID` esté configurada
- Usa la extensión "Google Analytics Debugger" en Chrome
- Revisa la consola del navegador

---

¡Todo listo! 🎉




