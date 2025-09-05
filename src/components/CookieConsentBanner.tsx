import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield, BarChart3, Target, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Switch } from './ui/switch'
import { Separator } from './ui/separator'
import { ConsentState, ConsentBannerTexts, Language } from '../types'
import { saveConsentState, getConsentState, updateConsent } from '../lib/analytics'

interface CookieConsentBannerProps {
  language: Language
}

const consentTexts: Record<Language, ConsentBannerTexts> = {
  ru: {
    title: 'Мы используем файлы cookie',
    description: 'Мы используем файлы cookie для улучшения вашего опыта, аналитики и персонализации. Выберите, какие категории вы хотите разрешить.',
    categories: {
      necessary: {
        title: 'Необходимые',
        description: 'Эти файлы cookie необходимы для работы сайта и не могут быть отключены.'
      },
      analytics: {
        title: 'Аналитика',
        description: 'Помогают нам понять, как посетители взаимодействуют с сайтом, собирая информацию анонимно.'
      },
      marketing: {
        title: 'Маркетинг',
        description: 'Используются для показа релевантной рекламы и отслеживания эффективности рекламных кампаний.'
      }
    },
    buttons: {
      acceptAll: 'Принять все',
      rejectAll: 'Отклонить все',
      savePreferences: 'Сохранить настройки',
      showDetails: 'Показать детали',
      hideDetails: 'Скрыть детали'
    }
  },
  en: {
    title: 'We use cookies',
    description: 'We use cookies to enhance your experience, analytics and personalization. Choose which categories you want to allow.',
    categories: {
      necessary: {
        title: 'Necessary',
        description: 'These cookies are essential for the website to function and cannot be disabled.'
      },
      analytics: {
        title: 'Analytics',
        description: 'Help us understand how visitors interact with the website by collecting information anonymously.'
      },
      marketing: {
        title: 'Marketing',
        description: 'Used to show relevant ads and track the effectiveness of advertising campaigns.'
      }
    },
    buttons: {
      acceptAll: 'Accept All',
      rejectAll: 'Reject All',
      savePreferences: 'Save Preferences',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details'
    }
  },
  de: {
    title: 'Wir verwenden Cookies',
    description: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, für Analysen und Personalisierung. Wählen Sie aus, welche Kategorien Sie zulassen möchten.',
    categories: {
      necessary: {
        title: 'Notwendig',
        description: 'Diese Cookies sind für die Funktion der Website unerlässlich und können nicht deaktiviert werden.'
      },
      analytics: {
        title: 'Analytik',
        description: 'Helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem sie Informationen anonym sammeln.'
      },
      marketing: {
        title: 'Marketing',
        description: 'Werden verwendet, um relevante Werbung zu zeigen und die Wirksamkeit von Werbekampagnen zu verfolgen.'
      }
    },
    buttons: {
      acceptAll: 'Alle akzeptieren',
      rejectAll: 'Alle ablehnen',
      savePreferences: 'Einstellungen speichern',
      showDetails: 'Details anzeigen',
      hideDetails: 'Details ausblenden'
    }
  },
  cs: {
    title: 'Používáme cookies',
    description: 'Používáme cookies pro zlepšení vašeho zážitku, analytiku a personalizaci. Vyberte, které kategorie chcete povolit.',
    categories: {
      necessary: {
        title: 'Nezbytné',
        description: 'Tyto cookies jsou nezbytné pro fungování webu a nelze je vypnout.'
      },
      analytics: {
        title: 'Analytika',
        description: 'Pomáhají nám pochopit, jak návštěvníci interagují s webem, sbíráním informací anonymně.'
      },
      marketing: {
        title: 'Marketing',
        description: 'Používají se k zobrazení relevantní reklamy a sledování účinnosti reklamních kampaní.'
      }
    },
    buttons: {
      acceptAll: 'Přijmout vše',
      rejectAll: 'Odmítnout vše',
      savePreferences: 'Uložit preference',
      showDetails: 'Zobrazit podrobnosti',
      hideDetails: 'Skrýt podrobnosti'
    }
  }
}

export function CookieConsentBanner({ language }: CookieConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true, // Always true, cannot be changed
    analytics: false,
    marketing: false
  })

  const text = consentTexts[language] || consentTexts.en

  useEffect(() => {
    // Check if user has already given consent
    const existingConsent = getConsentState()
    if (!existingConsent) {
      setShowBanner(true)
    } else {
      setConsent(existingConsent)
    }
  }, [])

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    saveConsentState(newConsent)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    saveConsentState(newConsent)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    saveConsentState(consent)
    setShowBanner(false)
  }

  const handleConsentChange = (category: keyof ConsentState, value: boolean) => {
    if (category === 'necessary') return // Cannot change necessary cookies
    
    setConsent(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const categoryIcons = {
    necessary: Shield,
    analytics: BarChart3,
    marketing: Target
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <Card className="max-w-4xl mx-auto bg-background/95 backdrop-blur-md border shadow-2xl">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{text.title}</h3>
                <p className="text-sm text-muted-foreground">{text.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mb-4">
              <Button onClick={handleAcceptAll} className="flex-1 min-w-[120px]">
                <Check className="h-4 w-4 mr-2" />
                {text.buttons.acceptAll}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRejectAll}
                className="flex-1 min-w-[120px]"
              >
                <X className="h-4 w-4 mr-2" />
                {text.buttons.rejectAll}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className="flex-1 min-w-[120px]"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    {text.buttons.hideDetails}
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    {text.buttons.showDetails}
                  </>
                )}
              </Button>
            </div>

            {/* Detailed Settings */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Separator className="mb-4" />
                  <div className="space-y-4">
                    {Object.entries(text.categories).map(([key, category]) => {
                      const IconComponent = categoryIcons[key as keyof typeof categoryIcons]
                      const isNecessary = key === 'necessary'
                      
                      return (
                        <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div className="flex items-start gap-3 flex-1">
                            <IconComponent className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-medium">{category.title}</h4>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={consent[key as keyof ConsentState]}
                            onCheckedChange={(checked) => handleConsentChange(key as keyof ConsentState, checked)}
                            disabled={isNecessary}
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button onClick={handleSavePreferences} className="w-full">
                      {text.buttons.savePreferences}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}