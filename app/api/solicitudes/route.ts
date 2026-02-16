import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { enviarEmailConfirmacionCliente, enviarEmailNotificacionAdmin } from '@/lib/email/templates'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    // Rate limiting: máximo 5 solicitudes por IP cada 15 minutos
    const clientIP = getClientIP(request)
    const limit = rateLimit(`solicitud:${clientIP}`, 5, 15 * 60 * 1000)
    
    if (!limit.allowed) {
      const resetMinutes = Math.ceil((limit.resetTime - Date.now()) / 60000)
      return NextResponse.json(
        { 
          error: 'Demasiadas solicitudes',
          details: `Has enviado demasiadas solicitudes. Por favor, espera ${resetMinutes} minutos antes de intentar de nuevo.`,
          resetTime: limit.resetTime
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((limit.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(limit.resetTime)
          }
        }
      )
    }

    const body = await request.json()
    
    // Validación básica de campos requeridos
    if (!body.nombre || !body.email || !body.telefono || !body.empresa || !body.plan) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes', details: 'Por favor completa todos los campos obligatorios' },
        { status: 400 }
      )
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido', details: 'Por favor ingresa un email válido' },
        { status: 400 }
      )
    }

    // Sanitización básica (prevenir XSS)
    const sanitize = (str: string) => {
      if (typeof str !== 'string') return str
      return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .substring(0, 1000) // Limitar longitud
    }
    
    console.log('📝 Nueva solicitud recibida:', {
      nombre: body.nombre,
      email: body.email,
      plan: body.plan,
      fecha: new Date().toISOString()
    })

    // Verificar que Supabase esté configurado
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Variables de entorno faltantes:')
      console.error('URL:', supabaseUrl || '❌ FALTA')
      console.error('KEY:', supabaseKey ? '✅ Configurada' : '❌ FALTA')
      
      return NextResponse.json(
        { 
          error: 'Error de configuración del servidor',
          details: 'Las variables de entorno de Supabase no están configuradas. Verifica el archivo .env.local',
          debug: {
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseKey
          }
        },
        { status: 500 }
      )
    }

    if (!supabase) {
      console.error('❌ Cliente de Supabase no inicializado')
      return NextResponse.json(
        { 
          error: 'Error de configuración del servidor',
          details: 'No se pudo inicializar el cliente de Supabase'
        },
        { status: 500 }
      )
    }

    // Mapear los campos del formulario a los campos de la base de datos (con sanitización)
    const solicitudData = {
      nombre: sanitize(body.nombre),
      email: body.email.toLowerCase().trim(),
      telefono: sanitize(body.telefono),
      empresa: sanitize(body.empresa),
      plan: sanitize(body.plan),
      descripcion: body.descripcion ? sanitize(body.descripcion) : null,
      funcionalidades: Array.isArray(body.funcionalidades) ? body.funcionalidades.map(sanitize) : [],
      referencias: body.referencias ? sanitize(body.referencias) : null,
      colores: body.colores ? sanitize(body.colores) : null,
      tiene_contenido: body.tieneContenido || null,
      tiene_dominio: body.tieneDominio || null,
      dominio: body.dominio ? sanitize(body.dominio) : null,
      fecha_lanzamiento: body.fechaLanzamiento || null,
      comentarios: body.comentarios ? sanitize(body.comentarios) : null,
      estado: 'pendiente'
    }

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('solicitudes')
      .insert([solicitudData])
      .select()
      .single()

    if (error) {
      console.error('❌ Error al guardar en Supabase:', error)
      console.error('Código de error:', error.code)
      console.error('Mensaje:', error.message)
      console.error('Detalles:', error.details)
      console.error('Hint:', error.hint)
      
      return NextResponse.json(
        { 
          error: 'Error al guardar la solicitud', 
          details: error.message,
          code: error.code,
          hint: error.hint || 'Verifica las políticas RLS en Supabase'
        },
        { status: 500 }
      )
    }

    console.log('✅ Solicitud guardada correctamente:', data.id)

    // Enviar emails (no bloqueante - no esperamos respuesta)
    Promise.all([
      enviarEmailConfirmacionCliente({
        nombre: solicitudData.nombre,
        email: solicitudData.email,
        telefono: solicitudData.telefono,
        empresa: solicitudData.empresa,
        plan: solicitudData.plan
      }).catch(err => console.error('Error enviando email al cliente:', err)),
      
      enviarEmailNotificacionAdmin({
        nombre: solicitudData.nombre,
        email: solicitudData.email,
        telefono: solicitudData.telefono,
        empresa: solicitudData.empresa,
        plan: solicitudData.plan,
        descripcion: solicitudData.descripcion || 'Sin descripción'
      }).catch(err => console.error('Error enviando email al admin:', err))
    ]).catch(err => console.error('Error en envío de emails:', err))

    return NextResponse.json({ 
      success: true, 
      data: data,
      message: 'Solicitud recibida correctamente'
    }, { 
      status: 200,
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': String(limit.remaining),
        'X-RateLimit-Reset': String(limit.resetTime)
      }
    })
    
  } catch (error: any) {
    console.error('❌ Error en la API:', error)
    console.error('Stack:', error?.stack)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error?.message || String(error),
        type: error?.name || 'UnknownError'
      },
      { status: 500 }
    )
  }
}

// Endpoint GET para probar la conexión
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Supabase no configurado',
        url: supabaseUrl ? '✅' : '❌ FALTA',
        key: supabaseKey ? '✅' : '❌ FALTA',
        message: 'Verifica que el archivo .env.local tenga las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY'
      }, { status: 500 })
    }

    if (!supabase) {
      return NextResponse.json({
        error: 'Cliente de Supabase no inicializado',
        url: supabaseUrl.substring(0, 30) + '...',
        key: supabaseKey.substring(0, 20) + '...'
      }, { status: 500 })
    }

    // Probar conexión con una consulta simple usando count
    try {
      const { count, error } = await supabase
        .from('solicitudes')
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.error('Error de Supabase:', error)
        return NextResponse.json({
          error: 'Error de conexión con Supabase',
          details: error.message,
          code: error.code,
          hint: error.hint || 'Verifica que la tabla "solicitudes" exista y las políticas RLS estén configuradas'
        }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: 'Conexión con Supabase OK',
        supabaseConfigured: true,
        totalSolicitudes: count || 0
      })
    } catch (fetchError: any) {
      console.error('Error de fetch:', fetchError)
      return NextResponse.json({
        error: 'Error de conexión con Supabase',
        details: fetchError.message || 'No se pudo conectar con Supabase',
        type: fetchError.name || 'FetchError',
        hint: 'Verifica que la URL de Supabase sea correcta y que tengas conexión a internet. También verifica que el servidor se haya reiniciado después de configurar .env.local'
      }, { status: 500 })
    }

  } catch (error: any) {
    console.error('Error al probar conexión:', error)
    return NextResponse.json({
      error: 'Error al probar conexión',
      details: error?.message || String(error),
      type: error?.name || 'UnknownError',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    }, { status: 500 })
  }
}
