import { analyticsConfig } from '@/lib/utils/env'

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: any
    ) => void
    dataLayer: any[]
  }
}

/**
 * Track a custom event with Google Analytics
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, any>
) {
  if (!analyticsConfig.enabled || !analyticsConfig.gaId || typeof window === 'undefined') {
    return
  }

  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParameters,
    })
  } catch (error) {
    console.warn('Analytics tracking error:', error)
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string) {
  if (!analyticsConfig.enabled || !analyticsConfig.gaId || typeof window === 'undefined') {
    return
  }

  try {
    window.gtag('config', analyticsConfig.gaId, {
      page_location: url,
      page_title: title || document.title,
    })
  } catch (error) {
    console.warn('Analytics page view tracking error:', error)
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean, details?: Record<string, any>) {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'engagement',
    formName,
    success ? 1 : 0,
    {
      form_name: formName,
      success,
      ...details,
    }
  )
}

/**
 * Track button/link clicks
 */
export function trackClick(elementName: string, destination?: string) {
  trackEvent('click', 'engagement', elementName, undefined, {
    element_name: elementName,
    destination,
  })
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType?: string) {
  trackEvent('download', 'engagement', fileName, undefined, {
    file_name: fileName,
    file_type: fileType,
  })
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number) {
  trackEvent('scroll', 'engagement', `${percentage}%`, percentage)
}