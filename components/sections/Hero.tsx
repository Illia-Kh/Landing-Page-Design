import Link from 'next/link'
import HeroCarouselLoader from '@/components/client/HeroCarouselLoader'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'


interface HeroProps {
  lang: Language
}

export function Hero({ lang }: HeroProps) {
  const t = getTranslation(lang)

  return (
    <section className="relative overflow-hidden">
      <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-12 md:py-16">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t.hero.headline}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            {t.hero.subtitle}
          </p>
          <Link
            href={`/${lang}/contacts`}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition"
            aria-label={`${t.hero.cta.primary} - ${t.hero.title}`}
          >
            {t.hero.cta.primary}
          </Link>
        </div>
        <div className="order-1 md:order-2">
          <HeroCarouselLoader slides={t.hero.carousel.slides} lang={lang} />
        </div>
      </div>
    </section>
  )
}
