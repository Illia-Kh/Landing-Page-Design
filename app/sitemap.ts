import { MetadataRoute } from 'next'
import { LOCALES, BASE_URL_BY_LOCALE } from '@/lib/i18n'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/about', '/services', '/contacts']
  const entries: MetadataRoute.Sitemap = []
  const fallbackBase = env.NEXT_PUBLIC_SITE_URL

  for (const p of paths) {
    for (const l of LOCALES) {
      const base = (BASE_URL_BY_LOCALE[l] || `${fallbackBase}/${l}`).replace(/\/$/, '')
      const url = `${base}${p === '/' ? '' : p}`
      const alternates = Object.fromEntries(
        LOCALES.map(al => {
          const altBase = (BASE_URL_BY_LOCALE[al] || `${fallbackBase}/${al}`).replace(/\/$/, '')
          return [al, `${altBase}${p === '/' ? '' : p}`]
        })
      )
      entries.push({ url, alternates: { languages: alternates } })
    }
  }
  return entries
}