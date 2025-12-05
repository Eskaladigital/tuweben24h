'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Solicitud, ProyectoEvento, ProyectoArchivo, Mensaje } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import {
  Clock,
  FileText,
  MessageSquare,
  Download,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
  LogOut,
  Calendar,
  User,
  Mail,
  Phone,
  Building
} from 'lucide-react'

export default function ClienteDashboardPage() {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [clienteEmail, setClienteEmail] = useState('')
  const [clienteNombre, setClienteNombre] = useState('')
  const [solicitud, setSolicitud] = useState<Solicitud | null>(null)
  const [eventos, setEventos] = useState<ProyectoEvento[]>([])
  const [archivos, setArchivos] = useState<ProyectoArchivo[]>([])
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'proyecto' | 'archivos' | 'mensajes'>('proyecto')
  const [nuevoMensaje, setNuevoMensaje] = useState('')

  useEffect(() => {
    // Verificar autenticación
    const email = localStorage.getItem('cliente_email')
    const nombre = localStorage.getItem('cliente_nombre')

    if (!email) {
      router.push('/cliente/login')
      return
    }

    setClienteEmail(email)
    setClienteNombre(nombre || '')
    cargarDatos(email)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [mensajes])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const cargarDatos = async (email: string) => {
    try {
      // Cargar solicitud
      const { data: solicitudData, error: solicitudError } = await supabase
        .from('solicitudes')
        .select('*')
        .eq('email', email)
        .single()

      if (solicitudError) throw solicitudError
      setSolicitud(solicitudData)

      // Cargar eventos visibles para el cliente
      const { data: eventosData } = await supabase
        .from('proyecto_eventos')
        .select('*')
        .eq('solicitud_id', solicitudData.id)
        .eq('visible_cliente', true)
        .order('created_at', { ascending: false })

      setEventos(eventosData || [])

      // Cargar archivos visibles
      const { data: archivosData } = await supabase
        .from('proyecto_archivos')
        .select('*')
        .eq('solicitud_id', solicitudData.id)
        .eq('visible_cliente', true)
        .order('created_at', { ascending: false })

      setArchivos(archivosData || [])

      // Cargar mensajes
      const { data: mensajesData } = await supabase
        .from('mensajes')
        .select('*')
        .eq('solicitud_id', solicitudData.id)
        .order('created_at', { ascending: true })

      setMensajes(mensajesData || [])

      // Marcar mensajes como leídos (los del admin)
      await supabase
        .from('mensajes')
        .update({ leido: true })
        .eq('solicitud_id', solicitudData.id)
        .eq('es_admin', true)
        .eq('leido', false)

    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !solicitud) return

    try {
      const { error } = await supabase
        .from('mensajes')
        .insert({
          solicitud_id: solicitud.id,
          autor_email: clienteEmail,
          autor_nombre: clienteNombre,
          mensaje: nuevoMensaje,
          es_admin: false,
          leido: false
        })

      if (error) throw error

      setNuevoMensaje('')
      cargarDatos(clienteEmail)
    } catch (error) {
      console.error('Error enviando mensaje:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('cliente_email')
    localStorage.removeItem('cliente_nombre')
    router.push('/cliente/login')
  }

  const getEstadoInfo = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="w-5 h-5" />,
          texto: 'Pendiente de revisión',
          descripcion: 'Hemos recibido tu solicitud y pronto nos pondremos en contacto contigo.'
        }
      case 'contactado':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <Mail className="w-5 h-5" />,
          texto: 'Contactado',
          descripcion: 'Nos hemos puesto en contacto contigo para afinar los detalles.'
        }
      case 'en_proceso':
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: <Loader className="w-5 h-5 animate-spin" />,
          texto: 'En desarrollo',
          descripcion: 'Estamos trabajando en tu web. ¡Ya falta menos!'
        }
      case 'revision':
        return {
          color: 'bg-orange-100 text-orange-800',
          icon: <AlertCircle className="w-5 h-5" />,
          texto: 'En revisión',
          descripcion: 'Tu web está lista para revisión. Por favor, revisa y danos tu feedback.'
        }
      case 'completado':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="w-5 h-5" />,
          texto: '¡Completado!',
          descripcion: 'Tu web está lista y publicada. ¡Enhorabuena!'
        }
      case 'cancelado':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <AlertCircle className="w-5 h-5" />,
          texto: 'Cancelado',
          descripcion: 'Este proyecto ha sido cancelado.'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <Clock className="w-5 h-5" />,
          texto: estado,
          descripcion: ''
        }
    }
  }

  const getEventoIcon = (tipo: string) => {
    switch (tipo) {
      case 'nota':
        return <FileText className="w-5 h-5" />
      case 'cambio_estado':
        return <AlertCircle className="w-5 h-5" />
      case 'hito':
        return <CheckCircle className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No encontramos tu proyecto</h2>
          <button
            onClick={handleLogout}
            className="text-primary-600 hover:text-primary-700"
          >
            Volver al login
          </button>
        </div>
      </div>
    )
  }

  const estadoInfo = getEstadoInfo(solicitud.estado)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  ¡Hola, {clienteNombre}! 👋
                </h1>
                <p className="text-gray-600">
                  Aquí puedes ver el progreso de tu proyecto
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>

          {/* Estado del Proyecto */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Estado del Proyecto</h2>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${estadoInfo.color}`}>
                {estadoInfo.icon}
                <span className="font-semibold">{estadoInfo.texto}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Empresa</p>
                    <p className="font-semibold text-gray-900">{solicitud.empresa}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Plan</p>
                    <p className="font-semibold text-gray-900">{solicitud.plan}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Tipo de Web</p>
                    <p className="font-semibold text-gray-900">{solicitud.tipo_web}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Fecha de solicitud</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(solicitud.created_at!).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900">{estadoInfo.descripcion}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('proyecto')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'proyecto'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Clock className="w-5 h-5 inline mr-2" />
                  Progreso
                </button>
                <button
                  onClick={() => setActiveTab('archivos')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'archivos'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FileText className="w-5 h-5 inline mr-2" />
                  Archivos ({archivos.length})
                </button>
                <button
                  onClick={() => setActiveTab('mensajes')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'mensajes'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 inline mr-2" />
                  Mensajes ({mensajes.filter(m => m.es_admin && !m.leido).length > 0 && '🔴'})
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'proyecto' && (
            <div className="space-y-4">
              {eventos.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Pronto verás actualizaciones de tu proyecto aquí</p>
                </div>
              ) : (
                eventos.map((evento) => (
                  <div key={evento.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                        {getEventoIcon(evento.tipo)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{evento.titulo}</h4>
                        {evento.descripcion && (
                          <p className="text-gray-600 mb-2">{evento.descripcion}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {new Date(evento.created_at!).toLocaleString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'archivos' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              {archivos.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No hay archivos disponibles aún</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {archivos.map((archivo) => (
                    <div key={archivo.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors">
                      <FileText className="w-8 h-8 text-primary-600 mb-3" />
                      <h4 className="font-medium text-gray-900 mb-2 truncate" title={archivo.nombre}>
                        {archivo.nombre}
                      </h4>
                      {archivo.descripcion && (
                        <p className="text-sm text-gray-600 mb-2">{archivo.descripcion}</p>
                      )}
                      <p className="text-sm text-gray-500 mb-2">
                        {archivo.tamano ? `${(archivo.tamano / 1024).toFixed(1)} KB` : 'N/A'}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">
                        {new Date(archivo.created_at!).toLocaleDateString('es-ES')}
                      </p>
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'mensajes' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 400px)' }}>
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {mensajes.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay mensajes aún</p>
                      <p className="text-sm text-gray-400 mt-2">¿Tienes alguna pregunta? Envía un mensaje</p>
                    </div>
                  ) : (
                    mensajes.map((mensaje) => (
                      <div
                        key={mensaje.id}
                        className={`flex ${mensaje.es_admin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-md px-4 py-3 rounded-lg ${
                            mensaje.es_admin
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-primary-600 text-white'
                          }`}
                        >
                          <p className="text-sm font-medium mb-1">{mensaje.autor_nombre}</p>
                          <p className="whitespace-pre-wrap">{mensaje.mensaje}</p>
                          <p
                            className={`text-xs mt-2 ${
                              mensaje.es_admin ? 'text-gray-500' : 'text-primary-100'
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

                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={nuevoMensaje}
                      onChange={(e) => setNuevoMensaje(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                      placeholder="Escribe tu mensaje..."
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


