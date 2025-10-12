'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Language } from '@/types'
import { LOCALES } from '@/lib/i18n'

interface LangSwitcherProps {
  currentLang: Language
  className?: string
}

const languageNames: Record<Language, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  cs: { name: 'Czech', nativeName: 'Čeština' },
  de: { name: 'German', nativeName: 'Deutsch' },
  ua: { name: 'Ukrainian', nativeName: 'Українська' },
}

export function LangSwitcher({ currentLang, className = '' }: LangSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLang: Language) => {
    setIsOpen(false)
    
    // Replace the language prefix in the current path
    const segments = pathname.split('/')
    segments[1] = newLang // Replace the language segment
    const newPath = segments.join('/')
    
    router.push(newPath as `/${string}`)
  }

  const currentLanguage = languageNames[currentLang]

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
        whileTap={{ scale: 0.95 }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {currentLanguage.nativeName}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[140px] overflow-hidden"
            >
              {LOCALES.map((lang) => {
                const language = languageNames[lang]
                const isSelected = lang === currentLang
                
                return (
                  <motion.button
                    key={lang}
                    onClick={() => switchLanguage(lang)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                      isSelected 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                    whileHover={{ backgroundColor: isSelected ? undefined : 'rgba(0,0,0,0.05)' }}
                    disabled={isSelected}
                  >
                    <span className="text-lg leading-none">
                      {lang === 'en' && '🇺🇸'}
                      {lang === 'cs' && '🇨🇿'}
                      {lang === 'de' && '🇩🇪'}
                      {lang === 'ua' && '🇺🇦'}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-medium">{language.nativeName}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {language.name}
                      </span>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                      />
                    )}
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}