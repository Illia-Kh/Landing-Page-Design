'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const MotionStagger = dynamic(() => import('@/components/client/MotionSection').then(m => m.MotionStagger), { ssr: false })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MotionStaggerClient(props: any) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer stagger animations until idle
    const ric: (cb: () => void) => number = (window as any).requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 1000))
    const id = ric(() => setMounted(true))
    return () => {
      const cic: (id: number) => void = (window as any).cancelIdleCallback || window.clearTimeout
      cic(id)
    }
  }, [])

  if (!mounted) {
    // Use CSS stagger animation on mobile for better performance
    const className = props.className ? `${props.className} motion-stagger` : 'motion-stagger'
    return <div className={className}>{props.children}</div>
  }

  return <MotionStagger {...props} />
}


