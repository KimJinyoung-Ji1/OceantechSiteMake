'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
import type { Locale } from '@/lib/i18n';
import MobileDrawer from './MobileDrawer';

interface HeaderProps {
  locale: Locale;
}

type ChildLink = { label: string; labelEn: string; href: string };
type Item = (typeof NAV_ITEMS)[number] & { children?: readonly ChildLink[]; badge?: boolean };

export default function Header({ locale }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const items = NAV_ITEMS as readonly Item[];

  const activeMenu = useMemo(
    () => items.find((item) => item.href === openMenu && item.children?.length),
    [items, openMenu],
  );

  const label = (item: { label: string; labelEn: string }) => (locale === 'en' ? item.labelEn : item.label);

  return (
    <>
      {/* Floating header — floats above content with top-4 offset */}
      <div
        className="fixed z-50"
        style={{ top: '1rem', left: '1rem', right: '1rem' }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <header
          className="rounded-2xl border"
          style={{
            background: 'rgba(2,16,151,0.88)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            borderColor: 'rgba(255,255,255,0.06)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
          }}
        >
          <div className="mx-auto flex h-[72px] w-full max-w-[1360px] items-center justify-between px-6 lg:px-8">
            {/* Logo */}
            <Link href={localePath('/')} className="flex items-center gap-3 shrink-0">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border"
                style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}
              >
                <span className="text-[11px] font-black tracking-[0.2em] text-white">OT</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[20px] font-black tracking-[0.14em] text-white leading-none">OCEANTECH</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {SITE_CONFIG.company.name}
                </p>
              </div>
            </Link>

            {/* Center nav — spread wide */}
            <nav className="hidden flex-1 items-center justify-center gap-6 xl:flex" aria-label="주요 메뉴">
              {items.map((item) => (
                <div
                  key={item.href}
                  className="relative flex items-center"
                  onMouseEnter={() => setOpenMenu(item.href)}
                >
                  <Link
                    href={localePath(item.href)}
                    className="group relative flex items-center gap-1.5 py-2 text-[16px] font-semibold transition-colors duration-150"
                    style={{ color: openMenu === item.href ? '#17E9B5' : 'rgba(255,255,255,0.82)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        openMenu === item.href ? '#17E9B5' : 'rgba(255,255,255,0.82)';
                    }}
                  >
                    <span>{label(item)}</span>
                    {item.badge ? (
                      <span className="h-2 w-2 rounded-full" style={{ background: '#17E9B5' }} aria-hidden="true" />
                    ) : null}
                    {/* Mint underline indicator for active */}
                    <span
                      className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-transform duration-200 origin-left"
                      style={{
                        background: '#17E9B5',
                        transform: openMenu === item.href ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right: CTA + Lang */}
            <div className="hidden items-center gap-3 xl:flex shrink-0">
              <Link
                href={localePath('/certification')}
                className="rounded-xl border px-4 py-2 text-[14px] font-semibold transition-colors duration-150"
                style={{
                  borderColor: 'rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.8)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(255,255,255,0.4)';
                  el.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(255,255,255,0.18)';
                  el.style.color = 'rgba(255,255,255,0.8)';
                }}
              >
                {locale === 'en' ? 'Certification' : '인증현황'}
              </Link>
              <Link
                href={localePath('/contact')}
                className="rounded-xl px-5 py-2 text-[14px] font-black text-[#021097] transition-all duration-150"
                style={{
                  background: 'linear-gradient(135deg, #03E9F8 0%, #17E9B5 100%)',
                  boxShadow: '0 6px 20px rgba(23,233,181,0.32)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1)';
                }}
              >
                {locale === 'en' ? 'Contact' : '문의하기'}
              </Link>
              <Link
                href={locale === 'ko' ? '/en' : '/ko'}
                className="rounded-lg border px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150"
                style={{
                  borderColor: 'rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(255,255,255,0.38)';
                  el.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(255,255,255,0.18)';
                  el.style.color = 'rgba(255,255,255,0.7)';
                }}
                aria-label="언어 전환"
              >
                {locale === 'ko' ? 'EN' : 'KR'}
              </Link>
            </div>

            {/* Mobile: lang + hamburger */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                href={locale === 'ko' ? '/en' : '/ko'}
                className="rounded-lg border px-3 py-1.5 text-[13px] font-semibold"
                style={{ borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)' }}
                aria-label="언어 전환"
              >
                {locale === 'ko' ? 'EN' : 'KR'}
              </Link>
              <button
                className="rounded-xl p-2 text-white transition"
                style={{ background: 'rgba(255,255,255,0)' }}
                onClick={() => setDrawerOpen(true)}
                aria-label="메뉴 열기"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0)';
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mega dropdown — attaches below the floating header card */}
        <AnimatePresence>
          {activeMenu ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="mt-2 rounded-2xl border overflow-hidden"
              style={{
                background: 'rgba(6,21,116,0.96)',
                backdropFilter: 'blur(28px) saturate(180%)',
                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
              }}
            >
              <div className="mx-auto grid max-w-[1360px] grid-cols-[1.2fr_1.8fr] gap-8 px-8 py-8">
                <div
                  className="rounded-[20px] border p-8"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.09)',
                  }}
                >
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.28em]" style={{ color: '#17E9B5' }}>
                    {locale === 'en' ? 'Section' : '섹션'}
                  </p>
                  <h2 className="mb-3 text-3xl font-black text-white">{label(activeMenu)}</h2>
                  <p className="max-w-md text-[15px] leading-7" style={{ color: 'rgba(255,255,255,0.62)' }}>
                    {locale === 'en'
                      ? 'Browse the main contents prepared for this section.'
                      : '이 섹션에 연결된 주요 콘텐츠를 바로 탐색할 수 있습니다.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {activeMenu.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={localePath(child.href)}
                      className="group rounded-[20px] border p-6 transition-all duration-150"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        borderColor: 'rgba(255,255,255,0.09)',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = 'rgba(255,255,255,0.11)';
                        el.style.borderColor = 'rgba(23,233,181,0.45)';
                        el.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = 'rgba(255,255,255,0.06)';
                        el.style.borderColor = 'rgba(255,255,255,0.09)';
                        el.style.transform = 'translateY(0)';
                      }}
                    >
                      <p className="mb-2 text-lg font-black text-white">{label(child)}</p>
                      <p className="text-sm leading-6" style={{ color: 'rgba(255,255,255,0.58)' }}>
                        {locale === 'en'
                          ? 'View details for this section.'
                          : '관련 내용을 자세히 확인할 수 있습니다.'}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <MobileDrawer locale={locale} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
