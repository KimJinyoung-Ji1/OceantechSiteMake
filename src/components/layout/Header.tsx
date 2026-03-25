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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[rgba(2,16,151,0.82)] backdrop-blur-xl">
        <div className="border-b border-white/10">
          <div className="mx-auto flex h-10 w-full max-w-[1600px] items-center justify-between px-4 lg:px-8">
            <div className="hidden items-center gap-4 text-[13px] text-white/70 lg:flex">
              <span>{SITE_CONFIG.company.slogan}</span>
              <span className="h-3 w-px bg-white/20" />
              <span>{SITE_CONFIG.contact.tel}</span>
              <span className="h-3 w-px bg-white/20" />
              <span>{SITE_CONFIG.contact.email}</span>
            </div>
            <div className="ml-auto flex items-center gap-2 text-[13px]">
              <Link
                href={locale === 'ko' ? '/en' : '/ko'}
                className="rounded-full border border-white/15 px-3 py-1 text-white/80 transition hover:border-white/35 hover:text-white"
                aria-label="언어 전환"
              >
                {locale === 'ko' ? 'EN' : 'KR'}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="relative"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="mx-auto flex h-[84px] w-full max-w-[1600px] items-center justify-between px-4 lg:px-8">
            <Link href={localePath('/')} className="flex min-w-[220px] items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <span className="text-sm font-black tracking-[0.24em] text-white">OC</span>
              </div>
              <div>
                <p className="text-[28px] font-black tracking-[0.16em] text-white">OCEANTECH</p>
                <p className="text-[12px] text-white/60">{SITE_CONFIG.company.name}</p>
              </div>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-8 xl:flex" aria-label="주요 메뉴">
              {items.map((item) => (
                <div
                  key={item.href}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => setOpenMenu(item.href)}
                >
                  <Link
                    href={localePath(item.href)}
                    className="group flex items-center gap-2 py-3 text-[17px] font-semibold text-white/88 transition hover:text-white"
                  >
                    <span>{label(item)}</span>
                    {item.badge ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--secondary-500)]" aria-hidden="true" />
                    ) : null}
                    <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--secondary-500)] transition-transform duration-200 group-hover:scale-x-100" />
                  </Link>
                </div>
              ))}
            </nav>

            <div className="hidden min-w-[220px] items-center justify-end gap-3 xl:flex">
              <Link
                href={localePath('/certification')}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white/35 hover:bg-white/8"
              >
                인증현황
              </Link>
              <Link
                href={localePath('/contact')}
                className="rounded-full bg-[var(--secondary-500)] px-5 py-2.5 text-sm font-black text-[var(--primary-900)] shadow-[0_10px_24px_rgba(23,233,181,0.28)] transition hover:brightness-105"
              >
                문의하기
              </Link>
            </div>

            <button
              className="rounded-xl p-2 text-white transition hover:bg-white/10 xl:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="메뉴 열기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <AnimatePresence>
            {activeMenu ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-x-0 top-full border-t border-white/10 bg-[rgba(6,21,116,0.94)] backdrop-blur-xl"
              >
                <div className="mx-auto grid max-w-[1600px] grid-cols-[1.2fr_1.8fr] gap-8 px-8 py-8">
                  <div className="rounded-[28px] border border-white/10 bg-white/6 p-8">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[var(--secondary-500)]">
                      {locale === 'en' ? 'Section' : '섹션'}
                    </p>
                    <h2 className="mb-3 text-3xl font-black text-white">{label(activeMenu)}</h2>
                    <p className="max-w-md text-[15px] leading-7 text-white/68">
                      {locale === 'en'
                        ? 'Browse the main contents prepared for this section in a wider, more editorial layout.'
                        : '이 섹션에 연결된 주요 콘텐츠를 넓고 읽기 쉬운 카드형 구조로 바로 탐색할 수 있습니다.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {activeMenu.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={localePath(child.href)}
                        className="group rounded-[28px] border border-white/10 bg-white/7 p-6 transition hover:-translate-y-1 hover:border-[var(--secondary-500)]/50 hover:bg-white/12"
                      >
                        <p className="mb-2 text-lg font-black text-white">{label(child)}</p>
                        <p className="text-sm leading-6 text-white/62">
                          {locale === 'en'
                            ? 'Open the subsection and review related company, technology, or certification details.'
                            : '회사 정보, 기술 설명, 인증 자료 등 관련 내용을 자세히 확인할 수 있습니다.'}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      <MobileDrawer locale={locale} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
