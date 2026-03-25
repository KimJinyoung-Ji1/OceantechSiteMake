'use client';

import { useState, useCallback } from 'react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import Toast from '@/components/ui/Toast';
import ContactForm from './ContactForm';

interface ContactContentProps {
  locale: Locale;
}

export default function ContactContent({ locale }: ContactContentProps) {
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const [toast, setToast] = useState(false);

  const handleSuccess = useCallback(() => {
    setToast(true);
  }, []);

  const contactInfo = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 4a1 1 0 011-1h2.5l1 3.5-1.5 1.5a11 11 0 005 5l1.5-1.5L16 12.5V15a1 1 0 01-1 1A13 13 0 012 4z" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      labelKo: '전화',
      labelEn: 'Tel',
      value: SITE_CONFIG.contact.tel,
      href: `tel:${SITE_CONFIG.contact.tel}`,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="4" width="14" height="11" rx="2" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
          <path d="M2 7l7 4.5L16 7" stroke="var(--primary-500)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      labelKo: '이메일',
      labelEn: 'Email',
      value: SITE_CONFIG.contact.email,
      href: `mailto:${SITE_CONFIG.contact.email}`,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 2a5 5 0 015 5c0 3.5-5 9-5 9S4 10.5 4 7a5 5 0 015-5z" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
          <circle cx="9" cy="7" r="1.5" fill="var(--primary-500)" />
        </svg>
      ),
      labelKo: '주소',
      labelEn: 'Address',
      value: SITE_CONFIG.address.main,
      href: undefined,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="4" width="14" height="11" rx="2" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
          <path d="M6 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="var(--primary-500)" strokeWidth="1.5" />
        </svg>
      ),
      labelKo: '팩스',
      labelEn: 'Fax',
      value: SITE_CONFIG.contact.fax,
      href: undefined,
    },
  ];

  return (
    <section className="py-20 lg:py-28 px-4" aria-label="문의하기">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Form */}
          <ContactForm locale={locale} onSuccess={handleSuccess} />

          {/* Right — Info + Map */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div
              className="p-8 rounded-2xl space-y-6"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              <h3 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
                {isEn ? 'Contact Information' : '연락처 정보'}
              </h3>
              <dl className="space-y-4">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--primary-50, #eff6ff)' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <dt className="text-xs font-semibold mb-0.5" style={{ color: 'var(--gray-400)' }}>
                        {isEn ? info.labelEn : info.labelKo}
                      </dt>
                      {info.href ? (
                        <dd>
                          <a
                            href={info.href}
                            className="text-sm font-medium hover:underline"
                            style={{ color: 'var(--gray-700)' }}
                          >
                            {info.value}
                          </a>
                        </dd>
                      ) : (
                        <dd className="text-sm leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                          {info.value}
                        </dd>
                      )}
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Map placeholder */}
            <div
              className="w-full h-56 rounded-2xl flex flex-col items-center justify-center gap-3 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--primary-50, #eff6ff) 0%, var(--primary-100, #dbeafe) 100%)',
                border: '1px solid var(--primary-200, #bfdbfe)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M20 4C13 4 8 9 8 16 C8 25 20 36 20 36 S32 25 32 16 C32 9 27 4 20 4Z" stroke="var(--primary-400)" strokeWidth="2" fill="rgba(1,104,239,0.1)" />
                <circle cx="20" cy="16" r="4" fill="var(--primary-500)" />
              </svg>
              <p className="text-sm font-medium" style={{ color: 'var(--primary-600)' }}>
                {isEn ? 'Map (Kakao Maps integration coming soon)' : '지도 (카카오맵 연동 예정)'}
              </p>
              <p className="text-xs px-6 text-center" style={{ color: 'var(--primary-400)' }}>
                {SITE_CONFIG.address.main}
              </p>
            </div>

            {/* Manager info */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'var(--primary-50, #eff6ff)', border: '1px solid var(--primary-100, #dbeafe)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--primary-400)' }}>
                {isEn ? 'Contact Person' : '담당자'}
              </p>
              <p className="text-sm font-bold" style={{ color: 'var(--primary-700)' }}>
                {SITE_CONFIG.contact.manager}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--primary-600)' }}>
                {SITE_CONFIG.contact.mobile}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={t.contact.successMessage}
        visible={toast}
        onClose={() => setToast(false)}
        type="success"
      />
    </section>
  );
}
