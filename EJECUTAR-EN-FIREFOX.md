# 🌐 Ejecutar tu Página Web en Firefox

Guía rápida para ejecutar tu página web en Firefox.

---

## 🚀 Pasos Rápidos

### Opción 1: Usar el Script Automático (Recomendado)

1. **Haz doble clic** en el archivo `iniciar-servidor.bat`
2. Espera a que el servidor inicie (verás mensajes en la ventana)
3. Abre Firefox
4. Ve a: `http://localhost:3000` (o el puerto que te indique)

### Opción 2: Manual desde Terminal

1. Abre PowerShell o Terminal en Cursor
2. Ejecuta:
   ```powershell
   cd C:\Users\Usuario\Desktop\tuweben24h.com
   npm run dev
   ```
3. Espera a ver el mensaje: `✓ Ready in X seconds`
4. Abre Firefox
5. Ve a la URL que te muestre (ejemplo: `http://localhost:3000`)

---

## 🔍 Verificar que Funciona

### 1. Página Principal
- Abre: `http://localhost:3000` (o el puerto que te indique)
- Deberías ver la página principal de TuWebEn24h

### 2. Formulario de Solicitud
- Abre: `http://localhost:3000/solicitar`
- Deberías poder completar y enviar el formulario

### 3. Probar Conexión con Supabase
- Abre: `http://localhost:3000/api/solicitudes`
- Deberías ver un mensaje indicando si la conexión funciona

---

## ⚠️ Problemas Comunes

### El servidor no inicia
- Verifica que Node.js esté instalado: `node --version`
- Verifica que las dependencias estén instaladas: `npm install`

### Error "Port already in use"
- El puerto 3000 está ocupado
- El servidor usará automáticamente el puerto 3001, 3002, etc.
- Usa la URL que te muestre en la terminal

### Error de conexión con Supabase
- Verifica que el archivo `.env.local` exista
- Reinicia el servidor después de crear/modificar `.env.local`
- Verifica las credenciales en Supabase → Settings → API

### La página no carga en Firefox
- Verifica que el servidor esté corriendo (deberías ver "Ready" en la terminal)
- Verifica que uses la URL correcta (con el puerto correcto)
- Prueba con `http://127.0.0.1:3000` en lugar de `localhost:3000`

---

## 📝 URLs Importantes

- **Página Principal:** `http://localhost:3000/`
- **Formulario:** `http://localhost:3000/solicitar`
- **Blog:** `http://localhost:3000/blog`
- **Admin:** `http://localhost:3000/admin`
- **API Test:** `http://localhost:3000/api/solicitudes`

---

## ✅ Checklist

- [ ] Servidor corriendo (`npm run dev`)
- [ ] Veo "Ready" en la terminal
- [ ] Puedo abrir `http://localhost:3000` en Firefox
- [ ] La página carga correctamente
- [ ] El formulario funciona
- [ ] Los datos se guardan en Supabase

---

## 🆘 Si Necesitas Ayuda

1. Revisa la terminal del servidor para ver errores
2. Abre la consola del navegador (F12) para ver errores de JavaScript
3. Verifica que el archivo `.env.local` tenga las credenciales correctas
4. Reinicia el servidor si cambiaste algo en `.env.local`

---

¡Listo! Tu página web debería estar funcionando en Firefox. 🎉





