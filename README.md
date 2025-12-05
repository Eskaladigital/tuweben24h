# TuWebEn24h.com 🚀

Landing page y sistema de solicitudes para un servicio de creación de webs en 24 horas.

## 🎯 Características

- ✅ Landing page moderna y atractiva
- ✅ Formulario de solicitud multi-paso
- ✅ Diseño responsive (mobile-first)
- ✅ Optimizado para conversión
- ✅ Integración con Supabase
- ✅ Sistema de componentes reutilizables
- ✅ Animaciones suaves
- ✅ SEO optimizado

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.local.example .env.local

# Editar .env.local con tus credenciales de Supabase
```

## 🗄️ Configuración de Supabase

### 1. Crear proyecto en Supabase

Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto.

### 2. Crear la tabla de solicitudes

Ejecuta este SQL en el editor de Supabase:

```sql
create table solicitudes (
  id uuid default gen_random_uuid() primary_key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nombre text not null,
  email text not null,
  telefono text not null,
  empresa text not null,
  tipo_web text,
  plan text,
  paginas text,
  descripcion text,
  funcionalidades text[],
  referencias text,
  colores text,
  tiene_contenido text,
  tiene_dominio text,
  dominio text,
  fecha_lanzamiento date,
  comentarios text,
  estado text default 'pendiente'
);

-- Habilitar Row Level Security
alter table solicitudes enable row level security;

-- Política para permitir inserciones públicas
create policy "Permitir inserciones públicas"
  on solicitudes for insert
  with check (true);

-- Política para lectura (solo admin - requiere autenticación)
create policy "Admin puede leer todo"
  on solicitudes for select
  using (auth.role() = 'authenticated');
```

### 3. Configurar variables de entorno

Añade las credenciales en `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## 🚀 Desarrollo

```bash
# Modo desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

## 🔐 Acceso Administrativo

### Login del Admin
- **URL:** `http://localhost:3000/admin/login`
- **Email:** `narciso.pardo@outlook.com`
- **Contraseña:** `14356830_Np@`

📖 **Documentación completa:** [CREDENCIALES-ADMIN.md](./CREDENCIALES-ADMIN.md)

**Rutas protegidas:**
- `/admin` - Dashboard administrativo
- `/admin/proyecto/[id]` - Gestión de proyectos
- `/admin/blog` - Gestión del blog
- `/admin/blog/nuevo` - Crear posts

**Características:**
- ✅ Sesión persistente (8 horas)
- ✅ Protección automática de rutas
- ✅ Botón de cerrar sesión
- ✅ Verificación de expiración

## 📱 Estructura de Páginas

- `/` - Landing page principal
- `/solicitar` - Formulario de solicitud
- `/solicitar/confirmacion` - Página de confirmación

## 🎨 Componentes

### Principales
- `Navbar` - Navegación principal
- `Hero` - Sección hero con CTA
- `Features` - Características del servicio
- `HowItWorks` - Proceso paso a paso
- `Pricing` - Planes de precios
- `Portfolio` - Ejemplos de trabajos
- `Testimonials` - Testimonios de clientes
- `FAQ` - Preguntas frecuentes
- `CTA` - Call to action final
- `Footer` - Pie de página

## ✨ Funcionalidades Implementadas

### ✅ Dashboard Administrativo Completo
- ✅ Panel mejorado con estadísticas en tiempo real
- ✅ Sistema de estados avanzado (6 estados)
- ✅ Filtros y búsqueda potente
- ✅ Exportación a CSV
- ✅ Navegación directa a gestión de proyectos

### ✅ Gestión de Proyectos
- ✅ Timeline de eventos personalizable
- ✅ Sistema de archivos con categorías
- ✅ Chat en tiempo real con clientes
- ✅ Control de visibilidad de contenido
- ✅ Registro automático de cambios

### ✅ Panel de Cliente
- ✅ Login simplificado con email
- ✅ Dashboard con estado del proyecto
- ✅ Vista de progreso (timeline)
- ✅ Descarga de archivos compartidos
- ✅ Chat con el equipo

### ✅ Blog Completo
- ✅ Blog público con posts
- ✅ Búsqueda y filtros por categoría
- ✅ Vista individual de artículos
- ✅ Panel admin para gestionar posts
- ✅ Editor completo con SEO
- ✅ Sistema de etiquetas y categorías

📖 **Ver documentación completa:** [FUNCIONALIDADES-NUEVAS.md](./FUNCIONALIDADES-NUEVAS.md)

---

## 🎯 Próximas Mejoras Recomendadas

### Funcionalidades Pendientes

1. **Sistema de Notificaciones** 🔔
   - Email automático al cliente
   - Email de notificación al admin
   - Integración con Resend o similar

2. **Supabase Storage** 📦
   - Almacenamiento real de archivos
   - Subida de imágenes para blog
   - Gestión de límites y permisos

3. **Sistema de Pagos** 💳
   - Integración con Stripe
   - Pasarela de pago
   - Facturas automáticas

4. **Autenticación Mejorada** 🔐
   - Migrar a Supabase Auth
   - Sistema de roles
   - Recuperación de contraseña

## 📈 SEO y Marketing

### Optimizaciones Actuales
- Meta tags configurados
- Open Graph tags
- Estructura semántica HTML
- URLs limpias
- Responsive design

### Por Implementar
- Sitemap XML
- robots.txt
- Google Analytics
- Google Tag Manager
- Schema.org markup
- Pixel de Facebook
- Google Search Console

## 🔐 Seguridad

- [ ] Implementar rate limiting
- [ ] Validación de formularios en backend
- [ ] Sanitización de inputs
- [ ] CSRF protection
- [ ] Honeypot para spam
- [ ] reCAPTCHA (opcional)

## 🚀 Despliegue

### AWS Amplify

📖 **Guía completa:** [AWS-AMPLIFY-SETUP.md](./AWS-AMPLIFY-SETUP.md)

**Variables de entorno requeridas:**
```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables de entorno en Vercel dashboard
```

### Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 📊 Analytics y Monitorización

### Herramientas Recomendadas
- **Vercel Analytics** - Métricas de rendimiento
- **Google Analytics 4** - Comportamiento de usuarios
- **Hotjar** - Mapas de calor
- **Microsoft Clarity** - Grabaciones de sesión

## 🎨 Personalización

### Colores
Edita `tailwind.config.js` para cambiar los colores:

```js
colors: {
  primary: { ... },  // Color principal
  accent: { ... },   // Color de acento
}
```

### Contenido
- Textos en componentes
- Precios en `Pricing.tsx`
- FAQs en `FAQ.tsx`
- Testimonios en `Testimonials.tsx`

## 📝 Licencia

Proyecto privado - Todos los derechos reservados.

## 👨‍💻 Autor

Narciso Pardo Buendía

## 🤝 Soporte

Para dudas o sugerencias:
- Email: [tu-email]
- WhatsApp: [tu-numero]

---

**¡Tu negocio online empieza ahora! 🚀**
