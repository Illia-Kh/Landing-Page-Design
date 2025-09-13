'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import type { Route } from 'next'

interface NavProps {
  lang: Language
}

export function Nav({ lang }: NavProps) {
  const pathname = usePathname()
  const t = getTranslation(lang)
  
  const navItems: Array<{ href: Route; label: string }> = [
    { href: `/${lang}` as Route, label: t.common.navigation.home },
    { href: `/${lang}/services` as Route, label: t.common.navigation.services },
    { href: `/${lang}/about` as Route, label: t.common.navigation.about },
    { href: `/${lang}/contacts` as Route, label: t.common.navigation.contact },
  ]

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
