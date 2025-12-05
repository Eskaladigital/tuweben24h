import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Una Página',
    price: '60',
    description: 'Ideal para presencia básica',
    features: [
      'Landing page de 1 página',
      'Diseño responsive',
      'Formulario de contacto',
      'Optimización SEO básica',
      'Certificado SSL',
      'Entrega en 24-48h',
      '1 revisión incluida',
    ],
    cta: 'Solicitar',
    popular: false,
  },
  {
    name: 'Multi Página',
    price: '150',
    description: 'Lo más solicitado',
    features: [
      'Web de hasta 5-7 páginas',
      'Diseño personalizado',
      'Formulario de contacto',
      'Optimización SEO completa',
      'Certificado SSL',
      'Google Analytics',
      '2 revisiones incluidas',
      'Entrega en 3-5 días',
    ],
    cta: 'Solicitar',
    popular: true,
  },
  {
    name: 'CMS Básico',
    price: '250',
    description: 'Gestiona tu contenido',
    features: [
      'Web con CMS sencillo',
      'Un idioma',
      'Panel de administración',
      'Diseño personalizado',
      'SEO + Google Analytics',
      'Certificado SSL',
      'Formación incluida',
      '3 revisiones incluidas',
      'Entrega en 5-7 días',
    ],
    cta: 'Solicitar',
    popular: false,
  },
  {
    name: 'CMS Avanzado',
    price: '350',
    description: 'Multiidioma profesional',
    features: [
      'Web con CMS complejo',
      'Dos idiomas (ES + otro)',
      'Panel admin avanzado',
      'Diseño premium',
      'SEO multiidioma',
      'Google Analytics + Tag Manager',
      'Certificado SSL',
      'Formación completa',
      'Revisiones ilimitadas',
      'Entrega en 7-10 días',
    ],
    cta: 'Solicitar',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Precios Transparentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tu negocio. Sin costes ocultos.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-6 ${
                plan.popular
                  ? 'border-primary-600 shadow-2xl md:scale-105 bg-gradient-to-b from-primary-50 to-white'
                  : 'border-gray-200 hover:border-primary-300 hover:shadow-lg'
              } transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}€
                  </span>
                  <span className="text-gray-600 ml-2">pago único</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/solicitar"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">
            ¿Necesitas algo diferente?{' '}
            <Link href="/solicitar" className="text-primary-600 hover:underline font-semibold">
              Solicita un presupuesto personalizado
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            * Precios base. Los servicios adicionales se calculan por separado.
          </p>
        </div>
      </div>
    </section>
  )
}
