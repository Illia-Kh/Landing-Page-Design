import Image from 'next/image'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'

interface CriticalContentProps {
  lang: Language
}

/**
 * Critical content that should be rendered immediately
 * This helps improve Speed Index by showing content faster
 */
export function CriticalContent({ lang }: CriticalContentProps) {
  const t = getTranslation(lang)

  return (
    <div className="critical-content">
      {/* Above-the-fold content */}
      <header className="header">
        <div className="header-content">
          <a href={`/${lang}`} className="logo">
            <Image
              src="/logo/ikh-logo.svg"
              alt="IKH Systems"
              width={40}
              height={40}
              loading="eager"
              fetchPriority="high"
            />
            <span>IKH Systems</span>
          </a>
          <nav>
            <a href={`/${lang}/services`}>Services</a>
            <a href={`/${lang}/contacts`}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero section with critical content */}
      <section className="hero">
        <div className="hero-content">
          <h1>{t.hero.headline}</h1>
          <p>{t.hero.subtitle}</p>
          <a href={`/${lang}/contacts`} className="btn btn-primary">
            {t.hero.cta.primary}
          </a>
        </div>
      </section>
    </div>
  )
}
