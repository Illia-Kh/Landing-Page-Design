import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com'
  const languages = ['cs', 'en', 'de']
  const pages = ['', '/about', '/services', '/contacts']

  const sitemap: MetadataRoute.Sitemap = []

  languages.forEach(lang => {
    pages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })

  return sitemap
}