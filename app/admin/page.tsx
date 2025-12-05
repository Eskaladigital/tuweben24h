'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Solicitud } from '@/lib/supabase'
import { checkAdminAuth, checkSessionExpiry, logoutAdmin, getAdminEmail } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader, 
  Mail, 
  Phone, 
  Building,
  Calendar,
  Eye,
  Filter,
  Download,
  Search,
  ArrowUpDown,
  LogOut,
  User
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState<string>('todas')
  const [busqueda, setBusqueda] = useState<string>('')
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null)
  const [adminEmail, setAdminEmail] = useState<string>('')

  useEffect(() => {
    // Verificar autenticación
    if (!checkAdminAuth() || !checkSessionExpiry()) {
      router.push('/admin/login')
      return
    }

    const email = getAdminEmail()
    if (email) {
      setAdminEmail(email)
    }

    cargarSolicitudes()
  }, [])

  const cargarSolicitudes = async () => {
    try {
      const { data, error } = await supabase
        .from('solicitudes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSolicitudes(data || [])
    } catch (error) {
      console.error('Error cargando solicitudes:', error)
    } finally {
      setLoading(false)
    }
  }

  const cambiarEstado = async (id: string, nuevoEstado: Solicitud['estado']) => {
    try {
      const { error } = await supabase
        .from('solicitudes')
        .update({ estado: nuevoEstado })
        .eq('id', id)

      if (error) throw error
      cargarSolicitudes()
    } catch (error) {
      console.error('Error actualizando estado:', error)
    }
  }

  const solicitudesFiltradas = solicitudes.filter(s => {
    // Filtro por estado
    if (filtro !== 'todas' && s.estado !== filtro) return false
    
    // Filtro por búsqueda
    if (busqueda) {
      const termino = busqueda.toLowerCase()
      return (
        s.nombre.toLowerCase().includes(termino) ||
        s.email.toLowerCase().includes(termino) ||
        s.empresa.toLowerCase().includes(termino) ||
        s.telefono.includes(termino)
      )
    }
    
    return true
  })

  const exportarCSV = () => {
    const headers = ['Fecha', 'Cliente', 'Email', 'Teléfono', 'Empresa', 'Plan', 'Estado']
    const rows = solicitudesFiltradas.map(s => [
      new Date(s.created_at!).toLocaleDateString('es-ES'),
      s.nombre,
      s.email,
      s.telefono,
      s.empresa,
      s.plan,
      s.estado
    ])

    let csv = headers.join(',') + '\n'
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n'
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `solicitudes_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const verProyecto = (id: string) => {
    router.push(`/admin/proyecto/${id}`)
  }

  const handleLogout = () => {
    logoutAdmin()
    router.push('/admin/login')
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'en_proceso':
        return 'bg-blue-100 text-blue-800'
      case 'completado':
        return 'bg-green-100 text-green-800'
      case 'cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Clock className="w-4 h-4" />
      case 'en_proceso':
        return <Loader className="w-4 h-4 animate-spin" />
      case 'completado':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelado':
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Panel de Administración
                </h1>
                <p className="text-gray-600">
                  Gestiona las solicitudes de webs de tus clientes
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    {adminEmail}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 border border-gray-300 rounded-lg hover:border-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-3xl font-bold text-gray-900">{solicitudes.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {solicitudes.filter(s => s.estado === 'pendiente').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En Proceso</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {solicitudes.filter(s => s.estado === 'en_proceso').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Loader className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completadas</p>
                  <p className="text-3xl font-bold text-green-600">
                    {solicitudes.filter(s => s.estado === 'completado').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Búsqueda */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Buscar</h3>
                </div>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre, email, empresa..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Filtro por estado */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Filtrar por estado</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['todas', 'pendiente', 'contactado', 'en_proceso', 'revision', 'completado', 'cancelado'].map((estado) => (
                    <button
                      key={estado}
                      onClick={() => setFiltro(estado)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filtro === estado
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {estado.charAt(0).toUpperCase() + estado.slice(1).replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Exportar */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={exportarCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                <span>Exportar a CSV ({solicitudesFiltradas.length} solicitudes)</span>
              </button>
            </div>
          </div>

          {/* Lista de Solicitudes */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Empresa
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Estado
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
                  {solicitudesFiltradas.map((solicitud) => (
                    <tr key={solicitud.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{solicitud.nombre}</p>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {solicitud.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-3 h-3 mr-1" />
                            {solicitud.telefono}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{solicitud.empresa}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{solicitud.plan}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={solicitud.estado}
                          onChange={(e) => cambiarEstado(solicitud.id!, e.target.value as Solicitud['estado'])}
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getEstadoColor(solicitud.estado)}`}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="en_proceso">En Proceso</option>
                          <option value="completado">Completado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(solicitud.created_at!).toLocaleDateString('es-ES')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => verProyecto(solicitud.id!)}
                            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Gestionar</span>
                          </button>
                          <button
                            onClick={() => setSelectedSolicitud(solicitud)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {solicitudesFiltradas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay solicitudes con este filtro</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Detalles */}
        {selectedSolicitud && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Detalles de la Solicitud
                </h2>
                <button
                  onClick={() => setSelectedSolicitud(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Información del Cliente</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Nombre</p>
                      <p className="font-medium">{selectedSolicitud.nombre}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Empresa</p>
                      <p className="font-medium">{selectedSolicitud.empresa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{selectedSolicitud.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Teléfono</p>
                      <p className="font-medium">{selectedSolicitud.telefono}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Detalles del Proyecto</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Tipo de Web</p>
                      <p className="font-medium">{selectedSolicitud.tipo_web}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Plan</p>
                      <p className="font-medium">{selectedSolicitud.plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Páginas</p>
                      <p className="font-medium">{selectedSolicitud.paginas || 'No especificado'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Colores</p>
                      <p className="font-medium">{selectedSolicitud.colores || 'No especificado'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Descripción</p>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {selectedSolicitud.descripcion}
                  </p>
                </div>

                {selectedSolicitud.funcionalidades && selectedSolicitud.funcionalidades.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Funcionalidades</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSolicitud.funcionalidades.map((func, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                        >
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSolicitud.referencias && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Referencias</p>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                      {selectedSolicitud.referencias}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">¿Tiene contenido?</p>
                    <p className="font-medium">{selectedSolicitud.tiene_contenido || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">¿Tiene dominio?</p>
                    <p className="font-medium">{selectedSolicitud.tiene_dominio || 'No especificado'}</p>
                  </div>
                </div>

                {selectedSolicitud.dominio && (
                  <div>
                    <p className="text-sm text-gray-600">Dominio</p>
                    <p className="font-medium">{selectedSolicitud.dominio}</p>
                  </div>
                )}

                {selectedSolicitud.fecha_lanzamiento && (
                  <div>
                    <p className="text-sm text-gray-600">Fecha deseada de lanzamiento</p>
                    <p className="font-medium">
                      {new Date(selectedSolicitud.fecha_lanzamiento).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}

                {selectedSolicitud.comentarios && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Comentarios adicionales</p>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                      {selectedSolicitud.comentarios}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedSolicitud(null)}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
