import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight, MapPin, Zap, Award, Users, Target, TrendingUp, Globe, Star } from 'lucide-react'
import { getCiudadBySlug, getAllCiudadesSlugs, type CiudadData } from '@/lib/ciudades-data'

// Generar rutas estáticas para todas las ciudades
export async function generateStaticParams() {
  const slugs = getAllCiudadesSlugs()
  return slugs.map((ciudad) => ({
    ciudad: ciudad,
  }))
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: { params: { ciudad: string } }): Promise<Metadata> {
  const ciudad = getCiudadBySlug(params.ciudad)
  
  if (!ciudad) {
    return {
      title: 'Ciudad no encontrada',
    }
  }

  return {
    title: `Diseño Web en ${ciudad.nombre} - Páginas Web Profesionales | TuWebEn24h`,
    description: `Diseño de páginas web en ${ciudad.nombre}. ${ciudad.descripcionLarga}. Web profesional para tu negocio en 24 horas. Desde 299€.`,
    keywords: [
      `diseño web ${ciudad.nombre.toLowerCase()}`,
      `paginas web ${ciudad.nombre.toLowerCase()}`,
      `diseñador web ${ciudad.nombre.toLowerCase()}`,
      `crear web ${ciudad.nombre.toLowerCase()}`,
      `desarrollo web ${ciudad.nombre.toLowerCase()}`
    ],
    alternates: {
      canonical: `https://tuweben24h.com/diseno-web-${params.ciudad}`,
    },
    openGraph: {
      title: `Diseño Web en ${ciudad.nombre} - Tu Web en 24h`,
      description: `${ciudad.descripcionLarga}. Desde 299€.`,
      url: `https://tuweben24h.com/diseno-web-${params.ciudad}`,
      type: 'website',
    },
  }
}

const caracteristicasBase = [
  {
    icon: MapPin,
    titulo: 'SEO Local',
    descripcion: 'Optimizado para aparecer en búsquedas locales de tu ciudad'
  },
  {
    icon: Zap,
    titulo: 'Entrega 24h',
    descripcion: 'Tu web lista en solo 24 horas, garantizado'
  },
  {
    icon: Users,
    titulo: 'Diseño Profesional',
    descripcion: 'Adaptado a tu sector y mercado local'
  },
  {
    icon: Target,
    titulo: 'Conversión Optimizada',
    descripcion: 'Diseñada para convertir visitas en clientes'
  },
]

const problemasComunes = [
  'Tu negocio no aparece cuando buscan en Google',
  'Los clientes encuentran a tu competencia primero',
  'Tu presencia online no refleja la calidad de tu servicio',
  'Pierdes clientes porque no tienes web profesional',
]

export default function DisenoWebCiudadPage({ params }: { params: { ciudad: string } }) {
  const ciudad = getCiudadBySlug(params.ciudad)

  if (!ciudad) {
    notFound()
  }

  const seccionesIncluidas = [
    `Diseño profesional adaptado a ${ciudad.nombre}`,
    `SEO optimizado para "${ciudad.nombre} + tu sector"`,
    'Diseño responsive (móvil, tablet, ordenador)',
    'Formulario de contacto con notificaciones',
    'Integración Google Maps con tu ubicación',
    'Enlaces a redes sociales',
    'Certificado SSL (https seguro)',
    'Optimización de velocidad de carga',
    'Textos básicos incluidos',
    'Galería de imágenes profesional',
    'Hosting primer año incluido',
    'Dominio .es o .com primer año',
  ]

  return (
    <>
      {/* Schema.org para SEO LOCAL */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: `Diseño Web en ${ciudad.nombre}`,
            description: `Servicio de diseño y desarrollo de páginas web profesionales en ${ciudad.nombre}. ${ciudad.descripcionLarga}`,
            areaServed: {
              '@type': 'City',
              name: ciudad.nombre,
            },
            provider: {
              '@type': 'Organization',
              name: 'TuWebEn24h',
              url: 'https://tuweben24h.com',
            },
            priceRange: '€€',
            serviceType: 'Diseño Web',
            url: `https://tuweben24h.com/diseno-web-${params.ciudad}`,
          }),
        }}
      />

      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero - IGUAL QUE LA HOME */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              {/* Badge - igual que home */}
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <MapPin className="w-4 h-4" />
                <span>Diseño Web en {ciudad.nombre}</span>
              </div>

              {/* Título con gradiente AZUL - igual que home */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Diseño de Páginas Web
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  en {ciudad.nombre} en 24h
                </span>
              </h1>

              {/* Descripción PERSONALIZADA por ciudad */}
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                {ciudad.descripcionLarga}. Web profesional, moderna y optimizada para aparecer en Google.
              </p>

              {/* 2 CTAs - igual que home */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  href="/solicitar"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Solicitar Mi Web Ahora
                </Link>
                <Link
                  href="/#pricing"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-primary-600"
                >
                  Ver Precios
                </Link>
              </div>

              {/* Trust indicators - 4 columnas igual que home */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <MapPin className="w-8 h-8 text-primary-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">SEO Local</p>
                    <p className="text-sm text-gray-600">Optimizado {ciudad.nombre}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Zap className="w-8 h-8 text-accent-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">24 Horas</p>
                    <p className="text-sm text-gray-600">Entrega garantizada</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Award className="w-8 h-8 text-primary-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Desde 299€</p>
                    <p className="text-sm text-gray-600">Precio transparente</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Star className="w-8 h-8 text-accent-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Profesional</p>
                    <p className="text-sm text-gray-600">Diseño moderno</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problemas - IGUAL QUE SERVICIOS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                ¿Tu negocio en {ciudad.nombre} necesita más visibilidad?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Estos son los problemas que solucionamos con tu web profesional
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {problemasComunes.map((problema, index) => (
                <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-lg transition-all">
                  <p className="text-lg text-gray-700">❌ {problema}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-4xl mx-auto p-6 rounded-xl border-2 border-green-300 bg-green-50">
              <p className="text-xl text-gray-900 text-center">
                <strong className="text-green-700">✅ Solución:</strong> Una web profesional que posiciona tu negocio en {ciudad.nombre} 
                y atrae clientes locales las 24 horas del día
              </p>
            </div>
          </div>
        </section>

        {/* Características - Grid 4 columnas IGUAL QUE HOME */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Web Profesional para tu Negocio en {ciudad.nombre}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Todo lo que necesitas para destacar en el mercado de {ciudad.nombre}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caracteristicasBase.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                      <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
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

        {/* SECCIÓN LOCAL - Destacados PERSONALIZADOS de cada ciudad */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Conocemos el Mercado de {ciudad.nombre}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {ciudad.descripcionCorta && `Tu web adaptada a ${ciudad.descripcionCorta}`}
              </p>
            </div>

            {/* DESTACADOS LOCALES - datos reales de cada ciudad */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {ciudad.destacados.map((destacado, index) => (
                <div key={index} className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{destacado}</h3>
                </div>
              ))}
            </div>

            {/* SECTORES POPULARES - específicos de cada ciudad */}
            {ciudad.sectoresPopulares && ciudad.sectoresPopulares.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Sectores populares en {ciudad.nombre}:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {ciudad.sectoresPopulares.map((sector, index) => (
                    <span key={index} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Qué Incluye - Tarjeta central IGUAL QUE SERVICIOS */}
        <section id="incluye" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Qué Incluye tu Web en {ciudad.nombre}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Todo listo para empezar a captar clientes desde el primer día
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 border-2 border-primary-200 shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  {seccionesIncluidas.map((seccion, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{seccion}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-primary-200">
                  <p className="text-center text-gray-600 mb-4">
                    <strong className="text-primary-700">¿Necesitas algo específico para {ciudad.nombre}?</strong>
                  </p>
                  <p className="text-center text-sm text-gray-600">
                    Podemos añadir funcionalidades personalizadas según tu sector
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final - Gradiente AZUL IGUAL QUE HOME */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-accent-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para Impulsar tu Negocio en {ciudad.nombre}?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Tu web profesional lista en 24 horas. Diseño moderno, SEO local optimizado para {ciudad.nombre} y lista para convertir.
            </p>
            <Link
              href="/solicitar"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl"
            >
              Solicitar Mi Web Ahora <ArrowRight className="ml-2" />
            </Link>
            <p className="text-primary-100 mt-6 text-sm">
              📍 {ciudad.nombre} · ⚡ Entrega en 24h · 💰 Desde 299€ · ✅ SEO Local Incluido
            </p>
            
            {/* Población si está disponible */}
            {ciudad.poblacion && (
              <p className="text-primary-200 mt-4 text-xs">
                Servicio de diseño web para los {ciudad.poblacion} de {ciudad.nombre}
              </p>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
