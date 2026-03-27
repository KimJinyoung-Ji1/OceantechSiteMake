'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import Image from 'next/image';
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

function KakaoMap({ tall }: { tall?: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || 'f61f53eda89c8d4e2692fe91b4eefabe';
    if (!apiKey) { setMapError(true); return; }

    let cancelled = false;

    function initMap() {
      if (cancelled || !mapRef.current || !window.kakao?.maps) return;
      window.kakao.maps.load(() => {
        if (cancelled || !mapRef.current) return;
        try {
          const container = mapRef.current;
          const position = new window.kakao.maps.LatLng(37.6265, 127.1472);
          const map = new window.kakao.maps.Map(container, { center: position, level: 3 });
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
      if (window.kakao?.maps) { initMap(); return; }
      const interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        if (window.kakao?.maps) { clearInterval(interval); initMap(); }
      }, 100);
      setTimeout(() => { clearInterval(interval); if (!cancelled && !mapLoaded) setMapError(true); }, 15000);
    }

    const scriptId = 'kakao-map-sdk';
    const existing = document.getElementById(scriptId);
    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      script.onload = () => waitForKakaoAndInit();
      script.onerror = () => { if (!cancelled) setMapError(true); };
      document.head.appendChild(script);
    } else {
      waitForKakaoAndInit();
    }

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative overflow-hidden flex-1 w-full" style={{ maxWidth: '100%', minHeight: '300px' }}>
      <div
        ref={mapRef}
        className="w-full rounded-2xl overflow-hidden"
        style={{
          minHeight: '300px',
          height: tall ? '100%' : '300px',
          maxWidth: '100%',
          border: '1px solid var(--border)',
          background: 'var(--background-alt)',
          display: mapError ? 'none' : undefined,
        }}
        aria-label="회사 위치 지도"
      />
      {mapError && (
        <div
          className="w-full rounded-2xl flex flex-col items-center justify-center gap-3 py-6 px-4"
          style={{ minHeight: '300px', background: 'var(--background-alt)', border: '1px solid var(--border)' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="9" r="2.5" fill="var(--primary-500)" />
          </svg>
          <div className="text-center">
            <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>남양주시 다산순환로 20</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>현대프리미어캠퍼스 E동 7층 29호</p>
          </div>
          <a
            href="https://map.kakao.com/link/search/남양주시+다산순환로+20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:brightness-110"
            style={{ background: 'var(--primary-500)', color: '#fff' }}
          >
            카카오맵에서 보기
          </a>
        </div>
      )}
    </div>
  );
}

/* ─── Icon helpers ─── */
const PhoneIcon = ({ color = 'var(--primary-500)', size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 4a1 1 0 011-1h2.5l1 3.5-1.5 1.5a11 11 0 005 5l1.5-1.5L16 12.5V15a1 1 0 01-1 1A13 13 0 012 4z" stroke={color} strokeWidth="1.5" fill="none" />
  </svg>
);
const MailIcon = ({ color = 'var(--primary-500)', size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="14" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M2 7l7 4.5L16 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const PinIcon = ({ color = 'var(--primary-500)', size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 2a5 5 0 015 5c0 3.5-5 9-5 9S4 10.5 4 7a5 5 0 015-5z" stroke={color} strokeWidth="1.5" fill="none" />
    <circle cx="9" cy="7" r="1.5" fill={color} />
  </svg>
);
const FaxIcon = ({ color = 'var(--primary-500)', size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="14" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M6 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke={color} strokeWidth="1.5" />
  </svg>
);
const UserIcon = ({ color = 'white', size = 20 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="6" r="3" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

export default function ContactContent({ locale }: ContactContentProps) {
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const [toast, setToast] = useState(false);

  const handleSuccess = useCallback(() => { setToast(true); }, []);

  const contactRows = [
    { icon: <PhoneIcon />, label: isEn ? 'Tel' : '전화', value: SITE_CONFIG.contact.tel, href: `tel:${SITE_CONFIG.contact.tel}` },
    { icon: <MailIcon />, label: isEn ? 'Email' : '이메일', value: SITE_CONFIG.contact.email, href: `mailto:${SITE_CONFIG.contact.email}` },
    { icon: <PinIcon />, label: isEn ? 'Address' : '주소', value: SITE_CONFIG.address.main },
    { icon: <FaxIcon />, label: isEn ? 'Fax' : '팩스', value: SITE_CONFIG.contact.fax },
  ];

  const cardStyle = {
    background: 'white',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 12px rgba(2,16,151,0.06)',
  };

  const headerGrads = [
    'linear-gradient(135deg, #021097 0%, #0168EF 100%)',
    'linear-gradient(135deg, #0EAD87 0%, #17E9B5 100%)',
    'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
  ];

  return (
    <section className="py-4 sm:py-6 lg:py-10" style={{ background: '#f8fafc' }} aria-label="문의하기">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-2.5 sm:gap-4 lg:gap-5 items-stretch">

          {/* ── COL 1: 문의 보내기 ── */}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden flex flex-col" style={cardStyle}>
            <div
              className="px-3 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2"
              style={{ background: headerGrads[0], color: 'white' }}
            >
              <MailIcon color="white" size={14} />
              <span className="text-[11px] sm:text-sm font-bold tracking-wide">{isEn ? 'Send Inquiry' : '문의 보내기'}</span>
            </div>
            <div className="flex-1 p-2.5 sm:p-4">
              <ContactForm locale={locale} onSuccess={handleSuccess} compact />
            </div>
          </div>

          {/* ── COL 2: 연락처 정보 ── */}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden flex flex-col" style={cardStyle}>
            <div
              className="px-3 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2"
              style={{ background: headerGrads[1], color: 'white' }}
            >
              <PhoneIcon color="white" size={14} />
              <span className="text-[11px] sm:text-sm font-bold tracking-wide">{isEn ? 'Contact' : '연락처 정보'}</span>
            </div>

            <div className="flex-1 flex flex-col">
              {contactRows.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 sm:gap-3 px-2.5 py-2 sm:px-4 sm:py-3 transition-colors hover:bg-slate-50"
                  style={{ borderBottom: i < contactRows.length - 1 ? '1px solid #f1f5f9' : undefined }}
                >
                  <div
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]"
                    style={{ background: 'rgba(14,173,135,0.06)', border: '1px solid rgba(14,173,135,0.15)' }}
                  >
                    {row.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-semibold" style={{ color: '#94a3b8' }}>{row.label}</p>
                    {row.href ? (
                      <a href={row.href} className="text-[11px] sm:text-sm font-semibold hover:underline" style={{ color: 'var(--primary-500)' }}>
                        {row.value}
                      </a>
                    ) : (
                      <p className="text-[11px] sm:text-sm font-medium leading-snug break-words" style={{ color: 'var(--text-primary)' }}>{row.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* 담당자 */}
              <div
                className="flex items-center gap-2 sm:gap-3 px-2.5 py-2 sm:px-4 sm:py-3 mt-auto"
                style={{ background: '#fafbfc', borderTop: '1px solid #f1f5f9' }}
              >
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: headerGrads[1] }}
                >
                  <UserIcon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] sm:text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {SITE_CONFIG.contact.manager}
                    <span className="ml-1 text-[10px] sm:text-xs font-medium" style={{ color: '#94a3b8' }}>
                      {isEn ? 'Director' : '전무이사'}
                    </span>
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.contact.mobile}`}
                    className="text-[11px] sm:text-sm font-semibold hover:underline"
                    style={{ color: 'var(--primary-500)' }}
                  >
                    {SITE_CONFIG.contact.mobile}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── COL 3: 오시는 길 ── */}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden flex flex-col min-w-0" style={cardStyle}>
            <div
              className="px-3 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2"
              style={{ background: headerGrads[2], color: 'white' }}
            >
              <PinIcon color="white" size={14} />
              <span className="text-[11px] sm:text-sm font-bold tracking-wide">{isEn ? 'Directions' : '오시는 길'}</span>
            </div>
            <div className="flex-1 flex flex-col p-2 sm:p-3 min-w-0 overflow-hidden">
              <KakaoMap tall />
            </div>
            <div className="px-3 pb-2.5 sm:px-5 sm:pb-4 pt-1 text-center">
              <p className="text-[11px] sm:text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {isEn ? '20 Dasan Sunhwan-ro, Namyangju-si' : '남양주시 다산순환로 20'}
              </p>
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: '#94a3b8' }}>
                {isEn ? 'Hyundai Premier Campus Bldg. E, 7F #29' : '현대프리미어캠퍼스 E동 7층 29호'}
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
