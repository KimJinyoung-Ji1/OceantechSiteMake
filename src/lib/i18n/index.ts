import ko from './ko.json';
import en from './en.json';

const translations = { ko, en } as const;
export type Locale = keyof typeof translations;
export type Translation = typeof ko;

export const LOCALES: Locale[] = ['ko', 'en'];
export const DEFAULT_LOCALE: Locale = 'ko';

export function isValidLocale(locale: string): locale is Locale {
  return locale in translations;
}

export function getTranslation(locale: string): Translation {
  const lang: Locale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  return translations[lang];
}
