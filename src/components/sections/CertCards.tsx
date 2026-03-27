'use client';

import { useState } from 'react';
import Image from 'next/image';
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
      style={{ background: '#f8fafc' }}
      aria-label="인증 및 수상"
    >
      <div className="section-container">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {certItems.map((cert) => (
            <article
              key={cert.key}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0',
              }}
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedCert(cert)}
              aria-label={`${locale === 'en' ? cert.titleEn : cert.titleKo} 상세보기`}
            >
              {/* Top accent bar */}
              <div
                className="h-1 sm:h-1.5 w-full"
                style={{ background: cert.accentGrad }}
              />

              {/* Featured badge */}
              {cert.featured && (
                <div
                  className="absolute top-3 right-2 sm:top-4 sm:right-3 z-10 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[10px] font-bold text-white uppercase tracking-wider"
                  style={{ background: cert.accent }}
                >
                  {locale === 'en' ? 'Core' : '핵심'}
                </div>
              )}

              {/* Cert image */}
              <div className="relative w-full flex items-center justify-center overflow-hidden bg-white px-2 pt-3 pb-2 sm:px-4 sm:pt-4 sm:pb-3">
                <div
                  className="w-full flex items-center justify-center rounded-xl overflow-hidden"
                  style={{ height: 110, background: '#fafbfc' }}
                >
                  <Image
                    src={cert.image}
                    alt={locale === 'en' ? cert.titleEn : cert.titleKo}
                    width={320}
                    height={240}
                    className="object-contain w-full h-full p-1.5 sm:p-3 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col items-center px-2 pb-3 sm:px-4 sm:pb-5 text-center">
                <h3
                  className="font-bold text-xs sm:text-base mb-1 sm:mb-1.5 leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {locale === 'en' ? cert.titleEn : cert.titleKo}
                </h3>
                <p
                  className="text-[10px] sm:text-sm font-mono font-bold break-all leading-tight px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md"
                  style={{ color: cert.accent, background: `${cert.accent}10` }}
                >
                  {cert.number}
                </p>

                {/* View button */}
                <button
                  className="mt-2 sm:mt-3 flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all duration-200 group-hover:scale-105"
                  style={{
                    color: cert.accent,
                    background: `${cert.accent}0a`,
                    border: `1px solid ${cert.accent}30`,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {locale === 'en' ? 'View' : '상세보기'}
                </button>
              </div>
            </article>
          ))}
        </div>
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
