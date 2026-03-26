'use client';

import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface SvhcSectionProps {
  locale: Locale;
}

export default function SvhcSection({ locale }: SvhcSectionProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-16 lg:py-20" aria-label="SVHC 235종 불검출">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div
          className="rounded-2xl p-10 lg:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--primary-900,#021097) 0%, var(--primary-700,#0148C8) 50%, var(--primary-500,#0168EF) 100%)',
          }}
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            EU REACH Regulation · {isEn ? 'Officially Verified' : '공식 검증'}
          </p>
          <div className="flex items-baseline justify-center gap-3 mb-3">
            <span
              className="text-6xl sm:text-8xl lg:text-9xl font-black"
              style={{ color: 'var(--secondary-400, #34d399)' }}
            >
              {SITE_CONFIG.stats.svhc}
            </span>
            <span className="text-xl sm:text-3xl font-bold text-white">
              {isEn ? 'types' : '종'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-4">
            {isEn ? 'SVHC Substances Not Detected' : 'SVHC 유해물질 미검출'}
          </h2>
          <p className="text-white/70 max-w-4xl mx-auto text-lg leading-relaxed">
            {isEn
              ? 'Substances of Very High Concern (SVHC) are chemicals subject to regulation under EU REACH regulations. All 235 substances listed were not detected in Ocean Tech\'s zinc weights, proving complete eco-friendliness.'
              : 'SVHC(고위험 우려물질)는 EU REACH 규정에 따라 관리되는 화학물질입니다. 오션테크 아연추에서는 목록에 등재된 235종 전종이 미검출되어 완전한 친환경성이 입증되었습니다.'}
          </p>
          <p
            className="text-sm leading-relaxed mt-2 max-w-3xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {isEn
              ? '* SVHC testing means that an accredited laboratory systematically checks whether a product contains any of the 235 hazardous substances listed by the EU — such as carcinogens, mutagens, and reproductive toxins. Passing this test is the highest international standard of chemical safety, and it directly assures fishers, consumers, and regulators that Ocean Tech\'s zinc weights pose zero chemical risk to people or the marine ecosystem.'
              : '* SVHC 시험이란 EU가 지정한 발암물질·변이원·생식독성물질 등 235종의 고위험 화학물질이 제품에 포함되어 있는지를 공인기관이 체계적으로 검사하는 것입니다. 이 시험을 통과한다는 것은 국제 최고 수준의 화학 안전성을 확보했다는 의미로, 어민·소비자·규제기관 모두에게 오션테크 아연추가 인체와 해양 생태계에 화학적 위험이 전혀 없음을 공식적으로 보증합니다.'}
          </p>
        </div>
      </div>
    </section>
  );
}
