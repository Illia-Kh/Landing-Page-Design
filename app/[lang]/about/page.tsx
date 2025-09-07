// ISR configuration
export const revalidate = 86400 // 24 hours

interface PageProps {
  params: Promise<{ lang: string }>
}

const translations = {
  cs: {
    title: 'O nás',
    subtitle: 'Poznáte nás lépe',
    description: 'Jsme tým vývojářů zaměřený na moderní webové technologie a inovace.',
    mission: 'Naše mise',
    missionText: 'Vytváříme moderní webové aplikace s důrazem na výkon, přístupnost a uživatelskou zkušenost.',
    vision: 'Naše vize',
    visionText: 'Být předním poskytovatelem webových řešení s využitím nejnovějších technologií.'
  },
  en: {
    title: 'About Us',
    subtitle: 'Get to know us better',
    description: 'We are a team of developers focused on modern web technologies and innovations.',
    mission: 'Our Mission',
    missionText: 'We create modern web applications with emphasis on performance, accessibility, and user experience.',
    vision: 'Our Vision',
    visionText: 'To be a leading provider of web solutions using the latest technologies.'
  },
  de: {
    title: 'Über uns',
    subtitle: 'Lernen Sie uns besser kennen',
    description: 'Wir sind ein Team von Entwicklern, das sich auf moderne Webtechnologien und Innovationen konzentriert.',
    mission: 'Unsere Mission',
    missionText: 'Wir erstellen moderne Webanwendungen mit Schwerpunkt auf Leistung, Zugänglichkeit und Benutzererfahrung.',
    vision: 'Unsere Vision',
    visionText: 'Ein führender Anbieter von Weblösungen mit den neuesten Technologien zu sein.'
  }
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params
  const t = translations[lang as keyof typeof translations] || translations.en

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            {t.subtitle}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.mission}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t.missionText}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.vision}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t.visionText}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}