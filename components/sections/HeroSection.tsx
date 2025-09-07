import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { MotionSection, MotionStagger } from '@/components/client/MotionSection'
import { LangSwitcher } from '@/components/client/LangSwitcher'
import { buttonVariants } from '@/components/ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <MotionSection direction="left" delay={0.2}>
            <Link href={`/${lang}`} className="text-2xl font-bold text-gray-900 dark:text-white">
              IKH-TechSystems
            </Link>
          </MotionSection>
          
          <MotionSection direction="right" delay={0.4}>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <Link 
                  href={`/${lang}/about`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.common.navigation.about}
                </Link>
                <Link 
                  href={`/${lang}/services`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.common.navigation.services}
                </Link>
                <Link 
                  href={`/${lang}/contacts`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.common.navigation.contact}
                </Link>
              </div>
              <LangSwitcher currentLang={lang} />
            </div>
          </MotionSection>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <MotionStagger className="space-y-8" staggerDelay={0.2}>
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
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${lang}/contacts`}
              className={cn(buttonVariants({ size: "xl" }))}
            >
              {t.hero.cta.primary}
            </Link>
            <Link
              href={`/${lang}/about`}
              className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
            >
              {t.hero.cta.secondary}
            </Link>
          </div>
        </MotionStagger>
      </div>

      {/* Scroll indicator */}
      <MotionSection 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        direction="up"
        delay={1.5}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
          <span className="text-sm">{t.common.actions.learnMore}</span>
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </MotionSection>
    </section>
  )
}