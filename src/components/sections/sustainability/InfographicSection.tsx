import type { Locale } from '@/lib/i18n';

interface InfographicSectionProps {
  locale: Locale;
}

const items = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="14" stroke="var(--secondary-500)" strokeWidth="1.5" />
        <path d="M10 22 Q16 10 22 22" stroke="var(--secondary-500)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="16" cy="17" r="3" fill="var(--secondary-400,#34d399)" />
      </svg>
    ),
    ko: '중금속 해양 오염 예방',
    en: 'Prevents Heavy Metal Ocean Pollution',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4 C10 4 4 10 4 16 C4 22 10 28 16 28 C22 28 28 22 28 16" stroke="var(--primary-400)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 4 L28 10 M28 4 L22 10" stroke="var(--secondary-500)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    ko: '탄소중립 정책 부합',
    en: 'Aligned with Carbon Neutrality Policy',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 28 L8 18 M16 28 L16 12 M24 28 L24 6" stroke="var(--primary-400)" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 6 L14 14 L20 10 L28 18" stroke="var(--secondary-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ko: '어민 소득 80% 비용 절감',
    en: '80% Cost Reduction for Fishers',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4 Q26 12 26 20 Q26 26 16 28 Q6 26 6 20 Q6 12 16 4Z" stroke="var(--secondary-500)" strokeWidth="1.5" fill="none" />
        <path d="M12 16 l3 3 6-6" stroke="var(--secondary-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ko: '수명 10년, 교체 최소화',
    en: '10-Year Lifespan, Minimal Replacement',
  },
];

export default function InfographicSection({ locale }: InfographicSectionProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-20 lg:py-28 px-4" aria-label="환경 영향">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-base font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--secondary-700,#047857)' }}
          >
            {isEn ? 'ENVIRONMENTAL IMPACT' : '환경 영향'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Why It Matters' : '아연추가 만드는 변화'}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl flex flex-col items-center text-center gap-4"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(23,233,181,0.08)' }}
              >
                {item.icon}
              </div>
              <p className="text-base font-semibold leading-snug" style={{ color: 'var(--gray-700)' }}>
                {isEn ? item.en : item.ko}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
