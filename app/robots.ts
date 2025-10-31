import { MetadataRoute } from 'next'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  // Normalize base URL: prefer env, fallback to production domain; remove trailing slash
  const fallbackBase = (env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com').replace(/\/+$/, '')
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '/search',
        '/*.html$',   // prevent indexing of .html duplicates
        '/*.txt$',    // prevent indexing of .txt exports
      ],
    },
    sitemap: `${fallbackBase}/sitemap.xml`,
  }
}