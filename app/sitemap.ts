import { MetadataRoute } from 'next'
import { LOCALES, BASE_URL_BY_LOCALE } from '@/lib/i18n'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/services',
    '/contacts',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/locations/praha',
    '/locations/brno',
    '/locations/ostrava',
    '/locations/plzen',
    '/locations/liberec',
  ]
  const entries: MetadataRoute.Sitemap = []
  const fallbackBase = env.NEXT_PUBLIC_SITE_URL

  for (const p of paths) {
    for (const l of LOCALES) {
      const base = (BASE_URL_BY_LOCALE[l] || `${fallbackBase}/${l}`)
      const url = `${base}${p === '/' ? '' : p}`
      const alternates = Object.fromEntries(
        LOCALES.map(al => {
          const altBase = (BASE_URL_BY_LOCALE[al] || `${fallbackBase}/${al}`)
          return [al, `${altBase}${p === '/' ? '' : p}`]
        })
      )
      entries.push({ url, lastModified: new Date(), changeFrequency: 'weekly', alternates: { languages: alternates } })
    }
  }
  return entries
}