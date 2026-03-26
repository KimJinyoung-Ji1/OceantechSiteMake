import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface CompareTableProps {
  locale: Locale;
}

export default function CompareTable({ locale }: CompareTableProps) {
  const t = getTranslation(locale);

  return (
    <section
      className="py-20 lg:py-28 px-4"
      style={{ background: 'var(--background)' }}
      aria-label="아연추 vs 납추 비교"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {locale === 'en' ? 'COMPARISON' : '성능 비교'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {t.compare.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — Zinc (Ocean Tech) */}
          <div
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ border: '1.5px solid rgba(14,173,135,0.30)' }}
          >
            {/* Header */}
            <div
              className="px-8 py-5 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, var(--secondary-700) 0%, var(--secondary-500) 100%)',
              }}
            >
              <span className="text-2xl" aria-hidden="true">✅</span>
              <div>
                <p className="text-white font-bold text-lg leading-tight">{t.compare.zinc}</p>
                <p className="text-white/75 text-xs">(주)오션테크</p>
              </div>
            </div>

            {/* Rows */}
            <div style={{ background: '#FFFFFF' }}>
              {t.compare.rows.map((row, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-8 py-4 border-b last:border-b-0"
                  style={{ borderColor: 'rgba(14,173,135,0.10)' }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5"
                    style={{ background: 'var(--secondary-700)' }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <p
                      className="text-xs font-semibold mb-0.5"
                      style={{ color: 'var(--secondary-700)' }}
                    >
                      {row.label}
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {row.zinc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Lead (Legacy) */}
          <div
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ border: '1.5px solid rgba(161,130,0,0.22)' }}
          >
            {/* Header */}
            <div
              className="px-8 py-5 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)',
              }}
            >
              <span className="text-2xl" aria-hidden="true">❌</span>
              <div>
                <p className="text-white font-bold text-lg leading-tight">{t.compare.lead}</p>
                <p className="text-white/75 text-xs">{locale === 'en' ? 'Conventional Product' : '기존 제품'}</p>
              </div>
            </div>

            {/* Rows */}
            <div style={{ background: '#FAFAFA' }}>
              {t.compare.rows.map((row, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-8 py-4 border-b last:border-b-0"
                  style={{ borderColor: 'rgba(148,163,184,0.15)' }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5"
                    style={{ background: '#94A3B8' }}
                    aria-hidden="true"
                  >
                    ✕
                  </span>
                  <div>
                    <p
                      className="text-xs font-semibold mb-0.5"
                      style={{ color: '#64748B' }}
                    >
                      {row.label}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: '#64748B' }}
                    >
                      {row.lead}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
