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

  return (
    <footer
      className="text-white"
      style={{ background: 'var(--gray-900)' }}
      aria-label="푸터"
    >
      <div className="w-full px-6 lg:px-12 max-w-[1440px] mx-auto py-14 lg:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1 — Company Info (2 cols) */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-5">
              <p
                className="text-2xl font-black"
                style={{ color: 'var(--primary-300)' }}
              >
                OCEANTECH
              </p>
              <p className="text-base mt-0.5" style={{ color: 'var(--gray-400)' }}>
                {SITE_CONFIG.company.name}
              </p>
            </div>
            <p
              className="text-base mb-5 leading-relaxed"
              style={{ color: 'var(--gray-400)' }}
            >
              {SITE_CONFIG.company.slogan}
            </p>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-400)' }}>
              <li>
                <span className="text-gray-500">{t.footer.ceo}:</span> {SITE_CONFIG.company.ceo}
              </li>
              <li>
                <span className="text-gray-500">{t.footer.bizNo}:</span> {SITE_CONFIG.company.bizNo}
              </li>
              <li>
                <span className="text-gray-500">{t.footer.tel}:</span>{' '}
                <a
                  href={`tel:${SITE_CONFIG.contact.tel}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.tel}
                </a>
              </li>
              <li>
                <span className="text-gray-500">{t.footer.email}:</span>{' '}
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li>
                <span className="text-gray-500">주소:</span>{' '}
                <span>{SITE_CONFIG.address.office}</span>
              </li>
            </ul>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-5" style={{ color: 'var(--gray-400)' }}>
              {t.footer.links}
            </h3>
            <ul className="space-y-3">
              {[
                { label: locale === 'en' ? 'About Us' : '회사소개', href: '/about' },
                { label: locale === 'en' ? 'CEO Message' : 'CEO 인사말', href: '/about#ceo' },
                { label: locale === 'en' ? 'History' : '연혁', href: '/about#history' },
                { label: locale === 'en' ? 'Contact' : '문의하기', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-base transition-colors hover:text-white"
                    style={{ color: 'var(--gray-400)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Technology */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-5" style={{ color: 'var(--gray-400)' }}>
              {t.footer.technology}
            </h3>
            <ul className="space-y-3">
              {[
                { label: locale === 'en' ? 'Technology' : '기술력', href: '/technology' },
                { label: locale === 'en' ? 'Certifications' : '인증현황', href: '/certification' },
                { label: locale === 'en' ? 'Sustainability' : '친환경', href: '/sustainability' },
                { label: locale === 'en' ? 'Patents' : '특허현황', href: '/technology#patents' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-base transition-colors hover:text-white"
                    style={{ color: 'var(--gray-400)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Certifications (separate column) */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-5" style={{ color: 'var(--gray-400)' }}>
              {locale === 'en' ? 'Certifications' : '인증현황'}
            </h3>
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(23, 233, 181, 0.1)', border: '1px solid rgba(23, 233, 181, 0.2)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: 'var(--secondary-500)' }} />
                <div>
                  <p className="text-xs" style={{ color: 'var(--gray-400)' }}>녹색기술인증</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--secondary-500)' }}>
                    {SITE_CONFIG.certifications.greenTech.number}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(23, 233, 181, 0.1)', border: '1px solid rgba(23, 233, 181, 0.2)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: 'var(--secondary-500)' }} />
                <div>
                  <p className="text-xs" style={{ color: 'var(--gray-400)' }}>녹색기술제품</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--secondary-500)' }}>
                    {SITE_CONFIG.certifications.greenProduct.number}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(1, 104, 239, 0.1)', border: '1px solid rgba(1, 104, 239, 0.2)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: 'var(--primary-500)' }} />
                <div>
                  <p className="text-xs" style={{ color: 'var(--gray-400)' }}>벤처기업</p>
                  <p className="text-xs font-semibold" style={{ color: 'var(--primary-300)' }}>
                    {SITE_CONFIG.certifications.venture.number}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
              {t.footer.copyright}
            </p>
            <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
              oceantechinc.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
