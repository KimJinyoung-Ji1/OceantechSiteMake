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

  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`;

  const companyLinks = [
    { label: locale === 'en' ? 'About Us' : '회사소개', href: '/about' },
    { label: locale === 'en' ? 'CEO Message' : 'CEO 인사말', href: '/about#ceo' },
    { label: locale === 'en' ? 'History' : '연혁', href: '/about#history' },
    { label: locale === 'en' ? 'Contact' : '문의하기', href: '/contact' },
  ];

  const techLinks = [
    { label: locale === 'en' ? 'Technology' : '기술력', href: '/technology' },
    { label: locale === 'en' ? 'Certifications' : '인증현황', href: '/certification' },
    { label: locale === 'en' ? 'Sustainability' : '친환경', href: '/sustainability' },
    { label: locale === 'en' ? 'Patents' : '특허현황', href: '/technology#patents' },
  ];

  const supportLinks = [
    { label: locale === 'en' ? 'Contact' : '문의하기', href: '/contact' },
    { label: locale === 'en' ? 'Certifications' : '인증현황', href: '/certification' },
    { label: locale === 'en' ? 'News' : '뉴스', href: '/about#news' },
  ];

  return (
    <footer
      className="text-white"
      style={{ background: '#0F172A' }}
      aria-label="푸터"
    >
      <div className="mx-auto w-full max-w-[1920px] px-8 lg:px-24 py-8 lg:py-10">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-6 lg:gap-8">

          {/* Column 1 — Company Info */}
          <div>
            {/* Logo image */}
            <div className="mb-3">
              <Image
                src="/images/logo-brand.png"
                alt="오션테크 로고"
                width={160}
                height={40}
                className="h-10 w-auto object-contain brightness-0 invert"
                sizes="160px"
              />
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {SITE_CONFIG.company.name}
              </p>
            </div>

            {/* Slogan */}
            <p className="text-sm mb-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {SITE_CONFIG.company.slogan}
            </p>

            {/* Company details */}
            <ul className="space-y-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <li className="flex gap-2 text-sm">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.footer.ceo}:</span>
                <span>{SITE_CONFIG.company.ceo}</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.footer.bizNo}:</span>
                <span>{SITE_CONFIG.company.bizNo}</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.footer.tel}:</span>
                <a
                  href={`tel:${SITE_CONFIG.contact.tel}`}
                  className="transition-colors hover:text-[#03E9F8]"
                >
                  {SITE_CONFIG.contact.tel}
                </a>
              </li>
              <li className="flex gap-2 text-sm">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.footer.email}:</span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="transition-colors hover:text-[#03E9F8]"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex gap-2 text-sm">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {locale === 'en' ? 'Address:' : '주소:'}
                </span>
                <span className="leading-relaxed">{SITE_CONFIG.address.office}</span>
              </li>
            </ul>


            {/* Cert badges — horizontal row, tightly grouped */}
            <div className="mt-3 flex flex-row flex-wrap gap-2">
              <div
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2"
                style={{
                  background: 'rgba(23,233,181,0.08)',
                  border: '1px solid rgba(23,233,181,0.2)',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: '#03E9F8' }} />
                <div>
                  <p className="text-[10px] leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {locale === 'en' ? 'Green Tech' : '녹색기술인증'}
                  </p>
                  <p className="text-[10px] font-semibold leading-tight" style={{ color: '#03E9F8' }}>
                    {SITE_CONFIG.certifications.greenTech.number}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2"
                style={{
                  background: 'rgba(23,233,181,0.07)',
                  border: '1px solid rgba(23,233,181,0.16)',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: '#03E9F8' }} />
                <div>
                  <p className="text-[10px] leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {locale === 'en' ? 'Green Product' : '녹색기술제품'}
                  </p>
                  <p className="text-[10px] font-semibold leading-tight" style={{ color: '#03E9F8' }}>
                    {SITE_CONFIG.certifications.greenProduct.number}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2"
                style={{
                  background: 'rgba(2,16,151,0.08)',
                  border: '1px solid rgba(2,16,151,0.2)',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: '#17E9B5' }} />
                <div>
                  <p className="text-[10px] leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {locale === 'en' ? 'Venture' : '벤처기업'}
                  </p>
                  <p className="text-[10px] font-semibold leading-tight" style={{ color: '#17E9B5' }}>
                    {SITE_CONFIG.certifications.venture.number}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 — Company links */}
          <div>
            <h3
              className="text-xs font-black uppercase tracking-[0.22em] mb-3"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {t.footer.links}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-sm transition-colors hover:text-[#03E9F8] min-h-[44px] inline-flex items-center"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Technology links */}
          <div>
            <h3
              className="text-xs font-black uppercase tracking-[0.22em] mb-3"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {t.footer.technology}
            </h3>
            <ul className="space-y-2">
              {techLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-sm transition-colors hover:text-[#03E9F8] min-h-[44px] inline-flex items-center"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Support links */}
          <div>
            <h3
              className="text-xs font-black uppercase tracking-[0.22em] mb-3"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {locale === 'en' ? 'Support' : '고객지원'}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-sm transition-colors hover:text-[#03E9F8] min-h-[44px] inline-flex items-center"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
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
          className="mt-6 pt-5 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-5 text-base" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <Link
                href={localePath('/privacy')}
                className="transition-colors hover:text-white min-h-[44px] inline-flex items-center"
              >
                {locale === 'en' ? 'Privacy Policy' : '개인정보처리방침'}
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
              <span>{SITE_CONFIG.domain}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
