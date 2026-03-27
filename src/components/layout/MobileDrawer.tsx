'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/constants';
import type { Locale } from '@/lib/i18n';

interface MobileDrawerProps {
  locale: Locale;
  open: boolean;
  onClose: () => void;
}

type NavItemWithChildren = (typeof NAV_ITEMS)[number] & {
  children?: ReadonlyArray<{ label: string; labelEn: string; href: string }>;
  badge?: boolean;
};

export default function MobileDrawer({ locale, open, onClose }: MobileDrawerProps) {
  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const label = (item: { label: string; labelEn: string }) =>
    locale === 'en' ? item.labelEn : item.label;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b border-white/10"
              style={{ background: 'linear-gradient(135deg, #9D174D 0%, #EC4899 50%, #F472B6 100%)' }}
            >
              <span className="text-white font-bold text-lg">OCEANTECH</span>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="메뉴 닫기"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4L16 16M4 16L16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              {(NAV_ITEMS as readonly NavItemWithChildren[]).map((item) => (
                <div key={item.href} className="mb-1">
                  <Link
                    href={localePath(item.href)}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-lg font-semibold transition-colors"
                    style={{ color: '#9D174D' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(157,23,77,0.08)'; (e.currentTarget as HTMLAnchorElement).style.color = '#9D174D'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = ''; }}
                  >
                    <span className="flex items-center gap-2">
                      {label(item)}
                      {item.badge && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: 'var(--secondary-500)' }}
                        />
                      )}
                    </span>
                    {item.children && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-40">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      </svg>
                    )}
                  </Link>

                  {/* Sub items */}
                  {item.children && (
                    <div className="ml-4 border-l-2 pl-4 mt-1 mb-2" style={{ borderColor: 'rgba(157,23,77,0.2)' }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={localePath(child.href)}
                          onClick={onClose}
                          className="flex items-center py-2.5 min-h-[44px] text-base transition-colors"
                          style={{ color: 'rgba(157,23,77,0.7)' }}
                        >
                          {locale === 'en' ? child.labelEn : child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <Link
                  href={locale === 'ko' ? '/en' : '/ko'}
                  onClick={onClose}
                  className="text-sm font-medium transition-colors min-h-[44px] inline-flex items-center"
                  style={{ color: '#9D174D' }}
                >
                  {locale === 'ko' ? 'English' : '한국어'}
                </Link>
                <Link
                  href={localePath('/contact')}
                  onClick={onClose}
                  className="px-4 py-2 min-h-[44px] inline-flex items-center rounded-full text-sm font-bold text-white transition-colors"
                  style={{ background: 'linear-gradient(135deg, #9D174D 0%, #EC4899 100%)' }}
                >
                  문의하기
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
