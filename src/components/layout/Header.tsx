'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const label = (item: { label: string; labelEn: string }) =>
    locale === 'en' ? item.labelEn : item.label;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'var(--primary-900)' }}>
        {/* Top bar */}
        <div
          className="w-full border-b"
          style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.2)' }}
        >
          <div className="w-full px-6 lg:px-12 flex items-center justify-end h-9">
            <div className="flex items-center gap-4">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {SITE_CONFIG.company.slogan}
              </span>
              <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.2)' }} />
              {/* Lang toggle */}
              <Link
                href={locale === 'ko' ? `/en` : `/ko`}
                className="text-xs font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                aria-label="언어 변경"
              >
                {locale === 'ko' ? 'EN' : '한국어'}
              </Link>
              <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <Link
                href={localePath('/contact')}
                className="text-xs font-semibold px-3 py-1 rounded-full transition-all"
                style={{
                  background: 'var(--secondary-500)',
                  color: 'var(--primary-900)',
                }}
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href={localePath('/')} className="flex items-center gap-2.5 shrink-0">
              <span className="text-2xl font-black tracking-tight text-white">
                OCEANTECH
              </span>
              <span className="hidden sm:block text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
                (주)오션테크
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="주 메뉴">
              {(NAV_ITEMS as readonly NavItemWithChildren[]).map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenMenu(item.href)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    href={localePath(item.href)}
                    className="relative flex items-center gap-1.5 py-2 font-semibold transition-colors text-white/90 hover:text-white"
                    style={{ fontSize: '17px' }}
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
                          className="absolute top-full left-0 mt-2 w-52 rounded-xl shadow-xl overflow-hidden"
                          style={{ background: 'white', border: '1px solid var(--border)' }}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={localePath(child.href)}
                              className="block px-5 py-3 font-medium transition-colors hover:bg-blue-50"
                              style={{ color: 'var(--text-body)', fontSize: '15px' }}
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

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="메뉴 열기"
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
                <rect x="2" y="4" width="16" height="2" rx="1" />
                <rect x="2" y="9" width="16" height="2" rx="1" />
                <rect x="2" y="14" width="16" height="2" rx="1" />
              </svg>
            </button>
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
