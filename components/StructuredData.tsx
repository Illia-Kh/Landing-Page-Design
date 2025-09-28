import { siteConfig } from '@/lib/env'
import { Language } from '@/types'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'ContactPoint' | 'LocalBusiness' | 'Person' | 'Place'
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
}

export function StructuredData({ type, lang, serviceData, contactData, personData, placeData }: StructuredDataProps) {
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
            addressLocality: 'Liberec',
            addressCountry: 'CZ',
            streetAddress: contactData?.address || 'Liberec, Czech Republic',
          },
          geo: {
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
          priceRange: '$$',
          paymentAccepted: 'Cash, Credit Card, Bank Transfer',
          currenciesAccepted: 'EUR, CZK',
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