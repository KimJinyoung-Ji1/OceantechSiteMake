import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import Badge from '@/components/ui/Badge';

interface GreenCertStripProps {
  locale: Locale;
}

export default function GreenCertStrip({ locale }: GreenCertStripProps) {
  const t = getTranslation(locale);

  return (
    <section
      className="py-6 px-4"
      style={{ background: 'linear-gradient(90deg, var(--primary-900) 0%, var(--primary-700) 100%)' }}
      aria-label="녹색인증 배너"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="green" className="text-xs">
            {t.greenCert.badge}
          </Badge>
          <span className="text-white font-semibold text-sm sm:text-base">
            {t.greenCert.description}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center">
            <p className="text-xs font-medium" style={{ color: 'var(--primary-300)' }}>
              {t.greenCert.techTitle}
            </p>
            <p className="text-sm font-bold" style={{ color: 'var(--secondary-500)' }}>
              {t.greenCert.techNumber}
            </p>
          </div>
          <div
            className="w-px h-8 hidden sm:block"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />
          <div className="text-center">
            <p className="text-xs font-medium" style={{ color: 'var(--primary-300)' }}>
              {t.greenCert.productTitle}
            </p>
            <p className="text-sm font-bold" style={{ color: 'var(--secondary-500)' }}>
              {t.greenCert.productNumber}
            </p>
          </div>
          <div
            className="w-px h-8 hidden sm:block"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />
          <p className="text-xs" style={{ color: 'var(--primary-300)' }}>
            {t.greenCert.period}
          </p>
        </div>
      </div>
    </section>
  );
}
