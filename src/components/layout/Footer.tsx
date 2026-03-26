import Link from 'next/link';
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
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-10 py-16 lg:py-20">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">

          {/* Column 1 — Company Info */}
          <div>
            {/* Logo + name */}
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: 'rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.07)' }}
              >
                <span className="text-[11px] font-black tracking-[0.2em] text-white">OT</span>
              </div>
              <div>
                <p className="text-xl font-black tracking-[0.1em]" style={{ color: '#7AEDC8' }}>
                  OCEANTECH
                </p>
                <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {SITE_CONFIG.company.name}
                </p>
              </div>
            </div>

            {/* Slogan */}
            <p className="text-base mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {SITE_CONFIG.company.slogan}
            </p>

            {/* Company details */}
            <ul className="space-y-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <li className="flex gap-2 text-base">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.footer.ceo}:</span>
                <span>{SITE_CONFIG.company.ceo}</span>
              </li>
              <li className="flex gap-2 text-base">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.footer.bizNo}:</span>
                <span>{SITE_CONFIG.company.bizNo}</span>
              </li>
              <li className="flex gap-2 text-base">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.footer.tel}:</span>
                <a
                  href={`tel:${SITE_CONFIG.contact.tel}`}
                  className="transition-colors hover:text-[#34D9B5]"
                >
                  {SITE_CONFIG.contact.tel}
                </a>
              </li>
              <li className="flex gap-2 text-base">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.footer.email}:</span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="transition-colors hover:text-[#34D9B5]"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex gap-2 text-base">
                <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {locale === 'en' ? 'Address:' : '주소:'}
                </span>
                <span className="leading-relaxed">{SITE_CONFIG.address.office}</span>
              </li>
            </ul>

            {/* Green cert badge */}
            <div
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2.5"
              style={{
                background: 'rgba(23,233,181,0.08)',
                border: '1px solid rgba(23,233,181,0.2)',
              }}
            >
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: '#34D9B5' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: '#34D9B5' }}>
                  {locale === 'en' ? 'Green Technology Certified' : '녹색기술인증'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {SITE_CONFIG.certifications.greenTech.number}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 — Company links */}
          <div>
            <h3
              className="text-sm font-black uppercase tracking-[0.22em] mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {t.footer.links}
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-base transition-colors hover:text-[#34D9B5]"
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
              className="text-sm font-black uppercase tracking-[0.22em] mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {t.footer.technology}
            </h3>
            <ul className="space-y-4">
              {techLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-base transition-colors hover:text-[#34D9B5]"
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
              className="text-sm font-black uppercase tracking-[0.22em] mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {locale === 'en' ? 'Support' : '고객지원'}
            </h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-base transition-colors hover:text-[#34D9B5]"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Additional cert badges */}
            <div className="mt-8 space-y-3">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{
                  background: 'rgba(23,233,181,0.07)',
                  border: '1px solid rgba(23,233,181,0.16)',
                }}
              >
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: '#34D9B5' }} />
                <div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {locale === 'en' ? 'Green Product' : '녹색기술제품'}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#34D9B5' }}>
                    {SITE_CONFIG.certifications.greenProduct.number}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{
                  background: 'rgba(12,114,135,0.08)',
                  border: '1px solid rgba(12,114,135,0.2)',
                }}
              >
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: '#7AEDC8' }} />
                <div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {locale === 'en' ? 'Venture Company' : '벤처기업'}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#7AEDC8' }}>
                    {SITE_CONFIG.certifications.venture.number}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-5 text-base" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <Link
                href={localePath('/privacy')}
                className="transition-colors hover:text-white"
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
