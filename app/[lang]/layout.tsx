import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language } from '@/types'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate static params for supported languages
export async function generateStaticParams() {
  return [
    { lang: 'cs' },
    { lang: 'en' },
    { lang: 'de' }
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  
  return {
    title: t.seo.home.title,
    description: t.seo.home.description,
    keywords: t.seo.home.keywords,
    alternates: {
      canonical: getLocalizedUrl('/', lang as Language),
      languages: {
        'en-US': `${baseUrl}/en`,
        'cs-CZ': `${baseUrl}/cs`,
        'de-DE': `${baseUrl}/de`,
      },
    },
    openGraph: {
      title: t.seo.home.title,
      description: t.seo.home.description,
      url: getLocalizedUrl('/', lang as Language),
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : 'de_DE',
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
    <div className="min-h-screen bg-background" lang={lang}>
      {children}
    </div>
  )
}