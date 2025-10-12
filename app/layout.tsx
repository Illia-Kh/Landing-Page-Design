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
        {/* Translation Control */}
        <meta name="google" content="notranslate" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="IKH Systems" />
        
        {/* Browser Optimization */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload Hero Image for LCP - Mobile Optimized */}
      <link
        rel="preload"
        as="image"
        imageSrcSet="/media/banner/web-development-mobile.avif 480w, /media/banner/web-development-mobile-lg.avif 640w, /media/banner/web-development.avif 1280w"
        imageSizes="(max-width: 600px) 100vw, 600px"
        href="/media/banner/web-development-mobile-lg.avif"
        type="image/avif"
        fetchPriority="high"
      />
        
        {/* iOS Safari Optimization */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="format-detection" content="email=yes" />
        <meta name="format-detection" content="address=yes" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}