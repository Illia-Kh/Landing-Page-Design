import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { StructuredData } from '@/components/StructuredData'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the Privacy Policy page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  const canonicalUrl = getLocalizedUrl('/privacy-policy', lang as Language)
  
  return {
    title: t.privacy.title,
    description: t.privacy.description || 'Full-stack web solutions, system integration and automation in Czechia.',
    keywords: t.privacy.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en/privacy-policy`,
        'cs-CZ': `${baseUrl}/cs/privacy-policy`,
        'de-DE': `${baseUrl}/de/privacy-policy`,
        'uk-UA': `${baseUrl}/ua/privacy-policy`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : lang === 'de' ? 'de_DE' : 'uk_UA',
      url: canonicalUrl,
      siteName: 'IKH Systems',
      title: t.privacy.title,
      description: t.privacy.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.privacy.title,
      description: t.privacy.description,
    },
  }
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
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
              {t.privacy.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.privacy.lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.privacy.introduction.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.privacy.introduction.content}
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.privacy.informationCollection.title}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.privacy.informationCollection.personal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t.privacy.informationCollection.personal.content}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.privacy.informationCollection.automatic.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t.privacy.informationCollection.automatic.content}
                    </p>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.privacy.usage.title}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {t.privacy.usage.purposes.map((purpose, index) => (
                    <li key={index}>{purpose}</li>
                  ))}
                </ul>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.cookies.introduction.content}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.cookies.types.necessary.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t.cookies.types.necessary.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.cookies.types.analytics.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t.cookies.types.analytics.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.cookies.types.marketing.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t.cookies.types.marketing.description}
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.privacy.dataSharing.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.privacy.dataSharing.content}
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.privacy.dataSecurity.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.privacy.dataSecurity.content}
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.privacy.yourRights.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.privacy.yourRights.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {t.privacy.yourRights.rights.map((right, index) => (
                    <li key={index}>{right}</li>
                  ))}
                </ul>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.privacy.contact.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.privacy.contact.content}
                </p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-900 dark:text-white font-medium">
                    {t.privacy.contact.email}
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {t.privacy.contact.phone}
                  </p>
                </div>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.privacy.changes.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.privacy.changes.content}
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
          name: t.privacy.title,
          description: t.privacy.description,
          url: getLocalizedUrl('/privacy-policy', lang as Language)
        }}
      />
    </>
  )
}
