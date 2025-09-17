import Link from 'next/link'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import type { Route } from 'next'
import { Logo } from '@/components/ui/Logo'
import { MessageCircle } from 'lucide-react'

interface FooterProps {
  lang: Language
}

export function Footer({ lang }: FooterProps) {
  const t = getTranslation(lang)
  const currentYear = new Date().getFullYear()
  
  const navItems: Array<{ href: Route; label: string }> = [
    { href: `/${lang}` as Route, label: t.common.navigation.home },
    { href: `/${lang}/services` as Route, label: t.common.navigation.services },
    { href: `/${lang}/contacts` as Route, label: t.common.navigation.contact },
  ]

  const locationItems = [
    { slug: 'praha', label: 'Praha' },
    { slug: 'brno', label: 'Brno' },
    { slug: 'ostrava', label: 'Ostrava' },
    { slug: 'plzen', label: 'Plzeň' },
    { slug: 'liberec', label: 'Liberec' },
  ]

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link 
              href={`/${lang}`}
              className="inline-block mb-4 hover:opacity-80 transition-opacity"
            >
              <Logo variant="footer" />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Modern technological solutions for digital transformation
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}/services`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  React & Next.js
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Locations
            </h3>
            <ul className="space-y-2">
              {locationItems.slice(0, 4).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${lang}/locations/${item.slug}` as Route}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Contact
            </h3>
            <div className="space-y-3">
              <div>
                <a 
                  href={`mailto:${t.contact.info.email}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {t.contact.info.email}
                </a>
              </div>
              <div>
                <a 
                  href={`tel:${t.contact.info.phone}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {t.contact.info.phone}
                </a>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t.contact.info.address}
              </div>
              <div className="flex gap-3 pt-2">
                <a 
                  href="https://wa.me/420728209012" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} IKH Systems. All rights reserved.
            </div>

            {/* Navigation Links */}
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Business Hours */}
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-right">
              <div>Mon-Fri 9:00-17:00</div>
              <div>Based in Liberec, CZ</div>
            </div>
          </div>
        </div>
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IKH Systems",
              "url": "https://ikhsystems.com",
              "logo": "https://ikhsystems.com/logo/ikh-logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+420728209012",
                "contactType": "customer service",
                "availableLanguage": ["English", "Czech", "German", "Ukrainian"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Liberec",
                "addressCountry": "CZ"
              },
              "sameAs": [
                `https://wa.me/420728209012`
              ],
              "serviceArea": {
                "@type": "Country",
                "name": "Czech Republic"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Web Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Development",
                      "description": "Full-stack web development with modern technologies"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Frontend Development",
                      "description": "Specialized frontend solutions with React and Next.js"
                    }
                  }
                ]
              }
            })
          }}
        />
      </div>
    </footer>
  )
}
