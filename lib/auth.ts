/**
 * Utilidades de autenticación para el admin
 */

export const checkAdminAuth = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const isAuthenticated = localStorage.getItem('admin_authenticated')
  return isAuthenticated === 'true'
}

export const getAdminEmail = (): string | null => {
  if (typeof window === 'undefined') return null
  
  return localStorage.getItem('admin_email')
}

export const logoutAdmin = (): void => {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('admin_authenticated')
  localStorage.removeItem('admin_email')
  localStorage.removeItem('admin_login_time')
}

export const checkSessionExpiry = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const loginTime = localStorage.getItem('admin_login_time')
  if (!loginTime) return false
  
  const loginDate = new Date(loginTime)
  const now = new Date()
  const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)
  
  // Sesión expira después de 8 horas
  return hoursDiff < 8
}


