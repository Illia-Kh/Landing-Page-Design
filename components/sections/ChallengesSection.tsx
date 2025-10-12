import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import MotionSectionClient from '@/components/client/MotionSectionClient'
import MotionStaggerClient from '@/components/client/MotionStaggerClient'
import { Wallet, Users, Rocket, Shield } from 'lucide-react'

interface ChallengesSectionProps {
  lang: Language
}

const challengeIcons = [Wallet, Users, Rocket, Shield]

export function ChallengesSection({ lang }: ChallengesSectionProps) {
  const t = getTranslation(lang)

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="section-container">
        <MotionSectionClient className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.challenges.title}
          </h2>
        </MotionSectionClient>

        <MotionStaggerClient className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
          {t.challenges.items.map((challenge, index) => {
            const IconComponent = challengeIcons[index] || Wallet
            
            return (
              <div key={index} className="group h-full">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {challenge.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </MotionStaggerClient>
      </div>
    </section>
  )
}