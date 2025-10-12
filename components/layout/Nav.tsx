'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import type { Route } from 'next'
import { localeHref } from '@/lib/localeHref'

interface NavProps {
  lang: Language
  mobile?: boolean
  onMobileMenuClose?: () => void
}

export function Nav({ lang, mobile = false, onMobileMenuClose }: NavProps) {
  const pathname = usePathname()
  const t = getTranslation(lang)
  
  const navItems: Array<{ href: Route; label: string }> = [
    { href: localeHref(lang, '/') as Route, label: t.common.navigation.home },
    { href: localeHref(lang, '/services') as Route, label: t.common.navigation.services },
    { href: localeHref(lang, '/contacts') as Route, label: t.common.navigation.contact },
  ]

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileMenuClose}
              className={`px-4 py-3 text-base font-medium transition-colors rounded-lg ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
              isActive 
                ? 'text-primary underline underline-offset-4 font-semibold' 
                : 'text-muted-foreground'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
