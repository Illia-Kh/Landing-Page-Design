import { siteConfig } from '@/lib/env'
import { Language } from '@/types'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'LocalBusiness' | 'Article' | 'Person'
  lang: Language
  serviceData?: {
    name: string
    description: string
  }
  articleData?: {
    headline: string
    description: string
    author: string
    datePublished: string
    dateModified?: string
  }
  personData?: {
    name: string
    jobTitle: string
    description: string
  }
}

export function StructuredData({ type, lang, serviceData, articleData, personData }: StructuredDataProps) {
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

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/${lang}#business`,
          name: siteConfig.name,
          url: `${baseUrl}/${lang}`,
          logo: `${baseUrl}/logo.png`,
          description: siteConfig.description,
          telephone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CZ',
            addressLocality: 'Prague',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '50.0755',
            longitude: '14.4378',
          },
          openingHours: 'Mo-Fr 09:00-18:00',
          priceRange: '€€',
          serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: '50.0755',
              longitude: '14.4378',
            },
            geoRadius: '50',
          },
        }

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: articleData?.headline || '',
          description: articleData?.description || '',
          author: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: `${baseUrl}/${lang}`,
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: `${baseUrl}/${lang}`,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`,
            },
          },
          datePublished: articleData?.datePublished || new Date().toISOString(),
          dateModified: articleData?.dateModified || articleData?.datePublished || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/${lang}`,
          },
          image: `${baseUrl}/og-image.jpg`,
          inLanguage: langCode,
        }

      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: personData?.name || 'Illia Khromov',
          jobTitle: personData?.jobTitle || 'Lead Developer',
          description: personData?.description || 'Expert software developer specializing in modern web technologies',
          url: `${baseUrl}/${lang}`,
          worksFor: {
            '@type': 'Organization',
            name: siteConfig.name,
          },
          knowsAbout: [
            'Web Development',
            'React',
            'Next.js',
            'TypeScript',
            'Node.js',
            'Software Architecture',
          ],
        }
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