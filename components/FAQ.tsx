'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: '¿Realmente podéis entregar una web en 24 horas?',
    answer: 'Sí, es nuestra garantía. Tenemos un sistema optimizado y un equipo dedicado que trabaja para cumplir este plazo. Una vez recibimos toda tu información y el pago, empezamos inmediatamente.',
  },
  {
    question: '¿Qué pasa si no me gusta el resultado?',
    answer: 'Cada plan incluye revisiones. Trabajaremos contigo hasta que estés satisfecho con el resultado. Queremos que tu web sea exactamente como la imaginas.',
  },
  {
    question: '¿Incluye el hosting y el dominio?',
    answer: 'El hosting está incluido durante el primer año. El dominio no está incluido, pero te ayudamos a comprarlo y configurarlo (coste aproximado: 10-15€/año).',
  },
  {
    question: '¿Podré modificar la web yo mismo después?',
    answer: 'Sí, te proporcionamos un panel sencillo donde podrás editar textos e imágenes. También te damos una sesión de formación para que sepas cómo hacerlo.',
  },
  {
    question: '¿Qué información necesitáis de mí?',
    answer: 'Necesitamos: textos para la web, imágenes/logo, colores de tu marca, ejemplos de webs que te gusten, y información de contacto. Cuanto más completo sea, mejor será el resultado.',
  },
  {
    question: '¿Qué tecnología utilizáis?',
    answer: 'Utilizamos Next.js y React, las tecnologías más modernas del mercado. Esto garantiza webs rápidas, seguras y fáciles de mantener.',
  },
  {
    question: '¿La web será responsive (adaptada a móviles)?',
    answer: 'Por supuesto. Todas nuestras webs están optimizadas para verse perfectamente en móviles, tablets y ordenadores. El diseño mobile-first es nuestra prioridad.',
  },
  {
    question: '¿Incluye optimización SEO?',
    answer: 'Sí, configuramos los elementos básicos de SEO: meta tags, sitemap, estructura correcta, velocidad optimizada. Para SEO avanzado, podemos ofrecer servicios adicionales.',
  },
  {
    question: '¿Qué pasa después del primer año de hosting?',
    answer: 'Puedes renovar con nosotros desde 10€/mes o transferir tu web a otro hosting. Siempre tendrás el control total de tu web.',
  },
  {
    question: '¿Ofrecéis servicios de mantenimiento?',
    answer: 'Sí, ofrecemos planes de mantenimiento desde 30€/mes que incluyen actualizaciones, backup, soporte técnico y modificaciones menores.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas saber sobre nuestro servicio
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 animate-slide-down">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ¿Tienes más preguntas?
          </p>
          <a
            href="mailto:info@tuweben24h.com"
            className="text-primary-600 hover:text-primary-700 font-semibold text-lg hover:underline"
          >
            Contáctanos directamente
          </a>
        </div>
      </div>
    </section>
  )
}
