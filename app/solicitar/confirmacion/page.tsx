'use client'

import Link from 'next/link'
import { CheckCircle, Home, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ConfirmacionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 to-white pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¡Solicitud Enviada Correctamente!
            </h1>

            {/* Message */}
            <div className="space-y-4 text-gray-600 mb-8">
              <p className="text-lg">
                Gracias por confiar en <span className="font-semibold text-primary-600">TuWebEn24h</span>
              </p>
              
              <div className="bg-primary-50 rounded-lg p-6 my-6">
                <div className="flex items-start gap-3 text-left">
                  <Mail className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">
                      ¿Qué ocurre ahora?
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        Recibirás un email de confirmación con los detalles de tu solicitud
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        Nuestro equipo revisará tu solicitud en las próximas 24 horas
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        Te contactaremos por email o teléfono para confirmar los detalles
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        Te enviaremos un presupuesto detallado si hay servicios adicionales
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Si no recibes nuestro email en las próximas horas, revisa tu carpeta de spam
                o contacta con nosotros directamente.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Volver al Inicio
              </Link>
              
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
              >
                Ver Blog
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                ¿Tienes alguna pregunta urgente?
              </p>
              <p className="text-sm text-gray-900 font-medium mt-1">
                Contacta con nosotros: <a href="mailto:narciso.pardo@outlook.com" className="text-primary-600 hover:underline">narciso.pardo@outlook.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
