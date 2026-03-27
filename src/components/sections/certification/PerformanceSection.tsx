import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface PerformanceSectionProps {
  locale: Locale;
}

const yearDetails: Record<string, { ko: string; en: string }> = {
  '2022': {
    ko: '수협중앙회와의 단가계약으로 아연 어망추의 상업적 가능성을 입증하며 친환경 어업 전환의 새로운 이정표를 세웠습니다. 강원 고성군 실증사업은 실제 어업 현장에서의 성능 검증의 시작점이었습니다.',
    en: 'The unit-price contract with SUHYUP proved the commercial viability of zinc fishing weights, marking a new milestone in eco-friendly fishery transition. The Goseong pilot was the starting point for real-world field validation.',
  },
  '2023': {
    ko: '31개월 실증사업을 통해 아연추의 내구성과 비용 절감 효과가 수치로 확인되었습니다. 벤처기업 확인과 대한민국 우수특허대상 수상으로 기업 신뢰도와 기술력을 동시에 공인받은 해였습니다.',
    en: 'The 31-month pilot program confirmed zinc weight durability and cost savings with measured data. Venture company certification and the Korea Excellence Patent Award gave dual recognition of credibility and technical prowess.',
  },
  '2024': {
    ko: '국내 공인기관 TAK, TBK로부터 시험성적서를 확보하고 EU REACH 기준 SVHC 235종 불검출 보고서를 취득하며 국제 시장 진출을 위한 공식 서류 기반을 완성했습니다.',
    en: 'Secured test reports from accredited domestic bodies TAK and TBK, and obtained an SVHC non-detection report (235 substances under EU REACH), completing the official documentation base for international market entry.',
  },
};

const yearGrads = [
  'linear-gradient(135deg, #021097 0%, #0168EF 100%)',
  'linear-gradient(135deg, #0EAD87 0%, #17E9B5 100%)',
  'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
];

export default function PerformanceSection({ locale }: PerformanceSectionProps) {
  const isEn = locale === 'en';
  const performance = SITE_CONFIG.performance;

  return (
    <section
      className="py-8 sm:py-16 lg:py-20"
      style={{ background: '#f8fafc' }}
      aria-label="실적"
    >
      <div className="section-container">
        <div className="text-center mb-5 sm:mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'PERFORMANCE' : '주요 실적'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Contract & Delivery Record' : '납품 계약 실적'}
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical timeline line — desktop */}
          <div
            className="hidden sm:block absolute left-[28px] top-4 bottom-4 w-[2px]"
            style={{ background: 'linear-gradient(180deg, #021097 0%, #0EAD87 50%, #D97706 100%)' }}
            aria-hidden="true"
          />

          <div className="space-y-3 sm:space-y-5">
            {performance.map((p, idx) => {
              const detail = yearDetails[p.year];
              const grad = yearGrads[idx % yearGrads.length];
              return (
                <article
                  key={p.year}
                  className="relative sm:pl-16 rounded-xl sm:rounded-2xl overflow-hidden"
                  style={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 12px rgba(2,16,151,0.05)',
                  }}
                >
                  {/* Timeline node — desktop */}
                  <div
                    className="hidden sm:flex absolute left-0 top-5 w-14 h-14 rounded-full items-center justify-center z-10"
                    style={{ background: grad, boxShadow: '0 4px 16px rgba(2,18,151,0.2)' }}
                  >
                    <span className="text-sm font-black text-white">{p.year}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
                    {/* Left: year + bullet items */}
                    <div className="p-3 sm:p-6">
                      {/* Mobile year badge */}
                      <div
                        className="sm:hidden inline-block px-2.5 py-1 rounded-lg text-xs font-black text-white mb-2"
                        style={{ background: grad }}
                      >
                        {p.year}
                      </div>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {(isEn ? p.itemsEn : p.itemsKo).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3">
                            <svg className="mt-1 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="8" fill={grad.includes('0EAD87') ? '#0EAD87' : grad.includes('D97706') ? '#D97706' : '#0168EF'} opacity="0.15" />
                              <path d="M5 8l2 2 4-4" stroke={grad.includes('0EAD87') ? '#0EAD87' : grad.includes('D97706') ? '#D97706' : '#0168EF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-xs sm:text-base font-medium leading-snug" style={{ color: 'var(--gray-700)' }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: description */}
                    <div
                      className="p-3 sm:p-6 flex items-center"
                      style={{ background: '#fafbfc', borderLeft: '1px solid #f1f5f9' }}
                    >
                      {detail && (
                        <p className="text-[11px] sm:text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>
                          {isEn ? detail.en : detail.ko}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
