export function generateStaticParams() {
  return [{ lang: 'cs' }, { lang: 'en' }, { lang: 'de' }, { lang: 'ua' }]
}
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import LocationPage from '@/components/sections/LocationPage'
import { StructuredData } from '@/components/StructuredData'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the Plzeň page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const locationData = t.locations.plzen
  
  return {
    title: locationData.title,
    description: locationData.description,
    keywords: locationData.keywords,
    alternates: {
      canonical: getLocalizedUrl('/locations/plzen', lang as Language),
    },
    openGraph: {
      title: locationData.title,
      description: locationData.description,
      url: getLocalizedUrl('/locations/plzen', lang as Language),
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

interface PlzenPageProps {
  params: Promise<{ lang: Language }>
}

export default async function PlzenPage({ params }: PlzenPageProps) {
  const { lang } = await params
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)
  const locationData = t.locations.plzen
  
  return (
    <>
      <LocationPage
        city="Plzeň"
        slug="plzen"
        title={locationData.title}
        description={locationData.description}
        lang={lang as Language}
      />
      
      {/* Structured Data for Plzen */}
      <StructuredData
        type="LocalBusiness"
        lang={lang as Language}
        placeData={{
          name: "Plzen",
          address: "Plzen, Czech Republic",
          coordinates: {
            lat: 49.7384,
            lng: 13.3736
          }
        }}
      />
      <StructuredData
        type="FAQPage"
        lang={lang as Language}
        faqData={{
          questions: [
            {
              question: "How quickly can you deliver a website for my Plzen business?",
              answer: "Standard business websites typically launch within 3-4 weeks. Complex e-commerce or custom systems may require 6-8 weeks depending on requirements."
            },
            {
              question: "Do you provide ongoing support for businesses in Plzen?",
              answer: "Yes, we offer comprehensive maintenance packages including updates, security monitoring, and performance optimization specifically tailored for Plzen market conditions."
            },
            {
              question: "Can you help with local SEO for Plzen specifically?",
              answer: "Absolutely. We optimize for Plzen-specific keywords, manage Google My Business listings, and implement local schema markup to improve visibility in Plzen search results."
            },
            {
              question: "What makes your approach different for Plzen businesses?",
              answer: "We understand Plzen's business ecosystem, local competition, and regional market dynamics. Our solutions are designed for Czech compliance and local customer behavior patterns."
            }
          ]
        }}
      />
    </>
  )
}
