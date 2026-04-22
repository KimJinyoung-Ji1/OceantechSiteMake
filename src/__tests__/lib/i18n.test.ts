import { describe, it, expect } from 'vitest';
import { isValidLocale, getTranslation, LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/index';

describe('i18n', () => {
  describe('LOCALES', () => {
    it('contains ko and en', () => {
      expect(LOCALES).toContain('ko');
      expect(LOCALES).toContain('en');
    });
  });

  describe('DEFAULT_LOCALE', () => {
    it('is ko', () => {
      expect(DEFAULT_LOCALE).toBe('ko');
    });
  });

  describe('isValidLocale', () => {
    it('returns true for ko', () => {
      expect(isValidLocale('ko')).toBe(true);
    });

    it('returns true for en', () => {
      expect(isValidLocale('en')).toBe(true);
    });

    it('returns false for unknown locale', () => {
      expect(isValidLocale('fr')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isValidLocale('')).toBe(false);
    });

    it('returns false for ja', () => {
      expect(isValidLocale('ja')).toBe(false);
    });
  });

  describe('getTranslation', () => {
    it('returns korean translation for ko', () => {
      const t = getTranslation('ko');
      expect(t).toBeDefined();
      expect(typeof t).toBe('object');
    });

    it('returns english translation for en', () => {
      const t = getTranslation('en');
      expect(t).toBeDefined();
      expect(typeof t).toBe('object');
    });

    it('falls back to default locale for unknown locale', () => {
      const t = getTranslation('zz');
      const defaultT = getTranslation(DEFAULT_LOCALE);
      expect(t).toEqual(defaultT);
    });

    it('falls back to default locale for empty string', () => {
      const t = getTranslation('');
      const defaultT = getTranslation(DEFAULT_LOCALE);
      expect(t).toEqual(defaultT);
    });

    it('ko and en translations are different', () => {
      const ko = getTranslation('ko');
      const en = getTranslation('en');
      expect(ko).not.toEqual(en);
    });
  });
});
