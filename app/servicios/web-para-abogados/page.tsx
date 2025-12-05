import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight, Scale, Shield, FileText, Phone, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Páginas Web para Abogados - Diseño Profesional | TuWebEn24h',
  description: 'Diseño de páginas web para despachos de abogados. Web profesional que transmite confianza y atrae clientes. Desde 299€. ¡Capta más casos!',
  keywords: ['pagina web abogados', 'diseño web despacho abogados', 'web bufete', 'web para abogados', 'marketing juridico'],
  alternates: {
    canonical: 'https://tuweben24h.com/servicios/web-para-abogados',
  },
}

const caracteristicas = [
  {
    icon: Scale,
    titulo: 'Imagen profesional',
    descripcion: 'Diseño serio y elegante que transmite confianza y credibilidad legal.'
  },
  {
    icon: Shield,
    titulo: 'Áreas de práctica',
    descripcion: 'Muestra claramente tus especialidades y tipos de casos que atiendes.'
  },
  {
    icon: FileText,
    titulo: 'Formulario contacto',
    descripcion: 'Consulta inicial fácil y rápida para que te contacten potenciales clientes.'
  },
  {
    icon: Phone,
    titulo: 'Llamada directa',
    descripcion: 'Botones de contacto directo optimizados para móvil.'
  },
]

const problemasAbogados = [
  'Clientes potenciales que te buscan pero no te encuentran',
  'Despachos con web moderna te están ganando casos',
  'No transmites profesionalidad sin presencia online',
  'Pierdes consultas porque no es fácil contactarte',
]

const seccionesIncluidas = [
  'Página principal con propuesta de valor',
  'Áreas de práctica y especialidades',
  'Sobre el despacho / curriculum profesional',
  'Formulario de consulta inicial',
  'Preguntas frecuentes legales',
  'Datos de contacto destacados',
  'Cumplimiento LOPD y privacidad',
  'Optimización para búsquedas locales',
]

export default function WebAbogadosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Diseño Web para Abogados',
            description: 'Páginas web profesionales para despachos de abogados y bufetes',
            provider: {
              '@type': 'Organization',
              name: 'TuWebEn24h',
            },
            serviceType: 'Diseño Web Legal',
            areaServed: 'ES',
          }),
        }}
      />

      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Scale className="w-4 h-4" />
                <span>Especializado en Despachos Legales</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Página Web para Abogados
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  que Atrae Clientes
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Diseño profesional y elegante que transmite confianza. 
                Destaca tus especialidades y consigue más consultas legales.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  href="/solicitar"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Solicitar Mi Web Ahora
                </Link>
                <Link
                  href="#incluye"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-primary-600"
                >
                  Ver Qué Incluye
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <Scale className="w-8 h-8 text-indigo-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Profesional</p>
                    <p className="text-sm text-gray-600">Imagen de confianza</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Shield className="w-8 h-8 text-primary-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">LOPD Cumplida</p>
                    <p className="text-sm text-gray-600">Legal y seguro</p>
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

        {/* Problemas */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                ¿Por qué tu despacho necesita una web?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Problemas que afectan a despachos sin presencia online profesional
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {problemasAbogados.map((problema, index) => (
                <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-lg transition-all">
                  <p className="text-lg text-gray-700">❌ {problema}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-4xl mx-auto p-6 rounded-xl border-2 border-green-300 bg-green-50">
              <p className="text-xl text-gray-900 text-center">
                <strong className="text-green-700">✅ Solución:</strong> Una web que proyecta profesionalidad, 
                explica claramente cómo puedes ayudar y facilita que te contacten
              </p>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Una web pensada para despachos legales
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Conocemos el sector legal y diseñamos tu web para transmitir seriedad y confianza
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caracteristicas.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                      <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.titulo}
                    </h3>
                    <p className="text-gray-600">{item.descripcion}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Incluye */}
        <section id="incluye" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Qué incluye tu web para abogados
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {seccionesIncluidas.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/solicitar"
                  className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Solicitar web para mi despacho
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <p className="text-gray-600 mt-4">Desde 299€ · Entrega en 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-accent-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Da el paso hacia la digitalización de tu despacho
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              En 24 horas tendrás una web profesional que te ayudará a captar más casos
            </p>
            <Link
              href="/solicitar"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl"
            >
              Solicitar web para abogados
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <p className="text-primary-100 mt-6 text-sm">
              ⚖️ Especializado en sector legal · ⚡ Entrega en 24h · 📱 100% responsive
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
