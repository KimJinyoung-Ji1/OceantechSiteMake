import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import {
  Building2, User, FileText, Hash, Settings,
  Phone, Printer, Mail, Globe,
  Home, MapPin,
  Leaf, Rocket, Microscope, Award,
  Briefcase, PhoneCall, Map, ShieldCheck,
} from 'lucide-react';

interface OverviewSectionProps {
  locale: Locale;
}

interface InfoRow {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface InfoGroup {
  title: string;
  icon: React.ReactNode;
  rows: InfoRow[];
}

const S = 16; // row icon size
const H = 17; // header icon size

export default function OverviewSection({ locale }: OverviewSectionProps) {
  const isEn = locale === 'en';

  const groups: InfoGroup[] = [
    {
      title: isEn ? 'Basic Info' : '기본 정보',
      icon: <Briefcase size={H} />,
      rows: [
        { icon: <Building2 size={S} />, label: isEn ? 'Company' : '회사명', value: SITE_CONFIG.company.name },
        { icon: <User size={S} />, label: isEn ? 'CEO' : '대표이사', value: SITE_CONFIG.company.ceo },
        { icon: <FileText size={S} />, label: isEn ? 'Biz No.' : '사업자번호', value: SITE_CONFIG.company.bizNo },
        { icon: <Hash size={S} />, label: isEn ? 'Corp No.' : '법인번호', value: SITE_CONFIG.company.corpNo },
        { icon: <Settings size={S} />, label: isEn ? 'Business' : '사업분야', value: isEn ? 'Eco-Friendly Fishing Weights, R&D' : '친환경 어망추 제조 · 연구개발' },
      ],
    },
    {
      title: isEn ? 'Contact' : '연락처',
      icon: <PhoneCall size={H} />,
      rows: [
        { icon: <Phone size={S} />, label: isEn ? 'Tel' : '전화', value: SITE_CONFIG.contact.tel },
        { icon: <Printer size={S} />, label: isEn ? 'Fax' : '팩스', value: SITE_CONFIG.contact.fax },
        { icon: <Mail size={S} />, label: isEn ? 'Email' : '이메일', value: SITE_CONFIG.contact.email },
        { icon: <Globe size={S} />, label: isEn ? 'Website' : '도메인', value: 'oceantechinc.com' },
      ],
    },
    {
      title: isEn ? 'Location' : '소재지',
      icon: <Map size={H} />,
      rows: [
        { icon: <Home size={S} />, label: isEn ? 'Head Office' : '본사', value: SITE_CONFIG.address.main },
        { icon: <MapPin size={S} />, label: isEn ? 'Office' : '사무소', value: SITE_CONFIG.address.office },
      ],
    },
    {
      title: isEn ? 'Certifications' : '인증 현황',
      icon: <ShieldCheck size={H} />,
      rows: [
        { icon: <Leaf size={S} />, label: isEn ? 'Green Tech' : '녹색기술인증', value: `${SITE_CONFIG.certifications.greenTech.number} (${SITE_CONFIG.certifications.greenTech.period})` },
        { icon: <Rocket size={S} />, label: isEn ? 'Venture' : '벤처기업확인', value: `${SITE_CONFIG.certifications.venture.number} (${SITE_CONFIG.certifications.venture.period})` },
        { icon: <Microscope size={S} />, label: isEn ? 'R&D Center' : '기업부설연구소', value: `KOITA ${SITE_CONFIG.certifications.researchDept.number}` },
        { icon: <Award size={S} />, label: isEn ? 'Patent Award' : '우수특허대상', value: isEn ? '17th Korea Excellence Patent Award (2023)' : '제17회 대한민국 우수특허대상 (2023)' },
      ],
    },
  ];

  return (
    <section
      className="py-6 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, var(--background) 0%, #F0F5FF 100%)' }}
      aria-label="회사 개요"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
            {isEn ? 'Company Overview' : '회사 개요'}
          </p>
          <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
            {isEn ? 'Ocean Tech Inc.' : '(주)오션테크'}
          </h2>
          <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
            {isEn
              ? 'Leading innovation in eco-friendly fishing weights since day one.'
              : '친환경 어망추의 새로운 기준을 만들어갑니다.'}
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {groups.map((group, gi) => (
            <div
              key={gi}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
              }}
            >
              {/* Group Header — centered */}
              <div
                className="flex items-center justify-center gap-2 px-5 py-3"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-500) 0%, #0350C0 100%)',
                  color: 'white',
                }}
              >
                <span className="opacity-80">{group.icon}</span>
                <span className="text-base font-bold tracking-wide">{group.title}</span>
              </div>

              {/* Rows */}
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {group.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className="flex items-start gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 transition-colors duration-150 hover:bg-slate-50"
                  >
                    <span className="shrink-0 mt-0.5" style={{ color: 'var(--primary-500)' }}>{row.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                        {row.label}
                      </p>
                      <p className="text-sm md:text-base font-medium leading-snug break-words" style={{ color: 'var(--text-primary)' }}>
                        {row.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
