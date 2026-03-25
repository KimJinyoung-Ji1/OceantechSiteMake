import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import type { Locale } from '@/lib/i18n';

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = getTranslation(locale);
  const localePath = (href: string) => `/${locale}${href}`;

  const titleLines = t.hero.title.split('\n');

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="히어로 섹션"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80"
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
              'linear-gradient(135deg, rgba(2,16,151,0.92) 0%, rgba(1,72,200,0.80) 50%, rgba(3,233,248,0.35) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-[1440px] mx-auto py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Left — Text */}
          <div>
            <Badge variant="green" className="mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--secondary-700)' }}
              />
              {t.hero.badge}
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="text-2xl font-medium mb-6"
              style={{ color: 'var(--primary-300)' }}
            >
              {t.hero.subtitle}
            </p>

            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={localePath('/contact')}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-200"
                style={{ background: 'var(--secondary-500)', color: 'var(--primary-900)' }}
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href={localePath('/about')}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-lg font-medium text-white border-2 border-white/30 hover:border-white/70 hover:bg-white/10 transition-all duration-200"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right — Green Cert Card */}
          <div className="hidden lg:flex flex-col items-end">
            <div
              className="p-8 rounded-3xl backdrop-blur-md text-white w-80"
              style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.22)',
                boxShadow: '0 8px 40px rgba(2,16,151,0.25)',
              }}
            >
              {/* Green Cert Mark */}
              <div className="flex items-center justify-center mb-6">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(23,233,181,0.15)', border: '2px solid rgba(23,233,181,0.4)' }}
                >
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                    <circle cx="26" cy="26" r="23" stroke="var(--secondary-500)" strokeWidth="2.5" />
                    <path d="M14 26 Q20 14 26 18 Q32 22 38 12" stroke="var(--secondary-500)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M18 30 Q22 24 26 27 Q30 30 34 22" stroke="#03E9F8" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <circle cx="26" cy="26" r="4" fill="var(--secondary-500)" fillOpacity="0.3" />
                  </svg>
                </div>
              </div>

              <div className="text-center mb-4">
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--secondary-500)' }}>
                  녹색기술인증
                </p>
                <p className="text-2xl font-black tracking-wide text-white">
                  {SITE_CONFIG.certifications.greenTech.number}
                </p>
              </div>

              <div
                className="h-px mb-4"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    인증기관
                  </span>
                  <span className="text-xs font-medium text-white">환경부</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    유효기간
                  </span>
                  <span className="text-xs font-medium text-white">
                    {SITE_CONFIG.certifications.greenTech.period}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    제품번호
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'var(--secondary-500)' }}>
                    {SITE_CONFIG.certifications.greenProduct.number}
                  </span>
                </div>
              </div>

              <div
                className="mt-5 text-center text-xs py-2 rounded-xl font-semibold"
                style={{ background: 'rgba(23,233,181,0.15)', color: 'var(--secondary-500)' }}
              >
                친환경 아연 어장추 · 녹색기술제품
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
