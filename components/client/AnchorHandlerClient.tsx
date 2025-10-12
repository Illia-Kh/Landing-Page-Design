'use client'

import dynamic from 'next/dynamic'

const AnchorHandler = dynamic(() => import('@/components/client/AnchorHandler').then(m => m.AnchorHandler), { ssr: false })

export default function AnchorHandlerClient() {
  return <AnchorHandler />
}


