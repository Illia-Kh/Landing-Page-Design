import { useEffect } from 'react';

interface JsonLdProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'ContactPage' | 'BreadcrumbList' | 'FAQPage';
  data: any;
}

export function JsonLd({ type, data }: JsonLdProps) {
  useEffect(() => {
    // Remove existing structured data of the same type
    const existingScripts = document.querySelectorAll(`script[type="application/ld+json"][data-schema="${type}"]`);
    existingScripts.forEach(script => script.remove());
    
    // Create new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', type);
    
    try {
      script.text = JSON.stringify(data, null, 0);
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error creating JSON-LD script:', error);
    }
    
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
    "name": "IKH-TechSystems - Inovativní IT řešení",
    "url": "https://ikhsystems.com",
    "logo": "https://ikhsystems.com/logo.png",
    "description": "Vytváříme moderní technologická řešení pro byznys",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Liberec, Česká republika",
      "addressLocality": "Liberec",
      "addressCountry": "CZ"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Czech", "English", "German", "Polish"]
    },
    "sameAs": [
      "https://t.me/ikhsystems",
      "https://linkedin.com/company/ikhsystems"
    ]
  },
  
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "IKH-TechSystems",
    "description": "IT konzultace a vývoj softwaru v Liberci",
    "url": "https://ikhsystems.com",
    "telephone": "+420-XXX-XXX-XXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Liberec",
      "addressLocality": "Liberec",
      "postalCode": "460 01",
      "addressRegion": "Liberecký kraj",
      "addressCountry": "CZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.7671",
      "longitude": "15.0561"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "€€",
    "sameAs": [
      "https://t.me/ikhsystems",
      "https://linkedin.com/company/ikhsystems"
    ]
  },
  
  service: (serviceName: string, description: string, price?: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "IKH-TechSystems",
      "url": "https://ikhsystems.com"
    },
    "serviceType": "IT Consulting",
    "areaServed": {
      "@type": "Country",
      "name": "Czech Republic"
    },
    ...(price && {
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "EUR",
        "description": "Starting price for turnkey website development"
      }
    })
  }),
  
  websiteTurnkeyService: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Webová stránka na klíč",
    "description": "Kompletní vývoj webových stránek včetně designu, funkcionalit a optimalizace",
    "provider": {
      "@type": "Organization",
      "name": "IKH-TechSystems",
      "url": "https://ikhsystems.com"
    },
    "serviceType": "Web Development",
    "areaServed": {
      "@type": "Country", 
      "name": "Czech Republic"
    },
    "offers": {
      "@type": "Offer",
      "price": "500",
      "priceCurrency": "EUR",
      "description": "Výchozí cena za vývoj webové stránky na klíč"
    }
  },
  
  contactPage: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Kontakt IKH-TechSystems",
    "description": "Kontaktujte nás pro diskusi o vašem projektu",
    "mainEntity": {
      "@type": "Organization",
      "name": "IKH-TechSystems",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["Czech", "English", "German", "Polish"]
      }
    }
  },
  
  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }),
  
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
