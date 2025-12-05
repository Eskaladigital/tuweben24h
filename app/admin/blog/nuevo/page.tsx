'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { checkAdminAuth, checkSessionExpiry } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import { ArrowLeft, Save, Eye } from 'lucide-react'

export default function NuevoPostPage() {
  const router = useRouter()
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    // Verificar autenticación
    if (!checkAdminAuth() || !checkSessionExpiry()) {
      router.push('/admin/login')
      return
    }
  }, [])
  const [post, setPost] = useState({
    titulo: '',
    slug: '',
    extracto: '',
    contenido: '',
    imagen_destacada: '',
    autor_nombre: 'Equipo TuWebEn24h',
    categoria: '',
    etiquetas: [] as string[],
    publicado: false,
    seo_titulo: '',
    seo_descripcion: ''
  })
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState('')

  const generarSlug = (titulo: string) => {
    return titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTituloChange = (titulo: string) => {
    setPost({
      ...post,
      titulo,
      slug: generarSlug(titulo),
      seo_titulo: titulo.substring(0, 60)
    })
  }

  const agregarEtiqueta = () => {
    if (nuevaEtiqueta.trim() && !post.etiquetas.includes(nuevaEtiqueta.trim())) {
      setPost({
        ...post,
        etiquetas: [...post.etiquetas, nuevaEtiqueta.trim()]
      })
      setNuevaEtiqueta('')
    }
  }

  const eliminarEtiqueta = (etiqueta: string) => {
    setPost({
      ...post,
      etiquetas: post.etiquetas.filter(e => e !== etiqueta)
    })
  }

  const guardarPost = async (publicar: boolean = false) => {
    if (!post.titulo || !post.contenido) {
      alert('El título y el contenido son obligatorios')
      return
    }

    setGuardando(true)

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          titulo: post.titulo,
          slug: post.slug,
          extracto: post.extracto,
          contenido: post.contenido,
          imagen_destacada: post.imagen_destacada,
          autor_nombre: post.autor_nombre,
          categoria: post.categoria,
          etiquetas: post.etiquetas,
          publicado: publicar,
          fecha_publicacion: publicar ? new Date().toISOString() : null,
          seo_titulo: post.seo_titulo || post.titulo,
          seo_descripcion: post.seo_descripcion || post.extracto,
          vistas: 0
        })
        .select()
        .single()

      if (error) throw error

      alert(publicar ? '¡Post publicado con éxito!' : '¡Borrador guardado!')
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error guardando post:', error)
      alert('Error al guardar el post')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin/blog')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a la lista
            </button>

            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-gray-900">
                Nuevo Post
              </h1>

              <div className="flex space-x-3">
                <button
                  onClick={() => guardarPost(false)}
                  disabled={guardando}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold disabled:bg-gray-400"
                >
                  <Save className="w-5 h-5" />
                  <span>Guardar Borrador</span>
                </button>
                <button
                  onClick={() => guardarPost(true)}
                  disabled={guardando}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold disabled:bg-gray-400"
                >
                  <Eye className="w-5 h-5" />
                  <span>Publicar</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Título */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={post.titulo}
                  onChange={(e) => handleTituloChange(e.target.value)}
                  className="w-full px-4 py-3 text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Título del post..."
                />

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL (slug)
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">tuweben24h.com/blog/</span>
                    <input
                      type="text"
                      value={post.slug}
                      onChange={(e) => setPost({ ...post, slug: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Extracto */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extracto
                </label>
                <textarea
                  value={post.extracto}
                  onChange={(e) => setPost({ ...post, extracto: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Breve resumen del artículo..."
                />
              </div>

              {/* Contenido */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenido * (HTML)
                </label>
                <textarea
                  value={post.contenido}
                  onChange={(e) => setPost({ ...post, contenido: e.target.value })}
                  rows={20}
                  className="w-full px-4 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="<p>Contenido del post en HTML...</p>"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Puedes usar HTML para dar formato al contenido
                </p>
              </div>

              {/* SEO */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">SEO</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título SEO (max 60 caracteres)
                    </label>
                    <input
                      type="text"
                      value={post.seo_titulo}
                      onChange={(e) => setPost({ ...post, seo_titulo: e.target.value })}
                      maxLength={60}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {post.seo_titulo.length}/60 caracteres
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción SEO (max 160 caracteres)
                    </label>
                    <textarea
                      value={post.seo_descripcion}
                      onChange={(e) => setPost({ ...post, seo_descripcion: e.target.value })}
                      maxLength={160}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {post.seo_descripcion.length}/160 caracteres
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Imagen destacada */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen destacada (URL)
                </label>
                <input
                  type="url"
                  value={post.imagen_destacada}
                  onChange={(e) => setPost({ ...post, imagen_destacada: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://..."
                />
                {post.imagen_destacada && (
                  <img
                    src={post.imagen_destacada}
                    alt="Preview"
                    className="mt-4 w-full rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                )}
              </div>

              {/* Autor */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  value={post.autor_nombre}
                  onChange={(e) => setPost({ ...post, autor_nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Categoría */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={post.categoria}
                  onChange={(e) => setPost({ ...post, categoria: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Sin categoría</option>
                  <option value="Diseño Web">Diseño Web</option>
                  <option value="Desarrollo">Desarrollo</option>
                  <option value="Marketing">Marketing</option>
                  <option value="SEO">SEO</option>
                  <option value="Tutoriales">Tutoriales</option>
                  <option value="Consejos">Consejos</option>
                  <option value="Casos de Éxito">Casos de Éxito</option>
                  <option value="Noticias">Noticias</option>
                </select>
              </div>

              {/* Etiquetas */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etiquetas
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={nuevaEtiqueta}
                    onChange={(e) => setNuevaEtiqueta(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && agregarEtiqueta()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Nueva etiqueta"
                  />
                  <button
                    onClick={agregarEtiqueta}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.etiquetas.map((etiqueta, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {etiqueta}
                      <button
                        onClick={() => eliminarEtiqueta(etiqueta)}
                        className="ml-2 text-primary-900 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

