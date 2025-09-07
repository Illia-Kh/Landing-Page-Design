'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { trackPageView } from '@/lib/analytics'

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    trackPageView(window.location.href, document.title)
  }, [pathname])

  return null
}