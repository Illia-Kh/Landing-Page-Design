import { EnvConfig } from '@/types'

/**
 * Environment variable validation and configuration
 * This ensures all required environment variables are present and valid
 */

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

function getOptionalEnvVar(key: string): string | undefined {
  return process.env[key]
}

// Validate and export environment configuration
export const env: EnvConfig = {
  NODE_ENV: getEnvVar('NODE_ENV', 'development') as EnvConfig['NODE_ENV'],
  NEXT_PUBLIC_SITE_URL: getEnvVar('NEXT_PUBLIC_SITE_URL', 'https://ikhsystems.com'),
  NEXT_PUBLIC_GA_ID: getOptionalEnvVar('NEXT_PUBLIC_GA_ID'),
  NEXT_PUBLIC_GTM_ID: getOptionalEnvVar('NEXT_PUBLIC_GTM_ID'),
}

// Validate NODE_ENV
if (!['development', 'production', 'test'].includes(env.NODE_ENV)) {
  throw new Error(`Invalid NODE_ENV: ${env.NODE_ENV}. Must be development, production, or test.`)
}

// Validate SITE_URL format
try {
  new URL(env.NEXT_PUBLIC_SITE_URL)
} catch {
  throw new Error(`Invalid NEXT_PUBLIC_SITE_URL: ${env.NEXT_PUBLIC_SITE_URL}. Must be a valid URL.`)
}

// Export utility functions
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'

// Analytics configuration
export const hasAnalytics = Boolean(env.NEXT_PUBLIC_GA_ID || env.NEXT_PUBLIC_GTM_ID)
export const analyticsConfig = {
  gaId: env.NEXT_PUBLIC_GA_ID,
  gtmId: env.NEXT_PUBLIC_GTM_ID,
  enabled: hasAnalytics && isProduction,
}

// Site configuration
export const siteConfig = {
  name: 'IKH-TechSystems',
  description: 'Innovative IT Solutions for Business',
  url: env.NEXT_PUBLIC_SITE_URL,
  author: 'Illia Khromov',
  social: {
    github: 'https://github.com/Illia-Kh',
    linkedin: 'https://linkedin.com/in/illia-khromov',
  },
  contact: {
    email: 'contact@ikhsystems.com',
    phone: '+420 123 456 789',
  },
}

// Feature flags (can be extended with env vars)
export const features = {
  analytics: hasAnalytics,
  darkMode: true,
  i18n: true,
  contactForm: true,
  logoShowcase: true,
}