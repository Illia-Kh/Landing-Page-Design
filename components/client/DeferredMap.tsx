'use client'

import { useEffect, useRef, useState } from 'react'

interface DeferredMapProps {
  src: string
  height?: number
  className?: string
  buttonText?: string
}

export default function DeferredMap({
  src,
  height = 300,
  className = 'rounded-xl',
  buttonText = 'Tap to load interactive map',
}: DeferredMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  const loadIframe = () => {
    if (loaded) return
    setLoaded(true)
  }

  useEffect(() => {
    // Автозагрузка при попадании в видимую область
    const node = containerRef.current
    if (!node || loaded) return
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setLoaded(true)
        io.disconnect()
      }
    }, { rootMargin: '100px' })
    io.observe(node)
    return () => io.disconnect()
  }, [loaded])

  return (
    <div className="relative overflow-hidden" ref={containerRef} style={{ height }}>
      {loaded ? (
        <iframe
          src={src}
          width="100%"
          height={String(height)}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={className}
          allowFullScreen
          title="Interactive map"
        />
      ) : (
        <button
          type="button"
          className="w-full h-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:opacity-90 transition"
          onClick={loadIframe}
        >
          <span>{buttonText}</span>
        </button>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-xl" />
    </div>
  )
}

