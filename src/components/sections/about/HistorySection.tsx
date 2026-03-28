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

// Split items into two rows of 5 for ㄹ-shape
function splitRows<T>(items: readonly T[], cols: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += cols) {
    rows.push(items.slice(i, i + cols));
  }
  return rows;
}

export default function HistorySection({ locale, history }: HistorySectionProps) {
  const t = getTranslation(locale);
  const COLS = 5;
  const rows = splitRows(history, COLS);

  return (
    <section id="history" className="py-8 md:py-16 lg:py-20 overflow-hidden" style={{ background: 'var(--background)' }} aria-label="연혁">
      <div className="section-container">
        <div className="mb-6 md:mb-12 text-center">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {t.about.history.title}
          </p>
          <h2
            className="section-title"
            style={{ color: 'var(--text-primary)' }}
          >
            {locale === 'en' ? 'Our Journey' : '오션테크의 발자취'}
          </h2>
        </div>

        {/* ㄹ-shaped timeline — desktop only */}
        <div className="hidden lg:block space-y-12">
          {rows.map((row, rowIdx) => {
            const isReversed = rowIdx % 2 === 1;
            const displayRow = isReversed ? [...row].reverse() : row;
            const globalStartIdx = rowIdx * COLS;

            return (
              <div key={rowIdx}>
                {/* Node row */}
                <div className="relative">
                  {/* Horizontal connecting line — spans full width, sits behind nodes */}
                  <div
                    className="absolute top-[52px] h-[3px] z-0"
                    style={{
                      left: '10%',
                      right: '10%',
                      background: isReversed
                        ? 'linear-gradient(90deg, #10b981 0%, #17e9b5 50%, #06b6d4 100%)'
                        : 'linear-gradient(90deg, #021297 0%, #2563eb 50%, #06b6d4 100%)',
                      opacity: 0.7,
                    }}
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-5 gap-4">
                    {displayRow.map((item, colIdx) => {
                      const globalIdx = isReversed
                        ? globalStartIdx + (row.length - 1 - colIdx)
                        : globalStartIdx + colIdx;
                      const grad = yearGradients[globalIdx % yearGradients.length];

                      return (
                        <div
                          key={globalIdx}
                          className="relative flex flex-col items-center text-center"
                        >
                          {/* Year node */}
                          <div
                            className="relative z-10 w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center mb-4 shrink-0"
                            style={{
                              background: grad,
                              boxShadow: '0 4px 20px rgba(2,18,151,0.25)',
                            }}
                          >
                            <span className="text-xl font-black text-white leading-tight">
                              {item.year}
                            </span>
                          </div>

                          {/* Card */}
                          <div
                            className="w-full p-4 rounded-2xl"
                            style={{
                              background: 'var(--background-alt)',
                              border: '1px solid var(--border)',
                              boxShadow: '0 2px 12px rgba(2,16,151,0.06)',
                            }}
                          >
                            <p className="text-sm leading-relaxed text-center" style={{ color: 'var(--text-body)' }}>
                              {locale === 'en' ? item.eventEn : item.eventKo}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Vertical connector between rows (ㄹ elbow) */}
                {rowIdx < rows.length - 1 && (
                  <div className="relative h-12 mt-0" aria-hidden="true">
                    {rowIdx % 2 === 0 ? (
                      /* Right-side connector: drops from right end of row 1 to start of row 2 */
                      <div
                        className="absolute right-[10%] top-0 bottom-0 w-[3px]"
                        style={{ background: 'linear-gradient(180deg, #06b6d4 0%, #17e9b5 100%)', opacity: 0.7 }}
                      />
                    ) : (
                      /* Left-side connector */
                      <div
                        className="absolute left-[10%] top-0 bottom-0 w-[3px]"
                        style={{ background: 'linear-gradient(180deg, #10b981 0%, #06b6d4 100%)', opacity: 0.7 }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: compact timeline */}
        <div className="lg:hidden relative pl-6 sm:pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-[9px] sm:left-[11px] top-2 bottom-2 w-[2px]"
            style={{ background: 'linear-gradient(180deg, #021297 0%, #0168EF 30%, #17E9B5 100%)' }}
            aria-hidden="true"
          />
          <div className="space-y-1">
            {history.map((item, i) => {
              const grad = yearGradients[i % yearGradients.length];
              return (
                <div key={i} className="relative flex items-start gap-2.5 sm:gap-3 py-1.5 sm:py-2">
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-6 sm:-left-8 top-2 w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full flex items-center justify-center z-10"
                    style={{ background: grad, boxShadow: '0 2px 8px rgba(2,18,151,0.2)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  {/* Year tag */}
                  <span
                    className="shrink-0 text-xs sm:text-sm font-bold font-mono px-1.5 py-0.5 rounded-md mt-0.5"
                    style={{ background: `${yearGradients[i % yearGradients.length]}`, color: 'white', minWidth: '52px', textAlign: 'center' }}
                  >
                    {item.year}
                  </span>
                  {/* Event text */}
                  <p className="text-xs sm:text-sm leading-snug pt-0.5" style={{ color: 'var(--text-body)' }}>
                    {locale === 'en' ? item.eventEn : item.eventKo}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
