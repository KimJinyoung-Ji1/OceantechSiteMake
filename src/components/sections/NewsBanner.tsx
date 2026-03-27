'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface NewsItem {
  title: string;
  source: string;
  date: string;
  summary: string;
  image?: string;
  sourceColor: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    title: "중금속 '납추' 바다 생태계 위협…친환경 대체재 주목",
    source: '강원도민일보',
    date: '2023.08.17',
    summary: '납으로 만든 어망추가 해양 생태계를 위협하고 있어 친환경 대체재에 대한 관심이 높아지고 있습니다.',
    image: '/images/news/kado-article-2023.png',
    sourceColor: '#0168EF',
  },
  {
    title: '오션테크, 제17회 대한민국 우수특허 대상 수상',
    source: '한국일보',
    date: '2023.12.27',
    summary: '(주)오션테크가 친환경 아연 어망추 기술로 제17회 대한민국 우수특허 대상(기계/해양 부문)을 수상했습니다.',
    image: '/images/news/hankook-article-2023.png',
    sourceColor: '#D97706',
  },
  {
    title: '친환경 아연 어망추, 고성군 31개월 시범사업 성공',
    source: '오션테크',
    date: '2024.03',
    summary: '강원도 고성군 수협과의 31개월 시범사업을 성공적으로 완료, 어민들의 높은 만족도를 확인했습니다.',
    image: '/images/news/hankook-print-2023.png',
    sourceColor: '#0EAD87',
  },
  {
    title: '녹색기술인증 및 녹색기술제품 확인서 동시 취득',
    source: '환경부',
    date: '2025.07',
    summary: '(주)오션테크가 친환경 어망추로 녹색기술인증(GT-25-02356)과 녹색기술제품 확인서(GTP-25-04857)를 동시 취득했습니다.',
    image: '/images/news/hankook-print2-2023.png',
    sourceColor: '#7C3AED',
  },
];

const SLIDE_INTERVAL = 4000;

export default function NewsBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % NEWS_ITEMS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + NEWS_ITEMS.length) % NEWS_ITEMS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const item = NEWS_ITEMS[current];

  return (
    <section
      className="py-6 sm:py-10 lg:py-14"
      style={{ background: 'var(--background)' }}
      aria-label="뉴스 배너"
    >
      <div className="section-container">
        <div className="text-center mb-4 sm:mb-6">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            NEWS
          </p>
          <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
            오션테크 뉴스
          </h2>
        </div>

        {/* Main card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 4px 24px rgba(2,16,151,0.08)',
            border: '1px solid #e2e8f0',
            background: 'white',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-stretch">
            {/* Left: news list (xl+) */}
            <div className="hidden xl:flex flex-col shrink-0" style={{ width: 380 }}>
              {NEWS_ITEMS.map((n, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className="text-left px-5 py-4 transition-all duration-200 border-b last:border-b-0 relative"
                  style={{
                    background: idx === current ? '#f8fafc' : 'transparent',
                    borderColor: '#f1f5f9',
                  }}
                >
                  {/* Active indicator */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
                    style={{
                      background: idx === current ? n.sourceColor : 'transparent',
                      borderRadius: '0 3px 3px 0',
                    }}
                  />
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: n.sourceColor }}
                    />
                    <span className="text-xs font-bold" style={{ color: idx === current ? n.sourceColor : '#94a3b8' }}>
                      {n.source}
                    </span>
                    <span className="text-xs" style={{ color: '#b0b8c4' }}>{n.date}</span>
                  </div>
                  <p
                    className="text-sm font-semibold leading-snug line-clamp-2"
                    style={{ color: idx === current ? 'var(--text-primary)' : '#94a3b8' }}
                  >
                    {n.title}
                  </p>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden xl:block w-px" style={{ background: '#e2e8f0' }} />

            {/* Right: slide content */}
            <div className="relative flex-1" style={{ minHeight: 180 }}>
              {NEWS_ITEMS.map((n, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row"
                  style={{
                    position: idx === 0 ? 'relative' : 'absolute',
                    inset: idx === 0 ? undefined : 0,
                    opacity: idx === current ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    pointerEvents: idx === current ? 'auto' : 'none',
                  }}
                >
                  {/* Thumbnail */}
                  {n.image && (
                    <div
                      className="hidden sm:block shrink-0 overflow-hidden"
                      style={{ width: 260, minHeight: 180 }}
                    >
                      <Image
                        src={n.image}
                        alt={n.title}
                        width={260}
                        height={200}
                        className="w-full h-full object-cover"
                        style={{ minHeight: 200 }}
                        sizes="260px"
                      />
                    </div>
                  )}

                  {/* Text content */}
                  <div className="flex-1 min-w-0 px-4 py-3 sm:px-6 sm:py-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span
                        className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold text-white"
                        style={{ background: n.sourceColor }}
                      >
                        {n.source}
                      </span>
                      <span className="text-[10px] sm:text-sm font-medium" style={{ color: '#94a3b8' }}>
                        {n.date}
                      </span>
                    </div>
                    <h3
                      className="text-sm sm:text-xl lg:text-2xl font-bold mb-1.5 sm:mb-3 leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {n.title}
                    </h3>
                    <p className="text-[11px] sm:text-base leading-relaxed" style={{ color: 'var(--text-body)' }}>
                      {n.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom controls */}
          <div
            className="flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3"
            style={{ borderTop: '1px solid #f1f5f9', background: '#fafbfc' }}
          >
            {/* Progress dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {NEWS_ITEMS.map((n, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '20px' : '8px',
                    height: '8px',
                    background: i === current ? n.sourceColor : '#e2e8f0',
                  }}
                  aria-label={`뉴스 ${i + 1}번으로 이동`}
                />
              ))}
              <span className="ml-2 text-[10px] sm:text-xs font-mono font-bold" style={{ color: '#94a3b8' }}>
                {String(current + 1).padStart(2, '0')}/{String(NEWS_ITEMS.length).padStart(2, '0')}
              </span>
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prev}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all hover:bg-white"
                style={{ border: '1px solid #e2e8f0' }}
                aria-label="이전 뉴스"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8L10 12" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all hover:bg-white"
                style={{ border: '1px solid #e2e8f0' }}
                aria-label="다음 뉴스"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
