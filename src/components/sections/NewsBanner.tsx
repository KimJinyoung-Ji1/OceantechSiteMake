'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface NewsItem {
  title: string;
  source: string;
  date: string;
  summary: string;
  image?: string;
  sourceColor: string;
  url?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    title: '고성군 친환경 어구추 호평 — "보급 확대를"',
    source: '강원도민일보',
    date: '2025.12.03',
    summary: '고성군이 도입한 친환경 아연 어구추가 기존 납추 대비 강도 40배, 교체 주기 10배로 어민들의 높은 호평을 받고 있습니다. 30개 이상 언론사 동시 보도.',
    image: '/images/news/kado-article-2025.jpg',
    sourceColor: '#0168EF',
    url: 'https://www.kado.net/news/articleView.html?idxno=2020202',
  },
  {
    title: '동해안 정치망 친환경 어구 추 확대 보급 기대…해양 오염 차단',
    source: '아시아경제',
    date: '2025.12.01',
    summary: '세계 최초로 개발된 친환경 아연 어구추가 가성비와 만족도가 높은 것으로 나타나, 동해안 정치망 전체 확대 보급이 기대되고 있습니다.',
    image: '/images/news/asiae-article-2025.jpg',
    sourceColor: '#E11D48',
    url: 'https://www.asiae.co.kr/article/2025120121233068937',
  },
  {
    title: '친환경 어구 추 시범 사업 만족도 높아',
    source: 'CNB뉴스',
    date: '2025.12.02',
    summary: '고성군의 친환경 아연추 시범 사업 결과, 강도 40배·교체 주기 10배의 성능과 함께 어민들의 높은 만족도가 확인됐습니다.',
    image: '/images/news/cnb-article-2025.jpg',
    sourceColor: '#2563EB',
    url: 'https://www.cnbnews.com/news/article.html?no=765033',
  },
  {
    title: '고성군, 친환경 아연추 효과 입증',
    source: '환경일보',
    date: '2025.12.01',
    summary: '2022년부터 오션테크와 함께 진행한 시범 사업에서 반영구적 제품으로 기존 추 대비 40배 강도, 10배 긴 교체 주기가 입증됐습니다.',
    image: '/images/news/hkbs-article-2025.jpg',
    sourceColor: '#059669',
    url: 'https://www.hkbs.co.kr/news/articleView.html?idxno=811999',
  },
  {
    title: "중금속 '납추' 바다 생태계 위협…친환경 대체재 주목",
    source: '강원도민일보',
    date: '2023.08.17',
    summary: '납으로 만든 어망추가 해양 생태계를 위협하고 있어 친환경 대체재에 대한 관심이 높아지고 있습니다.',
    image: '/images/news/kado-article-2023.png',
    sourceColor: '#0168EF',
    url: 'https://www.kado.net/news/articleView.html?idxno=2020202',
  },
  {
    title: '오션테크, 제17회 대한민국 우수특허 대상 수상',
    source: '한국일보',
    date: '2023.12.27',
    summary: '(주)오션테크가 친환경 아연 어망추 기술로 제17회 대한민국 우수특허 대상(기계/해양 부문)을 수상했습니다.',
    image: '/images/news/hankook-article-2023.png',
    sourceColor: '#D97706',
    url: 'https://www.hankookilbo.com/News/Read/A2023122213400001977',
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
      id="news"
      className="py-6 sm:py-10 lg:py-14"
      style={{ background: 'var(--background)' }}
      aria-label="뉴스 배너"
    >
      <div className="section-container">
        <ScrollReveal>
        <div className="text-center mb-4 sm:mb-6">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            NEWS
          </p>
          <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
            오션테크 뉴스
          </h2>
        </div>
        </ScrollReveal>

        {/* Main card */}
        <ScrollReveal delay={100}>
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
                    <span className="text-xs font-bold" style={{ color: idx === current ? n.sourceColor : '#64748b' }}>
                      {n.source}
                    </span>
                    <span className="text-xs" style={{ color: '#64748b' }}>{n.date}</span>
                  </div>
                  <p
                    className="text-sm font-semibold leading-snug line-clamp-2"
                    style={{ color: idx === current ? 'var(--text-primary)' : '#64748b' }}
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
                        className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-bold text-white"
                        style={{ background: n.sourceColor }}
                      >
                        {n.source}
                      </span>
                      <span className="text-xs sm:text-sm font-medium" style={{ color: '#64748b' }}>
                        {n.date}
                      </span>
                    </div>
                    {n.url ? (
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-xl lg:text-2xl font-bold mb-1.5 sm:mb-3 leading-snug block hover:underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {n.title}
                      </a>
                    ) : (
                      <h3
                        className="text-sm sm:text-xl lg:text-2xl font-bold mb-1.5 sm:mb-3 leading-snug"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {n.title}
                      </h3>
                    )}
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
              <span className="ml-2 text-xs sm:text-sm font-mono font-bold" style={{ color: '#64748b' }}>
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
        </ScrollReveal>
      </div>
    </section>
  );
}
