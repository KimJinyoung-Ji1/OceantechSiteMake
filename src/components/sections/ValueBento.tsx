import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface ValueBentoProps {
  locale: Locale;
}

const icons: Record<string, React.ReactNode> = {
  leaf: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  shield: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  fish: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6z"/>
      <path d="M18 12v.5"/>
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/>
      <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 3.98-.23 7.84 1.35 11.5C5.57 18.02 7 16 7 13.33"/>
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/>
      <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H8a9.9 9.9 0 0 0 2.46-3.26"/>
    </svg>
  ),
  award: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
};

const cardColors = [
  { bg: 'rgba(1, 104, 239, 0.06)', border: 'rgba(1, 104, 239, 0.15)', icon: 'var(--primary-500)' },
  { bg: 'rgba(23, 233, 181, 0.06)', border: 'rgba(23, 233, 181, 0.2)', icon: 'var(--secondary-700)' },
  { bg: 'rgba(2, 16, 151, 0.06)', border: 'rgba(2, 16, 151, 0.15)', icon: 'var(--primary-700)' },
  { bg: 'rgba(23, 233, 181, 0.06)', border: 'rgba(23, 233, 181, 0.2)', icon: 'var(--secondary-700)' },
];

export default function ValueBento({ locale }: ValueBentoProps) {
  const t = getTranslation(locale);

  return (
    <section className="py-20 lg:py-28 px-4" style={{ background: 'var(--gray-50)' }} aria-label="오션테크를 선택하는 이유">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {t.valueSection.title}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {t.valueSection.subtitle}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.valueSection.items.map((item, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <article
                key={i}
                className="group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ background: color.bg, border: `1px solid ${color.border}` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${color.icon}18`, color: color.icon }}
                >
                  {icons[item.icon] ?? null}
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: 'var(--gray-900)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
