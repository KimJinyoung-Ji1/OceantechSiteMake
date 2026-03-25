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
    <section className="py-20 lg:py-28 px-4" aria-label="특허 현황">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'PATENTS' : '특허 현황'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {isEn ? `${patents.length} Patents · ${designPatents.reduce((a, d) => a + d.count, 0)} Design Patents` : `특허 ${patents.length}건 · 디자인특허 ${designPatents.reduce((a, d) => a + d.count, 0)}건`}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {patents.map((patent) => {
            const imgSrc = patentImages[patent.number];
            return (
              <article
                key={patent.number}
                className={`p-6 rounded-2xl transition-all duration-200 ${imgSrc ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg' : ''}`}
                style={{
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
                onClick={imgSrc ? () => setModal({ src: imgSrc, title: patent.title }) : undefined}
                role={imgSrc ? 'button' : undefined}
                tabIndex={imgSrc ? 0 : undefined}
                onKeyDown={imgSrc ? (e) => e.key === 'Enter' && setModal({ src: imgSrc, title: patent.title }) : undefined}
                aria-label={imgSrc ? `${patent.title} 인증서 보기` : undefined}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--primary-100, #dbeafe)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <p className="text-xs font-mono font-bold mb-2" style={{ color: 'var(--primary-500)' }}>
                  {patent.number}
                </p>
                <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--gray-800)' }}>
                  {patent.title}
                </p>
                {patent.date && (
                  <p className="text-xs mt-2" style={{ color: 'var(--gray-400)' }}>
                    {patent.date}
                  </p>
                )}
                {imgSrc && (
                  <p className="text-xs mt-3 font-medium" style={{ color: 'var(--primary-400)' }}>
                    {isEn ? 'View certificate →' : '등록증 보기 →'}
                  </p>
                )}
              </article>
            );
          })}

          {/* Design patents card */}
          <article
            className="p-6 rounded-2xl cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            style={{
              background: 'white',
              border: '1px solid var(--gray-200)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}
            onClick={() => setModal({ src: designPatentImage, title: isEn ? 'Design Patents' : '디자인특허' })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setModal({ src: designPatentImage, title: isEn ? 'Design Patents' : '디자인특허' })}
            aria-label="디자인특허 등록증 보기"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(23,233,181,0.1)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="var(--secondary-600,#059669)" strokeWidth="1.5" fill="none" />
                <path d="M7 10h6M10 7v6" stroke="var(--secondary-600)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-xs font-bold mb-2" style={{ color: 'var(--secondary-700,#047857)' }}>
              {isEn ? 'DESIGN PATENT' : '디자인 특허'}
            </p>
            <div className="space-y-1">
              {designPatents.map((dp, i) => (
                <p key={i} className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>
                  {dp.title} × {dp.count}
                </p>
              ))}
            </div>
            <p className="text-xs mt-3 font-medium" style={{ color: 'var(--secondary-600)' }}>
              {isEn ? 'View certificates →' : '등록증 보기 →'}
            </p>
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
