import Image from 'next/image';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface GreenCertStripProps {
  locale: Locale;
}

export default function GreenCertStrip({ locale }: GreenCertStripProps) {
  const t = getTranslation(locale);

  const certs = [
    {
      label: t.greenCert.techTitle,
      value: t.greenCert.techNumber,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
    },
    {
      label: t.greenCert.productTitle,
      value: t.greenCert.productNumber,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
    {
      label: locale === 'en' ? 'Valid Period' : '유효기간',
      value: t.greenCert.period,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      className="py-5 sm:py-8"
      style={{
        background: 'linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 50%, #f0f9ff 100%)',
        borderBottom: '3px solid var(--secondary-700)',
      }}
      aria-label="녹색인증 배너"
    >
      <div className="section-container">
        {/* Header: cert mark + title */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div
            className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: 'rgba(225,29,72,0.08)', border: '1px solid rgba(225,29,72,0.2)' }}
          >
            <Image
              src="/images/green-cert-mark.png"
              alt="녹색인증마크"
              width={64}
              height={64}
              className="object-contain"
              sizes="64px"
            />
          </div>
          <div>
            <p
              className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-0.5"
              style={{ color: 'var(--secondary-700)' }}
            >
              {t.greenCert.badge}
            </p>
            <p className="text-xs sm:text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t.greenCert.description}
            </p>
          </div>
        </div>

        {/* 3 certs — always 1 row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {certs.map((cert, i) => (
            <div
              key={i}
              className="relative rounded-xl px-2 py-3 sm:px-5 sm:py-4 text-center overflow-hidden"
              style={{
                background: 'white',
                border: '1px solid rgba(225,29,72,0.18)',
                boxShadow: '0 2px 8px rgba(225,29,72,0.08)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: 'linear-gradient(90deg, var(--secondary-700), var(--secondary-500))' }}
              />
              <div
                className="mx-auto w-7 h-7 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2"
                style={{ background: 'rgba(225,29,72,0.08)', color: 'var(--secondary-700)' }}
              >
                <span className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                  {cert.icon}
                </span>
              </div>
              <p
                className="text-[10px] sm:text-xs font-semibold mb-0.5 sm:mb-1"
                style={{ color: 'var(--secondary-700)' }}
              >
                {cert.label}
              </p>
              <p
                className="text-[10px] sm:text-sm font-bold font-mono leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {cert.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
