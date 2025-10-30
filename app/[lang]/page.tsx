import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, LOCALES, BASE_URL_BY_LOCALE } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { Hero } from '@/components/sections/Hero'
import { ServicesShowcase } from '@/components/sections/ServicesShowcase'
import { ChallengesSection } from '@/components/sections/ChallengesSection'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the home page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isSupportedLanguage(lang)) return {}
  const t = getTranslation(lang as Language)
  const fallbackBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    const base = (BASE_URL_BY_LOCALE[l] || `${fallbackBase}/${l}`).replace(/\/$/, '')
    languages[l] = `${base}`
  }
  return {
    title: t.seo.home.title,
    description: t.seo.home.description || 'Full-stack web solutions, system integration and automation in Czechia.',
    keywords: t.seo.home.keywords,
    alternates: { canonical: languages[lang], languages },
  }
}

export function generateStaticParams() {
  return [{ lang: 'cs' }, { lang: 'en' }, { lang: 'de' }, { lang: 'ua' }]
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const language = lang as Language
  const t = getTranslation(language)

  return (
    <>
      <Hero lang={language} t={t.hero} />
      <ChallengesSection lang={language} t={t.challenges} />
      <ServicesShowcase lang={language} t={{
        title: t.services.title,
        subtitle: t.services.subtitle,
        items: t.services.items,
        common: t.common
      }} />
    </>
  )
}