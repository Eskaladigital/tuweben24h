import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Home, FileText, Briefcase, MapPin, ShoppingBag, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mapa del Sitio - TuWebEn24h',
  description: 'Navegación completa del sitio web de TuWebEn24h. Encuentra todas nuestras páginas, servicios, proyectos y artículos del blog.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function SitemapPage() {
  const secciones = [
    {
      titulo: 'Páginas Principales',
      icon: Home,
      enlaces: [
        { url: '/', label: 'Inicio' },
        { url: '/solicitar', label: 'Solicitar Web' },
        { url: '/proyectos', label: 'Proyectos y Portfolio' },
        { url: '/blog', label: 'Blog' },
      ],
    },
    {
      titulo: 'Servicios por Sector',
      icon: Briefcase,
      enlaces: [
        { url: '/servicios/paginas-web-para-negocios', label: 'Páginas Web para Negocios' },
        { url: '/servicios/web-para-restaurantes', label: 'Web para Restaurantes' },
        { url: '/servicios/web-para-abogados', label: 'Web para Abogados' },
        { url: '/servicios/web-para-clinicas', label: 'Web para Clínicas' },
        { url: '/servicios/web-para-coaches', label: 'Web para Coaches' },
        { url: '/servicios/web-para-inmobiliarias', label: 'Web para Inmobiliarias' },
        { url: '/servicios/web-para-talleres', label: 'Web para Talleres' },
        { url: '/servicios/web-para-dentistas', label: 'Web para Dentistas' },
        { url: '/servicios/web-para-peluquerias', label: 'Web para Peluquerías' },
        { url: '/servicios/web-para-psicologos', label: 'Web para Psicólogos' },
      ],
    },
    {
      titulo: 'Diseño Web por Ciudad - Principales',
      icon: MapPin,
      enlaces: [
        { url: '/diseno-web-madrid', label: 'Madrid' },
        { url: '/diseno-web-barcelona', label: 'Barcelona' },
        { url: '/diseno-web-valencia', label: 'Valencia' },
        { url: '/diseno-web-sevilla', label: 'Sevilla' },
        { url: '/diseno-web-zaragoza', label: 'Zaragoza' },
        { url: '/diseno-web-malaga', label: 'Málaga' },
        { url: '/diseno-web-murcia', label: 'Murcia' },
        { url: '/diseno-web-palma', label: 'Palma de Mallorca' },
        { url: '/diseno-web-bilbao', label: 'Bilbao' },
        { url: '/diseno-web-alicante', label: 'Alicante' },
      ],
    },
    {
      titulo: 'Más Ciudades',
      icon: MapPin,
      enlaces: [
        { url: '/diseno-web-cordoba', label: 'Córdoba' },
        { url: '/diseno-web-valladolid', label: 'Valladolid' },
        { url: '/diseno-web-vigo', label: 'Vigo' },
        { url: '/diseno-web-gijon', label: 'Gijón' },
        { url: '/diseno-web-coruna', label: 'A Coruña' },
        { url: '/diseno-web-granada', label: 'Granada' },
        { url: '/diseno-web-vitoria', label: 'Vitoria' },
        { url: '/diseno-web-santander', label: 'Santander' },
        { url: '/diseno-web-pamplona', label: 'Pamplona' },
        { url: '/diseno-web-almeria', label: 'Almería' },
        { url: '/diseno-web-oviedo', label: 'Oviedo' },
        { url: '/diseno-web-leon', label: 'León' },
        { url: '/diseno-web-salamanca', label: 'Salamanca' },
        { url: '/diseno-web-burgos', label: 'Burgos' },
        { url: '/diseno-web-cadiz', label: 'Cádiz' },
        { url: '/diseno-web-logrono', label: 'Logroño' },
        { url: '/diseno-web-badajoz', label: 'Badajoz' },
      ],
    },
    {
      titulo: 'Recursos',
      icon: FileText,
      enlaces: [
        { url: '/blog', label: 'Todos los Artículos del Blog' },
        { url: '/#pricing', label: 'Precios y Planes' },
        { url: '/#features', label: 'Características' },
        { url: '/#how-it-works', label: 'Cómo Funciona' },
        { url: '/#faq', label: 'Preguntas Frecuentes' },
      ],
    },
    {
      titulo: 'Área de Clientes',
      icon: Users,
      enlaces: [
        { url: '/cliente/login', label: 'Portal Cliente - Login' },
        { url: '/admin/login', label: 'Panel Admin - Login' },
      ],
    },
    {
      titulo: 'Legal',
      icon: ShoppingBag,
      enlaces: [
        { url: '/privacidad', label: 'Política de Privacidad' },
        { url: '/terminos', label: 'Términos y Condiciones' },
        { url: '/sitemap.xml', label: 'Sitemap XML (para buscadores)' },
      ],
    },
  ]

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mapa del Sitio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Navegación completa de todas las páginas de TuWebEn24h. 
              Encuentra fácilmente lo que buscas.
            </p>
          </div>

          {/* Grid de secciones */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secciones.map((seccion, index) => {
              const Icon = seccion.icon
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {seccion.titulo}
                    </h2>
                  </div>
                  
                  <ul className="space-y-2">
                    {seccion.enlaces.map((enlace, i) => (
                      <li key={i}>
                        <Link
                          href={enlace.url}
                          className="text-gray-600 hover:text-primary-600 transition-colors flex items-center group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 group-hover:bg-primary-600 transition-colors"></span>
                          {enlace.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Artículos recientes del blog */}
          <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Artículos Destacados del Blog
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-primary-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Cuánto Cuesta una Página Web Profesional en 2025
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Guía completa de precios desde 299€ hasta 10.000€+ según necesidades
                </p>
                <Link href="/blog" className="text-primary-600 text-sm font-medium hover:underline">
                  Leer artículo →
                </Link>
              </div>

              <div className="border-l-4 border-primary-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Qué Debe Tener una Buena Página Web en 2025
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Checklist de 15 elementos esenciales para una web profesional
                </p>
                <Link href="/blog" className="text-primary-600 text-sm font-medium hover:underline">
                  Leer artículo →
                </Link>
              </div>

              <div className="border-l-4 border-primary-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">
                  7 Errores Fatales al Contratar una Web Barata
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Evita estos errores comunes y ahorra dinero a largo plazo
                </p>
                <Link href="/blog" className="text-primary-600 text-sm font-medium hover:underline">
                  Leer artículo →
                </Link>
              </div>

              <div className="border-l-4 border-primary-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Cómo Mejorar la Conversión de tu Web
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  10 cambios prácticos que puedes implementar hoy mismo
                </p>
                <Link href="/blog" className="text-primary-600 text-sm font-medium hover:underline">
                  Leer artículo →
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Ver todos los artículos del blog
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contáctanos directamente y te ayudamos a encontrar la solución perfecta para tu negocio
            </p>
            <Link
              href="/solicitar"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-colors"
            >
              Solicitar Información
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

