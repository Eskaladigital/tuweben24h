# 🚀 Instalación Rápida - TuWebEn24h

Guía paso a paso para poner en marcha todas las nuevas funcionalidades.

---

## 📋 Prerequisitos

- Node.js 18+ instalado
- Cuenta en Supabase
- Editor de código (VS Code recomendado)

---

## 🔧 Paso 1: Clonar e Instalar Dependencias

```bash
# Ya deberías estar en el directorio del proyecto
cd tuweben24h.com

# Instalar dependencias (si aún no lo hiciste)
npm install
```

---

## 🗄️ Paso 2: Configurar Supabase

### 2.1 Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Espera a que se inicialice (2-3 minutos)

### 2.2 Ejecutar Script SQL

1. Ve a **SQL Editor** en el panel de Supabase
2. Crea una nueva query
3. Copia TODO el contenido de `supabase-schema.sql`
4. Pega y ejecuta (Run)
5. Verifica que se crearon todas las tablas:
   - `solicitudes`
   - `proyecto_eventos`
   - `proyecto_archivos`
   - `mensajes`
   - `clientes`
   - `blog_posts`
   - `email_templates`
   - `email_log`
   - `configuracion`

### 2.3 Verificar Tablas

En la sección **Table Editor**, deberías ver todas las tablas creadas.

---

## 🔑 Paso 3: Configurar Variables de Entorno

### 3.1 Obtener Credenciales de Supabase

1. Ve a **Settings** → **API**
2. Copia:
   - **Project URL**
   - **anon/public key**

### 3.2 Crear Archivo .env.local

Si no existe, créalo en la raíz del proyecto:

```bash
# Copiar el ejemplo (si existe)
cp .env.local.example .env.local

# O crear uno nuevo
touch .env.local
```

### 3.3 Agregar Variables

Edita `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

⚠️ **Importante:** Reemplaza con tus valores reales de Supabase.

---

## 🚀 Paso 4: Iniciar el Proyecto

```bash
# Modo desarrollo
npm run dev
```

El proyecto debería estar corriendo en:
```
http://localhost:3000
```

---

## ✅ Paso 5: Verificar Funcionalidades

### 5.1 Landing Page
1. Abre `http://localhost:3000`
2. Verifica que carga correctamente
3. Navega por las secciones

### 5.2 Solicitar Web
1. Ve a `http://localhost:3000/solicitar`
2. Completa el formulario
3. Verifica que se guarda en Supabase (Table Editor → solicitudes)

### 5.3 Dashboard Admin
1. Ve a `http://localhost:3000/admin`
2. Deberías ver la solicitud que creaste
3. Prueba los filtros y búsqueda
4. Haz clic en "Gestionar" para ver el proyecto

### 5.4 Gestión de Proyecto
1. En el proyecto individual:
2. Prueba agregar un evento al timeline
3. Marca el evento como "visible para cliente"
4. Prueba enviar un mensaje en el chat

### 5.5 Portal del Cliente
1. Ve a `http://localhost:3000/cliente/login`
2. Ingresa el email que usaste en la solicitud
3. Deberías acceder al dashboard del cliente
4. Verifica que ves el evento marcado como visible
5. Prueba enviar un mensaje de vuelta

### 5.6 Blog
1. Ve a `http://localhost:3000/blog`
2. Verá que está vacío (normal)
3. Ve a `http://localhost:3000/admin/blog`
4. Crea un nuevo post
5. Publícalo
6. Vuelve a `/blog` y verifica que aparece

---

## 🎨 Paso 6: Personalización (Opcional)

### Colores
Edita `tailwind.config.js`:
```js
colors: {
  primary: {
    50: '#f0f9ff',
    // ... tus colores
  }
}
```

### Contenido
- Testimonios: `components/Testimonials.tsx`
- Precios: `components/Pricing.tsx`
- FAQs: `components/FAQ.tsx`

---

## 📊 Paso 7: Datos de Prueba (Opcional)

### Crear Solicitudes de Prueba

Ejecuta en SQL Editor de Supabase:

```sql
INSERT INTO solicitudes (
  nombre, email, telefono, empresa, 
  tipo_web, plan, descripcion, estado
) VALUES 
(
  'Juan Pérez', 
  'juan@ejemplo.com', 
  '666777888', 
  'Empresa Demo', 
  'Corporativa', 
  'Profesional', 
  'Proyecto de prueba',
  'en_proceso'
),
(
  'María García', 
  'maria@ejemplo.com', 
  '655444333', 
  'Tienda Online', 
  'E-commerce', 
  'Premium', 
  'Tienda de ropa',
  'pendiente'
);
```

### Crear Post de Prueba

```sql
INSERT INTO blog_posts (
  titulo, 
  slug, 
  extracto, 
  contenido, 
  categoria, 
  publicado, 
  fecha_publicacion,
  autor_nombre
) VALUES (
  '5 Razones para Tener una Web Profesional',
  '5-razones-web-profesional',
  'Descubre por qué tu negocio necesita una presencia online profesional en 2024.',
  '<h2>Por qué es importante</h2><p>En la era digital, tener una web profesional ya no es opcional...</p><h3>1. Credibilidad</h3><p>Los clientes confían más en negocios con presencia online.</p>',
  'Consejos',
  true,
  NOW(),
  'Equipo TuWebEn24h'
);
```

---

## 🔍 Troubleshooting

### Error: "Cannot find module @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

### Error: Las tablas no existen
- Verifica que ejecutaste el SQL completo
- Revisa los errores en el SQL Editor
- Asegúrate de tener permisos en el proyecto

### No puedo acceder al admin
- El admin NO requiere autenticación por ahora
- Simplemente ve a `/admin`
- En producción, deberías agregar autenticación

### El cliente no puede loguearse
- Verifica que existe una solicitud con ese email
- El email debe ser EXACTO (case-sensitive)
- Revisa la consola del navegador para errores

### Los archivos no se suben
- Es normal, Supabase Storage no está configurado aún
- Los archivos se registran en BD pero no se almacenan físicamente
- Para implementar Storage real, consulta la documentación

---

## 📚 Siguiente Paso

Una vez todo funcione localmente:

1. **Prueba todas las funcionalidades**
2. **Personaliza el contenido**
3. **Configura el despliegue** (ver DESPLIEGUE.md)
4. **Implementa Supabase Storage** para archivos reales
5. **Configura notificaciones por email**

---

## 🆘 Ayuda

Si tienes problemas:

1. Revisa los logs de la consola del navegador
2. Revisa los logs del terminal donde corre Next.js
3. Verifica las políticas RLS en Supabase
4. Consulta [FUNCIONALIDADES-NUEVAS.md](./FUNCIONALIDADES-NUEVAS.md)

---

## ✅ Checklist Final

Marca cuando completes cada paso:

- [ ] Node.js instalado
- [ ] Dependencias npm instaladas
- [ ] Proyecto Supabase creado
- [ ] SQL ejecutado correctamente
- [ ] Variables de entorno configuradas
- [ ] Proyecto corriendo en localhost
- [ ] Solicitud de prueba creada
- [ ] Dashboard admin funcionando
- [ ] Gestión de proyecto funcionando
- [ ] Portal cliente funcionando
- [ ] Post de blog creado
- [ ] Blog público funcionando

---

**¡Si completaste todos los pasos, tu sistema está listo! 🎉**

Ahora puedes empezar a usarlo o prepararlo para producción.


