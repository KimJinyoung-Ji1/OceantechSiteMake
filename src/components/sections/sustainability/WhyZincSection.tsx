import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface WhyZincSectionProps {
  locale: Locale;
}

export default function WhyZincSection({ locale }: WhyZincSectionProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-16 lg:py-20" style={{ background: 'var(--background)' }} aria-label="왜 아연인가">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="section-eyebrow" style={{ color: 'var(--secondary-700,#047857)' }}>
              {isEn ? 'WHY ZINC?' : '왜 아연인가?'}
            </p>
            <h2
              className="section-title mb-6"
              style={{ color: 'var(--gray-900)' }}
            >
              {isEn ? 'Lead is Poisoning\nOur Ocean' : '납이 바다를\n오염시키고 있습니다'}
            </h2>
            <div className="space-y-5" style={{ color: 'var(--gray-600)', fontSize: '1.1rem', lineHeight: '2' }}>
              <p>
                {isEn
                  ? 'Lead weights used in fishing nets gradually dissolve in seawater, releasing toxic heavy metals that accumulate in marine organisms and eventually enter the human food chain.'
                  : '그물에 사용되는 납 어망추는 해수에서 서서히 용해되어 독성 중금속을 방출합니다. 이는 해양 생물에 축적되고, 결국 인간의 식탁까지 위협합니다.'}
              </p>
              <p>
                {isEn
                  ? 'Lead is classified as a Group 2A carcinogen by the International Agency for Research on Cancer (IARC). Continued use of lead weights is now recognized globally as a serious marine pollution issue.'
                  : '납은 국제암연구소(IARC)가 지정한 2A군 발암물질입니다. 납추의 지속 사용은 이미 국제적으로 심각한 해양 오염 문제로 인식되고 있습니다.'}
              </p>
              <p>
                {isEn
                  ? "Ocean Tech's zinc weights are a completely eco-friendly alternative — zinc is an essential mineral naturally found in seawater with zero toxicity."
                  : '오션테크의 아연추는 완전한 친환경 대안입니다. 아연은 해수 중에 자연적으로 존재하는 필수 미네랄로, 독성이 없습니다.'}
              </p>
            </div>
          </div>

          {/* Lead vs Zinc comparison — 1 row, separate cards with VS overlay */}
          <div className="relative grid grid-cols-2 gap-2 sm:gap-4 items-stretch">
            {/* VS badge — centered overlay */}
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10">
              <div
                className="w-9 h-9 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-black text-xs sm:text-lg"
                style={{ background: 'linear-gradient(135deg, #021097, #0168EF)', color: 'white', boxShadow: '0 4px 20px rgba(1,104,239,0.35)', border: '3px solid white' }}
              >
                VS
              </div>
            </div>

            {/* Lead */}
            <div
              className="rounded-xl sm:rounded-2xl overflow-hidden flex flex-col"
              style={{ border: '1px solid #e2e8f0', background: 'white', boxShadow: '0 2px 12px rgba(239,68,68,0.06)' }}
            >
              {/* Top accent */}
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #DC2626, #EF4444)' }} />
              <div
                className="relative w-full"
                style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #FEF2F2 0%, #FECACA40 100%)' }}
              >
                <Image
                  src="/images/products/lead-weight.png"
                  alt={isEn ? 'Lead fishing weight' : '기존 납추'}
                  fill
                  className="object-contain p-3 sm:p-6"
                  sizes="40vw"
                  unoptimized
                />
              </div>
              <div className="p-2.5 sm:p-6 flex-1 flex flex-col items-center justify-center">
                <h3 className="text-xs sm:text-xl font-bold mb-2 sm:mb-4" style={{ color: '#DC2626' }}>
                  {isEn ? 'Lead Weight' : '기존 납추'}
                </h3>
                <ul className="space-y-1.5 sm:space-y-3">
                  {[
                    isEn ? 'Toxic heavy metal' : '독성 중금속',
                    isEn ? 'Short lifespan (1–2 years)' : '짧은 수명 (1~2년)',
                    isEn ? 'Frequent replacement' : '잦은 교체',
                    isEn ? 'IARC 2A carcinogen' : 'IARC 2A 발암물질',
                  ].map((text) => (
                    <li key={text} className="flex items-center gap-1.5 sm:gap-3 text-[11px] sm:text-base" style={{ color: 'var(--text-body)' }}>
                      <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <circle cx="10" cy="10" r="9" fill="#FEE2E2" />
                        <path d="M7 10h6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Zinc */}
            <div
              className="rounded-xl sm:rounded-2xl overflow-hidden flex flex-col"
              style={{ border: '1px solid #e2e8f0', background: 'white', boxShadow: '0 2px 12px rgba(14,173,135,0.06)' }}
            >
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #0EAD87, #17E9B5)' }} />
              <div
                className="relative w-full"
                style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE540 100%)' }}
              >
                <Image
                  src="/images/products/zinc-weight.png"
                  alt={isEn ? 'OceanTech zinc fishing weight' : '오션테크 아연추'}
                  fill
                  className="object-contain p-3 sm:p-6"
                  sizes="40vw"
                />
              </div>
              <div className="p-2.5 sm:p-6 flex-1 flex flex-col items-center justify-center">
                <h3 className="text-xs sm:text-xl font-bold mb-2 sm:mb-4" style={{ color: 'var(--secondary-700)' }}>
                  {isEn ? 'OceanTech Zinc' : '오션테크 아연추'}
                </h3>
                <ul className="space-y-1.5 sm:space-y-3">
                  {[
                    isEn ? 'Zero toxicity' : '독성 없음',
                    isEn ? '10x longer lifespan' : '10년 이상 수명',
                    isEn ? '80% cost savings' : '비용 80% 절감',
                    isEn ? 'SVHC 235 non-detected' : 'SVHC 235종 미검출',
                  ].map((text) => (
                    <li key={text} className="flex items-center gap-1.5 sm:gap-3 text-[11px] sm:text-base" style={{ color: 'var(--text-body)' }}>
                      <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <circle cx="10" cy="10" r="9" fill="#D1FAE5" stroke="var(--secondary-700)" strokeWidth="1.5" />
                        <path d="M6 10l3 3 5-5" stroke="var(--secondary-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
