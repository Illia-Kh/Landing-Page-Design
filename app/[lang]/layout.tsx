import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, LOCALES, BASE_URL_BY_LOCALE } from '@/lib/i18n'
import { Language } from '@/types'
import { Analytics } from '@/components/Analytics'
import { PageViewTracker } from '@/components/PageViewTracker'
import { StructuredData } from '@/components/StructuredData'
import ScrollHeaderClient from '@/components/client/ScrollHeaderClient'
import { Footer } from '@/components/layout/Footer'
import { env } from '@/lib/env'
import { HtmlLangSetter } from '@/components/client/HtmlLangSetter'

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
export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug?: string[] }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isSupportedLanguage(lang)) return {}
  const t = getTranslation(lang as Language)
  const path = '/'
  const fallbackBase = env.NEXT_PUBLIC_SITE_URL
  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    const base = (BASE_URL_BY_LOCALE[l] || `${fallbackBase}/${l}`).replace(/\/$/, '')
    languages[l] = `${base}${path === '/' ? '' : path}`
  }
  return {
    title: t.seo.home.title,
    description: t.seo.home.description || 'Full-stack web solutions, system integration and automation in Czechia.',
    keywords: t.seo.home.keywords,
    alternates: { canonical: languages[lang], languages },
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
    <>
      {/* Ensure <html lang> is correct on client without nesting html/body */}
      <HtmlLangSetter lang={lang as Language} />

      {/* Structured Data */}
      <StructuredData type="Organization" lang={lang as Language} />
      <StructuredData type="WebSite" lang={lang as Language} />

      {/* Analytics */}
      <Analytics />
      <PageViewTracker />

      {/* Header */}
      <ScrollHeaderClient lang={lang as Language} />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <Footer lang={lang as Language} />
    </>
  )
}