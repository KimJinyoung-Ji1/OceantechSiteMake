import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';

interface CeoSectionProps {
  locale: Locale;
  ceoMessage: string;
}

export default function CeoSection({ locale, ceoMessage }: CeoSectionProps) {
  const t = getTranslation(locale);
  const lines = ceoMessage.split('\n');

  return (
    <section id="ceo" className="py-20 lg:py-28" aria-label="CEO 인사말">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="flex flex-col items-center text-center">
          {/* CEO Avatar */}
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center mb-6 shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--primary-100, #dbeafe) 0%, var(--primary-200, #bfdbfe) 100%)',
              border: '3px solid var(--primary-300, #93c5fd)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="24" r="14" fill="var(--primary-300, #93c5fd)" />
              <ellipse cx="32" cy="52" rx="22" ry="12" fill="var(--primary-200, #bfdbfe)" />
            </svg>
          </div>

          <p
            className="text-base font-bold uppercase tracking-widest mb-2"
            style={{ color: 'var(--primary-500, #3b82f6)' }}
          >
            {t.about.ceo.title}
          </p>

          <div className="max-w-3xl space-y-5">
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
              if (line.startsWith('(주)오션테크 대표이사')) {
                return (
                  <p
                    key={i}
                    className="text-lg font-semibold pt-5 border-t"
                    style={{ color: 'var(--gray-700, #374151)', borderColor: 'var(--gray-200, #e5e7eb)' }}
                  >
                    {line}
                  </p>
                );
              }
              return (
                <p
                  key={i}
                  className="text-lg leading-relaxed"
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
