import { describe, it, expect } from 'vitest';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';

describe('SITE_CONFIG', () => {
  describe('company', () => {
    it('has required company fields', () => {
      expect(SITE_CONFIG.company.name).toBe('(주)오션테크');
      expect(SITE_CONFIG.company.nameEn).toBe('Ocean Tech Inc.');
      expect(SITE_CONFIG.company.ceo).toBe('이우철');
    });

    it('has bizNo and corpNo', () => {
      expect(SITE_CONFIG.company.bizNo).toBeDefined();
      expect(SITE_CONFIG.company.corpNo).toBeDefined();
    });
  });

  describe('contact', () => {
    it('has tel and email', () => {
      expect(SITE_CONFIG.contact.tel).toBe('031-566-7720');
      expect(SITE_CONFIG.contact.email).toBe('oceantee@naver.com');
    });
  });

  describe('certifications', () => {
    it('has greenTech certification with number', () => {
      expect(SITE_CONFIG.certifications.greenTech.number).toBe('GT-25-02356');
    });

    it('has greenProduct certification', () => {
      expect(SITE_CONFIG.certifications.greenProduct.number).toBe('GTP-25-04857');
    });

    it('has venture certification', () => {
      expect(SITE_CONFIG.certifications.venture.number).toBeDefined();
    });
  });

  describe('patents', () => {
    it('has patents array with 7 items', () => {
      expect(Array.isArray(SITE_CONFIG.patents)).toBe(true);
      expect(SITE_CONFIG.patents.length).toBe(7);
    });

    it('each patent has a number', () => {
      for (const patent of SITE_CONFIG.patents) {
        expect(patent.number).toBeDefined();
        expect(patent.number.length).toBeGreaterThan(0);
      }
    });
  });

  describe('stats', () => {
    it('has expected stats values', () => {
      expect(SITE_CONFIG.stats.patents).toBe(7);
      expect(SITE_CONFIG.stats.svhc).toBe(235);
      expect(SITE_CONFIG.stats.durability).toBe(10);
      expect(SITE_CONFIG.stats.costReduction).toBe(80);
    });
  });

  describe('products', () => {
    it('has 2 product categories', () => {
      expect(SITE_CONFIG.products.categories.length).toBe(2);
    });

    it('has advantages array', () => {
      expect(Array.isArray(SITE_CONFIG.products.advantages)).toBe(true);
      expect(SITE_CONFIG.products.advantages.length).toBeGreaterThan(0);
    });
  });

  describe('history', () => {
    it('has history array', () => {
      expect(Array.isArray(SITE_CONFIG.history)).toBe(true);
      expect(SITE_CONFIG.history.length).toBeGreaterThan(0);
    });

    it('each history item has year and events', () => {
      for (const item of SITE_CONFIG.history) {
        expect(item.year).toBeDefined();
        expect(item.eventKo).toBeDefined();
        expect(item.eventEn).toBeDefined();
      }
    });
  });

  describe('news', () => {
    it('has news array with items', () => {
      expect(Array.isArray(SITE_CONFIG.news)).toBe(true);
      expect(SITE_CONFIG.news.length).toBeGreaterThan(0);
    });
  });

  describe('documents.certificates', () => {
    it('has certificates array', () => {
      expect(Array.isArray(SITE_CONFIG.documents.certificates)).toBe(true);
      expect(SITE_CONFIG.documents.certificates.length).toBeGreaterThan(0);
    });

    it('each cert has key, titleKo, number', () => {
      for (const cert of SITE_CONFIG.documents.certificates) {
        expect(cert.key).toBeDefined();
        expect(cert.titleKo).toBeDefined();
        expect(cert.number).toBeDefined();
      }
    });
  });
});

describe('NAV_ITEMS', () => {
  it('is an array with 7 items', () => {
    expect(Array.isArray(NAV_ITEMS)).toBe(true);
    expect(NAV_ITEMS.length).toBe(7);
  });

  it('each nav item has label, labelEn, href', () => {
    for (const item of NAV_ITEMS) {
      expect(item.label).toBeDefined();
      expect(item.labelEn).toBeDefined();
      expect(item.href).toBeDefined();
    }
  });

  it('first item is home', () => {
    expect(NAV_ITEMS[0].href).toBe('/');
  });

  it('contact item has correct href', () => {
    const contact = NAV_ITEMS.find((i) => i.href === '/contact');
    expect(contact).toBeDefined();
    expect(contact?.labelEn).toBe('Contact');
  });
});
