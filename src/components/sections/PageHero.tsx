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
      className="relative overflow-hidden"
      aria-label="페이지 히어로"
      style={{
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: 'clamp(16px, 4vw, 96px)',
        paddingRight: 'clamp(16px, 4vw, 96px)',
        background: 'linear-gradient(180deg, rgba(219,39,119,0.06) 0%, transparent 100%)',
      }}
    >
      {/* 상단 글래스 라인 */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 10%, var(--primary-500) 50%, transparent 90%)', opacity: 0.2 }}
      />

      <div className="relative z-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] sm:text-sm mb-2" style={{ color: 'var(--text-secondary)' }} aria-label="브레드크럼">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" style={{ color: 'var(--gray-400)' }}>›</span>}
              {item.href ? (
                <Link href={localePath(item.href)} className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold" style={{ color: 'var(--primary-500)' }}>{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-end gap-4">
          {/* 왼쪽 accent bar */}
          <div
            className="hidden sm:block w-1 rounded-full shrink-0"
            style={{
              height: '36px',
              background: 'linear-gradient(180deg, var(--primary-500), var(--primary-300, #F472B6))',
            }}
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
            {subtitle && (
              <p className="text-[11px] sm:text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* 하단 fade out */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'var(--border)' }}
      />
    </section>
  );
}
