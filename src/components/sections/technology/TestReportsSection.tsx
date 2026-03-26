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
    descKo: 'TAK 공인 시험기관의 물성 시험성적서로, 아연 어장추의 화학적 조성 및 유해물질 미검출 결과를 공식 인증합니다. 납 등 중금속 전 항목에서 기준치 이하로 확인되었습니다.',
    descEn: 'Official material test report from TAK accredited lab, formally certifying the chemical composition and non-detection of hazardous substances in zinc fishing weights. All heavy metal categories including lead confirmed below threshold.',
    src: '/documents/certs/test-report-tak.png',
    downloadUrl: '/documents/downloads/test-report-tak.pdf',
  },
  {
    key: 'tbk',
    titleKo: '시험성적서 (TBK)',
    titleEn: 'Test Report (TBK)',
    descKo: 'TBK 공인 시험기관의 내구성 및 기계적 특성 시험성적서. 30개월 이상 실사용 환경에서의 무게 손실 최소화 및 형상 유지 성능이 검증되었습니다.',
    descEn: 'Durability and mechanical properties test report from TBK accredited lab. Weight loss minimization and shape retention performance verified under real-use conditions for over 30 months.',
    src: '/documents/certs/test-report-tbk.png',
    downloadUrl: '/documents/downloads/test-report-tbk.pdf',
  },
];

export default function TestReportsSection({ locale }: TestReportsSectionProps) {
  const isEn = locale === 'en';
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'var(--background-alt)' }}
      aria-label="시험성적서"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-10">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'TEST REPORTS' : '시험성적서'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
            {isEn ? 'Official Test Reports' : '공인 시험성적서'}
          </h2>
        </div>

        <div className="space-y-5 max-w-4xl mx-auto">
          {testReports.map((report) => (
            <div
              key={report.key}
              className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_260px]"
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}
            >
              {/* Left: Details */}
              <div className="p-6 flex flex-col justify-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--primary-100,#dbeafe)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <rect x="4" y="2" width="12" height="16" rx="2" stroke="var(--primary-500)" strokeWidth="1.5" fill="none" />
                      <path d="M7 7h6M7 10h6M7 13h4" stroke="var(--primary-400)" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="15" cy="15" r="4" fill="var(--primary-500)" />
                      <path d="M13 15l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="card-title" style={{ color: 'var(--gray-800)' }}>
                    {isEn ? report.titleEn : report.titleKo}
                  </p>
                </div>

                <p className="card-body" style={{ color: 'var(--gray-600)' }}>
                  {isEn ? report.descEn : report.descKo}
                </p>

                <a
                  href={report.downloadUrl}
                  download
                  className="mt-1 inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 w-fit transition-colors"
                  style={{
                    background: 'var(--primary-50,#eff6ff)',
                    border: '1px solid var(--primary-200,#bfdbfe)',
                    color: 'var(--primary-600)',
                  }}
                  aria-label={`${isEn ? report.titleEn : report.titleKo} PDF 다운로드`}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 2v9M5 8l3 3 3-3M3 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {isEn ? 'Download PDF' : 'PDF 다운로드'}
                </a>
              </div>

              {/* Right: Report image */}
              <button
                className="relative cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                  minHeight: '180px',
                  background: 'var(--gray-50)',
                  borderLeft: '1px solid var(--gray-200)',
                }}
                onClick={() => setModal({ src: report.src, title: isEn ? report.titleEn : report.titleKo })}
                aria-label={`${isEn ? report.titleEn : report.titleKo} 보기`}
              >
                <Image
                  src={report.src}
                  alt={isEn ? report.titleEn : report.titleKo}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 1024px) 100vw, 260px"
                />
                <div
                  className="absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-medium"
                  style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
                >
                  {isEn ? 'Click to enlarge' : '클릭하여 확대'}
                </div>
              </button>
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
