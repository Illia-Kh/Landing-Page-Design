import Link from 'next/link'
import { Language } from '@/types'
import { Nav } from './Nav'
import { LangSwitcher } from '@/components/client/LangSwitcher'
import { ThemeToggle } from '@/components/client/ThemeToggle'

interface HeaderProps {
  lang: Language
}

export function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href={`/${lang}`}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              IKH Systems
            </Link>
          </div>
          
          {/* Navigation - Centered */}
          <div className="flex-1 flex justify-center">
            <Nav lang={lang} />
          </div>
          
          {/* System Buttons - Right */}
          <div className="flex items-center gap-3">
            <LangSwitcher currentLang={lang} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
