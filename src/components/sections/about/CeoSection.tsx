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
        <div className="flex flex-col items-start text-left max-w-3xl">
          <p
            className="text-base font-bold uppercase tracking-widest mb-6"
            style={{ color: 'var(--primary-500, #3b82f6)' }}
          >
            {t.about.ceo.title}
          </p>

          <div className="space-y-5 w-full">
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
