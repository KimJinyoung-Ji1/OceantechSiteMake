import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
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
  { border: 'rgba(14, 173, 135, 0.18)', icon: 'var(--secondary-700)', numColor: 'rgba(14,173,135,0.12)', gradLine: 'var(--secondary-700)' },
  { border: 'rgba(1, 104, 239, 0.18)', icon: 'var(--primary-500)', numColor: 'rgba(1,104,239,0.10)', gradLine: 'var(--primary-500)' },
  { border: 'rgba(3, 233, 248, 0.20)', icon: 'var(--primary-300)', numColor: 'rgba(3,233,248,0.10)', gradLine: 'var(--primary-300)' },
];

const pilotStats = [
  { value: '31', unit: '개월', label: '현장 실증' },
  { value: '19', unit: '척', label: '어선 참여' },
  { value: '80', unit: '%', label: '비용 절감' },
  { value: '235', unit: '종', label: 'SVHC 불검출' },
];

export default function ValueBento({ locale }: ValueBentoProps) {
  const t = getTranslation(locale);
  const items = t.valueSection.items.slice(0, 3);

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'var(--background-alt)' }}
      aria-label="오션테크를 선택하는 이유"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {t.valueSection.title}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {t.valueSection.subtitle}
          </h2>
        </div>

        {/* 3-column Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {items.map((item, i) => {
            const color = cardColors[i % cardColors.length];
            const num = String(i + 1).padStart(2, '0');
            return (
              <article
                key={i}
                className="group relative p-8 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
                style={{ border: `1px solid ${color.border}` }}
              >
                {/* Large number */}
                <p
                  className="text-7xl font-black leading-none mb-6 select-none"
                  style={{ color: color.numColor }}
                >
                  {num}
                </p>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color.numColor}`, color: color.icon }}
                >
                  {icons[item.icon] ?? null}
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {item.description}
                </p>

                {/* Bottom gradient line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${color.gradLine}, transparent)` }}
                />
              </article>
            );
          })}
        </div>

        {/* Full-width Pilot Card */}
        <div
          className="rounded-2xl p-8 lg:p-12"
          style={{
            background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700, #0148C8) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex flex-col items-center text-center gap-8">
            <div className="max-w-2xl">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--secondary-500)' }}
              >
                {locale === 'en' ? 'FIELD PROVEN' : '현장 실증 완료'}
              </p>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
                {locale === 'en'
                  ? '31-Month Real-World Pilot in Goseong, Gangwon'
                  : '강원 고성군 31개월 실증사업 완료'}
              </h3>
              <p className="text-base text-white/65 leading-relaxed">
                {locale === 'en'
                  ? 'Verified durability, cost savings, and marine safety in a real fishing environment with SUHYUP.'
                  : '수협중앙회와 함께 실제 어업 현장에서 내구성, 비용절감, 해양 안전성을 직접 검증했습니다.'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
              {pilotStats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-5xl font-black" style={{ color: 'var(--secondary-500)' }}>
                    {s.value}
                    <span className="text-2xl font-semibold ml-1" style={{ color: 'var(--primary-300)' }}>
                      {s.unit}
                    </span>
                  </p>
                  <p className="text-base text-white/65 mt-2 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
