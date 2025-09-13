import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { MotionSection, MotionStagger } from '@/components/client/MotionSection'
import { StructuredData } from '@/components/StructuredData'
import { Code, Smartphone, Layers, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { env } from '@/lib/env'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the services page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const baseUrl = env.NEXT_PUBLIC_SITE_URL
  const canonicalUrl = getLocalizedUrl('/services', lang as Language)
  
  return {
    title: t.seo.services.title,
    description: t.seo.services.description,
    keywords: t.seo.services.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en/services`,
        'cs-CZ': `${baseUrl}/cs/services`,
        'de-DE': `${baseUrl}/de/services`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : 'de_DE',
      url: canonicalUrl,
      siteName: 'IKH-TechSystems',
      title: t.seo.services.title,
      description: t.seo.services.description,
      images: [
        {
          url: `${baseUrl}/og-services.jpg`,
          width: 1200,
          height: 630,
          alt: t.seo.services.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.services.title,
      description: t.seo.services.description,
      images: [`${baseUrl}/og-services.jpg`],
    },
  }
}

const serviceIcons = [Code, Smartphone, Layers]

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Structured Data for Services */}
      {t.services.items.map((service, index) => (
        <StructuredData
          key={index}
          type="Service"
          lang={lang as Language}
          serviceData={{
            name: service.title,
            description: service.description,
          }}
        />
      ))}
      

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <MotionSection className="text-center max-w-4xl mx-auto" immediate={true}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t.services.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.services.subtitle}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <MotionStagger className="grid gap-12" staggerDelay={0.3}>
            {t.services.items.map((service, index) => {
              const IconComponent = serviceIcons[index] || Code
              const isEven = index % 2 === 0
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  {/* Icon & Visual */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-2xl">
                        <IconComponent className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-900">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-2 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                      {service.title}
                    </h2>
                    
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link
                      href={`/${lang}/contacts`}
                      className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      {t.common.actions.getStarted}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </MotionStagger>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <MotionSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.challenges.subtitle}
            </h2>
          </MotionSection>

          <MotionStagger className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
            {t.challenges.items.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg">
                    {index + 1}
                  </div>
                  {index < t.challenges.items.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <MotionSection className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t.common.actions.getStarted}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t.hero.description}
              </p>
              <Link
                href={`/${lang}/contacts`}
                className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {t.common.actions.contactUs}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </MotionSection>
        </div>
      </section>
    </div>
  )
}