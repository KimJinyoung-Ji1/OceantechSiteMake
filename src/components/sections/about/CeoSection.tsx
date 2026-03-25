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
    <section id="ceo" className="py-20 lg:py-28 px-4" aria-label="CEO 인사말">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — placeholder image */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="w-72 h-80 rounded-2xl flex flex-col items-center justify-center gap-3 shrink-0"
              style={{
                background: 'linear-gradient(135deg, var(--primary-100, #dbeafe) 0%, var(--primary-200, #bfdbfe) 100%)',
                border: '2px dashed var(--primary-300, #93c5fd)',
              }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="24" r="14" fill="var(--primary-300, #93c5fd)" />
                <ellipse cx="32" cy="52" rx="22" ry="12" fill="var(--primary-200, #bfdbfe)" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: 'var(--primary-600, #2563eb)' }}>
                {t.about.ceo.name} {t.about.ceo.position}
              </p>
            </div>
          </div>

          {/* Right — message */}
          <div>
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--primary-500, #3b82f6)' }}
            >
              {t.about.ceo.title}
            </p>
            <div className="space-y-4">
              {lines.map((line, i) => {
                if (!line.trim()) return null;
                if (i === 0) {
                  return (
                    <p
                      key={i}
                      className="text-xl lg:text-2xl font-bold leading-snug"
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
                      className="text-base font-semibold pt-4 border-t"
                      style={{ color: 'var(--gray-700, #374151)', borderColor: 'var(--gray-200, #e5e7eb)' }}
                    >
                      {line}
                    </p>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--gray-600, #4b5563)' }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
