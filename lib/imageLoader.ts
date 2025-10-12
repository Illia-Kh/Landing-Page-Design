import type { ImageLoaderProps } from 'next/image'

/**
 * Custom image loader for mobile-optimized hero images
 * Automatically serves mobile variants for smaller viewports
 */
export function heroImageLoader({ src, width }: ImageLoaderProps): string {
  // Check if this is the hero web-development image
  if (src.includes('web-development')) {
    // Mobile variants for optimal LCP
    if (width <= 480) {
      return src.replace('web-development.webp', 'web-development-mobile.avif')
    }
    if (width <= 640) {
      return src.replace('web-development.webp', 'web-development-mobile-lg.avif')
    }
    // Use AVIF for desktop
    return src.replace('.webp', '.avif')
  }
  
  // For other images, use AVIF if available
  if (src.endsWith('.webp') && width) {
    return src.replace('.webp', '.avif')
  }
  
  return src
}

