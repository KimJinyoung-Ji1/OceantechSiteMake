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
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        {/* Eye / vision icon */}
        <ellipse cx="18" cy="18" rx="14" ry="10" stroke="var(--primary-400)" strokeWidth="2" fill="none" />
        <circle cx="18" cy="18" r="5" fill="var(--primary-300)" />
        <circle cx="18" cy="18" r="2.5" fill="var(--primary-600)" />
        <path d="M18 6v3M18 27v3M6 18H3M33 18h-3" stroke="var(--secondary-400)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradBg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    iconBg: 'rgba(59,130,246,0.1)',
    border: '#BFDBFE',
  },
  {
    key: 'mission',
    labelKo: '미션',
    labelEn: 'Mission',
    descKo: '친환경 아연 어장추로 납을 대체하여 해양 생태계와 어민의 삶의 질을 동시에 향상시킵니다.',
    descEn: "Replace lead with eco-friendly zinc fishing weights to improve marine ecosystems and fishers' lives.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        {/* Target / mission icon */}
        <circle cx="18" cy="18" r="14" stroke="var(--primary-400)" strokeWidth="2" fill="none" />
        <circle cx="18" cy="18" r="9" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="18" r="4" fill="var(--primary-500)" />
        <path d="M18 4v5M18 27v5M4 18h5M27 18h5" stroke="var(--primary-300)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradBg: 'linear-gradient(135deg, #F0F4FF 0%, #E0EAFF 100%)',
    iconBg: 'rgba(1,104,239,0.08)',
    border: 'rgba(1,104,239,0.2)',
  },
  {
    key: 'value',
    labelKo: '핵심가치',
    labelEn: 'Core Values',
    descKo: '건강한 바다 · 행복한 어민 · 지속 가능한 혁신. 세 가치가 오션테크를 이끄는 나침반입니다.',
    descEn: 'Healthy ocean · Happy fishers · Sustainable innovation. Three values that guide Ocean Tech.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        {/* Diamond / gem icon */}
        <path d="M18 4 L30 14 L18 32 L6 14 Z" stroke="var(--secondary-500)" strokeWidth="2" fill="rgba(23,233,181,0.1)" strokeLinejoin="round" />
        <path d="M6 14 L18 14 L30 14" stroke="var(--secondary-400)" strokeWidth="1.5" />
        <path d="M11 14 L18 4 M25 14 L18 4" stroke="var(--secondary-300)" strokeWidth="1" />
        <path d="M11 14 L18 32 M25 14 L18 32" stroke="var(--secondary-300)" strokeWidth="1" />
      </svg>
    ),
    gradBg: 'linear-gradient(135deg, #F0FFF9 0%, #DCFCE7 100%)',
    iconBg: 'rgba(23,233,181,0.1)',
    border: 'rgba(23,233,181,0.3)',
  },
];

export default function VisionSection({ locale }: VisionSectionProps) {
  const t = getTranslation(locale);

  return (
    <section
      id="vision"
      className="py-20 lg:py-28 px-6 lg:px-24 text-center"
      style={{ background: 'var(--background-alt)' }}
      aria-label="비전"
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-14">
          <p
            className="text-lg font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {t.about.vision.title}
          </p>
          <h2
            className="text-5xl lg:text-6xl font-black"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.about.vision.subtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visionCards.map((card) => (
            <article
              key={card.key}
              className="p-10 rounded-3xl flex flex-col items-center gap-5 hover:-translate-y-2 transition-transform duration-300"
              style={{
                background: card.gradBg,
                border: `1px solid ${card.border}`,
                boxShadow: '0 4px 24px rgba(2,16,151,0.06)',
              }}
            >
              <div
                className="w-18 h-18 rounded-2xl flex items-center justify-center"
                style={{ background: card.iconBg, width: '72px', height: '72px' }}
              >
                {card.icon}
              </div>
              <h3 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                {locale === 'en' ? card.labelEn : card.labelKo}
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>
                {locale === 'en' ? card.descEn : card.descKo}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
