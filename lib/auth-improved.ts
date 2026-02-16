// Sistema de autenticación mejorado con Supabase Auth
import { supabase } from './supabase'

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'cliente'
  nombre?: string
}

/**
 * Login con Supabase Auth
 */
export async function loginWithEmail(email: string, password: string): Promise<{
  success: boolean
  user?: AuthUser
  error?: string
}> {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase no configurado' }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: 'Usuario no encontrado' }
    }

    // Obtener metadata del usuario (rol, nombre, etc.)
    const userMetadata = data.user.user_metadata || {}
    
    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
        role: userMetadata.role || 'cliente',
        nombre: userMetadata.nombre
      }
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error desconocido' }
  }
}

/**
 * Registro de nuevo usuario
 */
export async function signUp(email: string, password: string, metadata?: {
  nombre?: string
  role?: 'admin' | 'cliente'
}): Promise<{
  success: boolean
  user?: AuthUser
  error?: string
}> {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase no configurado' }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: metadata?.nombre,
          role: metadata?.role || 'cliente'
        }
      }
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: 'Error al crear usuario' }
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
        role: metadata?.role || 'cliente',
        nombre: metadata?.nombre
      }
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error desconocido' }
  }
}

/**
 * Cerrar sesión
 */
export async function logout(): Promise<{ success: boolean; error?: string }> {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase no configurado' }
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error desconocido' }
  }
}

/**
 * Obtener usuario actual
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    if (!supabase) {
      return null
    }

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    const metadata = user.user_metadata || {}

    return {
      id: user.id,
      email: user.email || '',
      role: metadata.role || 'cliente',
      nombre: metadata.nombre
    }
  } catch {
    return null
  }
}

/**
 * Recuperar contraseña
 */
export async function resetPassword(email: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase no configurado' }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error desconocido' }
  }
}

/**
 * Verificar si el usuario está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Verificar si el usuario es admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}




