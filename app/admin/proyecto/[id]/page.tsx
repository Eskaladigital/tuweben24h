'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Solicitud, ProyectoEvento, ProyectoArchivo, Mensaje } from '@/lib/supabase'
import { checkAdminAuth, checkSessionExpiry } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import { 
  ArrowLeft,
  Clock,
  FileText,
  MessageSquare,
  Upload,
  Download,
  Send,
  Plus,
  Calendar,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye,
  EyeOff,
  Paperclip
} from 'lucide-react'

export default function ProyectoDetallePage() {
  const params = useParams()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const [solicitud, setSolicitud] = useState<Solicitud | null>(null)
  const [eventos, setEventos] = useState<ProyectoEvento[]>([])
  const [archivos, setArchivos] = useState<ProyectoArchivo[]>([])
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'timeline' | 'archivos' | 'chat'>('timeline')
  
  // Estados para formularios
  const [nuevoEvento, setNuevoEvento] = useState({
    tipo: 'nota' as ProyectoEvento['tipo'],
    titulo: '',
    descripcion: '',
    visible_cliente: false
  })
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [uploadingFile, setUploadingFile] = useState(false)

  useEffect(() => {
    // Verificar autenticación
    if (!checkAdminAuth() || !checkSessionExpiry()) {
      router.push('/admin/login')
      return
    }

    if (params.id) {
      cargarDatos()
    }
  }, [params.id])

  useEffect(() => {
    scrollToBottom()
  }, [mensajes])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const cargarDatos = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase no está configurado')
        setLoading(false)
        return
      }

      const solicitudId = params.id as string

      // Cargar solicitud
      const { data: solicitudData, error: solicitudError } = await supabase
        .from('solicitudes')
        .select('*')
        .eq('id', solicitudId)
        .single()

      if (solicitudError) throw solicitudError
      setSolicitud(solicitudData)

      // Cargar eventos
      const { data: eventosData } = await supabase
        .from('proyecto_eventos')
        .select('*')
        .eq('solicitud_id', solicitudId)
        .order('created_at', { ascending: false })

      setEventos(eventosData || [])

      // Cargar archivos
      const { data: archivosData } = await supabase
        .from('proyecto_archivos')
        .select('*')
        .eq('solicitud_id', solicitudId)
        .order('created_at', { ascending: false })

      setArchivos(archivosData || [])

      // Cargar mensajes
      const { data: mensajesData } = await supabase
        .from('mensajes')
        .select('*')
        .eq('solicitud_id', solicitudId)
        .order('created_at', { ascending: true })

      setMensajes(mensajesData || [])

      // Marcar mensajes como leídos
      await supabase
        .from('mensajes')
        .update({ leido: true })
        .eq('solicitud_id', solicitudId)
        .eq('es_admin', false)
        .eq('leido', false)

    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const agregarEvento = async () => {
    if (!nuevoEvento.titulo || !solicitud) return

    try {
      const { error } = await supabase
        .from('proyecto_eventos')
        .insert({
          solicitud_id: solicitud.id,
          tipo: nuevoEvento.tipo,
          titulo: nuevoEvento.titulo,
          descripcion: nuevoEvento.descripcion,
          visible_cliente: nuevoEvento.visible_cliente
        })

      if (error) throw error

      setNuevoEvento({
        tipo: 'nota',
        titulo: '',
        descripcion: '',
        visible_cliente: false
      })

      cargarDatos()
    } catch (error) {
      console.error('Error agregando evento:', error)
    }
  }

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !solicitud) return

    try {
      const { error } = await supabase
        .from('mensajes')
        .insert({
          solicitud_id: solicitud.id,
          autor_email: 'admin@tuweben24h.com',
          autor_nombre: 'Equipo TuWebEn24h',
          mensaje: nuevoMensaje,
          es_admin: true,
          leido: false
        })

      if (error) throw error

      setNuevoMensaje('')
      cargarDatos()
    } catch (error) {
      console.error('Error enviando mensaje:', error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !solicitud) return

    setUploadingFile(true)

    try {
      // Simular subida de archivo (en producción, usar Supabase Storage)
      const fileName = `${Date.now()}_${file.name}`
      
      // Registrar archivo en la base de datos
      const { error } = await supabase
        .from('proyecto_archivos')
        .insert({
          solicitud_id: solicitud.id,
          nombre: file.name,
          ruta: `/uploads/${fileName}`,
          tamano: file.size,
          tipo_archivo: file.type,
          categoria: 'documento',
          visible_cliente: true
        })

      if (error) throw error

      // Crear evento de archivo subido
      await supabase
        .from('proyecto_eventos')
        .insert({
          solicitud_id: solicitud.id,
          tipo: 'archivo',
          titulo: `Archivo subido: ${file.name}`,
          descripcion: `Se ha subido el archivo ${file.name}`,
          visible_cliente: true
        })

      cargarDatos()
    } catch (error) {
      console.error('Error subiendo archivo:', error)
    } finally {
      setUploadingFile(false)
    }
  }

  const cambiarEstado = async (nuevoEstado: Solicitud['estado']) => {
    if (!solicitud) return

    try {
      const { error } = await supabase
        .from('solicitudes')
        .update({ estado: nuevoEstado })
        .eq('id', solicitud.id)

      if (error) throw error

      // Crear evento de cambio de estado
      await supabase
        .from('proyecto_eventos')
        .insert({
          solicitud_id: solicitud.id,
          tipo: 'cambio_estado',
          titulo: `Estado cambiado a: ${nuevoEstado}`,
          descripcion: `El proyecto cambió de ${solicitud.estado} a ${nuevoEstado}`,
          visible_cliente: true
        })

      cargarDatos()
    } catch (error) {
      console.error('Error cambiando estado:', error)
    }
  }

  const eliminarEvento = async (eventoId: string) => {
    if (!confirm('¿Eliminar este evento?')) return

    try {
      const { error } = await supabase
        .from('proyecto_eventos')
        .delete()
        .eq('id', eventoId)

      if (error) throw error
      cargarDatos()
    } catch (error) {
      console.error('Error eliminando evento:', error)
    }
  }

  const getEventoIcon = (tipo: string) => {
    switch (tipo) {
      case 'nota':
        return <FileText className="w-5 h-5" />
      case 'cambio_estado':
        return <AlertCircle className="w-5 h-5" />
      case 'archivo':
        return <Upload className="w-5 h-5" />
      case 'mensaje':
        return <MessageSquare className="w-5 h-5" />
      case 'hito':
        return <CheckCircle className="w-5 h-5" />
      case 'recordatorio':
        return <Clock className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getEventoColor = (tipo: string) => {
    switch (tipo) {
      case 'nota':
        return 'bg-blue-100 text-blue-600'
      case 'cambio_estado':
        return 'bg-purple-100 text-purple-600'
      case 'archivo':
        return 'bg-green-100 text-green-600'
      case 'mensaje':
        return 'bg-yellow-100 text-yellow-600'
      case 'hito':
        return 'bg-emerald-100 text-emerald-600'
      case 'recordatorio':
        return 'bg-orange-100 text-orange-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!solicitud) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Proyecto no encontrado</h2>
          <button
            onClick={() => router.push('/admin')}
            className="text-primary-600 hover:text-primary-700"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al dashboard
            </button>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {solicitud.empresa}
                  </h1>
                  <p className="text-gray-600">{solicitud.nombre} • {solicitud.email}</p>
                  <p className="text-gray-600">{solicitud.telefono}</p>
                </div>
                <div>
                  <select
                    value={solicitud.estado}
                    onChange={(e) => cambiarEstado(e.target.value as Solicitud['estado'])}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="contactado">Contactado</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="revision">Revisión</option>
                    <option value="completado">Completado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="font-semibold text-gray-900">{solicitud.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo de Web</p>
                  <p className="font-semibold text-gray-900">{solicitud.tipo_web}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Páginas</p>
                  <p className="font-semibold text-gray-900">{solicitud.paginas || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha solicitud</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(solicitud.created_at!).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'timeline'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Clock className="w-5 h-5 inline mr-2" />
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('archivos')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'archivos'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FileText className="w-5 h-5 inline mr-2" />
                  Archivos ({archivos.length})
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'chat'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 inline mr-2" />
                  Chat ({mensajes.length})
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'timeline' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulario nuevo evento */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h3 className="font-semibold text-gray-900 mb-4">Agregar Evento</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo
                      </label>
                      <select
                        value={nuevoEvento.tipo}
                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, tipo: e.target.value as ProyectoEvento['tipo'] })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="nota">Nota</option>
                        <option value="cambio_estado">Cambio de Estado</option>
                        <option value="hito">Hito</option>
                        <option value="recordatorio">Recordatorio</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={nuevoEvento.titulo}
                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, titulo: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Título del evento"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                      </label>
                      <textarea
                        value={nuevoEvento.descripcion}
                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Descripción opcional"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="visible_cliente"
                        checked={nuevoEvento.visible_cliente}
                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, visible_cliente: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label htmlFor="visible_cliente" className="ml-2 text-sm text-gray-700">
                        Visible para el cliente
                      </label>
                    </div>

                    <button
                      onClick={agregarEvento}
                      disabled={!nuevoEvento.titulo}
                      className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Agregar Evento
                    </button>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {eventos.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay eventos registrados</p>
                    </div>
                  ) : (
                    eventos.map((evento) => (
                      <div key={evento.id} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`p-3 rounded-lg ${getEventoColor(evento.tipo)}`}>
                              {getEventoIcon(evento.tipo)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{evento.titulo}</h4>
                                {evento.visible_cliente && (
                                  <span title="Visible para cliente">
                                    <Eye className="w-4 h-4 text-green-600" />
                                  </span>
                                )}
                                {!evento.visible_cliente && (
                                  <span title="Solo admin">
                                    <EyeOff className="w-4 h-4 text-gray-400" />
                                  </span>
                                )}
                              </div>
                              {evento.descripcion && (
                                <p className="text-gray-600 mb-2">{evento.descripcion}</p>
                              )}
                              <p className="text-sm text-gray-500">
                                {new Date(evento.created_at!).toLocaleString('es-ES')}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => eliminarEvento(evento.id!)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'archivos' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <label className="cursor-pointer inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <Upload className="w-5 h-5 mr-2" />
                  {uploadingFile ? 'Subiendo...' : 'Subir Archivo'}
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={uploadingFile}
                    className="hidden"
                  />
                </label>
              </div>

              {archivos.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No hay archivos subidos</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {archivos.map((archivo) => (
                    <div key={archivo.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <FileText className="w-8 h-8 text-primary-600" />
                        {archivo.visible_cliente ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2 truncate" title={archivo.nombre}>
                        {archivo.nombre}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {archivo.tamano ? `${(archivo.tamano / 1024).toFixed(1)} KB` : 'N/A'}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">
                        {new Date(archivo.created_at!).toLocaleDateString('es-ES')}
                      </p>
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 400px)' }}>
              <div className="flex flex-col h-full">
                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {mensajes.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay mensajes aún</p>
                      <p className="text-sm text-gray-400 mt-2">Inicia la conversación con tu cliente</p>
                    </div>
                  ) : (
                    mensajes.map((mensaje) => (
                      <div
                        key={mensaje.id}
                        className={`flex ${mensaje.es_admin ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-md px-4 py-3 rounded-lg ${
                            mensaje.es_admin
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm font-medium mb-1">{mensaje.autor_nombre}</p>
                          <p className="whitespace-pre-wrap">{mensaje.mensaje}</p>
                          <p
                            className={`text-xs mt-2 ${
                              mensaje.es_admin ? 'text-primary-100' : 'text-gray-500'
                            }`}
                          >
                            {new Date(mensaje.created_at!).toLocaleString('es-ES')}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input de mensaje */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={nuevoMensaje}
                      onChange={(e) => setNuevoMensaje(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={enviarMensaje}
                      disabled={!nuevoMensaje.trim()}
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

