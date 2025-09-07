import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesShowcase } from '@/components/sections/ServicesShowcase'
import { ChallengesSection } from '@/components/sections/ChallengesSection'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the home page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  
  return {
    title: t.seo.home.title,
    description: t.seo.home.description,
    keywords: t.seo.home.keywords,
    alternates: {
      canonical: getLocalizedUrl('/', lang as Language),
    },
    openGraph: {
      title: t.seo.home.title,
      description: t.seo.home.description,
      url: getLocalizedUrl('/', lang as Language),
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.home.title,
      description: t.seo.home.description,
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const language = lang as Language

  return (
    <>
      <HeroSection lang={language} />
      <ServicesShowcase lang={language} />
      <ChallengesSection lang={language} />
    </>
  )
}