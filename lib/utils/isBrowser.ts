/**
 * Check if code is running in browser environment
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * Safely access window object
 */
export function getWindow(): Window | undefined {
  return isBrowser ? window : undefined
}

/**
 * Safely access document object
 */
export function getDocument(): Document | undefined {
  return isBrowser ? document : undefined
}

/**
 * Check if the current environment supports a specific API
 */
export function supportsAPI(apiName: keyof Window): boolean {
  return isBrowser && apiName in window
}

/**
 * Safely execute browser-only code
 */
export function runInBrowser<T>(fn: () => T, fallback?: T): T | undefined {
  if (isBrowser) {
    try {
      return fn()
    } catch (error) {
      console.warn('Browser function execution failed:', error)
      return fallback
    }
  }
  return fallback
}