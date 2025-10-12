'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const MotionSection = dynamic(() => import('@/components/client/MotionSection').then(m => m.MotionSection), { ssr: false })

// Using any here intentionally to avoid type coupling with server component inference
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MotionSectionClient(props: any) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer motion animations until idle
    const ric: (cb: () => void) => number = (window as any).requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 800))
    const id = ric(() => setMounted(true))
    return () => {
      const cic: (id: number) => void = (window as any).cancelIdleCallback || window.clearTimeout
      cic(id)
    }
  }, [])

  if (!mounted) {
    // Use CSS animation on mobile for better performance
    const className = props.className ? `${props.className} motion-section` : 'motion-section'
    return <div className={className}>{props.children}</div>
  }

  return <MotionSection {...props} />
}


