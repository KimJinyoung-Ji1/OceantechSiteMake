import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface PageHeroProps {
  locale: Locale;
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; href?: string }[];
}

export default function PageHero({ locale, title, subtitle, breadcrumb }: PageHeroProps) {
  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <section
      className="relative pt-[88px] pb-2 px-6 lg:px-24 overflow-hidden"
      aria-label="페이지 히어로"
      style={{
        background:
          'linear-gradient(135deg, var(--primary-800, #021297) 0%, var(--primary-600, #0148c8) 60%, var(--primary-400, #2563eb) 100%)',
      }}
    >
      {/* Decorative circles — scaled down 50% */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
        style={{ background: 'var(--secondary-500, #17e9b5)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-20 h-20 rounded-full opacity-5"
        style={{ background: 'white' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1920px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-1" aria-label="브레드크럼">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">›</span>}
              {item.href ? (
                <Link
                  href={localePath(item.href)}
                  className="hover:text-white/90 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-0">{title}</h1>
        {subtitle && (
          <p className="text-sm text-white/70 max-w-xl leading-tight">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
