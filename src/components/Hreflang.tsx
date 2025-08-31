import { useEffect } from 'react';

interface HreflangProps {
  currentPage: string;
  currentLanguage: string;
}

export function Hreflang({ currentPage, currentLanguage }: HreflangProps) {
  useEffect(() => {
    const baseUrl = "https://codehero.com";
    const languages = ['ru', 'en', 'de', 'cs'];
    
    // Remove existing hreflang tags
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(tag => tag.remove());
    
    // Add hreflang tags for each language
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      
      // Set appropriate locale for hreflang
      const locale = lang === 'ru' ? 'ru-RU' : 
                    lang === 'en' ? 'en-US' : 
                    lang === 'de' ? 'de-DE' : 'cs-CZ';
      link.hreflang = locale;
      
      // Build URL
      const url = currentPage === 'home' ? 
        `${baseUrl}/?lang=${lang}` : 
        `${baseUrl}/${currentPage}?lang=${lang}`;
      
      link.href = url;
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang (usually points to the default language)
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    const defaultUrl = currentPage === 'home' ? 
      `${baseUrl}/?lang=ru` : 
      `${baseUrl}/${currentPage}?lang=ru`;
    defaultLink.href = defaultUrl;
    document.head.appendChild(defaultLink);
    
  }, [currentPage, currentLanguage]);
  
  return null;
}
