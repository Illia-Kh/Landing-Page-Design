import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing Page Design',
  description: 'Next.js 15 App Router with i18n and SSG/ISR',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="antialiased">{children}</body>
    </html>
  )
}