'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, BlogPost } from '@/lib/supabase'
import { checkAdminAuth, checkSessionExpiry } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Calendar,
  TrendingUp,
  ArrowLeft
} from 'lucide-react'

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [filtroPublicado, setFiltroPublicado] = useState<'todos' | 'publicado' | 'borrador'>('todos')

  useEffect(() => {
    // Verificar autenticación
    if (!checkAdminAuth() || !checkSessionExpiry()) {
      router.push('/admin/login')
      return
    }

    cargarPosts()
  }, [])

  const cargarPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error cargando posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const postsFiltrados = posts.filter(post => {
    // Filtro por estado de publicación
    if (filtroPublicado === 'publicado' && !post.publicado) return false
    if (filtroPublicado === 'borrador' && post.publicado) return false

    // Filtro por búsqueda
    if (busqueda) {
      const termino = busqueda.toLowerCase()
      return (
        post.titulo.toLowerCase().includes(termino) ||
        post.extracto?.toLowerCase().includes(termino) ||
        post.categoria?.toLowerCase().includes(termino)
      )
    }

    return true
  })

  const togglePublicado = async (id: string, publicado: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          publicado: !publicado,
          fecha_publicacion: !publicado ? new Date().toISOString() : null
        })
        .eq('id', id)

      if (error) throw error
      cargarPosts()
    } catch (error) {
      console.error('Error actualizando post:', error)
    }
  }

  const eliminarPost = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este post?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      cargarPosts()
    } catch (error) {
      console.error('Error eliminando post:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al dashboard
            </button>

            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Gestión del Blog
                </h1>
                <p className="text-gray-600">
                  Crea y administra los artículos de tu blog
                </p>
              </div>
              <button
                onClick={() => router.push('/admin/blog/nuevo')}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Post</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Posts</p>
                  <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Publicados</p>
                  <p className="text-3xl font-bold text-green-600">
                    {posts.filter(p => p.publicado).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Borradores</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {posts.filter(p => !p.publicado).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Vistas</p>
                  <p className="text-3xl font-bold text-primary-600">
                    {posts.reduce((sum, p) => sum + (p.vistas || 0), 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar posts
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por título, extracto o categoría..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Filtro por estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de publicación
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFiltroPublicado('todos')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      filtroPublicado === 'todos'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFiltroPublicado('publicado')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      filtroPublicado === 'publicado'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Publicados
                  </button>
                  <button
                    onClick={() => setFiltroPublicado('borrador')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      filtroPublicado === 'borrador'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Borradores
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de posts */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {postsFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {busqueda || filtroPublicado !== 'todos'
                    ? 'No se encontraron posts con esos criterios'
                    : 'No hay posts aún. ¡Crea el primero!'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Título
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Categoría
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Vistas
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {postsFiltrados.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {post.imagen_destacada && (
                              <img
                                src={post.imagen_destacada}
                                alt=""
                                className="w-12 h-12 rounded object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{post.titulo}</p>
                              {post.extracto && (
                                <p className="text-sm text-gray-500 line-clamp-1">
                                  {post.extracto}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                            {post.categoria || 'Sin categoría'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => togglePublicado(post.id!, post.publicado)}
                            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                              post.publicado
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {post.publicado ? (
                              <>
                                <Eye className="w-4 h-4" />
                                <span>Publicado</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-4 h-4" />
                                <span>Borrador</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-gray-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>{post.vistas || 0}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.fecha_publicacion
                              ? new Date(post.fecha_publicacion).toLocaleDateString('es-ES')
                              : new Date(post.created_at!).toLocaleDateString('es-ES')}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {post.publicado && (
                              <a
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                            )}
                            <button
                              onClick={() => router.push(`/admin/blog/editar/${post.id}`)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => eliminarPost(post.id!)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

