import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL
  const languages = locales
  const pages = ['', '/about', '/services', '/contacts']
  const locations = ['/locations/praha', '/locations/brno', '/locations/ostrava', '/locations/plzen', '/locations/liberec']
  const legalPages = ['/privacy-policy', '/cookie-policy', '/terms-of-service']

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
              alternateLang === 'cs' ? 'cs-CZ' : 
              alternateLang === 'de' ? 'de-DE' : 'uk-UA',
              `${baseUrl}/${alternateLang}${page}`
            ])
          )
        }
      })
    })

    // Add location pages for each language
    locations.forEach(location => {
      const url = `${baseUrl}/${lang}${location}`
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            languages.map(alternateLang => [
              alternateLang === 'en' ? 'en-US' : 
              alternateLang === 'cs' ? 'cs-CZ' : 
              alternateLang === 'de' ? 'de-DE' : 'uk-UA',
              `${baseUrl}/${alternateLang}${location}`
            ])
          )
        }
      })
    })

    // Add legal pages for each language
    legalPages.forEach(legalPage => {
      const url = `${baseUrl}/${lang}${legalPage}`
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            languages.map(alternateLang => [
              alternateLang === 'en' ? 'en-US' : 
              alternateLang === 'cs' ? 'cs-CZ' : 
              alternateLang === 'de' ? 'de-DE' : 'uk-UA',
              `${baseUrl}/${alternateLang}${legalPage}`
            ])
          )
        }
      })
    })
  })

  return sitemap
}