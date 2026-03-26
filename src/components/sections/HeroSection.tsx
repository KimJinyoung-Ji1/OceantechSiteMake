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
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-24 max-w-[1920px] mx-auto py-16 sm:py-20 lg:py-28">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center gap-8 lg:gap-10"
        >
          {/* LEFT — Text */}
          <div className="pl-0 lg:pl-20">
            <Badge variant="green" className="mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--secondary-700)' }}
              />
              {t.hero.badge}
            </Badge>

            <h1 className="text-2xl sm:text-4xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="text-lg sm:text-2xl font-medium mb-6"
              style={{ color: '#17E9B5' }}
            >
              {t.hero.subtitle}
            </p>

            <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-10 max-w-xl">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href={localePath('/contact')}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, var(--secondary-700) 0%, var(--secondary-500) 100%)',
                  color: 'var(--primary-900)',
                }}
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href={localePath('/about')}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-medium text-white border-2 border-white/30 hover:border-white/70 hover:bg-white/10 transition-all duration-200"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            {/* Inline Stats Row */}
            <div className="flex flex-wrap gap-6">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="text-2xl font-black"
                    style={{ color: 'var(--secondary-500)' }}
                  >
                    {s.value}
                  </span>
                  <span className="text-sm text-white/60">{s.label}</span>
                  {i < stats.length - 1 && (
                    <span
                      className="ml-2 w-px h-4 hidden sm:block"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Auto-sliding Cert Carousel */}
          <div className="hidden lg:block w-full">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 8px 32px rgba(2,16,151,0.12)',
              }}
            >
              {/* Slide area */}
              <div className="relative" style={{ height: '280px' }}>
                {CERT_SLIDES.map((slide, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center gap-6 px-6 transition-all duration-700"
                    style={{
                      opacity: currentSlide === i ? 1 : 0,
                      transform: currentSlide === i ? 'translateX(0)' : 'translateX(40px)',
                      pointerEvents: currentSlide === i ? 'auto' : 'none',
                    }}
                  >
                    {/* Cert image */}
                    <div className="relative w-[180px] h-[220px] bg-white/90 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={slide.image}
                        alt={slide.labelKo}
                        fill
                        className="object-contain p-3"
                        sizes="180px"
                      />
                    </div>
                    {/* Cert info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--primary-300)' }}>
                        {locale === 'en' ? slide.labelEn : slide.labelKo}
                      </p>
                      <p className="text-2xl font-black text-white leading-tight mb-3">
                        {slide.number}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--secondary-500)' }} />
                        <span className="text-base text-white/60">
                          {locale === 'en' ? 'Certified & Verified' : '국가공인 인증'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 pb-4">
                {CERT_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: currentSlide === i ? '24px' : '8px',
                      height: '8px',
                      background: currentSlide === i ? 'var(--primary-300)' : 'rgba(255,255,255,0.3)',
                    }}
                    aria-label={`슬라이드 ${i + 1}`}
                  />
                ))}
              </div>
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
