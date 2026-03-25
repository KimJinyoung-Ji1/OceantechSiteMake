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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 — Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <p
                className="text-xl font-bold"
                style={{ color: 'var(--primary-300)' }}
              >
                OCEANTECH
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--gray-400)' }}>
                {SITE_CONFIG.company.name}
              </p>
            </div>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: 'var(--gray-400)' }}
            >
              {SITE_CONFIG.company.slogan}
            </p>
            <ul className="space-y-1 text-sm" style={{ color: 'var(--gray-400)' }}>
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
            </ul>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--gray-400)' }}>
              {t.footer.links}
            </h3>
            <ul className="space-y-2">
              {[
                { label: locale === 'en' ? 'About Us' : '회사소개', href: '/about' },
                { label: locale === 'en' ? 'CEO Message' : 'CEO 인사말', href: '/about#ceo' },
                { label: locale === 'en' ? 'History' : '연혁', href: '/about#history' },
                { label: locale === 'en' ? 'Contact' : '문의하기', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-sm transition-colors"
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
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--gray-400)' }}>
              {t.footer.technology}
            </h3>
            <ul className="space-y-2">
              {[
                { label: locale === 'en' ? 'Technology' : '기술력', href: '/technology' },
                { label: locale === 'en' ? 'Certifications' : '인증현황', href: '/certification' },
                { label: locale === 'en' ? 'Sustainability' : '친환경', href: '/sustainability' },
                { label: locale === 'en' ? 'Patents' : '특허현황', href: '/technology#patents' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--gray-400)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Certifications */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--gray-400)' }}>
              {t.footer.support}
            </h3>
            <div className="space-y-3">
              {/* Green Tech Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(23, 233, 181, 0.1)', border: '1px solid rgba(23, 233, 181, 0.2)' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--secondary-500)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--secondary-500)' }}>
                  녹색기술인증 {SITE_CONFIG.certifications.greenTech.number}
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(23, 233, 181, 0.1)', border: '1px solid rgba(23, 233, 181, 0.2)' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--secondary-500)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--secondary-500)' }}>
                  벤처기업 {SITE_CONFIG.certifications.venture.number}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'var(--gray-600)' }}>
              {t.footer.copyright}
            </p>
            <p className="text-xs" style={{ color: 'var(--gray-600)' }}>
              {SITE_CONFIG.address.main}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
