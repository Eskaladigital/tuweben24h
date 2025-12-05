# 🚀 Configuración de AWS Amplify

## ⚠️ Error Común: "supabaseUrl is required"

Si ves este error durante el build en AWS Amplify, es porque **faltan las variables de entorno**.

## 📋 Variables de Entorno Requeridas

Para que la aplicación funcione correctamente en AWS Amplify, necesitas configurar estas variables de entorno:

```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
```

## 🔧 Cómo Configurar Variables de Entorno en AWS Amplify

### Paso 1: Acceder a tu App en AWS Amplify Console

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Selecciona tu aplicación `tuweben24h.com`

### Paso 2: Configurar Variables de Entorno

1. En el menú lateral, haz clic en **"Environment variables"** (Variables de entorno)
2. Haz clic en **"Manage variables"** (Administrar variables)
3. Agrega las siguientes variables:

#### Variable 1:
- **Variable name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Tu URL de Supabase (ej: `https://xxxxxxxxxxxx.supabase.co`)

#### Variable 2:
- **Variable name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Tu clave anónima de Supabase

4. Haz clic en **"Save"** (Guardar)

### Paso 3: Obtener las Credenciales de Supabase

Si no tienes las credenciales a mano:

1. Ve a [supabase.com](https://supabase.com)
2. Abre tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → Esta es tu `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** → Copia la clave `anon` `public` → Esta es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Paso 4: Re-deployar

Una vez configuradas las variables:

1. Ve a la pestaña **"Deployments"** o **"Redeploy this version"**
2. Haz clic en **"Redeploy"** o haz un nuevo commit para activar un nuevo build

## 🎯 Verificar la Configuración

Después del build exitoso, verifica que:

- ✅ El sitio carga correctamente
- ✅ El formulario de solicitud funciona
- ✅ El blog muestra los posts (si los hay)
- ✅ El sitemap.xml se genera: `https://tu-dominio.com/sitemap.xml`

## 🔐 Seguridad

⚠️ **Importante:**
- Las variables `NEXT_PUBLIC_*` son visibles en el cliente (navegador)
- Nunca uses variables `NEXT_PUBLIC_*` para secretos sensibles
- La `anon key` de Supabase está diseñada para ser pública, pero asegúrate de tener configuradas las políticas RLS (Row Level Security) en Supabase

## 📝 Variables Opcionales (Futuras)

Si implementas funcionalidades adicionales, podrías necesitar:

```
# Para emails (Resend, SendGrid, etc.)
EMAIL_API_KEY=tu_api_key

# Para pagos (Stripe)
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# Para analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🐛 Troubleshooting

### Build sigue fallando después de configurar variables

1. **Limpia la caché de build:**
   - En AWS Amplify Console → App settings → Build settings
   - Habilita "Clear cache" en la próxima build

2. **Verifica que las variables están bien escritas:**
   - No debe haber espacios antes o después
   - Revisa mayúsculas/minúsculas exactas
   - Verifica que no haya saltos de línea

3. **Re-deploya manualmente:**
   - Deployment → Actions → Redeploy this version

### Error: "Failed to collect page data for /sitemap.xml"

Este error significa que las variables de entorno no están configuradas o son incorrectas.

**Solución:**
1. Configura las variables según los pasos anteriores
2. Verifica que las credenciales de Supabase sean válidas
3. Re-deploya la aplicación

### El sitio carga pero las funcionalidades no funcionan

Si el sitio se ve bien pero el formulario o el blog no funcionan:

1. Abre la consola del navegador (F12)
2. Busca errores relacionados con Supabase
3. Verifica que las variables de entorno estén disponibles:
   - En el navegador: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
   - Debe mostrar tu URL, no `undefined`

## 📚 Recursos Adicionales

- [Documentación de AWS Amplify - Variables de Entorno](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
- [Documentación de Supabase](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## ✅ Checklist de Configuración

- [ ] Crear proyecto en Supabase
- [ ] Ejecutar el SQL del esquema (`supabase-schema.sql`)
- [ ] Copiar URL de Supabase
- [ ] Copiar anon key de Supabase
- [ ] Configurar variables en AWS Amplify
- [ ] Re-deployar la aplicación
- [ ] Verificar que el sitio funciona
- [ ] Probar el formulario de solicitud
- [ ] Verificar el sitemap.xml

---

**¿Necesitas ayuda?** Revisa los logs de build en AWS Amplify Console para más detalles sobre cualquier error.

