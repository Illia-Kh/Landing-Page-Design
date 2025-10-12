import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLanguage, getTranslation, LOCALES, BASE_URL_BY_LOCALE } from '@/lib/i18n'
import { Language, PageProps } from '@/types'
import { MotionSection, MotionStagger } from '@/components/client/MotionSection'
import { ContactForm } from '@/components/client/ContactForm'
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Star, ChevronDown } from 'lucide-react'

// ISR configuration
export const revalidate = 86400 // 24 hours

// Generate metadata for the contacts page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isSupportedLanguage(lang)) return {}
  const t = getTranslation(lang as Language)
  const fallbackBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    const base = (BASE_URL_BY_LOCALE[l] || `${fallbackBase}/${l}`).replace(/\/$/, '')
    languages[l] = `${base}/contacts`
  }
  return {
    title: t.seo.contact.title,
    description: t.seo.contact.description,
    keywords: t.seo.contact.keywords,
    alternates: { canonical: languages[lang], languages },
  }
}

export function generateStaticParams() {
  return [{ lang: 'cs' }, { lang: 'en' }, { lang: 'de' }, { lang: 'ua' }]
}

export default async function ContactsPage({ params }: PageProps) {
  const { lang } = await params
  
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const t = getTranslation(lang as Language)


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="section-container">
          <MotionSection className="text-center max-w-4xl mx-auto" immediate={true}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t.contact.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.contact.subtitle}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Unified Contact Block */}
      <section className="section-padding">
        <div className="section-container">
          <MotionSection className="mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                
                {/* Left Side - Contact Information */}
                <div className="space-y-8">
                  <div className="text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {t.contact.getInTouch.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {t.contact.getInTouch.subtitle}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.contact.getInTouch.labels.email}</p>
                      <a 
                        href={`mailto:${t.contact.info.email}`}
                        className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {t.contact.info.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone with WhatsApp/Telegram */}
                  <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.contact.getInTouch.labels.phone}</p>
                      <a 
                        href={`tel:${t.contact.info.phone.replace(/\s/g, '')}`}
                        className="text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors block mb-2"
                      >
                        {t.contact.info.phone}
                      </a>
                      <div className="flex space-x-2">
                        <a
                          href="https://wa.me/420728209012"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {t.contact.getInTouch.messaging.whatsapp}
                        </a>
                        <button
                          disabled
                          className="inline-flex items-center px-3 py-1 bg-blue-500 opacity-50 text-white text-sm rounded-full cursor-not-allowed"
                          title={t.contact.getInTouch.messaging.comingSoon}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          {t.contact.getInTouch.messaging.telegram}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours with Dropdown */}
                  <div className="relative group">
                    <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.contact.getInTouch.labels.businessHours}</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{t.contact.getInTouch.businessHours.schedule}</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    </div>
                    
                    {/* Dropdown Schedule */}
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{t.contact.getInTouch.businessHours.days.monday}</span>
                          <span className="font-medium text-gray-900 dark:text-white">9:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{t.contact.getInTouch.businessHours.days.tuesday}</span>
                          <span className="font-medium text-gray-900 dark:text-white">9:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{t.contact.getInTouch.businessHours.days.wednesday}</span>
                          <span className="font-medium text-gray-900 dark:text-white">9:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{t.contact.getInTouch.businessHours.days.thursday}</span>
                          <span className="font-medium text-gray-900 dark:text-white">9:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{t.contact.getInTouch.businessHours.days.friday}</span>
                          <span className="font-medium text-gray-900 dark:text-white">9:00 - 17:00</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">{t.contact.getInTouch.businessHours.days.weekend}</span>
                            <span className="font-medium text-red-600 dark:text-red-400">{t.contact.getInTouch.businessHours.closed}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Map */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {t.contact.getInTouch.labels.ourLocation}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Based in Liberec, Czech Republic
                    </p>
                  </div>
                  
                  {/* Embedded Map */}
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80752.01977716171!2d14.96746526130235!3d50.76629277789486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470936999212df43%3A0x400af0f66155990!2z0JvQuNCx0LXRgNC10YY!5e0!3m2!1sru!2scz!4v1758128226339!5m2!1sru!2scz"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-xl"></div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.contact.getInTouch.labels.address}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{t.contact.info.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>

          {/* Contact Form Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <MotionSection direction="left">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.common.actions.contactUs}
                </h2>
                <ContactForm lang={lang as Language} />
              </div>
            </MotionSection>

            {/* Additional Info */}
            <MotionSection direction="right" delay={0.3}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.common.actions.getStarted}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {t.hero.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We&rsquo;re here to help you transform your ideas into reality. Get in touch with us today!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Why Choose Us?
                  </h4>
                  <ul className="space-y-3">
                    {[
                      '5+ years of experience',
                      'Modern technology stack',
                      'Personalized approach',
                      'Quality assurance'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.contact.getInTouch.cta}
                  </p>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="section-container">
          <MotionSection className="text-center max-w-4xl mx-auto mb-16" immediate={true}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.contact.team.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t.contact.team.subtitle}
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {t.contact.team.freelancersNote}
            </p>
          </MotionSection>

          {/* Lead Developer Card */}
          {t.contact.team.members.filter(member => member.isLead).map((leader, index) => (
            <MotionSection key={index} className="mb-12">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-600 relative overflow-hidden">
                  {/* Star Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Lead
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                    {/* Photo */}
                    <div className="relative w-40 h-40 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
                        {leader.position}
                      </p>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {leader.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionSection>
          ))}

          {/* Other Team Members */}
          <MotionStagger className="grid md:grid-cols-2 gap-6 mb-12" staggerDelay={0.1}>
            {t.contact.team.members.filter(member => !member.isLead).map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 text-center">
                  {/* Member Photo */}
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-md text-gray-600 dark:text-gray-400 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </MotionStagger>

        </div>
      </section>
    </div>
  )
}