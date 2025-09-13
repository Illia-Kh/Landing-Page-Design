import Link from 'next/link'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import type { Route } from 'next'

interface FooterProps {
  lang: Language
}

export function Footer({ lang }: FooterProps) {
  const t = getTranslation(lang)
  const currentYear = new Date().getFullYear()
  
  const navItems: Array<{ href: Route; label: string }> = [
    { href: `/${lang}` as Route, label: t.common.navigation.home },
    { href: `/${lang}/services` as Route, label: t.common.navigation.services },
    { href: `/${lang}/about` as Route, label: t.common.navigation.about },
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
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Branding and Copyright */}
          <div className="space-y-4">
            <Link 
              href={`/${lang}`}
              className="text-lg font-bold text-foreground hover:text-primary transition-colors"
            >
              IKH Systems
            </Link>
            <p className="text-sm text-muted-foreground">
              © {currentYear} IKH Systems. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground opacity-75">
              {t.hero.description}
            </p>
          </div>
          
          {/* Contact Information and Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t.contact.title}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Email:</span>{' '}
                <a 
                  href={`mailto:${t.contact.info.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {t.contact.info.email}
                </a>
              </div>
              <div>
                <span className="font-medium">Phone:</span>{' '}
                <a 
                  href={`tel:${t.contact.info.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {t.contact.info.phone}
                </a>
              </div>
              <div>
                <span className="font-medium">Address:</span>{' '}
                {t.contact.info.address}
              </div>
            </div>
            
            {/* Social Links Placeholders */}
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors opacity-75"
                aria-label="Telegram"
              >
                Telegram
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors opacity-75"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors opacity-75"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
            
            {/* Quick Navigation */}
            <div className="pt-4">
              <h4 className="text-sm font-medium text-foreground mb-2">
                Quick Links
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Lokální zastoupení - Czech only */}
            {lang === 'cs' && (
              <div className="pt-4">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Lokální zastoupení
                </h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {locationItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${lang}/locations/${item.slug}` as Route}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
