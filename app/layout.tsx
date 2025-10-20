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
      
      {/* Minimal Critical CSS for above-the-fold content */}
      <style dangerouslySetInnerHTML={{
        __html: `
          *,*::before,*::after{box-sizing:border-box}
          html{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.5}
          body{margin:0;font-family:inherit;line-height:inherit}
          .header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);border-bottom:1px solid rgba(0,0,0,.1)}
          .header-content{display:flex;align-items:center;justify-content:space-between;height:4rem;padding:0 1rem}
          .logo{display:flex;align-items:center;gap:.5rem;font-weight:700;font-size:1.25rem;color:#1f2937;text-decoration:none}
          .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-align:center;padding:2rem 1rem}
          .hero-content h1{font-size:3rem;font-weight:800;margin-bottom:1rem;line-height:1.1}
          .hero-content p{font-size:1.25rem;margin-bottom:2rem;opacity:.9}
          .btn{display:inline-flex;align-items:center;justify-content:center;padding:.75rem 1.5rem;font-size:1rem;font-weight:600;text-decoration:none;border-radius:.5rem;transition:all .2s ease;border:none;cursor:pointer}
          .btn-primary{background:#3b82f6;color:white}
          .btn-primary:hover{background:#2563eb;transform:translateY(-1px)}
          @media (prefers-color-scheme:dark){
            .header{background:rgba(17,24,39,.95);border-bottom-color:rgba(255,255,255,.1)}
            .logo{color:#f9fafb}
          }
        `
      }} />
      
      {/* Preload Logo for faster header rendering */}
      <link
        rel="preload"
        as="image"
        href="/logo/ikh-logo.svg"
        type="image/svg+xml"
        fetchPriority="high"
      />
      
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
      
      {/* Preload first carousel image for better LCP */}
      <link
        rel="preload"
        as="image"
        href="/media/banner/web-development.webp"
        type="image/webp"
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