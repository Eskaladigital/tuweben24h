import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight, Target, Users, TrendingUp, Calendar, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Páginas Web para Coaches - Diseño Profesional | TuWebEn24h',
  description: 'Diseño web para coaches y mentores. Landing page optimizada para captar clientes. Desde 299€. ¡Haz crecer tu negocio de coaching!',
  keywords: ['pagina web coach', 'diseño web coaching', 'landing page coach', 'web para mentores'],
  alternates: { canonical: 'https://tuweben24h.com/servicios/web-para-coaches' },
}

const caracteristicas = [
  { icon: Target, titulo: 'Conversión optimizada', descripcion: 'Landing diseñada específicamente para captar leads cualificados.' },
  { icon: Users, titulo: 'Testimonios destacados', descripcion: 'Muestra tus casos de éxito para generar confianza.' },
  { icon: TrendingUp, titulo: 'Servicios claros', descripcion: 'Programas de coaching explicados de forma visual y atractiva.' },
  { icon: Calendar, titulo: 'Reserva de sesiones', descripcion: 'Sistema para agendar sesiones directamente desde tu web.' },
]

const problemas = [
  'Dependes solo de redes sociales para captar clientes',
  'No tienes dónde dirigir el tráfico de tus anuncios',
  'Pierdes credibilidad sin una web profesional',
  'Difícil explicar todos tus servicios en Instagram',
]

const incluye = [
  'Landing page optimizada para conversión',
  'Presentación de servicios y programas',
  'Sección de testimonios y casos de éxito',
  'Formulario de contacto o reserva',
  'Bio profesional y credenciales',
  'Call-to-action estratégicos',
  'Integración con redes sociales',
  'SEO para búsquedas de coaching',
]

export default function WebCoachesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Target className="w-4 h-4" />
                <span>Especializado en Coaches</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Web para Coaches que
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  Convierten Visitas en Clientes
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Landing page optimizada para captar leads. Muestra tus programas, casos de éxito y genera confianza desde el primer clic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/solicitar" className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Solicitar Mi Web Ahora
                </Link>
                <Link href="#incluye" className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-primary-600">
                  Ver Qué Incluye
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <Target className="w-8 h-8 text-purple-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Alta Conversión</p>
                    <p className="text-sm text-gray-600">Diseño optimizado</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Users className="w-8 h-8 text-primary-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Credibilidad</p>
                    <p className="text-sm text-gray-600">Testimonios visibles</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Zap className="w-8 h-8 text-accent-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">24 Horas</p>
                    <p className="text-sm text-gray-600">Entrega garantizada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">¿Te suena familiar?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Problemas comunes de coaches sin web profesional</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {problemas.map((problema, i) => (
                <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-lg transition-all">
                  <p className="text-lg text-gray-700">❌ {problema}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-4xl mx-auto p-6 rounded-xl border-2 border-green-300 bg-green-50">
              <p className="text-xl text-gray-900 text-center">
                <strong className="text-green-700">✅ Solución:</strong> Una landing page que funciona como tu vendedor 24/7 y convierte visitantes en clientes
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Todo lo que Necesitas como Coach</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Diseñada para convertir tráfico en clientes de coaching</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caracteristicas.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                      <Icon className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.titulo}</h3>
                    <p className="text-gray-600">{item.descripcion}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="incluye" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Qué incluye tu web para coaching</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {incluye.map((item, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/solicitar" className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Quiero mi landing de coaching <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <p className="text-gray-600 mt-4">Desde 299€ · Entrega en 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-accent-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Haz crecer tu negocio de coaching</h2>
            <p className="text-xl text-primary-100 mb-8">Landing profesional lista en 24 horas para empezar a captar clientes ya</p>
            <Link href="/solicitar" className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl">
              Empezar ahora - Desde 299€ <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <p className="text-primary-100 mt-6 text-sm">🎯 Optimizada para conversión · ⚡ 24h · ✅ Sin permanencia</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}


