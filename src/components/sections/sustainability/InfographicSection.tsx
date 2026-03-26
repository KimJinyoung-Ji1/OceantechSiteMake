import type { Locale } from '@/lib/i18n';

interface InfographicSectionProps {
  locale: Locale;
}

const items = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        {/* Shield with leaf — pollution prevention */}
        <path d="M18 4 L30 9 L30 20 C30 27 18 33 18 33 C18 33 6 27 6 20 L6 9 Z" stroke="var(--secondary-500)" strokeWidth="2" fill="rgba(23,233,181,0.1)" strokeLinejoin="round" />
        <path d="M12 19 Q15 14 18 18 Q21 22 24 17" stroke="var(--secondary-600,#059669)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="18" cy="18" r="2" fill="var(--secondary-500)" />
      </svg>
    ),
    ko: '중금속 해양 오염 예방',
    en: 'Prevents Heavy Metal Ocean Pollution',
    bodyKo: '아연은 해수에 자연적으로 존재하는 미네랄로, 납과 달리 해양 생태계에 독성을 미치지 않습니다. 납추 사용 중단만으로도 해양 중금속 오염을 연간 수천 톤 감소시킬 수 있습니다.',
    bodyEn: 'Zinc is a mineral naturally present in seawater. Unlike lead, it poses no toxicity to marine ecosystems. Simply replacing lead weights can reduce marine heavy metal pollution by thousands of tons annually.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        {/* Leaf / carbon neutrality */}
        <path d="M18 6 C10 6 5 14 5 22 C5 22 12 18 18 20 C24 22 30 20 32 14 C28 8 22 6 18 6Z" stroke="var(--secondary-500)" strokeWidth="2" fill="rgba(23,233,181,0.12)" />
        <path d="M18 20 L18 30" stroke="var(--secondary-600,#059669)" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 26 Q18 28 23 26" stroke="var(--secondary-400)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    ko: '탄소중립 정책 부합',
    en: 'Aligned with Carbon Neutrality Policy',
    bodyKo: '환경부 녹색기술인증 및 녹색기술제품 확인을 획득한 제품으로, 탄소중립기본법 제60조에 근거한 탄소중립 정책에 정식으로 부합합니다.',
    bodyEn: 'Officially certified under the Ministry of Environment Green Technology program. Compliant with Korea\'s carbon neutrality policy under Framework Act on Carbon Neutrality, Article 60.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        {/* Coin / cost savings */}
        <circle cx="18" cy="18" r="13" stroke="var(--primary-400)" strokeWidth="2" fill="rgba(59,130,246,0.08)" />
        <circle cx="18" cy="18" r="9" stroke="var(--primary-300)" strokeWidth="1.5" fill="none" />
        <path d="M18 11 L18 14 M18 22 L18 25" stroke="var(--primary-500)" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 14.5 C14 13 22 13 22 15.5 C22 18 14 18 14 20.5 C14 23 22 23 22 21.5" stroke="var(--primary-500)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
    ko: '어민 소득 80% 비용 절감',
    en: '80% Cost Reduction for Fishers',
    bodyKo: '아연추의 수명은 납추의 5배 이상으로, 어민 1인당 연간 어망추 교체 비용을 80% 이상 절감합니다. 강원도 고성군 시범사업에서 실증되었습니다.',
    bodyEn: 'Zinc weights last 5x longer than lead, cutting per-fisher annual replacement costs by over 80%. Proven in the Goseong County, Gangwon pilot program.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        {/* Clock / longevity */}
        <circle cx="18" cy="18" r="13" stroke="var(--secondary-500)" strokeWidth="2" fill="rgba(23,233,181,0.08)" />
        <path d="M18 10 L18 18 L24 22" stroke="var(--secondary-600,#059669)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="1.5" fill="var(--secondary-500)" />
        <path d="M18 6 L18 8 M30 18 L28 18 M18 30 L18 28 M6 18 L8 18" stroke="var(--secondary-400)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    ko: '수명 10년, 교체 최소화',
    en: '10-Year Lifespan, Minimal Replacement',
    bodyKo: '30개월 실사용 테스트에서 무게 손실 1g 이하를 기록. 내구성 검증으로 납추 교체 주기(1~2년)와 비교해 10년 이상 사용 가능합니다.',
    bodyEn: 'Under 1g weight loss recorded in 30-month real-use tests. Verified durability enables 10+ year use compared to lead weight replacement cycles of 1–2 years.',
  },
];

export default function InfographicSection({ locale }: InfographicSectionProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-16 lg:py-20" style={{ background: 'var(--background-alt)' }} aria-label="환경 영향">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-10">
          <p className="section-eyebrow" style={{ color: 'var(--secondary-700,#047857)' }}>
            {isEn ? 'ENVIRONMENTAL IMPACT' : '환경 영향'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Why It Matters' : '아연추가 만드는 변화'}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              {/* Icon + Title */}
              <div className="p-6 flex flex-col items-center text-center gap-3">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(23,233,181,0.10)' }}
                >
                  {item.icon}
                </div>
                <p className="text-base font-bold leading-snug" style={{ color: 'var(--gray-800)' }}>
                  {isEn ? item.en : item.ko}
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--gray-200)' }} />

              {/* Body */}
              <div className="p-4 flex-1">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>
                  {isEn ? item.bodyEn : item.bodyKo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
