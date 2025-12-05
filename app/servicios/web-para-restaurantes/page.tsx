import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight, UtensilsCrossed, Calendar, MapPin, Star, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Páginas Web para Restaurantes - Diseño en 24h | TuWebEn24h',
  description: 'Diseño de páginas web para restaurantes. Menú online, reservas, galería de platos. Web responsive desde 299€. ¡Aumenta tus reservas online!',
  keywords: ['pagina web restaurante', 'diseño web restaurantes', 'web para bares', 'menu online restaurante', 'reservas online restaurante'],
  alternates: {
    canonical: 'https://tuweben24h.com/servicios/web-para-restaurantes',
  },
}

const caracteristicas = [
  {
    icon: UtensilsCrossed,
    titulo: 'Menú atractivo',
    descripcion: 'Carta digital visual con fotos que abren el apetito y precios claros.'
  },
  {
    icon: Calendar,
    titulo: 'Sistema de reservas',
    descripcion: 'Tus clientes reservan mesa directamente desde la web, 24/7.'
  },
  {
    icon: MapPin,
    titulo: 'Ubicación destacada',
    descripcion: 'Google Maps integrado para que te encuentren fácilmente.'
  },
  {
    icon: Star,
    titulo: 'Reseñas visibles',
    descripcion: 'Muestra opiniones de clientes satisfechos para generar confianza.'
  },
]

const problemasRestaurantes = [
  'Clientes que no encuentran tu menú online',
  'Pierdes reservas porque no coges el teléfono',
  'Tu Instagram no convierte en clientes reales',
  'Competencia con web moderna que te gana comensales',
]

const seccionesIncluidas = [
  'Página principal con fotos destacadas',
  'Carta/menú completo con precios',
  'Galería de platos irresistible',
  'Formulario de reservas',
  'Mapa y cómo llegar',
  'Horarios y contacto visible',
  'Enlaces a redes sociales',
  'Optimización para búsquedas locales',
]

export default function WebRestaurantesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Diseño Web para Restaurantes',
            description: 'Páginas web profesionales para restaurantes, bares y cafeterías con menú online y reservas',
            provider: {
              '@type': 'Organization',
              name: 'TuWebEn24h',
            },
            serviceType: 'Diseño Web para Restauración',
            areaServed: 'ES',
          }),
        }}
      />

      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero - Mismo estilo que la home */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              {/* Badge - Mismo estilo home con toque naranja para restaurantes */}
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Especializado en Restaurantes</span>
              </div>

              {/* Título - Mismo estilo que home */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Página Web para tu
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  Restaurante en 24h
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Muestra tu carta, recibe reservas online y atrae más clientes. 
                Diseño pensado específicamente para restaurantes, bares y cafeterías.
              </p>

              {/* CTAs - Mismo estilo home */}
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

              {/* Trust indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <UtensilsCrossed className="w-8 h-8 text-orange-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Menú Online</p>
                    <p className="text-sm text-gray-600">Visual y atractivo</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Calendar className="w-8 h-8 text-primary-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Reservas 24/7</p>
                    <p className="text-sm text-gray-600">Sistema automatizado</p>
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

        {/* Problemas - Mismo estilo Features de home */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                ¿Te suena familiar?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Problemas comunes que solucionamos con tu web para restaurante
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {problemasRestaurantes.map((problema, index) => (
                <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-lg transition-all">
                  <p className="text-lg text-gray-700">❌ {problema}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-4xl mx-auto p-6 rounded-xl border-2 border-green-300 bg-green-50">
              <p className="text-xl text-gray-900 text-center">
                <strong className="text-green-700">✅ Solución:</strong> Una web que muestra tu mejor carta, 
                acepta reservas automáticamente y aparece cuando buscan "restaurantes cerca de mí"
              </p>
            </div>
          </div>
        </section>

        {/* Características - Mismo estilo que Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Todo lo que Necesita tu Restaurante
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Diseñada específicamente para el sector de la restauración
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
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                      <Icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
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
                Secciones incluidas en tu web
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
                  Quiero mi web para restaurante
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <p className="text-gray-600 mt-4">Desde 299€ · Entrega en 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final - Mismo estilo que CTA component */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-accent-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tu restaurante merece una web profesional
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Rellena el formulario y mañana tendrás tu web recibiendo reservas
            </p>
            <Link
              href="/solicitar"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl"
            >
              Empezar ahora - Desde 299€
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <p className="text-primary-100 mt-6 text-sm">
              ⚡ Entrega en 24 horas · 🍽️ Especializado en restauración · ✅ Sin permanencia
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
