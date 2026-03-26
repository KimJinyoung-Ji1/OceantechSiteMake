import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface SvhcHighlightProps {
  locale: Locale;
}

export default function SvhcHighlight({ locale }: SvhcHighlightProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-20 lg:py-28 px-4" aria-label="SVHC 235종 불검출">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-10 lg:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--secondary-900,#064e3b) 0%, var(--secondary-700,#047857) 100%)',
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
              className="text-8xl lg:text-9xl font-black"
              style={{ color: 'var(--secondary-300, #6ee7b7)' }}
            >
              {SITE_CONFIG.stats.svhc}
            </span>
            <span className="text-3xl font-bold text-white">
              {isEn ? 'types' : '종'}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            {isEn ? 'SVHC Substances Not Detected' : 'SVHC 유해물질 미검출'}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            {isEn
              ? 'Substances of Very High Concern (SVHC) are chemicals subject to regulation under EU REACH regulations. All 235 substances listed were not detected in Ocean Tech\'s zinc weights, proving complete eco-friendliness.'
              : 'SVHC(고위험 우려물질)는 EU REACH 규정에 따라 관리되는 화학물질입니다. 오션테크 아연추에서는 목록에 등재된 235종 전종이 미검출되어 완전한 친환경성이 입증되었습니다.'}
          </p>
        </div>
      </div>
    </section>
  );
}
