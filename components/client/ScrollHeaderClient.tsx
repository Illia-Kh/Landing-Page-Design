'use client'

import dynamic from 'next/dynamic'
import type { Language } from '@/types'
import { useEffect, useState } from 'react'

const ScrollHeader = dynamic(() => import('@/components/client/ScrollHeader').then(m => m.ScrollHeader), { ssr: false })

export default function ScrollHeaderClient({ lang }: { lang: Language }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer mounting until idle to reduce TBT
    const ric: (cb: () => void) => number = (window as any).requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 1000))
    const id = ric(() => setMounted(true))
    return () => {
      const cic: (id: number) => void = (window as any).cancelIdleCallback || window.clearTimeout
      cic(id)
    }
  }, [])

  if (!mounted) return null

  return <ScrollHeader lang={lang} />
}


