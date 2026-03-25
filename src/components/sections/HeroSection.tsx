import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { getTranslation } from '@/lib/i18n';
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
              'linear-gradient(135deg, rgba(2,16,151,0.88) 0%, rgba(1,72,200,0.75) 50%, rgba(3,233,248,0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div>
            <Badge variant="green" className="mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--secondary-700)' }}
              />
              {t.hero.badge}
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="text-xl font-medium mb-6"
              style={{ color: 'var(--primary-300)' }}
            >
              {t.hero.subtitle}
            </p>

            <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={localePath('/contact')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-200"
                style={{ background: 'var(--secondary-500)', color: 'var(--gray-900)' }}
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href={localePath('/about')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-medium text-white border-2 border-white/30 hover:border-white/70 hover:bg-white/10 transition-all duration-200"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right — Cert Badges */}
          <div className="hidden lg:flex flex-col gap-4 items-end">
            <div
              className="p-6 rounded-2xl backdrop-blur-sm text-white max-w-xs"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--primary-300)' }}>
                {t.hero.greenTechLabel}
              </p>
              <p className="text-2xl font-extrabold" style={{ color: 'var(--secondary-500)' }}>
                GT-25-02356
              </p>
              <p className="text-xs mt-1 text-white/60">2025.07.24 ~ 2029.07.23</p>
            </div>
            <div
              className="p-6 rounded-2xl backdrop-blur-sm text-white max-w-xs"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--primary-300)' }}>
                {t.hero.greenProductLabel}
              </p>
              <p className="text-2xl font-extrabold" style={{ color: 'var(--secondary-500)' }}>
                GTP-25-04857
              </p>
              <p className="text-xs mt-1 text-white/60">2025.07.24 ~ 2029.07.23</p>
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
