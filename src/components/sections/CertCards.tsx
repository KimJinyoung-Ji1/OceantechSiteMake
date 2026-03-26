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
    accent: 'var(--secondary-700)',
    accentLight: 'rgba(14,173,135,0.08)',
    accentBorder: 'rgba(14,173,135,0.25)',
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
    accent: 'var(--primary-500)',
    accentLight: 'rgba(1,104,239,0.06)',
    accentBorder: 'rgba(1,104,239,0.20)',
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
    accentLight: 'rgba(217,119,6,0.06)',
    accentBorder: 'rgba(217,119,6,0.20)',
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
    accent: 'var(--primary-500)',
    accentLight: 'rgba(1,104,239,0.06)',
    accentBorder: 'rgba(1,104,239,0.20)',
    featured: false,
  },
];

export default function CertCards({ locale }: CertCardsProps) {
  const t = getTranslation(locale);
  const [selectedCert, setSelectedCert] = useState<(typeof certItems)[number] | null>(null);

  return (
    <section
      className="py-16 lg:py-20 px-4 sm:px-6 lg:px-24"
      style={{ background: 'var(--background-alt)' }}
      aria-label="인증 및 수상"
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="text-center mb-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certItems.map((cert) => (
            <article
              key={cert.key}
              className="group rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-white relative flex flex-col items-center"
              style={{
                border: `1px solid ${cert.accentBorder}`,
              }}
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedCert(cert)}
              aria-label={`${locale === 'en' ? cert.titleEn : cert.titleKo} 상세보기`}
            >
              {/* Featured badge */}
              {cert.featured && (
                <div
                  className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: cert.accent }}
                >
                  {locale === 'en' ? 'Core' : '핵심 인증'}
                </div>
              )}

              {/* Cert image — bigger */}
              <div
                className="w-full bg-white flex items-center justify-center overflow-hidden"
                style={{ height: 220, borderBottom: `1px solid ${cert.accentBorder}` }}
              >
                <Image
                  src={cert.image}
                  alt={locale === 'en' ? cert.titleEn : cert.titleKo}
                  width={320}
                  height={240}
                  className="object-contain w-full h-full p-2 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Info — centered, reduced padding */}
              <div className="p-2 text-center w-full">
                <h3
                  className="font-bold text-base mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {locale === 'en' ? cert.titleEn : cert.titleKo}
                </h3>
                <p
                  className="text-sm font-mono font-semibold mb-0.5 break-all"
                  style={{ color: cert.accent }}
                >
                  {cert.number}
                </p>
                {cert.period && (
                  <p className="text-sm" style={{ color: 'var(--text-body)', opacity: 0.7 }}>
                    {cert.period}
                  </p>
                )}

                {/* Click hint */}
                <div
                  className="mt-3 flex items-center justify-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: cert.accent }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {locale === 'en' ? 'View full' : '전체보기'}
                </div>
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
            <div className="w-full border-t pt-4" style={{ borderColor: 'var(--gray-100)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {locale === 'en' ? selectedCert.titleEn : selectedCert.titleKo}
              </p>
              <p className="text-xs font-mono" style={{ color: selectedCert.accent }}>
                {selectedCert.number}
              </p>
              {selectedCert.period && (
                <p className="text-xs mt-1" style={{ color: 'var(--text-body)', opacity: 0.7 }}>
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
