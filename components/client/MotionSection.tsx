'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionSectionProps extends Omit<MotionProps, 'children'> {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  once?: boolean
  immediate?: boolean // New prop for immediate animation
}

/**
 * Reusable motion section component for consistent animations across the app
 * This is a client component that wraps Framer Motion functionality
 */
export function MotionSection({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  once = true,
  immediate = false,
  ...motionProps
}: MotionSectionProps) {
  // Define animation variants based on direction
  const getVariants = () => {
    const baseTransition = {
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // Proper typing for cubic bezier
    }

    switch (direction) {
      case 'up':
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: baseTransition,
        }
      case 'down':
        return {
          initial: { opacity: 0, y: -distance },
          animate: { opacity: 1, y: 0 },
          transition: baseTransition,
        }
      case 'left':
        return {
          initial: { opacity: 0, x: distance },
          animate: { opacity: 1, x: 0 },
          transition: baseTransition,
        }
      case 'right':
        return {
          initial: { opacity: 0, x: -distance },
          animate: { opacity: 1, x: 0 },
          transition: baseTransition,
        }
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: baseTransition,
        }
      default:
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: baseTransition,
        }
    }
  }

  const variants = getVariants()

  return (
    <motion.div
      className={className}
      initial={variants.initial}
      animate={immediate ? variants.animate : undefined}
      whileInView={immediate ? undefined : variants.animate}
      transition={variants.transition}
      viewport={immediate ? undefined : { once, margin: '-10%' }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered container for animating multiple children with delays
 */
interface MotionStaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  immediate?: boolean // New prop for immediate animation
}

export function MotionStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
  immediate = false,
}: MotionStaggerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const item = {
    hidden: (() => {
      switch (direction) {
        case 'up':
          return { opacity: 0, y: 30 }
        case 'down':
          return { opacity: 0, y: -30 }
        case 'left':
          return { opacity: 0, x: 30 }
        case 'right':
          return { opacity: 0, x: -30 }
        case 'fade':
          return { opacity: 0 }
        default:
          return { opacity: 0, y: 30 }
      }
    })(),
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate={immediate ? "show" : undefined}
      whileInView={immediate ? undefined : "show"}
      viewport={immediate ? undefined : { once: true, margin: '-10%' }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>
      }
    </motion.div>
  )
}

/**
 * Animated counter component
 */
interface MotionCounterProps {
  to: number
  className?: string
  suffix?: string
  prefix?: string
}

export function MotionCounter({
  to,
  className = '',
  suffix = '',
  prefix = '',
}: MotionCounterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {prefix}{to}{suffix}
    </motion.span>
  )
}

/**
 * Hover effect wrapper
 */
interface MotionHoverProps {
  children: ReactNode
  className?: string
  scale?: number
  rotate?: number
  y?: number
}

export function MotionHover({
  children,
  className = '',
  scale = 1.05,
  rotate = 0,
  y = -5,
}: MotionHoverProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        rotate,
        y,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}