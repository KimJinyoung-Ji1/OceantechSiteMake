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

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="10" fill="#021097" />
    <path d="M5.5 10.5l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="10" fill="#FEE2E2" />
    <path d="M6.5 6.5l7 7M13.5 6.5l-7 7" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function FullCompareSection({ locale }: FullCompareSectionProps) {
  const isEn = locale === 'en';

  return (
    <section
      className="py-12 lg:py-16"
      style={{ background: 'var(--gray-50)' }}
      aria-label="납추 vs 아연추 비교"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-10">
          <p
            className="text-2xl font-black uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'COMPARISON' : '상세 비교'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Zinc Weight vs Lead Weight' : '아연추 vs 납추'}
          </h2>
        </div>

        <div
          className="rounded-3xl overflow-hidden max-w-3xl mx-auto"
          style={{
            border: '1px solid rgba(2,16,151,0.18)',
            boxShadow: '0 8px 40px rgba(2,16,151,0.10), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header */}
          <div className="grid grid-cols-3">
            <div
              className="px-3 py-3 flex items-center justify-center"
              style={{
                background: '#F0FDF9',
                borderRight: '1px solid rgba(2,16,151,0.15)',
              }}
            >
              <p className="text-sm font-bold uppercase tracking-wider text-center" style={{ color: '#021097' }}>
                {isEn ? 'Category' : '항목'}
              </p>
            </div>
            <div
              className="px-3 py-3 text-center"
              style={{
                background: 'linear-gradient(135deg, #021097 0%, #0168EF 100%)',
                borderRight: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <CheckIcon />
                <p className="text-white font-bold text-sm leading-tight">
                  {isEn ? 'Zinc Weight' : '아연추'}
                </p>
              </div>
              <p className="text-white/75 text-xs">(주)오션테크</p>
            </div>
            <div
              className="px-3 py-3 text-center"
              style={{ background: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)' }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <XIcon />
                <p className="text-white font-bold text-sm leading-tight">
                  {isEn ? 'Lead Weight' : '납추'}
                </p>
              </div>
              <p className="text-white/75 text-xs">{isEn ? 'Conventional' : '기존 제품'}</p>
            </div>
          </div>

          {/* Rows */}
          {compareRows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-t"
              style={{
                borderColor: 'rgba(2,16,151,0.10)',
                background: i % 2 === 0 ? '#FFFFFF' : '#F0FDF9',
              }}
            >
              {/* Label — center aligned */}
              <div
                className="px-3 py-2.5 font-semibold text-sm flex items-center justify-center text-center"
                style={{
                  color: 'var(--gray-700)',
                  borderRight: '1px solid rgba(2,16,151,0.10)',
                }}
              >
                {isEn ? row.labelEn : row.labelKo}
              </div>

              {/* Zinc — icon+text grouped and centered */}
              <div
                className="px-3 py-2.5 flex items-center justify-center gap-1.5 border-r"
                style={{ borderColor: 'rgba(2,16,151,0.10)', background: 'rgba(1,72,200,0.04)' }}
              >
                <CheckIcon />
                <span className="text-sm font-semibold" style={{ color: '#021097' }}>
                  {row.zinc}
                </span>
              </div>

              {/* Lead — icon+text grouped and centered */}
              <div className="px-3 py-2.5 flex items-center justify-center gap-1.5">
                <XIcon />
                <span className="text-sm" style={{ color: '#6B7280' }}>
                  {row.lead}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
