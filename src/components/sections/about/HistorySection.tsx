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
                  {/* Horizontal connecting line */}
                  <div
                    className="absolute top-[52px] h-0.5 z-0"
                    style={{
                      left: `calc(${100 / (COLS * 2)}%)`,
                      right: `calc(${100 / (COLS * 2)}%)`,
                      background: isReversed
                        ? 'linear-gradient(90deg, #10b981 0%, #17e9b5 50%, #06b6d4 100%)'
                        : 'linear-gradient(90deg, #021297 0%, #2563eb 50%, #06b6d4 100%)',
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
                  <div className="relative h-10 mt-1" aria-hidden="true">
                    {/* Right elbow for odd rows, left elbow for even rows */}
                    {rowIdx % 2 === 0 ? (
                      /* Right-side connector: drops from right end of row 1 to start of row 2 */
                      <div
                        className="absolute right-[10%] top-0 bottom-0 w-0.5"
                        style={{ background: 'linear-gradient(180deg, #06b6d4 0%, #17e9b5 100%)' }}
                      />
                    ) : (
                      /* Left-side connector */
                      <div
                        className="absolute left-[10%] top-0 bottom-0 w-0.5"
                        style={{ background: 'linear-gradient(180deg, #10b981 0%, #06b6d4 100%)' }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: simple vertical list */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
          {history.map((item, i) => {
            const grad = yearGradients[i % yearGradients.length];
            return (
              <div key={i} className="flex gap-4 items-start">
                <div
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center shrink-0"
                  style={{ background: grad, boxShadow: '0 4px 16px rgba(2,18,151,0.2)' }}
                >
                  <span className="text-sm font-black text-white text-center leading-tight px-1">
                    {item.year}
                  </span>
                </div>
                <div
                  className="flex-1 p-3 rounded-xl text-sm leading-relaxed"
                  style={{
                    background: 'var(--background-alt)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-body)',
                  }}
                >
                  {locale === 'en' ? item.eventEn : item.eventKo}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
