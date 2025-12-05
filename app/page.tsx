import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

// Schema.org JSON-LD para SEO
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TuWebEn24h',
  url: 'https://tuweben24h.com',
  description: 'Creamos tu página web profesional en solo 24 horas',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://tuweben24h.com/blog?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TuWebEn24h',
  description: 'Servicio de creación de páginas web profesionales en 24 horas. Diseño moderno, responsive y optimizado para conversión.',
  url: 'https://tuweben24h.com',
  logo: 'https://tuweben24h.com/logo.png',
  image: 'https://tuweben24h.com/og-image.jpg',
  priceRange: '€€',
  areaServed: {
    '@type': 'Country',
    name: 'España'
  },
  serviceType: [
    'Diseño Web',
    'Desarrollo Web',
    'Landing Pages',
    'Páginas Web para Negocios',
    'Tiendas Online'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Planes de Diseño Web',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Plan Básico - Landing Page',
          description: 'Landing page profesional con diseño responsive'
        },
        price: '299',
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Plan Profesional - Web Completa',
          description: 'Web de hasta 5 páginas con formularios y SEO básico'
        },
        price: '499',
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Plan Premium - E-commerce',
          description: 'Tienda online completa con pasarela de pago'
        },
        price: '899',
        priceCurrency: 'EUR'
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  },
  sameAs: [
    'https://www.facebook.com/tuweben24h',
    'https://www.instagram.com/tuweben24h',
    'https://twitter.com/tuweben24h',
    'https://www.linkedin.com/company/tuweben24h'
  ]
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Realmente puedo tener mi web en 24 horas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, nuestro equipo está especializado en entregar webs profesionales en tiempo récord. Una vez recibimos tu contenido y requisitos, comenzamos a trabajar inmediatamente.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Qué necesito para empezar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solo necesitas rellenar nuestro formulario con la información básica de tu negocio, los textos que quieras incluir y las imágenes. Si no tienes contenido, también podemos ayudarte.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Incluye dominio y hosting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ofrecemos asesoramiento gratuito sobre dominios y hosting. Podemos configurar tu web en tu propio hosting o recomendarte las mejores opciones según tus necesidades.'
      }
    },
    {
      '@type': 'Question',
      name: '¿La web será responsive (adaptable a móviles)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Por supuesto. Todas nuestras webs están diseñadas con enfoque mobile-first, garantizando una experiencia perfecta en cualquier dispositivo.'
      }
    }
  ]
}

export default function Home() {
  return (
    <>
      {/* Schema.org JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
