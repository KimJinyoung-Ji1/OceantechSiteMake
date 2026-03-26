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
    <section id="history" className="py-20 lg:py-28 px-6 lg:px-12 text-center" aria-label="연혁">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <p
            className="text-lg font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {t.about.history.title}
          </p>
          <h2
            className="text-5xl lg:text-6xl font-black"
            style={{ color: 'var(--text-primary)' }}
          >
            {locale === 'en' ? 'Our Journey' : '오션테크의 발자취'}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
            style={{ background: 'var(--border)' }}
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
                      isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 text-left'
                    }`}
                  >
                    <div
                      className="inline-block p-5 rounded-2xl hover:shadow-lg transition-shadow duration-200"
                      style={{
                        background: 'var(--background-alt)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <p
                        className="text-lg font-black mb-1"
                        style={{ color: 'var(--primary-500)' }}
                      >
                        {item.year}
                      </p>
                      <p className="text-lg font-medium" style={{ color: 'var(--text-body)' }}>
                        {locale === 'en' ? item.eventEn : item.eventKo}
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
