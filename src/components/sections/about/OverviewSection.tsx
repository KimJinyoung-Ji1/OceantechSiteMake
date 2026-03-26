import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

interface OverviewSectionProps {
  locale: Locale;
}

export default function OverviewSection({ locale }: OverviewSectionProps) {
  const isEn = locale === 'en';

  const rows = [
    { label: isEn ? 'Company' : '회사명', value: SITE_CONFIG.company.name },
    { label: isEn ? 'CEO' : '대표이사', value: SITE_CONFIG.company.ceo },
    { label: isEn ? 'Biz No.' : '사업자번호', value: SITE_CONFIG.company.bizNo },
    { label: isEn ? 'Corp No.' : '법인번호', value: SITE_CONFIG.company.corpNo },
    { label: isEn ? 'Tel' : '전화', value: SITE_CONFIG.contact.tel },
    { label: isEn ? 'Fax' : '팩스', value: SITE_CONFIG.contact.fax },
    { label: isEn ? 'Email' : '이메일', value: SITE_CONFIG.contact.email },
    { label: isEn ? 'Address (office)' : '사무소주소', value: SITE_CONFIG.address.office },
    { label: isEn ? 'Address (main)' : '본사주소', value: SITE_CONFIG.address.main },
    { label: isEn ? 'Business' : '사업분야', value: isEn ? 'Eco-Friendly Fishing Weights, R&D' : '친환경 어장추 제조 · 연구개발' },
    { label: isEn ? 'Website' : '도메인', value: 'oceantechinc.com' },
    { label: isEn ? 'Green Tech Cert.' : '녹색기술인증', value: `${SITE_CONFIG.certifications.greenTech.number} (${SITE_CONFIG.certifications.greenTech.period})` },
    { label: isEn ? 'Venture Cert.' : '벤처기업확인', value: `${SITE_CONFIG.certifications.venture.number} (${SITE_CONFIG.certifications.venture.period})` },
    { label: isEn ? 'R&D Dept.' : '기업부설연구소', value: `KOITA ${SITE_CONFIG.certifications.researchDept.number}` },
    { label: isEn ? 'Patent Award' : '우수특허대상', value: isEn ? '17th Korea Excellence Patent Award (2023)' : '제17회 대한민국 우수특허대상 (2023)' },
  ];

  return (
    <section
      className="py-16 lg:py-20 px-6 lg:px-24 text-center"
      style={{ background: 'var(--background)' }}
      aria-label="회사 개요"
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-12">
          <p
            className="text-lg font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'Company Overview' : '회사 개요'}
          </p>
          <h2
            className="text-4xl lg:text-5xl font-black"
            style={{ color: 'var(--text-primary)' }}
          >
            {isEn ? '(주)오션테크 / Ocean Tech Inc.' : '(주)오션테크'}
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden shadow-sm"
          style={{ border: '1px solid var(--border)', maxWidth: '860px', margin: '0 auto' }}
        >
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid border-t first:border-t-0"
              style={{
                gridTemplateColumns: '180px 1fr',
                borderColor: 'var(--border)',
                background: i % 2 === 0 ? 'white' : 'var(--background-alt)',
              }}
            >
              <div
                className="px-5 py-3 text-base font-semibold text-center"
                style={{
                  color: 'var(--text-secondary)',
                  background: i % 2 === 0 ? 'var(--background-alt)' : '#E8F0FA',
                  borderRight: '1px solid var(--border)',
                }}
              >
                {row.label}
              </div>
              <div className="px-5 py-3 text-base text-left" style={{ color: 'var(--text-body)' }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
