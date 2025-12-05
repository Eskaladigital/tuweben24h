import { Smartphone, Zap, Palette, Shield, Search, Headphones } from 'lucide-react'

const features = [
  {
    icon: Smartphone,
    title: 'Diseño Responsive',
    description: 'Tu web se verá perfecta en todos los dispositivos: móviles, tablets y ordenadores.',
  },
  {
    icon: Zap,
    title: 'Entrega en 24h',
    description: 'Trabajamos contrarreloj para que tu web esté lista en tiempo récord.',
  },
  {
    icon: Palette,
    title: 'Diseño Moderno',
    description: 'Diseños actuales y profesionales que causan una gran primera impresión.',
  },
  {
    icon: Shield,
    title: 'Seguridad SSL',
    description: 'Certificado SSL incluido para proteger tu web y generar confianza.',
  },
  {
    icon: Search,
    title: 'SEO Optimizado',
    description: 'Configuración básica de SEO para que Google encuentre tu negocio.',
  },
  {
    icon: Headphones,
    title: 'Soporte Incluido',
    description: 'Te ayudamos con cualquier duda durante el primer mes.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Todo lo que Necesitas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Una web profesional con todas las características esenciales para tu negocio
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
