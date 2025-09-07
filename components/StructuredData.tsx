import { siteConfig } from '@/lib/env'
import { Language } from '@/types'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service'
  lang: Language
  pageType?: 'home' | 'about' | 'services' | 'contact'
  serviceData?: {
    name: string
    description: string
  }
}

export function StructuredData({ type, lang, pageType = 'home', serviceData }: StructuredDataProps) {
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