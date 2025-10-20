'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const MotionSection = dynamic(() => import('@/components/client/MotionSection').then(m => m.MotionSection), { ssr: false })

// Using any here intentionally to avoid type coupling with server component inference
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MotionSectionClient(props: any) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer motion animations until idle using modern scheduler API
    const scheduleIdleTask = (task: () => void) => {
      if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
        (window as any).scheduler.postTask(task, { priority: 'background' });
      } else if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(task, { timeout: 100 });
      } else {
        setTimeout(task, 0);
      }
    };
    
    scheduleIdleTask(() => setMounted(true));
  }, [])

  if (!mounted) {
    // Use CSS animation on mobile for better performance
    const className = props.className ? `${props.className} motion-section` : 'motion-section'
    return <div className={className}>{props.children}</div>
  }

  return <MotionSection {...props} />
}


