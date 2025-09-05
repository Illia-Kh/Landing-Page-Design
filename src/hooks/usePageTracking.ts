import { useEffect } from 'react'
import { trackCityPageView } from '../lib/analytics'
import { Page } from '../types'

/**
 * Hook to track page views, especially for city pages
 */
export function usePageTracking(currentPage: Page, language: string) {
  useEffect(() => {
    // Check if this is a city page view
    // This is a simplified example - in a real app you might have 
    // specific city pages or detect cities from URL parameters
    
    // For demonstration, we'll track page views for different cities
    // based on language as a proxy for location
    const cityMapping: Record<string, string> = {
      'cs': 'Liberec', // Czech Republic
      'de': 'Berlin',  // Germany  
      'ru': 'Prague',  // Czech Republic (Russian speakers)
      'en': 'International' // English (international)
    }
    
    // Track city page view if we can determine a city
    const city = cityMapping[language]
    if (city && currentPage === 'contact') {
      // Track contact page as a city representative page
      trackCityPageView(city)
    }
  }, [currentPage, language])
}

/**
 * Hook specifically for tracking city representative pages
 */
export function useCityPageTracking(city: string) {
  useEffect(() => {
    if (city) {
      trackCityPageView(city)
    }
  }, [city])
}