import { MetadataRoute } from 'next'
import { BASE_URL_BY_LOCALE, LOCALES } from '@/lib/i18n'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const fallbackBase = env.NEXT_PUBLIC_SITE_URL
  const sitemaps = LOCALES.map(l => {
    const base = BASE_URL_BY_LOCALE[l] || `${fallbackBase}/${l}`
    return `${base.replace(/\/$/, '')}/sitemap.xml`
  })
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: sitemaps.length === 1 ? sitemaps[0] : sitemaps,
  }
}