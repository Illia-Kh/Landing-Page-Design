'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Language } from '@/types'
import { Nav } from './Nav'
import { LangSwitcher } from '@/components/client/LangSwitcher'
import { ThemeToggle } from '@/components/client/ThemeToggle'
import { Logo } from '@/components/ui/Logo'
import { localeHref } from '@/lib/localeHref'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  lang: Language
}

export function Header({ lang }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href={localeHref(lang, '/') as `/${string}`}
            className="hover:opacity-80 transition-opacity"
          >
            <Logo variant="header" />
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <Nav lang={lang} />
          </div>
          
          {/* Desktop System Buttons - Right */}
          <div className="hidden md:flex items-center gap-3">
            <LangSwitcher currentLang={lang} />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50">
            <div className="section-container py-4">
              <div className="space-y-4">
                {/* Navigation */}
                <Nav lang={lang} mobile onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
                
                {/* System Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <LangSwitcher currentLang={lang} />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
