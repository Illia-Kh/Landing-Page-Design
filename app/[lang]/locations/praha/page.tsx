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

// Generate metadata for the Prague page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const locationData = t.locations.praha
  
  return {
    title: locationData.title,
    description: locationData.description,
    keywords: locationData.keywords,
    alternates: {
      canonical: getLocalizedUrl('/locations/praha', lang as Language),
    },
    openGraph: {
      title: locationData.title,
      description: locationData.description,
      url: getLocalizedUrl('/locations/praha', lang as Language),
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

interface PrahaPageProps {
  params: Promise<{ lang: Language }>
}

export default async function PrahaPage({ params }: PrahaPageProps) {
  const { lang } = await params
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)
  const locationData = t.locations.praha
  
  return (
    <>
      <LocationPage
        city="Praha"
        slug="praha"
        title={locationData.title}
        description={locationData.description}
        lang={lang as Language}
      />
      
      {/* Structured Data for Prague */}
      <StructuredData
        type="LocalBusiness"
        lang={lang as Language}
        placeData={{
          name: "Prague",
          address: "Prague, Czech Republic",
          coordinates: {
            lat: 50.0755,
            lng: 14.4378
          }
        }}
      />
      <StructuredData
        type="FAQPage"
        lang={lang as Language}
        faqData={{
          questions: [
            {
              question: "How quickly can you deliver a website for my Prague business?",
              answer: "Standard business websites typically launch within 3-4 weeks. Complex e-commerce or custom systems may require 6-8 weeks depending on requirements."
            },
            {
              question: "Do you provide ongoing support for businesses in Prague?",
              answer: "Yes, we offer comprehensive maintenance packages including updates, security monitoring, and performance optimization specifically tailored for Prague market conditions."
            },
            {
              question: "Can you help with local SEO for Prague specifically?",
              answer: "Absolutely. We optimize for Prague-specific keywords, manage Google My Business listings, and implement local schema markup to improve visibility in Prague search results."
            },
            {
              question: "What makes your approach different for Prague businesses?",
              answer: "We understand Prague's business ecosystem, local competition, and regional market dynamics. Our solutions are designed for Czech compliance and local customer behavior patterns."
            }
          ]
        }}
      />
    </>
  )
}
