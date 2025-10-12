import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, getLocalizedUrl } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { StructuredData } from '@/components/StructuredData'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the Cookie Policy page
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const t = getTranslation(lang as Language)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  const canonicalUrl = getLocalizedUrl('/cookie-policy', lang as Language)
  
  return {
    title: t.cookies.title,
    description: t.cookies.description || 'Full-stack web solutions, system integration and automation in Czechia.',
    keywords: t.cookies.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en/cookie-policy`,
        'cs-CZ': `${baseUrl}/cs/cookie-policy`,
        'de-DE': `${baseUrl}/de/cookie-policy`,
        'uk-UA': `${baseUrl}/ua/cookie-policy`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : lang === 'cs' ? 'cs_CZ' : lang === 'de' ? 'de_DE' : 'uk_UA',
      url: canonicalUrl,
      siteName: 'IKH Systems',
      title: t.cookies.title,
      description: t.cookies.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.cookies.title,
      description: t.cookies.description,
    },
  }
}

export default async function CookiePolicyPage({ params }: PageProps) {
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
              {t.cookies.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.cookies.lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.introduction.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.cookies.introduction.content}
                </p>
              </section>

              {/* What Are Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.whatAre.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.cookies.whatAre.content}
                </p>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.types.title}
                </h2>
                
                <div className="space-y-6">
                  {/* Necessary Cookies */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      {t.cookies.types.necessary.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                      {t.cookies.types.necessary.description}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Examples:</strong> {t.cookies.types.necessary.examples}
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      {t.cookies.types.analytics.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                      {t.cookies.types.analytics.description}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Examples:</strong> {t.cookies.types.analytics.examples}
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                      {t.cookies.types.marketing.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                      {t.cookies.types.marketing.description}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Examples:</strong> {t.cookies.types.marketing.examples}
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.usage.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.cookies.usage.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {t.cookies.usage.purposes.map((purpose, index) => (
                    <li key={index}>{purpose}</li>
                  ))}
                </ul>
              </section>

              {/* Managing Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.managing.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.cookies.managing.content}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.cookies.managing.browser.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t.cookies.managing.browser.content}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t.cookies.managing.ourSite.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t.cookies.managing.ourSite.content}
                    </p>
                  </div>
                </div>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.thirdParty.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.cookies.thirdParty.content}
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                          {t.cookies.thirdParty.table.service}
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                          {t.cookies.thirdParty.table.purpose}
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                          {t.cookies.thirdParty.table.privacy}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.cookies.thirdParty.services.map((service, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white">
                            {service.name}
                          </td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-300">
                            {service.purpose}
                          </td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                            <a 
                              href={service.privacyUrl}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t.cookies.thirdParty.table.privacyLink}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Cookie Duration */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.duration.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.cookies.duration.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {t.cookies.duration.types.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
              </section>

              {/* Updates to Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.updates.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.cookies.updates.content}
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.cookies.contact.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.cookies.contact.content}
                </p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-900 dark:text-white font-medium">
                    {t.cookies.contact.email}
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {t.cookies.contact.phone}
                  </p>
                </div>
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
          name: t.cookies.title,
          description: t.cookies.description,
          url: getLocalizedUrl('/cookie-policy', lang as Language)
        }}
      />
    </>
  )
}
