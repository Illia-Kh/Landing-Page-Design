import { siteConfig } from '@/lib/utils/env'
import { Language } from '@/types'

interface ServiceData {
  name: string
  description: string
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(lang: Language) {
  const baseUrl = siteConfig.url
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: `${baseUrl}/${lang}`,
    logo: `${baseUrl}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      availableLanguage: ['English', 'Czech', 'German'],
      areaServed: 'CZ',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CZ',
      addressLocality: 'Prague',
    },
    foundingDate: '2023',
    industry: 'Information Technology',
    numberOfEmployees: '1-10',
  }
}

/**
 * Generate WebSite structured data
 */
export function generateWebSiteSchema(lang: Language) {
  const baseUrl = siteConfig.url
  const langCode = lang === 'en' ? 'en-US' : lang === 'cs' ? 'cs-CZ' : 'de-DE'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: `${baseUrl}/${lang}`,
    description: siteConfig.description,
    inLanguage: langCode,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: `${baseUrl}/${lang}`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${lang}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate Service structured data
 */
export function generateServiceSchema(lang: Language, serviceData?: ServiceData) {
  const baseUrl = siteConfig.url
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceData?.name || 'IT Development Services',
    description: serviceData?.description || 'Professional web and mobile development services',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: `${baseUrl}/${lang}`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Czech Republic',
    },
    serviceType: 'Software Development',
    category: 'Information Technology',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: 'Contact for pricing',
      priceCurrency: 'EUR',
    },
  }
}

/**
 * Generate structured data as JSON string
 */
export function generateStructuredDataJson(schema: object): string {
  return JSON.stringify(schema)
}