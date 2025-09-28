"use client"

import Link from 'next/link'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import type { Route } from 'next'
import { Logo } from '@/components/ui/Logo'
import { Settings } from 'lucide-react'

interface FooterProps {
  lang: Language
}

export function Footer({ lang }: FooterProps) {
  const t = getTranslation(lang)
  // Use a static year to avoid hydration mismatch
  const currentYear = 2024
  
  const navItems: Array<{ href: Route; label: string }> = [
    { href: `/${lang}` as Route, label: t.common.navigation.home },
    { href: `/${lang}/services` as Route, label: t.common.navigation.services },
    { href: `/${lang}/contacts` as Route, label: t.common.navigation.contact },
  ]


  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          
          {/* Company Info */}
          <div>
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

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
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
            <div className="flex flex-wrap gap-6">
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

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
            <Link
              href={`/${lang}/privacy-policy`}
              className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={`/${lang}/cookie-policy`}
              className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href={`/${lang}/terms-of-service`}
              className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
            <button
              onClick={() => {
                // Trigger cookie settings modal
                const event = new CustomEvent('openCookieSettings')
                window.dispatchEvent(event)
              }}
              className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              Cookie Settings
            </button>
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
