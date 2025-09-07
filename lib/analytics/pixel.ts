declare global {
  interface Window {
    fbq: (
      command: 'track' | 'trackCustom' | 'init',
      eventName: string,
      parameters?: Record<string, any>
    ) => void
  }
}

/**
 * Track Facebook Pixel events
 */
export function trackPixelEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window === 'undefined' || !window.fbq) {
    return
  }

  try {
    window.fbq('track', eventName, parameters)
  } catch (error) {
    console.warn('Facebook Pixel tracking error:', error)
  }
}

/**
 * Track custom Facebook Pixel events
 */
export function trackCustomPixelEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window === 'undefined' || !window.fbq) {
    return
  }

  try {
    window.fbq('trackCustom', eventName, parameters)
  } catch (error) {
    console.warn('Facebook Pixel custom tracking error:', error)
  }
}

/**
 * Track page view with Facebook Pixel
 */
export function trackPixelPageView() {
  trackPixelEvent('PageView')
}

/**
 * Track form submission with Facebook Pixel
 */
export function trackPixelFormSubmission(formName: string) {
  trackPixelEvent('SubmitApplication', {
    content_name: formName,
  })
}

/**
 * Track contact form submission
 */
export function trackPixelContact() {
  trackPixelEvent('Contact')
}