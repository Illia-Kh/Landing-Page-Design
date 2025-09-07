// ISR configuration
export const revalidate = 86400 // 24 hours

interface PageProps {
  params: Promise<{ lang: string }>
}

const translations = {
  cs: {
    title: 'Kontaktujte nás',
    subtitle: 'Rádi s vámi budeme spolupracovat',
    email: 'E-mail',
    phone: 'Telefon',
    address: 'Adresa',
    contactInfo: {
      email: 'info@example.com',
      phone: '+420 123 456 789',
      address: 'Praha, Česká republika'
    },
    form: {
      name: 'Jméno',
      email: 'E-mail',
      message: 'Zpráva',
      send: 'Odeslat zprávu'
    }
  },
  en: {
    title: 'Contact Us',
    subtitle: 'We would love to work with you',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    contactInfo: {
      email: 'info@example.com',
      phone: '+44 123 456 789',
      address: 'London, United Kingdom'
    },
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message'
    }
  },
  de: {
    title: 'Kontaktieren Sie uns',
    subtitle: 'Wir würden gerne mit Ihnen zusammenarbeiten',
    email: 'E-Mail',
    phone: 'Telefon',
    address: 'Adresse',
    contactInfo: {
      email: 'info@example.com',
      phone: '+49 123 456 789',
      address: 'Berlin, Deutschland'
    },
    form: {
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Nachricht senden'
    }
  }
}

export default async function ContactsPage({ params }: PageProps) {
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

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.email}</h4>
                  <p className="text-gray-600">{t.contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.phone}</h4>
                  <p className="text-gray-600">{t.contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.address}</h4>
                  <p className="text-gray-600">{t.contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Send us a message
            </h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {t.form.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}