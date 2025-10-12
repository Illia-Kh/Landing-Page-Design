import type { Locale } from './i18n'

export const localeHref = (locale: Locale, path = '') =>
  `/${locale}${path.startsWith('/') ? path : `/${path}`}`


