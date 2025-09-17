import Link from 'next/link'
import type { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'

interface LocationPageProps {
  city: string
  slug: string
  title: string
  description: string
  lang: Language
}

export default function LocationPage({
  city: _city,
  slug: _slug,
  title,
  description,
  lang
}: LocationPageProps) {
  const t = getTranslation(lang)
  
  return (
    <main className="max-w-4xl mx-auto container-padding py-8 sm:py-12">
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
        
        <div className="pt-4">
          <Link
            href={`/${lang}/contacts`}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {t.common.actions.contactUs}
          </Link>
        </div>
      </div>
    </main>
  )
}
