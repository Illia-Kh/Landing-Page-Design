"use client"

import Link from 'next/link'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import type { Route } from 'next'
import { Logo } from '@/components/ui/Logo'
import { Settings, MapPin, Phone, Mail } from 'lucide-react'

interface FooterProps {
  lang: Language
}

export function Footer({ lang }: FooterProps) {
  const t = getTranslation(lang)
  // Use a static year to avoid hydration mismatch
  const currentYear = 2024
  
  // Main navigation items
  const mainNavItems: Array<{ href: Route; label: string }> = [
    { href: `/${lang}` as Route, label: t.common.navigation.home },
    { href: `/${lang}/about` as Route, label: 'About' },
    { href: `/${lang}/services` as Route, label: t.common.navigation.services },
    { href: `/${lang}/contacts` as Route, label: t.common.navigation.contact },
  ]

  // Location pages
  const locationItems: Array<{ href: Route; label: string }> = [
    { href: `/${lang}/locations/praha` as Route, label: 'Praha' },
    { href: `/${lang}/locations/brno` as Route, label: 'Brno' },
    { href: `/${lang}/locations/ostrava` as Route, label: 'Ostrava' },
    { href: `/${lang}/locations/plzen` as Route, label: 'Plzeň' },
    { href: `/${lang}/locations/liberec` as Route, label: 'Liberec' },
  ]

  // Legal pages
  const legalItems: Array<{ href: Route; label: string }> = [
    { href: `/${lang}/privacy-policy` as Route, label: 'Privacy Policy' },
    { href: `/${lang}/cookie-policy` as Route, label: 'Cookie Policy' },
    { href: `/${lang}/terms-of-service` as Route, label: 'Terms of Service' },
  ]


  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link 
              href={`/${lang}`}
              className="inline-block mb-4 hover:opacity-80 transition-opacity"
            >
              <Logo variant="footer" />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Modern technological solutions for digital transformation
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <a 
                  href={`mailto:${t.contact.info.email}`}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {t.contact.info.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <a 
                  href={`tel:${t.contact.info.phone}`}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {t.contact.info.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{t.contact.info.address}</span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Locations
            </h3>
            <ul className="space-y-3">
              {locationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Settings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('openCookieSettings')
                    window.dispatchEvent(event)
                  }}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} IKH Systems. All rights reserved.
            </div>

            {/* Business Hours */}
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-right">
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
                "https://wa.me/420728209012",
                "https://www.linkedin.com/company/108555725",
                "https://www.facebook.com/ikhsystems",
                "https://t.me/IKH%20Systems"
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
