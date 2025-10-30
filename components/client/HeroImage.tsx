'use client'

import Image from 'next/image'
import type { HeroSlide } from '@/types'
import { useEffect, useMemo, useState } from 'react'

interface HeroImageProps {
  slide: HeroSlide
  priority?: boolean
  isFirst?: boolean
}

/**
 * Optimized hero image component with mobile-first srcset
 * Uses smaller mobile variants for faster LCP
 */
export function HeroImage({ slide, priority = false, isFirst = false }: HeroImageProps) {
  const [srcError, setSrcError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(max-width: 640px)')
      const update = () => setIsMobile(mq.matches)
      update()
      mq.addEventListener?.('change', update)
      return () => mq.removeEventListener?.('change', update)
    }
  }, [])

  const computedSrc = useMemo(() => {
    if (!isMobile) return slide.image
    // try mobile-specific variant: add -mobile-lg before extension for banner images
    const m = slide.image.match(/^(.*)(\.(avif|webp))$/)
    if (!m) return slide.image
    const candidate = `${m[1]}-mobile-lg${m[2]}`
    return candidate
  }, [isMobile, slide.image])

  const finalSrc = srcError ? slide.image : computedSrc
  const mobileSizes = '(max-width: 600px) 100vw, (max-width: 1200px) 75vw, 50vw'

  return (
    <Image
      src={finalSrc}
      alt={slide.alt}
      fill
      priority={priority}
      fetchPriority={priority ? 'high' : 'low'}
      quality={isFirst ? 80 : 75}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={mobileSizes}
      placeholder="blur"
      blurDataURL="data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAAAwBACdASoQABwAPm0uk0WkIiGYBABABsSgCdMoR4APtmJ8A/e8j4B+95HwCXyPgH73kfAP3vI+AfveR8A/e8j4B+95HwAA/v5UF9vT6K3s3eyt7N3s3eyt7N3s3ey//5H8E2fKevMxvZu9m72bvZu9lb2bvZu9m7//7y5HJAAAA=="
      className="object-cover"
      onError={() => setSrcError(true)}
    />
  )
}

