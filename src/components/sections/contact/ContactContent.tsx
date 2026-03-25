'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import Toast from '@/components/ui/Toast';
import ContactForm from './ContactForm';

interface ContactContentProps {
  locale: Locale;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!apiKey || !mapRef.current) return;

    const scriptId = 'kakao-map-sdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else if (window.kakao?.maps) {
      initMap();
    } else {
      const interval = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
    }

    function initMap() {
      if (!mapRef.current || !window.kakao?.maps) return;
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;
        const container = mapRef.current;
        const position = new window.kakao.maps.LatLng(37.6326, 127.2149);
        const options = { center: position, level: 4 };
        const map = new window.kakao.maps.Map(container, options);
        new window.kakao.maps.Marker({ position, map });
      });
    }
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-64 rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
      aria-label="회사 위치 지도"
    />
  );
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
    <section className="py-20 lg:py-28 px-6 lg:px-12" aria-label="문의하기">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Form */}
          <ContactForm locale={locale} onSuccess={handleSuccess} />

          {/* Right — Info + Map */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div
              className="p-8 rounded-2xl space-y-6"
              style={{
                background: 'var(--background-alt)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 12px rgba(2,16,151,0.04)',
              }}
            >
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {isEn ? 'Contact Information' : '연락처 정보'}
              </h3>
              <dl className="space-y-4">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'var(--primary-100)' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <dt className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                        {isEn ? info.labelEn : info.labelKo}
                      </dt>
                      {info.href ? (
                        <dd>
                          <a
                            href={info.href}
                            className="text-base font-medium hover:underline"
                            style={{ color: 'var(--text-body)' }}
                          >
                            {info.value}
                          </a>
                        </dd>
                      ) : (
                        <dd className="text-base leading-relaxed" style={{ color: 'var(--text-body)' }}>
                          {info.value}
                        </dd>
                      )}
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Kakao Map */}
            <KakaoMap />

            {/* Manager info */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'var(--background-alt)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                {isEn ? 'Contact Person' : '담당자'}
              </p>
              <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                {SITE_CONFIG.contact.manager}
              </p>
              <p className="text-base mt-1" style={{ color: 'var(--text-body)' }}>
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
