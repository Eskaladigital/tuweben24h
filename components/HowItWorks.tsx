import { FileText, Palette, Code, Rocket } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'Rellena el Formulario',
    description: 'Cuéntanos sobre tu negocio, tus necesidades y preferencias de diseño.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Diseñamos Tu Web',
    description: 'Nuestro equipo crea un diseño profesional y moderno adaptado a tu marca.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Desarrollo y Optimización',
    description: 'Desarrollamos tu web con las mejores tecnologías y optimizamos su rendimiento.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Lanzamiento',
    description: '¡Tu web está lista! La publicamos y te enseñamos a gestionarla.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cómo Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un proceso simple y transparente, de la idea al lanzamiento en solo 24 horas
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connecting Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent" />
                )}

                <div className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/solicitar"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Empezar Ahora
          </a>
        </div>
      </div>
    </section>
  )
}
