-- Tabla de solicitudes
create table solicitudes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Información básica
  nombre text not null,
  email text not null,
  telefono text not null,
  empresa text not null,
  
  -- Tipo de web
  tipo_web text,
  plan text,
  paginas text,
  
  -- Detalles
  descripcion text,
  funcionalidades text[],
  referencias text,
  colores text,
  
  -- Extras
  tiene_contenido text,
  tiene_dominio text,
  dominio text,
  fecha_lanzamiento date,
  comentarios text,
  
  -- Estado
  estado text default 'pendiente' check (estado in ('pendiente', 'contactado', 'en_proceso', 'revision', 'completado', 'cancelado')),
  
  -- Notas internas (solo admin)
  notas_internas text,
  prioridad text default 'normal' check (prioridad in ('baja', 'normal', 'alta', 'urgente')),
  
  -- Seguimiento
  fecha_contacto timestamp with time zone,
  fecha_inicio timestamp with time zone,
  fecha_entrega timestamp with time zone,
  fecha_completado timestamp with time zone,
  
  -- Asignación
  asignado_a uuid references auth.users(id)
);

-- Índices para mejorar rendimiento
create index idx_solicitudes_created_at on solicitudes(created_at desc);
create index idx_solicitudes_estado on solicitudes(estado);
create index idx_solicitudes_email on solicitudes(email);
create index idx_solicitudes_asignado on solicitudes(asignado_a);

-- Trigger para actualizar updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_solicitudes_updated_at
  before update on solicitudes
  for each row
  execute function update_updated_at_column();

-- Habilitar Row Level Security
alter table solicitudes enable row level security;

-- Políticas de seguridad

-- Permitir inserciones públicas (para el formulario)
create policy "Permitir inserciones públicas"
  on solicitudes for insert
  with check (true);

-- Solo usuarios autenticados pueden leer
create policy "Admin puede leer todo"
  on solicitudes for select
  using (auth.role() = 'authenticated');

-- Solo usuarios autenticados pueden actualizar
create policy "Admin puede actualizar"
  on solicitudes for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Solo usuarios autenticados pueden eliminar
create policy "Admin puede eliminar"
  on solicitudes for delete
  using (auth.role() = 'authenticated');

-- Tabla de plantillas de email (opcional)
create table email_templates (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nombre text not null unique,
  asunto text not null,
  contenido text not null,
  variables text[], -- Variables disponibles para reemplazar
  activo boolean default true
);

-- Tabla de historial de emails enviados (opcional)
create table email_log (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  solicitud_id uuid references solicitudes(id) on delete cascade,
  destinatario text not null,
  asunto text not null,
  template_id uuid references email_templates(id),
  estado text check (estado in ('enviado', 'fallido', 'rebotado')),
  error_mensaje text
);

-- Tabla de configuración del sitio (opcional)
create table configuracion (
  id uuid default gen_random_uuid() primary key,
  clave text not null unique,
  valor text,
  tipo text check (tipo in ('texto', 'numero', 'booleano', 'json')),
  descripcion text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insertar configuraciones por defecto
insert into configuracion (clave, valor, tipo, descripcion) values
  ('email_admin', 'admin@tuweben24h.com', 'texto', 'Email del administrador'),
  ('telefono_contacto', '+34 900 000 000', 'texto', 'Teléfono de contacto'),
  ('precio_basico', '299', 'numero', 'Precio del plan básico'),
  ('precio_profesional', '599', 'numero', 'Precio del plan profesional'),
  ('precio_premium', '999', 'numero', 'Precio del plan premium'),
  ('max_solicitudes_dia', '10', 'numero', 'Máximo de solicitudes por día'),
  ('notificaciones_activas', 'true', 'booleano', 'Activar notificaciones por email');

-- Vista para estadísticas (opcional pero útil)
create or replace view estadisticas_solicitudes as
select
  count(*) as total,
  count(*) filter (where estado = 'pendiente') as pendientes,
  count(*) filter (where estado = 'en_proceso') as en_proceso,
  count(*) filter (where estado = 'completado') as completados,
  count(*) filter (where estado = 'cancelado') as cancelados,
  count(*) filter (where created_at >= current_date - interval '7 days') as ultimos_7_dias,
  count(*) filter (where created_at >= current_date - interval '30 days') as ultimos_30_dias,
  avg(
    case 
      when fecha_completado is not null and fecha_inicio is not null
      then extract(epoch from (fecha_completado - fecha_inicio))/3600
    end
  ) as horas_promedio_entrega
from solicitudes;

-- Función para obtener próximas tareas (opcional)
create or replace function proximas_tareas()
returns table (
  solicitud_id uuid,
  empresa text,
  estado text,
  dias_desde_creacion integer,
  prioridad text
) as $$
begin
  return query
  select
    s.id,
    s.empresa,
    s.estado,
    extract(day from now() - s.created_at)::integer,
    s.prioridad
  from solicitudes s
  where s.estado in ('pendiente', 'contactado', 'en_proceso')
  order by
    case s.prioridad
      when 'urgente' then 1
      when 'alta' then 2
      when 'normal' then 3
      when 'baja' then 4
    end,
    s.created_at asc
  limit 20;
end;
$$ language plpgsql;

-- Comentarios para documentación
comment on table solicitudes is 'Almacena todas las solicitudes de creación de webs';
comment on column solicitudes.estado is 'Estado actual: pendiente, contactado, en_proceso, revision, completado, cancelado';
comment on column solicitudes.prioridad is 'Nivel de prioridad: baja, normal, alta, urgente';
comment on column solicitudes.funcionalidades is 'Array de funcionalidades solicitadas';

-- ===========================================
-- NUEVAS TABLAS PARA FUNCIONALIDADES AVANZADAS
-- ===========================================

-- Tabla de timeline/eventos del proyecto
create table proyecto_eventos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  solicitud_id uuid references solicitudes(id) on delete cascade not null,
  tipo text not null check (tipo in ('nota', 'cambio_estado', 'archivo', 'mensaje', 'hito', 'recordatorio')),
  titulo text not null,
  descripcion text,
  metadata jsonb, -- Para datos adicionales específicos del tipo
  usuario_id uuid references auth.users(id),
  visible_cliente boolean default false -- Si el cliente puede ver este evento
);

create index idx_proyecto_eventos_solicitud on proyecto_eventos(solicitud_id, created_at desc);
create index idx_proyecto_eventos_tipo on proyecto_eventos(tipo);

-- Tabla de archivos del proyecto
create table proyecto_archivos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  solicitud_id uuid references solicitudes(id) on delete cascade not null,
  nombre text not null,
  ruta text not null, -- Ruta en Supabase Storage
  tamano bigint, -- Tamaño en bytes
  tipo_archivo text, -- MIME type
  categoria text check (categoria in ('diseño', 'contenido', 'documento', 'imagen', 'otro')),
  subido_por uuid references auth.users(id),
  visible_cliente boolean default true,
  descripcion text
);

create index idx_proyecto_archivos_solicitud on proyecto_archivos(solicitud_id, created_at desc);

-- Tabla de mensajes/chat
create table mensajes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  solicitud_id uuid references solicitudes(id) on delete cascade not null,
  usuario_id uuid references auth.users(id),
  autor_email text not null, -- Email del autor (cliente o admin)
  autor_nombre text not null, -- Nombre del autor
  mensaje text not null,
  es_admin boolean default false, -- Si es mensaje del admin o del cliente
  leido boolean default false,
  archivo_adjunto text -- Referencia opcional a un archivo
);

create index idx_mensajes_solicitud on mensajes(solicitud_id, created_at desc);
create index idx_mensajes_leido on mensajes(leido) where leido = false;

-- Tabla de clientes (para login de clientes)
create table clientes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null unique,
  nombre text not null,
  telefono text,
  empresa text,
  password_hash text, -- Para login simple (o podemos usar Supabase Auth)
  activo boolean default true,
  ultima_conexion timestamp with time zone
);

create index idx_clientes_email on clientes(email);

-- Relación cliente-solicitud
alter table solicitudes add column cliente_id uuid references clientes(id);
create index idx_solicitudes_cliente on solicitudes(cliente_id);

-- Tabla de posts del blog
create table blog_posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  titulo text not null,
  slug text not null unique,
  extracto text,
  contenido text not null,
  imagen_destacada text, -- URL de la imagen
  autor_id uuid references auth.users(id),
  autor_nombre text,
  categoria text,
  etiquetas text[],
  publicado boolean default false,
  fecha_publicacion timestamp with time zone,
  vistas integer default 0,
  seo_titulo text,
  seo_descripcion text
);

create index idx_blog_posts_slug on blog_posts(slug);
create index idx_blog_posts_publicado on blog_posts(publicado, fecha_publicacion desc);
create index idx_blog_posts_categoria on blog_posts(categoria);

-- Trigger para updated_at en nuevas tablas
create trigger update_proyecto_eventos_updated_at
  before update on proyecto_eventos
  for each row
  execute function update_updated_at_column();

create trigger update_clientes_updated_at
  before update on clientes
  for each row
  execute function update_updated_at_column();

create trigger update_blog_posts_updated_at
  before update on blog_posts
  for each row
  execute function update_updated_at_column();

-- ===========================================
-- POLÍTICAS DE SEGURIDAD - Row Level Security
-- ===========================================

-- Proyecto Eventos
alter table proyecto_eventos enable row level security;

create policy "Admin puede ver todos los eventos"
  on proyecto_eventos for select
  using (auth.role() = 'authenticated');

create policy "Admin puede crear eventos"
  on proyecto_eventos for insert
  with check (auth.role() = 'authenticated');

create policy "Admin puede actualizar eventos"
  on proyecto_eventos for update
  using (auth.role() = 'authenticated');

create policy "Admin puede eliminar eventos"
  on proyecto_eventos for delete
  using (auth.role() = 'authenticated');

-- Proyecto Archivos
alter table proyecto_archivos enable row level security;

create policy "Admin puede ver todos los archivos"
  on proyecto_archivos for select
  using (auth.role() = 'authenticated');

create policy "Admin puede subir archivos"
  on proyecto_archivos for insert
  with check (auth.role() = 'authenticated');

create policy "Admin puede actualizar archivos"
  on proyecto_archivos for update
  using (auth.role() = 'authenticated');

create policy "Admin puede eliminar archivos"
  on proyecto_archivos for delete
  using (auth.role() = 'authenticated');

-- Mensajes
alter table mensajes enable row level security;

create policy "Admin puede ver todos los mensajes"
  on mensajes for select
  using (auth.role() = 'authenticated');

create policy "Cualquiera puede crear mensajes"
  on mensajes for insert
  with check (true);

create policy "Admin puede actualizar mensajes"
  on mensajes for update
  using (auth.role() = 'authenticated');

-- Clientes
alter table clientes enable row level security;

create policy "Admin puede ver todos los clientes"
  on clientes for select
  using (auth.role() = 'authenticated');

create policy "Admin puede crear clientes"
  on clientes for insert
  with check (auth.role() = 'authenticated');

create policy "Admin puede actualizar clientes"
  on clientes for update
  using (auth.role() = 'authenticated');

-- Blog Posts
alter table blog_posts enable row level security;

create policy "Todos pueden ver posts publicados"
  on blog_posts for select
  using (publicado = true or auth.role() = 'authenticated');

create policy "Admin puede crear posts"
  on blog_posts for insert
  with check (auth.role() = 'authenticated');

create policy "Admin puede actualizar posts"
  on blog_posts for update
  using (auth.role() = 'authenticated');

create policy "Admin puede eliminar posts"
  on blog_posts for delete
  using (auth.role() = 'authenticated');

-- ===========================================
-- FUNCIONES Y VISTAS ÚTILES
-- ===========================================

-- Vista de actividad reciente
create or replace view actividad_reciente as
select
  pe.id,
  pe.created_at,
  pe.solicitud_id,
  s.empresa,
  s.nombre as cliente_nombre,
  pe.tipo,
  pe.titulo,
  pe.descripcion
from proyecto_eventos pe
join solicitudes s on s.id = pe.solicitud_id
order by pe.created_at desc
limit 50;

-- Función para obtener estadísticas del dashboard
create or replace function dashboard_stats()
returns json as $$
declare
  result json;
begin
  select json_build_object(
    'total_solicitudes', (select count(*) from solicitudes),
    'pendientes', (select count(*) from solicitudes where estado = 'pendiente'),
    'en_proceso', (select count(*) from solicitudes where estado = 'en_proceso'),
    'completados', (select count(*) from solicitudes where estado = 'completado'),
    'ultimos_7_dias', (select count(*) from solicitudes where created_at >= current_date - interval '7 days'),
    'mensajes_sin_leer', (select count(*) from mensajes where leido = false and es_admin = false),
    'posts_publicados', (select count(*) from blog_posts where publicado = true),
    'archivos_subidos', (select count(*) from proyecto_archivos)
  ) into result;
  
  return result;
end;
$$ language plpgsql;

-- Comentarios para documentación
comment on table proyecto_eventos is 'Timeline de eventos de cada proyecto';
comment on table proyecto_archivos is 'Archivos subidos relacionados con proyectos';
comment on table mensajes is 'Sistema de chat entre admin y clientes';
comment on table clientes is 'Registro de clientes con acceso al portal';
comment on table blog_posts is 'Posts del blog corporativo';
