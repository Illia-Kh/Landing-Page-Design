import Link from 'next/link'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import type { Route } from 'next'
import { Logo } from '@/components/ui/Logo'

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
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="section-container py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link 
              href={`/${lang}`}
              className="hover:opacity-80 transition-opacity"
            >
              <Logo variant="footer" />
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>© {currentYear} IKH Systems. All rights reserved.</p>
            </div>
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
        </div>
        
        {/* Contact Info - Flat Layout */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Contact Details */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a 
                href={`mailto:${t.contact.info.email}`}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t.contact.info.email}
              </a>
              <a 
                href={`tel:${t.contact.info.phone}`}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t.contact.info.phone}
              </a>
              <span>{t.contact.info.address}</span>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Telegram"
              >
                Telegram
              </a>
              <a 
                href="#" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a 
                href="#" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        {/* Local Representation - Czech only */}
        {lang === 'cs' && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Lokální zastoupení:</span>
              {locationItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${lang}/locations/${item.slug}` as Route}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
