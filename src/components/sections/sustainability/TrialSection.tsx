import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

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
      detailKo: '2020년~2023년 강원도 고성군 해역에서 실제 조업 환경 하에 진행된 장기 실증 시범사업 기간입니다.',
      detailEn: 'Long-term pilot conducted from 2020 to 2023 in actual fishing conditions in Goseong, Gangwon Province waters.',
    },
    {
      value: '19',
      labelKo: '참여 어선',
      labelEn: 'Fishing Vessels',
      detailKo: '강원도 고성군 수협 소속 19척의 어선이 참여하여 실제 어업 환경에서 아연추의 효과를 검증했습니다.',
      detailEn: '19 vessels affiliated with Goseong County Fisheries Cooperative verified the effectiveness of zinc weights in real fishing conditions.',
    },
    {
      value: isEn ? '~$80K' : '~1억원',
      labelKo: '사업 규모',
      labelEn: 'Project Scale',
      detailKo: '정부 지원금과 민간 투자를 합산한 실증 사업 총 규모로, 친환경 어망추 양산 가능성을 검증했습니다.',
      detailEn: 'Total pilot project scale combining government support and private investment, validating mass production viability of eco-friendly weights.',
    },
    {
      value: `${SITE_CONFIG.stats.costReduction}%`,
      labelKo: '비용 절감',
      labelEn: 'Cost Reduction',
      detailKo: '기존 납추 대비 아연추의 수명이 5배 이상 길어 어민 1인당 연간 어망추 교체 비용이 80% 이상 절감되었습니다.',
      detailEn: 'Zinc weights last 5x longer than lead, reducing annual per-fisher replacement costs by over 80%.',
    },
  ];

  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'var(--background)' }}
      aria-label="시범사업 결과"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-10">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'PILOT PROGRAM' : '시범사업 결과'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Goseong County, Gangwon' : '강원도 고성군 시범사업'}
          </h2>
          <p className="mt-3 text-lg" style={{ color: 'var(--gray-500)' }}>
            {isEn
              ? 'Real-world pilot completed with fishing boats in Goseong County, Gangwon Province.'
              : '강원도 고성군 수협 소속 어선과 함께 31개월 실증 시범사업을 완료했습니다.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              {/* Stat header */}
              <div className="p-6 text-center">
                <p
                  className="text-3xl sm:text-5xl font-extrabold mb-1"
                  style={{ color: 'var(--primary-500)' }}
                >
                  {s.value}
                </p>
                <p className="text-base font-semibold" style={{ color: 'var(--gray-700)' }}>
                  {isEn ? s.labelEn : s.labelKo}
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--gray-200)' }} />

              {/* Detail content */}
              <div className="p-4 flex-1">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>
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
