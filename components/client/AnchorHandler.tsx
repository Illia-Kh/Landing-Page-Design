'use client'

import { useEffect } from 'react'
import { scrollToElementCenter } from '@/lib/scroll-utils'

interface AnchorHandlerProps {
  hash?: string
}

export function AnchorHandler({ hash }: AnchorHandlerProps) {
  useEffect(() => {
    if (hash) {
      // Remove the # from hash
      const elementId = hash.replace('#', '')
      
      // Wait for the page to load and then scroll to center
      const timer = setTimeout(() => {
        scrollToElementCenter(elementId, 100)
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [hash])

  return null
}
