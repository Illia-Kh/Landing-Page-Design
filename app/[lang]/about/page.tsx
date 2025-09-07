import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { MotionSection, MotionStagger } from '@/components/client/MotionSection'
import { Target, Lightbulb, Award } from 'lucide-react'
import Link from 'next/link'
import { env } from '@/lib/utils/env'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the about page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const baseUrl = env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  const canonicalUrl = getLocalizedUrl('/about', lang as Language)
  
  return {
    title: t.seo.about.title,
    description: t.seo.about.description,
    keywords: t.seo.about.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en/about`,
        'cs-CZ': `${baseUrl}/cs/about`,
        'de-DE': `${baseUrl}/de/about`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : 'de_DE',
      url: canonicalUrl,
      siteName: 'IKH-TechSystems',
      title: t.seo.about.title,
      description: t.seo.about.description,
      images: [
        {
          url: `${baseUrl}/og-about.jpg`,
          width: 1200,
          height: 630,
          alt: t.seo.about.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.about.title,
      description: t.seo.about.description,
      images: [`${baseUrl}/og-about.jpg`],
    },
  }
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)

  const sections = [
    {
      icon: Target,
      title: t.about.mission.title,
      description: t.about.mission.description,
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Lightbulb,
      title: t.about.innovations.title,
      description: t.about.innovations.description,
      color: 'from-green-500 to-blue-600'
    },
    {
      icon: Award,
      title: t.about.achievements.title,
      description: t.about.achievements.description,
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-bold text-gray-900 dark:text-white">
            IKH-TechSystems
          </Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t.common.navigation.home}
            </Link>
            <Link href={`/${lang}/services`} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t.common.navigation.services}
            </Link>
            <Link href={`/${lang}/contacts`} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t.common.navigation.contact}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <MotionSection className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t.about.title}
            </h1>
            <h2 className="text-2xl md:text-3xl text-gradient mb-8">
              {t.about.subtitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.about.description}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <MotionStagger className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
            {sections.map((section, index) => {
              const IconComponent = section.icon
              
              return (
                <div key={index} className="group">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                    <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${section.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {section.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </MotionStagger>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <MotionSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.about.team.title}
            </h2>
          </MotionSection>

          <MotionStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto" staggerDelay={0.15}>
            {t.about.team.members.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {member.name.charAt(0)}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {member.experience}
                    </p>
                  </div>
                </div>
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${lang}/contacts`}
                  className="px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {t.common.actions.contactUs}
                </Link>
                <Link
                  href={`/${lang}/services`}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                >
                  {t.common.navigation.services}
                </Link>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>
    </div>
  )
}