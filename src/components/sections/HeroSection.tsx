'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import type { Locale } from '@/lib/i18n';

interface HeroSectionProps {
  locale: Locale;
}

const CERT_SLIDES = [
  {
    image: '/documents/certs/green-tech-cert.png',
    labelKo: '녹색기술인증서',
    labelEn: 'Green Technology Certification',
    number: SITE_CONFIG.certifications.greenTech.number,
  },
  {
    image: '/documents/certs/green-product-cert.png',
    labelKo: '녹색기술제품확인서',
    labelEn: 'Green Product Verification',
    number: SITE_CONFIG.certifications.greenProduct.number,
  },
  {
    image: '/documents/certs/venture-cert.png',
    labelKo: '벤처기업 확인서',
    labelEn: 'Venture Company Certificate',
    number: SITE_CONFIG.certifications.venture.number,
  },
  {
    image: '/documents/certs/patent-award-2023.png',
    labelKo: '우수특허대상',
    labelEn: 'Patent Excellence Award',
    number: '제17회 기계/해양',
  },
];

export default function HeroSection({ locale }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CERT_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  const t = getTranslation(locale);
  const localePath = (href: string) => `/${locale}${href}`;

  const titleLines = t.hero.title.split('\n');

  const stats = [
    { value: `${SITE_CONFIG.stats.patents}건`, label: '특허' },
    { value: `${SITE_CONFIG.stats.durability}년`, label: '내구성' },
    { value: `${SITE_CONFIG.stats.svhc}종`, label: 'SVHC' },
    { value: `${SITE_CONFIG.stats.costReduction}%`, label: '비용절감' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="히어로 섹션"
      style={{ marginTop: '-88px', paddingTop: '88px' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ocean-aerial.jpg"
          alt="바다 배경"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(125deg, rgba(2,16,151,0.45) 0%, rgba(1,72,200,0.30) 50%, rgba(3,233,248,0.15) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-24 max-w-[1920px] mx-auto py-4 sm:py-6 lg:py-8">
        <div
          className="flex flex-col"
        >
          {/* LEFT — Text */}
          <div className="pl-0 lg:pl-20">
            <div className="mb-6">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  color: 'white',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--secondary-500)' }}
                />
                {t.hero.badge}
              </span>
            </div>

            <h1
              className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="text-lg sm:text-2xl font-bold mb-6"
              style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
            >
              <span style={{ color: '#5EEAD4' }}>{t.hero.subtitle}</span>
            </p>

            <div
              className="mb-10 max-w-2xl"
              style={{
                background: 'rgba(0,0,0,0.25)',
                padding: '20px 24px',
                borderRadius: '16px',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                {/* LEFT — cert carousel */}
                <div className="shrink-0 flex flex-col items-center gap-3" style={{ width: '144px' }}>
                  {/* Image — no border, 3D floating feel */}
                  <div className="relative" style={{ width: '144px', height: '186px', perspective: '600px' }}>
                    {CERT_SLIDES.map((slide, i) => (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          opacity: currentSlide === i ? 1 : 0,
                          transition: 'opacity 0.6s ease',
                          transform: 'rotateY(-4deg) rotateX(2deg)',
                          filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.35)) drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                        }}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.labelKo}
                          fill
                          className="object-contain"
                          sizes="144px"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Cert name + number — fixed height to prevent layout shift */}
                  <div className="text-center relative" style={{ width: '144px', height: '36px' }}>
                    {CERT_SLIDES.map((slide, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 flex flex-col justify-center"
                        style={{
                          opacity: currentSlide === i ? 1 : 0,
                          transition: 'opacity 0.5s ease',
                        }}
                      >
                        <p className="text-[10px] font-bold truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {locale === 'en' ? slide.labelEn : slide.labelKo}
                        </p>
                        <p className="text-xs font-black text-white truncate">{slide.number}</p>
                      </div>
                    ))}
                  </div>
                  {/* Dots */}
                  <div className="flex gap-1.5">
                    {CERT_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: currentSlide === i ? '14px' : '5px',
                          height: '5px',
                          background: currentSlide === i ? 'white' : 'rgba(255,255,255,0.3)',
                        }}
                        aria-label={`슬라이드 ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px self-stretch" style={{ background: 'rgba(255,255,255,0.12)' }} />

                {/* RIGHT — stats + description stacked */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Stats row — 4 inline with 3D feel */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" style={{ perspective: '600px' }}>
                    {stats.map((s, i) => (
                      <div
                        key={i}
                        className="group rounded-xl px-2 py-3 text-center transition-all duration-500 cursor-default whitespace-nowrap"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          transform: `rotateY(${i % 2 === 0 ? '-2' : '2'}deg)`,
                          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'rotateY(0deg) translateY(-3px)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                          e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = `rotateY(${i % 2 === 0 ? '-2' : '2'}deg)`;
                          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                        }}
                      >
                        <p className="text-lg sm:text-xl font-black leading-none" style={{ color: 'var(--secondary-400, #34d399)' }}>{s.value}</p>
                        <p className="text-[10px] sm:text-xs font-semibold mt-1 leading-none" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />

                  {/* Description — pushed to bottom */}
                  <p
                    className="text-sm lg:text-base font-medium leading-relaxed mt-auto"
                    style={{ color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                  >
                    {t.hero.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href={localePath('/contact')}
                className="hero-btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-bold"
                style={{
                  background: 'linear-gradient(135deg, #0EAD87 0%, #17E9B5 100%)',
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(14,173,135,0.3)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {t.hero.ctaPrimary}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={localePath('/about')}
                className="hero-btn-secondary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
                style={{
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(255,255,255,0.08)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                }}
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: 'var(--primary-300)' }}
          />
        </div>
      </div>
    </section>
  );
}
