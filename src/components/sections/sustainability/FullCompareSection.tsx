import type { Locale } from '@/lib/i18n';

interface FullCompareSectionProps {
  locale: Locale;
}

const compareRows = [
  { labelKo: '재질', labelEn: 'Material', zinc: '아연(Zn)', lead: '납(Pb)', zincGood: true },
  { labelKo: '독성', labelEn: 'Toxicity', zinc: '없음', lead: '있음 (IARC 2A)', zincGood: true },
  { labelKo: '내구성', labelEn: 'Durability', zinc: '약 10년', lead: '평균 2년', zincGood: true },
  { labelKo: '무게변화', labelEn: 'Weight Change', zinc: '30개월 1g 손실', lead: '연 15~20% 감소', zincGood: true },
  { labelKo: '형상유지', labelEn: 'Shape Retention', zinc: '밟혀도 원형 유지', lead: '충격에 취약', zincGood: true },
  { labelKo: '그물손상', labelEn: 'Net Damage', zinc: '없음', lead: '파편으로 훼손', zincGood: true },
  { labelKo: '관리비용', labelEn: 'Maintenance Cost', zinc: '80% 이상 절감', lead: '교체비 지속 발생', zincGood: true },
  { labelKo: '정부인증', labelEn: 'Gov. Certification', zinc: '녹색기술인증', lead: '없음', zincGood: true },
];

export default function FullCompareSection({ locale }: FullCompareSectionProps) {
  const isEn = locale === 'en';

  return (
    <section
      className="py-20 lg:py-28 px-4"
      style={{ background: 'var(--gray-50)' }}
      aria-label="납추 vs 아연추 비교"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-base font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'COMPARISON' : '상세 비교'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Zinc Weight vs Lead Weight' : '아연추 vs 납추'}
          </h2>
        </div>

        <div
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{ border: '1px solid var(--gray-200)' }}
        >
          {/* Header */}
          <div className="grid grid-cols-3">
            <div className="px-6 py-5" style={{ background: 'var(--gray-100)' }} />
            <div className="px-6 py-5 text-center" style={{ background: 'var(--primary-500)' }}>
              <p className="text-white font-bold text-base">
                {isEn ? 'Zinc Weight' : '아연추'}
              </p>
              <p className="text-white/70 text-sm mt-0.5">(주)오션테크</p>
            </div>
            <div className="px-6 py-5 text-center" style={{ background: '#374151' }}>
              <p className="text-white font-bold text-base">
                {isEn ? 'Lead Weight' : '납추'}
              </p>
              <p className="text-white/70 text-sm mt-0.5">{isEn ? 'Conventional' : '기존 제품'}</p>
            </div>
          </div>

          {/* Rows */}
          {compareRows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-t"
              style={{ borderColor: 'var(--gray-200)', background: i % 2 === 0 ? 'white' : 'var(--gray-50)' }}
            >
              <div className="px-6 py-4 font-semibold text-base" style={{ color: 'var(--gray-700)' }}>
                {isEn ? row.labelEn : row.labelKo}
              </div>
              <div
                className="px-6 py-4 text-center text-base font-semibold border-x"
                style={{ borderColor: 'var(--gray-200)', color: 'var(--secondary-700,#047857)' }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                    style={{ background: 'var(--secondary-500)' }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {row.zinc}
                </span>
              </div>
              <div
                className="px-6 py-4 text-center text-base"
                style={{ color: 'var(--gray-500)' }}
              >
                {row.lead}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
