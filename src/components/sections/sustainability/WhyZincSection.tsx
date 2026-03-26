import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface WhyZincSectionProps {
  locale: Locale;
}

export default function WhyZincSection({ locale }: WhyZincSectionProps) {
  const isEn = locale === 'en';

  return (
    <section className="py-16 lg:py-20" style={{ background: 'var(--background)' }} aria-label="왜 아연인가">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
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
            <div className="space-y-4" style={{ color: 'var(--gray-600)' }}>
              <p className="section-subtitle">
                {isEn
                  ? 'Lead weights used in fishing nets gradually dissolve in seawater, releasing toxic heavy metals that accumulate in marine organisms and eventually enter the human food chain.'
                  : '그물에 사용되는 납 어망추는 해수에서 서서히 용해되어 독성 중금속을 방출합니다. 이는 해양 생물에 축적되고, 결국 인간의 식탁까지 위협합니다.'}
              </p>
              <p className="section-subtitle">
                {isEn
                  ? 'Lead is classified as a Group 2A carcinogen by the International Agency for Research on Cancer (IARC). Continued use of lead weights is now recognized globally as a serious marine pollution issue.'
                  : '납은 국제암연구소(IARC)가 지정한 2A군 발암물질입니다. 납추의 지속 사용은 이미 국제적으로 심각한 해양 오염 문제로 인식되고 있습니다.'}
              </p>
              <p className="section-subtitle">
                {isEn
                  ? "Ocean Tech's zinc weights are a completely eco-friendly alternative — zinc is an essential mineral naturally found in seawater with zero toxicity."
                  : '오션테크의 아연추는 완전한 친환경 대안입니다. 아연은 해수 중에 자연적으로 존재하는 필수 미네랄로, 독성이 없습니다.'}
              </p>
            </div>
          </div>

          {/* Product photo comparison */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {/* Lead weight */}
            <div
              className="rounded-2xl overflow-hidden flex flex-col flex-1"
              style={{
                border: '2px solid rgba(239,68,68,0.5)',
                background: 'rgba(239,68,68,0.04)',
                boxShadow: '0 4px 20px rgba(239,68,68,0.12)',
              }}
            >
              <div className="relative w-full" style={{ aspectRatio: '1/1', background: '#FEF2F2' }}>
                <Image
                  src="/images/products/lead-weight.png"
                  alt={isEn ? 'Lead fishing weight' : '납추'}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 45vw, 300px"
                  style={{ objectFit: 'contain' }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.12)' }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle cx="24" cy="24" r="20" fill="rgba(239,68,68,0.85)" />
                    <path d="M15 15l18 18M33 15L15 33" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <p className="font-bold text-xl mb-3" style={{ color: '#DC2626' }}>
                  {isEn ? 'Lead Weight' : '납추'}
                </p>
                <ul className="text-base space-y-2" style={{ color: 'var(--gray-600)' }}>
                  <li>• {isEn ? 'Toxic heavy metal' : '독성 중금속'}</li>
                  <li>• {isEn ? '1~2 yr lifespan' : '1~2년 수명'}</li>
                  <li>• {isEn ? 'Frequent replacement' : '잦은 교체'}</li>
                  <li>• {isEn ? 'IARC 2A carcinogen' : 'IARC 2A 발암물질'}</li>
                </ul>
              </div>
            </div>

            {/* VS divider */}
            <div className="flex sm:flex-col items-center justify-center px-2 py-4 sm:py-0 gap-2">
              <div className="flex-1 sm:w-px sm:flex-initial sm:h-full" style={{ background: 'var(--gray-200)', height: '1px', width: '100%' }} />
              <span
                className="text-xl font-black px-3 py-1.5 rounded-full shrink-0"
                style={{ background: 'var(--gray-100)', color: 'var(--gray-500)', border: '1px solid var(--gray-200)' }}
              >
                VS
              </span>
              <div className="flex-1 sm:w-px sm:flex-initial sm:h-full" style={{ background: 'var(--gray-200)', height: '1px', width: '100%' }} />
            </div>

            {/* Zinc weight */}
            <div
              className="rounded-2xl overflow-hidden flex flex-col flex-1"
              style={{
                border: '2px solid rgba(23,233,181,0.55)',
                background: 'rgba(23,233,181,0.05)',
                boxShadow: '0 4px 20px rgba(23,233,181,0.15)',
              }}
            >
              <div className="relative w-full" style={{ aspectRatio: '1/1', background: '#E8F5F1' }}>
                <Image
                  src="/images/products/zinc-weight.png"
                  alt={isEn ? 'Zinc fishing weight' : '아연추'}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 45vw, 300px"
                  style={{ objectFit: 'contain' }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(23,233,181,0.10)' }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle cx="24" cy="24" r="20" fill="rgba(23,233,181,0.9)" />
                    <path d="M13 24l7.5 7.5 14.5-15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <p className="font-bold text-xl mb-3" style={{ color: 'var(--secondary-700,#047857)' }}>
                  {isEn ? 'Zinc Weight' : '아연추'}
                </p>
                <ul className="text-base space-y-2" style={{ color: 'var(--gray-600)' }}>
                  <li>• {isEn ? 'Zero toxicity' : '독성 없음'}</li>
                  <li>• {isEn ? '10+ yr lifespan' : '10년 이상 수명'}</li>
                  <li>• {isEn ? '80% cost savings' : '비용 80% 절감'}</li>
                  <li>• {isEn ? 'SVHC 235 free' : 'SVHC 235종 미검출'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
