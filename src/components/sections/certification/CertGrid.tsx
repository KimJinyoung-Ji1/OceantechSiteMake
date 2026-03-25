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
    accentColor: 'var(--secondary-700,#047857)',
    bgColor: 'rgba(23,233,181,0.07)',
    borderColor: 'rgba(23,233,181,0.25)',
  },
  {
    key: 'greenProduct',
    titleKo: '녹색기술제품확인서',
    titleEn: 'Green Product Certificate',
    src: '/documents/certs/green-product-cert.png',
    numberKo: SITE_CONFIG.certifications.greenProduct.number,
    accentColor: 'var(--secondary-700,#047857)',
    bgColor: 'rgba(23,233,181,0.07)',
    borderColor: 'rgba(23,233,181,0.25)',
  },
  {
    key: 'venture',
    titleKo: '벤처기업확인서',
    titleEn: 'Venture Company Certificate',
    src: '/documents/certs/venture-cert.png',
    numberKo: SITE_CONFIG.certifications.venture.number,
    accentColor: 'var(--primary-500)',
    bgColor: 'rgba(1,104,239,0.05)',
    borderColor: 'rgba(1,104,239,0.18)',
  },
  {
    key: 'patentAward',
    titleKo: '우수특허대상',
    titleEn: 'Excellence Patent Award',
    src: '/documents/certs/patent-award-2023.png',
    numberKo: SITE_CONFIG.certifications.patentAward.date,
    accentColor: '#D97706',
    bgColor: 'rgba(245,158,11,0.05)',
    borderColor: 'rgba(245,158,11,0.2)',
  },
  {
    key: 'researchDept',
    titleKo: '연구전담부서 인정서',
    titleEn: 'R&D Department Recognition',
    src: '/documents/certs/research-dept.png',
    numberKo: SITE_CONFIG.certifications.researchDept.number,
    accentColor: 'var(--primary-500)',
    bgColor: 'rgba(1,104,239,0.05)',
    borderColor: 'rgba(1,104,239,0.18)',
  },
  {
    key: 'sme',
    titleKo: '중소기업확인서',
    titleEn: 'SME Certificate',
    src: '/documents/certs/sme-cert.png',
    numberKo: SITE_CONFIG.certifications.sme.number,
    accentColor: 'var(--gray-600)',
    bgColor: 'rgba(107,114,128,0.05)',
    borderColor: 'rgba(107,114,128,0.18)',
  },
];

export default function CertGrid({ locale }: CertGridProps) {
  const isEn = locale === 'en';
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  return (
    <section className="py-16 px-4" aria-label="인증서 목록">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certItems.map((item) => (
            <button
              key={item.key}
              className="p-6 rounded-2xl text-left cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              style={{
                background: item.bgColor,
                border: `1px solid ${item.borderColor}`,
              }}
              onClick={() => setModal({ src: item.src, title: isEn ? item.titleEn : item.titleKo })}
              aria-label={`${isEn ? item.titleEn : item.titleKo} 원본 보기`}
            >
              {/* Thumbnail preview */}
              <div
                className="relative w-full h-36 rounded-xl overflow-hidden mb-5"
                style={{ background: 'rgba(255,255,255,0.7)' }}
              >
                <Image
                  src={item.src}
                  alt={isEn ? item.titleEn : item.titleKo}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                />
              </div>

              <p className="text-sm font-bold mb-1" style={{ color: 'var(--gray-900)' }}>
                {isEn ? item.titleEn : item.titleKo}
              </p>
              <p className="text-xs font-mono" style={{ color: item.accentColor }}>
                {item.numberKo}
              </p>
              <p
                className="text-xs mt-3 font-medium"
                style={{ color: item.accentColor }}
              >
                {isEn ? 'View original →' : '원본 보기 →'}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title}>
        {modal && (
          <div className="relative w-full" style={{ minHeight: '400px' }}>
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
