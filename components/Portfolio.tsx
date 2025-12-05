import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

const portfolioItems = [
  {
    title: 'Restaurante La Toscana',
    category: 'Restauración',
    description: 'Landing page con menú digital y sistema de reservas',
    image: '/portfolio/restaurant.jpg',
    url: '#',
  },
  {
    title: 'Studio Fitness',
    category: 'Deporte y Salud',
    description: 'Web corporativa con blog y sistema de clases',
    image: '/portfolio/fitness.jpg',
    url: '#',
  },
  {
    title: 'Abogados & Asociados',
    category: 'Servicios Profesionales',
    description: 'Web profesional con formularios de consulta',
    image: '/portfolio/law.jpg',
    url: '#',
  },
  {
    title: 'Bella Estética',
    category: 'Belleza',
    description: 'Web con galería y sistema de citas online',
    image: '/portfolio/beauty.jpg',
    url: '#',
  },
  {
    title: 'TechSolutions',
    category: 'Tecnología',
    description: 'Landing page corporativa con portfolio de servicios',
    image: '/portfolio/tech.jpg',
    url: '#',
  },
  {
    title: 'Pastelería Dulce',
    category: 'Alimentación',
    description: 'Catálogo de productos con formulario de pedidos',
    image: '/portfolio/bakery.jpg',
    url: '#',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Webs que Hemos Creado
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ejemplos reales de webs entregadas en 24 horas a nuestros clientes
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="text-sm">Imagen de ejemplo</span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-sm text-primary-600 font-semibold">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600 italic">
            *Las imágenes son ejemplos ilustrativos. Respetamos la privacidad de nuestros clientes.
          </p>
        </div>
      </div>
    </section>
  )
}
