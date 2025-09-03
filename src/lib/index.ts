import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Объединяет классы CSS с помощью clsx и tailwind-merge
 * @param inputs - CSS классы для объединения
 * @returns Объединенная строка CSS классов
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Форматирует дату в читаемый формат
 * @param date - Дата для форматирования
 * @param locale - Локаль (по умолчанию 'ru')
 * @returns Отформатированная дата
 */
export function formatDate(date: Date, locale: string = 'ru'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

/**
 * Форматирует число с разделителями
 * @param num - Число для форматирования
 * @param locale - Локаль (по умолчанию 'ru')
 * @returns Отформатированное число
 */
export function formatNumber(num: number, locale: string = 'ru'): string {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Форматирует валюту
 * @param amount - Сумма
 * @param currency - Валюта (по умолчанию 'RUB')
 * @param locale - Локаль (по умолчанию 'ru')
 * @returns Отформатированная валюта
 */
export function formatCurrency(
  amount: number,
  currency: string = 'RUB',
  locale: string = 'ru'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount)
}

/**
 * Генерирует уникальный ID
 * @returns Уникальный ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Дебаунс функция для оптимизации производительности
 * @param func - Функция для дебаунса
 * @param wait - Время ожидания в миллисекундах
 * @returns Дебаунсированная функция
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Троттлинг функция для ограничения частоты вызовов
 * @param func - Функция для троттлинга
 * @param limit - Лимит вызовов в миллисекундах
 * @returns Троттлинг функция
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Проверяет, находится ли элемент в области видимости
 * @param element - DOM элемент
 * @returns true, если элемент видим
 */
export function isElementInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Плавная прокрутка к элементу
 * @param element - Целевой элемент
 * @param offset - Смещение от верха (по умолчанию 0)
 */
export function scrollToElement(element: Element, offset: number = 0): void {
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth'
  })
}

/**
 * Копирует текст в буфер обмена
 * @param text - Текст для копирования
 * @returns Promise с результатом копирования
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    }
  } catch (error) {
    console.error('Ошибка копирования в буфер обмена:', error)
    return false
  }
}

/**
 * Проверяет поддержку WebP
 * @returns Promise с результатом проверки
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

/**
 * Ленивая загрузка изображений
 * @param img - HTML элемент изображения
 * @param src - URL изображения
 */
export function lazyLoadImage(img: HTMLImageElement, src: string): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })
    imageObserver.observe(img)
  } else {
    // Fallback для старых браузеров
    img.src = src
  }
}

/**
 * Форматирует размер файла
 * @param bytes - Размер в байтах
 * @returns Отформатированный размер
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Проверяет, является ли устройство мобильным
 * @returns true, если устройство мобильное
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Проверяет, поддерживает ли браузер темную тему
 * @returns true, если поддерживается
 */
export function prefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Получает текущую тему
 * @returns 'light', 'dark' или 'system'
 */
export function getCurrentTheme(): 'light' | 'dark' | 'system' {
  if (typeof window === 'undefined') return 'light'
  
  const theme = localStorage.getItem('theme')
  if (theme === 'light' || theme === 'dark') {
    return theme
  }
  
  return 'system'
}

/**
 * Устанавливает тему
 * @param theme - Тема для установки
 */
export function setTheme(theme: 'light' | 'dark' | 'system'): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('theme', theme)
  
  if (theme === 'system') {
    const systemTheme = prefersDarkMode() ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', systemTheme)
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

/**
 * Применяет текущую тему
 */
export function applyTheme(): void {
  const theme = getCurrentTheme()
  setTheme(theme)
}

/**
 * Слушает изменения системной темы
 * @param callback - Функция обратного вызова
 */
export function watchSystemTheme(callback: (theme: 'light' | 'dark') => void): void {
  if (typeof window === 'undefined') return
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    const theme = e.matches ? 'dark' : 'light'
    callback(theme)
  })
}
