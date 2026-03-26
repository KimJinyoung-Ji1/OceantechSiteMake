'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface NewsItem {
  title: string;
  source: string;
  date: string;
  summary: string;
  image?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    title: "중금속 '납추' 바다 생태계 위협…친환경 대체재 주목",
    source: '강원도민일보',
    date: '2023.08.17',
    summary: '납으로 만든 어장추가 해양 생태계를 위협하고 있어 친환경 대체재에 대한 관심이 높아지고 있습니다.',
    image: '/images/news/kado-article-2023.png',
  },
  {
    title: '오션테크, 제17회 대한민국 우수특허 대상 수상',
    source: '한국일보',
    date: '2023.12.27',
    summary: '(주)오션테크가 친환경 아연 어장추 기술로 제17회 대한민국 우수특허 대상(기계/해양 부문)을 수상했습니다.',
    image: '/images/news/hankook-article-2023.png',
  },
  {
    title: '친환경 아연 어장추, 고성군 31개월 시범사업 성공',
    source: '오션테크',
    date: '2024.03',
    summary: '강원도 고성군 수협과의 31개월 시범사업을 성공적으로 완료, 어민들의 높은 만족도를 확인했습니다.',
    image: '/images/news/hankook-print-2023.png',
  },
  {
    title: '녹색기술인증 및 녹색기술제품 확인서 동시 취득',
    source: '환경부',
    date: '2025.07',
    summary: '(주)오션테크가 친환경 어장추로 녹색기술인증(GT-25-02356)과 녹색기술제품 확인서(GTP-25-04857)를 동시 취득했습니다.',
    image: '/images/news/hankook-print2-2023.png',
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
      className="py-10 lg:py-14 px-8 lg:px-24"
      style={{ background: 'var(--background)' }}
      aria-label="뉴스 배너"
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="text-center mb-6">
          <p
            className="text-lg font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            NEWS
          </p>
          <h2
            className="text-4xl lg:text-5xl font-black"
            style={{ color: 'var(--text-primary)' }}
          >
            오션테크 뉴스
          </h2>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: 'var(--background-alt)', border: '1px solid var(--border)' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative flex items-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Thumbnail — bigger */}
                  {item.image && (
                    <div
                      className="shrink-0 overflow-hidden lg:rounded-none rounded-t-2xl"
                      style={{ width: '100%', maxWidth: 280, minHeight: 200 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={280}
                        height={200}
                        className="w-full h-full object-cover"
                        style={{ minHeight: 200 }}
                        sizes="(max-width: 1024px) 100vw, 280px"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0 px-6 py-6 lg:px-8 lg:py-6">
                    {/* Badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="px-4 py-1.5 rounded-full text-base font-bold"
                        style={{ background: 'rgba(2,16,151,0.08)', color: 'var(--primary-500)' }}
                      >
                        {item.source}
                      </span>
                      <span className="text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {item.date}
                      </span>
                    </div>
                    <h3
                      className="text-xl lg:text-2xl font-bold mb-3 leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: 'var(--text-body)' }}
                    >
                      {item.summary}
                    </p>
                  </div>

                  {/* Right: news selection — moved toward center, more detailed */}
                  <div className="hidden xl:flex flex-col shrink-0 border-l" style={{ width: 300, borderColor: 'var(--border)' }}>
                    {NEWS_ITEMS.map((n, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className="text-left px-5 py-4 transition-all duration-200 border-b last:border-b-0"
                        style={{
                          background: idx === current ? 'rgba(2,16,151,0.06)' : 'transparent',
                          borderColor: 'var(--border)',
                          borderLeft: idx === current ? '3px solid var(--primary-500)' : '3px solid transparent',
                        }}
                      >
                        <p
                          className="text-sm font-bold mb-1 leading-snug line-clamp-2"
                          style={{ color: idx === current ? 'var(--primary-500)' : 'var(--text-primary)' }}
                        >
                          {n.title}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {n.source} · {n.date}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-6 pb-4 lg:px-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {NEWS_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current ? 'var(--primary-500)' : 'var(--border)',
                  }}
                  aria-label={`뉴스 ${i + 1}번으로 이동`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:brightness-90"
                style={{ background: 'var(--border)' }}
                aria-label="이전 뉴스"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8L10 12" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:brightness-90"
                style={{ background: 'var(--border)' }}
                aria-label="다음 뉴스"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
