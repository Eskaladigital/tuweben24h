import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import BlogPostClient from './BlogPostClient'

// Cliente de Supabase para el servidor
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type Props = {
  params: Promise<{ slug: string }>
}

// Generar metadatos dinámicos para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('titulo, extracto, imagen_destacada, autor_nombre, fecha_publicacion, categoria, etiquetas, seo_titulo, seo_descripcion')
      .eq('slug', slug)
      .eq('publicado', true)
      .single()

    if (error || !post) {
      return {
        title: 'Post no encontrado',
        description: 'El artículo que buscas no existe o ha sido eliminado.',
      }
    }

    const title = post.seo_titulo || post.titulo
    const description = post.seo_descripcion || post.extracto || `Lee "${post.titulo}" en el blog de TuWebEn24h`

    return {
      title,
      description,
      authors: post.autor_nombre ? [{ name: post.autor_nombre }] : undefined,
      keywords: post.etiquetas || undefined,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.fecha_publicacion || undefined,
        authors: post.autor_nombre ? [post.autor_nombre] : undefined,
        section: post.categoria || undefined,
        tags: post.etiquetas || undefined,
        images: post.imagen_destacada
          ? [
              {
                url: post.imagen_destacada,
                width: 1200,
                height: 630,
                alt: post.titulo,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: post.imagen_destacada ? [post.imagen_destacada] : undefined,
      },
      alternates: {
        canonical: `https://tuweben24h.com/blog/${slug}`,
      },
    }
  } catch (error) {
    console.error('Error generando metadata:', error)
    return {
      title: 'Blog | TuWebEn24h',
      description: 'Lee los últimos artículos sobre diseño web, marketing digital y negocios online.',
    }
  }
}

// Generar JSON-LD para artículos
async function getArticleJsonLd(slug: string) {
  try {
    const { data: post } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('publicado', true)
      .single()

    if (!post) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.titulo,
      description: post.extracto || '',
      image: post.imagen_destacada || 'https://tuweben24h.com/og-image.jpg',
      author: {
        '@type': 'Person',
        name: post.autor_nombre || 'TuWebEn24h',
      },
      publisher: {
        '@type': 'Organization',
        name: 'TuWebEn24h',
        logo: {
          '@type': 'ImageObject',
          url: 'https://tuweben24h.com/logo.png',
        },
      },
      datePublished: post.fecha_publicacion || post.created_at,
      dateModified: post.updated_at || post.fecha_publicacion || post.created_at,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://tuweben24h.com/blog/${slug}`,
      },
      articleSection: post.categoria || 'Blog',
      keywords: post.etiquetas?.join(', ') || '',
    }
  } catch {
    return null
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const articleJsonLd = await getArticleJsonLd(slug)

  return (
    <>
      {/* Schema.org JSON-LD para el artículo */}
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      
      <BlogPostClient slug={slug} />
    </>
  )
}
