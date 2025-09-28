'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cookie, Check, X, RefreshCw } from 'lucide-react'
import { trackEvent } from '@/components/PageViewTracker'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieManagerProps {
  lang: 'en' | 'cs' | 'de' | 'ua'
  isOpen: boolean
  onClose: () => void
}

const translations = {
  en: {
    title: 'Cookie Settings',
    description: 'Manage your cookie preferences. You can enable or disable different types of cookies below.',
    necessary: 'Necessary Cookies',
    necessaryDesc: 'These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services.',
    analytics: 'Analytics Cookies',
    analyticsDesc: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
    marketing: 'Marketing Cookies',
    marketingDesc: 'These cookies may be set through our site by our advertising partners to build a profile of your interests.',
    saveChanges: 'Save Changes',
    resetToDefault: 'Reset to Default',
    close: 'Close',
    saved: 'Preferences saved!',
    reset: 'Preferences reset!'
  },
  cs: {
    title: 'Nastavení cookies',
    description: 'Spravujte své preference cookies. Můžete povolit nebo zakázat různé typy cookies níže.',
    necessary: 'Nezbytné cookies',
    necessaryDesc: 'Tyto cookies jsou nezbytné pro fungování webu a nelze je vypnout. Obvykle se nastavují pouze v reakci na akce, které jste provedli.',
    analytics: 'Analytické cookies',
    analyticsDesc: 'Tyto cookies nám umožňují počítat návštěvy a zdroje provozu, abychom mohli měřit a zlepšovat výkon našeho webu.',
    marketing: 'Marketingové cookies',
    marketingDesc: 'Tyto cookies mohou být nastaveny na našem webu našimi reklamními partnery k vytvoření profilu vašich zájmů.',
    saveChanges: 'Uložit změny',
    resetToDefault: 'Obnovit výchozí',
    close: 'Zavřít',
    saved: 'Preference uloženy!',
    reset: 'Preference obnoveny!'
  },
  de: {
    title: 'Cookie-Einstellungen',
    description: 'Verwalten Sie Ihre Cookie-Einstellungen. Sie können verschiedene Arten von Cookies unten aktivieren oder deaktivieren.',
    necessary: 'Notwendige Cookies',
    necessaryDesc: 'Diese Cookies sind für das Funktionieren der Website unerlässlich und können nicht deaktiviert werden.',
    analytics: 'Analytische Cookies',
    analyticsDesc: 'Diese Cookies ermöglichen es uns, Besuche und Traffic-Quellen zu zählen, damit wir die Leistung unserer Website messen und verbessern können.',
    marketing: 'Marketing-Cookies',
    marketingDesc: 'Diese Cookies können von unseren Werbepartnern auf unserer Website gesetzt werden, um ein Profil Ihrer Interessen zu erstellen.',
    saveChanges: 'Änderungen speichern',
    resetToDefault: 'Auf Standard zurücksetzen',
    close: 'Schließen',
    saved: 'Einstellungen gespeichert!',
    reset: 'Einstellungen zurückgesetzt!'
  },
  ua: {
    title: 'Налаштування cookies',
    description: 'Керуйте своїми налаштуваннями cookies. Ви можете увімкнути або вимкнути різні типи cookies нижче.',
    necessary: 'Необхідні cookies',
    necessaryDesc: 'Ці cookies необхідні для роботи веб-сайту і не можуть бути вимкнені. Вони зазвичай встановлюються лише у відповідь на ваші дії.',
    analytics: 'Аналітичні cookies',
    analyticsDesc: 'Ці cookies дозволяють нам підраховувати відвідування та джерела трафіку, щоб ми могли вимірювати та покращувати продуктивність нашого сайту.',
    marketing: 'Маркетингові cookies',
    marketingDesc: 'Ці cookies можуть бути встановлені на нашому сайті нашими рекламними партнерами для створення профілю ваших інтересів.',
    saveChanges: 'Зберегти зміни',
    resetToDefault: 'Скинути до за замовчуванням',
    close: 'Закрити',
    saved: 'Налаштування збережено!',
    reset: 'Налаштування скинуто!'
  }
}

export function CookieManager({ lang, isOpen, onClose }: CookieManagerProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  })
  const [notification, setNotification] = useState<string>('')

  const t = translations[lang]

  useEffect(() => {
    if (isOpen) {
      // Load current preferences
      const consent = localStorage.getItem('cookie-consent')
      if (consent) {
        setPreferences(JSON.parse(consent))
      }
    }
  }, [isOpen])

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Enable/disable analytics based on consent
    if (prefs.analytics) {
      trackEvent('cookie_consent', 'analytics', 'enabled')
    } else {
      trackEvent('cookie_consent', 'analytics', 'disabled')
    }
  }

  const handleSaveChanges = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    applyCookiePreferences(preferences)
    showNotification(t.saved)
    trackEvent('cookie_manager', 'action', 'save_changes')
  }

  const handleResetToDefault = () => {
    const defaultPrefs = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    setPreferences(defaultPrefs)
    showNotification(t.reset)
    trackEvent('cookie_manager', 'action', 'reset_default')
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 3000)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t.description}
          </p>

          {/* Cookie Categories */}
          <div className="space-y-4 mb-6">
            {/* Necessary Cookies */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {t.necessary}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t.necessaryDesc}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                    Required
                  </span>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {t.analytics}
                  </h3>
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
            </div>

            {/* Marketing Cookies */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {t.marketing}
                  </h3>
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
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleResetToDefault}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t.resetToDefault}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {t.close}
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {t.saveChanges}
            </button>
          </div>

          {/* Notification */}
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm"
            >
              {notification}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
