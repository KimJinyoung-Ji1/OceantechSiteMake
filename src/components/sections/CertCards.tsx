import { SITE_CONFIG } from '@/lib/constants';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface CertCardsProps {
  locale: Locale;
}

const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M6 22 Q10 8 22 6 Q22 18 10 22 Z" stroke="var(--secondary-700)" strokeWidth="2" strokeLinejoin="round" fill="rgba(23,233,181,0.12)" />
    <path d="M6 22 L14 14" stroke="var(--secondary-700)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RecycleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 4 L20 9 L17 9 Q19 14 16 18" stroke="var(--secondary-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M14 24 L8 19 L11 19 Q9 14 12 10" stroke="var(--secondary-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M20 14 Q22 18 19 22 L16 22" stroke="var(--secondary-700)" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const RocketIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 4 Q22 4 22 12 L22 18 L16 24 L16 19 L12 19 L12 24 L6 18 L6 12 Q6 4 14 4 Z" stroke="var(--primary-500)" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(1,104,239,0.08)" />
    <circle cx="14" cy="12" r="2.5" stroke="var(--primary-500)" strokeWidth="1.8" fill="none" />
    <path d="M8 20 L5 23" stroke="var(--primary-500)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M20 20 L23 23" stroke="var(--primary-500)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M9 4 H19 V15 Q19 21 14 21 Q9 21 9 15 Z" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" fill="rgba(217,119,6,0.08)" />
    <path d="M5 6 H9 Q8 13 9 15" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M19 15 Q20 13 19 6 H23" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M11 21 L11 24 H17 L17 21" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M9 24 H19" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const certItems = [
  {
    key: 'greenTech',
    icon: <LeafIcon />,
    title: '녹색기술인증',
    titleEn: 'Green Technology Certification',
    number: SITE_CONFIG.certifications.greenTech.number,
    period: SITE_CONFIG.certifications.greenTech.period,
    color: {
      bg: 'linear-gradient(135deg, #F0FFF9 0%, #E0FFF5 100%)',
      border: 'rgba(23, 233, 181, 0.3)',
      accent: 'var(--secondary-700)',
      iconBg: 'rgba(23,233,181,0.12)',
    },
  },
  {
    key: 'greenProduct',
    icon: <RecycleIcon />,
    title: '녹색기술제품 확인',
    titleEn: 'Green Product Verification',
    number: SITE_CONFIG.certifications.greenProduct.number,
    period: SITE_CONFIG.certifications.greenProduct.period,
    color: {
      bg: 'linear-gradient(135deg, #F0FFF9 0%, #E0FFF5 100%)',
      border: 'rgba(23, 233, 181, 0.3)',
      accent: 'var(--secondary-700)',
      iconBg: 'rgba(23,233,181,0.12)',
    },
  },
  {
    key: 'venture',
    icon: <RocketIcon />,
    title: '벤처기업 인증',
    titleEn: 'Venture Company Certification',
    number: SITE_CONFIG.certifications.venture.number,
    period: SITE_CONFIG.certifications.venture.period,
    color: {
      bg: 'linear-gradient(135deg, #F0F4FF 0%, #E8EFFF 100%)',
      border: 'rgba(1, 104, 239, 0.25)',
      accent: 'var(--primary-500)',
      iconBg: 'rgba(1,104,239,0.08)',
    },
  },
  {
    key: 'patentAward',
    icon: <TrophyIcon />,
    title: '우수특허 대상 수상',
    titleEn: 'Excellence Patent Award',
    number: SITE_CONFIG.certifications.patentAward.name,
    period: SITE_CONFIG.certifications.patentAward.date,
    color: {
      bg: 'linear-gradient(135deg, #FFFBF0 0%, #FFF6E0 100%)',
      border: 'rgba(217, 119, 6, 0.25)',
      accent: '#D97706',
      iconBg: 'rgba(217,119,6,0.08)',
    },
  },
];

export default function CertCards({ locale }: CertCardsProps) {
  const t = getTranslation(locale);

  return (
    <section
      className="py-20 lg:py-28 px-6 lg:px-12"
      style={{ background: 'var(--background-alt)' }}
      aria-label="인증 및 수상"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-base font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {t.certification.title}
          </p>
          <h2
            className="text-4xl lg:text-5xl font-black"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.certification.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certItems.map((cert) => (
            <article
              key={cert.key}
              className="group p-7 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{
                background: cert.color.bg,
                border: `1px solid ${cert.color.border}`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: cert.color.iconBg }}
              >
                {cert.icon}
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {locale === 'en' ? cert.titleEn : cert.title}
              </h3>
              <p
                className="text-sm font-mono font-semibold mb-1 break-all"
                style={{ color: cert.color.accent }}
              >
                {cert.number}
              </p>
              {cert.period && (
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {cert.period}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
