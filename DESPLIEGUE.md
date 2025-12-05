# 🚀 Guía de Despliegue - TuWebEn24h

## 📋 Pre-requisitos

- [ ] Cuenta de Vercel (o Netlify)
- [ ] Cuenta de Supabase
- [ ] Dominio comprado (opcional, Vercel proporciona uno gratis)
- [ ] Git instalado

## 🗄️ Paso 1: Configurar Supabase

### 1.1 Crear Proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Click en "New Project"
3. Elige un nombre y contraseña segura
4. Selecciona la región más cercana (ej: Frankfurt para España)
5. Espera a que el proyecto se cree (~2 minutos)

### 1.2 Crear la Base de Datos

1. Ve a "SQL Editor" en el menú lateral
2. Copia y pega el contenido de `supabase-schema.sql`
3. Click en "Run"
4. Verifica que se hayan creado las tablas en "Table Editor"

### 1.3 Obtener Credenciales

1. Ve a "Settings" > "API"
2. Copia:
   - **Project URL** (tu SUPABASE_URL)
   - **anon public** key (tu SUPABASE_ANON_KEY)
3. Guárdalas en un lugar seguro

## 🌐 Paso 2: Desplegar en Vercel

### 2.1 Preparar el Repositorio

```bash
# Inicializar git (si no lo has hecho)
cd C:\Users\NARCISOPARDOBUENDA\Desktop\tuweben24h.com
git init
git add .
git commit -m "Initial commit"

# Crear repositorio en GitHub
# Ve a github.com y crea un nuevo repositorio llamado "tuweben24h"

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/tuweben24h.git
git branch -M main
git push -u origin main
```

### 2.2 Desplegar en Vercel

#### Opción A: Desde la Web

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New..." > "Project"
3. Importa tu repositorio de GitHub
4. Configura las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu anon key
5. Click en "Deploy"
6. ¡Espera 2-3 minutos y listo!

#### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Configurar variables de entorno
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy a producción
vercel --prod
```

### 2.3 Configurar Dominio Personalizado (Opcional)

1. En Vercel, ve a tu proyecto > Settings > Domains
2. Añade tu dominio: `tuweben24h.com`
3. Sigue las instrucciones para actualizar los DNS
4. Espera a que se propague (15 min - 24h)

## 📧 Paso 3: Configurar Emails (Opcional)

### Opción 1: Resend (Recomendado)

```bash
npm install resend
```

1. Crea cuenta en [resend.com](https://resend.com)
2. Verifica tu dominio
3. Obtén API Key
4. Añade a Vercel: `RESEND_API_KEY`

### Opción 2: SendGrid

1. Crea cuenta en [sendgrid.com](https://sendgrid.com)
2. Obtén API Key
3. Configura sender verification
4. Añade a Vercel: `SENDGRID_API_KEY`

## 🔐 Paso 4: Seguridad

### 4.1 Variables de Entorno

Asegúrate de que estas variables estén SOLO en Vercel, nunca en el código:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
RESEND_API_KEY=re_xxx
ADMIN_EMAIL=admin@tuweben24h.com
```

### 4.2 Supabase Security

1. Verifica que RLS esté activado
2. Revisa las políticas de seguridad
3. Configura rate limiting en Supabase dashboard
4. Activa email confirmation (opcional)

## 📊 Paso 5: Analytics

### 5.1 Vercel Analytics

1. En tu proyecto Vercel > Analytics
2. Click en "Enable"
3. ¡Ya está! Vercel hace el resto

### 5.2 Google Analytics (Opcional)

```bash
npm install @next/third-parties
```

En `app/layout.tsx`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

## 🧪 Paso 6: Testing

### 6.1 Test Local

```bash
npm run build
npm start
```

Verifica:
- [ ] Todas las páginas cargan
- [ ] Formulario envía datos
- [ ] Emails se reciben (si configurado)
- [ ] Responsive design funciona

### 6.2 Test en Producción

1. Envía una solicitud de prueba
2. Verifica en Supabase que se guardó
3. Comprueba que llegó el email
4. Revisa Analytics después de 24h

## 🔄 Paso 7: CI/CD Automático

Con Vercel + GitHub ya tienes CI/CD:

```bash
# Cada vez que hagas push, se despliega automáticamente
git add .
git commit -m "Actualización"
git push
```

## 🎯 Checklist Final de Lanzamiento

- [ ] Base de datos configurada
- [ ] Variables de entorno en Vercel
- [ ] Dominio configurado (si aplica)
- [ ] SSL activo (Vercel lo hace automático)
- [ ] Formulario probado
- [ ] Emails de notificación probados
- [ ] Analytics configurado
- [ ] Meta tags de SEO verificados
- [ ] Open Graph tags verificados
- [ ] Favicon añadido
- [ ] robots.txt configurado
- [ ] sitemap.xml generado
- [ ] Google Search Console configurado
- [ ] Tiempo de carga < 3 segundos
- [ ] Responsive en móvil verificado
- [ ] Links de redes sociales actualizados
- [ ] Información de contacto actualizada

## 🆘 Troubleshooting

### Error: "Supabase is not defined"

```bash
# Verifica que las variables de entorno estén bien
# En Vercel: Settings > Environment Variables
# Redeploy después de añadirlas
```

### Error: "Failed to insert"

```bash
# Verifica las políticas RLS en Supabase
# SQL Editor > ejecuta:
select * from solicitudes; -- Si falla, RLS está mal configurado
```

### Error: Build Failed

```bash
# Limpia caché y rebuilds
rm -rf .next
npm run build
```

## 📈 Monitorización Post-Lanzamiento

### Semana 1

- [ ] Revisar solicitudes diarias
- [ ] Monitorear errores en Vercel
- [ ] Verificar Analytics
- [ ] Ajustar CTAs si es necesario

### Mes 1

- [ ] Analizar tasa de conversión
- [ ] Revisar testimonios y feedback
- [ ] Optimizar SEO basado en datos
- [ ] A/B testing de precios (opcional)

## 🚀 Next Steps

Ahora que está desplegado:

1. **Marketing**: Google Ads, Facebook Ads, SEO local
2. **Dashboard Admin**: Crear panel para gestionar solicitudes
3. **Sistema de Pagos**: Integrar Stripe
4. **Blog**: Añadir sección de contenido
5. **Portfolio Real**: Sustituir ejemplos por trabajos reales

---

**¿Problemas?** Revisa los logs en Vercel o contacta para soporte.
