import { SITE_CONFIG } from '@/lib/constants';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface CertCardsProps {
  locale: Locale;
}

const certItems = [
  {
    key: 'greenTech',
    icon: '🌿',
    title: '녹색기술인증',
    titleEn: 'Green Technology Certification',
    number: SITE_CONFIG.certifications.greenTech.number,
    period: SITE_CONFIG.certifications.greenTech.period,
    color: { bg: 'rgba(23, 233, 181, 0.08)', border: 'rgba(23, 233, 181, 0.25)', accent: 'var(--secondary-700)' },
  },
  {
    key: 'greenProduct',
    icon: '♻️',
    title: '녹색기술제품 확인',
    titleEn: 'Green Product Verification',
    number: SITE_CONFIG.certifications.greenProduct.number,
    period: SITE_CONFIG.certifications.greenProduct.period,
    color: { bg: 'rgba(23, 233, 181, 0.08)', border: 'rgba(23, 233, 181, 0.25)', accent: 'var(--secondary-700)' },
  },
  {
    key: 'venture',
    icon: '🚀',
    title: '벤처기업 인증',
    titleEn: 'Venture Company Certification',
    number: SITE_CONFIG.certifications.venture.number,
    period: SITE_CONFIG.certifications.venture.period,
    color: { bg: 'rgba(1, 104, 239, 0.06)', border: 'rgba(1, 104, 239, 0.2)', accent: 'var(--primary-500)' },
  },
  {
    key: 'patentAward',
    icon: '🏆',
    title: '우수특허 대상 수상',
    titleEn: 'Excellence Patent Award',
    number: SITE_CONFIG.certifications.patentAward.name,
    period: SITE_CONFIG.certifications.patentAward.date,
    color: { bg: 'rgba(245, 158, 11, 0.06)', border: 'rgba(245, 158, 11, 0.2)', accent: '#D97706' },
  },
];

export default function CertCards({ locale }: CertCardsProps) {
  const t = getTranslation(locale);

  return (
    <section
      className="py-20 lg:py-28 px-4"
      style={{ background: 'var(--gray-50)' }}
      aria-label="인증 및 수상"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {t.certification.title}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {t.certification.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certItems.map((cert) => (
            <article
              key={cert.key}
              className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ background: cert.color.bg, border: `1px solid ${cert.color.border}` }}
            >
              <div className="text-3xl mb-4" role="img" aria-label={cert.title}>
                {cert.icon}
              </div>
              <h3
                className="font-bold text-sm mb-2"
                style={{ color: 'var(--gray-900)' }}
              >
                {locale === 'en' ? cert.titleEn : cert.title}
              </h3>
              <p
                className="text-xs font-mono font-semibold mb-1"
                style={{ color: cert.color.accent }}
              >
                {cert.number}
              </p>
              {cert.period && (
                <p className="text-xs" style={{ color: 'var(--gray-500)' }}>
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
