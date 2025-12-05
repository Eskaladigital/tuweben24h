import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-accent-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          ¿Listo para Tu Nueva Web?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Únete a más de 100 negocios que ya han lanzado su presencia online con nosotros.
          Empieza hoy y tendrás tu web mañana.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/solicitar"
            className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Solicitar Mi Web Ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center bg-transparent text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold text-lg border-2 border-white"
          >
            Ver Precios
          </a>
        </div>
        <p className="text-white/80 mt-6 text-sm">
          Sin permanencia • Sin letra pequeña • Satisfacción garantizada
        </p>
      </div>
    </section>
  )
}
