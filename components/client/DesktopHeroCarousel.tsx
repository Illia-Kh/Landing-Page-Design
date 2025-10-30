'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HeroSlide, Language } from '@/types'
import { HeroImage } from './HeroImage'

interface DesktopHeroCarouselProps {
  slides: HeroSlide[]
  lang: Language
}

export default function DesktopHeroCarousel({ slides, lang }: DesktopHeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false, dragFree: false },
    []
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => { emblaApi?.scrollPrev() }, [emblaApi])
  const scrollNext = useCallback(() => { emblaApi?.scrollNext() }, [emblaApi])
  const scrollTo = useCallback((index: number) => { emblaApi?.scrollTo(index) }, [emblaApi])

  const onInit = useCallback((api: EmblaCarouselType) => { setScrollSnaps(api.scrollSnapList()) }, [])
  const onSelect = useCallback((api: EmblaCarouselType) => { setSelectedIndex(api.selectedScrollSnap()) }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  if (!slides?.length) return null

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-xl shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative aspect-[9/16] bg-gray-900 dark:bg-gray-800">
                <HeroImage slide={slide} priority={index === 0} isFirst={index === 0} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                    {slide.subtitle && (
                      <p className="text-sm text-gray-200 mb-4">{slide.subtitle}</p>
                    )}
                    {slide.cta && (
                      <Link
                        href={`/${lang}${slide.cta.href}`}
                        className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-200"
                        aria-label={`${slide.cta.label} - ${slide.title}`}
                      >
                        {slide.cta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {scrollSnaps.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === selectedIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}


