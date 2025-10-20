import { siteConfig } from '@/lib/env'
import { Language } from '@/types'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'ContactPoint' | 'LocalBusiness' | 'Person' | 'Place' | 'WebPage' | 'FAQPage'
  lang: Language
  serviceData?: {
    name: string
    description: string
  }
  contactData?: {
    email: string
    phone: string
    address: string
  }
  personData?: {
    name: string
    position: string
    description: string
    isLead?: boolean
  }
  placeData?: {
    name: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  webPageData?: {
    name: string
    description: string
    url: string
  }
  faqData?: {
    questions: Array<{
      question: string
      answer: string
    }>
  }
}

export function StructuredData({ type, lang, serviceData, contactData, personData, placeData, webPageData, faqData }: StructuredDataProps) {
  const getSchema = () => {
    const baseUrl = siteConfig.url
    const langCode = lang === 'en' ? 'en-US' : lang === 'cs' ? 'cs-CZ' : 'de-DE'

    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.name,
          url: `${baseUrl}/${lang}`,
          logo: `${baseUrl}/logo.png`,
          description: siteConfig.description,
          sameAs: [
            siteConfig.social.github,
            siteConfig.social.linkedin,
            'https://wa.me/420728209012',
            'https://t.me/420728209012',
            'https://www.linkedin.com/company/108555725',
            'https://www.facebook.com/profile.php?id=61580544249647',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.phone,
            availableLanguage: ['English', 'Czech', 'German'],
            areaServed: 'CZ',
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CZ',
            addressLocality: 'Prague',
          },
          foundingDate: '2023',
          industry: 'Information Technology',
          numberOfEmployees: '1-10',
        }

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          url: `${baseUrl}/${lang}`,
          description: siteConfig.description,
          inLanguage: langCode,
          publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: `${baseUrl}/${lang}`,
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/${lang}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }

      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: serviceData?.name || 'IT Development Services',
          description: serviceData?.description || 'Professional web and mobile development services',
          provider: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: `${baseUrl}/${lang}`,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Czech Republic',
          },
          serviceType: 'Software Development',
          category: 'Information Technology',
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            price: 'Contact for pricing',
            priceCurrency: 'EUR',
          },
        }

      case 'ContactPoint':
        return {
          '@context': 'https://schema.org',
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: contactData?.email || siteConfig.contact.email,
          telephone: contactData?.phone || siteConfig.contact.phone,
          availableLanguage: ['English', 'Czech', 'German', 'Ukrainian'],
          areaServed: 'CZ',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
          },
        }

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: siteConfig.name,
          description: siteConfig.description,
          url: `${baseUrl}/${lang}`,
          telephone: contactData?.phone || siteConfig.contact.phone,
          email: contactData?.email || siteConfig.contact.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: placeData?.name || 'Liberec',
            addressCountry: 'CZ',
            streetAddress: placeData?.address || 'Liberec, Czech Republic',
          },
          geo: placeData?.coordinates ? {
            '@type': 'GeoCoordinates',
            latitude: placeData.coordinates.lat,
            longitude: placeData.coordinates.lng,
          } : {
            '@type': 'GeoCoordinates',
            latitude: 50.7663,
            longitude: 15.0543,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
          },
          areaServed: {
            '@type': 'City',
            name: placeData?.name || 'Liberec',
          },
          serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: placeData?.coordinates?.lat || 50.7663,
              longitude: placeData?.coordinates?.lng || 15.0543,
            },
            geoRadius: '50000',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Web Development Services in ${placeData?.name || 'Liberec'}`,
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Web Development',
                  description: `Custom website development for ${placeData?.name || 'Liberec'} businesses`,
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Local SEO',
                  description: `Search engine optimization for ${placeData?.name || 'Liberec'} market visibility`,
                },
              },
            ],
          },
          sameAs: [
            'https://wa.me/420728209012',
            'https://t.me/420728209012',
            'https://www.linkedin.com/company/108555725',
            'https://www.facebook.com/profile.php?id=61580544249647',
          ],
          inLanguage: langCode,
        }

      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: personData?.name || '',
          jobTitle: personData?.position || '',
          description: personData?.description || '',
          worksFor: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: `${baseUrl}/${lang}`,
          },
          knowsAbout: personData?.isLead === true
            ? ['Full-stack Development', 'React', 'Node.js', 'Cloud Technologies', 'Team Leadership']
            : ['Web Development', 'Software Engineering', 'Quality Assurance'],
          alumniOf: 'Self-taught / Professional Experience',
          nationality: 'Ukrainian',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CZ',
          },
        }

      case 'Place':
        return {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: placeData?.name || '',
          description: `IKH Systems services in ${placeData?.name}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: placeData?.name || '',
            addressCountry: 'CZ',
            streetAddress: placeData?.address || '',
          },
          geo: placeData?.coordinates ? {
            '@type': 'GeoCoordinates',
            latitude: placeData.coordinates.lat,
            longitude: placeData.coordinates.lng,
          } : undefined,
          containedInPlace: {
            '@type': 'Country',
            name: 'Czech Republic',
          },
        }

      case 'WebPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: webPageData?.name || '',
          description: webPageData?.description || '',
          url: webPageData?.url || '',
          inLanguage: langCode,
          isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.name,
            url: `${baseUrl}/${lang}`,
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: `${baseUrl}/${lang}`,
          },
        }

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqData?.questions?.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })) || [],
        }

      default:
        return null
    }
  }

  const schema = getSchema()
  
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}