import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';

interface VisionSectionProps {
  locale: Locale;
}

const visionCards = [
  {
    key: 'vision',
    labelKo: '비전',
    labelEn: 'Vision',
    descKo: '바다와 공생을 통한 건강한 생태계 구축을 통하여 지속 가능한 바다 환경을 만들어 갑니다.',
    descEn: 'Building a sustainable ocean environment through coexistence with the sea.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="14" stroke="var(--primary-400,#60a5fa)" strokeWidth="2" />
        <path d="M8 20 Q16 8 24 20" stroke="var(--secondary-500,#17e9b5)" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    key: 'mission',
    labelKo: '미션',
    labelEn: 'Mission',
    descKo: '친환경 아연 어장추로 납을 대체하여 해양 생태계와 어민의 삶의 질을 동시에 향상시킵니다.',
    descEn: 'Replace lead with eco-friendly zinc fishing weights to improve marine ecosystems and fishers\' lives.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4 L28 28 L16 22 L4 28 Z" stroke="var(--primary-400,#60a5fa)" strokeWidth="2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    key: 'value',
    labelKo: '핵심가치',
    labelEn: 'Core Values',
    descKo: '건강한 바다 · 행복한 어민 · 지속 가능한 혁신. 세 가치가 오션테크를 이끄는 나침반입니다.',
    descEn: 'Healthy ocean · Happy fishers · Sustainable innovation. Three values that guide Ocean Tech.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <polygon points="16,3 20,12 29,13 23,20 25,29 16,24 7,29 9,20 3,13 12,12" stroke="var(--secondary-500,#17e9b5)" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
];

export default function VisionSection({ locale }: VisionSectionProps) {
  const t = getTranslation(locale);

  return (
    <section
      id="vision"
      className="py-20 lg:py-28 px-4"
      style={{ background: 'var(--gray-50, #f9fafb)' }}
      aria-label="비전"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {t.about.vision.title}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {t.about.vision.subtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visionCards.map((card) => (
            <article
              key={card.key}
              className="p-8 rounded-2xl flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200, #e5e7eb)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              }}
            >
              <div>{card.icon}</div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
                {locale === 'en' ? card.labelEn : card.labelKo}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                {locale === 'en' ? card.descEn : card.descKo}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
