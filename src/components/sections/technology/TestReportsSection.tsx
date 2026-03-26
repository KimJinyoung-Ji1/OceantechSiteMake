'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import Modal from '@/components/ui/Modal';

interface TestReportsSectionProps {
  locale: Locale;
}

const testReports = [
  {
    key: 'tak',
    titleKo: '시험성적서 (TAK)',
    titleEn: 'Test Report (TAK)',
    src: '/documents/certs/test-report-tak.png',
    downloadUrl: '/documents/downloads/test-report-tak.pdf',
  },
  {
    key: 'tbk',
    titleKo: '시험성적서 (TBK)',
    titleEn: 'Test Report (TBK)',
    src: '/documents/certs/test-report-tbk.png',
    downloadUrl: '/documents/downloads/test-report-tbk.pdf',
  },
];

export default function TestReportsSection({ locale }: TestReportsSectionProps) {
  const isEn = locale === 'en';
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  return (
    <section
      className="py-12 lg:py-16"
      style={{ background: 'var(--gray-50)' }}
      aria-label="시험성적서"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p
            className="text-base font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'TEST REPORTS' : '시험성적서'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Official Test Reports' : '공인 시험성적서'}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testReports.map((report) => (
            <div
              key={report.key}
              className="p-6 rounded-2xl flex flex-col"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                style={{ background: 'var(--primary-100, #dbeafe)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="4" y="2" width="12" height="16" rx="2" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
                  <path d="M7 7h6M7 10h6M7 13h4" stroke="var(--primary-400)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-lg font-semibold mb-2" style={{ color: 'var(--gray-800)' }}>
                {isEn ? report.titleEn : report.titleKo}
              </p>
              <div className="mt-auto flex items-center gap-3">
                <button
                  className="text-sm font-medium"
                  style={{ color: 'var(--primary-400)' }}
                  onClick={() => setModal({ src: report.src, title: isEn ? report.titleEn : report.titleKo })}
                  aria-label={`${isEn ? report.titleEn : report.titleKo} 보기`}
                >
                  {isEn ? 'View →' : '보기 →'}
                </button>
                <a
                  href={report.downloadUrl}
                  download
                  className="inline-flex items-center gap-1 text-sm font-semibold rounded-lg px-3 py-1 transition-colors"
                  style={{
                    background: 'var(--primary-50, #eff6ff)',
                    border: '1px solid var(--primary-200, #bfdbfe)',
                    color: 'var(--primary-600)',
                  }}
                  aria-label={`${isEn ? report.titleEn : report.titleKo} PDF 다운로드`}
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 2v9M5 8l3 3 3-3M3 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {isEn ? 'PDF' : 'PDF 다운로드'}
                </a>
              </div>
            </div>
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
