'use client'

import Script from 'next/script'
import { analyticsConfig } from '@/lib/env'
import { useEffect, useState } from 'react'

interface GoogleAnalyticsProps {
  gaId: string
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date().toISOString());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

interface MetaPixelProps {
  pixelId: string
}

export function MetaPixel({ pixelId }: MetaPixelProps) {
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}

export function Analytics() {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false)
  const [isConsentChecked, setIsConsentChecked] = useState(false)

  useEffect(() => {
    // Check cookie consent
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('cookie-consent')
        if (consent) {
          // Check if consent is a valid JSON object
          if (consent.startsWith('{') && consent.endsWith('}')) {
            const preferences = JSON.parse(consent)
            setHasAnalyticsConsent(preferences.analytics === true)
          } else {
            // Handle legacy string values like "accepted"
            setHasAnalyticsConsent(consent === 'accepted')
            // Clear legacy value to prevent future issues
            localStorage.removeItem('cookie-consent')
          }
        }
        setIsConsentChecked(true)
      } catch (error) {
        console.error('Error checking cookie consent:', error)
        setIsConsentChecked(true)
      }
    }

    checkConsent()

    // Listen for consent changes
    const handleConsentChange = () => {
      checkConsent()
    }

    window.addEventListener('cookieConsentChanged', handleConsentChange)
    
    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange)
    }
  }, [])

  // Don't render analytics if disabled or no consent
  if (!analyticsConfig.enabled || !isConsentChecked || !hasAnalyticsConsent) {
    return null
  }

  return (
    <>
      {analyticsConfig.gaId && <GoogleAnalytics gaId={analyticsConfig.gaId} />}
      {/* Meta Pixel would be added here if pixelId is provided in env */}
    </>
  )
}