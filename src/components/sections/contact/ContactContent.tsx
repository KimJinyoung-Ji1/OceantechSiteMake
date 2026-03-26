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
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!apiKey) {
      setMapError(true);
      return;
    }

    let cancelled = false;

    function initMap() {
      if (cancelled || !mapRef.current || !window.kakao?.maps) return;
      window.kakao.maps.load(() => {
        if (cancelled || !mapRef.current) return;
        try {
          const container = mapRef.current;
          const position = new window.kakao.maps.LatLng(37.6265, 127.1472);
          const options = { center: position, level: 3 };
          const map = new window.kakao.maps.Map(container, options);
          const marker = new window.kakao.maps.Marker({ position, map });
          const infowindow = new window.kakao.maps.InfoWindow({
            content:
              '<div style="padding:8px 12px;font-size:13px;font-weight:700;white-space:nowrap;">(주)오션테크<br><span style="font-weight:400;font-size:11px;color:#666;">현대프리미어캠퍼스 E동 7층</span></div>',
          });
          infowindow.open(map, marker);
        } catch {
          if (!cancelled) setMapError(true);
        }
      });
    }

    function waitForKakaoAndInit() {
      if (cancelled) return;
      if (window.kakao?.maps) {
        initMap();
        return;
      }
      const interval = setInterval(() => {
        if (cancelled) {
          clearInterval(interval);
          return;
        }
        if (window.kakao?.maps) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
      // Timeout after 10s
      setTimeout(() => {
        clearInterval(interval);
        if (!cancelled && !window.kakao?.maps) setMapError(true);
      }, 15000);
    }

    const scriptId = 'kakao-map-sdk';
    const existing = document.getElementById(scriptId);
    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      script.onload = () => waitForKakaoAndInit();
      script.onerror = () => {
        if (!cancelled) setMapError(true);
      };
      document.head.appendChild(script);
    } else {
      // Script tag already in DOM — may still be loading or already loaded
      waitForKakaoAndInit();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (mapError) {
    return (
      <div
        className="w-full h-64 rounded-2xl flex flex-col items-center justify-center gap-2"
        style={{ background: 'var(--background-alt)', border: '1px solid var(--border)' }}
        aria-label="회사 위치 지도"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="9" r="2.5" fill="var(--primary-500)" />
        </svg>
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          남양주시 다산순환로 20 현대프리미어캠퍼스 E동 7층 29-30호
        </p>
        <a
          href="https://map.kakao.com/link/search/남양주시+다산순환로+20"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline"
          style={{ color: 'var(--primary-500)' }}
        >
          카카오맵에서 보기
        </a>
      </div>
    );
  }

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
    <section className="py-8 lg:py-12 px-6 lg:px-10" aria-label="문의하기">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left — Form */}
          <ContactForm locale={locale} onSuccess={handleSuccess} />

          {/* Right — Info + Map */}
          <div className="space-y-5">
            {/* Contact Info */}
            <div
              className="p-6 rounded-2xl space-y-4"
              style={{
                background: 'var(--background-alt)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 12px rgba(12,114,135,0.05)',
              }}
            >
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {isEn ? 'Contact Information' : '연락처 정보'}
              </h3>
              <dl className="space-y-3">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--primary-100)' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <dt className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                        {isEn ? info.labelEn : info.labelKo}
                      </dt>
                      {info.href ? (
                        <dd>
                          <a
                            href={info.href}
                            className="text-sm font-medium hover:underline"
                            style={{ color: 'var(--text-body)' }}
                          >
                            {info.value}
                          </a>
                        </dd>
                      ) : (
                        <dd className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                          {info.value}
                        </dd>
                      )}
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* 오시는 길 */}
            <div>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {isEn ? 'Directions' : '오시는 길'}
              </h3>
              <KakaoMap />
              <div className="mt-2 space-y-0.5">
                <p className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                  {SITE_CONFIG.address.main}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {isEn ? 'Hyundai Premier Campus Bldg. E, 7F #29-30' : '현대프리미어캠퍼스 E동 7층 29-30호'}
                </p>
              </div>
            </div>

            {/* Manager info */}
            <div
              className="p-4 rounded-2xl"
              style={{ background: 'var(--background-alt)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                {isEn ? 'Contact Person' : '담당자'}
              </p>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {SITE_CONFIG.contact.manager}
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-body)' }}>
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
