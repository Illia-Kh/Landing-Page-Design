'use client'

import dynamic from 'next/dynamic'
import type { Language } from '@/types'
import { useEffect, useState } from 'react'

const ScrollHeader = dynamic(() => import('@/components/client/ScrollHeader').then(m => m.ScrollHeader), { ssr: false })

export default function ScrollHeaderClient({ lang }: { lang: Language }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer mounting until idle to reduce TBT using modern scheduler API
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

  if (!mounted) return null

  return <ScrollHeader lang={lang} />
}


