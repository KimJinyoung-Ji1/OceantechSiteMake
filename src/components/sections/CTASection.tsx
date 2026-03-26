import Link from 'next/link';
import Image from 'next/image';
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
      style={{ background: 'var(--gray-900)' }}
    >
      {/* Ocean background image with low opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=60"
          alt=""
          fill
          className="object-cover object-center opacity-10"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      {/* Decorative gradient circles */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 z-0"
        style={{ background: 'var(--secondary-500)', filter: 'blur(100px)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-15 z-0"
        style={{ background: 'var(--primary-300)', filter: 'blur(100px)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight text-white"
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p
          className="text-base lg:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          {t.cta.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={localePath('/contact')}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold text-white shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, var(--secondary-700) 0%, var(--secondary-500) 100%)',
              color: 'var(--primary-900)',
            }}
          >
            {t.cta.primary}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="/documents/catalog.pdf"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-medium border-2 transition-all duration-200 hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.30)', color: 'rgba(255,255,255,0.85)' }}
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
