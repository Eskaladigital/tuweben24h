'use client'

import Link from 'next/link'
import { Clock, Zap, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>Entrega garantizada en 24 horas</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
            Tu Web Profesional
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              en Solo 24 Horas
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-slide-up">
            Diseño moderno, responsive y optimizado. Sin esperas, sin complicaciones.
            Tu negocio online empieza ahora.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Link
              href="/solicitar"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Solicitar Mi Web Ahora
            </Link>
            <a
              href="#pricing"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-primary-600"
            >
              Ver Precios
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-8 h-8 text-primary-600" />
              <div className="text-left">
                <p className="font-bold text-gray-900">24 Horas</p>
                <p className="text-sm text-gray-600">Entrega garantizada</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <p className="font-bold text-gray-900">100% Responsive</p>
                <p className="text-sm text-gray-600">Mobile-first design</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Zap className="w-8 h-8 text-accent-600" />
              <div className="text-left">
                <p className="font-bold text-gray-900">Optimizada</p>
                <p className="text-sm text-gray-600">SEO y velocidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
