import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import LocationPage from '@/components/sections/LocationPage'
import { StructuredData } from '@/components/StructuredData'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the Liberec page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const locationData = t.locations.liberec
  
  return {
    title: locationData.title,
    description: locationData.description,
    keywords: locationData.keywords,
    alternates: {
      canonical: getLocalizedUrl('/locations/liberec', lang as Language),
    },
    openGraph: {
      title: locationData.title,
      description: locationData.description,
      url: getLocalizedUrl('/locations/liberec', lang as Language),
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : lang === 'de' ? 'de_DE' : 'uk_UA',
    },
    twitter: {
      card: 'summary_large_image',
      title: locationData.title,
      description: locationData.description,
    },
  }
}

interface LiberecPageProps {
  params: Promise<{ lang: Language }>
}

export default async function LiberecPage({ params }: LiberecPageProps) {
  const { lang } = await params
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)
  const locationData = t.locations.liberec
  
  return (
    <>
      <LocationPage
        city="Liberec"
        slug="liberec"
        title={locationData.title}
        description={locationData.description}
        lang={lang as Language}
      />
      
      {/* Structured Data for Liberec */}
      <StructuredData
        type="LocalBusiness"
        lang={lang as Language}
        placeData={{
          name: "Liberec",
          address: "Liberec, Czech Republic",
          coordinates: {
            lat: 50.7663,
            lng: 15.0543
          }
        }}
      />
      <StructuredData
        type="FAQPage"
        lang={lang as Language}
        faqData={{
          questions: [
            {
              question: "How quickly can you deliver a website for my Liberec business?",
              answer: "Standard business websites typically launch within 3-4 weeks. Complex e-commerce or custom systems may require 6-8 weeks depending on requirements."
            },
            {
              question: "Do you provide ongoing support for businesses in Liberec?",
              answer: "Yes, we offer comprehensive maintenance packages including updates, security monitoring, and performance optimization specifically tailored for Liberec market conditions."
            },
            {
              question: "Can you help with local SEO for Liberec specifically?",
              answer: "Absolutely. We optimize for Liberec-specific keywords, manage Google My Business listings, and implement local schema markup to improve visibility in Liberec search results."
            },
            {
              question: "What makes your approach different for Liberec businesses?",
              answer: "We understand Liberec's business ecosystem, local competition, and regional market dynamics. Our solutions are designed for Czech compliance and local customer behavior patterns."
            }
          ]
        }}
      />
    </>
  )
}
