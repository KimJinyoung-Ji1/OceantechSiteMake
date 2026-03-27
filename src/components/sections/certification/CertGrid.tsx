'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import Modal from '@/components/ui/Modal';

interface CertGridProps {
  locale: Locale;
}

const certItems = [
  {
    key: 'greenTech',
    titleKo: '녹색기술인증서',
    titleEn: 'Green Technology Certificate',
    src: '/documents/certs/green-tech-cert.png',
    numberKo: SITE_CONFIG.certifications.greenTech.number,
    isGreen: true,
    badgeLabel: { ko: '녹색기술', en: 'GREEN TECH' },
  },
  {
    key: 'greenProduct',
    titleKo: '녹색기술제품확인서',
    titleEn: 'Green Product Certificate',
    src: '/documents/certs/green-product-cert.png',
    numberKo: SITE_CONFIG.certifications.greenProduct.number,
    isGreen: true,
    badgeLabel: { ko: '녹색제품', en: 'GREEN PRODUCT' },
  },
  {
    key: 'venture',
    titleKo: '벤처기업확인서',
    titleEn: 'Venture Company Certificate',
    src: '/documents/certs/venture-cert.png',
    numberKo: SITE_CONFIG.certifications.venture.number,
    isGreen: false,
    badgeLabel: { ko: '벤처기업', en: 'VENTURE' },
  },
  {
    key: 'patentAward',
    titleKo: '우수특허대상',
    titleEn: 'Excellence Patent Award',
    src: '/documents/certs/patent-award-2023.png',
    numberKo: SITE_CONFIG.certifications.patentAward.date,
    isGreen: false,
    isAward: true,
    badgeLabel: { ko: '수상', en: 'AWARD' },
  },
  {
    key: 'researchDept',
    titleKo: '연구전담부서 인정서',
    titleEn: 'R&D Department Recognition',
    src: '/documents/certs/research-dept.png',
    numberKo: SITE_CONFIG.certifications.researchDept.number,
    isGreen: false,
    badgeLabel: { ko: '연구소', en: 'R&D' },
  },
  {
    key: 'sme',
    titleKo: '중소기업확인서',
    titleEn: 'SME Certificate',
    src: '/documents/certs/sme-cert.png',
    numberKo: SITE_CONFIG.certifications.sme.number,
    isGreen: false,
    badgeLabel: { ko: '중소기업', en: 'SME' },
  },
];

export default function CertGrid({ locale }: CertGridProps) {
  const isEn = locale === 'en';
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  return (
    <section className="py-8 md:py-16 lg:py-20" style={{ background: 'var(--background)' }} aria-label="인증서 목록">
      <div className="section-container">
        <div className="text-center mb-6 md:mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'CERTIFICATIONS' : '인증 현황'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
            {isEn ? `${certItems.length} Official Certifications` : `공식 인증 ${certItems.length}건`}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
          {certItems.map((item) => {
            const badgeStyles = item.isGreen
              ? { bg: '#E11D48', color: 'white' }
              : (item as Record<string, unknown>).isAward
              ? { bg: '#D97706', color: 'white' }
              : { bg: 'var(--primary-500)', color: 'white' };
            return (
            <article
              key={item.key}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 12px rgba(157,23,77,0.06)',
              }}
            >
              {/* Top accent */}
              <div
                className="h-[3px] w-full"
                style={{ background: badgeStyles.bg }}
              />

              {/* Image area */}
              <button
                className="relative cursor-pointer flex items-center justify-center w-full overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  background: 'linear-gradient(180deg, #fafbfc 0%, #f0f4f8 100%)',
                }}
                onClick={() => setModal({ src: item.src, title: isEn ? item.titleEn : item.titleKo })}
                aria-label={`${isEn ? item.titleEn : item.titleKo} 크게 보기`}
              >
                <Image
                  src={item.src}
                  alt={isEn ? item.titleEn : item.titleKo}
                  fill
                  className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  <span className="px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    {isEn ? 'Enlarge' : '확대'}
                  </span>
                </div>
              </button>

              {/* Info */}
              <div className="p-1.5 sm:p-4 flex flex-col items-center text-center gap-0.5 sm:gap-2 flex-1" style={{ borderTop: '1px solid #e2e8f0' }}>
                <span
                  className="text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-md tracking-wider uppercase"
                  style={{ background: badgeStyles.bg, color: badgeStyles.color }}
                >
                  {isEn ? item.badgeLabel.en : item.badgeLabel.ko}
                </span>

                <h3 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: 'var(--gray-900)' }}>
                  {isEn ? item.titleEn : item.titleKo}
                </h3>

                <p
                  className="text-[10px] sm:text-xs font-mono font-semibold px-1 py-0.5 rounded"
                  style={{ color: 'var(--primary-500)', background: 'rgba(236,72,153,0.06)' }}
                >
                  {item.numberKo}
                </p>
              </div>
            </article>
            );
          })}
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title}>
        {modal && (
          <div className="relative w-full" style={{ minHeight: '70vh' }}>
            <Image
              src={modal.src}
              alt={modal.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 672px"
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
