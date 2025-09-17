import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | IKH Systems',
    default: 'IKH Systems - Innovative IT Solutions',
  },
  description: 'Modern technological solutions that help companies reach new heights in the digital age.',
  keywords: ['IT solutions', 'web development', 'mobile applications', 'software development'],
  authors: [{ name: 'Illia Khromov' }],
  creator: 'IKH Systems',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'cs-CZ': '/cs', 
      'de-DE': '/de',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'IKH Systems',
    title: 'IKH Systems - Innovative IT Solutions',
    description: 'Modern technological solutions that help companies reach new heights in the digital age.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IKH Systems - Innovative IT Solutions',
    description: 'Modern technological solutions that help companies reach new heights in the digital age.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}