'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initGoogleAnalytics, trackPageView } from '@/lib/analytics'

export function GoogleAnalytics() {
  const pathname = usePathname()
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    if (measurementId) {
      initGoogleAnalytics(measurementId)
    }
  }, [measurementId])

  useEffect(() => {
    if (measurementId && pathname) {
      trackPageView(pathname)
    }
  }, [pathname, measurementId])

  if (!measurementId) {
    return null
  }

  return null // El script se carga en initGoogleAnalytics
}



