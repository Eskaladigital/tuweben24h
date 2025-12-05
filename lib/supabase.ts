import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las solicitudes
export interface Solicitud {
  id?: string
  created_at?: string
  updated_at?: string
  nombre: string
  email: string
  telefono: string
  empresa: string
  tipo_web: string
  plan: string
  paginas: string
  descripcion: string
  funcionalidades: string[]
  referencias: string
  colores: string
  tiene_contenido: string
  tiene_dominio: string
  dominio: string
  fecha_lanzamiento: string
  comentarios: string
  estado: 'pendiente' | 'contactado' | 'en_proceso' | 'revision' | 'completado' | 'cancelado'
  notas_internas?: string
  prioridad?: 'baja' | 'normal' | 'alta' | 'urgente'
  fecha_contacto?: string
  fecha_inicio?: string
  fecha_entrega?: string
  fecha_completado?: string
  asignado_a?: string
  cliente_id?: string
}

// Tipos para eventos del proyecto
export interface ProyectoEvento {
  id?: string
  created_at?: string
  solicitud_id: string
  tipo: 'nota' | 'cambio_estado' | 'archivo' | 'mensaje' | 'hito' | 'recordatorio'
  titulo: string
  descripcion?: string
  metadata?: any
  usuario_id?: string
  visible_cliente: boolean
}

// Tipos para archivos del proyecto
export interface ProyectoArchivo {
  id?: string
  created_at?: string
  solicitud_id: string
  nombre: string
  ruta: string
  tamano?: number
  tipo_archivo?: string
  categoria?: 'diseño' | 'contenido' | 'documento' | 'imagen' | 'otro'
  subido_por?: string
  visible_cliente: boolean
  descripcion?: string
}

// Tipos para mensajes
export interface Mensaje {
  id?: string
  created_at?: string
  solicitud_id: string
  usuario_id?: string
  autor_email: string
  autor_nombre: string
  mensaje: string
  es_admin: boolean
  leido: boolean
  archivo_adjunto?: string
}

// Tipos para clientes
export interface Cliente {
  id?: string
  created_at?: string
  updated_at?: string
  email: string
  nombre: string
  telefono?: string
  empresa?: string
  password_hash?: string
  activo: boolean
  ultima_conexion?: string
}

// Tipos para posts del blog
export interface BlogPost {
  id?: string
  created_at?: string
  updated_at?: string
  titulo: string
  slug: string
  extracto?: string
  contenido: string
  imagen_destacada?: string
  autor_id?: string
  autor_nombre?: string
  categoria?: string
  etiquetas?: string[]
  publicado: boolean
  fecha_publicacion?: string
  vistas?: number
  seo_titulo?: string
  seo_descripcion?: string
}
