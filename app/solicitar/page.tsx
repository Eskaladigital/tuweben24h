'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

export default function SolicitarPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Paso 1: Información básica
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    
    // Paso 2: Tipo de web y plan
    plan: '',
    
    // Paso 3: Detalles
    descripcion: '',
    funcionalidades: [] as string[],
    extras: [] as string[],
    referencias: '',
    colores: '',
    
    // Paso 4: Información adicional
    tieneContenido: '',
    tieneDominio: '',
    dominio: '',
    fechaLanzamiento: '',
    comentarios: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      
      // Manejar funcionalidades
      if (name === 'funcionalidades') {
        const currentFuncionalidades = formData.funcionalidades
        if (checked) {
          setFormData({ ...formData, funcionalidades: [...currentFuncionalidades, value] })
        } else {
          setFormData({ 
            ...formData, 
            funcionalidades: currentFuncionalidades.filter(f => f !== value) 
          })
        }
      }
      // Manejar extras
      else if (name === 'extras') {
        const currentExtras = formData.extras
        if (checked) {
          setFormData({ ...formData, extras: [...currentExtras, value] })
        } else {
          setFormData({ 
            ...formData, 
            extras: currentExtras.filter(e => e !== value) 
          })
        }
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setLoading(true)

    try {
      // Aquí enviarías los datos a Supabase o a una API
      const response = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/solicitar/confirmacion')
      } else {
        alert('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const funcionalidadesOptions = [
    'Formulario de contacto',
    'Galería de imágenes',
    'Mapa de ubicación',
    'Integración redes sociales',
    'Newsletter',
    'Área de clientes',
  ]

  const extrasOptions = [
    { name: 'Blog completo', price: 100 },
    { name: 'Chatbot inteligente', price: 100 },
    { name: 'Sistema de reservas/citas', price: 80 },
    { name: 'Tienda online (hasta 20 productos)', price: 150 },
    { name: 'Integración con pasarela de pago', price: 120 },
    { name: 'Chat online en tiempo real', price: 60 },
    { name: 'Sistema de membresías', price: 180 },
    { name: 'Multiidioma adicional (por idioma)', price: 80 },
    { name: 'Integración con CRM', price: 100 },
    { name: 'Sistema de facturación', price: 150 },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Solicita Tu Web
            </h1>
            <p className="text-xl text-gray-600">
              Completa el formulario y empezaremos a trabajar en tu web
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s <= step
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  } transition-colors`}
                >
                  {s < step ? <Check className="w-6 h-6" /> : s}
                </div>
                <span className="text-xs mt-2 text-gray-600 hidden sm:block">
                  {s === 1 && 'Información'}
                  {s === 2 && 'Tipo de Web'}
                  {s === 3 && 'Detalles'}
                  {s === 4 && 'Extras'}
                </span>
                {s < 4 && (
                  <div className="hidden md:block absolute h-0.5 bg-gray-300 top-5 left-1/2 w-full" />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            {/* Paso 1: Información Básica */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Información Básica
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="Tu nombre"
                    style={{ color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="tu@email.com"
                    style={{ color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="+34 600 000 000"
                    style={{ color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de tu empresa o negocio *
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="Nombre del negocio"
                    style={{ color: '#111827' }}
                  />
                </div>
              </div>
            )}

            {/* Paso 2: Selecciona tu Plan */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Selecciona tu Plan
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    ¿Qué plan se adapta mejor a tu proyecto? *
                  </label>
                  <div className="space-y-3">
                    {[
                      { name: 'Una Página (60€)', desc: 'Landing page básica' },
                      { name: 'Multi Página (150€)', desc: 'Web hasta 5-7 páginas' },
                      { name: 'CMS Básico (250€)', desc: 'Web con gestor de contenido, 1 idioma' },
                      { name: 'CMS Avanzado (350€)', desc: 'Web con CMS complejo, 2 idiomas' },
                      { name: 'Proyecto Personalizado', desc: 'Presupuesto a medida' }
                    ].map((plan) => (
                      <label
                        key={plan.name}
                        className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600 transition-colors"
                      >
                        <input
                          type="radio"
                          name="plan"
                          value={plan.name}
                          checked={formData.plan === plan.name}
                          onChange={handleChange}
                          required
                          className="mr-3 mt-1"
                        />
                        <div>
                          <span className="font-medium text-gray-900 block" style={{ color: '#111827' }}>
                            {plan.name}
                          </span>
                          <span className="text-sm text-gray-600" style={{ color: '#6B7280' }}>
                            {plan.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    💡 Los servicios adicionales se calcularán por separado según tus necesidades
                  </p>
                </div>
              </div>
            )}

            {/* Paso 3: Detalles */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Detalles de tu Web
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe tu negocio y lo que quieres mostrar en la web *
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="Cuéntanos sobre tu negocio, servicios, productos..."
                    style={{ color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Funcionalidades básicas incluidas
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {funcionalidadesOptions.map((func) => (
                      <label
                        key={func}
                        className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          name="funcionalidades"
                          value={func}
                          checked={formData.funcionalidades.includes(func)}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <span className="text-gray-700" style={{ color: '#374151' }}>{func}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servicios Adicionales (con coste extra)
                  </label>
                  <p className="text-sm text-amber-600 mb-4">
                    ⚡ Selecciona los servicios extra que necesites. Cada uno tiene un coste adicional.
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {extrasOptions.map((extra) => (
                      <label
                        key={extra.name}
                        className="flex items-start p-4 border-2 border-amber-200 rounded-lg cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          name="extras"
                          value={extra.name}
                          checked={formData.extras.includes(extra.name)}
                          onChange={handleChange}
                          className="mr-3 mt-1"
                        />
                        <div className="flex-1">
                          <span className="text-gray-900 font-medium block" style={{ color: '#111827' }}>
                            {extra.name}
                          </span>
                          <span className="text-amber-600 font-bold text-sm">
                            +{extra.price}€
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {formData.extras.length > 0 && (
                    <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">
                        Total extras seleccionados: +
                        {extrasOptions
                          .filter(e => formData.extras.includes(e.name))
                          .reduce((sum, e) => sum + e.price, 0)}€
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webs de referencia (URLs)
                  </label>
                  <textarea
                    name="referencias"
                    value={formData.referencias}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="Comparte enlaces de webs que te gusten para tener una referencia del estilo"
                    style={{ color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colores corporativos (si los tienes)
                  </label>
                  <input
                    type="text"
                    name="colores"
                    value={formData.colores}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="Ej: Azul y blanco, #FF5733"
                    style={{ color: '#111827' }}
                  />
                </div>
              </div>
            )}

            {/* Paso 4: Extras */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Información Adicional
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Tienes los contenidos preparados? (textos, imágenes, logo)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="tieneContenido"
                        value="si"
                        checked={formData.tieneContenido === 'si'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span style={{ color: '#111827', fontWeight: '500' }}>Sí</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="tieneContenido"
                        value="parcial"
                        checked={formData.tieneContenido === 'parcial'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span style={{ color: '#111827', fontWeight: '500' }}>Parcialmente</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="tieneContenido"
                        value="no"
                        checked={formData.tieneContenido === 'no'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span style={{ color: '#111827', fontWeight: '500' }}>No (servicio adicional con coste extra)</span>
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-amber-600 font-medium">
                    ⚠️ La creación de textos e imágenes profesionales conlleva un coste adicional a calcular según necesidades
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Tienes dominio registrado?
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="tieneDominio"
                        value="si"
                        checked={formData.tieneDominio === 'si'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span style={{ color: '#111827', fontWeight: '500' }}>Sí</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="tieneDominio"
                        value="no"
                        checked={formData.tieneDominio === 'no'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span style={{ color: '#111827', fontWeight: '500' }}>No (servicio adicional con coste extra)</span>
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-amber-600 font-medium">
                    💡 El registro y configuración de dominio tiene un coste adicional (aprox. 15-30€/año según extensión)
                  </p>
                  {formData.tieneDominio === 'si' && (
                    <input
                      type="text"
                      name="dominio"
                      value={formData.dominio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                      placeholder="www.tudominio.com"
                      style={{ color: '#111827' }}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha deseada de lanzamiento
                  </label>
                  <input
                    type="date"
                    name="fechaLanzamiento"
                    value={formData.fechaLanzamiento}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white"
                    style={{ color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentarios adicionales
                  </label>
                  <textarea
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="Cualquier información adicional que quieras compartir"
                    style={{ color: '#111827' }}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Enviando...' : step === 4 ? 'Enviar Solicitud' : 'Siguiente'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
