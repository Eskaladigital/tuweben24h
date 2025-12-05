import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight, Heart, Calendar, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Páginas Web para Clínicas y Centros Médicos | TuWebEn24h',
  description: 'Diseño web para clínicas, centros médicos y consultas. Citas online, información de servicios. Web profesional desde 299€.',
  keywords: ['pagina web clinica', 'diseño web centro medico', 'web para medicos', 'citas online clinica', 'web consultorio'],
  alternates: {
    canonical: 'https://tuweben24h.com/servicios/web-para-clinicas',
  },
}

const caracteristicas = [
  {
    icon: Calendar,
    titulo: 'Citas online',
    descripcion: 'Sistema de reserva de citas disponible 24/7 para tus pacientes.'
  },
  {
    icon: Heart,
    titulo: 'Servicios médicos',
    descripcion: 'Muestra claramente tus especialidades y tratamientos disponibles.'
  },
  {
    icon: Clock,
    titulo: 'Horarios visibles',
    descripcion: 'Información clara de horarios de atención y urgencias.'
  },
  {
    icon: MapPin,
    titulo: 'Fácil ubicación',
    descripcion: 'Localización con Google Maps y cómo llegar desde cualquier punto.'
  },
]

const problemasClinicas = [
  'Pacientes que no encuentran información de tus servicios',
  'Llamadas constantes para pedir citas que saturam el personal',
  'Competencia con web moderna que capta más pacientes',
  'No transmites la profesionalidad de tu centro médico',
]

const seccionesIncluidas = [
  'Página principal con servicios destacados',
  'Especialidades y tratamientos',
  'Equipo médico y profesionales',
  'Formulario de solicitud de cita',
  'Preguntas frecuentes médicas',
  'Horarios y ubicación',
  'Seguros médicos aceptados',
  'Cumplimiento LOPD sanitaria',
]

export default function WebClinicasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Diseño Web para Clínicas',
            description: 'Páginas web profesionales para clínicas, centros médicos y consultas',
            provider: {
              '@type': 'Organization',
              name: 'TuWebEn24h',
            },
            serviceType: 'Diseño Web Sanitario',
            areaServed: 'ES',
          }),
        }}
      />

      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold">Especializado en Sector Sanitario</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Página Web para tu Clínica o Centro Médico
              </h1>
              <p className="text-xl md:text-2xl text-teal-100 mb-8">
                Atrae más pacientes con una web profesional. Gestiona citas online, 
                muestra tus servicios y transmite confianza médica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/solicitar"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 rounded-lg font-bold hover:bg-teal-50 transition-all"
                >
                  Solicitar mi web ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problemas específicos */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              ¿Tu clínica tiene estos problemas?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {problemasClinicas.map((problema, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                  <p className="text-lg text-gray-700">❌ {problema}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-8 rounded-xl max-w-4xl mx-auto">
              <p className="text-xl text-gray-900">
                <strong className="text-green-600">✅ Solución:</strong> Una web que facilita reservas, 
                informa sobre tus servicios y genera confianza en nuevos pacientes
              </p>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Web diseñada para el sector sanitario
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Conocemos las necesidades del sector médico. Tu web cumplirá toda la normativa 
              sanitaria y de protección de datos.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caracteristicas.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-full mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.titulo}
                    </h3>
                    <p className="text-gray-600">
                      {item.descripcion}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Incluye */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Todo lo que incluye tu web médica
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {seccionesIncluidas.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-teal-50 rounded-xl p-6 mb-8">
                <h4 className="font-bold text-gray-900 mb-2">🏥 Cumplimiento sanitario</h4>
                <p className="text-gray-600">
                  Tu web cumplirá con LOPD sanitaria, protección de datos de pacientes 
                  y toda la normativa del sector salud.
                </p>
              </div>
              <div className="text-center">
                <Link
                  href="/solicitar"
                  className="inline-flex items-center px-8 py-4 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-all"
                >
                  Quiero mi web para clínica
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <p className="text-gray-600 mt-4">Desde 299€ · Entrega en 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Moderniza la presencia digital de tu clínica
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              En 24 horas tendrás una web que facilita la gestión de citas y atrae más pacientes
            </p>
            <Link
              href="/solicitar"
              className="inline-flex items-center px-8 py-4 bg-white text-teal-600 rounded-lg font-bold hover:bg-teal-50 transition-all text-lg"
            >
              Solicitar web médica ahora
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <p className="text-teal-200 mt-6 text-sm">
              🏥 Especializado en sector salud · ⚡ 24 horas · ✅ Cumplimiento normativo
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}


