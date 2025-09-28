import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { MotionSection, MotionStagger } from '@/components/client/MotionSection'
import { StructuredData } from '@/components/StructuredData'
import { Code, Layers, CheckCircle, ArrowRight, BarChart3, Shield, Server, Globe, Database, Monitor, Smartphone as Mobile, Settings, Zap, Cloud, HardDrive } from 'lucide-react'
import Link from 'next/link'
import { env } from '@/lib/env'
import { AnchorHandler } from '@/components/client/AnchorHandler'

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
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : lang === 'de' ? 'de_DE' : 'uk_UA',
      url: canonicalUrl,
      siteName: 'IKH-TechSystems',
      title: t.seo.services.title,
      description: t.seo.services.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.services.title,
      description: t.seo.services.description,
    },
  }
}

// Icons for the 6 main service blocks
const serviceBlockIcons = [
  Code,        // Web Development
  Mobile,      // Mobile Development  
  Settings,    // System Integration
  BarChart3,   // Analytics & Insights
  Shield,      // Cybersecurity
  Server       // Infrastructure
]

// Icons for features within each block
const featureIcons = {
  web: [Monitor, Code, Database, Globe],
  mobile: [Mobile, Zap, Settings, BarChart3],
  integration: [Settings, Layers, Cloud, HardDrive],
  analytics: [BarChart3, Database, Code, Globe],
  cybersecurity: [Shield, BarChart3, Layers, CheckCircle],
  infrastructure: [Server, BarChart3, Database, Globe]
}


export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Anchor Handler for smooth scrolling */}
      <AnchorHandler />
      
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
      <section className="section-padding bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="section-container">
          <MotionSection className="text-center max-w-4xl mx-auto" immediate={true}>
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium mb-4">
              <Code className="w-4 h-4 mr-2" />
              {t.services.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.services.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.services.subtitle}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* All Services - Unified Grid */}
      <section className="section-spacing">
        <div className="section-container">
          <div className="space-y-12">
            {/* First 3 blocks from services.items */}
            {t.services.items.map((service, index) => {
              const IconComponent = serviceBlockIcons[index] || Code
              const isEven = index % 2 === 0
              
              // Define different gradient backgrounds and colors for each service
              const serviceStyles = [
                {
                  gradient: "bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900",
                  badgeColor: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
                  iconBg: "bg-purple-500",
                  iconColor: "text-purple-500"
                },
                {
                  gradient: "bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-800 dark:to-gray-900",
                  badgeColor: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200",
                  iconBg: "bg-orange-500",
                  iconColor: "text-orange-500"
                },
                {
                  gradient: "bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-800 dark:to-gray-900",
                  badgeColor: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200",
                  iconBg: "bg-cyan-500",
                  iconColor: "text-cyan-500"
                }
              ]
              
              const currentStyle = serviceStyles[index] || serviceStyles[0]
              const blockIcons: (keyof typeof featureIcons)[] = ['web', 'mobile', 'integration']
              const currentBlockIcons = featureIcons[blockIcons[index]] || featureIcons.web
              
              return (
                <MotionSection key={index} delay={index * 0.1}>
                  <div id={`service-${index + 1}`} className={`${currentStyle.gradient} unified-service-block scroll-to-center`}>
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                    {/* Content */}
                    <div className="unified-content">
                      <MotionSection className="mb-8" delay={0.1}>
                        <div className={`unified-badge ${currentStyle.badgeColor}`}>
                          <IconComponent className="w-4 h-4 mr-2" />
                          {service.title}
                        </div>
                        <h2 className="unified-title">
                          {service.title}
                        </h2>
                        <p className="unified-description">
                          {service.description}
                        </p>
                      </MotionSection>

                      <MotionStagger className="unified-features" staggerDelay={0.2}>
                        {service.features.map((_, featureIndex) => {
                          const FeatureIcon = currentBlockIcons[featureIndex] || CheckCircle
                          
                          // Use translated detailed features
                          const detailedFeatures = [
                            t.services.detailedFeatures.web,
                            t.services.detailedFeatures.mobile,
                            t.services.detailedFeatures.integration
                          ]
                          
                          const currentDetailedFeatures = detailedFeatures[index] || detailedFeatures[0]
                          const detailedFeature = currentDetailedFeatures[featureIndex]
                          
                          return (
                            <div key={featureIndex} className="unified-feature-item">
                              <div className={`unified-feature-icon ${currentStyle.iconBg}`}>
                                <FeatureIcon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="unified-feature-text">{detailedFeature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{detailedFeature.description}</p>
                              </div>
                            </div>
                          )
                        })}
                      </MotionStagger>

                      <MotionSection delay={0.4}>
                        <Link href={`/${lang}/contacts`} className="unified-cta">
                          {t.common.actions.getStarted}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </MotionSection>
                    </div>

                    {/* Visual */}
                    <div className="unified-visual">
                      <MotionSection delay={0.3}>
                        <div className="relative">
                          <div className="unified-visual-icon">
                            <IconComponent className="w-16 h-16 text-white" />
                          </div>
                          <div className="unified-visual-number">
                            <span className="text-sm font-bold text-gray-900">{index + 1}</span>
                          </div>
                        </div>
                      </MotionSection>
                    </div>
                  </div>
                  </div>
                </MotionSection>
              )
            })}

            {/* Analytics & Insights Block */}
            <MotionSection delay={0.3}>
              <div id="analytics" className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-800 dark:to-gray-900 unified-service-block scroll-to-center">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Content */}
                <div className="unified-content">
                  <MotionSection className="mb-8" delay={0.1}>
                    <div className="unified-badge bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      {t.services.analytics.title}
                    </div>
                    <h2 className="unified-title">
                      {t.services.analytics.subtitle}
                    </h2>
                    <p className="unified-description">
                      {t.services.analytics.description}
                    </p>
                  </MotionSection>

                  <MotionStagger className="unified-features" staggerDelay={0.2}>
                    {featureIcons.analytics.map((FeatureIcon, featureIndex) => {
                      const feature = t.services.analytics.features[featureIndex]
                      return (
                        <div key={featureIndex} className="unified-feature-item">
                          <div className="unified-feature-icon bg-blue-500">
                            <FeatureIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="unified-feature-text">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </MotionStagger>

                  <MotionSection delay={0.4}>
                    <Link href={`/${lang}/contacts`} className="unified-cta">
                      {t.services.analytics.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </MotionSection>
                </div>

                {/* Visual */}
                <div className="unified-visual">
                  <MotionSection delay={0.3}>
                    <div className="relative">
                      <div className="unified-visual-icon">
                        <BarChart3 className="w-16 h-16 text-white" />
                      </div>
                      <div className="unified-visual-number">
                        <span className="text-sm font-bold text-gray-900">4</span>
                      </div>
                    </div>
                  </MotionSection>
                </div>
              </div>
              </div>
            </MotionSection>

            {/* Cybersecurity Block */}
            <MotionSection delay={0.4}>
              <div id="cybersecurity" className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 unified-service-block scroll-to-center">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                {/* Content */}
                <div className="unified-content">
                  <MotionSection className="mb-8" delay={0.1}>
                    <div className="unified-badge bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                      <Shield className="w-4 h-4 mr-2" />
                      {t.services.cybersecurity.title}
                    </div>
                    <h2 className="unified-title">
                      {t.services.cybersecurity.subtitle}
                    </h2>
                    <p className="unified-description">
                      {t.services.cybersecurity.description}
                    </p>
                  </MotionSection>

                  <MotionStagger className="unified-features" staggerDelay={0.2}>
                    {featureIcons.cybersecurity.map((FeatureIcon, featureIndex) => {
                      const feature = t.services.cybersecurity.features[featureIndex]
                      return (
                        <div key={featureIndex} className="unified-feature-item">
                          <div className="unified-feature-icon bg-red-500">
                            <FeatureIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="unified-feature-text">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </MotionStagger>

                  <MotionSection delay={0.4}>
                    <Link href={`/${lang}/contacts`} className="unified-cta">
                      {t.services.cybersecurity.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </MotionSection>
                </div>

                {/* Visual */}
                <div className="unified-visual">
                  <MotionSection delay={0.3}>
                    <div className="relative">
                      <div className="unified-visual-icon">
                        <Shield className="w-16 h-16 text-white" />
                      </div>
                      <div className="unified-visual-number">
                        <span className="text-sm font-bold text-gray-900">5</span>
                      </div>
                    </div>
                  </MotionSection>
                </div>
              </div>
              </div>
            </MotionSection>

            {/* Infrastructure Block */}
            <MotionSection delay={0.5}>
              <div id="infrastructure" className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900 unified-service-block scroll-to-center">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Content */}
                <div className="unified-content">
                  <MotionSection className="mb-8" delay={0.1}>
                    <div className="unified-badge bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                      <Server className="w-4 h-4 mr-2" />
                      {t.services.infrastructure.title}
                    </div>
                    <h2 className="unified-title">
                      {t.services.infrastructure.subtitle}
                    </h2>
                    <p className="unified-description">
                      {t.services.infrastructure.description}
                    </p>
                  </MotionSection>

                  <MotionStagger className="unified-features" staggerDelay={0.2}>
                    {featureIcons.infrastructure.map((FeatureIcon, featureIndex) => {
                      const feature = t.services.infrastructure.features[featureIndex]
                      return (
                        <div key={featureIndex} className="unified-feature-item">
                          <div className="unified-feature-icon bg-green-500">
                            <FeatureIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="unified-feature-text">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </MotionStagger>

                  <MotionSection delay={0.4}>
                    <Link href={`/${lang}/contacts`} className="unified-cta">
                      {t.services.infrastructure.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </MotionSection>
                </div>

                {/* Visual */}
                <div className="unified-visual">
                  <MotionSection delay={0.3}>
                    <div className="relative">
                      <div className="unified-visual-icon">
                        <Server className="w-16 h-16 text-white" />
                      </div>
                      <div className="unified-visual-number">
                        <span className="text-sm font-bold text-gray-900">6</span>
                      </div>
                    </div>
                  </MotionSection>
                </div>
              </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

    </div>
  )
}