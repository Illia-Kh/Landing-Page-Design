'use client'

import { LazyStagger } from '@/components/LazyLoading'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MotionStaggerClient(props: any) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer stagger animations until idle using modern scheduler API
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
    // Use CSS stagger animation on mobile for better performance
    const className = props.className ? `${props.className} motion-stagger` : 'motion-stagger'
    return <div className={className}>{props.children}</div>
  }

  return <LazyStagger {...props} />
}


