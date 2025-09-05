import { GA4Event, ConsentState } from '../types'

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

/**
 * Update consent state for Google Analytics
 */
export function updateConsent(consent: ConsentState): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied',
    })
  }
}

/**
 * Track GA4 event
 */
export function trackEvent(event: GA4Event): void {
  if (typeof window !== 'undefined' && window.gtag) {
    const { event_name, parameters } = event
    
    // Send event to GA4
    window.gtag('event', event_name, {
      event_category: event.category,
      event_label: event.label,
      custom_parameter_1: parameters?.city,
      custom_parameter_2: parameters?.form_type,
      custom_parameter_3: parameters?.contact_method,
      ...parameters
    })
    
    console.log('GA4 Event tracked:', event_name, parameters)
  }
}

/**
 * Track form submission
 */
export function trackLeadSubmit(formType: string = 'contact'): void {
  trackEvent({
    name: 'lead_submit',
    event_name: 'lead_submit',
    category: 'lead',
    action: 'submit',
    label: formType,
    timestamp: Date.now(),
    parameters: {
      form_type: formType
    }
  })
}

/**
 * Track phone call click
 */
export function trackCallClick(phoneNumber: string): void {
  trackEvent({
    name: 'call_click',
    event_name: 'call_click',
    category: 'contact',
    action: 'call',
    label: phoneNumber,
    timestamp: Date.now(),
    parameters: {
      contact_method: 'phone',
      phone_number: phoneNumber
    }
  })
}

/**
 * Track Telegram click
 */
export function trackTelegramClick(botName?: string): void {
  trackEvent({
    name: 'telegram_click',
    event_name: 'telegram_click',
    category: 'contact',
    action: 'telegram',
    label: botName || 'telegram_bot',
    timestamp: Date.now(),
    parameters: {
      contact_method: 'telegram',
      bot_name: botName
    }
  })
}

/**
 * Track city page view
 */
export function trackCityPageView(city: string): void {
  trackEvent({
    name: 'page_view_city',
    event_name: 'page_view_city',
    category: 'page_view',
    action: 'view',
    label: city,
    timestamp: Date.now(),
    parameters: {
      city: city,
      page_type: 'city_representative'
    }
  })
}

/**
 * Get current consent state from localStorage
 */
export function getConsentState(): ConsentState | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem('cookie_consent')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

/**
 * Save consent state to localStorage
 */
export function saveConsentState(consent: ConsentState): void {
  if (typeof window === 'undefined') return
  
  const consentWithTimestamp = {
    ...consent,
    timestamp: Date.now()
  }
  
  localStorage.setItem('cookie_consent', JSON.stringify(consentWithTimestamp))
  updateConsent(consent)
}

/**
 * Check if consent has been given for analytics
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsentState()
  return consent?.analytics === true
}

/**
 * Check if consent has been given for marketing
 */
export function hasMarketingConsent(): boolean {
  const consent = getConsentState()
  return consent?.marketing === true
}