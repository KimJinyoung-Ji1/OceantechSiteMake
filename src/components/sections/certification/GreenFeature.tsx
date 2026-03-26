import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface GreenFeatureProps {
  locale: Locale;
}

export default function GreenFeature({ locale }: GreenFeatureProps) {
  const isEn = locale === 'en';
  const cert = SITE_CONFIG.certifications;

  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'var(--background)' }}
      aria-label="녹색기술인증 강조"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div
          className="rounded-2xl p-8 lg:p-12 flex flex-col items-center text-center gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(2,16,151,0.06) 0%, rgba(23,233,181,0.08) 100%)',
            border: '2px solid rgba(23,233,181,0.3)',
          }}
        >
          {/* Green cert mark */}
          <div className="relative shrink-0 w-28 h-28">
            <Image
              src="/images/green-cert-mark.png"
              alt="녹색기술인증 마크"
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold"
              style={{ background: 'rgba(23,233,181,0.15)', color: 'var(--secondary-700,#047857)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--secondary-500)' }} />
              {isEn ? 'Green Technology Certification' : '녹색기술인증'}
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold"
              style={{ background: 'rgba(23,233,181,0.15)', color: 'var(--secondary-700,#047857)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--secondary-500)' }} />
              {isEn ? 'Green Product Verified' : '녹색기술제품 확인'}
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl font-black"
            style={{ color: 'var(--gray-900)' }}
          >
            {isEn
              ? 'Zinc alloy-based net weight manufacturing technology with reduced hazardous substance emissions'
              : '아연합금 기반으로 유해물질 배출을 절감시킨 그물추 제조 기술'}
          </h2>

          <p
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: 'var(--gray-600)' }}
          >
            {isEn
              ? '* Green Technology Certification is a government-issued certification (Ministry of Environment) recognizing technologies that contribute to carbon neutrality and environmental protection. Achieving this certification means that Ocean Tech\'s eco-friendly zinc fishing weight manufacturing technology has been officially verified to meet international green standards.'
              : '* 녹색기술인증이란 정부(환경부)가 탄소중립 및 환경보호에 기여하는 기술을 공식 인증하는 제도입니다. 이 인증 획득은 오션테크의 친환경 아연 어장추 제조기술이 국제적 녹색 기준에 부합함을 공식적으로 검증받은 것을 의미합니다.'}
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                {isEn ? 'Green Tech No.' : '녹색기술인증 번호'}
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--primary-600)' }}>
                {cert.greenTech.number}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                {isEn ? 'Green Product No.' : '녹색기술제품 번호'}
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--primary-600)' }}>
                {cert.greenProduct.number}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                {isEn ? 'Valid Period' : '유효기간'}
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--gray-700)' }}>
                {cert.greenTech.period}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
