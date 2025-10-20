'use client'

import dynamic from 'next/dynamic'
import type { HeroSlide, Language } from '@/types'

const HeroCarousel = dynamic(() => import('@/components/client/HeroCarousel').then(m => m.HeroCarousel), {
  ssr: true, // Enable SSR for better LCP
  loading: () => (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-xl shadow-2xl">
        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
      </div>
    </div>
  ),
})

export default function HeroCarouselLoader({ slides, lang }: { slides: HeroSlide[]; lang: Language }) {
  return <HeroCarousel slides={slides} lang={lang} />
}


