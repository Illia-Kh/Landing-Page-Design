import { Language } from '@/types'
import { siteConfig } from '@/lib/env'

export interface SEOData {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  language?: Language
}

/**
 * Generate SEO metadata for pages
 */
export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  language = 'en'
}: SEOData) {
  const siteTitle = siteConfig.name
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const ogImage = image ? `${siteConfig.url}${image}` : `${siteConfig.url}/og-image.jpg`

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: getOpenGraphLocale(language),
      type,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': `${siteConfig.url}/en`,
        'cs': `${siteConfig.url}/cs`,
        'de': `${siteConfig.url}/de`,
      },
    },
  }
}

/**
 * Get OpenGraph locale string
 */
function getOpenGraphLocale(language: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en_US',
    cs: 'cs_CZ',
    de: 'de_DE',
  }
  return localeMap[language] || 'en_US'
}

/**
 * Generate robots meta tag content
 */
export function generateRobotsMeta({
  index = true,
  follow = true,
  archive = true,
  snippet = true,
  imageIndex = true,
}: {
  index?: boolean
  follow?: boolean
  archive?: boolean
  snippet?: boolean
  imageIndex?: boolean
} = {}) {
  const directives = []
  
  directives.push(index ? 'index' : 'noindex')
  directives.push(follow ? 'follow' : 'nofollow')
  
  if (!archive) directives.push('noarchive')
  if (!snippet) directives.push('nosnippet')
  if (!imageIndex) directives.push('noimageindex')
  
  return directives.join(', ')
}

/**
 * Generate hreflang links for international SEO
 */
export function generateHreflangLinks(currentPath: string) {
  const languages: Language[] = ['en', 'cs', 'de']
  
  return languages.map(lang => ({
    hrefLang: lang,
    href: `${siteConfig.url}/${lang}${currentPath}`,
  }))
}

/**
 * SEO-optimized breadcrumb structure
 */
export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbStructuredData(
  items: BreadcrumbItem[],
  language: Language
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${siteConfig.url}/${language}${item.url}`,
    })),
  }
}