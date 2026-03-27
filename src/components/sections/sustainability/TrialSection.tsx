import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import { ClockCountdown, Anchor, Coin, ChartLineDown } from '@phosphor-icons/react/dist/ssr';

interface TrialSectionProps {
  locale: Locale;
}

export default function TrialSection({ locale }: TrialSectionProps) {
  const isEn = locale === 'en';

  const stats = [
    {
      value: `${SITE_CONFIG.stats.trialMonths}${isEn ? 'mo' : '개월'}`,
      labelKo: '시범사업 기간',
      labelEn: 'Trial Period',
      detailKo: '2020년~2023년 강원도 고성군 해역에서 실제 조업 환경 하에 진행된 장기 실증 시범사업입니다.',
      detailEn: 'Long-term pilot conducted from 2020–2023 in actual fishing conditions in Goseong waters.',
      icon: <ClockCountdown size={32} weight="duotone" color="var(--primary-500)" />,
    },
    {
      value: '19',
      labelKo: '참여 어선',
      labelEn: 'Fishing Vessels',
      detailKo: '강원도 고성군 수협 소속 19척의 어선이 참여하여 실제 어업 환경에서 효과를 검증했습니다.',
      detailEn: '19 vessels from Goseong Fisheries Cooperative verified effectiveness in real conditions.',
      icon: <Anchor size={32} weight="duotone" color="var(--primary-500)" />,
    },
    {
      value: isEn ? '~$80K' : '~1억원',
      labelKo: '사업 규모',
      labelEn: 'Project Scale',
      detailKo: '정부 지원금과 민간 투자를 합산한 실증 사업 총 규모로 양산 가능성을 검증했습니다.',
      detailEn: 'Total pilot scale combining government support and private investment for mass production validation.',
      icon: <Coin size={32} weight="duotone" color="var(--primary-500)" />,
    },
    {
      value: `${SITE_CONFIG.stats.costReduction}%`,
      labelKo: '비용 절감',
      labelEn: 'Cost Reduction',
      detailKo: '아연추 수명이 5배 이상 길어 어민 1인당 연간 교체 비용이 80% 이상 절감되었습니다.',
      detailEn: 'Zinc weights last 5x longer, reducing annual per-fisher replacement costs by over 80%.',
      icon: <ChartLineDown size={32} weight="duotone" color="var(--primary-500)" />,
    },
  ];

  return (
    <section
      className="py-8 md:py-16 lg:py-20"
      style={{ background: 'var(--background)' }}
      aria-label="시범사업 결과"
    >
      <div className="section-container">
        <div className="text-center mb-8 md:mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'PILOT PROGRAM' : '시범사업 결과'}
          </p>
          <h2 className="section-title mb-3" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'Goseong County, Gangwon' : '강원도 고성군 시범사업'}
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {isEn
              ? 'Real-world pilot completed with fishing boats in Goseong County.'
              : '강원도 고성군 수협 소속 어선과 함께 31개월 실증 시범사업을 완료했습니다.'}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex flex-col text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="px-3 md:px-6 pt-5 md:pt-8 pb-3 md:pb-4">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4"
                  style={{ background: 'rgba(1,104,239,0.06)', border: '1px solid rgba(1,104,239,0.12)' }}
                >
                  {s.icon}
                </div>
                <p
                  className="text-3xl md:text-5xl font-black mb-1 md:mb-2"
                  style={{ color: 'var(--primary-500)' }}
                >
                  {s.value}
                </p>
                <p className="text-sm md:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {isEn ? s.labelEn : s.labelKo}
                </p>
              </div>

              <div className="mx-3 md:mx-6" style={{ height: '1px', background: 'var(--gray-100)' }} />

              <div className="px-3 md:px-6 py-3 md:py-5 flex-1">
                <p className="text-xs md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {isEn ? s.detailEn : s.detailKo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
