import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, ExternalLink, Star, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Proyectos y Casos de Éxito - Portfolio | TuWebEn24h',
  description: 'Descubre nuestros proyectos de páginas web reales. Casos de éxito de restaurantes, abogados, clínicas y más. Portfolio de webs en 24 horas.',
  keywords: ['portfolio diseño web', 'casos de exito web', 'ejemplos paginas web', 'proyectos web'],
  alternates: {
    canonical: 'https://tuweben24h.com/proyectos',
  },
}

const proyectosEjemplo = [
  {
    id: 'restaurante-la-tasca-madrid',
    titulo: 'La Tasca del Barrio - Restaurante Madrid',
    sector: 'Restaurante',
    ciudad: 'Madrid',
    descripcion: 'Web con menú interactivo, galería de platos y sistema de reservas online. Aumento del 45% en reservas digitales.',
    imagen: '/proyectos/restaurante-tasca.jpg',
    tags: ['Hostelería', 'Madrid', 'Reservas Online'],
    resultado: '+45% reservas online',
    testimonio: 'Desde que tenemos la web, las reservas han aumentado muchísimo. Muy contentos con el resultado.',
    cliente: 'María G., Propietaria'
  },
  {
    id: 'bufete-garcia-abogados',
    titulo: 'García & Asociados - Despacho de Abogados',
    sector: 'Abogados',
    ciudad: 'Barcelona',
    descripcion: 'Web profesional con áreas de práctica, equipo legal y formulario de consulta. Imagen de confianza y seriedad.',
    imagen: '/proyectos/bufete-garcia.jpg',
    tags: ['Legal', 'Barcelona', 'Corporativo'],
    resultado: '+60% consultas iniciales',
    testimonio: 'La web nos ha ayudado a proyectar una imagen mucho más profesional y moderna.',
    cliente: 'Juan García, Socio Director'
  },
  {
    id: 'clinica-dental-valencia',
    titulo: 'Clínica Dental Sonrisa - Valencia',
    sector: 'Clínica',
    ciudad: 'Valencia',
    descripcion: 'Web sanitaria con información de tratamientos, equipo médico y sistema de citas. Cumplimiento LOPD sanitaria.',
    imagen: '/proyectos/clinica-dental.jpg',
    tags: ['Salud', 'Valencia', 'Citas Online'],
    resultado: '+50% citas online',
    testimonio: 'Nuestros pacientes valoran mucho poder pedir cita desde la web. Muy recomendable.',
    cliente: 'Dra. Carmen López'
  },
  {
    id: 'tienda-moda-online',
    titulo: 'ModaStyle - Tienda de Ropa Online',
    sector: 'E-commerce',
    ciudad: 'Madrid',
    descripcion: 'Tienda online completa con catálogo de productos, carrito y pasarela de pago. Integración con envíos.',
    imagen: '/proyectos/tienda-moda.jpg',
    tags: ['E-commerce', 'Madrid', 'Tienda Online'],
    resultado: '150+ ventas primer mes',
    testimonio: 'Superó nuestras expectativas. La tienda es intuitiva y las ventas no paran de crecer.',
    cliente: 'Laura M., CEO'
  },
  {
    id: 'coach-personal-desarrollo',
    titulo: 'Coach Laura Martínez - Desarrollo Personal',
    sector: 'Coach',
    ciudad: 'Online',
    descripcion: 'Landing page optimizada para conversión con programas de coaching, testimonios y formulario de contacto.',
    imagen: '/proyectos/coach-laura.jpg',
    tags: ['Coaching', 'Landing Page', 'Personal'],
    resultado: '+70% leads cualificados',
    testimonio: 'Mi negocio online despegó desde el primer día. Inversión 100% rentable.',
    cliente: 'Laura Martínez, Coach'
  },
  {
    id: 'inmobiliaria-casas-sol',
    titulo: 'Casas del Sol - Inmobiliaria',
    sector: 'Inmobiliaria',
    ciudad: 'Barcelona',
    descripcion: 'Portal inmobiliario con búsqueda de propiedades, fichas detalladas y formularios de contacto por propiedad.',
    imagen: '/proyectos/inmobiliaria.jpg',
    tags: ['Inmobiliaria', 'Barcelona', 'Portal'],
    resultado: '+40% consultas propiedades',
    testimonio: 'Los clientes pueden ver todas las propiedades desde casa. Muy práctico.',
    cliente: 'Roberto S., Director'
  },
]

const stats = [
  { numero: '127+', label: 'Proyectos completados' },
  { numero: '4.9/5', label: 'Valoración media' },
  { numero: '24h', label: 'Tiempo de entrega' },
  { numero: '98%', label: 'Clientes satisfechos' },
]

const sectores = [
  'Todos',
  'Restaurantes',
  'Abogados',
  'Clínicas',
  'E-commerce',
  'Coaches',
  'Inmobiliarias',
]

export default function ProyectosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Proyectos y Casos de Éxito',
            description: 'Portfolio de proyectos de diseño web completados en 24 horas',
            provider: {
              '@type': 'Organization',
              name: 'TuWebEn24h',
            },
          }),
        }}
      />

      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Proyectos Reales, Resultados Reales
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                Descubre cómo hemos ayudado a más de 127 negocios a tener su web profesional 
                en 24 horas y aumentar sus ventas online.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                    {stat.numero}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {sectores.map((sector, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    index === 0
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de proyectos */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proyectosEjemplo.map((proyecto) => (
                <Link
                  key={proyecto.id}
                  href={`/proyectos/${proyecto.id}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                >
                  {/* Imagen placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300"></div>
                    <span className="text-6xl font-bold text-primary-300 relative z-10">
                      {proyecto.titulo.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {proyecto.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {proyecto.titulo}
                    </h3>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {proyecto.ciudad}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        24h
                      </span>
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {proyecto.descripcion}
                    </p>
                    
                    {/* Resultado */}
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <p className="text-sm font-semibold text-green-700">
                        📈 {proyecto.resultado}
                      </p>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-semibold inline-flex items-center group-hover:gap-2 transition-all">
                        Ver caso completo
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios destacados */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Lo que dicen nuestros clientes
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {proyectosEjemplo.slice(0, 3).map((proyecto) => (
                <div key={proyecto.id} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{proyecto.testimonio}"
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {proyecto.cliente}
                  </p>
                  <p className="text-sm text-gray-600">{proyecto.sector}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Listo para ser nuestro próximo caso de éxito?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Únete a más de 127 negocios que ya tienen su web profesional
            </p>
            <Link
              href="/solicitar"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-all text-lg"
            >
              Solicitar mi web ahora
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <p className="text-primary-200 mt-6">
              ⚡ Entrega en 24h · 💰 Desde 299€ · ✅ Satisfacción garantizada
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}


