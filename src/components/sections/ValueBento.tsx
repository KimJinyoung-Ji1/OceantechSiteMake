import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import type { Locale } from '@/lib/i18n';

interface ValueBentoProps {
  locale: Locale;
}

const icons: Record<string, React.ReactNode> = {
  leaf: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  shield: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  fish: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16s2-8 10-8 10 8 10 8"/>
      <path d="M2 16s2 6 10 6 10-6 10-6"/>
      <circle cx="17" cy="16" r="1" fill="currentColor"/>
      <path d="M2 16 0 12l4 0"/>
    </svg>
  ),
  award: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      className="py-10 sm:py-16 lg:py-20"
      style={{ background: 'var(--background-alt)' }}
      aria-label="오션테크를 선택하는 이유"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-12">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {t.valueSection.title}
          </p>
          <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
            {t.valueSection.subtitle}
          </h2>
        </div>

        {/* 3-column Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
          {items.map((item, i) => {
            const color = cardColors[i % cardColors.length];
            const num = String(i + 1).padStart(2, '0');
            return (
              <article
                key={i}
                className="group relative p-4 sm:p-8 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col items-center text-center"
                style={{ border: `1px solid ${color.border}` }}
              >
                {/* Large number */}
                <p
                  className="text-4xl sm:text-7xl font-black leading-none mb-3 sm:mb-6 select-none"
                  style={{ color: color.numColor }}
                >
                  {num}
                </p>

                <div
                  className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-5"
                  style={{ background: `${color.numColor}`, color: color.icon }}
                >
                  <span className="[&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-10 sm:[&>svg]:h-10">
                    {icons[item.icon] ?? null}
                  </span>
                </div>

                <h3
                  className="text-sm sm:card-title mb-2 sm:mb-4 font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:card-body leading-relaxed" style={{ color: 'var(--text-body)' }}>
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
          className="rounded-2xl p-5 sm:p-8 lg:p-12"
          style={{
            background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700, #0148C8) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex flex-col items-center text-center gap-5 sm:gap-8">
            <div className="max-w-4xl">
              <p
                className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2"
                style={{ color: 'var(--secondary-500)' }}
              >
                {locale === 'en' ? 'FIELD PROVEN' : '현장 실증 완료'}
              </p>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-black text-white mb-2 sm:mb-3">
                {locale === 'en'
                  ? '31-Month Real-World Pilot in Goseong, Gangwon'
                  : '강원 고성군 31개월 실증사업 완료'}
              </h3>
              <p className="text-sm sm:text-base text-white/65 leading-relaxed">
                {locale === 'en'
                  ? 'Verified durability, cost savings, and marine safety in a real fishing environment with SUHYUP.'
                  : '수협중앙회와 함께 실제 어업 현장에서 내구성, 비용절감, 해양 안전성을 직접 검증했습니다.'}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-5 sm:gap-10 lg:gap-16 w-full">
              {pilotStats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl sm:text-5xl font-black" style={{ color: 'var(--secondary-500)' }}>
                    {s.value}
                    <span className="text-lg sm:text-2xl font-semibold ml-1" style={{ color: 'var(--primary-300)' }}>
                      {s.unit}
                    </span>
                  </p>
                  <p className="text-xs sm:text-base text-white/65 mt-1 sm:mt-2 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
