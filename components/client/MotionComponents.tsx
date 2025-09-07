'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionCardProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  hover?: boolean
  scale?: number
}

/**
 * Animated card component with hover effects
 */
export function MotionCard({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  hover = true,
  scale = 1.02,
}: MotionCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      viewport={{ once: true, margin: '-10%' }}
      whileHover={hover ? { 
        scale,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  )
}

/**
 * Floating animation component
 */
interface MotionFloatProps {
  children: ReactNode
  className?: string
  intensity?: number
  duration?: number
}

export function MotionFloat({
  children,
  className = '',
  intensity = 10,
  duration = 3,
}: MotionFloatProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Reveal text animation
 */
interface MotionTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function MotionText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
}: MotionTextProps) {
  const words = text.split(' ')

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

/**
 * Scale in animation
 */
interface MotionScaleProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  scale?: number
}

export function MotionScale({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  scale = 0.8,
}: MotionScaleProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      viewport={{ once: true, margin: '-10%' }}
    >
      {children}
    </motion.div>
  )
}