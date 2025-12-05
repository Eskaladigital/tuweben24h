# 🚀 TuWebEn24h - Aplicación Completa

## 📋 Descripción

TuWebEn24h es una aplicación web completa para ofrecer servicios de desarrollo web rápido. Los clientes pueden solicitar su página web profesional que será entregada en 24 horas.

## ✨ Características

- **Landing Page Profesional**: Diseño moderno con 10 secciones optimizadas
- **Formulario Multi-Paso**: Sistema de 4 pasos para recopilar información del cliente
- **Dashboard Administrativo**: Panel completo para gestionar solicitudes
- **Base de Datos**: Integración con Supabase para almacenar solicitudes
- **Responsive Design**: 100% mobile-first y adaptable
- **SEO Optimizado**: Meta tags y estructura optimizada
- **Animaciones Suaves**: Experiencia de usuario mejorada con Framer Motion

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React

## 📁 Estructura del Proyecto

```
tuweben24h.com/
├── app/
│   ├── page.tsx                    # Landing page principal
│   ├── layout.tsx                  # Layout global
│   ├── globals.css                 # Estilos globales
│   ├── admin/
│   │   └── page.tsx               # Dashboard administrativo
│   ├── solicitar/
│   │   ├── page.tsx               # Formulario de solicitud
│   │   └── confirmacion/
│   │       └── page.tsx           # Página de confirmación
│   └── api/
│       └── solicitudes/
│           └── route.ts           # API endpoint
├── components/
│   ├── Navbar.tsx                 # Navegación
│   ├── Hero.tsx                   # Sección hero
│   ├── Features.tsx               # Características
│   ├── HowItWorks.tsx            # Cómo funciona
│   ├── Pricing.tsx                # Precios
│   ├── Portfolio.tsx              # Portfolio
│   ├── Testimonials.tsx           # Testimonios
│   ├── FAQ.tsx                    # Preguntas frecuentes
│   ├── CTA.tsx                    # Call to action
│   └── Footer.tsx                 # Pie de página
├── lib/
│   ├── supabase.ts               # Configuración Supabase
│   └── utils.ts                   # Utilidades
└── public/                        # Assets estáticos
```

## 🚀 Instalación y Configuración

### 1. Clonar o Acceder al Proyecto

```bash
cd C:\Users\NARCISOPARDOBUENDA\Desktop\tuweben24h.com
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### 4. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a SQL Editor y ejecuta el contenido de `supabase-schema.sql`
4. Copia las credenciales (URL y anon key) a tu `.env.local`

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Base de Datos

El esquema de Supabase incluye:

- Tabla `solicitudes` con todos los campos del formulario
- Row Level Security (RLS) configurado
- Políticas de acceso público para inserción
- Políticas de lectura autenticada para admin

## 🎨 Personalización

### Modificar Precios

Edita `components/Pricing.tsx` y ajusta los valores:

```typescript
const planes = [
  {
    nombre: 'Básico',
    precio: 299,
    // ...
  },
  // ...
]
```

### Cambiar Colores

Edita `tailwind.config.js` para personalizar la paleta de colores:

```javascript
colors: {
  primary: {
    // tus colores
  },
}
```

### Actualizar Información de Contacto

Busca y reemplaza en todos los archivos:
- `info@tuweben24h.com` → Tu email
- `+34 900 000 000` → Tu teléfono

## 📱 Rutas Principales

- `/` - Landing page
- `/solicitar` - Formulario de solicitud
- `/solicitar/confirmacion` - Página de confirmación
- `/admin` - Dashboard administrativo (sin auth por ahora)
- `/api/solicitudes` - API endpoint

## 🔒 Seguridad

**IMPORTANTE**: El dashboard de admin actualmente NO tiene autenticación. Antes de desplegar en producción, debes:

1. Añadir autenticación (Supabase Auth recomendado)
2. Proteger la ruta `/admin`
3. Configurar políticas RLS adecuadas

### Ejemplo de protección básica:

```typescript
// app/admin/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar sesión de Supabase
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
      }
    }
    
    checkAuth()
  }, [])

  // resto del código...
}
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Conecta tu repositorio en [vercel.com](https://vercel.com)
3. Añade las variables de entorno
4. Deploy automático

### Variables de entorno en Vercel

```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave
```

## 📈 Próximas Mejoras

### Corto Plazo
- [ ] Autenticación para admin
- [ ] Sistema de notificaciones por email
- [ ] Integración con Stripe para pagos
- [ ] Panel de cliente para ver estado del proyecto

### Medio Plazo
- [ ] Blog para SEO
- [ ] Sistema de tickets/chat
- [ ] Generador de contratos automático
- [ ] Múltiples usuarios admin

### Largo Plazo
- [ ] App móvil
- [ ] Sistema de plantillas visual
- [ ] Marketplace de diseños
- [ ] White label para revendedores

## 🐛 Problemas Comunes

### Error: "fetch failed" al hacer solicitud

Verifica que:
1. Supabase esté correctamente configurado
2. Las variables de entorno estén en `.env.local`
3. La tabla `solicitudes` exista en Supabase
4. Las políticas RLS permitan inserción pública

### Los estilos no se cargan correctamente

Ejecuta:
```bash
npm run dev
```

Y limpia la caché del navegador.

### Error de TypeScript

Asegúrate de que todas las dependencias estén instaladas:
```bash
npm install
```

## 📧 Soporte

Para dudas o problemas:
- Email: info@tuweben24h.com
- Revisa la documentación en `EMPEZAR-AQUI.md`
- Consulta el plan de marketing en `MARKETING.md`

## 📝 Licencia

Este proyecto es privado y de uso personal.

## 🎯 Checklist de Lanzamiento

Antes de lanzar en producción:

- [ ] Configurar Supabase
- [ ] Añadir autenticación admin
- [ ] Personalizar textos y precios
- [ ] Actualizar información de contacto
- [ ] Añadir favicon y logos
- [ ] Configurar dominio personalizado
- [ ] Configurar Google Analytics
- [ ] Probar formulario de solicitud
- [ ] Probar dashboard de admin
- [ ] Configurar emails transaccionales
- [ ] Añadir términos y condiciones
- [ ] Añadir política de privacidad
- [ ] Probar en móviles
- [ ] Optimizar imágenes
- [ ] Hacer deploy

¡Tu aplicación está lista para empezar a recibir solicitudes! 🎉
