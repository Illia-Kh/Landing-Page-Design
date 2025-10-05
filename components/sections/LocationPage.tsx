import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import type { Language } from '@/types'

interface LocationPageProps {
  city: string
  slug: string
  title: string
  description: string
  lang: Language
}

export default function LocationPage({
  city,
  slug,
  title: _title,
  description: _description,
  lang
}: LocationPageProps) {
  
  // Location-specific data
  const locationData = {
    praha: {
      districts: ['Praha 1', 'Praha 2', 'Praha 3', 'Praha 4', 'Praha 5', 'Praha 6', 'Praha 7', 'Praha 8', 'Praha 9', 'Praha 10', 'Smíchov', 'Vinohrady', 'Žižkov', 'Karlín', 'Holešovice'],
      sector: 'IT služby',
      metric: '65',
      weeks: '8',
      pricing: { web: '20 000 Kč', systems: '50 000 Kč', maintenance: '12 000 Kč' }
    },
    brno: {
      districts: ['Brno-střed', 'Brno-sever', 'Brno-jih', 'Brno-východ', 'Brno-západ', 'Žabovřesky', 'Královo Pole', 'Černovice', 'Bystrc', 'Komín'],
      sector: 'výrobní technologie',
      metric: '58',
      weeks: '6',
      pricing: { web: '20 000 Kč', systems: '50 000 Kč', maintenance: '12 000 Kč' }
    },
    ostrava: {
      districts: ['Moravská Ostrava', 'Přívoz', 'Vítkovice', 'Hrabůvka', 'Zábřeh', 'Poruba', 'Radvanice', 'Mariánské Hory', 'Hulváky', 'Michálkovice'],
      sector: 'těžký průmysl',
      metric: '52',
      weeks: '7',
      pricing: { web: '20 000 Kč', systems: '50 000 Kč', maintenance: '12 000 Kč' }
    },
    plzen: {
      districts: ['Plzeň 1', 'Plzeň 2', 'Plzeň 3', 'Bolevec', 'Skvrňany', 'Doubravka', 'Lobzy', 'Božkov', 'Křimice', 'Radčice'],
      sector: 'strojírenství',
      metric: '48',
      weeks: '6',
      pricing: { web: '20 000 Kč', systems: '50 000 Kč', maintenance: '12 000 Kč' }
    },
    liberec: {
      districts: ['Liberec 1', 'Liberec 2', 'Liberec 3', 'Liberec 4', 'Liberec 5', 'Rochlice', 'Františkov', 'Ruprechtice', 'Starý Harcov', 'Nový Harcov'],
      sector: 'textilní průmysl',
      metric: '45',
      weeks: '5',
      pricing: { web: '20 000 Kč', systems: '50 000 Kč', maintenance: '12 000 Kč' }
    }
  }

  const data = locationData[slug as keyof typeof locationData] || locationData.praha

  return (
    <main className="max-w-7xl mx-auto container-padding py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Moderní inženýrství a webové systémy v {city}
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
          Systémový přístup k digitální infrastruktuře pro {city.toLowerCase()} firmy usilující o měřitelný růst a provozní efektivitu.
        </p>
        
        <div className="flex justify-center">
          <Link
            href={`/${lang}/contacts`}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold rounded-lg transition-colors duration-200"
          >
            Získat bezplatnou konzultaci
          </Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Hodnotová propozice
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Systémový přístup',
              description: 'Integrovaná digitální infrastruktura, ne izolovaná řešení'
            },
            {
              title: 'Lokální kontext',
              description: `Hluboké pochopení ${city.toLowerCase()} podnikatelského prostředí napříč ${data.districts.slice(0, 3).join(', ')}`
            },
            {
              title: 'Rychlost a spolehlivost',
              description: 'Optimalizace Core Web Vitals, záruka 99.9% dostupnosti'
            },
            {
              title: 'Měřitelný růst',
              description: 'Výsledky založené na datech s jasným sledováním ROI'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Přehled služeb
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Webové stránky',
            'E-commerce',
            'Lokální SEO',
            'Media buying',
            'Automatizace',
            'Analytika'
          ].map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {service}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {service === 'Webové stránky' && 'Na míru vytvořené, výkonově optimalizované podnikové weby'}
                {service === 'E-commerce' && 'Škálovatelné online obchody s integrací plateb'}
                {service === 'Lokální SEO' && `Viditelnost ve vyhledávání zaměřená na ${city} a Google My Business`}
                {service === 'Media buying' && 'Cílené reklamní kampaně pro české trhy'}
                {service === 'Automatizace' && 'Optimalizace pracovních procesů a digitalizace procesů'}
                {service === 'Analytika' && 'Komplexní sledování a business intelligence'}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* Process */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Proces
        </h2>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            'Objevování',
            'Strategie', 
            'Vývoj',
            'Spuštění',
            'Růst'
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {step}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {step === 'Objevování' && 'Analýza podnikání a technický audit'}
                {step === 'Strategie' && 'Vlastní digitální roadmapa s jasnými milníky'}
                {step === 'Vývoj' && 'Agilní implementace s pravidelnými kontrolními body'}
                {step === 'Spuštění' && 'Optimalizace výkonu a posílení bezpečnosti'}
                {step === 'Růst' && 'Kontinuální monitoring a iterativní vylepšení'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Ceník
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Webový vývoj
            </h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">
              Od {data.pricing.web}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Na míru vytvořené, výkonově optimalizované podnikové weby
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Digitální systémy
            </h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">
              Od {data.pricing.systems}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Komplexní digitální infrastruktura a automatizace
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Plány údržby
            </h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">
              Od {data.pricing.maintenance}/měsíc
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Měsíční údržba a optimalizace
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Často kladené otázky
        </h2>
        <div className="space-y-6">
          {[
            {
              q: `Jak rychle můžete vytvořit web pro mou ${city.toLowerCase()} firmu?`,
              a: 'Standardní podnikové weby se obvykle spouštějí během 3-4 týdnů. Složité e-shopy nebo vlastní systémy mohou vyžadovat 6-8 týdnů v závislosti na požadavcích.'
            },
            {
              q: `Poskytujete průběžnou podporu pro firmy v ${city}?`,
              a: `Ano, nabízíme komplexní balíčky údržby včetně aktualizací, bezpečnostního monitoringu a optimalizace výkonu specificky přizpůsobené podmínkám ${city.toLowerCase()} trhu.`
            },
            {
              q: `Můžete pomoci s lokálním SEO pro ${city}?`,
              a: `Absolutně. Optimalizujeme pro ${city.toLowerCase()} klíčová slova, spravujeme Google My Business výpisy a implementujeme lokální schema markup pro zlepšení viditelnosti ve výsledcích vyhledávání ${city}.`
            },
            {
              q: `Co dělá váš přístup jiným pro ${city.toLowerCase()} firmy?`,
              a: `Rozumíme ${city.toLowerCase()} podnikatelské ekosystému, lokální konkurenci a regionální tržní dynamice. Naše řešení jsou navržena pro českou legislativu a lokální vzorce chování zákazníků.`
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center bg-blue-50 dark:bg-blue-900/20 p-12 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Pojďme vytvořit váš další systém v {city}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Připraveni transformovat svou {city.toLowerCase()} firmu moderní digitální infrastrukturou? 
          Náš inženýrský přístup přináší měřitelné výsledky.
        </p>
        <div className="flex justify-center">
          <Link
            href={`/${lang}/contacts`}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold rounded-lg transition-colors duration-200"
          >
            Získat bezplatnou konzultaci
          </Link>
        </div>
      </section>
    </main>
  )
}
