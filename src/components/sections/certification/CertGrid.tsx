'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import Modal from '@/components/ui/Modal';

interface CertGridProps {
  locale: Locale;
}

const certItems = [
  {
    key: 'greenTech',
    titleKo: '녹색기술인증서',
    titleEn: 'Green Technology Certificate',
    descKo: '환경부로부터 받은 녹색기술인증으로, 아연합금 기반 친환경 어장추 제조방법의 탄소중립 및 환경보호 기여를 공식 인정받았습니다.',
    descEn: 'Ministry of Environment green technology certification officially recognizing the carbon neutrality and environmental protection contribution of our zinc alloy-based eco-friendly fishing weight manufacturing method.',
    src: '/documents/certs/green-tech-cert.png',
    numberKo: SITE_CONFIG.certifications.greenTech.number,
    accentColor: 'var(--secondary-700,#047857)',
    bgColor: 'rgba(23,233,181,0.07)',
    borderColor: 'rgba(23,233,181,0.25)',
    labelColor: 'rgba(23,233,181,0.15)',
    labelText: 'var(--secondary-700,#047857)',
  },
  {
    key: 'greenProduct',
    titleKo: '녹색기술제품확인서',
    titleEn: 'Green Product Certificate',
    descKo: '한국환경산업기술원에서 발급한 녹색기술제품 확인서. 탄소중립기본법 제60조에 근거하여 제품의 친환경성이 공식 확인되었습니다.',
    descEn: 'Green product certificate issued by KEITI. Eco-friendliness officially confirmed based on Article 60 of the Framework Act on Carbon Neutrality.',
    src: '/documents/certs/green-product-cert.png',
    numberKo: SITE_CONFIG.certifications.greenProduct.number,
    accentColor: 'var(--secondary-700,#047857)',
    bgColor: 'rgba(23,233,181,0.07)',
    borderColor: 'rgba(23,233,181,0.25)',
    labelColor: 'rgba(23,233,181,0.15)',
    labelText: 'var(--secondary-700,#047857)',
  },
  {
    key: 'venture',
    titleKo: '벤처기업확인서',
    titleEn: 'Venture Company Certificate',
    descKo: '벤처기업확인기관으로부터 받은 공식 벤처기업 확인서. 기술 혁신성과 성장 가능성을 인정받아 각종 정책 지원 및 공공조달 혜택을 받을 수 있습니다.',
    descEn: 'Official venture company certificate from the authorized certification body. Recognized for technological innovation and growth potential, enabling access to policy support and public procurement benefits.',
    src: '/documents/certs/venture-cert.png',
    numberKo: SITE_CONFIG.certifications.venture.number,
    accentColor: 'var(--primary-500)',
    bgColor: 'rgba(1,104,239,0.05)',
    borderColor: 'rgba(1,104,239,0.18)',
    labelColor: 'rgba(1,104,239,0.1)',
    labelText: 'var(--primary-600)',
  },
  {
    key: 'patentAward',
    titleKo: '우수특허대상',
    titleEn: 'Excellence Patent Award',
    descKo: '한국일보 주관 제17회 대한민국 우수특허대상 수상. 친환경 어장추 관련 특허의 기술적 완성도와 사업 가치를 공식 인정받았습니다.',
    descEn: 'Winner of the 17th Korea Excellence Patent Award hosted by Hankook Ilbo. Officially recognized for the technical completeness and business value of eco-friendly fishing weight patents.',
    src: '/documents/certs/patent-award-2023.png',
    numberKo: SITE_CONFIG.certifications.patentAward.date,
    accentColor: '#D97706',
    bgColor: 'rgba(245,158,11,0.05)',
    borderColor: 'rgba(245,158,11,0.2)',
    labelColor: 'rgba(245,158,11,0.12)',
    labelText: '#B45309',
  },
  {
    key: 'researchDept',
    titleKo: '연구전담부서 인정서',
    titleEn: 'R&D Department Recognition',
    descKo: 'KOITA(한국산업기술진흥협회)로부터 공식 인정받은 기업부설연구소. 제품 품질 향상 및 신기술 개발을 위한 자체 R&D 역량을 공식 인정받았습니다.',
    descEn: 'Corporate R&D center officially recognized by KOITA. Certifies in-house R&D capabilities for product quality improvement and new technology development.',
    src: '/documents/certs/research-dept.png',
    numberKo: SITE_CONFIG.certifications.researchDept.number,
    accentColor: 'var(--primary-500)',
    bgColor: 'rgba(1,104,239,0.05)',
    borderColor: 'rgba(1,104,239,0.18)',
    labelColor: 'rgba(1,104,239,0.1)',
    labelText: 'var(--primary-600)',
  },
  {
    key: 'sme',
    titleKo: '중소기업확인서',
    titleEn: 'SME Certificate',
    descKo: '중소벤처기업부에서 발급한 중소기업 확인서. 중소기업 지원 정책 및 공공조달 참여 자격을 공식 인증하는 서류입니다.',
    descEn: 'SME certificate issued by the Ministry of SMEs and Startups. Official document certifying eligibility for SME support policies and public procurement participation.',
    src: '/documents/certs/sme-cert.png',
    numberKo: SITE_CONFIG.certifications.sme.number,
    accentColor: 'var(--gray-600)',
    bgColor: 'rgba(107,114,128,0.05)',
    borderColor: 'rgba(107,114,128,0.18)',
    labelColor: 'rgba(107,114,128,0.1)',
    labelText: 'var(--gray-600)',
  },
];

export default function CertGrid({ locale }: CertGridProps) {
  const isEn = locale === 'en';
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  return (
    <section className="py-16 lg:py-20" style={{ background: 'var(--background-alt)' }} aria-label="인증서 목록">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certItems.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'white',
                border: `1px solid ${item.borderColor}`,
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}
            >
              {/* Top: Cert image */}
              <button
                className="relative cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                  minHeight: '200px',
                  background: item.bgColor,
                  borderBottom: `1px solid ${item.borderColor}`,
                }}
                onClick={() => setModal({ src: item.src, title: isEn ? item.titleEn : item.titleKo })}
                aria-label={`${isEn ? item.titleEn : item.titleKo} 원본 보기`}
              >
                <Image
                  src={item.src}
                  alt={isEn ? item.titleEn : item.titleKo}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-medium"
                  style={{ background: 'rgba(0,0,0,0.45)', color: 'white' }}
                >
                  {isEn ? 'Click to enlarge' : '클릭하여 확대'}
                </div>
              </button>

              {/* Bottom: Description */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: item.labelColor, color: item.labelText }}
                  >
                    {isEn ? item.titleEn : item.titleKo}
                  </span>
                  <span className="text-xs font-mono" style={{ color: item.accentColor }}>
                    {item.numberKo}
                  </span>
                </div>
                <h3 className="card-title" style={{ color: 'var(--gray-900)' }}>
                  {isEn ? item.titleEn : item.titleKo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                  {isEn ? item.descEn : item.descKo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title}>
        {modal && (
          <div className="relative w-full" style={{ minHeight: '400px' }}>
            <Image
              src={modal.src}
              alt={modal.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 672px"
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
