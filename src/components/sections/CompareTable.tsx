import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface CompareTableProps {
  locale: Locale;
}

export default function CompareTable({ locale }: CompareTableProps) {
  const t = getTranslation(locale);

  return (
    <section
      className="py-10 sm:py-16 lg:py-20"
      style={{ background: 'var(--background)' }}
      aria-label="아연추 vs 납추 비교"
    >
      <div className="section-container">
        <div className="text-center mb-6 sm:mb-10">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {locale === 'en' ? 'COMPARISON' : '성능 비교'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
            {t.compare.title}
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 4px 24px rgba(157,23,77,0.08), 0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid rgba(157,23,77,0.10)',
          }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-[minmax(56px,1fr)_2fr_2fr]">
            {/* Empty corner */}
            <div
              className="px-1 sm:px-4 py-2 sm:py-4 flex items-center justify-center"
              style={{ background: '#f8fafc' }}
            />
            {/* Zinc header — winner with ribbon badge */}
            <div
              className="px-1 sm:px-4 py-2 sm:py-4 text-center relative overflow-visible"
              style={{
                background: 'linear-gradient(135deg, #9D174D 0%, #EC4899 100%)',
              }}
            >
              {/* Ribbon badge — top-right corner */}
              <div
                className="absolute -top-1 -right-1 sm:-top-1 sm:-right-1 z-10"
                style={{ width: '36px', height: '36px' }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #FB7185 0%, #E11D48 100%)',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                    borderRadius: '0 8px 0 0',
                  }}
                />
                <svg className="absolute top-1 right-1" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l4 4 6-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-white font-extrabold text-xs sm:text-xl leading-tight">{t.compare.zinc}</p>
              <p className="text-white/70 text-[10px] sm:text-sm mt-0.5">(주)오션테크</p>
            </div>
            {/* Lead header — muted */}
            <div
              className="px-1 sm:px-4 py-2 sm:py-4 text-center"
              style={{ background: '#f1f5f9' }}
            >
              <p className="font-bold text-xs sm:text-xl leading-tight" style={{ color: '#94a3b8' }}>{t.compare.lead}</p>
              <p className="text-[10px] sm:text-sm mt-0.5" style={{ color: '#b0b8c4' }}>{locale === 'en' ? 'Conventional' : '기존 제품'}</p>
            </div>
          </div>

          {/* Rows */}
          {t.compare.rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[minmax(56px,1fr)_2fr_2fr]"
              style={{
                borderTop: '1px solid #e2e8f0',
              }}
            >
              {/* Label */}
              <div
                className="px-2 sm:px-4 py-3 sm:py-4 font-bold text-[11px] sm:text-base flex items-center justify-center text-center"
                style={{
                  color: 'var(--primary-900)',
                  background: i % 2 === 0 ? '#f8fafc' : '#ffffff',
                }}
              >
                {row.label}
              </div>

              {/* Zinc value — strong, positive */}
              <div
                className="px-2 sm:px-4 py-3 sm:py-4 flex flex-col items-center justify-center text-center"
                style={{
                  background: i % 2 === 0 ? 'rgba(157,23,77,0.03)' : 'rgba(157,23,77,0.01)',
                  borderLeft: '1px solid #e2e8f0',
                }}
              >
                <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="11" fill="var(--primary-500)" />
                    <path d="M6.5 11.5l3 3 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    className="text-[11px] sm:text-base font-bold leading-tight"
                    style={{ color: 'var(--primary-900)' }}
                  >
                    {row.zinc}
                  </span>
                </div>
              </div>

              {/* Lead value — dim, negative */}
              <div
                className="px-2 sm:px-4 py-3 sm:py-4 flex flex-col items-center justify-center text-center"
                style={{
                  background: i % 2 === 0 ? '#fafafa' : '#ffffff',
                  borderLeft: '1px solid #e2e8f0',
                }}
              >
                <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="11" fill="#FEE2E2" />
                    <path d="M8 8l6 6M14 8l-6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span
                    className="text-[11px] sm:text-base font-medium leading-tight"
                    style={{ color: '#9ca3af' }}
                  >
                    {row.lead}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
