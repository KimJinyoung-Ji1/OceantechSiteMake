'use client';

import type { Locale } from '@/lib/i18n';

interface FullCompareSectionProps {
  locale: Locale;
}

const rows = [
  { ko: '재질', en: 'Material', good: '아연(Zn)', goodEn: 'Zinc(Zn)', bad: '납(Pb)', badEn: 'Lead(Pb)' },
  { ko: '독성', en: 'Toxicity', good: '무독성', goodEn: 'Non-toxic', bad: 'IARC 2A', badEn: 'IARC 2A' },
  { ko: '내구성', en: 'Durability', good: '약 10년', goodEn: '~10 years', bad: '1~2년', badEn: '1–2 years' },
  { ko: '무게변화', en: 'Weight', good: '30개월 1g', goodEn: '1g / 30mo', bad: '연 15~20%', badEn: '15–20%/yr' },
  { ko: '형상유지', en: 'Shape', good: '원형 유지', goodEn: 'Intact', bad: '충격 취약', badEn: 'Fragile' },
  { ko: '그물손상', en: 'Net', good: '없음', goodEn: 'None', bad: '파편 훼손', badEn: 'Damage' },
  { ko: '비용', en: 'Cost', good: '80% 절감', goodEn: '80% less', bad: '지속 발생', badEn: 'Recurring' },
  { ko: '인증', en: 'Cert', good: '녹색기술', goodEn: 'Green Tech', bad: '없음', badEn: 'None' },
];

export default function FullCompareSection({ locale }: FullCompareSectionProps) {
  const isEn = locale === 'en';

  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)' }}
      aria-label="납추 vs 아연추 비교"
    >
      <div className="section-container">
        <div className="text-center mb-8 md:mb-14">
          <p className="section-eyebrow" style={{ color: '#C2410C' }}>
            {isEn ? 'DETAILED COMPARISON' : '상세 비교'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
            {isEn ? 'Zinc vs Lead' : '아연추 vs 납추'}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header bar — desktop only (hidden on mobile) */}
          <div
            className="hidden sm:grid grid-cols-[1fr_1px_1fr] items-center rounded-t-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--primary-900,#021097) 0%, var(--primary-700,#0148C8) 100%)' }}
          >
            <div className="px-6 py-4 flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F97316' }} />
              <span className="text-sm font-bold text-white tracking-wide">
                {isEn ? 'OceanTech Zinc' : '오션테크 아연추'}
              </span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', width: '1px', alignSelf: 'stretch' }} />
            <div className="px-6 py-4 flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#64748B' }} />
              <span className="text-sm font-bold tracking-wide" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {isEn ? 'Lead Weight' : '기존 납추'}
              </span>
            </div>
          </div>

          {/* Mobile header — 3 cols matching rows */}
          <div
            className="sm:hidden grid grid-cols-[1fr_52px_1fr] rounded-t-xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
          >
            <div className="px-2 py-2.5 flex items-center justify-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#17E9B5' }} />
              <span className="text-[10px] font-bold text-white">
                {isEn ? 'Zinc' : '오션테크 아연추'}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-center" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-[10px] font-bold text-white/40">VS</span>
            </div>
            <div className="px-2 py-2.5 flex items-center justify-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#94a3b8' }} />
              <span className="text-[10px] font-bold text-white/60">
                {isEn ? 'Lead' : '기존 납추'}
              </span>
            </div>
          </div>

          {/* Rows */}
          <div
            className="rounded-b-2xl overflow-hidden"
            style={{ border: '1px solid var(--gray-200)', borderTop: 'none' }}
          >
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  borderTop: i > 0 ? '1px solid var(--gray-100)' : 'none',
                  background: 'white',
                }}
              >
                {/* Desktop row */}
                <div
                  className="hidden sm:grid group grid-cols-[1fr_auto_1fr] items-center transition-all duration-400 cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, rgba(249,115,22,0.03) 0%, white 30%, white 70%, rgba(148,163,184,0.03) 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                  }}
                >
                  <div className="px-6 py-4 flex items-center gap-3 justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <path d="M2 8l4.5 4.5L14 5" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-base font-semibold transition-all duration-300 group-hover:tracking-wide" style={{ color: '#EA580C' }}>
                      {isEn ? row.goodEn : row.good}
                    </span>
                  </div>
                  <div className="w-px self-stretch transition-all duration-300" style={{ background: 'var(--gray-100)', position: 'relative' }}>
                    <span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-bold px-4 py-1.5 rounded-full transition-all duration-300 group-hover:shadow-sm"
                      style={{ background: 'var(--primary-50)', color: 'var(--primary-700)', border: '1px solid var(--primary-100)' }}
                    >
                      {isEn ? row.en : row.ko}
                    </span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3 justify-center">
                    <span className="text-base transition-all duration-300" style={{ color: 'var(--gray-500)' }}>
                      {isEn ? row.badEn : row.bad}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <path d="M3 3l8 8M11 3l-8 8" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Mobile row — 3 cols, fixed center width */}
                <div
                  className="sm:hidden grid grid-cols-[1fr_52px_1fr] items-center"
                  style={{ background: i % 2 === 0 ? 'white' : '#fafbfc' }}
                >
                  <div className="px-1.5 py-2.5 flex items-center justify-center text-center">
                    <span className="text-[11px] font-bold" style={{ color: '#0EAD87' }}>
                      {isEn ? row.goodEn : row.good}
                    </span>
                  </div>
                  <div
                    className="py-2.5 flex items-center justify-center self-stretch"
                    style={{ background: '#f1f5f9', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}
                  >
                    <span className="text-[10px] font-bold leading-tight text-center" style={{ color: '#475569' }}>
                      {isEn ? row.en : row.ko}
                    </span>
                  </div>
                  <div className="px-1.5 py-2.5 flex items-center justify-center text-center">
                    <span className="text-[11px] font-medium" style={{ color: '#cbd5e1' }}>
                      {isEn ? row.badEn : row.bad}
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
