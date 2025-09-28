'use client'

import { useEffect, useState } from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // Prevent hydration mismatch by not rendering dark classes until mounted
  if (!mounted) {
    return <div className="font-sans antialiased min-h-screen bg-white flex flex-col">{children}</div>
  }

  return (
    <div className="font-sans antialiased min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {children}
    </div>
  )
}
