import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface PerformanceSectionProps {
  locale: Locale;
}

export default function PerformanceSection({ locale }: PerformanceSectionProps) {
  const isEn = locale === 'en';
  const performance = SITE_CONFIG.performance;

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'var(--gray-50)' }}
      aria-label="실적"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-12">
          <p
            className="text-base font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'PERFORMANCE' : '주요 실적'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Contract & Delivery Record' : '납품 계약 실적'}
          </h2>
        </div>

        <div className="space-y-5 max-w-3xl mx-auto">
          {performance.map((p) => (
            <article
              key={p.year}
              className="p-6 rounded-2xl"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              <p
                className="text-3xl font-extrabold mb-4"
                style={{ color: 'var(--primary-500)' }}
              >
                {p.year}
              </p>
              <ul className="space-y-2">
                {(isEn ? p.itemsEn : p.itemsKo).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                      style={{ background: 'var(--secondary-500)' }}
                      aria-hidden="true"
                    />
                    <span className="text-base leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
