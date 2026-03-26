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
    <section className="py-16 lg:py-20" style={{ background: 'var(--background)' }} aria-label="특허현황 및 시험성적서">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-12">
          <p
            className="text-lg font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'PATENTS & TEST REPORTS' : '특허현황 및 시험성적서'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-black" style={{ color: 'var(--gray-900)' }}>
            {isEn
              ? `${patents.length} Patents · ${designPatents.reduce((a, d) => a + d.count, 0)} Design Patents · 2 Test Reports`
              : `특허 ${patents.length}건 · 디자인특허 ${designPatents.reduce((a, d) => a + d.count, 0)}건 · 시험성적서 2건`}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gridItems.map((item) => (
            <article
              key={item.key}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'white',
                border: item.isTestReport
                  ? '1px solid rgba(23,233,181,0.3)'
                  : item.isDesign
                  ? '1px solid rgba(23,233,181,0.2)'
                  : '1px solid var(--gray-200)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}
            >
              {/* Image area */}
              <button
                className="relative w-full cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center"
                style={{
                  minHeight: '180px',
                  background: item.isTestReport
                    ? 'rgba(23,233,181,0.04)'
                    : 'var(--gray-50)',
                  borderBottom: '1px solid var(--gray-100)',
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
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: 'rgba(0,0,0,0.45)', color: 'white' }}
                    >
                      {isEn ? 'Click to enlarge' : '클릭하여 확대'}
                    </div>
                  </>
                ) : item.isTestReport ? (
                  <TestReportIcon />
                ) : (
                  <PatentPlaceholderIcon />
                )}
              </button>

              {/* Info area */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                {/* Badge */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={
                      item.isTestReport
                        ? { background: 'rgba(23,233,181,0.15)', color: 'var(--secondary-700,#047857)' }
                        : item.isDesign
                        ? { background: 'rgba(23,233,181,0.12)', color: 'var(--secondary-700,#047857)' }
                        : { background: 'var(--primary-50,#eff6ff)', color: 'var(--primary-600)' }
                    }
                  >
                    {item.isTestReport
                      ? (isEn ? 'TEST REPORT' : '시험성적서')
                      : item.isDesign
                      ? (isEn ? 'DESIGN' : '디자인특허')
                      : (isEn ? 'PATENT' : '특허')}
                  </span>
                  <span className="text-xs font-mono" style={{ color: 'var(--gray-400)' }}>
                    {item.number}
                  </span>
                </div>

                <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--gray-900)' }}>
                  {isEn ? item.titleEn : item.titleKo}
                </h3>

                {item.date && (
                  <p className="text-xs" style={{ color: 'var(--gray-400)' }}>{item.date}</p>
                )}

                {item.downloadUrl && (
                  <a
                    href={item.downloadUrl}
                    download
                    className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 w-fit transition-colors"
                    style={{
                      background: item.isTestReport ? 'rgba(23,233,181,0.1)' : 'var(--primary-50,#eff6ff)',
                      border: item.isTestReport ? '1px solid rgba(23,233,181,0.3)' : '1px solid var(--primary-200,#bfdbfe)',
                      color: item.isTestReport ? 'var(--secondary-700,#047857)' : 'var(--primary-600)',
                    }}
                    aria-label={`${isEn ? item.titleEn : item.titleKo} PDF 다운로드`}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2v9M5 8l3 3 3-3M3 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {isEn ? 'Download PDF' : 'PDF 다운로드'}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title}>
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
