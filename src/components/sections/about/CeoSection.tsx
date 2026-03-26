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
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
          {/* LEFT: label + avatar stacked */}
          <div className="flex flex-col items-center shrink-0">
            <div
              style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                background: 'var(--gray-200, #e5e7eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden="true"
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="60" cy="38" r="22" fill="var(--gray-400, #9ca3af)" />
                <path
                  d="M10 108 C10 78 30 62 60 62 C90 62 110 78 110 108 Z"
                  fill="var(--gray-400, #9ca3af)"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT: CEO message */}
          <div className="flex flex-col justify-center space-y-6 flex-1">
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
