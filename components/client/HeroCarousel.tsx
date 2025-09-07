'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface HeroCarouselProps {
  images: Array<{
    src: string
    alt: string
    title?: string
    description?: string
  }>
  autoRotationInterval?: number
  className?: string
}

/**
 * Hero Carousel with auto-rotation as specified in design-spec
 * Auto-rotation: 5.8 second intervals
 * Fade transitions between slides
 * Responsive image sizing with aspect ratios
 */
export function HeroCarousel({
  images,
  autoRotationInterval = 5800, // 5.8 seconds as per design-spec
  className = '',
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoRotationInterval)

    return () => clearInterval(interval)
  }, [images.length, autoRotationInterval])

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
    },
  }

  const textVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority={currentIndex === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text content overlay */}
      {(images[currentIndex].title || images[currentIndex].description) && (
        <div className="absolute inset-0 flex items-end justify-start p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-white max-w-lg"
            >
              {images[currentIndex].title && (
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {images[currentIndex].title}
                </h3>
              )}
              {images[currentIndex].description && (
                <p className="text-lg leading-relaxed opacity-90">
                  {images[currentIndex].description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-primary"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: autoRotationInterval / 1000,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  )
}

/**
 * Hero Logo Animation Component for carousel integration
 */
interface HeroLogoProps {
  className?: string
}

export function HeroLogo({ className = '' }: HeroLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative ${className}`}
    >
      {/* Background glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50"
      />
      
      {/* Logo content */}
      <div className="relative bg-gradient-primary rounded-full p-4 shadow-2xl">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-8 h-8 text-white"
        >
          {/* Animated flow pattern */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            d="M4 16h4m0 0l4-4m-4 4l4 4m8-8h4m0 0l4-4m-4 4l4 4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Central hub */}
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            cx="16"
            cy="16"
            r="3"
            fill="currentColor"
          />
        </svg>
      </div>
    </motion.div>
  )
}