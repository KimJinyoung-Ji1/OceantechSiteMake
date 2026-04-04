'use client';

import { getTranslation } from '@/lib/i18n';
import ScrollReveal from '@/components/ui/ScrollReveal';
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
        <ScrollReveal>
        <div className="text-center mb-6 sm:mb-10">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {locale === 'en' ? 'COMPARISON' : '성능 비교'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
            {t.compare.title}
          </h2>
        </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 4px 24px rgba(2,16,151,0.08), 0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid rgba(2,16,151,0.10)',
          }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-[minmax(70px,1.2fr)_2fr_2fr]">
            {/* Empty corner */}
            <div
              className="px-2 sm:px-4 py-3 sm:py-5 flex items-center justify-center"
              style={{ background: '#f8fafc' }}
            />
            {/* Zinc header — winner */}
            <div
              className="px-2 sm:px-4 py-3 sm:py-5 text-center relative"
              style={{
                background: 'linear-gradient(135deg, #021097 0%, #0168EF 100%)',
              }}
            >
              {/* Recommended badge */}
              <div
                className="absolute -top-0 left-1/2 -translate-x-1/2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-b-lg text-xs sm:text-sm font-bold tracking-wider uppercase"
                style={{ background: 'var(--secondary-500)', color: 'var(--primary-900)' }}
              >
                {locale === 'en' ? 'RECOMMENDED' : '추천'}
              </div>
              <div className="mt-2 sm:mt-3">
                <p className="text-white font-extrabold text-sm sm:text-xl leading-tight">{t.compare.zinc}</p>
                <p className="text-white/85 text-xs sm:text-sm mt-0.5">(주)오션테크</p>
              </div>
            </div>
            {/* Lead header — muted */}
            <div
              className="px-2 sm:px-4 py-3 sm:py-5 text-center"
              style={{ background: '#f1f5f9' }}
            >
              <div className="mt-2 sm:mt-3">
                <p className="font-bold text-sm sm:text-xl leading-tight" style={{ color: '#64748b' }}>{t.compare.lead}</p>
                <p className="text-xs sm:text-sm mt-0.5" style={{ color: '#64748b' }}>{locale === 'en' ? 'Conventional' : '기존 제품'}</p>
              </div>
            </div>
          </div>

          {/* Rows */}
          {t.compare.rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[minmax(70px,1.2fr)_2fr_2fr]"
            >
              {/* Label */}
              <div
                className="px-2 sm:px-4 py-3 sm:py-4 font-bold text-[11px] sm:text-base flex items-center justify-center text-center"
                style={{
                  color: 'var(--primary-900)',
                  background: i % 2 === 0 ? '#f8fafc' : '#f1f5f9',
                }}
              >
                {row.label}
              </div>

              {/* Zinc value — strong, positive */}
              <div
                className="px-2 sm:px-4 py-3 sm:py-4 flex flex-col items-center justify-center text-center"
                style={{
                  background: i % 2 === 0 ? 'rgba(2,16,151,0.04)' : 'rgba(2,16,151,0.02)',
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
                  background: i % 2 === 0 ? '#f5f7fa' : '#ffffff',
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
                    style={{ color: '#6b7280' }}
                  >
                    {row.lead}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
