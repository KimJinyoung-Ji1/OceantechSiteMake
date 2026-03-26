import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface PerformanceSectionProps {
  locale: Locale;
}

// Extended descriptions for each year
const yearDetails: Record<string, { ko: string; en: string }> = {
  '2022': {
    ko: '수협중앙회와의 단가계약으로 아연 어장추의 상업적 가능성을 입증하며 친환경 어업 전환의 새로운 이정표를 세웠습니다. 강원 고성군 실증사업은 실제 어업 현장에서의 성능 검증의 시작점이었습니다.',
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

export default function PerformanceSection({ locale }: PerformanceSectionProps) {
  const isEn = locale === 'en';
  const performance = SITE_CONFIG.performance;

  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'var(--background-alt)' }}
      aria-label="실적"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'PERFORMANCE' : '주요 실적'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Contract & Delivery Record' : '납품 계약 실적'}
          </h2>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {performance.map((p) => {
            const detail = yearDetails[p.year];
            return (
              <article
                key={p.year}
                className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1fr]"
                style={{
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                {/* Left: year + bullet items */}
                <div className="p-6">
                  <p
                    className="text-3xl sm:text-4xl font-extrabold mb-4"
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
                </div>

                {/* Right: extended description */}
                <div
                  className="p-6 flex items-center"
                  style={{
                    background: 'var(--gray-50)',
                    borderLeft: '1px solid var(--gray-200)',
                  }}
                >
                  {detail && (
                    <p className="text-base leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                      {isEn ? detail.en : detail.ko}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
