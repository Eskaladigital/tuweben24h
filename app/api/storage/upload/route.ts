import { NextRequest, NextResponse } from 'next/server'
import { uploadProyectoArchivo, uploadBlogImage } from '@/lib/storage'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: máximo 10 uploads por IP cada hora
    const clientIP = getClientIP(request)
    const limit = rateLimit(`upload:${clientIP}`, 10, 60 * 60 * 1000)
    
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas subidas', details: 'Has subido demasiados archivos. Por favor espera antes de intentar de nuevo.' },
        { status: 429 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const tipo = formData.get('tipo') as string // 'proyecto' o 'blog'
    const solicitudId = formData.get('solicitudId') as string
    const categoria = formData.get('categoria') as string
    const slug = formData.get('slug') as string

    if (!file) {
      return NextResponse.json(
        { error: 'Archivo requerido' },
        { status: 400 }
      )
    }

    // Validar tamaño (máximo 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Archivo muy grande', details: 'El archivo no puede ser mayor a 10MB' },
        { status: 400 }
      )
    }

    let result

    if (tipo === 'proyecto') {
      if (!solicitudId || !categoria) {
        return NextResponse.json(
          { error: 'solicitudId y categoria requeridos para tipo proyecto' },
          { status: 400 }
        )
      }

      result = await uploadProyectoArchivo(
        solicitudId,
        file,
        categoria as any
      )
    } else if (tipo === 'blog') {
      if (!slug) {
        return NextResponse.json(
          { error: 'slug requerido para tipo blog' },
          { status: 400 }
        )
      }

      result = await uploadBlogImage(slug, file)
    } else {
      return NextResponse.json(
        { error: 'Tipo inválido', details: 'tipo debe ser "proyecto" o "blog"' },
        { status: 400 }
      )
    }

    if (!result.success) {
      return NextResponse.json(
        { error: 'Error subiendo archivo', details: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      path: result.path,
      url: result.url
    })
  } catch (error: any) {
    console.error('Error en upload:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    )
  }
}



