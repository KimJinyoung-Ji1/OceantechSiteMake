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
    { label: isEn ? 'Address (main)' : '본사주소', value: SITE_CONFIG.address.main },
    { label: isEn ? 'Address (office)' : '사무소', value: SITE_CONFIG.address.office },
    { label: isEn ? 'Business' : '사업분야', value: isEn ? 'Eco-Friendly Fishing Weights, R&D' : '친환경 어장추 제조 · 연구개발' },
  ];

  return (
    <section
      className="py-20 lg:py-28 px-4"
      style={{ background: 'var(--gray-50, #f9fafb)' }}
      aria-label="회사 개요"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-500)' }}
          >
            {isEn ? 'Company Overview' : '회사 개요'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: 'var(--gray-900)' }}>
            {isEn ? '(주)오션테크 / Ocean Tech Inc.' : '(주)오션테크'}
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden shadow-sm"
          style={{ border: '1px solid var(--gray-200, #e5e7eb)' }}
        >
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] border-t first:border-t-0"
              style={{ borderColor: 'var(--gray-200, #e5e7eb)', background: i % 2 === 0 ? 'white' : 'var(--gray-50, #f9fafb)' }}
            >
              <div
                className="px-5 py-4 text-sm font-semibold"
                style={{ color: 'var(--gray-500)', background: i % 2 === 0 ? 'var(--gray-50)' : 'var(--gray-100)' }}
              >
                {row.label}
              </div>
              <div className="px-5 py-4 text-sm" style={{ color: 'var(--gray-700)' }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
