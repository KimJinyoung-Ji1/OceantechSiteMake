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
  ];

  return (
    <section
      className="py-20 lg:py-28 px-6 lg:px-12 text-center"
      style={{ background: 'var(--background)' }}
      aria-label="회사 개요"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p
            className="text-base font-bold uppercase tracking-widest mb-3"
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
          className="rounded-3xl overflow-hidden shadow-sm mx-auto"
          style={{ border: '1px solid var(--border)' }}
        >
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[160px_1fr] sm:grid-cols-[200px_1fr] border-t first:border-t-0"
              style={{
                borderColor: 'var(--border)',
                background: i % 2 === 0 ? 'white' : 'var(--background-alt)',
              }}
            >
              <div
                className="px-6 py-4 text-base font-semibold text-left"
                style={{
                  color: 'var(--text-secondary)',
                  background: i % 2 === 0 ? 'var(--background-alt)' : '#E8F0FA',
                }}
              >
                {row.label}
              </div>
              <div className="px-6 py-4 text-base text-left" style={{ color: 'var(--text-body)' }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
