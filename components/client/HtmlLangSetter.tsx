'use client'

import { useEffect } from 'react'
import { isSupportedLanguage } from '@/lib/i18n'
import type { Language } from '@/types'

interface HtmlLangSetterProps {
  lang: Language
}

export function HtmlLangSetter({ lang }: HtmlLangSetterProps) {

  useEffect(() => {
    if (lang && isSupportedLanguage(lang)) {
      // Set the lang attribute on the html element
      document.documentElement.lang = lang
      document.documentElement.setAttribute('translate', 'no')
      
      // Add language-specific meta tags
      const existingLangMeta = document.querySelector('meta[http-equiv="Content-Language"]')
      if (existingLangMeta) {
        existingLangMeta.setAttribute('content', lang)
      } else {
        const langMeta = document.createElement('meta')
        langMeta.setAttribute('http-equiv', 'Content-Language')
        langMeta.setAttribute('content', lang)
        document.head.appendChild(langMeta)
      }

      const existingRobotsMeta = document.querySelector('meta[name="robots"][content="notranslate"]')
      if (!existingRobotsMeta) {
        const robotsMeta = document.createElement('meta')
        robotsMeta.setAttribute('name', 'robots')
        robotsMeta.setAttribute('content', 'notranslate')
        document.head.appendChild(robotsMeta)
      }
    }
  }, [lang])

  return null
}
