import Link from 'next/link'
import { Language, HeroSlide } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { HeroCarousel } from '@/components/client/HeroCarousel'
import { MotionSection } from '@/components/client/MotionSection'

interface HeroProps {
  lang: Language
}

export function Hero({ lang }: HeroProps) {
  const t = getTranslation(lang)
  
  // Transform carousel data to match HeroSlide interface
  const slides: HeroSlide[] = t.hero.carousel.slides.map(slide => ({
    image: slide.image,
    alt: slide.alt,
    title: slide.title,
    subtitle: slide.subtitle,
    cta: slide.cta ? {
      label: slide.cta.label,
      href: slide.cta.href
    } : undefined
  }))

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 dark:opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 section-container min-h-screen flex items-center pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 w-full">
          {/* Text Content - Left Side */}
          <div className="flex flex-col justify-center items-center md:items-start space-y-4 text-center md:text-left h-full">
            {/* Main Headline - SEO Optimized */}
            <MotionSection 
              direction="up" 
              delay={0.05} 
              immediate={true}
              className="max-w-lg mx-auto md:mx-0"
            >
              <h1 className="hero-title text-gray-900 dark:text-white mb-4">
                {t.hero.headline}
              </h1>
            </MotionSection>
            
            <MotionSection 
              direction="up" 
              delay={0.1} 
              immediate={true}
              className="max-w-lg mx-auto md:mx-0"
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                {t.hero.subtitle}
              </p>
            </MotionSection>
            
            <MotionSection 
              direction="up" 
              delay={0.15} 
              immediate={true}
              className="flex justify-center md:justify-start"
            >
              <Link
                href={`/${lang}/contacts`}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                aria-label={`${t.hero.cta.primary} - ${t.hero.title}`}
              >
                {t.hero.cta.primary}
              </Link>
            </MotionSection>
          </div>

          {/* Carousel - Right Side */}
          <div className="flex justify-center items-center h-full">
                <MotionSection 
                  direction="left" 
                  delay={0.2} 
                  immediate={true}
                  className="w-full max-w-sm"
                >
              <HeroCarousel slides={slides} lang={lang} />
            </MotionSection>
          </div>
        </div>
      </div>
    </section>
  )
}
