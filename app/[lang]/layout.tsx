import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language } from '@/types'
import { Analytics } from '@/components/Analytics'
import { PageViewTracker } from '@/components/PageViewTracker'
import { StructuredData } from '@/components/StructuredData'
import { ScrollHeader } from '@/components/client/ScrollHeader'
import { Footer } from '@/components/layout/Footer'
import { env } from '@/lib/env'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate static params for supported languages
export async function generateStaticParams() {
  return [
    { lang: 'cs' },
    { lang: 'en' },
    { lang: 'de' },
    { lang: 'ua' }
  ]
}

// Generate metadata for each language
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const baseUrl = env.NEXT_PUBLIC_SITE_URL
  const canonicalUrl = getLocalizedUrl('/', lang as Language)
  
  return {
    title: t.seo.home.title,
    description: t.seo.home.description,
    keywords: t.seo.home.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en`,
        'cs-CZ': `${baseUrl}/cs`,
        'de-DE': `${baseUrl}/de`,
        'uk-UA': `${baseUrl}/ua`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : lang === 'de' ? 'de_DE' : 'uk_UA',
      url: canonicalUrl,
      siteName: 'IKH Systems',
      title: t.seo.home.title,
      description: t.seo.home.description,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t.seo.home.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.home.title,
      description: t.seo.home.description,
      images: [`${baseUrl}/og-image.jpg`],
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
  }
}

interface LangLayoutProps {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    notFound()
  }
  
  return (
    <html lang={lang} translate="no">
      <head>
        {/* Translation Control */}
        <meta name="google" content="notranslate" />
        <meta name="robots" content="notranslate" />
        <meta httpEquiv="Content-Language" content={lang} />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="IKH Systems" />
        
        {/* Browser Optimization */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Performance Hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* iOS Safari Optimization */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="format-detection" content="email=yes" />
        <meta name="format-detection" content="address=yes" />
      </head>
      <body className="min-h-screen bg-background flex flex-col">
        {/* Structured Data */}
        <StructuredData type="Organization" lang={lang as Language} />
        <StructuredData type="WebSite" lang={lang as Language} />
        
        {/* Analytics */}
        <Analytics />
        <PageViewTracker />
        
        {/* Header */}
        <ScrollHeader lang={lang as Language} />
        
        {/* Main Content */}
        <main className="flex-1 pt-16">
          {children}
        </main>
        
        {/* Footer */}
        <Footer lang={lang as Language} />
      </body>
    </html>
  )
}