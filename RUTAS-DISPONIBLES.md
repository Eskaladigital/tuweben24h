# 🗺️ Rutas Disponibles - TuWebEn24h

Guía completa de todas las páginas y rutas de la aplicación.

---

## 🏠 Rutas Públicas

### Landing Page
```
URL: /
Descripción: Página principal con toda la información del servicio
Componentes:
  - Hero con CTA
  - Features (características)
  - HowItWorks (cómo funciona)
  - Pricing (precios)
  - Portfolio (ejemplos)
  - Testimonials (testimonios)
  - FAQ (preguntas frecuentes)
  - CTA final
Acceso: Público
```

### Formulario de Solicitud
```
URL: /solicitar
Descripción: Formulario multi-paso para solicitar una web
Pasos:
  1. Información básica (nombre, email, teléfono, empresa)
  2. Detalles de la web (tipo, plan, páginas)
  3. Personalización (funcionalidades, referencias, colores)
  4. Extras (contenido, dominio, fecha lanzamiento)
Acceso: Público
Redirige a: /solicitar/confirmacion
```

### Confirmación de Solicitud
```
URL: /solicitar/confirmacion
Descripción: Página de agradecimiento tras enviar solicitud
Contenido:
  - Mensaje de confirmación
  - Próximos pasos
  - Información de contacto
Acceso: Público
```

### Blog - Listado
```
URL: /blog
Descripción: Listado de todos los posts publicados
Características:
  - Grid de posts con imagen destacada
  - Búsqueda de artículos
  - Filtro por categoría
  - Info: autor, fecha, tiempo lectura, vistas
  - Etiquetas
Acceso: Público
```

### Blog - Post Individual
```
URL: /blog/[slug]
Descripción: Vista completa de un artículo
Características:
  - Contenido completo en HTML
  - Botón compartir
  - Posts relacionados
  - CTA al final
  - Contador de vistas automático
Acceso: Público
Ejemplo: /blog/como-elegir-el-mejor-plan
```

---

## 👨‍💼 Rutas de Administración

### Dashboard Administrativo
```
URL: /admin
Descripción: Panel principal de administración
Características:
  - Estadísticas (total, pendientes, en proceso, completados)
  - Búsqueda de solicitudes
  - Filtros por estado
  - Exportación a CSV
  - Cambio rápido de estado
  - Ver detalles de solicitud (modal)
  - Navegación a gestión de proyecto
Acceso: Admin (sin auth por ahora)
Autenticación: Pendiente implementar
```

### Gestión de Proyecto Individual
```
URL: /admin/proyecto/[id]
Descripción: Panel completo de gestión de proyecto
Pestañas:
  
  1. Timeline
     - Listado de eventos cronológico
     - Agregar nuevo evento
     - Tipos: nota, cambio_estado, hito, recordatorio
     - Control de visibilidad
     - Eliminar eventos
  
  2. Archivos
     - Subir archivos
     - Categorías: diseño, contenido, documento, imagen, otro
     - Control de visibilidad
     - Descarga de archivos
     - Info: tamaño, fecha, tipo
  
  3. Chat
     - Mensajería en tiempo real
     - Historial completo
     - Scroll automático
     - Indicador de enviado/recibido

Header:
  - Info del proyecto
  - Cambio de estado
  - Volver al dashboard

Acceso: Admin
Ejemplo: /admin/proyecto/550e8400-e29b-41d4-a716-446655440000
```

### Gestión del Blog
```
URL: /admin/blog
Descripción: Panel de administración del blog
Características:
  - Listado de todos los posts (publicados y borradores)
  - Estadísticas: total, publicados, borradores, vistas
  - Búsqueda de posts
  - Filtros por estado de publicación
  - Toggle publicar/ocultar
  - Editar post
  - Eliminar post
  - Ver post publicado (nueva pestaña)
  - Crear nuevo post
Acceso: Admin
```

### Crear Nuevo Post
```
URL: /admin/blog/nuevo
Descripción: Editor para crear posts de blog
Secciones:

  Columna Principal (izquierda):
    - Título (genera slug automático)
    - Slug (editable)
    - Extracto
    - Contenido (HTML)
    - SEO: título y descripción
  
  Sidebar (derecha):
    - Imagen destacada (URL)
    - Autor
    - Categoría (dropdown)
    - Etiquetas (agregar/quitar)

Acciones:
  - Guardar borrador
  - Publicar

Acceso: Admin
```

### Editar Post
```
URL: /admin/blog/editar/[id]
Descripción: Editor para modificar posts existentes
(Mismas características que crear nuevo)
Acceso: Admin
Estado: Por implementar (usa el mismo componente que /nuevo)
```

---

## 👤 Rutas de Cliente

### Login de Cliente
```
URL: /cliente/login
Descripción: Página de acceso para clientes
Método:
  - Login con email (sin contraseña)
  - Valida contra solicitudes existentes
  - Sesión en localStorage
Redirige a: /cliente/dashboard
Acceso: Público
```

### Dashboard del Cliente
```
URL: /cliente/dashboard
Descripción: Panel para que el cliente vea su proyecto
Protección: Verifica sesión en localStorage
Redirige si no autenticado: /cliente/login

Header:
  - Bienvenida personalizada
  - Botón cerrar sesión

Estado del Proyecto:
  - Indicador visual con color
  - Descripción del estado actual
  - Info del proyecto (plan, tipo, fechas)

Pestañas:
  
  1. Progreso
     - Timeline de eventos visibles
     - Solo eventos marcados como visible_cliente
  
  2. Archivos
     - Archivos compartidos por el admin
     - Solo archivos marcados como visible_cliente
     - Descarga de archivos
  
  3. Mensajes
     - Chat con el equipo
     - Historial completo
     - Enviar mensajes
     - Indicador de mensajes no leídos

Acceso: Cliente (con sesión activa)
```

---

## 🔗 Estructura de URLs

### Patrones de URL

```
Páginas Estáticas:
/                           → Landing
/solicitar                  → Formulario
/solicitar/confirmacion     → Confirmación

Blog:
/blog                       → Listado
/blog/[slug]               → Post individual

Cliente:
/cliente/login             → Login
/cliente/dashboard         → Dashboard

Admin:
/admin                     → Dashboard admin
/admin/proyecto/[id]       → Gestión proyecto
/admin/blog                → Gestión blog
/admin/blog/nuevo          → Crear post
/admin/blog/editar/[id]    → Editar post
```

---

## 🎯 Navegación del Navbar

### Links del Menú Principal

```javascript
{
  { href: '/#features', label: 'Características' },
  { href: '/#how-it-works', label: 'Cómo funciona' },
  { href: '/#pricing', label: 'Precios' },
  { href: '/blog', label: 'Blog' },
  { href: '/cliente/login', label: 'Portal Cliente' },
  
  // CTA
  { href: '/solicitar', label: 'Solicitar Web', style: 'primary' }
}
```

### Anclajes en Landing Page

```
/#features       → Sección de características
/#how-it-works   → Cómo funciona
/#pricing        → Planes de precios
/#portfolio      → Ejemplos de trabajos
/#testimonials   → Testimonios
/#faq           → Preguntas frecuentes
```

---

## 📱 Rutas por Tipo de Usuario

### Usuario Anónimo (Visitante)
```
✅ /                        Landing page
✅ /solicitar              Formulario
✅ /solicitar/confirmacion Confirmación
✅ /blog                   Listado blog
✅ /blog/[slug]           Post individual
✅ /cliente/login         Login cliente
❌ /cliente/dashboard     (redirect a login)
❌ /admin                 (debe implementar auth)
```

### Cliente Autenticado
```
✅ Todas las rutas públicas
✅ /cliente/dashboard     Dashboard cliente
✅ /cliente/login         (redirect a dashboard)
❌ /admin/*              (debe implementar auth)
```

### Administrador
```
✅ Todas las rutas
✅ /admin                 Dashboard admin
✅ /admin/proyecto/[id]   Gestión proyecto
✅ /admin/blog            Gestión blog
✅ /admin/blog/nuevo      Crear post
```

---

## 🚀 Redirecciones y Flujos

### Flujo de Solicitud
```
1. Usuario visita /
2. Click "Solicitar Web"
3. Redirige a /solicitar
4. Completa formulario
5. Submit exitoso
6. Redirige a /solicitar/confirmacion
7. Puede volver a / o ir a /cliente/login más tarde
```

### Flujo de Cliente
```
1. Cliente recibe email con link a /cliente/login
2. Ingresa email
3. Validación exitosa
4. Redirige a /cliente/dashboard
5. Navega entre pestañas (progreso, archivos, mensajes)
6. Cierra sesión → vuelve a /cliente/login
```

### Flujo de Admin
```
1. Admin va a /admin
2. Ve solicitud nueva
3. Click "Gestionar"
4. Va a /admin/proyecto/[id]
5. Gestiona timeline, archivos, chat
6. Vuelve a /admin con botón "Volver"
```

### Flujo de Blog
```
Usuario (Público):
1. Usuario va a /blog
2. Busca o filtra posts
3. Click en post
4. Lee en /blog/[slug]
5. Ve posts relacionados
6. Click en CTA → /solicitar

Admin:
1. Admin va a /admin/blog
2. Click "Nuevo Post"
3. Crea contenido en /admin/blog/nuevo
4. Publica
5. Vuelve a /admin/blog
6. Verifica en /blog (nueva pestaña)
```

---

## 🔍 Rutas de API (Futuras)

### Endpoints Planeados

```
POST /api/solicitudes        → Crear solicitud
GET  /api/solicitudes        → Listar solicitudes
GET  /api/solicitudes/[id]   → Una solicitud

POST /api/eventos            → Crear evento
GET  /api/eventos/[sid]      → Eventos de solicitud

POST /api/archivos           → Subir archivo
GET  /api/archivos/[sid]     → Archivos de solicitud

POST /api/mensajes           → Enviar mensaje
GET  /api/mensajes/[sid]     → Mensajes de solicitud

POST /api/blog               → Crear post
GET  /api/blog               → Listar posts
GET  /api/blog/[slug]        → Un post
PUT  /api/blog/[id]          → Actualizar post
DELETE /api/blog/[id]        → Eliminar post
```

---

## 📊 Mapa del Sitio

```
tuweben24h.com/
│
├── / (Landing)
│   ├── #features
│   ├── #how-it-works
│   ├── #pricing
│   ├── #portfolio
│   ├── #testimonials
│   └── #faq
│
├── /solicitar
│   └── /confirmacion
│
├── /blog
│   └── /[slug]
│
├── /cliente
│   ├── /login
│   └── /dashboard
│
└── /admin
    ├── /proyecto/[id]
    └── /blog
        ├── /nuevo
        └── /editar/[id]
```

---

## ⚙️ Configuración de Next.js

Las rutas se generan automáticamente según la estructura de carpetas en `/app`:

```
app/
├── page.tsx                    → /
├── layout.tsx                  → Layout global
├── solicitar/
│   ├── page.tsx               → /solicitar
│   └── confirmacion/
│       └── page.tsx           → /solicitar/confirmacion
├── blog/
│   ├── page.tsx               → /blog
│   └── [slug]/
│       └── page.tsx           → /blog/[slug]
├── cliente/
│   ├── login/
│   │   └── page.tsx           → /cliente/login
│   └── dashboard/
│       └── page.tsx           → /cliente/dashboard
└── admin/
    ├── page.tsx               → /admin
    ├── proyecto/
    │   └── [id]/
    │       └── page.tsx       → /admin/proyecto/[id]
    └── blog/
        ├── page.tsx           → /admin/blog
        └── nuevo/
            └── page.tsx       → /admin/blog/nuevo
```

---

## 📝 Notas Importantes

1. **Parámetros Dinámicos:**
   - `[id]` - UUID de la solicitud
   - `[slug]` - URL amigable del post

2. **Protección de Rutas:**
   - Cliente: verificación de sesión en `useEffect`
   - Admin: pendiente implementar autenticación real

3. **Redirecciones:**
   - Cliente sin sesión → `/cliente/login`
   - Cliente con sesión en login → `/cliente/dashboard`

4. **SEO:**
   - Todas las rutas públicas tienen metadata
   - Blog posts tienen SEO optimizado
   - URLs amigables con slugs descriptivos

---

**Para más información sobre cada ruta, consulta:**
- [FUNCIONALIDADES-NUEVAS.md](./FUNCIONALIDADES-NUEVAS.md)
- [EJEMPLOS-DE-USO.md](./EJEMPLOS-DE-USO.md)


