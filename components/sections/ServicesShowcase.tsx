import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import MotionSectionClient from '@/components/client/MotionSectionClient'
import MotionStaggerClient from '@/components/client/MotionStaggerClient'
import { Code, Smartphone, Layers, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ServicesShowcaseProps {
  lang: Language
}

const serviceIcons = {
  web: Code,
  mobile: Smartphone,
  integration: Layers,
}

export function ServicesShowcase({ lang }: ServicesShowcaseProps) {
  const t = getTranslation(lang)

  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div className="section-container">
        <MotionSectionClient className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.services.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </MotionSectionClient>

        <MotionStaggerClient className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
          {t.services.items.map((service, index) => {
            const IconComponent = Object.values(serviceIcons)[index] || Code
            
            return (
              <Link
                key={index}
                href={`/${lang}/services#service-${index + 1}`}
                className="group relative p-8 bg-gradient-secondary rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            )
          })}
        </MotionStaggerClient>

        <MotionSectionClient className="text-center mt-16" delay={0.6}>
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {t.common.actions.learnMore}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </MotionSectionClient>
      </div>
    </section>
  )
}