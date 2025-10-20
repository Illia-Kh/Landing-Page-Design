import { MetadataRoute } from 'next'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const fallbackBase = env.NEXT_PUBLIC_SITE_URL
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: `${fallbackBase}/sitemap.xml`,
  }
}