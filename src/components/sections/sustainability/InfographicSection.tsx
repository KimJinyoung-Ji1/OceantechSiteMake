import type { Locale } from '@/lib/i18n';
import { ShieldCheck, Leaf, Coins, Timer } from '@phosphor-icons/react/dist/ssr';

interface InfographicSectionProps {
  locale: Locale;
}

const items = [
  {
    ko: '중금속 해양 오염 예방',
    en: 'Heavy Metal Pollution Prevention',
    bodyKo: '아연은 해수에 자연적으로 존재하는 미네랄로, 납과 달리 해양 생태계에 독성을 미치지 않습니다. 납추 사용 중단만으로도 해양 중금속 오염을 연간 수천 톤 감소시킬 수 있습니다.',
    bodyEn: 'Zinc is a mineral naturally present in seawater. Unlike lead, it poses no toxicity to marine ecosystems. Simply replacing lead weights can reduce marine heavy metal pollution by thousands of tons annually.',
    icon: <ShieldCheck size={36} weight="duotone" color="var(--secondary-700)" />,
    accent: 'var(--secondary-700)',
    accentBg: 'rgba(23,233,181,0.08)',
    accentBorder: 'rgba(23,233,181,0.2)',
  },
  {
    ko: '탄소중립 정책 부합',
    en: 'Carbon Neutrality Aligned',
    bodyKo: '환경부 녹색기술인증 및 녹색기술제품 확인을 획득한 제품으로, 탄소중립기본법 제60조에 근거한 탄소중립 정책에 정식으로 부합합니다.',
    bodyEn: 'Certified under the Ministry of Environment Green Technology program. Fully compliant with Korea\'s Carbon Neutrality Framework Act, Article 60.',
    icon: <Leaf size={36} weight="duotone" color="var(--secondary-700)" />,
    accent: 'var(--secondary-700)',
    accentBg: 'rgba(23,233,181,0.08)',
    accentBorder: 'rgba(23,233,181,0.2)',
  },
  {
    ko: '어민 소득 80% 비용 절감',
    en: '80% Cost Reduction for Fishers',
    bodyKo: '아연추의 수명은 납추의 5배 이상으로, 어민 1인당 연간 어망추 교체 비용을 80% 이상 절감합니다. 강원도 고성군 시범사업에서 실증되었습니다.',
    bodyEn: 'Zinc weights last 5x longer than lead, cutting per-fisher annual replacement costs by over 80%. Proven in the Goseong County pilot.',
    icon: <Coins size={36} weight="duotone" color="var(--primary-500)" />,
    accent: 'var(--primary-500)',
    accentBg: 'rgba(1,104,239,0.06)',
    accentBorder: 'rgba(1,104,239,0.15)',
  },
  {
    ko: '수명 10년, 교체 최소화',
    en: '10-Year Lifespan, Minimal Replacement',
    bodyKo: '30개월 실사용 테스트에서 무게 손실 1g 이하를 기록. 내구성 검증으로 납추 교체 주기(1~2년)와 비교해 10년 이상 사용 가능합니다.',
    bodyEn: 'Under 1g weight loss in 30-month real-use tests. Verified durability enables 10+ year use vs lead replacement cycles of 1–2 years.',
    icon: <Timer size={36} weight="duotone" color="var(--primary-500)" />,
    accent: 'var(--primary-500)',
    accentBg: 'rgba(1,104,239,0.06)',
    accentBorder: 'rgba(1,104,239,0.15)',
  },
];

export default function InfographicSection({ locale }: InfographicSectionProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-16 lg:py-20" style={{ background: 'var(--background)' }} aria-label="환경 영향">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--secondary-700,#047857)' }}>
            {isEn ? 'ENVIRONMENTAL IMPACT' : '환경 영향'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--secondary-700)' }}>
            {isEn ? 'Why It Matters' : '아연추가 만드는 변화'}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex flex-col text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'white',
                border: `1px solid ${item.accentBorder}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="px-6 pt-8 pb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: item.accentBg, border: `1px solid ${item.accentBorder}` }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {isEn ? item.en : item.ko}
                </h3>
              </div>

              <div className="mx-6" style={{ height: '1px', background: 'var(--gray-100)' }} />

              <div className="px-6 py-5 flex-1">
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
