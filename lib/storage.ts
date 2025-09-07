/**
 * Safe localStorage wrapper that handles SSR/SSG environments
 * Always check for window availability before using localStorage
 */

export interface StorageItem<T> {
  value: T
  timestamp: number
  expiry?: number
}

class SafeStorage {
  private isAvailable(): boolean {
    return typeof window !== 'undefined' && 'localStorage' in window
  }

  /**
   * Get item from localStorage with type safety
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    if (!this.isAvailable()) {
      return defaultValue
    }

    try {
      const item = localStorage.getItem(key)
      if (!item) {
        return defaultValue
      }

      const parsed: StorageItem<T> = JSON.parse(item)
      
      // Check if item has expired
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.remove(key)
        return defaultValue
      }

      return parsed.value
    } catch (error) {
      console.warn(`Error reading from localStorage for key "${key}":`, error)
      return defaultValue
    }
  }

  /**
   * Set item in localStorage with optional expiry
   */
  set<T>(key: string, value: T, expiryMs?: number): boolean {
    if (!this.isAvailable()) {
      return false
    }

    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiry: expiryMs ? Date.now() + expiryMs : undefined,
      }

      localStorage.setItem(key, JSON.stringify(item))
      return true
    } catch (error) {
      console.warn(`Error writing to localStorage for key "${key}":`, error)
      return false
    }
  }

  /**
   * Remove item from localStorage
   */
  remove(key: string): boolean {
    if (!this.isAvailable()) {
      return false
    }

    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`Error removing from localStorage for key "${key}":`, error)
      return false
    }
  }

  /**
   * Clear all localStorage items
   */
  clear(): boolean {
    if (!this.isAvailable()) {
      return false
    }

    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
      return false
    }
  }

  /**
   * Check if a key exists in localStorage
   */
  has(key: string): boolean {
    if (!this.isAvailable()) {
      return false
    }

    try {
      return localStorage.getItem(key) !== null
    } catch (error) {
      console.warn(`Error checking localStorage for key "${key}":`, error)
      return false
    }
  }

  /**
   * Get all keys from localStorage
   */
  keys(): string[] {
    if (!this.isAvailable()) {
      return []
    }

    try {
      return Object.keys(localStorage)
    } catch (error) {
      console.warn('Error getting localStorage keys:', error)
      return []
    }
  }

  /**
   * Get storage size in bytes (approximate)
   */
  size(): number {
    if (!this.isAvailable()) {
      return 0
    }

    try {
      let total = 0
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length
        }
      }
      return total
    } catch (error) {
      console.warn('Error calculating localStorage size:', error)
      return 0
    }
  }
}

// Create singleton instance
export const storage = new SafeStorage()

// Convenience functions for common storage operations
export const storageKeys = {
  theme: 'theme',
  language: 'language', 
  consent: 'cookie-consent',
  userPreferences: 'user-preferences',
} as const

/**
 * React hook for localStorage with SSR safety
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void, () => void] {
  // This is a basic implementation - in a real app you'd want to use useState
  // and useEffect to properly handle hydration
  
  const getValue = (): T => {
    return storage.get(key, defaultValue) ?? defaultValue
  }

  const setValue = (value: T): void => {
    storage.set(key, value)
  }

  const removeValue = (): void => {
    storage.remove(key)
  }

  return [getValue(), setValue, removeValue]
}

// Export types
// StorageItem is already exported above