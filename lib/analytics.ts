// Sistema de Analytics
// Google Analytics 4

export function initGoogleAnalytics(measurementId: string) {
  if (typeof window === 'undefined') return

  // Cargar script de Google Analytics
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Inicializar gtag
  const win = window as Window & { dataLayer: unknown[] }
  win.dataLayer = win.dataLayer || []
  function gtag(...args: any[]) {
    win.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', measurementId, {
    page_path: window.location.pathname
  })

  // Guardar función globalmente
  ;(window as any).gtag = gtag
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === 'undefined' || !(window as any).gtag) return

  ;(window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return

  ;(window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: path
  })
}

// Eventos comunes
export const Analytics = {
  // Formulario
  formStart: () => trackEvent('form_start', 'form', 'solicitud'),
  formComplete: () => trackEvent('form_complete', 'form', 'solicitud'),
  formError: (error: string) => trackEvent('form_error', 'form', error),

  // Navegación
  clickCTA: (location: string) => trackEvent('click_cta', 'navigation', location),
  clickService: (service: string) => trackEvent('click_service', 'navigation', service),

  // Blog
  viewPost: (slug: string) => trackEvent('view_post', 'blog', slug),
  sharePost: (slug: string, platform: string) => trackEvent('share_post', 'blog', `${slug}_${platform}`),

  // Cliente
  loginCliente: () => trackEvent('login', 'cliente', 'success'),
  downloadFile: (fileName: string) => trackEvent('download_file', 'cliente', fileName),

  // Admin
  loginAdmin: () => trackEvent('login', 'admin', 'success'),
  changeEstado: (estado: string) => trackEvent('change_estado', 'admin', estado)
}




