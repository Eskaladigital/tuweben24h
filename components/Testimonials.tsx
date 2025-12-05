import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'María García',
    business: 'Restaurante La Esquina',
    role: 'Propietaria',
    comment: 'No podía creerlo cuando vi mi web terminada en menos de 24 horas. El resultado superó mis expectativas. Ahora recibo reservas online todos los días.',
    rating: 5,
    avatar: 'MG',
  },
  {
    name: 'Carlos Rodríguez',
    business: 'Abogados CR',
    role: 'Socio Director',
    comment: 'Necesitaba una web profesional urgentemente para un evento. El equipo de TuWebEn24h cumplió perfectamente. Diseño elegante y funcional.',
    rating: 5,
    avatar: 'CR',
  },
  {
    name: 'Laura Martínez',
    business: 'Estudio de Yoga',
    role: 'Instructora',
    comment: 'Increíble servicio. La comunicación fue excelente y el resultado final es justo lo que imaginaba. Mis alumnas pueden ver los horarios y reservar clases fácilmente.',
    rating: 5,
    avatar: 'LM',
  },
  {
    name: 'Javier López',
    business: 'Fontanería Express',
    role: 'Autónomo',
    comment: 'Como autónomo necesitaba una web pero no tenía tiempo ni conocimientos. En 24h tenía mi web funcionando y ya he conseguido clientes nuevos gracias a ella.',
    rating: 5,
    avatar: 'JL',
  },
  {
    name: 'Ana Sánchez',
    business: 'Beauty Studio',
    role: 'Esteticista',
    comment: 'El proceso fue súper fácil. Solo tuve que dar mis ideas y ellos se encargaron de todo. Mi web es preciosa y muy fácil de usar para mis clientas.',
    rating: 5,
    avatar: 'AS',
  },
  {
    name: 'Pedro Fernández',
    business: 'Asesoría PF',
    role: 'Asesor Fiscal',
    comment: 'Excelente relación calidad-precio. Una web profesional que transmite confianza a mis clientes potenciales. El soporte post-entrega también ha sido fantástico.',
    rating: 5,
    avatar: 'PF',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Más de 100 negocios confían en nosotros para su presencia online
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} - {testimonial.business}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 fill-green-700" />
            <span className="font-semibold">
              4.9/5 de valoración media - 120+ clientes satisfechos
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
