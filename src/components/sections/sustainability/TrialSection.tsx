import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface TrialSectionProps {
  locale: Locale;
}

export default function TrialSection({ locale }: TrialSectionProps) {
  const isEn = locale === 'en';

  const stats = [
    { value: `${SITE_CONFIG.stats.trialMonths}${isEn ? 'mo' : '개월'}`, labelKo: '시범사업 기간', labelEn: 'Trial Period' },
    { value: '19', labelKo: '참여 어선', labelEn: 'Fishing Vessels' },
    { value: isEn ? '~$80K' : '~1억원', labelKo: '사업 규모', labelEn: 'Project Scale' },
    { value: `${SITE_CONFIG.stats.costReduction}%`, labelKo: '비용 절감', labelEn: 'Cost Reduction' },
  ];

  return (
    <section
      className="py-12 lg:py-16"
      style={{ background: 'var(--gray-50)' }}
      aria-label="시범사업 결과"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p
            className="text-base font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'PILOT PROGRAM' : '시범사업 결과'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
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
              className="p-8 rounded-2xl text-center"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              <p
                className="text-5xl font-extrabold mb-2"
                style={{ color: 'var(--primary-500)' }}
              >
                {s.value}
              </p>
              <p className="text-base font-medium" style={{ color: 'var(--gray-500)' }}>
                {isEn ? s.labelEn : s.labelKo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
