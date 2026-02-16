-- Script para configurar Supabase Storage
-- Ejecutar en Supabase SQL Editor después de crear las tablas

-- Crear bucket para archivos de proyectos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'proyectos',
  'proyectos',
  false, -- Privado por defecto
  10485760, -- 10MB máximo
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/zip', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
)
ON CONFLICT (id) DO NOTHING;

-- Crear bucket para imágenes del blog
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog',
  'blog',
  true, -- Público para que las imágenes se puedan mostrar
  5242880, -- 5MB máximo
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Políticas para bucket de proyectos
-- Solo usuarios autenticados pueden subir
CREATE POLICY "Admin puede subir archivos de proyectos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'proyectos');

-- Solo usuarios autenticados pueden leer
CREATE POLICY "Admin puede leer archivos de proyectos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'proyectos');

-- Solo usuarios autenticados pueden eliminar
CREATE POLICY "Admin puede eliminar archivos de proyectos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'proyectos');

-- Políticas para bucket de blog
-- Cualquiera puede leer (público)
CREATE POLICY "Todos pueden leer imágenes del blog"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog');

-- Solo usuarios autenticados pueden subir
CREATE POLICY "Admin puede subir imágenes del blog"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog');

-- Solo usuarios autenticados pueden eliminar
CREATE POLICY "Admin puede eliminar imágenes del blog"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog');

-- Comentarios
COMMENT ON POLICY "Admin puede subir archivos de proyectos" ON storage.objects IS 'Permite a admins subir archivos relacionados con proyectos';
COMMENT ON POLICY "Todos pueden leer imágenes del blog" ON storage.objects IS 'Las imágenes del blog son públicas para que se puedan mostrar en el sitio';



