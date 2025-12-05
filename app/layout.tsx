import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://tuweben24h.com'),
  title: {
    default: 'TuWebEn24h - Tu Web Profesional en 24 Horas',
    template: '%s | TuWebEn24h'
  },
  description: 'Creamos tu página web profesional en solo 24 horas. Diseño moderno, responsive y optimizado para tu negocio. Desde 299€. ¡Empieza hoy mismo!',
  keywords: [
    'web rápida',
    'página web 24 horas',
    'diseño web',
    'desarrollo web rápido',
    'landing page',
    'crear web',
    'web para negocios',
    'diseño web profesional',
    'web económica',
    'web express',
    'página web barata',
    'web en un día',
    'diseño web España'
  ],
  authors: [{ name: 'TuWebEn24h', url: 'https://tuweben24h.com' }],
  creator: 'TuWebEn24h',
  publisher: 'TuWebEn24h',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tuweben24h.com',
    siteName: 'TuWebEn24h',
    title: 'TuWebEn24h - Tu Web Profesional en 24 Horas',
    description: 'Creamos tu página web profesional en solo 24 horas. Diseño moderno, responsive y optimizado. Desde 299€.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TuWebEn24h - Webs profesionales en 24 horas',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TuWebEn24h - Tu Web Profesional en 24 Horas',
    description: 'Creamos tu página web profesional en solo 24 horas. Desde 299€.',
    images: ['/og-image.jpg'],
    creator: '@tuweben24h',
  },
  alternates: {
    canonical: 'https://tuweben24h.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  category: 'technology',
  classification: 'Business',
  // Descomentar cuando tengas el código de verificación:
  // verification: {
  //   google: 'TU_CODIGO_GOOGLE_SEARCH_CONSOLE',
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
