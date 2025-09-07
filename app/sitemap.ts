import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL
  const languages = locales
  const pages = ['', '/about', '/services', '/contacts']

  const sitemap: MetadataRoute.Sitemap = []

  // Add routes for each language and page combination
  languages.forEach(lang => {
    pages.forEach(page => {
      const url = `${baseUrl}/${lang}${page}`
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            languages.map(alternateLang => [
              alternateLang === 'en' ? 'en-US' : 
              alternateLang === 'cs' ? 'cs-CZ' : 'de-DE',
              `${baseUrl}/${alternateLang}${page}`
            ])
          )
        }
      })
    })
  })

  return sitemap
}