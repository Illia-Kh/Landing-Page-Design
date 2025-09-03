export type SupportedLanguage = 'ru' | 'en' | 'cs' | 'de';

export const getNavigatorLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('cs')) return 'cs';
  if (browserLang.startsWith('de')) return 'de';
  
  // Default to English
  return 'en';
};

export const spamMessages: Record<SupportedLanguage, string> = {
  ru: "Заставь дурака Богу молиться — он и лоб расшибёт",
  en: "Give a fool enough rope and he will hang himself",
  cs: "Když blbec dostane provaz, oběsí se sám",
  de: "Gib einem Narren genug Seil, und er erhängt sich selbst"
};

export const getSpamMessage = (language?: SupportedLanguage): string => {
  const lang = language || getNavigatorLanguage();
  return spamMessages[lang];
};