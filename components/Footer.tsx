import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-xl text-white">
                TuWebEn<span className="text-primary-400">24h</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Creamos páginas web profesionales en 24 horas. Rápido, eficiente y sin complicaciones.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#features" className="hover:text-primary-400 transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-primary-400 transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <Link href="/proyectos" className="hover:text-primary-400 transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/solicitar" className="hover:text-primary-400 transition-colors">
                  Solicitar Web
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios/paginas-web-para-negocios" className="hover:text-primary-400 transition-colors">
                  Web para Negocios
                </Link>
              </li>
              <li>
                <Link href="/servicios/web-para-restaurantes" className="hover:text-primary-400 transition-colors">
                  Web para Restaurantes
                </Link>
              </li>
              <li>
                <Link href="/servicios/web-para-abogados" className="hover:text-primary-400 transition-colors">
                  Web para Abogados
                </Link>
              </li>
              <li>
                <Link href="/servicios/web-para-clinicas" className="hover:text-primary-400 transition-colors">
                  Web para Clínicas
                </Link>
              </li>
              <li>
                <Link href="/diseno-web-madrid" className="hover:text-primary-400 transition-colors">
                  Diseño Web Madrid
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@tuweben24h.com" className="hover:text-primary-400 transition-colors">
                  info@tuweben24h.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <a href="tel:+34900000000" className="hover:text-primary-400 transition-colors">
                  +34 900 000 000
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>España</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} TuWebEn24h. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0">
            <Link href="/privacidad" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Mapa del Sitio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
