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
  '10-1895932': '/documents/certs/patent-award-certificate.png',
  '10-1802799': '/documents/certs/breaking-test.png',
};

const patentDownloads: Record<string, string> = {
  '10-2197917': '/documents/downloads/patent-10-2197917.pdf',
};

const designPatentImage = '/documents/certs/design-patents.png';

// Patent icon placeholder
const PatentPlaceholderIcon = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="8" y="4" width="48" height="56" rx="4" fill="var(--primary-50,#eff6ff)" stroke="var(--primary-200,#bfdbfe)" strokeWidth="2" />
    <rect x="16" y="16" width="32" height="4" rx="2" fill="var(--primary-300,#93c5fd)" />
    <rect x="16" y="24" width="24" height="3" rx="1.5" fill="var(--primary-200)" />
    <rect x="16" y="31" width="28" height="3" rx="1.5" fill="var(--primary-200)" />
    <rect x="16" y="38" width="20" height="3" rx="1.5" fill="var(--primary-200)" />
    <circle cx="44" cy="46" r="10" fill="var(--primary-500,#3b82f6)" />
    <path d="M39 46l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Test report icon
const TestReportIcon = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="8" y="4" width="48" height="56" rx="4" fill="rgba(23,233,181,0.07)" stroke="rgba(23,233,181,0.4)" strokeWidth="2" />
    <rect x="16" y="14" width="32" height="4" rx="2" fill="rgba(23,233,181,0.5)" />
    <rect x="16" y="22" width="20" height="3" rx="1.5" fill="rgba(23,233,181,0.3)" />
    <rect x="16" y="29" width="28" height="3" rx="1.5" fill="rgba(23,233,181,0.3)" />
    <circle cx="44" cy="46" r="10" fill="#17e9b5" />
    <path d="M39 46l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PatentsSection({ locale }: PatentsSectionProps) {
  const isEn = locale === 'en';
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  const patents = SITE_CONFIG.patents;
  const designPatents = SITE_CONFIG.designPatents;

  // Test report items
  const testReports = [
    {
      key: 'testTak',
      number: 'TAK-2024-008089',
      titleKo: '시험성적서 (TAK)',
      titleEn: 'Test Report (TAK)',
      src: '/documents/certs/test-report-tak.png',
      downloadUrl: '/documents/downloads/test-report-tak.pdf',
      isTestReport: true,
    },
    {
      key: 'testTbk',
      number: 'TBK-2024-000252',
      titleKo: '시험성적서 (TBK)',
      titleEn: 'Test Report (TBK)',
      src: '/documents/certs/test-report-tbk.png',
      downloadUrl: '/documents/downloads/test-report-tbk.pdf',
      isTestReport: true,
    },
  ];

  // Build combined grid items: 6 patents + design patent + 2 test reports
  const gridItems = [
    ...patents.map((p) => ({
      key: p.number,
      number: p.number,
      titleKo: p.titleKo,
      titleEn: p.titleEn,
      date: p.date,
      src: patentImages[p.number] ?? null,
      downloadUrl: patentDownloads[p.number] ?? null,
      isTestReport: false,
      isDesign: false,
    })),
    {
      key: 'design',
      number: isEn
        ? `${designPatents.reduce((a, d) => a + d.count, 0)} designs`
        : `${designPatents.reduce((a, d) => a + d.count, 0)}건`,
      titleKo: `디자인특허 ${designPatents.reduce((a, d) => a + d.count, 0)}건`,
      titleEn: `${designPatents.reduce((a, d) => a + d.count, 0)} Design Patents`,
      date: '',
      src: designPatentImage,
      downloadUrl: null,
      isTestReport: false,
      isDesign: true,
    },
    ...testReports.map((r) => ({
      key: r.key,
      number: r.number,
      titleKo: r.titleKo,
      titleEn: r.titleEn,
      date: '',
      src: r.src,
      downloadUrl: r.downloadUrl,
      isTestReport: true,
      isDesign: false,
    })),
  ];

  return (
    <section className="py-8 md:py-16 lg:py-20" style={{ background: 'var(--background)' }} aria-label="특허현황 및 시험성적서">
      <div className="section-container">
        <div className="text-center mb-6 md:mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'PATENTS & TEST REPORTS' : '특허현황 및 시험성적서'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
            {isEn
              ? `${patents.length} Patents · ${designPatents.reduce((a, d) => a + d.count, 0)} Design Patents · 2 Test Reports`
              : `특허 ${patents.length}건 · 디자인특허 ${designPatents.reduce((a, d) => a + d.count, 0)}건 · 시험성적서 2건`}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
          {gridItems.map((item) => {
            const badgeBg = item.isTestReport
              ? '#0EAD87'
              : item.isDesign
              ? '#0EAD87'
              : 'var(--primary-500)';
            return (
            <article
              key={item.key}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 12px rgba(2,16,151,0.06)',
              }}
            >
              {/* Top accent */}
              <div className="h-[3px] w-full" style={{ background: badgeBg }} />

              {/* Image area */}
              <button
                className="relative cursor-pointer flex items-center justify-center w-full overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  background: 'linear-gradient(180deg, #fafbfc 0%, #f0f4f8 100%)',
                }}
                onClick={() =>
                  item.src
                    ? setModal({ src: item.src, title: isEn ? item.titleEn : item.titleKo })
                    : undefined
                }
                aria-label={`${isEn ? item.titleEn : item.titleKo} 크게 보기`}
              >
                {item.src ? (
                  <>
                    <Image
                      src={item.src}
                      alt={isEn ? item.titleEn : item.titleKo}
                      fill
                      className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      style={{ background: 'rgba(0,0,0,0.3)' }}
                    >
                      <span className="px-2 py-1 rounded-md text-xs sm:text-sm font-semibold text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        {isEn ? 'Enlarge' : '확대'}
                      </span>
                    </div>
                  </>
                ) : item.isTestReport ? (
                  <TestReportIcon />
                ) : (
                  <PatentPlaceholderIcon />
                )}
              </button>

              {/* Info */}
              <div className="p-1.5 sm:p-4 flex flex-col items-center text-center gap-0.5 sm:gap-2 flex-1" style={{ borderTop: '1px solid #e2e8f0' }}>
                <span
                  className="text-xs sm:text-sm font-bold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-md tracking-wider uppercase text-white"
                  style={{ background: badgeBg }}
                >
                  {item.isTestReport
                    ? (isEn ? 'TEST' : '시험성적서')
                    : item.isDesign
                    ? (isEn ? 'DESIGN' : '디자인특허')
                    : (isEn ? 'PATENT' : '특허')}
                </span>

                <h3 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: 'var(--gray-900)' }}>
                  {isEn ? item.titleEn : item.titleKo}
                </h3>

                <p
                  className="text-xs sm:text-sm font-mono font-semibold px-1 py-0.5 rounded"
                  style={{ color: 'var(--primary-500)', background: 'rgba(1,104,239,0.06)' }}
                >
                  {item.number}
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
