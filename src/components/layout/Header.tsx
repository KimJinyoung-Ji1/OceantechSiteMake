'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { NAV_ITEMS } from '@/lib/constants';
import type { Locale } from '@/lib/i18n';
import MobileDrawer from './MobileDrawer';

interface HeaderProps {
  locale: Locale;
}

type ChildLink = { label: string; labelEn: string; href: string };
type Item = (typeof NAV_ITEMS)[number] & { children?: readonly ChildLink[]; badge?: boolean };

export default function Header({ locale }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const items = NAV_ITEMS as readonly Item[];

  const label = (item: { label: string; labelEn: string }) => (locale === 'en' ? item.labelEn : item.label);

  return (
    <>
      {/* Header — integrated with hero, no gap */}
      <div
        className="fixed z-50"
        style={{ top: '0', left: '0', right: '0' }}
      >
        <header
          className="border-b"
          style={{
            background: 'linear-gradient(135deg, rgba(2,16,151,0.92) 0%, rgba(1,72,200,0.88) 50%, rgba(3,233,248,0.90) 100%)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            borderColor: 'rgba(255,255,255,0.20)',
            boxShadow: '0 12px 48px rgba(2,16,151,0.18)',
          }}
        >
          <div className="mx-auto flex h-16 lg:h-[88px] w-full max-w-[1920px] items-center justify-between px-4 lg:px-24">
            {/* Logo */}
            <Link href={localePath('/')} className="flex items-center gap-3 shrink-0">
              <Image
                src="/images/logo-brand.png"
                alt="오션테크 로고"
                width={250}
                height={62}
                className="h-[56px] w-auto object-contain brightness-0 invert"
                sizes="250px"
                priority
              />
            </Link>

            {/* Center nav — spread wide */}
            <nav className="hidden flex-1 items-stretch justify-evenly xl:flex h-full" aria-label="주요 메뉴">
              {items.map((item) => (
                <div
                  key={item.href}
                  className="relative flex flex-1 items-stretch"
                >
                  <Link
                    href={localePath(item.href)}
                    className="group relative flex flex-1 items-center justify-center gap-1.5 h-full text-[22px] font-semibold transition-all duration-200"
                    style={{ color: 'rgba(255,255,255,0.82)', background: 'transparent' }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#ffffff';
                      el.style.background = 'rgba(255,255,255,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = 'rgba(255,255,255,0.82)';
                      el.style.background = 'transparent';
                    }}
                  >
                    <span>{label(item)}</span>
                    {item.badge ? (
                      <span className="h-2 w-2 rounded-full" style={{ background: '#03E9F8' }} aria-hidden="true" />
                    ) : null}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right: CTA + Lang */}
            <div className="hidden items-center gap-3 xl:flex shrink-0">
              <Link
                href={locale === 'ko' ? '/en' : '/ko'}
                className="rounded-lg border px-4 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[20px] font-semibold transition-colors duration-150"
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
                className="rounded-lg border px-3 py-1.5 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[16px] font-semibold"
                style={{ borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)' }}
                aria-label="언어 전환"
              >
                {locale === 'ko' ? 'EN' : 'KR'}
              </Link>
              <button
                className="rounded-xl p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white transition"
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

      </div>

      <MobileDrawer locale={locale} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
