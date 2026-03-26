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
      className="py-7 px-4"
      style={{
        background: '#FFFFFF',
        borderBottom: '3px solid var(--secondary-700)',
      }}
      aria-label="녹색인증 배너"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
        {/* Left: cert mark image */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: 'rgba(14,173,135,0.08)', border: '1px solid rgba(14,173,135,0.2)' }}
          >
            <Image
              src="/images/green-cert-mark.png"
              alt="녹색인증마크"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
          {/* Center: title + description */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-0.5"
              style={{ color: 'var(--secondary-700)' }}
            >
              {t.greenCert.badge}
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t.greenCert.description}
            </p>
          </div>
        </div>

        {/* Right: two pill tags */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex flex-col items-center px-4 py-2 rounded-full"
            style={{
              background: 'rgba(14,173,135,0.07)',
              border: '1px solid rgba(14,173,135,0.2)',
            }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--secondary-700)' }}
            >
              {t.greenCert.techTitle}
            </span>
            <span
              className="text-sm font-bold font-mono"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.greenCert.techNumber}
            </span>
          </div>
          <div
            className="flex flex-col items-center px-4 py-2 rounded-full"
            style={{
              background: 'rgba(14,173,135,0.07)',
              border: '1px solid rgba(14,173,135,0.2)',
            }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--secondary-700)' }}
            >
              {t.greenCert.productTitle}
            </span>
            <span
              className="text-sm font-bold font-mono"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.greenCert.productNumber}
            </span>
          </div>
          <div
            className="flex flex-col items-center px-4 py-2 rounded-full"
            style={{
              background: 'rgba(14,173,135,0.07)',
              border: '1px solid rgba(14,173,135,0.2)',
            }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--secondary-700)' }}
            >
              {locale === 'en' ? 'Valid Period' : '유효기간'}
            </span>
            <span
              className="text-xs font-semibold"
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
