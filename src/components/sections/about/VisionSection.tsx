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
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        {/* Detailed telescope / eye icon */}
        <defs>
          <linearGradient id="vision-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#0168ef" />
          </linearGradient>
        </defs>
        {/* Outer eye shape */}
        <path d="M4 24 C12 10 36 10 44 24 C36 38 12 38 4 24Z" stroke="url(#vision-grad)" strokeWidth="2.5" fill="rgba(59,130,246,0.06)" />
        {/* Iris */}
        <circle cx="24" cy="24" r="8" stroke="#3b82f6" strokeWidth="2" fill="rgba(59,130,246,0.12)" />
        {/* Pupil */}
        <circle cx="24" cy="24" r="4" fill="#021297" />
        {/* Highlight */}
        <circle cx="26.5" cy="21.5" r="1.5" fill="white" opacity="0.8" />
        {/* Eyelash rays */}
        <path d="M24 4v4M24 40v4M4 24H8M40 24h4M8.7 8.7l2.8 2.8M36.5 36.5l2.8 2.8M8.7 39.3l2.8-2.8M36.5 11.5l2.8-2.8" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
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
    descKo: '친환경 아연 어망추로 납을 대체하여 해양 생태계와 어민의 삶의 질을 동시에 향상시킵니다.',
    descEn: "Replace lead with eco-friendly zinc fishing weights to improve marine ecosystems and fishers' lives.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        {/* Multi-ring target with arrow */}
        <defs>
          <linearGradient id="mission-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#021297" />
            <stop offset="100%" stopColor="#0168ef" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="24" cy="24" r="19" stroke="#bfdbfe" strokeWidth="1.5" fill="none" />
        {/* Middle ring */}
        <circle cx="24" cy="24" r="13" stroke="#3b82f6" strokeWidth="2" fill="rgba(59,130,246,0.06)" />
        {/* Inner ring */}
        <circle cx="24" cy="24" r="7" stroke="url(#mission-grad)" strokeWidth="2" fill="rgba(2,18,151,0.08)" />
        {/* Bullseye */}
        <circle cx="24" cy="24" r="3" fill="#021297" />
        {/* Arrow from top-right to center */}
        <path d="M38 10L24 24" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 10L30 10M38 10L38 18" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Crosshair lines */}
        <path d="M24 2v6M24 40v6M2 24h6M40 24h6" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradBg: 'linear-gradient(135deg, #F0F4FF 0%, #E0EAFF 100%)',
    iconBg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.2)',
  },
  {
    key: 'value',
    labelKo: '핵심가치',
    labelEn: 'Core Values',
    descKo: '건강한 바다 · 행복한 어민 · 지속 가능한 혁신. 세 가치가 오션테크를 이끄는 나침반입니다.',
    descEn: 'Healthy ocean · Happy fishers · Sustainable innovation. Three values that guide Ocean Tech.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        {/* Faceted gem / diamond */}
        <defs>
          <linearGradient id="gem-top" x1="8" y1="8" x2="40" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#17e9b5" />
          </linearGradient>
          <linearGradient id="gem-left" x1="8" y1="20" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#17e9b5" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gem-right" x1="24" y1="20" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Top facets */}
        <polygon points="24,4 8,18 24,20" fill="url(#gem-top)" opacity="0.9" />
        <polygon points="24,4 40,18 24,20" fill="url(#gem-top)" opacity="0.7" />
        {/* Left facet */}
        <polygon points="8,18 24,20 24,44" fill="url(#gem-left)" />
        {/* Right facet */}
        <polygon points="40,18 24,20 24,44" fill="url(#gem-right)" />
        {/* Outline */}
        <path d="M24 4L8 18L24 44L40 18Z" stroke="#17e9b5" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <line x1="8" y1="18" x2="40" y2="18" stroke="#6ee7b7" strokeWidth="1.5" />
        <line x1="24" y1="4" x2="24" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        {/* Inner highlights */}
        <path d="M16 18L24 12L32 18" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
      </svg>
    ),
    gradBg: 'linear-gradient(135deg, #F0FFF9 0%, #DCFCE7 100%)',
    iconBg: 'rgba(251,113,133,0.1)',
    border: 'rgba(251,113,133,0.3)',
  },
];

export default function VisionSection({ locale }: VisionSectionProps) {
  const t = getTranslation(locale);

  return (
    <section
      id="vision"
      className="py-8 md:py-16 lg:py-20 text-center"
      style={{ background: 'var(--background-alt)' }}
      aria-label="비전"
    >
      <div className="section-container">
        <div className="mb-6 md:mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {t.about.vision.title}
          </p>
          <h2
            className="section-title"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.about.vision.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-5">
          {visionCards.map((card) => (
            <article
              key={card.key}
              className="relative p-3 sm:p-8 lg:p-12 rounded-xl sm:rounded-2xl flex flex-col items-center gap-2 sm:gap-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden"
              style={{
                background: card.gradBg,
                border: `1px solid ${card.border}`,
                boxShadow: '0 2px 12px rgba(157,23,77,0.06)',
              }}
            >
              <div
                className="rounded-xl flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                style={{ background: card.iconBg }}
              >
                <span className="flex [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-10 sm:[&>svg]:h-10 lg:[&>svg]:w-12 lg:[&>svg]:h-12">
                  {card.icon}
                </span>
              </div>
              <h3 className="text-xs sm:text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {locale === 'en' ? card.labelEn : card.labelKo}
              </h3>
              <p className="text-[11px] sm:text-sm md:text-base leading-relaxed text-center" style={{ color: 'var(--text-body)' }}>
                {locale === 'en' ? card.descEn : card.descKo}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
