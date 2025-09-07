// SEO utilities and metadata helpers
export {
  generateSEOMetadata,
  generateRobotsMeta,
  generateHreflangLinks,
  generateBreadcrumbStructuredData,
  type SEOData,
  type BreadcrumbItem
} from './index'

// Structured data component
export { StructuredData } from './structured-data'

// Metadata helpers for Next.js
export { 
  createPageMetadata,
  generatePageSectionJsonLd,
  type PageSectionMeta 
} from './metadata'