import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight, Brain, Calendar, Shield, Heart, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Páginas Web para Psicólogos y Terapeutas | TuWebEn24h',
  description: 'Diseño web para psicólogos. Reserva de citas, confidencialidad, especialidades. Desde 299€.',
  keywords: ['pagina web psicologo', 'diseño web terapeuta', 'web consulta psicologia'],
  alternates: { canonical: 'https://tuweben24h.com/servicios/web-para-psicologos' },
}

const caracteristicas = [
  { icon: Calendar, titulo: 'Citas online', descripcion: 'Sistema discreto y confidencial de reservas.' },
  { icon: Brain, titulo: 'Especialidades', descripcion: 'Muestra tus áreas de tratamiento claramente.' },
  { icon: Shield, titulo: 'Confidencialidad', descripcion: 'Imagen profesional que transmite confianza.' },
  { icon: Heart, titulo: 'Enfoque humano', descripcion: 'Diseño cálido y acogedor para pacientes.' },
]

const problemas = [
  'Pacientes potenciales que no te encuentran online',
  'Difícil explicar tu metodología sin una web',
  'No transmites profesionalidad sin presencia digital',
  'Pierdes consultas iniciales por falta de información',
]

const incluye = [
  'Página principal profesional',
  'Especialidades y enfoques terapéuticos',
  'Sistema de reserva de citas discreto',
  'Sobre el profesional - curriculum',
  'Preguntas frecuentes',
  'Contacto confidencial',
  'Blog/recursos opcionales',
  'Cumplimiento LOPD sanitaria',
]

export default function WebPsicologosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Brain className="w-4 h-4" />
                <span>Especializado en Psicólogos</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Web para Psicólogos y
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  Terapeutas
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Diseño profesional y cálido. Sistema de citas confidencial y optimizada para captar pacientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/solicitar" className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Solicitar Mi Web Ahora
                </Link>
                <Link href="#incluye" className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-primary-600">
                  Ver Qué Incluye
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <Shield className="w-8 h-8 text-indigo-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Confidencial</p>
                    <p className="text-sm text-gray-600">Reservas discretas</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Brain className="w-8 h-8 text-primary-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Profesional</p>
                    <p className="text-sm text-gray-600">Imagen seria</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Zap className="w-8 h-8 text-accent-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">24 Horas</p>
                    <p className="text-sm text-gray-600">Entrega garantizada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">¿Tu consulta tiene estos problemas?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {problemas.map((problema, i) => (
                <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-lg transition-all">
                  <p className="text-lg text-gray-700">❌ {problema}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-4xl mx-auto p-6 rounded-xl border-2 border-green-300 bg-green-50">
              <p className="text-xl text-gray-900 text-center">
                <strong className="text-green-700">✅ Solución:</strong> Una web profesional que genera confianza y facilita el primer contacto
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Todo lo que necesita tu consulta</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caracteristicas.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                      <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.titulo}</h3>
                    <p className="text-gray-600">{item.descripcion}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="incluye" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Qué incluye tu web para psicólogo</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {incluye.map((item, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/solicitar" className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Quiero mi web de psicología <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <p className="text-gray-600 mt-4">Desde 299€ · Entrega en 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-accent-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Atrae más pacientes con una web profesional</h2>
            <p className="text-xl text-primary-100 mb-8">Lista en 24 horas para empezar a recibir consultas</p>
            <Link href="/solicitar" className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl">
              Empezar ahora - Desde 299€ <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <p className="text-primary-100 mt-6 text-sm">🧠 Especializado en psicólogos · ⚡ 24h · 🔒 Confidencial</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}


