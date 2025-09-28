'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings, Check, X } from 'lucide-react'
import { trackEvent } from '@/components/PageViewTracker'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieConsentProps {
  lang: 'en' | 'cs' | 'de' | 'ua'
}

const translations = {
  en: {
    title: 'Cookie Preferences',
    description: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    necessary: 'Necessary',
    necessaryDesc: 'Essential for the website to function properly.',
    analytics: 'Analytics',
    analyticsDesc: 'Help us understand how visitors interact with our website.',
    marketing: 'Marketing',
    marketingDesc: 'Used to deliver personalized advertisements.',
    acceptAll: 'Accept All',
    acceptSelected: 'Accept Selected',
    rejectAll: 'Reject All',
    customize: 'Customize',
    savePreferences: 'Save Preferences',
    cookiePolicy: 'Cookie Policy',
    privacyPolicy: 'Privacy Policy'
  },
  cs: {
    title: 'Nastavení cookies',
    description: 'Používáme cookies k vylepšení vašeho prohlížení, poskytování personalizovaného obsahu a analýze našeho provozu. Kliknutím na "Přijmout vše" souhlasíte s používáním cookies.',
    necessary: 'Nezbytné',
    necessaryDesc: 'Nezbytné pro správné fungování webu.',
    analytics: 'Analytické',
    analyticsDesc: 'Pomáhají nám pochopit, jak návštěvníci interagují s naším webem.',
    marketing: 'Marketingové',
    marketingDesc: 'Používají se k poskytování personalizované reklamy.',
    acceptAll: 'Přijmout vše',
    acceptSelected: 'Přijmout vybrané',
    rejectAll: 'Odmítnout vše',
    customize: 'Přizpůsobit',
    savePreferences: 'Uložit nastavení',
    cookiePolicy: 'Zásady cookies',
    privacyPolicy: 'Zásady ochrany soukromí'
  },
  de: {
    title: 'Cookie-Einstellungen',
    description: 'Wir verwenden Cookies, um Ihr Browsing-Erlebnis zu verbessern, personalisierte Inhalte bereitzustellen und unseren Traffic zu analysieren. Durch Klicken auf "Alle akzeptieren" stimmen Sie der Verwendung von Cookies zu.',
    necessary: 'Notwendig',
    necessaryDesc: 'Für das ordnungsgemäße Funktionieren der Website erforderlich.',
    analytics: 'Analytik',
    analyticsDesc: 'Helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.',
    marketing: 'Marketing',
    marketingDesc: 'Werden für personalisierte Werbung verwendet.',
    acceptAll: 'Alle akzeptieren',
    acceptSelected: 'Ausgewählte akzeptieren',
    rejectAll: 'Alle ablehnen',
    customize: 'Anpassen',
    savePreferences: 'Einstellungen speichern',
    cookiePolicy: 'Cookie-Richtlinie',
    privacyPolicy: 'Datenschutzrichtlinie'
  },
  ua: {
    title: 'Налаштування cookies',
    description: 'Ми використовуємо cookies для покращення вашого досвіду перегляду, надання персоналізованого контенту та аналізу нашого трафіку. Натиснувши "Прийняти все", ви погоджуєтеся на використання cookies.',
    necessary: 'Необхідні',
    necessaryDesc: 'Необхідні для правильної роботи веб-сайту.',
    analytics: 'Аналітичні',
    analyticsDesc: 'Допомагають нам зрозуміти, як відвідувачі взаємодіють з нашим сайтом.',
    marketing: 'Маркетингові',
    marketingDesc: 'Використовуються для надання персоналізованої реклами.',
    acceptAll: 'Прийняти все',
    acceptSelected: 'Прийняти вибрані',
    rejectAll: 'Відхилити все',
    customize: 'Налаштувати',
    savePreferences: 'Зберегти налаштування',
    cookiePolicy: 'Політика cookies',
    privacyPolicy: 'Політика конфіденційності'
  }
}

export function CookieConsent({ lang }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  })

  const t = translations[lang]

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    } else {
      // Apply saved preferences
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      applyCookiePreferences(savedPreferences)
    }

    // Listen for cookie settings open event
    const handleOpenCookieSettings = () => {
      setIsVisible(true)
      setShowCustomize(true)
    }

    window.addEventListener('openCookieSettings', handleOpenCookieSettings)
    
    return () => {
      window.removeEventListener('openCookieSettings', handleOpenCookieSettings)
    }
  }, [])

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Enable/disable analytics based on consent
    if (prefs.analytics) {
      // Enable analytics
      trackEvent('cookie_consent', 'analytics', 'enabled')
    } else {
      // Disable analytics
      trackEvent('cookie_consent', 'analytics', 'disabled')
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    applyCookiePreferences(allAccepted)
    setIsVisible(false)
    
    // Dispatch consent change event
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'))
    
    trackEvent('cookie_consent', 'action', 'accept_all')
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    
    setPreferences(onlyNecessary)
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
    applyCookiePreferences(onlyNecessary)
    setIsVisible(false)
    
    // Dispatch consent change event
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'))
    
    trackEvent('cookie_consent', 'action', 'reject_all')
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    applyCookiePreferences(preferences)
    setIsVisible(false)
    setShowCustomize(false)
    
    // Dispatch consent change event
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'))
    
    trackEvent('cookie_consent', 'action', 'customize')
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {!showCustomize ? (
            // Simple banner
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {t.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowCustomize(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  {t.customize}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          ) : (
            // Detailed preferences
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t.title}
                </h3>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {t.necessary}
                      </h4>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        Required
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.necessaryDesc}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                
                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {t.analytics}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.analyticsDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className={`ml-4 w-12 h-6 rounded-full transition-colors ${
                      preferences.analytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {t.marketing}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.marketingDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('marketing')}
                    className={`ml-4 w-12 h-6 rounded-full transition-colors ${
                      preferences.marketing ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {t.savePreferences}
                </button>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <a 
                  href={`/${lang}/privacy-policy`}
                  className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                >
                  {t.privacyPolicy}
                </a>
                <a 
                  href={`/${lang}/cookie-policy`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.cookiePolicy}
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
