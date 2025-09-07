// ISR configuration
export const revalidate = 86400 // 24 hours

interface PageProps {
  params: Promise<{ lang: string }>
}

const translations = {
  cs: {
    title: 'Naše služby',
    subtitle: 'Kompletní spektrum IT služeb',
    services: [
      {
        title: 'Webový vývoj',
        description: 'Vytváříme moderní webové aplikace s nejnovějšími technologiemi',
        features: ['React/Next.js', 'TypeScript', 'Tailwind CSS', 'API integrace']
      },
      {
        title: 'Mobilní aplikace',
        description: 'Nativní a cross-platform mobilní aplikace',
        features: ['React Native', 'iOS/Android', 'UI/UX Design', 'App Store publikování']
      },
      {
        title: 'IT konzultace',
        description: 'Strategické poradenství a technické řešení',
        features: ['Architektura', 'Code review', 'Optimalizace výkonu', 'Technické audity']
      }
    ]
  },
  en: {
    title: 'Our Services',
    subtitle: 'Complete spectrum of IT services',
    services: [
      {
        title: 'Web Development',
        description: 'We create modern web applications with the latest technologies',
        features: ['React/Next.js', 'TypeScript', 'Tailwind CSS', 'API Integration']
      },
      {
        title: 'Mobile Applications',
        description: 'Native and cross-platform mobile applications',
        features: ['React Native', 'iOS/Android', 'UI/UX Design', 'App Store Publishing']
      },
      {
        title: 'IT Consulting',
        description: 'Strategic consulting and technical solutions',
        features: ['Architecture', 'Code Review', 'Performance Optimization', 'Technical Audits']
      }
    ]
  },
  de: {
    title: 'Unsere Dienstleistungen',
    subtitle: 'Vollständiges Spektrum von IT-Dienstleistungen',
    services: [
      {
        title: 'Webentwicklung',
        description: 'Wir erstellen moderne Webanwendungen mit den neuesten Technologien',
        features: ['React/Next.js', 'TypeScript', 'Tailwind CSS', 'API-Integration']
      },
      {
        title: 'Mobile Anwendungen',
        description: 'Native und plattformübergreifende mobile Anwendungen',
        features: ['React Native', 'iOS/Android', 'UI/UX Design', 'App Store Veröffentlichung']
      },
      {
        title: 'IT-Beratung',
        description: 'Strategische Beratung und technische Lösungen',
        features: ['Architektur', 'Code Review', 'Performance-Optimierung', 'Technische Audits']
      }
    ]
  }
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params
  const t = translations[lang as keyof typeof translations] || translations.en

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600">
            {t.subtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.services.map((service, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}