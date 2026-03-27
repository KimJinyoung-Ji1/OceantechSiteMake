import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface CompareTableProps {
  locale: Locale;
}

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="11" fill="var(--primary-900,#021097)" />
    <path d="M6.5 11.5l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="11" fill="#DC2626" opacity="0.15" />
    <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function CompareTable({ locale }: CompareTableProps) {
  const t = getTranslation(locale);

  return (
    <section
      className="py-10 sm:py-16 lg:py-20"
      style={{ background: 'var(--background)' }}
      aria-label="아연추 vs 납추 비교"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24">
        <div className="text-center mb-6 sm:mb-10">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {locale === 'en' ? 'COMPARISON' : '성능 비교'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
            {t.compare.title}
          </h2>
        </div>

        <div className="overflow-x-auto">
        <div
          className="rounded-2xl overflow-hidden shadow-lg min-w-[320px] lg:min-w-[480px]"
          style={{ border: '1px solid rgba(14,173,135,0.20)' }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_2fr_2fr]">
            <div
              className="px-2 sm:px-3 py-2 sm:py-4"
              style={{ background: '#F8FFFE', borderRight: '1px solid rgba(14,173,135,0.15)' }}
            />
            <div
              className="px-2 sm:px-3 py-2 sm:py-4 text-center"
              style={{
                background: 'linear-gradient(135deg, #021097 0%, #0168EF 100%)',
                borderRight: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-0.5">
                <CheckIcon />
                <p className="text-white font-bold text-sm sm:text-xl leading-tight">{t.compare.zinc}</p>
              </div>
              <p className="text-white/75 text-xs sm:text-base">(주)오션테크</p>
            </div>
            <div
              className="px-2 sm:px-3 py-2 sm:py-4 text-center"
              style={{ background: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)' }}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-0.5">
                <XIcon />
                <p className="text-white font-bold text-sm sm:text-xl leading-tight">{t.compare.lead}</p>
              </div>
              <p className="text-white/75 text-xs sm:text-base">{locale === 'en' ? 'Conventional Product' : '기존 제품'}</p>
            </div>
          </div>

          {/* Rows */}
          {t.compare.rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_2fr_2fr] border-t"
              style={{
                borderColor: 'rgba(14,173,135,0.12)',
                background: i % 2 === 0 ? '#FFFFFF' : '#F8FFFE',
              }}
            >
              {/* Label — narrow, centered */}
              <div
                className="px-2 sm:px-3 py-2 sm:py-3 font-semibold text-xs sm:text-lg flex items-center justify-center text-center"
                style={{
                  color: 'var(--text-primary)',
                  borderRight: '1px solid rgba(14,173,135,0.12)',
                }}
              >
                {row.label}
              </div>

              {/* Zinc value — centered cell, left-aligned content */}
              <div
                className="px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-center border-r"
                style={{ borderColor: 'rgba(14,173,135,0.12)' }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2" style={{ textAlign: 'left' }}>
                  <span className="shrink-0"><CheckIcon /></span>
                  <span
                    className="text-xs sm:text-xl font-bold"
                    style={{ color: 'var(--primary-900,#021097)' }}
                  >
                    {row.zinc}
                  </span>
                </div>
              </div>

              {/* Lead value — centered cell, left-aligned content */}
              <div className="px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-center">
                <div className="flex items-center gap-1.5 sm:gap-2" style={{ textAlign: 'left' }}>
                  <span className="shrink-0"><XIcon /></span>
                  <span
                    className="text-xs sm:text-xl font-bold"
                    style={{ color: '#9CA3AF' }}
                  >
                    {row.lead}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
