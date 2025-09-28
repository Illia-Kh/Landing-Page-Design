import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { StructuredData } from '@/components/StructuredData'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the Terms of Service page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  const canonicalUrl = getLocalizedUrl('/terms-of-service', lang as Language)
  
  return {
    title: t.terms.title,
    description: t.terms.description,
    keywords: t.terms.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en/terms-of-service`,
        'cs-CZ': `${baseUrl}/cs/terms-of-service`,
        'de-DE': `${baseUrl}/de/terms-of-service`,
        'uk-UA': `${baseUrl}/ua/terms-of-service`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : lang === 'de' ? 'de_DE' : 'uk_UA',
      url: canonicalUrl,
      siteName: 'IKH Systems',
      title: t.terms.title,
      description: t.terms.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.terms.title,
      description: t.terms.description,
    },
  }
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)
  
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.terms.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.terms.lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.introduction.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.introduction.content}
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.acceptance.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.acceptance.content}
                </p>
              </section>

              {/* Use of Website */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.use.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.terms.use.content}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.terms.use.permitted.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {t.terms.use.permitted.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.terms.use.prohibited.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {t.terms.use.prohibited.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.intellectualProperty.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.terms.intellectualProperty.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {t.terms.intellectualProperty.rights.map((right, index) => (
                    <li key={index}>{right}</li>
                  ))}
                </ul>
              </section>

              {/* Privacy and Data Protection */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.privacy.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.privacy.content}
                </p>
              </section>

              {/* Disclaimer */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.disclaimer.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.terms.disclaimer.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {t.terms.disclaimer.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.limitation.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.limitation.content}
                </p>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.indemnification.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.indemnification.content}
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.termination.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.termination.content}
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.governingLaw.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.governingLaw.content}
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.changes.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.changes.content}
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.contact.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.contact.content}
                </p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-900 dark:text-white font-medium">
                    {t.terms.contact.email}
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {t.terms.contact.phone}
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {t.terms.contact.address}
                  </p>
                </div>
              </section>

              {/* Severability */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.severability.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.severability.content}
                </p>
              </section>

              {/* Entire Agreement */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.terms.entireAgreement.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.terms.entireAgreement.content}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <StructuredData 
        type="WebPage" 
        lang={lang as Language}
        webPageData={{
          name: t.terms.title,
          description: t.terms.description,
          url: getLocalizedUrl('/terms-of-service', lang as Language)
        }}
      />
    </>
  )
}
