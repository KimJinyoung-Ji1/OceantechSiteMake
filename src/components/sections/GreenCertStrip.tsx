import Image from 'next/image';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface GreenCertStripProps {
  locale: Locale;
}

export default function GreenCertStrip({ locale }: GreenCertStripProps) {
  const t = getTranslation(locale);

  return (
    <section
      className="py-4 sm:py-8 px-4"
      style={{
        background: 'linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 50%, #f0f9ff 100%)',
        borderBottom: '3px solid var(--secondary-700)',
      }}
      aria-label="녹색인증 배너"
    >
      <div className="section-container flex flex-wrap items-center justify-between gap-3 sm:gap-6">
        {/* Left: cert mark image */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: 'rgba(14,173,135,0.08)', border: '1px solid rgba(14,173,135,0.2)' }}
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
          {/* Center: title + description */}
          <div>
            <p
              className="section-eyebrow text-[10px] sm:text-xs"
              style={{ color: 'var(--secondary-700)' }}
            >
              {t.greenCert.badge}
            </p>
            <p className="text-sm sm:text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t.greenCert.description}
            </p>
          </div>
        </div>

        {/* Right: two pill tags */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div
            className="flex flex-col items-center px-3 sm:px-6 py-2 sm:py-3 rounded-full"
            style={{
              background: 'rgba(14,173,135,0.07)',
              border: '1px solid rgba(14,173,135,0.2)',
            }}
          >
            <span
              className="text-[10px] sm:text-sm font-medium"
              style={{ color: 'var(--secondary-700)' }}
            >
              {t.greenCert.techTitle}
            </span>
            <span
              className="text-xs sm:text-base font-bold font-mono"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.greenCert.techNumber}
            </span>
          </div>
          <div
            className="flex flex-col items-center px-3 sm:px-6 py-2 sm:py-3 rounded-full"
            style={{
              background: 'rgba(14,173,135,0.07)',
              border: '1px solid rgba(14,173,135,0.2)',
            }}
          >
            <span
              className="text-[10px] sm:text-sm font-medium"
              style={{ color: 'var(--secondary-700)' }}
            >
              {t.greenCert.productTitle}
            </span>
            <span
              className="text-xs sm:text-base font-bold font-mono"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.greenCert.productNumber}
            </span>
          </div>
          <div
            className="flex flex-col items-center px-3 sm:px-6 py-2 sm:py-3 rounded-full"
            style={{
              background: 'rgba(14,173,135,0.07)',
              border: '1px solid rgba(14,173,135,0.2)',
            }}
          >
            <span
              className="text-[10px] sm:text-sm font-medium"
              style={{ color: 'var(--secondary-700)' }}
            >
              {locale === 'en' ? 'Valid Period' : '유효기간'}
            </span>
            <span
              className="text-[10px] sm:text-sm font-semibold"
              style={{ color: 'var(--text-body)' }}
            >
              {t.greenCert.period}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
