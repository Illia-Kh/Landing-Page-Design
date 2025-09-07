import { Metadata } from 'next'
import { Language } from '@/types'
import { siteConfig } from '@/lib/env'
import { generateSEOMetadata, SEOData } from './index'

/**
 * Create standardized metadata for Next.js pages using our SEO utilities
 */
export function createPageMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  language = 'en',
  noIndex = false,
}: SEOData & { noIndex?: boolean }): Metadata {
  const seoData = generateSEOMetadata({
    title,
    description,
    keywords,
    image,
    url,
    type,
    language,
  })

  return {
    ...seoData,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Metadata for page sections/components (for JSON-LD)
 */
export interface PageSectionMeta {
  name: string
  description: string
  url?: string
  image?: string
}

/**
 * Generate JSON-LD for a page with multiple sections
 */
export function generatePageSectionJsonLd(
  sections: PageSectionMeta[],
  language: Language
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: siteConfig.name,
    url: `${siteConfig.url}/${language}`,
    mainEntity: sections.map(section => ({
      '@type': 'Thing',
      name: section.name,
      description: section.description,
      url: section.url ? `${siteConfig.url}/${language}${section.url}` : undefined,
      image: section.image ? `${siteConfig.url}${section.image}` : undefined,
    })),
    inLanguage: language,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: `${siteConfig.url}/${language}`,
    },
  }
}