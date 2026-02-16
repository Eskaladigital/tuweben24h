// Utilidades para Supabase Storage
import { supabase } from './supabase'

const BUCKET_PROYECTOS = 'proyectos'
const BUCKET_BLOG = 'blog'

export interface UploadResult {
  success: boolean
  path?: string
  url?: string
  error?: string
}

/**
 * Subir archivo a Supabase Storage
 */
export async function uploadFile(
  bucket: string,
  file: File | Blob,
  path: string,
  options?: {
    cacheControl?: string
    contentType?: string
    upsert?: boolean
  }
): Promise<UploadResult> {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase no configurado' }
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: options?.cacheControl || '3600',
        contentType: options?.contentType || file.type,
        upsert: options?.upsert || false
      })

    if (error) {
      console.error('Error subiendo archivo:', error)
      return { success: false, error: error.message }
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return {
      success: true,
      path: data.path,
      url: urlData.publicUrl
    }
  } catch (error: any) {
    console.error('Error en uploadFile:', error)
    return { success: false, error: error.message || 'Error desconocido' }
  }
}

/**
 * Subir archivo de proyecto
 */
export async function uploadProyectoArchivo(
  solicitudId: string,
  file: File,
  categoria: 'diseño' | 'contenido' | 'documento' | 'imagen' | 'otro'
): Promise<UploadResult> {
  const timestamp = Date.now()
  const extension = file.name.split('.').pop()
  const fileName = `${solicitudId}/${categoria}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  
  return uploadFile(BUCKET_PROYECTOS, file, fileName, {
    contentType: file.type
  })
}

/**
 * Subir imagen del blog
 */
export async function uploadBlogImage(
  slug: string,
  file: File
): Promise<UploadResult> {
  const extension = file.name.split('.').pop()
  const fileName = `${slug}/imagen-destacada.${extension}`
  
  return uploadFile(BUCKET_BLOG, file, fileName, {
    contentType: file.type,
    upsert: true
  })
}

/**
 * Eliminar archivo de Storage
 */
export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase no configurado' }
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error('Error eliminando archivo:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error en deleteFile:', error)
    return { success: false, error: error.message || 'Error desconocido' }
  }
}

/**
 * Obtener URL pública de un archivo
 */
export function getPublicUrl(bucket: string, path: string): string {
  if (!supabase) {
    return ''
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return data.publicUrl
}

/**
 * Verificar si un bucket existe
 */
export async function bucketExists(bucket: string): Promise<boolean> {
  try {
    if (!supabase) {
      return false
    }

    const { data, error } = await supabase.storage.listBuckets()
    
    if (error) {
      return false
    }

    return data.some(b => b.name === bucket)
  } catch {
    return false
  }
}




