// Основные типы приложения
export type Page = 'home' | 'about' | 'services' | 'contact'

export type Language = 'ru' | 'en' | 'de' | 'cs'

export type Theme = 'light' | 'dark' | 'system'

// SEO типы
export interface SEOData {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  language?: Language
  type?: 'website' | 'article' | 'service'
}

// Структурированные данные
export interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'ContactPage' | 'BreadcrumbList'
  data: any
}

// Навигация
export interface NavigationItem {
  page: Page
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface BreadcrumbItem {
  name: string
  url: string
  isCurrent?: boolean
}

// Компоненты
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  caption?: string
}

// Формы
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    message?: string
  }
  options?: Array<{ value: string; label: string }>
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  service?: string
  budget?: string
  timeline?: string
}

// Услуги
export interface Service {
  id: string
  title: Record<Language, string>
  description: Record<Language, string>
  icon: string
  features: Array<{
    title: Record<Language, string>
    description: Record<Language, string>
  }>
  price?: {
    amount: number
    currency: string
    period?: string
  }
  category: 'development' | 'design' | 'consulting' | 'support'
}

// Галерея
export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: Record<Language, string>
  description?: Record<Language, string>
  category: string
  tags: string[]
  width: number
  height: number
  thumbnail?: string
}

// Команда
export interface TeamMember {
  id: string
  name: string
  position: Record<Language, string>
  bio: Record<Language, string>
  avatar: string
  skills: string[]
  experience: number
  education?: string
  social?: {
    linkedin?: string
    github?: string
    twitter?: string
    email?: string
  }
}

// Отзывы
export interface Testimonial {
  id: string
  author: string
  company: string
  position: string
  content: Record<Language, string>
  rating: number
  avatar?: string
  date: string
  project?: string
}

// Проекты
export interface Project {
  id: string
  title: Record<Language, string>
  description: Record<Language, string>
  category: string
  technologies: string[]
  images: string[]
  client: string
  duration: string
  budget: string
  results: Record<Language, string[]>
  liveUrl?: string
  githubUrl?: string
}

// Блог
export interface BlogPost {
  id: string
  title: Record<Language, string>
  excerpt: Record<Language, string>
  content: Record<Language, string>
  author: string
  publishDate: string
  updateDate?: string
  tags: string[]
  category: string
  featuredImage: string
  readTime: number
  slug: string
  meta: SEOData
}

// Анимации
export interface AnimationProps {
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  variants?: any
  whileHover?: any
  whileTap?: any
  whileInView?: any
}

// Производительность
export interface PerformanceMetrics {
  lcp: number
  fid: number
  cls: number
  fcp: number
  ttfb: number
  timestamp: number
}

// Аналитика
export interface AnalyticsEvent {
  name: string
  category: string
  action: string
  label?: string
  value?: number
  timestamp: number
  userId?: string
  sessionId?: string
}

// Локализация
export interface LocalizedContent<T> {
  ru: T
  en: T
  de: T
  cs: T
}

export interface LocaleConfig {
  code: Language
  name: string
  flag: string
  dateFormat: Intl.DateTimeFormatOptions
  numberFormat: Intl.NumberFormatOptions
}

// API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Утилиты
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Хуки
export interface UseLocalStorageOptions<T> {
  defaultValue: T
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
}

export interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

// Контекст
export interface AppContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  language: Language
  setLanguage: (language: Language) => void
  currentPage: Page
  setCurrentPage: (page: Page) => void
  isMobile: boolean
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

// События
export interface AppEvent {
  type: string
  payload?: any
  timestamp: number
  userId?: string
}

// Ошибки
export interface AppError {
  id: string
  message: string
  code?: string
  stack?: string
  timestamp: number
  userId?: string
  context?: Record<string, any>
}

// Настройки
export interface AppSettings {
  theme: Theme
  language: Language
  notifications: boolean
  analytics: boolean
  performance: boolean
  accessibility: {
    reducedMotion: boolean
    highContrast: boolean
    fontSize: 'small' | 'medium' | 'large'
  }
}

// Экспорт всех типов
export type {
  Page,
  Language,
  Theme,
  SEOData,
  StructuredDataProps,
  NavigationItem,
  BreadcrumbItem,
  BaseComponentProps,
  ImageProps,
  FormField,
  ContactFormData,
  Service,
  GalleryImage,
  TeamMember,
  Testimonial,
  Project,
  BlogPost,
  AnimationProps,
  PerformanceMetrics,
  AnalyticsEvent,
  LocalizedContent,
  LocaleConfig,
  ApiResponse,
  PaginatedResponse,
  DeepPartial,
  RequiredFields,
  OptionalFields,
  UseLocalStorageOptions,
  UseIntersectionObserverOptions,
  AppContextType,
  AppEvent,
  AppError,
  AppSettings
}
