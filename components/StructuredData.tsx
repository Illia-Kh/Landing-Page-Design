import { Language } from '@/types'
import { 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateServiceSchema,
  generateStructuredDataJson 
} from '@/lib/seo'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service'
  lang: Language
  serviceData?: {
    name: string
    description: string
  }
}

export function StructuredData({ type, lang, serviceData }: StructuredDataProps) {
  const getSchema = () => {
    switch (type) {
      case 'Organization':
        return generateOrganizationSchema(lang)
      case 'WebSite':
        return generateWebSiteSchema(lang)
      case 'Service':
        return generateServiceSchema(lang, serviceData)
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
        __html: generateStructuredDataJson(schema),
      }}
    />
  )
}