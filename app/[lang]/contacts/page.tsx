import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { MotionSection, MotionStagger } from '@/components/client/MotionSection'
import { ContactForm } from '@/components/client/ContactForm'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { env } from '@/lib/env'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the contacts page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const baseUrl = env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  const canonicalUrl = getLocalizedUrl('/contacts', lang as Language)
  
  return {
    title: t.seo.contact.title,
    description: t.seo.contact.description,
    keywords: t.seo.contact.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en/contacts`,
        'cs-CZ': `${baseUrl}/cs/contacts`,
        'de-DE': `${baseUrl}/de/contacts`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : 'de_DE',
      url: canonicalUrl,
      siteName: 'IKH-TechSystems',
      title: t.seo.contact.title,
      description: t.seo.contact.description,
      images: [
        {
          url: `${baseUrl}/og-contact.jpg`,
          width: 1200,
          height: 630,
          alt: t.seo.contact.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.contact.title,
      description: t.seo.contact.description,
      images: [`${baseUrl}/og-contact.jpg`],
    },
  }
}

export default async function ContactsPage({ params }: PageProps) {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.form.email.label,
      value: t.contact.info.email,
      href: `mailto:${t.contact.info.email}`,
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: t.contact.info.phone,
      href: `tel:${t.contact.info.phone.replace(/\s/g, '')}`,
      color: 'from-green-500 to-blue-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: t.contact.info.address,
      href: 'https://maps.google.com/?q=Prague,Czech+Republic',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon-Fri 9:00-18:00 CET',
      href: null,
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <MotionSection className="text-center max-w-4xl mx-auto" immediate={true}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t.contact.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.contact.subtitle}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <MotionStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" staggerDelay={0.1}>
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              
              return (
                <div key={index} className="group">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {info.label}
                    </h3>
                    
                    {info.href ? (
                      <a 
                        href={info.href}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </MotionStagger>

          {/* Contact Form Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <MotionSection direction="left">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.common.actions.contactUs}
                </h2>
                <ContactForm lang={lang as Language} />
              </div>
            </MotionSection>

            {/* Additional Info */}
            <MotionSection direction="right" delay={0.3}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.common.actions.getStarted}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {t.hero.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We&rsquo;re here to help you transform your ideas into reality. Get in touch with us today!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Why Choose Us?
                  </h4>
                  <ul className="space-y-3">
                    {[
                      '5+ years of experience',
                      'Modern technology stack',
                      'Personalized approach',
                      'Quality assurance'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${lang}/services`}
                    className="flex-1 px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    {t.common.navigation.services}
                  </Link>
                  <Link
                    href={`/${lang}/about`}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-center hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    {t.common.navigation.about}
                  </Link>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>
    </div>
  )
}