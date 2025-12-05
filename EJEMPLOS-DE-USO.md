# 📖 Ejemplos de Uso - TuWebEn24h

Guía práctica con ejemplos reales de cómo usar cada funcionalidad.

---

## 🎯 Escenarios Comunes

### 🔷 Escenario 1: Cliente Nuevo Solicita Web

#### Paso a Paso del Flujo

1. **Cliente llena formulario** (`/solicitar`)
   - Nombre: "Carlos Ruiz"
   - Email: "carlos@mirestaurante.com"
   - Empresa: "Restaurante El Sabor"
   - Plan: "Profesional"
   - Tipo: "Restaurante/Bar"

2. **Admin recibe notificación** (manual por ahora)
   - Ve la solicitud en `/admin`
   - Estado: "Pendiente"

3. **Admin contacta al cliente**
   - Cambia estado a "Contactado"
   - Click en "Gestionar"
   - Agrega evento: "Llamada realizada para confirmar detalles"
   - Marca visible para cliente ✓

4. **Admin inicia desarrollo**
   - Cambia estado a "En Proceso"
   - Agrega evento tipo "Hito": "Diseño inicial completado"
   - Sube archivo: "mockup-inicial.png" (categoría: diseño)

5. **Cliente revisa progreso**
   - Va a `/cliente/login`
   - Ingresa: carlos@mirestaurante.com
   - Ve timeline con eventos
   - Descarga mockup
   - Envía mensaje: "Me gusta el diseño, solo cambiar el logo"

6. **Admin responde**
   - Ve mensaje en chat
   - Responde: "Perfecto, lo ajustamos hoy mismo"
   - Agrega evento: "Ajuste de logo solicitado"

7. **Admin completa proyecto**
   - Cambia estado a "Revisión"
   - Sube archivo: "web-final.zip"
   - Envía mensaje: "Tu web está lista para revisión"

8. **Cliente aprueba**
   - Revisa la web
   - Envía mensaje: "¡Perfecto, me encanta!"

9. **Admin finaliza**
   - Cambia estado a "Completado"
   - Agrega evento tipo "Hito": "¡Proyecto completado con éxito!"

---

## 📝 Escenario 2: Publicar Artículo de Blog

### Crear Post: "Cómo Elegir el Mejor Plan para Tu Web"

1. **Ir al editor** (`/admin/blog` → "Nuevo Post")

2. **Completar información básica:**
   ```
   Título: Cómo Elegir el Mejor Plan para Tu Web
   (Slug se genera automático: como-elegir-el-mejor-plan-para-tu-web)
   ```

3. **Agregar extracto:**
   ```
   ¿No sabes qué plan elegir? Te ayudamos a decidir según 
   las necesidades de tu negocio.
   ```

4. **Escribir contenido (HTML):**
   ```html
   <h2>¿Por qué es importante elegir bien?</h2>
   <p>Elegir el plan adecuado puede marcar la diferencia entre 
   el éxito y el fracaso de tu proyecto web.</p>

   <h3>Plan Básico - Ideal para:</h3>
   <ul>
     <li>Negocios pequeños</li>
     <li>Páginas informativas</li>
     <li>Presupuestos ajustados</li>
   </ul>

   <h3>Plan Profesional - Ideal para:</h3>
   <ul>
     <li>Empresas medianas</li>
     <li>Necesitas varias páginas</li>
     <li>Formularios de contacto</li>
   </ul>

   <h3>Plan Premium - Ideal para:</h3>
   <ul>
     <li>E-commerce</li>
     <li>Funcionalidades avanzadas</li>
     <li>Integración con sistemas</li>
   </ul>

   <h2>¿Todavía con dudas?</h2>
   <p>Contáctanos y te ayudamos a elegir sin compromiso.</p>
   ```

5. **Configurar imagen destacada:**
   ```
   URL: https://images.unsplash.com/photo-1460925895917-afdab827c52f
   ```

6. **Seleccionar categoría:**
   ```
   Categoría: Consejos
   ```

7. **Agregar etiquetas:**
   ```
   - planes
   - precio
   - guia
   - principiantes
   ```

8. **Optimizar SEO:**
   ```
   Título SEO: Cómo Elegir el Mejor Plan Web | TuWebEn24h
   Descripción SEO: Guía completa para elegir el plan perfecto 
   para tu negocio. Compara características y precios.
   ```

9. **Publicar:**
   - Click en "Publicar"
   - Verificar en `/blog`

---

## 💬 Escenario 3: Gestión de Comunicación con Cliente

### Situación: Cliente tiene dudas sobre funcionalidad

**Cliente envía mensaje:**
```
"Hola, tengo una duda. ¿Es posible agregar un formulario 
de reservas en lugar del formulario de contacto normal?"
```

**Admin responde (en `/admin/proyecto/[id]` → Chat):**
```
"¡Hola! Sí, claro que podemos hacerlo. El formulario de 
reservas incluiría:
- Selección de fecha
- Selección de hora
- Número de personas
- Comentarios especiales

¿Te parece bien? Lo agregamos sin costo adicional."
```

**Cliente confirma:**
```
"¡Perfecto! Sí, me parece ideal. Gracias."
```

**Admin registra en timeline:**
```
Tipo: Nota
Título: "Funcionalidad extra agregada: Formulario de reservas"
Descripción: "Cliente solicitó cambiar formulario de contacto 
por uno de reservas. Implementado sin costo adicional."
Visible para cliente: ✓
```

---

## 🗂️ Escenario 4: Organización de Archivos del Proyecto

### Proyecto: Tienda Online "ModaZone"

**Estructura de archivos recomendada:**

```
📁 Diseño (visible cliente)
   - mockup-home.png
   - mockup-productos.png
   - paleta-colores.pdf

📁 Contenido (visible cliente)
   - textos-paginas.docx
   - imagenes-productos.zip

📁 Documento (visible cliente)
   - contrato-servicios.pdf
   - manual-uso.pdf

📁 Imagen (no visible)
   - recursos-desarrollo.zip
   - assets-originales.zip

📁 Otro (visible cliente)
   - credenciales-hosting.txt
   - web-final-entrega.zip
```

**Timeline correspondiente:**

```
[Hito] Diseño aprobado por cliente
[Archivo] mockup-home.png subido
[Archivo] mockup-productos.png subido
[Nota] Cliente pidió cambios en footer
[Cambio estado] De "En Proceso" a "Revisión"
[Archivo] web-final-entrega.zip subido
[Hito] ¡Proyecto completado!
```

---

## 📊 Escenario 5: Gestión de Múltiples Proyectos

### Dashboard Admin con 5 proyectos activos

**Vista organizada:**

```
🟡 Pendientes (2)
   - "Gimnasio FitLife" - hace 2 horas
   - "Consultoría Legal" - hace 1 día

🔵 Contactados (1)
   - "Peluquería Estilo" - hace 3 días

🟣 En Proceso (2)
   - "Restaurante El Sabor" - hace 1 semana
   - "Tienda ModaZone" - hace 4 días

🟠 En Revisión (0)

🟢 Completados (12)
```

**Usando filtros:**

1. **Buscar por urgencia:**
   - Filtro: "Pendiente"
   - Buscar: "FitLife"
   - Click "Gestionar" → Cambiar a "Contactado"

2. **Ver todos en proceso:**
   - Filtro: "En Proceso"
   - Revisar cada uno
   - Actualizar timelines

3. **Exportar informe:**
   - Filtro: "Completados"
   - Click "Exportar CSV"
   - Revisar métricas mensuales

---

## 🎨 Escenario 6: Cliente Revisa Su Proyecto

### Perspectiva del Cliente: "Restaurante El Sabor"

**1. Login:**
```
Email: carlos@mirestaurante.com
```

**2. Dashboard muestra:**
```
Estado: 🟣 En Desarrollo
"Estamos trabajando en tu web. ¡Ya falta menos!"

Plan: Profesional
Tipo: Restaurante/Bar
Fecha solicitud: 15 de octubre de 2024
```

**3. Pestaña "Progreso":**
```
✓ Llamada realizada para confirmar detalles
  hace 7 días

✓ Diseño inicial completado
  hace 5 días

✓ Ajuste de logo solicitado
  hace 3 días

✓ Sección de menú agregada
  hace 1 día
```

**4. Pestaña "Archivos":**
```
📄 mockup-inicial.png (245 KB)
   15 octubre 2024
   [Descargar]

📄 paleta-colores.pdf (89 KB)
   16 octubre 2024
   [Descargar]

📄 manual-uso.pdf (1.2 MB)
   18 octubre 2024
   [Descargar]
```

**5. Pestaña "Mensajes":**
```
[Admin] Perfecto, lo ajustamos hoy mismo
        17 octubre, 14:30

[Carlos] Me gusta el diseño, solo cambiar el logo
         17 octubre, 10:15

[Admin] Hemos agregado la sección del menú
        19 octubre, 16:45

[Carlos] ¿Podríamos agregar un formulario de reservas?
         20 octubre, 09:00

[Admin] ¡Sí, claro que podemos! Lo agregamos sin costo
        20 octubre, 09:15
```

---

## 📈 Escenario 7: Blog - Estrategia de Contenido

### Publicaciones Mensuales Recomendadas

**Semana 1 - Educativo:**
```
Título: "5 Errores Comunes al Crear tu Primera Web"
Categoría: Consejos
Etiquetas: principiantes, errores, guia
```

**Semana 2 - SEO:**
```
Título: "Cómo Optimizar tu Web para Google en 2024"
Categoría: SEO
Etiquetas: google, optimizacion, seo
```

**Semana 3 - Caso de Éxito:**
```
Título: "Cómo 'Restaurante El Sabor' Triplicó Sus Reservas"
Categoría: Casos de Éxito
Etiquetas: caso-exito, restaurante, resultados
```

**Semana 4 - Tutorial:**
```
Título: "Tutorial: Cómo Actualizar el Contenido de Tu Web"
Categoría: Tutoriales
Etiquetas: tutorial, guia, cms
```

---

## 🔄 Escenario 8: Flujo Completo de Principio a Fin

### Timeline de 7 Días

**Día 1 - Lunes:**
- 10:00 - Cliente solicita web
- 11:00 - Admin revisa solicitud
- 12:00 - Admin llama al cliente
- 12:30 - Estado: "Contactado"

**Día 2 - Martes:**
- 09:00 - Admin inicia diseño
- 11:00 - Estado: "En Proceso"
- 16:00 - Mockup inicial completado
- 16:30 - Admin sube mockup
- 17:00 - Cliente recibe notificación (cuando se implemente)

**Día 3 - Miércoles:**
- 10:00 - Cliente revisa mockup
- 10:30 - Cliente pide ajustes vía chat
- 14:00 - Admin realiza ajustes
- 16:00 - Admin informa ajustes completados

**Día 4 - Jueves:**
- 09:00 - Admin desarrolla funcionalidades
- 15:00 - Primera versión lista
- 16:00 - Admin sube versión de prueba

**Día 5 - Viernes:**
- 10:00 - Estado: "Revisión"
- 11:00 - Cliente prueba la web
- 12:00 - Cliente aprueba
- 14:00 - Admin hace deploy
- 15:00 - Estado: "Completado"

**Día 6-7 - Fin de semana:**
- Admin crea post de blog con caso de éxito
- Cliente disfruta de su nueva web 🎉

---

## 💡 Tips y Mejores Prácticas

### Para Admins:

1. **Mantén el timeline actualizado**
   - Registra todos los hitos importantes
   - Marca eventos importantes como visibles para cliente
   - Usa descripciones claras

2. **Organiza los archivos**
   - Usa categorías apropiadas
   - Nombra archivos de forma descriptiva
   - Solo marca como visible lo que el cliente necesita ver

3. **Comunicación efectiva**
   - Responde mensajes rápido
   - Sé claro y profesional
   - Anticipa necesidades del cliente

### Para Contenido del Blog:

1. **Publica regularmente**
   - Mínimo 1 post por semana
   - Varía las categorías
   - Responde preguntas frecuentes

2. **Optimiza para SEO**
   - Títulos descriptivos
   - Meta descripciones atractivas
   - Usa etiquetas relevantes

3. **Imágenes de calidad**
   - Usa Unsplash o Pexels
   - Tamaño apropiado (1200x630 ideal)
   - Relacionadas con el contenido

---

## 🎯 Ejercicios Prácticos

### Ejercicio 1: Simular Proyecto Completo

1. Crea una solicitud como cliente
2. Gestiona el proyecto como admin
3. Accede como cliente y revisa
4. Completa el ciclo hasta "Completado"

### Ejercicio 2: Crear Serie de Blog Posts

1. Crea 3 posts relacionados
2. Usa diferentes categorías
3. Comparte etiquetas entre ellos
4. Verifica que aparecen como relacionados

### Ejercicio 3: Gestión de Crisis

Simula que un cliente no está conforme:
1. Cliente envía mensaje de queja
2. Admin responde profesionalmente
3. Admin ofrece solución
4. Registra todo en timeline
5. Resuelve el problema

---

**¿Necesitas más ejemplos? Consulta la documentación completa en [FUNCIONALIDADES-NUEVAS.md](./FUNCIONALIDADES-NUEVAS.md)**


