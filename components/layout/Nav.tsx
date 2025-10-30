'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'

interface NavProps {
  items: Array<{ href: Route; label: string }>
  mobile?: boolean
  onMobileMenuClose?: () => void
}

export function Nav({ items, mobile = false, onMobileMenuClose }: NavProps) {
  const pathname = usePathname()

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-2">
        {items.map((item) => {
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
      {items.map((item) => {
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
