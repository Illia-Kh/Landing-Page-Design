// ISR configuration
export const revalidate = 86400 // 24 hours

interface PageProps {
  params: Promise<{ lang: string }>
}

const translations = {
  cs: {
    title: 'Vítejte na naší stránce',
    subtitle: 'Moderní webové řešení s Next.js 15',
    description: 'Toto je domovská stránka vytvořená pomocí Next.js 15 App Router s podporou i18n a SSG/ISR.'
  },
  en: {
    title: 'Welcome to our website',
    subtitle: 'Modern web solution with Next.js 15',
    description: 'This is the home page built with Next.js 15 App Router with i18n support and SSG/ISR.'
  },
  de: {
    title: 'Willkommen auf unserer Website',
    subtitle: 'Moderne Weblösung mit Next.js 15',
    description: 'Dies ist die Startseite, die mit Next.js 15 App Router mit i18n-Unterstützung und SSG/ISR erstellt wurde.'
  }
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const t = translations[lang as keyof typeof translations] || translations.en

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {t.title}
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
          {t.subtitle}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t.description}
        </p>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Next.js 15</h3>
            <p className="text-gray-600">Latest App Router with Server Components</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">TypeScript</h3>
            <p className="text-gray-600">Type-safe development experience</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Tailwind CSS</h3>
            <p className="text-gray-600">Utility-first CSS framework</p>
          </div>
        </div>
      </div>
    </main>
  )
}