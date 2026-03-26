import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface HistorySectionProps {
  locale: Locale;
  history: typeof SITE_CONFIG.history;
}

const yearGradients = [
  'linear-gradient(135deg, #021297 0%, #0148c8 100%)',
  'linear-gradient(135deg, #0148c8 0%, #2563eb 100%)',
  'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #17e9b5 100%)',
  'linear-gradient(135deg, #17e9b5 0%, #10b981 100%)',
];

export default function HistorySection({ locale, history }: HistorySectionProps) {
  const t = getTranslation(locale);

  return (
    <section id="history" className="py-20 lg:py-28 px-6 lg:px-24 overflow-hidden" aria-label="연혁">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-14 text-center">
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

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Horizontal connecting line */}
          <div
            className="hidden lg:block absolute top-[52px] left-0 right-0 h-0.5 z-0"
            style={{
              background: 'linear-gradient(90deg, #021297 0%, #0148c8 30%, #2563eb 60%, #17e9b5 100%)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-4">
            {history.map((item, i) => {
              const grad = yearGradients[i % yearGradients.length];
              return (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Year badge (dot on timeline) */}
                  <div
                    className="relative z-10 w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center mb-4 shrink-0 shadow-lg"
                    style={{
                      background: grad,
                      boxShadow: '0 4px 20px rgba(2,18,151,0.25)',
                    }}
                  >
                    <span
                      className="text-2xl font-black text-white leading-tight"
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className="w-full p-4 rounded-2xl text-left"
                    style={{
                      background: 'var(--background-alt)',
                      border: '1px solid var(--border)',
                      boxShadow: '0 2px 12px rgba(2,16,151,0.06)',
                    }}
                  >
                    <p className="text-base leading-relaxed" style={{ color: 'var(--text-body)' }}>
                      {locale === 'en' ? item.eventEn : item.eventKo}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
