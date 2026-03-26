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
    <section className="py-20 lg:py-28 px-4" aria-label="SVHC 불검출">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-10 lg:p-14 flex flex-col lg:flex-row items-center gap-10"
          style={{
            background: 'linear-gradient(135deg, var(--primary-700,#1d4ed8) 0%, var(--primary-500,#3b82f6) 100%)',
          }}
        >
          <div className="text-center lg:text-left">
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
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              {isEn
                ? 'Based on EU REACH regulations, all 235 SVHC (Substances of Very High Concern) substances were not detected, proving complete eco-friendliness.'
                : 'EU REACH 규정 기반 고위험성 우려 물질(SVHC) 235종 전종 미검출. 완전한 친환경성이 공식 입증되었습니다.'}
            </p>
          </div>

          <button
            className="shrink-0 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:shadow-lg hover:brightness-105"
            style={{ background: 'white', color: 'var(--primary-600)' }}
            onClick={() => setOpen(true)}
            aria-label={isEn ? 'View SVHC report' : 'SVHC 성적서 보기'}
          >
            {isEn ? 'View SVHC Report' : 'SVHC 성적서 보기'}
          </button>
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
