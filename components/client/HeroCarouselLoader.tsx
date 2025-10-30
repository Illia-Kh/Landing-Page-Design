'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import type { HeroSlide, Language } from '@/types'
import { HeroImage } from './HeroImage'

const DesktopHeroCarousel = dynamic(() => import('@/components/client/DesktopHeroCarousel'), { ssr: false })

export default function HeroCarouselLoader({ slides, lang }: { slides: HeroSlide[]; lang: Language }) {
  const [shouldLoadDesktop, setShouldLoadDesktop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  // Determine mobile once on mount and on viewport changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    // Only create observers on desktop
    if (typeof window === 'undefined' || isMobile) return
    const node = rootRef.current
    if (!node) return

    // First wait until section is near viewport
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        // Then wait for idle
        const scheduleIdleTask = (task: () => void) => {
          if ('scheduler' in window && (window as any).scheduler?.postTask) {
            ;(window as any).scheduler.postTask(task, { priority: 'background' })
          } else if ('requestIdleCallback' in window) {
            ;(window as any).requestIdleCallback(task, { timeout: 200 })
          } else {
            setTimeout(task, 0)
          }
        }
        scheduleIdleTask(() => setShouldLoadDesktop(true))
        io.disconnect()
      }
    }, { rootMargin: '200px' })

    io.observe(node)
    return () => io.disconnect()
  }, [isMobile])

  const first = slides[0]
  if (isMobile) {
    return (
      <div className="relative w-full max-w-sm mx-auto" ref={rootRef}>
        <div className="relative w-full aspect-[9/16] overflow-hidden rounded-xl shadow-2xl">
          <div className="relative aspect-[9/16] bg-gray-900 dark:bg-gray-800">
            <HeroImage slide={first} priority isFirst />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{first.title}</h3>
              {first.subtitle && (
                <p className="text-sm text-gray-200">{first.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative w-full">
      {shouldLoadDesktop ? (
        <DesktopHeroCarousel slides={slides} lang={lang} />
      ) : (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative w-full h-full bg-gray-900 dark:bg-gray-800">
            <HeroImage slide={first} isFirst />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>
        </div>
      )}
    </div>
  )
}


