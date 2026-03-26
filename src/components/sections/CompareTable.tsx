import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface CompareTableProps {
  locale: Locale;
}

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="11" fill="#021097" />
    <path d="M6.5 11.5l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="11" fill="#DC2626" opacity="0.15" />
    <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function CompareTable({ locale }: CompareTableProps) {
  const t = getTranslation(locale);

  return (
    <section
      className="py-14 lg:py-20"
      style={{ background: 'var(--background)' }}
      aria-label="아연추 vs 납추 비교"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-10">
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

        <div
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{ border: '1px solid rgba(14,173,135,0.20)' }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-3">
            <div
              className="px-6 py-5"
              style={{ background: '#F8FFFE', borderRight: '1px solid rgba(14,173,135,0.15)' }}
            />
            <div
              className="px-6 py-5 text-center"
              style={{
                background: 'linear-gradient(135deg, #021097 0%, #0168EF 100%)',
                borderRight: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckIcon />
                <p className="text-white font-bold text-lg leading-tight">{t.compare.zinc}</p>
              </div>
              <p className="text-white/75 text-sm">(주)오션테크</p>
            </div>
            <div
              className="px-6 py-5 text-center"
              style={{ background: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)' }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <XIcon />
                <p className="text-white font-bold text-lg leading-tight">{t.compare.lead}</p>
              </div>
              <p className="text-white/75 text-sm">{locale === 'en' ? 'Conventional Product' : '기존 제품'}</p>
            </div>
          </div>

          {/* Rows */}
          {t.compare.rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-t"
              style={{
                borderColor: 'rgba(14,173,135,0.12)',
                background: i % 2 === 0 ? '#FFFFFF' : '#F8FFFE',
              }}
            >
              {/* Label */}
              <div
                className="px-6 py-3 font-semibold text-base flex items-center"
                style={{
                  color: 'var(--text-primary)',
                  borderRight: '1px solid rgba(14,173,135,0.12)',
                }}
              >
                {row.label}
              </div>

              {/* Zinc value */}
              <div
                className="px-6 py-3 flex items-center justify-center gap-2 border-r"
                style={{ borderColor: 'rgba(14,173,135,0.12)' }}
              >
                <CheckIcon />
                <span
                  className="text-lg font-bold"
                  style={{ color: '#021097' }}
                >
                  {row.zinc}
                </span>
              </div>

              {/* Lead value */}
              <div className="px-6 py-3 flex items-center justify-center gap-2">
                <XIcon />
                <span
                  className="text-lg font-bold"
                  style={{ color: '#9CA3AF' }}
                >
                  {row.lead}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
