'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, BlogPost } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Calendar, User, Clock, ArrowLeft, Tag, Share2, Eye } from 'lucide-react'

interface BlogPostClientProps {
  slug: string
  initialPost?: BlogPost | null
}

export default function BlogPostClient({ slug, initialPost }: BlogPostClientProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(initialPost || null)
  const [postsRelacionados, setPostsRelacionados] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(!initialPost)

  useEffect(() => {
    if (slug) {
      if (!initialPost) {
        cargarPost()
      } else {
        // Solo incrementar vistas y cargar relacionados
        incrementarVistas()
        cargarRelacionados(initialPost.categoria, initialPost.id)
      }
    }
  }, [slug, initialPost])

  const incrementarVistas = async () => {
    if (!post && !initialPost) return
    const currentPost = post || initialPost
    if (!currentPost) return
    
    await supabase
      .from('blog_posts')
      .update({ vistas: (currentPost.vistas || 0) + 1 })
      .eq('id', currentPost.id)
  }

  const cargarRelacionados = async (categoria: string | undefined, postId: string | undefined) => {
    if (!categoria || !postId) return
    
    const { data: relacionados } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('categoria', categoria)
      .eq('publicado', true)
      .neq('id', postId)
      .limit(3)

    setPostsRelacionados(relacionados || [])
  }

  const cargarPost = async () => {
    try {
      // Cargar post
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('publicado', true)
        .single()

      if (postError) throw postError
      setPost(postData)

      // Incrementar vistas
      await supabase
        .from('blog_posts')
        .update({ vistas: (postData.vistas || 0) + 1 })
        .eq('id', postData.id)

      // Cargar posts relacionados
      if (postData.categoria) {
        cargarRelacionados(postData.categoria, postData.id)
      }
    } catch (error) {
      console.error('Error cargando post:', error)
    } finally {
      setLoading(false)
    }
  }

  const calcularTiempoLectura = (contenido: string) => {
    const palabras = contenido.split(/\s+/).length
    const minutos = Math.ceil(palabras / 200)
    return minutos
  }

  const compartir = async () => {
    const currentPost = post || initialPost
    if (navigator.share && currentPost) {
      try {
        await navigator.share({
          title: currentPost.titulo,
          text: currentPost.extracto || '',
          url: window.location.href
        })
      } catch (error) {
        console.log('Error compartiendo:', error)
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href)
      alert('¡Enlace copiado al portapapeles!')
    }
  }

  const currentPost = post || initialPost

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    )
  }

  if (!currentPost) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Post no encontrado</h2>
            <Link
              href="/blog"
              className="text-primary-600 hover:text-primary-700 inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Volver */}
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al blog
          </Link>

          {/* Header del post */}
          <header className="mb-12">
            {/* Categoría */}
            {currentPost.categoria && (
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                  {currentPost.categoria}
                </span>
              </div>
            )}

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {currentPost.titulo}
            </h1>

            {/* Extracto */}
            {currentPost.extracto && (
              <p className="text-xl text-gray-600 mb-8">
                {currentPost.extracto}
              </p>
            )}

            {/* Meta información */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              {currentPost.autor_nombre && (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{currentPost.autor_nombre}</span>
                </div>
              )}

              {currentPost.fecha_publicacion && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(currentPost.fecha_publicacion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{calcularTiempoLectura(currentPost.contenido)} min de lectura</span>
              </div>

              {currentPost.vistas !== undefined && (
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>{currentPost.vistas} vistas</span>
                </div>
              )}
            </div>

            {/* Botón compartir */}
            <button
              onClick={compartir}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir</span>
            </button>

            {/* Etiquetas */}
            {currentPost.etiquetas && currentPost.etiquetas.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {currentPost.etiquetas.map((etiqueta, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                  >
                    #{etiqueta}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Imagen destacada */}
          {currentPost.imagen_destacada && (
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src={currentPost.imagen_destacada}
                alt={currentPost.titulo}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Contenido */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-12">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:mb-2
                prose-code:text-primary-600 prose-code:bg-primary-50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-6 prose-blockquote:italic
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: currentPost.contenido }}
            />
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-8 md:p-12 text-center text-white mb-12">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para tu propia web?
            </h3>
            <p className="text-primary-100 mb-8 text-lg">
              Creamos tu página web profesional en solo 24 horas
            </p>
            <Link
              href="/solicitar"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-colors"
            >
              Solicita tu web ahora
            </Link>
          </div>

          {/* Posts relacionados */}
          {postsRelacionados.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Artículos relacionados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {postsRelacionados.map((relacionado) => (
                  <Link
                    key={relacionado.id}
                    href={`/blog/${relacionado.slug}`}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    {relacionado.imagen_destacada ? (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relacionado.imagen_destacada}
                          alt={relacionado.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white opacity-50">
                          {relacionado.titulo.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {relacionado.titulo}
                      </h4>
                      {relacionado.extracto && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {relacionado.extracto}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}


