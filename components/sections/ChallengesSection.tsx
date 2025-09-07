import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { MotionSection, MotionStagger } from '@/components/client/MotionSection'
import { Monitor, Smartphone, Settings } from 'lucide-react'

interface ChallengesSectionProps {
  lang: Language
}

const challengeIcons = [Monitor, Smartphone, Settings]

export function ChallengesSection({ lang }: ChallengesSectionProps) {
  const t = getTranslation(lang)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <MotionSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.challenges.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.challenges.subtitle}
          </p>
        </MotionSection>

        <MotionStagger className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {t.challenges.items.map((challenge, index) => {
            const IconComponent = challengeIcons[index] || Monitor
            
            return (
              <div key={index} className="relative group">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {challenge.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            )
          })}
        </MotionStagger>

        {/* Bottom CTA */}
        <MotionSection className="text-center mt-16" delay={0.8}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.common.actions.getStarted}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t.hero.description}
            </p>
            <Link 
              href={`/${lang}/contacts`}
              className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {t.common.actions.contactUs}
            </Link>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}

import Link from 'next/link'