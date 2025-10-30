'use client'

import { useEffect, useRef, useState } from 'react'
import type React from 'react'
// framer-motion not used here anymore to reduce TBT

interface LazySectionProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export function LazySection({
  children,
  className = '',
  threshold = 0.1,
  rootMargin: _rootMargin = '50px',
  delay = 0,
  direction = 'up',
  distance = 50,
}: LazySectionProps) {
  const [ref, isInView] = useLazyLoad<HTMLDivElement>(threshold, _rootMargin)

  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const initialTransform = (() => {
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`
      case 'down':
        return `translate3d(0, -${distance}px, 0)`
      case 'left':
        return `translate3d(${distance}px, 0, 0)`
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`
      default:
        return `translate3d(0, ${distance}px, 0)`
    }
  })()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: hasAnimated ? 'translate3d(0,0,0)' : initialTransform,
        opacity: hasAnimated ? 1 : 0,
        transitionProperty: 'transform, opacity',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: `${Math.max(0, delay)}s`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  )
}

// Staggered lazy loading for lists
interface LazyStaggerProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  threshold?: number
  rootMargin?: string
}

export function LazyStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  threshold = 0.1,
  rootMargin: _rootMargin = '50px',
}: LazyStaggerProps) {
  const [ref, isInView] = useLazyLoad<HTMLDivElement>(threshold, _rootMargin)

  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          style={{
            transform: hasAnimated ? 'translate3d(0,0,0)' : 'translate3d(0,30px,0)',
            opacity: hasAnimated ? 1 : 0,
            transitionProperty: 'transform, opacity',
            transitionDuration: '500ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: hasAnimated ? `${index * staggerDelay}s` : '0s',
            willChange: 'transform, opacity',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Intersection Observer hook for custom lazy loading
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
  rootMargin = '50px'
) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    const node = ref.current
    if (node) {
      observer.observe(node)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref as React.RefObject<T>, isVisible] as const
}

// Lazy load images with intersection observer
interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  threshold?: number
  rootMargin?: string
}

export function LazyImage({
  src,
  alt,
  className = '',
  placeholder,
  threshold = 0.1,
  rootMargin = '50px',
}: LazyImageProps) {
  const [ref, isVisible] = useLazyLoad<HTMLDivElement>(threshold, rootMargin)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && placeholder && (
        <picture>
          <img
            src={placeholder}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
            loading="eager"
            decoding="async"
            fetchPriority="low"
          />
        </picture>
      )}
      
      {/* Actual image */}
      {isVisible && (
        <picture>
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </picture>
      )}
    </div>
  )
}
