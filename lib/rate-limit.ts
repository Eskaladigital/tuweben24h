// Sistema de rate limiting simple usando memoria
// En producción, usar Redis o similar

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Limpiar entradas expiradas cada 5 minutos
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}, 5 * 60 * 1000)

export function rateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutos por defecto
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = identifier

  // Si no existe o expiró, crear nueva entrada
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    }
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: store[key].resetTime
    }
  }

  // Incrementar contador
  store[key].count++

  // Verificar límite
  if (store[key].count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: store[key].resetTime
    }
  }

  return {
    allowed: true,
    remaining: maxRequests - store[key].count,
    resetTime: store[key].resetTime
  }
}

// Helper para obtener IP del request
export function getClientIP(request: Request): string {
  // Intentar obtener IP de headers comunes
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback
  return 'unknown'
}




