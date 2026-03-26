import type { Locale } from '@/lib/i18n';

interface WhyZincSectionProps {
  locale: Locale;
}

export default function WhyZincSection({ locale }: WhyZincSectionProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-20 lg:py-28" aria-label="왜 아연인가">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p
              className="text-base font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--secondary-700,#047857)' }}
            >
              {isEn ? 'WHY ZINC?' : '왜 아연인가?'}
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
              style={{ color: 'var(--gray-900)' }}
            >
              {isEn ? 'Lead is Poisoning\nOur Ocean' : '납이 바다를\n오염시키고 있습니다'}
            </h2>
            <div className="space-y-4" style={{ color: 'var(--gray-600)' }}>
              <p className="text-lg leading-relaxed">
                {isEn
                  ? 'Lead weights used in fishing nets gradually dissolve in seawater, releasing toxic heavy metals that accumulate in marine organisms and eventually enter the human food chain.'
                  : '그물에 사용되는 납 어장추는 해수에서 서서히 용해되어 독성 중금속을 방출합니다. 이는 해양 생물에 축적되고, 결국 인간의 식탁까지 위협합니다.'}
              </p>
              <p className="text-lg leading-relaxed">
                {isEn
                  ? 'Lead is classified as a Group 2A carcinogen by the International Agency for Research on Cancer (IARC). Continued use of lead weights is now recognized globally as a serious marine pollution issue.'
                  : '납은 국제암연구소(IARC)가 지정한 2A군 발암물질입니다. 납추의 지속 사용은 이미 국제적으로 심각한 해양 오염 문제로 인식되고 있습니다.'}
              </p>
              <p className="text-lg leading-relaxed">
                {isEn
                  ? 'Ocean Tech\'s zinc weights are a completely eco-friendly alternative — zinc is an essential mineral naturally found in seawater with zero toxicity.'
                  : '오션테크의 아연추는 완전한 친환경 대안입니다. 아연은 해수 중에 자연적으로 존재하는 필수 미네랄로, 독성이 없습니다.'}
              </p>
            </div>
          </div>

          {/* Visual comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="p-6 rounded-2xl flex flex-col items-center text-center gap-3"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(239,68,68,0.12)' }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="14" cy="14" r="12" stroke="#EF4444" strokeWidth="2" />
                  <path d="M9 9l10 10M19 9L9 19" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-bold text-lg" style={{ color: '#DC2626' }}>
                {isEn ? 'Lead Weight' : '납추'}
              </p>
              <ul className="text-sm space-y-1.5 text-left w-full" style={{ color: 'var(--gray-600)' }}>
                <li>• {isEn ? 'Toxic heavy metal' : '독성 중금속'}</li>
                <li>• {isEn ? '1~2 yr lifespan' : '1~2년 수명'}</li>
                <li>• {isEn ? 'Frequent replacement' : '잦은 교체'}</li>
                <li>• {isEn ? 'IARC 2A carcinogen' : 'IARC 2A 발암물질'}</li>
              </ul>
            </div>

            <div
              className="p-6 rounded-2xl flex flex-col items-center text-center gap-3"
              style={{ background: 'rgba(23,233,181,0.08)', border: '1px solid rgba(23,233,181,0.3)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(23,233,181,0.15)' }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="14" cy="14" r="12" stroke="var(--secondary-500,#17e9b5)" strokeWidth="2" />
                  <path d="M8 14l4 4 8-8" stroke="var(--secondary-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-bold text-lg" style={{ color: 'var(--secondary-700,#047857)' }}>
                {isEn ? 'Zinc Weight' : '아연추'}
              </p>
              <ul className="text-sm space-y-1.5 text-left w-full" style={{ color: 'var(--gray-600)' }}>
                <li>• {isEn ? 'Zero toxicity' : '독성 없음'}</li>
                <li>• {isEn ? '10+ yr lifespan' : '10년 이상 수명'}</li>
                <li>• {isEn ? '80% cost savings' : '비용 80% 절감'}</li>
                <li>• {isEn ? 'SVHC 235 free' : 'SVHC 235종 미검출'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
