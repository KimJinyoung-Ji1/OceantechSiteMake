import Link from 'next/link';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface CTASectionProps {
  locale: Locale;
}

export default function CTASection({ locale }: CTASectionProps) {
  const t = getTranslation(locale);
  const localePath = (href: string) => `/${locale}${href}`;
  const titleLines = t.cta.title.split('\n');

  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      aria-label="문의 유도 섹션"
      style={{ background: 'var(--primary-100)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
        style={{ background: 'var(--primary-300)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20"
        style={{ background: 'var(--secondary-500)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight"
          style={{ color: 'var(--primary-900)' }}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p
          className="text-base lg:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--gray-600)' }}
        >
          {t.cta.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={localePath('/contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-200"
            style={{ background: 'var(--primary-500)' }}
          >
            {t.cta.primary}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="/documents/catalog.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-medium border-2 transition-all duration-200 hover:shadow-lg"
            style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-700)' }}
            download
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v9M5 8l3 3 3-3M3 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
