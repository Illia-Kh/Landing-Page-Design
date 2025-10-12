import Link from 'next/link'
import Image from 'next/image'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { HERO_SIZES } from '@/lib/imageSizes'
import banner from '@/public/media/banner/web-development.webp'

interface HeroProps {
  lang: Language
}

export function Hero({ lang }: HeroProps) {
  const t = getTranslation(lang)

  return (
    <section className="relative h-[60vh] min-h-[520px] overflow-hidden">
      <Image
        src={banner}
        alt={t.hero.headline}
        fill
        priority
        fetchPriority="high"
        placeholder="blur"
        sizes={HERO_SIZES}
        className="object-cover"
      />

      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t.hero.headline}
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-6">
            {t.hero.subtitle}
          </p>
          <Link
            href={`/${lang}/contacts`}
            className="inline-flex items-center justify-center px-6 py-3 bg-white/90 text-gray-900 font-semibold rounded-full hover:bg-white transition"
            aria-label={`${t.hero.cta.primary} - ${t.hero.title}`}
          >
            {t.hero.cta.primary}
          </Link>
        </div>
      </div>
    </section>
  )
}
