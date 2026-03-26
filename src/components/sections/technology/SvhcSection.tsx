'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import Modal from '@/components/ui/Modal';

interface SvhcSectionProps {
  locale: Locale;
}

export default function SvhcSection({ locale }: SvhcSectionProps) {
  const isEn = locale === 'en';
  const [open, setOpen] = useState(false);

  return (
    <section className="py-12 lg:py-16" aria-label="SVHC 불검출">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div
          className="rounded-3xl p-10 lg:p-14 max-w-4xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, var(--primary-700,#1d4ed8) 0%, var(--primary-500,#3b82f6) 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="text-center lg:text-left flex-1">
              <p
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                EU REACH 기준
              </p>
              <p
                className="text-7xl lg:text-8xl font-black mb-2"
                style={{ color: 'var(--secondary-400, #34d399)' }}
              >
                {SITE_CONFIG.stats.svhc}
              </p>
              <p className="text-3xl font-bold text-white mb-4">
                {isEn ? 'SVHC Substances\nNot Detected' : '종 유해물질\n미검출'}
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                {isEn
                  ? 'Based on EU REACH regulations, all 235 SVHC (Substances of Very High Concern) substances were not detected, proving complete eco-friendliness.'
                  : 'EU REACH 규정 기반 고위험성 우려 물질(SVHC) 235종 전종 미검출. 완전한 친환경성이 공식 입증되었습니다.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                className="px-6 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:shadow-lg hover:brightness-105"
                style={{ background: 'white', color: 'var(--primary-600)' }}
                onClick={() => setOpen(true)}
                aria-label={isEn ? 'View SVHC report' : 'SVHC 성적서 보기'}
              >
                {isEn ? 'View Report' : '성적서 보기'}
              </button>
              <a
                href="/documents/downloads/svhc-report.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
                aria-label={isEn ? 'Download SVHC report PDF' : 'SVHC 성적서 PDF 다운로드'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2v9M5 8l3 3 3-3M3 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isEn ? 'Download PDF' : 'PDF 다운로드'}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={isEn ? 'SVHC Test Report' : 'SVHC 시험성적서'}
      >
        <div className="relative w-full" style={{ minHeight: '400px' }}>
          <Image
            src="/documents/certs/svhc-report.png"
            alt="SVHC 시험성적서"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 672px"
          />
        </div>
      </Modal>
    </section>
  );
}
