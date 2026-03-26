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
      className="py-12"
      aria-label="녹색기술인증 강조"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-10">
        <div
          className="rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8"
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

          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-wrap gap-2 mb-3 justify-center lg:justify-start">
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
              className="text-3xl lg:text-4xl font-extrabold mb-2 text-center lg:text-left"
              style={{ color: 'var(--gray-900)' }}
            >
              {isEn
                ? 'Zinc alloy-based net weight manufacturing technology with reduced hazardous substance emissions'
                : '아연합금 기반으로 유해물질 배출을 절감시킨 그물추 제조 기술'}
            </h2>

            <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
              <div>
                <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                  {isEn ? 'Green Tech No.' : '녹색기술인증 번호'}
                </p>
                <p className="text-lg font-bold" style={{ color: 'var(--primary-600)' }}>
                  {cert.greenTech.number}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                  {isEn ? 'Green Product No.' : '녹색기술제품 번호'}
                </p>
                <p className="text-lg font-bold" style={{ color: 'var(--primary-600)' }}>
                  {cert.greenProduct.number}
                </p>
              </div>
              <div>
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
      </div>
    </section>
  );
}
