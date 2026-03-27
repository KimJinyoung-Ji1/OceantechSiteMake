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
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="text-center mb-6 md:mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'CERTIFICATIONS' : '인증 현황'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
            {isEn ? `${certItems.length} Official Certifications` : `공식 인증 ${certItems.length}건`}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
          {certItems.map((item) => (
            <article
              key={item.key}
              className="rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'white',
                border: item.isGreen
                  ? '1px solid rgba(23,233,181,0.3)'
                  : (item as Record<string, unknown>).isAward
                  ? '1px solid rgba(245,158,11,0.3)'
                  : '1px solid var(--gray-200)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}
            >
              {/* Image area */}
              <button
                className="relative cursor-pointer transition-opacity flex items-center justify-center w-full overflow-hidden h-[120px] md:h-auto"
                style={{
                  aspectRatio: '4/3',
                  background: item.isGreen
                    ? 'rgba(23,233,181,0.04)'
                    : 'linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
                  borderBottom: '1px solid var(--gray-100)',
                }}
                onClick={() => setModal({ src: item.src, title: isEn ? item.titleEn : item.titleKo })}
                aria-label={`${isEn ? item.titleEn : item.titleKo} 크게 보기`}
              >
                {/* Shadow behind image */}
                <div
                  className="absolute inset-x-6 bottom-3 h-10 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)',
                    filter: 'blur(10px)',
                  }}
                />
                <Image
                  src={item.src}
                  alt={isEn ? item.titleEn : item.titleKo}
                  fill
                  className="object-contain p-5 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))' }}
                />
                {/* Reflection */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(238,242,247,0.95) 0%, rgba(248,250,252,0.6) 40%, transparent 100%)',
                  }}
                />
                <div
                  className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  style={{ background: 'rgba(0,0,0,0.55)', color: 'white' }}
                >
                  {isEn ? 'Click to enlarge' : '클릭하여 확대'}
                </div>
              </button>

              {/* Info area — centered */}
              <div className="p-2 md:p-5 flex flex-col gap-1 md:gap-3 flex-1 items-center text-center">
                <span
                  className="text-sm font-black px-4 py-1.5 rounded-full tracking-wide"
                  style={
                    item.isGreen
                      ? { background: 'rgba(23,233,181,0.2)', color: 'var(--secondary-700,#047857)', border: '1px solid rgba(23,233,181,0.4)' }
                      : (item as Record<string, unknown>).isAward
                      ? { background: 'rgba(245,158,11,0.15)', color: '#B45309', border: '1px solid rgba(245,158,11,0.35)' }
                      : { background: 'var(--primary-500)', color: 'white' }
                  }
                >
                  {isEn ? item.badgeLabel.en : item.badgeLabel.ko}
                </span>

                <h3 className="text-base md:text-lg font-bold leading-snug" style={{ color: 'var(--gray-900)' }}>
                  {isEn ? item.titleEn : item.titleKo}
                </h3>

                <p className="text-xs md:text-sm font-mono font-semibold" style={{ color: 'var(--primary-500)' }}>
                  {item.numberKo}
                </p>
              </div>
            </article>
          ))}
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
