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
  const [mapLoaded, setMapLoaded] = useState(false);
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
          if (!cancelled) setMapLoaded(true);
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
      // Timeout after 15s
      setTimeout(() => {
        clearInterval(interval);
        if (!cancelled && !mapLoaded) setMapError(true);
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
      waitForKakaoAndInit();
    }

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      {/* Map div always rendered */}
      <div
        ref={mapRef}
        className="w-full rounded-2xl overflow-hidden"
        style={{
          height: '200px',
          border: '1px solid var(--border)',
          display: mapError ? 'none' : 'block',
        }}
        aria-label="회사 위치 지도"
      />

      {/* Fallback shown below map if error */}
      {mapError && (
        <div
          className="w-full rounded-2xl flex flex-col items-center justify-center gap-2 py-6"
          style={{ background: 'var(--background-alt)', border: '1px solid var(--border)', height: '200px' }}
          aria-label="회사 위치 지도"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="9" r="2.5" fill="var(--primary-500)" />
          </svg>
          <p className="text-xs font-medium text-center px-4" style={{ color: 'var(--text-secondary)' }}>
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
      )}
    </div>
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
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
    <section className="py-6 lg:py-8 px-6 lg:px-24" style={{ background: 'var(--background)' }} aria-label="문의하기">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-8 items-stretch">
          {/* Left — Form */}
          <ContactForm locale={locale} onSuccess={handleSuccess} />

          {/* Right — Info + Map + Manager */}
          <div className="flex flex-col gap-4">
            {/* Contact Info */}
            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'var(--background-alt)',
                border: '1px solid var(--border)',
              }}
            >
              <h3 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {isEn ? 'Contact Information' : '연락처 정보'}
              </h3>
              <dl className="grid grid-cols-1 gap-2">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--primary-100)' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <dt className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
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
                        <dd className="text-sm leading-snug" style={{ color: 'var(--text-body)' }}>
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
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {isEn ? 'Directions' : '오시는 길'}
              </h3>
              <KakaoMap />
              <p className="mt-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                {isEn ? 'Hyundai Premier Campus Bldg. E, 7F #29-30' : '현대프리미어캠퍼스 E동 7층 29-30호'}
              </p>
            </div>

            {/* Manager info */}
            <div
              className="p-3 rounded-2xl"
              style={{ background: 'var(--background-alt)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                {isEn ? 'Contact Person' : '담당자'}
              </p>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {SITE_CONFIG.contact.manager}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-body)' }}>
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
