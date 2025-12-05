'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, BlogPost } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas')
  const [categorias, setCategorias] = useState<string[]>([])

  useEffect(() => {
    cargarPosts()
  }, [])

  const cargarPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('publicado', true)
        .order('fecha_publicacion', { ascending: false })

      if (error) throw error

      setPosts(data || [])

      // Extraer categorías únicas
      const cats = Array.from(new Set(data?.map(p => p.categoria).filter(Boolean) as string[]))
      setCategorias(cats)
    } catch (error) {
      console.error('Error cargando posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const postsFiltrados = posts.filter(post => {
    // Filtro por categoría
    if (categoriaFiltro !== 'todas' && post.categoria !== categoriaFiltro) return false

    // Filtro por búsqueda
    if (busqueda) {
      const termino = busqueda.toLowerCase()
      return (
        post.titulo.toLowerCase().includes(termino) ||
        post.extracto?.toLowerCase().includes(termino) ||
        post.contenido.toLowerCase().includes(termino)
      )
    }

    return true
  })

  const calcularTiempoLectura = (contenido: string) => {
    const palabras = contenido.split(/\s+/).length
    const minutos = Math.ceil(palabras / 200)
    return minutos
  }

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Blog TuWebEn24h
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Consejos, guías y novedades sobre diseño web, desarrollo y marketing digital
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Búsqueda y Filtros */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar artículos
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por título o contenido..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Categorías */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por categoría
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoriaFiltro('todas')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      categoriaFiltro === 'todas'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todas
                  </button>
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoriaFiltro(cat)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        categoriaFiltro === cat
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Posts */}
          {postsFiltrados.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">
                {busqueda || categoriaFiltro !== 'todas'
                  ? 'No se encontraron artículos con esos criterios'
                  : 'Próximamente publicaremos artículos interesantes'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsFiltrados.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  {/* Imagen destacada */}
                  {post.imagen_destacada ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.imagen_destacada}
                        alt={post.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white opacity-50">
                        {post.titulo.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Categoría */}
                    {post.categoria && (
                      <div className="flex items-center space-x-2 mb-3">
                        <Tag className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-medium text-primary-600">
                          {post.categoria}
                        </span>
                      </div>
                    )}

                    {/* Título */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {post.titulo}
                    </h2>

                    {/* Extracto */}
                    {post.extracto && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.extracto}
                      </p>
                    )}

                    {/* Meta información */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        {post.autor_nombre && (
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.autor_nombre}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{calcularTiempoLectura(post.contenido)} min</span>
                        </div>
                      </div>
                    </div>

                    {post.fecha_publicacion && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(post.fecha_publicacion).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}

                    {/* Etiquetas */}
                    {post.etiquetas && post.etiquetas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.etiquetas.slice(0, 3).map((etiqueta, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {etiqueta}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}


