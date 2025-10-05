import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import LocationPage from '@/components/sections/LocationPage'
import { StructuredData } from '@/components/StructuredData'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the Ostrava page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const locationData = t.locations.ostrava
  
  return {
    title: locationData.title,
    description: locationData.description,
    keywords: locationData.keywords,
    alternates: {
      canonical: getLocalizedUrl('/locations/ostrava', lang as Language),
    },
    openGraph: {
      title: locationData.title,
      description: locationData.description,
      url: getLocalizedUrl('/locations/ostrava', lang as Language),
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

interface OstravaPageProps {
  params: Promise<{ lang: Language }>
}

export default async function OstravaPage({ params }: OstravaPageProps) {
  const { lang } = await params
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)
  const locationData = t.locations.ostrava
  
  return (
    <>
      <LocationPage
        city="Ostrava"
        slug="ostrava"
        title={locationData.title}
        description={locationData.description}
        lang={lang as Language}
      />
      
      {/* Structured Data for Ostrava */}
      <StructuredData
        type="LocalBusiness"
        lang={lang as Language}
        placeData={{
          name: "Ostrava",
          address: "Ostrava, Czech Republic",
          coordinates: {
            lat: 49.8209,
            lng: 18.2625
          }
        }}
      />
      <StructuredData
        type="FAQPage"
        lang={lang as Language}
        faqData={{
          questions: [
            {
              question: "How quickly can you deliver a website for my Ostrava business?",
              answer: "Standard business websites typically launch within 3-4 weeks. Complex e-commerce or custom systems may require 6-8 weeks depending on requirements."
            },
            {
              question: "Do you provide ongoing support for businesses in Ostrava?",
              answer: "Yes, we offer comprehensive maintenance packages including updates, security monitoring, and performance optimization specifically tailored for Ostrava market conditions."
            },
            {
              question: "Can you help with local SEO for Ostrava specifically?",
              answer: "Absolutely. We optimize for Ostrava-specific keywords, manage Google My Business listings, and implement local schema markup to improve visibility in Ostrava search results."
            },
            {
              question: "What makes your approach different for Ostrava businesses?",
              answer: "We understand Ostrava's business ecosystem, local competition, and regional market dynamics. Our solutions are designed for Czech compliance and local customer behavior patterns."
            }
          ]
        }}
      />
    </>
  )
}
