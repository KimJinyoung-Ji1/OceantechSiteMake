import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface HistorySectionProps {
  locale: Locale;
  history: typeof SITE_CONFIG.history;
}

export default function HistorySection({ locale, history }: HistorySectionProps) {
  const t = getTranslation(locale);

  return (
    <section id="history" className="py-20 lg:py-28 px-4" aria-label="연혁">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {t.about.history.title}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {locale === 'en' ? 'Our Journey' : '오션테크의 발자취'}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
            style={{ background: 'var(--primary-200, #bfdbfe)' }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {history.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex items-center gap-4 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 md:max-w-[calc(50%-2rem)] ${
                      isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'
                    }`}
                  >
                    <div
                      className="inline-block p-4 rounded-xl hover:shadow-md transition-shadow duration-200"
                      style={{
                        background: 'white',
                        border: '1px solid var(--gray-200, #e5e7eb)',
                      }}
                    >
                      <p
                        className="text-xs font-bold mb-1"
                        style={{ color: 'var(--primary-500)' }}
                      >
                        {item.year}
                      </p>
                      <p className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>
                        {item.event}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white z-10 shrink-0"
                    style={{ background: 'var(--primary-500)' }}
                    aria-hidden="true"
                  />

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
