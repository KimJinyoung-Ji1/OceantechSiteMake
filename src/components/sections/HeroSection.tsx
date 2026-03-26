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
              'linear-gradient(125deg, rgba(2,16,151,0.93) 0%, rgba(1,72,200,0.82) 45%, rgba(3,233,248,0.28) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-[1440px] mx-auto py-28 lg:py-36">
        <div
          className="grid items-center gap-14 lg:gap-16"
          style={{ gridTemplateColumns: '1.3fr 1fr' } as React.CSSProperties}
        >
          {/* LEFT — Text */}
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

          {/* RIGHT — Two White Semi-transparent Cert Cards */}
          <div className="hidden lg:flex flex-col gap-5 items-stretch">
            {/* Card 1: 녹색기술인증서 */}
            <div
              className="p-8 rounded-[24px]"
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.95)',
                borderRadius: '24px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border" style={{ borderColor: '#E2E8F0' }}>
                  <Image
                    src="/documents/certs/green-tech-cert.png"
                    alt="녹색기술인증서"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: '#0EAD87' }}>
                    {locale === 'en' ? 'Green Technology Certification' : '녹색기술인증서'}
                  </p>
                  <p className="text-2xl font-black tracking-wide" style={{ color: '#0EAD87' }}>
                    {SITE_CONFIG.certifications.greenTech.number}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 px-1">
                <span className="text-sm font-medium" style={{ color: '#475569' }}>
                  {locale === 'en' ? 'Valid Period' : '유효기간'}
                </span>
                <span className="text-sm font-bold" style={{ color: '#1E293B' }}>
                  {SITE_CONFIG.certifications.greenTech.period}
                </span>
              </div>
              <div
                className="mt-3 text-center text-sm py-2.5 rounded-xl font-bold"
                style={{ background: 'rgba(14,173,135,0.08)', color: '#0EAD87' }}
              >
                {locale === 'en' ? SITE_CONFIG.certifications.greenTech.issuerEn : SITE_CONFIG.certifications.greenTech.issuerKo}
              </div>
            </div>

            {/* Card 2: 녹색기술제품 확인서 */}
            <div
              className="p-8 rounded-[24px]"
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.95)',
                borderRadius: '24px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border" style={{ borderColor: '#E2E8F0' }}>
                  <Image
                    src="/documents/certs/green-product-cert.png"
                    alt="녹색기술제품확인서"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: '#0168EF' }}>
                    {locale === 'en' ? 'Green Product Verification' : '녹색기술제품 확인서'}
                  </p>
                  <p className="text-2xl font-black tracking-wide" style={{ color: '#0168EF' }}>
                    {SITE_CONFIG.certifications.greenProduct.number}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 px-1">
                <span className="text-sm font-medium" style={{ color: '#475569' }}>
                  {locale === 'en' ? 'Valid Period' : '유효기간'}
                </span>
                <span className="text-sm font-bold" style={{ color: '#1E293B' }}>
                  {SITE_CONFIG.certifications.greenProduct.period}
                </span>
              </div>
              <div
                className="mt-3 text-center text-sm py-2.5 rounded-xl font-bold"
                style={{ background: 'rgba(1,104,239,0.08)', color: '#0168EF' }}
              >
                {locale === 'en' ? SITE_CONFIG.certifications.greenProduct.issuerEn : SITE_CONFIG.certifications.greenProduct.issuerKo}
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
