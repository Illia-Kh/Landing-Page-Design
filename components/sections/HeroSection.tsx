import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { MotionStagger } from '@/components/client/MotionSection'
import Link from 'next/link'

interface HeroSectionProps {
  lang: Language
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = getTranslation(lang)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>


      {/* Hero content */}
      <div className="relative z-10 section-container text-center">
        <MotionStagger className="space-y-8" staggerDelay={0.2} immediate={true}>
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="block">{t.hero.title}</span>
              <span className="text-gradient block mt-2">{t.hero.subtitle}</span>
            </h1>
          </div>
          
        
          <div>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </div>ом банере 
          
          <div className="flex justify-center">
            <Link
              href={`/${lang}/contacts`}
              className="px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {t.hero.cta.primary}
            </Link>
          </div>
        </MotionStagger>
      </div>

    </section>
  )
}