// Language types
export type Language = 'cs' | 'en' | 'de' | 'ua'

// Hero carousel types
export interface HeroSlide {
  image: string
  alt: string
  title: string
  subtitle?: string
  cta?: {
    label: string
    href: string
  }
}

// Page types - representing the old SPA routes
export type Page = 'home' | 'about' | 'services' | 'contact' | 'logo-showcase'

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Analytics consent types
export interface ConsentState {
  analytics: boolean
  marketing: boolean
  functional: boolean
  timestamp: number
}

// Common component props
export interface PageProps {
  params: Promise<{ lang: Language }>
}

export interface LocalizedPageProps {
  params: Promise<{ lang: Language }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}


// SEO metadata types
export interface SeoData {
  title: string
  description: string
  keywords: string
  image?: string
  url?: string
}

// Team member type
export interface TeamMember {
  name: string
  role: string
  experience: string
  image?: string
}

// Service type
export interface Service {
  title: string
  description: string
  features: string[]
  icon?: string
}

// Challenge type
export interface Challenge {
  title: string
  description: string
  icon?: string
}

// Logo showcase item
export interface LogoItem {
  id: string
  title: string
  category: string
  image: string
  description?: string
}

// Navigation item
export interface NavItem {
  title: string
  href: string
  page: Page
}

// Animation variants for Framer Motion
export interface AnimationVariants {
  initial: object
  animate: object
  exit?: object
  transition?: object
}

// Error boundary props
export interface ErrorInfo {
  componentStack: string
}

// Performance monitoring
export interface WebVital {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

// Environment configuration
export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test'
  NEXT_PUBLIC_SITE_URL: string
  NEXT_PUBLIC_GA_ID?: string
  NEXT_PUBLIC_GTM_ID?: string
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}


// Utility types
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

// Event tracking types
export interface TrackingEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, unknown>
}