'use client'

import Image from 'next/image'
import type { HeroSlide } from '@/types'
import { heroImageLoader } from '@/lib/imageLoader'

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
  // For mobile, Next.js will automatically choose smallest variant based on viewport
  // We just need to provide the right sizes attribute
  const src = slide.image
  const mobileSizes = '(max-width: 600px) 100vw, (max-width: 1200px) 75vw, 50vw'
  
  return (
    <Image
      src={src}
      alt={slide.alt}
      fill
      loader={isFirst ? heroImageLoader : undefined}
      priority={priority}
      fetchPriority={priority ? 'high' : 'low'}
      quality={isFirst ? 75 : 70}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={mobileSizes}
      placeholder="blur"
      blurDataURL="data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAAAwBACdASoQABwAPm0uk0WkIiGYBABABsSgCdMoR4APtmJ8A/e8j4B+95HwCXyPgH73kfAP3vI+AfveR8A/e8j4B+95HwAA/v5UF9vT6K3s3eyt7N3s3eyt7N3s3ey//5H8E2fKevMxvZu9m72bvZu9lb2bvZu9m7//7y5HJAAAA=="
      className="object-cover"
    />
  )
}

