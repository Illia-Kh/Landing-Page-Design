'use client'

import dynamic from 'next/dynamic'
import type { Language } from '@/types'

const ContactForm = dynamic(() => import('@/components/client/ContactForm').then(m => m.ContactForm), {
  ssr: false,
  loading: () => <div className="h-40 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />,
})

export default function ContactFormClient({ lang }: { lang: Language }) {
  return <ContactForm lang={lang} />
}


