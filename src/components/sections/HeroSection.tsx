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
          <div className="hidden lg:block">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.20)',
                boxShadow: '0 8px 32px rgba(2,16,151,0.15)',
              }}
            >
              {/* 1행 2열 그리드 */}
              <div className="grid grid-cols-2">
                {/* Card 1 */}
                <div className="p-5 flex flex-col items-center text-center border-r" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                  <div className="relative w-full bg-white/90 rounded-xl overflow-hidden mb-3" style={{ height: '160px' }}>
                    <Image
                      src="/documents/certs/green-tech-cert.png"
                      alt="녹색기술인증서"
                      fill
                      className="object-contain p-3"
                      sizes="240px"
                    />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--primary-300)' }}>
                    {locale === 'en' ? 'Green Tech Cert.' : '녹색기술인증서'}
                  </p>
                  <p className="text-lg font-black text-white">
                    {SITE_CONFIG.certifications.greenTech.number}
                  </p>
                </div>
                {/* Card 2 */}
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="relative w-full bg-white/90 rounded-xl overflow-hidden mb-3" style={{ height: '160px' }}>
                    <Image
                      src="/documents/certs/green-product-cert.png"
                      alt="녹색기술제품확인서"
                      fill
                      className="object-contain p-3"
                      sizes="240px"
                    />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--primary-300)' }}>
                    {locale === 'en' ? 'Green Product Cert.' : '녹색기술제품확인서'}
                  </p>
                  <p className="text-lg font-black text-white">
                    {SITE_CONFIG.certifications.greenProduct.number}
                  </p>
                </div>
              </div>
              {/* Bottom strip */}
              <div
                className="px-5 py-3 text-center text-xs font-medium"
                style={{ color: 'rgba(255,255,255,0.6)', borderTop: '1px solid rgba(255,255,255,0.10)' }}
              >
                {locale === 'en' ? 'Certified 2025.07 — Valid until 2029.07' : '2025.07 인증 — 2029.07까지 유효'}
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
