import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface CeoSectionProps {
  locale: Locale;
  ceoMessage: string;
}

export default function CeoSection({ locale }: CeoSectionProps) {
  const t = getTranslation(locale);
  const lines = SITE_CONFIG.ceoMessage[locale];

  return (
    <section id="ceo" className="py-16 lg:py-20" style={{ background: 'var(--background)' }} aria-label="CEO 인사말">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <p className="section-eyebrow mb-6" style={{ color: 'var(--primary-500)' }}>
          {t.about.ceo.title}
        </p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: CEO photo placeholder */}
          <div
            className="flex flex-col items-center justify-center rounded-2xl aspect-[3/4] max-w-sm mx-auto lg:mx-0 w-full"
            style={{
              background: 'var(--background-alt)',
              border: '2px dashed var(--border)',
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p
              className="mt-4 text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {locale === 'en' ? 'CEO Photo' : '대표이사 사진'}
            </p>
          </div>

          {/* RIGHT: CEO message */}
          <div className="flex flex-col justify-center space-y-6">
            {lines.map((line, i) => {
              if (!line.trim()) return null;
              if (i === 0) {
                return (
                  <p
                    key={i}
                    className="text-2xl lg:text-3xl font-bold leading-snug"
                    style={{ color: 'var(--primary-700, #1d4ed8)' }}
                  >
                    {line}
                  </p>
                );
              }
              if (line.startsWith('(주)오션테크') || line.startsWith('Lee Woo-chul')) {
                return (
                  <p
                    key={i}
                    className="text-xl font-semibold pt-6 border-t"
                    style={{ color: 'var(--gray-700, #374151)', borderColor: 'var(--gray-200, #e5e7eb)' }}
                  >
                    {line}
                  </p>
                );
              }
              return (
                <p
                  key={i}
                  className="text-lg lg:text-xl leading-relaxed"
                  style={{ color: 'var(--gray-600, #4b5563)' }}
                >
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
