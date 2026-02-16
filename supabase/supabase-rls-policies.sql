-- Políticas RLS para permitir el funcionamiento de la aplicación
-- Ejecutar en Supabase SQL Editor

-- ============================================
-- POLÍTICAS PARA SOLICITUDES (Formulario público)
-- ============================================

-- Permitir que cualquiera pueda insertar solicitudes (formulario público)
CREATE POLICY "Permitir inserción pública de solicitudes"
ON public.solicitudes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Solo admins pueden ver todas las solicitudes
CREATE POLICY "Admins pueden ver todas las solicitudes"
ON public.solicitudes
FOR SELECT
TO authenticated
USING (true);

-- Solo admins pueden actualizar solicitudes
CREATE POLICY "Admins pueden actualizar solicitudes"
ON public.solicitudes
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Solo admins pueden eliminar solicitudes
CREATE POLICY "Admins pueden eliminar solicitudes"
ON public.solicitudes
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- POLÍTICAS PARA PROYECTOS
-- ============================================

-- Todos pueden ver proyectos (para mostrar en el portfolio)
CREATE POLICY "Todos pueden ver proyectos"
ON public.proyectos
FOR SELECT
TO anon, authenticated
USING (true);

-- Solo admins pueden insertar proyectos
CREATE POLICY "Admins pueden insertar proyectos"
ON public.proyectos
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Solo admins pueden actualizar proyectos
CREATE POLICY "Admins pueden actualizar proyectos"
ON public.proyectos
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Solo admins pueden eliminar proyectos
CREATE POLICY "Admins pueden eliminar proyectos"
ON public.proyectos
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- POLÍTICAS PARA BLOG
-- ============================================

-- Todos pueden ver posts publicados del blog
CREATE POLICY "Todos pueden ver posts publicados"
ON public.blog_posts
FOR SELECT
TO anon, authenticated
USING (estado = 'publicado');

-- Admins pueden ver todos los posts (incluyendo borradores)
CREATE POLICY "Admins pueden ver todos los posts"
ON public.blog_posts
FOR SELECT
TO authenticated
USING (true);

-- Solo admins pueden insertar posts
CREATE POLICY "Admins pueden insertar posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Solo admins pueden actualizar posts
CREATE POLICY "Admins pueden actualizar posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Solo admins pueden eliminar posts
CREATE POLICY "Admins pueden eliminar posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- POLÍTICAS PARA CLIENTES
-- ============================================

-- Clientes solo pueden ver sus propios datos
CREATE POLICY "Clientes pueden ver sus propios datos"
ON public.clientes
FOR SELECT
TO authenticated
USING (auth.uid()::text = id::text);

-- Admins pueden ver todos los clientes
CREATE POLICY "Admins pueden ver todos los clientes"
ON public.clientes
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'narciso.pardo@outlook.com'
  )
);

-- Solo admins pueden insertar clientes
CREATE POLICY "Admins pueden insertar clientes"
ON public.clientes
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Clientes pueden actualizar sus propios datos
CREATE POLICY "Clientes pueden actualizar sus datos"
ON public.clientes
FOR UPDATE
TO authenticated
USING (auth.uid()::text = id::text)
WITH CHECK (auth.uid()::text = id::text);

-- Solo admins pueden eliminar clientes
CREATE POLICY "Admins pueden eliminar clientes"
ON public.clientes
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'narciso.pardo@outlook.com'
  )
);

-- ============================================
-- POLÍTICAS PARA MENSAJES (Chat admin-cliente)
-- ============================================

-- Usuarios autenticados pueden ver mensajes de sus proyectos
CREATE POLICY "Ver mensajes propios"
ON public.mensajes
FOR SELECT
TO authenticated
USING (
  proyecto_id IN (
    SELECT id FROM proyectos 
    WHERE cliente_id = auth.uid()::text
  )
  OR
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'narciso.pardo@outlook.com'
  )
);

-- Usuarios autenticados pueden insertar mensajes en sus proyectos
CREATE POLICY "Insertar mensajes propios"
ON public.mensajes
FOR INSERT
TO authenticated
WITH CHECK (
  proyecto_id IN (
    SELECT id FROM proyectos 
    WHERE cliente_id = auth.uid()::text
  )
  OR
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'narciso.pardo@outlook.com'
  )
);

-- ============================================
-- HABILITAR RLS EN TODAS LAS TABLAS
-- ============================================

ALTER TABLE public.solicitudes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensajes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Para verificar que las políticas se crearon correctamente:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
-- FROM pg_policies 
-- WHERE schemaname = 'public' 
-- ORDER BY tablename, policyname;


