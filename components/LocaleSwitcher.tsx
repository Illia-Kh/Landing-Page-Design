'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/i18n'

export default function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || '/'
  const rest = pathname.replace(/^\/[a-z]{2}/, '') || '/'
  return (
    <div className="flex gap-3">
      {LOCALES.map(l => (
        <Link key={l} href={`/${l}${rest}`} aria-current={l === current ? 'page' : undefined}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
