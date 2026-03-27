import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface WhyZincSectionProps {
  locale: Locale;
}

export default function WhyZincSection({ locale }: WhyZincSectionProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-16 lg:py-20" style={{ background: 'var(--background)' }} aria-label="왜 아연인가">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
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

          {/* Lead vs Zinc comparison — same as products page */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-stretch">
            {/* Lead */}
            <div
              className="rounded-2xl lg:rounded-r-none overflow-hidden flex flex-col"
              style={{
                border: '2px solid rgba(239,68,68,0.25)',
                background: 'white',
                boxShadow: '0 8px 32px rgba(239,68,68,0.08)',
              }}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #FEF2F2 0%, #FECACA40 100%)' }}
              >
                <Image
                  src="/images/products/lead-weight.png"
                  alt={isEn ? 'Lead fishing weight' : '기존 납추'}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className="text-sm font-bold px-4 py-1.5 rounded-full" style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}>
                    {isEn ? 'CONVENTIONAL' : '기존 납추'}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col items-center justify-center" style={{ background: 'rgba(239,68,68,0.03)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#DC2626' }}>
                  {isEn ? 'Conventional Lead' : '기존 납추'}
                </h3>
                <ul className="space-y-3 inline-block">
                  {[
                    isEn ? 'Toxic heavy metal' : '독성 중금속',
                    isEn ? 'Short lifespan (1–2 years)' : '짧은 수명 (1~2년)',
                    isEn ? 'Frequent replacement' : '잦은 교체',
                    isEn ? 'IARC 2A carcinogen' : 'IARC 2A 발암물질',
                  ].map((text) => (
                    <li key={text} className="flex items-center gap-3 text-base" style={{ color: 'var(--text-body)' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
                        <circle cx="10" cy="10" r="9" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
                        <path d="M7 10h6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* VS */}
            <div className="hidden lg:flex flex-col items-center justify-center px-2" style={{ zIndex: 10 }}>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg"
                style={{ background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))', color: 'white', boxShadow: '0 4px 20px rgba(1,104,239,0.35)' }}
              >
                VS
              </div>
            </div>
            <div className="flex lg:hidden items-center justify-center py-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-base" style={{ background: 'var(--primary-500)', color: 'white' }}>
                VS
              </div>
            </div>

            {/* Zinc */}
            <div
              className="rounded-2xl lg:rounded-l-none overflow-hidden flex flex-col"
              style={{
                border: '2px solid rgba(23,233,181,0.4)',
                background: 'white',
                boxShadow: '0 8px 32px rgba(23,233,181,0.10)',
              }}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE540 100%)' }}
              >
                <Image
                  src="/images/products/zinc-weight.png"
                  alt={isEn ? 'OceanTech zinc fishing weight' : '오션테크 아연추'}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-sm font-bold px-4 py-1.5 rounded-full" style={{ background: 'rgba(14,173,135,0.9)', color: 'white' }}>
                    {isEn ? 'OCEANTECH' : '오션테크 아연추'}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col items-center justify-center" style={{ background: 'rgba(23,233,181,0.03)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--secondary-700)' }}>
                  {isEn ? 'OceanTech Zinc' : '오션테크 아연추'}
                </h3>
                <ul className="space-y-3 inline-block">
                  {[
                    isEn ? 'Zero toxicity' : '독성 없음',
                    isEn ? '10x longer lifespan' : '10년 이상 수명',
                    isEn ? '80% cost savings' : '비용 80% 절감',
                    isEn ? 'SVHC 235 non-detected' : 'SVHC 235종 미검출',
                  ].map((text) => (
                    <li key={text} className="flex items-center gap-3 text-base" style={{ color: 'var(--text-body)' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
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
