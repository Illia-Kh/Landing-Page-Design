'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { analyticsConfig } from '@/lib/env'

// Declare gtag as a global function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!analyticsConfig.enabled) return

    // Track page view with Google Analytics
    if (analyticsConfig.gaId && typeof window.gtag === 'function') {
      window.gtag('config', analyticsConfig.gaId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      })
    }

    // Track page view with Meta Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
  }, [pathname])

  return null
}

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!analyticsConfig.enabled) return

  // Google Analytics event tracking
  if (analyticsConfig.gaId && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  // Meta Pixel event tracking
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'CustomEvent', {
      action,
      category,
      label,
      value,
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'engagement',
    formName
  )
}