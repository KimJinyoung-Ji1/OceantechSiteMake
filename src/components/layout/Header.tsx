'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/constants';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import MobileDrawer from './MobileDrawer';

interface HeaderProps {
  locale: Locale;
}

type NavItemWithChildren = (typeof NAV_ITEMS)[number] & {
  children?: ReadonlyArray<{ label: string; labelEn: string; href: string }>;
  badge?: boolean;
};

export default function Header({ locale }: HeaderProps) {
  const t = getTranslation(locale);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const label = (item: { label: string; labelEn: string }) =>
    locale === 'en' ? item.labelEn : item.label;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href={localePath('/')} className="flex items-center gap-2 shrink-0">
              <span
                className="text-xl font-bold"
                style={{ color: scrolled ? 'var(--primary-700)' : '#fff' }}
              >
                OCEANTECH
              </span>
              <span
                className="hidden sm:block text-xs font-medium opacity-70"
                style={{ color: scrolled ? 'var(--gray-600)' : '#fff' }}
              >
                (주)오션테크
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="주 메뉴">
              {(NAV_ITEMS as readonly NavItemWithChildren[]).map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenMenu(item.href)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    href={localePath(item.href)}
                    className={`relative flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      scrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {label(item)}
                    {item.badge && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--secondary-500)' }}
                        aria-label="신규 인증"
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {openMenu === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={localePath(child.href)}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {locale === 'en' ? child.labelEn : child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right — Lang + Mobile */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <Link
                href={locale === 'ko' ? `/en` : `/ko`}
                className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  scrolled
                    ? 'border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                    : 'border-white/30 text-white/80 hover:border-white hover:text-white'
                }`}
                aria-label="언어 변경"
              >
                {locale === 'ko' ? 'EN' : '한국어'}
              </Link>

              {/* Hamburger */}
              <button
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setDrawerOpen(true)}
                aria-label="메뉴 열기"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <rect x="2" y="4" width="16" height="2" rx="1" />
                  <rect x="2" y="9" width="16" height="2" rx="1" />
                  <rect x="2" y="14" width="16" height="2" rx="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        locale={locale}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
