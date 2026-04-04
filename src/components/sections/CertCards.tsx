'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SITE_CONFIG } from '@/lib/constants';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import Modal from '@/components/ui/Modal';

interface CertCardsProps {
  locale: Locale;
}

const certItems = [
  {
    key: 'greenTech',
    titleKo: '녹색기술인증서',
    titleEn: 'Green Technology Certificate',
    image: '/documents/certs/green-tech-cert.png',
    number: SITE_CONFIG.certifications.greenTech.number,
    period: SITE_CONFIG.certifications.greenTech.period,
    issuer: SITE_CONFIG.certifications.greenTech.issuerKo,
    accent: '#0EAD87',
    accentGrad: 'linear-gradient(135deg, #0EAD87 0%, #17E9B5 100%)',
    featured: true,
  },
  {
    key: 'venture',
    titleKo: '벤처기업 확인서',
    titleEn: 'Venture Company Certificate',
    image: '/documents/certs/venture-cert.png',
    number: SITE_CONFIG.certifications.venture.number,
    period: SITE_CONFIG.certifications.venture.period,
    issuer: SITE_CONFIG.certifications.venture.issuerKo,
    accent: '#0168EF',
    accentGrad: 'linear-gradient(135deg, #021097 0%, #0168EF 100%)',
    featured: false,
  },
  {
    key: 'patentAward',
    titleKo: '우수특허 대상',
    titleEn: 'Excellence Patent Award',
    image: '/documents/certs/patent-award-2023.png',
    number: SITE_CONFIG.certifications.patentAward.number,
    period: SITE_CONFIG.certifications.patentAward.date,
    issuer: SITE_CONFIG.certifications.patentAward.issuerKo,
    accent: '#D97706',
    accentGrad: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    featured: false,
  },
  {
    key: 'researchDept',
    titleKo: '기업부설연구소 인정서',
    titleEn: 'Corporate R&D Center Recognition',
    image: '/documents/certs/research-dept.png',
    number: SITE_CONFIG.certifications.researchDept.number,
    period: SITE_CONFIG.certifications.researchDept.date,
    issuer: SITE_CONFIG.certifications.researchDept.issuerKo,
    accent: '#7C3AED',
    accentGrad: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)',
    featured: false,
  },
];

export default function CertCards({ locale }: CertCardsProps) {
  const t = getTranslation(locale);
  const [selectedCert, setSelectedCert] = useState<(typeof certItems)[number] | null>(null);

  return (
    <section
      className="py-10 sm:py-16 lg:py-20"
      style={{ background: 'var(--primary-50)' }}
      aria-label="인증 및 수상"
    >
      <div className="section-container">
        <ScrollReveal>
        <div className="text-center mb-6 sm:mb-10">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {t.certification.title}
          </p>
          <h2
            className="section-title"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.certification.subtitle}
          </h2>
        </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {certItems.map((cert) => (
            <article
              key={cert.key}
              className="group relative rounded-2xl cursor-pointer bg-white flex flex-row transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedCert(cert)}
              aria-label={`${locale === 'en' ? cert.titleEn : cert.titleKo} 상세보기`}
            >
              {/* Left accent bar */}
              <div
                className="w-1 sm:w-1.5 shrink-0 rounded-l-2xl"
                style={{ background: cert.accentGrad }}
              />

              {/* Left — cert image (세로 문서, 잘림 없음) */}
              <div
                className="shrink-0 flex items-center justify-center p-2 sm:p-4"
                style={{ width: 'clamp(80px, 22vw, 160px)', background: '#fafbfc' }}
              >
                <Image
                  src={cert.image}
                  alt={locale === 'en' ? cert.titleEn : cert.titleKo}
                  width={200}
                  height={283}
                  className="object-contain w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
                  sizes="(max-width: 640px) 22vw, 160px"
                />
              </div>

              {/* Right — info */}
              <div className="flex-1 flex flex-col justify-center px-3 py-3 sm:px-5 sm:py-4 min-w-0">
                {/* Featured badge */}
                {cert.featured && (
                  <span
                    className="self-start mb-1.5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider"
                    style={{ background: cert.accent }}
                  >
                    {locale === 'en' ? 'Core' : '핵심'}
                  </span>
                )}
                <h3
                  className="font-bold text-xs sm:text-base mb-1 sm:mb-1.5 leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {locale === 'en' ? cert.titleEn : cert.titleKo}
                </h3>
                <p
                  className="text-[10px] sm:text-sm font-mono font-bold break-all leading-tight mb-1"
                  style={{ color: cert.accent }}
                >
                  {cert.number}
                </p>
                {cert.period && (
                  <p className="text-[10px] sm:text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {cert.period}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
        </ScrollReveal>
      </div>

      {/* Modal */}
      <Modal
        open={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        title={selectedCert ? (locale === 'en' ? selectedCert.titleEn : selectedCert.titleKo) : undefined}
      >
        {selectedCert && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-h-[60vh] flex items-center justify-center">
              <Image
                src={selectedCert.image}
                alt={locale === 'en' ? selectedCert.titleEn : selectedCert.titleKo}
                width={600}
                height={800}
                className="object-contain max-h-[60vh] w-auto"
              />
            </div>
            <div className="w-full border-t pt-4" style={{ borderColor: '#e2e8f0' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {locale === 'en' ? selectedCert.titleEn : selectedCert.titleKo}
              </p>
              <p className="text-xs font-mono font-bold" style={{ color: selectedCert.accent }}>
                {selectedCert.number}
              </p>
              {selectedCert.period && (
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {selectedCert.period}
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
