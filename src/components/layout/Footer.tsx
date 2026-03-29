import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = getTranslation(locale);
  const isEn = locale === 'en';

  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`;

  const companyLinks = [
    { label: isEn ? 'About Us' : '회사소개', href: '/about' },
    { label: isEn ? 'CEO Message' : 'CEO 인사말', href: '/about#ceo' },
    { label: isEn ? 'History' : '연혁', href: '/about#history' },
    { label: isEn ? 'Contact' : '문의하기', href: '/contact' },
  ];

  const techLinks = [
    { label: isEn ? 'Technology' : '기술력', href: '/technology' },
    { label: isEn ? 'Certifications' : '인증현황', href: '/certification' },
    { label: isEn ? 'Sustainability' : '친환경', href: '/sustainability' },
    { label: isEn ? 'Patents' : '특허현황', href: '/technology#patents' },
  ];

  const supportLinks = [
    { label: isEn ? 'Contact' : '문의하기', href: '/contact' },
    { label: isEn ? 'Certifications' : '인증현황', href: '/certification' },
    { label: isEn ? 'News' : '뉴스', href: '/about#news' },
  ];

  const infoItems = [
    { label: isEn ? 'CEO' : '대표', value: SITE_CONFIG.company.ceo },
    { label: isEn ? 'Biz No.' : '사업자', value: SITE_CONFIG.company.bizNo },
    { label: isEn ? 'Tel' : '전화', value: SITE_CONFIG.contact.tel, href: `tel:${SITE_CONFIG.contact.tel}` },
    { label: isEn ? 'Email' : '이메일', value: SITE_CONFIG.contact.email, href: `mailto:${SITE_CONFIG.contact.email}` },
  ];

  return (
    <footer
      className="text-white"
      style={{ background: 'linear-gradient(180deg, #0c1220 0%, #0f172a 100%)' }}
      aria-label="푸터"
    >
      <div className="section-container py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-5 lg:gap-8">

          {/* Column 1 — Company Info */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/images/logo-brand.png"
                alt="오션테크 로고"
                width={120}
                height={30}
                className="h-7 sm:h-8 w-auto object-contain brightness-0 invert"
                sizes="120px"
              />
            </div>

            {/* Info — compact inline on mobile */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {infoItems.map((item, i) => (
                <span key={i} className="text-[11px] sm:text-xs whitespace-nowrap">
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>{' '}
                  {item.href ? (
                    <a href={item.href} className="hover:text-[#5EEAD4] transition-colors">{item.value}</a>
                  ) : (
                    item.value
                  )}
                </span>
              ))}
            </div>

            {/* Address */}
            <p className="text-[11px] sm:text-xs mb-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {SITE_CONFIG.address.office}
            </p>

            {/* Cert badges — compact row */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: isEn ? 'Green Tech' : '녹색기술', num: SITE_CONFIG.certifications.greenTech.number },
                { label: isEn ? 'Green Product' : '녹색제품', num: SITE_CONFIG.certifications.greenProduct.number },
                { label: isEn ? 'Venture' : '벤처', num: SITE_CONFIG.certifications.venture.number },
              ].map((cert, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-xs px-2 py-1 rounded-md font-medium"
                  style={{ background: 'rgba(23,233,181,0.10)', border: '1px solid rgba(23,233,181,0.20)' }}
                >
                  <span style={{ color: '#17E9B5' }}>{cert.label}</span>{' '}
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>{cert.num}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Column 2 — Company links (desktop only) */}
          <div className="hidden sm:block">
            <h3
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {t.footer.links}
            </h3>
            <ul className="space-y-1.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-xs transition-colors hover:text-[#5EEAD4] inline-flex items-center py-1"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Technology links (desktop only) */}
          <div className="hidden sm:block">
            <h3
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {t.footer.technology}
            </h3>
            <ul className="space-y-1.5">
              {techLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-xs transition-colors hover:text-[#5EEAD4] inline-flex items-center py-1"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Support links (desktop only) */}
          <div className="hidden sm:block">
            <h3
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {isEn ? 'Support' : '고객지원'}
            </h3>
            <ul className="space-y-1.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-xs transition-colors hover:text-[#5EEAD4] inline-flex items-center py-1"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-4 sm:mt-6 pt-3 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-3 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link
              href={localePath('/privacy')}
              className="transition-colors hover:text-white"
            >
              {isEn ? 'Privacy' : '개인정보처리방침'}
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
            <span>{SITE_CONFIG.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
