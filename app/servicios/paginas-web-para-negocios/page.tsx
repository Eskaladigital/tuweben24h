import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight, Zap, Shield, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Páginas Web para Negocios - Diseño Profesional en 24h',
  description: 'Diseño de páginas web para negocios y pymes. Web profesional, responsive y optimizada para captar clientes. Desde 299€. ¡Empieza hoy!',
  keywords: ['paginas web para negocios', 'diseño web para pymes', 'web profesional para empresas', 'crear web para negocio'],
  alternates: {
    canonical: 'https://tuweben24h.com/servicios/paginas-web-para-negocios',
  },
  openGraph: {
    title: 'Páginas Web para Negocios - Diseño Profesional en 24h',
    description: 'Web profesional para tu negocio en solo 24 horas. Diseño moderno y optimizado.',
    url: 'https://tuweben24h.com/servicios/paginas-web-para-negocios',
  },
}

const beneficios = [
  {
    icon: Zap,
    titulo: 'Listo en 24 horas',
    descripcion: 'Tu web funcionando en tiempo récord para que no pierdas oportunidades de negocio.'
  },
  {
    icon: Users,
    titulo: 'Más clientes online',
    descripcion: 'Diseño optimizado para convertir visitantes en clientes reales de tu negocio.'
  },
  {
    icon: Shield,
    titulo: 'Imagen profesional',
    descripcion: 'Da confianza y credibilidad con una web moderna que destaca frente a la competencia.'
  },
  {
    icon: TrendingUp,
    titulo: 'SEO optimizado',
    descripcion: 'Aparecer en Google desde el primer día. Tu negocio visible cuando te busquen.'
  },
]

const problemas = [
  'Tu competencia tiene web y tú no',
  'Pierdes clientes que buscan en Google',
  'No puedes mostrar tus servicios 24/7',
  'Tu imagen no inspira confianza profesional',
]

const incluye = [
  'Diseño responsive (móvil, tablet, desktop)',
  'Formulario de contacto funcional',
  'Integración con Google Maps',
  'Optimización SEO básica',
  'Velocidad de carga optimizada',
  'Certificado SSL (web segura)',
  'Adaptado a tu imagen de marca',
  'Textos y estructura optimizada',
]

const sectoresEjemplo = [
  { nombre: 'Restaurantes', url: '/servicios/web-para-restaurantes' },
  { nombre: 'Abogados', url: '/servicios/web-para-abogados' },
  { nombre: 'Clínicas', url: '/servicios/web-para-clinicas' },
  { nombre: 'Coaches', url: '/servicios/web-para-coaches' },
  { nombre: 'Inmobiliarias', url: '/servicios/web-para-inmobiliarias' },
  { nombre: 'Talleres', url: '/servicios/web-para-talleres' },
]

export default function PaginasWebNegociosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Diseño de Páginas Web para Negocios',
            description: 'Creación de páginas web profesionales para negocios y pymes en 24 horas',
            provider: {
              '@type': 'Organization',
              name: 'TuWebEn24h',
            },
            areaServed: 'ES',
            offers: {
              '@type': 'Offer',
              price: '299',
              priceCurrency: 'EUR',
            },
          }),
        }}
      />

      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Páginas Web para Negocios en 24 Horas
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                Tu negocio merece una web profesional que genere confianza y atraiga clientes. 
                Diseño moderno, responsive y optimizado. Desde 299€.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/solicitar"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-all"
                >
                  Solicitar mi web ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/proyectos"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white rounded-lg font-bold hover:bg-primary-600 transition-all"
                >
                  Ver proyectos realizados
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problemas comunes */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              ¿Te suena familiar alguno de estos problemas?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {problemas.map((problema, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                  <p className="text-lg text-gray-700">❌ {problema}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xl text-gray-600 mt-8">
              <strong>La solución:</strong> Una web profesional que trabaje para tu negocio 24/7
            </p>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Ventajas de tener una web profesional
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {beneficios.map((beneficio, index) => {
                const Icon = beneficio.icon
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {beneficio.titulo}
                    </h3>
                    <p className="text-gray-600">
                      {beneficio.descripcion}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  ¿Qué incluye tu página web para negocios?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Todo lo necesario para que tu negocio tenga presencia online profesional 
                  desde el primer día. Sin sorpresas ni costes ocultos.
                </p>
                <ul className="space-y-4">
                  {incluye.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Precio transparente</h3>
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 mb-2">Desde</p>
                    <p className="text-5xl font-bold text-primary-600">299€</p>
                    <p className="text-gray-600 mt-2">pago único</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Landing page completa
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Entrega en 24 horas
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Diseño responsive
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      1 revisión incluida
                    </li>
                  </ul>
                  <Link
                    href="/solicitar"
                    className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors"
                  >
                    Empezar ahora
                  </Link>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Ver todos los <Link href="/#pricing" className="text-primary-600 hover:underline">planes disponibles</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sectores */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Páginas web especializadas por sector
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Cada negocio es único. Conocemos las necesidades específicas de cada sector 
              y diseñamos tu web pensando en tus clientes.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {sectoresEjemplo.map((sector, index) => (
                <Link
                  key={index}
                  href={sector.url}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all group"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {sector.nombre}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Web específica para {sector.nombre.toLowerCase()}
                  </p>
                  <span className="text-primary-600 font-semibold inline-flex items-center">
                    Ver más <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Listo para llevar tu negocio online?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Rellena el formulario y en menos de 24 horas tendrás tu web lista para captar clientes
            </p>
            <Link
              href="/solicitar"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-all text-lg"
            >
              Solicitar mi web ahora
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <p className="text-primary-200 mt-6">
              🔒 Sin permanencia · ⚡ Entrega en 24h · ✅ Satisfacción garantizada
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}


