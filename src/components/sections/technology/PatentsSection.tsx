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

// Patent detail descriptions
const patentDescriptions: Record<string, { ko: string; en: string }> = {
  '10-2197917': {
    ko: '아연 합금을 기반으로 납 성분 없이 어장추를 제조하는 핵심 공법 특허. 내구성과 친환경성을 동시에 확보하며, 국내 최초 친환경 어장추 양산에 성공한 기반 기술입니다.',
    en: 'Core manufacturing patent for producing fishing weights using zinc alloy without lead content. Simultaneously secures durability and eco-friendliness — the foundational technology behind Korea\'s first mass-produced eco-friendly fishing weights.',
  },
  '10-1887767': {
    ko: '수중 장애물에 걸렸을 때 자동으로 탈출 가능한 구조를 가진 어장추. 그물 손실을 최소화하고 어민의 경제적 피해를 줄이는 혁신 구조 특허입니다.',
    en: 'Fishing weight with a self-escape mechanism when caught on underwater obstacles. An innovative structural patent that minimizes net loss and reduces economic damage to fishers.',
  },
  '10-2508401': {
    ko: '발광체를 내장하여 야간 및 심해 어업에서 어장추의 위치를 파악할 수 있도록 한 특허. 조업 효율을 높이고 어구 회수율을 대폭 개선합니다.',
    en: 'Patent incorporating a luminous body into the obstacle-escape weight for visibility during nighttime and deep-sea fishing. Significantly improves operational efficiency and gear recovery rates.',
  },
  '10-1895932': {
    ko: '문어 어업에 특화된 유인 기능을 갖춘 낚시 기구로, 문어의 습성을 이용한 효율적 어획을 가능하게 합니다.',
    en: 'Specialized fishing gear with luring functionality designed for octopus fishing, enabling efficient catches by leveraging octopus behavioral patterns.',
  },
  '10-1622799': {
    ko: '어구에 적용되는 부력체 특허로, 최적의 수중 위치 유지와 그물 형태 안정성을 확보합니다.',
    en: 'Buoyancy body patent for fishing gear, securing optimal underwater positioning and net shape stability.',
  },
  '10-1802799': {
    ko: '어장추의 내구성을 획기적으로 높인 구조 특허. 반복적인 충격과 마모에도 형상을 유지하여 장기 사용이 가능합니다.',
    en: 'Structural patent that dramatically enhances fishing weight durability, maintaining shape against repeated impacts and wear for extended service life.',
  },
};

export default function PatentsSection({ locale }: PatentsSectionProps) {
  const isEn = locale === 'en';
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  const patents = SITE_CONFIG.patents;
  const designPatents = SITE_CONFIG.designPatents;

  return (
    <section className="py-12 lg:py-16" aria-label="특허 현황">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="text-center mb-10">
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

        <div className="space-y-5">
          {patents.map((patent) => {
            const imgSrc = patentImages[patent.number];
            const desc = patentDescriptions[patent.number];
            return (
              <article
                key={patent.number}
                className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr]"
                style={{
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                }}
              >
                {/* Left: Large patent image */}
                {imgSrc ? (
                  <button
                    className="relative w-full cursor-pointer hover:opacity-90 transition-opacity"
                    style={{
                      minHeight: '200px',
                      height: '100%',
                      background: 'var(--gray-50)',
                      borderRight: '1px solid var(--gray-200)',
                    }}
                    onClick={() => setModal({ src: imgSrc, title: isEn ? patent.titleEn : patent.titleKo })}
                    aria-label={`${isEn ? patent.titleEn : patent.titleKo} 인증서 크게 보기`}
                  >
                    <Image
                      src={imgSrc}
                      alt={isEn ? patent.titleEn : patent.titleKo}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 280px"
                    />
                    <div
                      className="absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-medium"
                      style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
                    >
                      {isEn ? 'Click to enlarge' : '클릭하여 확대'}
                    </div>
                  </button>
                ) : (
                  <div
                    className="flex items-center justify-center"
                    style={{
                      minHeight: '200px',
                      background: 'var(--gray-50)',
                      borderRight: '1px solid var(--gray-200)',
                    }}
                  >
                    {/* Polished patent icon */}
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                      <rect x="8" y="4" width="48" height="56" rx="4" fill="var(--primary-50,#eff6ff)" stroke="var(--primary-200,#bfdbfe)" strokeWidth="2" />
                      <rect x="16" y="16" width="32" height="4" rx="2" fill="var(--primary-300,#93c5fd)" />
                      <rect x="16" y="24" width="24" height="3" rx="1.5" fill="var(--primary-200)" />
                      <rect x="16" y="31" width="28" height="3" rx="1.5" fill="var(--primary-200)" />
                      <rect x="16" y="38" width="20" height="3" rx="1.5" fill="var(--primary-200)" />
                      <circle cx="44" cy="46" r="10" fill="var(--primary-500,#3b82f6)" />
                      <path d="M39 46l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

                {/* Right: Details */}
                <div className="p-6 flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--primary-100)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" stroke="var(--primary-500)" strokeWidth="1.5" fill="rgba(59,130,246,0.1)" />
                      </svg>
                    </div>
                    <span className="text-sm font-mono font-bold" style={{ color: 'var(--primary-500)' }}>
                      {patent.number}
                    </span>
                    {patent.date && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }}>
                        {patent.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold leading-snug" style={{ color: 'var(--gray-900)' }}>
                    {isEn ? patent.titleEn : patent.titleKo}
                  </h3>
                  {desc && (
                    <p className="text-base leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                      {isEn ? desc.en : desc.ko}
                    </p>
                  )}
                  {patentDownloads[patent.number] && (
                    <a
                      href={patentDownloads[patent.number]}
                      download
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 w-fit transition-colors"
                      style={{
                        background: 'var(--primary-50,#eff6ff)',
                        border: '1px solid var(--primary-200,#bfdbfe)',
                        color: 'var(--primary-600)',
                      }}
                      aria-label={`${isEn ? patent.titleEn : patent.titleKo} PDF 다운로드`}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 2v9M5 8l3 3 3-3M3 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {isEn ? 'Download PDF' : 'PDF 다운로드'}
                    </a>
                  )}
                </div>
              </article>
            );
          })}

          {/* Design patents card */}
          <article
            className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr]"
            style={{
              background: 'white',
              border: '1px solid var(--gray-200)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}
          >
            {/* Left: Design patent image */}
            <button
              className="relative w-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                minHeight: '200px',
                height: '100%',
                background: 'rgba(23,233,181,0.05)',
                borderRight: '1px solid rgba(23,233,181,0.2)',
              }}
              onClick={() => setModal({ src: designPatentImage, title: isEn ? 'Design Patents' : '디자인특허' })}
              aria-label="디자인특허 등록증 크게 보기"
            >
              <Image
                src={designPatentImage}
                alt={isEn ? 'Design Patents' : '디자인특허'}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 280px"
              />
              <div
                className="absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-medium"
                style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
              >
                {isEn ? 'Click to enlarge' : '클릭하여 확대'}
              </div>
            </button>

            {/* Right: Details */}
            <div className="p-6 flex flex-col justify-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(23,233,181,0.15)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 2 L18 7 L18 13 L10 18 L2 13 L2 7 Z" stroke="var(--secondary-600,#059669)" strokeWidth="1.5" fill="rgba(23,233,181,0.1)" />
                    <circle cx="10" cy="10" r="2.5" fill="var(--secondary-500)" />
                  </svg>
                </div>
                <span className="text-sm font-bold" style={{ color: 'var(--secondary-700,#047857)' }}>
                  {isEn ? 'DESIGN PATENT' : '디자인 특허'}
                </span>
              </div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--gray-900)' }}>
                {isEn ? `${designPatents.reduce((a, d) => a + d.count, 0)} Design Patents Registered` : `디자인특허 ${designPatents.reduce((a, d) => a + d.count, 0)}건 등록`}
              </h3>
              <ul className="space-y-1.5">
                {designPatents.map((dp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: 'var(--secondary-500)' }}
                    />
                    <span className="text-base" style={{ color: 'var(--gray-700)' }}>
                      {isEn ? dp.titleEn : dp.titleKo} <span className="font-bold">× {dp.count}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-base leading-relaxed mt-1" style={{ color: 'var(--gray-600)' }}>
                {isEn
                  ? 'Registered design patents covering fishing weight appearance, luminous body designs, and octopus lure configurations — protecting the visual identity of our eco-friendly product line.'
                  : '어장추 외형, 발광체 디자인, 문어 유인기 미끼 형태를 포함한 디자인특허 등록으로 친환경 제품 라인의 시각적 정체성을 보호합니다.'}
              </p>
            </div>
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
