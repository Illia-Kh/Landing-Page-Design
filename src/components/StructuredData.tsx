import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'ContactPage' | 'BreadcrumbList';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    // Create new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [type, data]);
  
  return null;
}

// Predefined schemas
export const schemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CodeHero - Инновационные IT решения",
    "url": "https://codehero.com",
    "logo": "https://codehero.com/logo.png",
    "description": "Создаем современные технологические решения для бизнеса",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Russian", "English", "German", "Czech"]
    },
    "sameAs": [
      "https://t.me/codehero",
      "https://linkedin.com/company/codehero"
    ]
  },
  
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CodeHero",
    "description": "IT консалтинг и разработка программного обеспечения",
    "url": "https://codehero.com",
    "telephone": "+7-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.7558",
      "longitude": "37.6176"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$"
  },
  
  service: (serviceName: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "CodeHero"
    },
    "serviceType": "IT Consulting",
    "areaServed": "RU"
  }),
  
  contactPage: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Контакты CodeHero",
    "description": "Свяжитесь с нами для обсуждения вашего проекта",
    "mainEntity": {
      "@type": "Organization",
      "name": "CodeHero",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["Russian", "English", "German", "Czech"]
      }
    }
  },
  
  breadcrumbList: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  })
};
