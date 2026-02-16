# ⚡ Inicio Rápido: Configuración de Supabase

Guía rápida de 5 minutos para configurar Supabase.

---

## 🚀 Pasos Rápidos

### 1️⃣ Crear proyecto en Supabase
- Ve a [supabase.com](https://supabase.com)
- Crea cuenta → "New Project"
- Nombre: `tuweben24h`
- Guarda la contraseña de la base de datos
- Espera 2-3 minutos

### 2️⃣ Ejecutar SQL
- En Supabase: **SQL Editor** → **New query**
- Abre `supabase-schema.sql` de tu proyecto
- Copia TODO el contenido
- Pégalo en Supabase y ejecuta (Run o Ctrl+Enter)
- ✅ Verifica en **Table Editor** que se crearon las tablas

### 3️⃣ Obtener credenciales
- En Supabase: **Settings** → **API**
- Copia:
  - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
  - **anon public key** (clave larga que empieza con `eyJ...`)

### 4️⃣ Configurar .env.local
- En tu proyecto, crea/edita `.env.local`
- Pega esto y reemplaza con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 5️⃣ Reiniciar servidor
```powershell
# Detener servidor (Ctrl+C)
npm run dev
```

### 6️⃣ Probar
- Ve a `http://localhost:3000/solicitar`
- Completa el formulario de prueba
- Verifica en Supabase → **Table Editor** → **solicitudes** que apareció tu solicitud

---

## ✅ ¿Funciona?

Si ves tu solicitud en Supabase → ✅ **¡Todo correcto!**

Si no funciona → Revisa la **[Guía Completa](GUIA-SUPABASE.md)** o la sección de solución de problemas.

---

## 📖 Documentación Completa

Para más detalles, consulta: **[GUIA-SUPABASE.md](GUIA-SUPABASE.md)**







