import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface CompareTableProps {
  locale: Locale;
}

export default function CompareTable({ locale }: CompareTableProps) {
  const t = getTranslation(locale);

  return (
    <section className="py-20 lg:py-28 px-4" aria-label="아연추 vs 납추 비교">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {t.compare.title}
          </h2>
        </div>

        <div
          className="rounded-3xl overflow-hidden shadow-xl border"
          style={{ borderColor: 'var(--gray-200)' }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-3">
            <div className="px-6 py-5" style={{ background: 'var(--gray-50)' }} />
            <div
              className="px-6 py-5 text-center"
              style={{ background: 'var(--primary-500)' }}
            >
              <p className="text-white font-bold text-base">{t.compare.zinc}</p>
              <p className="text-white/70 text-xs mt-0.5">(주)오션테크</p>
            </div>
            <div
              className="px-6 py-5 text-center"
              style={{ background: 'var(--gray-700, #374151)' }}
            >
              <p className="text-white font-bold text-base">{t.compare.lead}</p>
              <p className="text-white/70 text-xs mt-0.5">기존 제품</p>
            </div>
          </div>

          {/* Table Rows */}
          {t.compare.rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-t"
              style={{ borderColor: 'var(--gray-200)', background: i % 2 === 0 ? '#fff' : 'var(--gray-50)' }}
            >
              <div className="px-6 py-4 font-semibold text-sm" style={{ color: 'var(--gray-700)' }}>
                {row.label}
              </div>
              <div
                className="px-6 py-4 text-center text-sm font-semibold border-x"
                style={{ borderColor: 'var(--gray-200)', color: 'var(--secondary-700)' }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: 'var(--secondary-500)' }}
                  >
                    ✓
                  </span>
                  {row.zinc}
                </span>
              </div>
              <div
                className="px-6 py-4 text-center text-sm"
                style={{ color: 'var(--gray-500)' }}
              >
                {row.lead}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
