import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('📝 Nueva solicitud recibida:', {
      nombre: body.nombre,
      email: body.email,
      plan: body.plan,
      fecha: new Date().toISOString()
    })

    // Por ahora solo guardamos en consola
    // TODO: Conectar con Supabase cuando esté configurado
    
    // Simular guardado exitoso
    const solicitudGuardada = {
      id: Date.now(),
      ...body,
      estado: 'pendiente',
      created_at: new Date().toISOString()
    }

    return NextResponse.json({ 
      success: true, 
      data: solicitudGuardada,
      message: 'Solicitud recibida correctamente'
    }, { status: 200 })
    
  } catch (error) {
    console.error('❌ Error en la API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: String(error) },
      { status: 500 }
    )
  }
}
