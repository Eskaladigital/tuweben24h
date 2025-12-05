import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { ciudades } from '@/lib/ciudades-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tuweben24h.com'
  
  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/solicitar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Páginas de servicios específicos
  const serviciosPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/servicios/paginas-web-para-negocios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios/web-para-restaurantes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicios/web-para-abogados`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicios/web-para-clinicas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]

  // Páginas de servicios adicionales
  const serviciosAdicionales: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/servicios/web-para-coaches`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicios/web-para-inmobiliarias`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicios/web-para-talleres`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicios/web-para-dentistas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicios/web-para-peluquerias`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicios/web-para-psicologos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]

  // Landing pages de ciudades - Dinámico desde ciudades-data.ts
  const ciudadesPages: MetadataRoute.Sitemap = ciudades.map((ciudad, index) => ({
    url: `${baseUrl}/diseno-web-${ciudad.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    // Primeras 10 ciudades tienen prioridad mayor
    priority: index < 10 ? 0.85 : 0.75,
  }))
  
  // Obtener posts del blog publicados
  let blogPages: MetadataRoute.Sitemap = []
  
  // Solo intentar obtener posts si existen las variables de entorno de Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, fecha_publicacion')
        .eq('publicado', true)
        .order('fecha_publicacion', { ascending: false })
      
      if (posts && posts.length > 0) {
        blogPages = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.fecha_publicacion || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      }
    } catch (error) {
      console.error('Error obteniendo posts para sitemap:', error)
    }
  } else {
    console.log('Supabase no configurado, generando sitemap sin posts del blog')
  }
  
  return [
    ...staticPages,
    ...serviciosPages,
    ...serviciosAdicionales,
    ...ciudadesPages,
    ...blogPages
  ]
}

