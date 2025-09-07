import { Language, SeoData } from '@/types'
import { siteConfig } from '@/lib/utils/env'
import { getTranslation } from '@/lib/i18n'
import { Metadata } from 'next'

/**
 * Generate metadata for a page based on SEO data
 */
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  lang,
  page,
}: SeoData & { lang: Language; page?: string }): Metadata {
  const baseUrl = siteConfig.url
  const fullUrl = url || `${baseUrl}/${lang}${page ? `/${page}` : ''}`
  const ogImage = image || `${baseUrl}/og/default-${lang}.png`

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: `@${siteConfig.author}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': `${baseUrl}/en${page ? `/${page}` : ''}`,
        'cs': `${baseUrl}/cs${page ? `/${page}` : ''}`,
        'de': `${baseUrl}/de${page ? `/${page}` : ''}`,
        'x-default': `${baseUrl}/en${page ? `/${page}` : ''}`,
      },
    },
  }
}

/**
 * Generate page metadata using translations
 */
export function generatePageMetadata(
  lang: Language,
  page: 'home' | 'about' | 'services' | 'contact' | 'logoPortfolio'
): Metadata {
  const t = getTranslation(lang)
  const seoData = t.seo[page]
  
  return generateMetadata({
    ...seoData,
    lang,
    page: page === 'home' ? undefined : page,
  })
}

/**
 * Generate hreflang links for a page
 */
export function generateHreflangLinks(page?: string) {
  const baseUrl = siteConfig.url
  const pagePath = page ? `/${page}` : ''
  
  return [
    { rel: 'alternate', hrefLang: 'en', href: `${baseUrl}/en${pagePath}` },
    { rel: 'alternate', hrefLang: 'cs', href: `${baseUrl}/cs${pagePath}` },
    { rel: 'alternate', hrefLang: 'de', href: `${baseUrl}/de${pagePath}` },
    { rel: 'alternate', hrefLang: 'x-default', href: `${baseUrl}/en${pagePath}` },
  ]
}