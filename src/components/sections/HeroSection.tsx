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
              'linear-gradient(125deg, rgba(2,20,40,0.85) 0%, rgba(12,114,135,0.70) 45%, rgba(2,20,40,0.60) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 max-w-[1600px] mx-auto py-16 sm:py-20 lg:py-28">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center gap-8 lg:gap-10"
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

            <h1 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="text-2xl font-medium mb-6"
              style={{ color: '#7AEDC8' }}
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

          {/* RIGHT — Premium Cert Cards */}
          <div className="hidden lg:flex flex-col gap-3 items-stretch">
            {/* Card 1: 녹색기술인증서 */}
            <div
              className="group rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1.5px solid rgba(52,217,181,0.40)',
                boxShadow: '0 8px 32px rgba(12,114,135,0.18), 0 0 0 1px rgba(255,255,255,0.6)',
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(90deg, #0C7287, #11A88F, #34D9B5)' }}
              />
              {/* Cert image area */}
              <div className="relative w-full bg-white" style={{ height: '140px' }}>
                <Image
                  src="/documents/certs/green-tech-cert.png"
                  alt="녹색기술인증서"
                  fill
                  className="object-contain object-center p-3 group-hover:scale-[1.03] transition-transform duration-300"
                />
                {/* Gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-10"
                  style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)' }}
                />
              </div>
              {/* Divider */}
              <div className="mx-5" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(52,217,181,0.35), transparent)' }} />
              {/* Cert info */}
              <div className="px-4 py-3 flex items-start gap-3">
                <div
                  className="mt-0.5 w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(52,217,181,0.12)', border: '1px solid rgba(52,217,181,0.3)' }}
                >
                  <Image src="/images/green-cert-mark.png" alt="" width={20} height={20} className="object-contain" />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5"
                    style={{ color: '#11A88F' }}
                  >
                    {locale === 'en' ? 'Green Technology Cert.' : '녹색기술인증서'}
                  </p>
                  <p className="text-lg font-black tracking-wider leading-tight" style={{ color: '#0C7287' }}>
                    {SITE_CONFIG.certifications.greenTech.number}
                  </p>
                  <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'rgba(12,114,135,0.5)' }}>
                    {locale === 'en' ? 'Ministry of Science & ICT' : '과학기술정보통신부'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: 녹색기술제품 확인서 */}
            <div
              className="group rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1.5px solid rgba(52,217,181,0.40)',
                boxShadow: '0 8px 32px rgba(12,114,135,0.18), 0 0 0 1px rgba(255,255,255,0.6)',
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(90deg, #0C7287, #11A88F, #34D9B5)' }}
              />
              {/* Cert image area */}
              <div className="relative w-full bg-white" style={{ height: '140px' }}>
                <Image
                  src="/documents/certs/green-product-cert.png"
                  alt="녹색기술제품확인서"
                  fill
                  className="object-contain object-center p-3 group-hover:scale-[1.03] transition-transform duration-300"
                />
                {/* Gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-10"
                  style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)' }}
                />
              </div>
              {/* Divider */}
              <div className="mx-5" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(52,217,181,0.35), transparent)' }} />
              {/* Cert info */}
              <div className="px-4 py-3 flex items-start gap-3">
                <div
                  className="mt-0.5 w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(52,217,181,0.12)', border: '1px solid rgba(52,217,181,0.3)' }}
                >
                  <Image src="/images/green-cert-mark.png" alt="" width={20} height={20} className="object-contain" />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5"
                    style={{ color: '#11A88F' }}
                  >
                    {locale === 'en' ? 'Green Product Verification' : '녹색기술제품 확인서'}
                  </p>
                  <p className="text-lg font-black tracking-wider leading-tight" style={{ color: '#0C7287' }}>
                    {SITE_CONFIG.certifications.greenProduct.number}
                  </p>
                  <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'rgba(12,114,135,0.5)' }}>
                    {locale === 'en' ? 'Ministry of Environment' : '환경부'}
                  </p>
                </div>
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
