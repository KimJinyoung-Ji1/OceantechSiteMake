'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import Modal from '@/components/ui/Modal';

interface PatentsSectionProps {
  locale: Locale;
}

const patentImages: Record<string, string> = {
  '10-2197917': '/documents/certs/patent-2197917.png',
  '10-1887767': '/documents/certs/patent-page5.png',
  '10-2508401': '/documents/certs/patent-page6.png',
};

const designPatentImage = '/documents/certs/design-patents.png';

export default function PatentsSection({ locale }: PatentsSectionProps) {
  const isEn = locale === 'en';
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  const patents = SITE_CONFIG.patents;
  const designPatents = SITE_CONFIG.designPatents;

  return (
    <section className="py-12 lg:py-16" aria-label="특허 현황">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="text-center mb-8">
          <p
            className="text-base font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'PATENTS' : '특허 현황'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {isEn
              ? `${patents.length} Patents · ${designPatents.reduce((a, d) => a + d.count, 0)} Design Patents`
              : `특허 ${patents.length}건 · 디자인특허 ${designPatents.reduce((a, d) => a + d.count, 0)}건`}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {patents.map((patent) => {
            const imgSrc = patentImages[patent.number];
            return (
              <article
                key={patent.number}
                className="p-5 rounded-2xl"
                style={{
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--primary-100, #dbeafe)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-mono font-bold" style={{ color: 'var(--primary-500)' }}>
                      {patent.number}
                    </p>
                    <p className="text-sm font-semibold leading-snug mt-0.5" style={{ color: 'var(--gray-800)' }}>
                      {isEn ? patent.titleEn : patent.titleKo}
                    </p>
                    {patent.date && (
                      <p className="text-xs mt-1" style={{ color: 'var(--gray-400)' }}>
                        {patent.date}
                      </p>
                    )}
                  </div>
                </div>
                {imgSrc && (
                  <button
                    className="w-full rounded-xl overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
                    style={{
                      height: '120px',
                      border: '1px solid var(--gray-200)',
                      background: 'var(--gray-50)',
                    }}
                    onClick={() => setModal({ src: imgSrc, title: isEn ? patent.titleEn : patent.titleKo })}
                    aria-label={`${isEn ? patent.titleEn : patent.titleKo} 인증서 크게 보기`}
                  >
                    <Image
                      src={imgSrc}
                      alt={isEn ? patent.titleEn : patent.titleKo}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </button>
                )}
              </article>
            );
          })}

          {/* Design patents card */}
          <article
            className="p-5 rounded-2xl"
            style={{
              background: 'white',
              border: '1px solid var(--gray-200)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(23,233,181,0.1)' }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="14" height="14" rx="2" stroke="var(--secondary-600,#059669)" strokeWidth="1.5" fill="none" />
                  <path d="M7 10h6M10 7v6" stroke="var(--secondary-600)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold" style={{ color: 'var(--secondary-700,#047857)' }}>
                  {isEn ? 'DESIGN PATENT' : '디자인 특허'}
                </p>
                <div className="mt-0.5 space-y-0.5">
                  {designPatents.map((dp, i) => (
                    <p key={i} className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>
                      {isEn ? dp.titleEn : dp.titleKo} × {dp.count}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="w-full rounded-xl overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                height: '120px',
                border: '1px solid var(--gray-200)',
                background: 'var(--gray-50)',
              }}
              onClick={() => setModal({ src: designPatentImage, title: isEn ? 'Design Patents' : '디자인특허' })}
              aria-label="디자인특허 등록증 크게 보기"
            >
              <Image
                src={designPatentImage}
                alt={isEn ? 'Design Patents' : '디자인특허'}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
          </article>
        </div>
      </div>

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.title}
      >
        {modal && (
          <div className="relative w-full" style={{ minHeight: '400px' }}>
            <Image
              src={modal.src}
              alt={modal.title ?? ''}
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
