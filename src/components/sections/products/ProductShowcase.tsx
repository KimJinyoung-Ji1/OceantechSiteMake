'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import OceanDivider from '@/components/sections/OceanDivider';

interface ProductShowcaseProps {
  locale: Locale;
}

// SVG icons for advantages — 44px stroke style, brand blue
const ShieldIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M22 4L6 11v11c0 9.9 7.1 19.1 16 21.3C31 41.1 38 31.9 38 22V11L22 4z" stroke="var(--primary-500)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M15 22l5 5 9-9" stroke="var(--primary-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WaterDropIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M22 5C22 5 8 19 8 28a14 14 0 0028 0C36 19 22 5 22 5z" stroke="var(--primary-500)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 30a8 8 0 0011-5" stroke="var(--primary-500)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CoinIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <circle cx="22" cy="22" r="16" stroke="var(--primary-500)" strokeWidth="2" />
    <path d="M22 12v20M18 15.5h6a3.5 3.5 0 010 7H18m0 0h6a3.5 3.5 0 010 7H18" stroke="var(--primary-500)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M14 7h16v14a8 8 0 01-16 0V7z" stroke="var(--primary-500)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M10 10H7a3 3 0 000 6h3M34 10h3a3 3 0 010 6h-3" stroke="var(--primary-500)" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 29v6M16 35h12" stroke="var(--primary-500)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ADVANTAGE_ICONS = [ShieldIcon, WaterDropIcon, CoinIcon, TrophyIcon];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ProductShowcase({ locale }: ProductShowcaseProps) {
  const isEn = locale === 'en';
  const t = getTranslation(locale);
  const categories = SITE_CONFIG.products.categories;
  const advantages = SITE_CONFIG.products.advantages;

  return (
    <>
      {/* ── Product Categories ── */}
      <section
        className="py-16 lg:py-24"
        style={{ background: 'var(--background)' }}
        aria-label={t.products.categoryTitle}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="space-y-16 lg:space-y-20">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
              >
                {/* Category header — single line */}
                <motion.div className="mb-8" variants={fadeInUp}>
                  <h3 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--primary-500)' }}>
                    {isEn ? category.nameEn : category.nameKo}
                    <span className="font-normal text-base lg:text-lg ml-3" style={{ color: 'var(--text-secondary)' }}>
                      {isEn ? category.descriptionEn : category.descriptionKo}
                    </span>
                  </h3>
                </motion.div>

                {/* 4x1 product grid */}
                <motion.div
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                  variants={stagger}
                >
                  {category.items.map((item, idx) => {
                    // Manual scale per item index
                    const jungchiScales = [0.986, 0.8, 0.7, 0.5];
                    const jamangScales = [0.8, 0.69, 0.63, 0.59];
                    const scales = category.id === 'jungchi' ? jungchiScales : jamangScales;
                    const scale = scales[idx] ?? 1;
                    return (
                    <motion.div
                      key={item.model}
                      className="rounded-xl overflow-hidden flex flex-col"
                      style={{
                        background: 'white',
                        border: '1px solid var(--gray-200)',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                      }}
                      variants={fadeInUp}
                      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.14)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="relative w-full flex items-center justify-center"
                        style={{ aspectRatio: '1/1', background: '#f5f5f5' }}
                      >
                        <div className="relative" style={{ width: `${Math.round(scale * 100)}%`, height: `${Math.round(scale * 100)}%` }}>
                        <Image
                          src={item.image}
                          alt={item.model}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 45vw, (max-width: 1024px) 22vw, 20vw"
                        />
                        </div>
                      </div>
                      <div className="p-4 border-t text-center" style={{ borderColor: 'var(--gray-100)' }}>
                        <p className="text-lg font-bold mb-1" style={{ color: 'var(--primary-500)' }}>
                          {item.model}
                        </p>
                        <div className="flex justify-center gap-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
                          <span>{item.weight}</span>
                          <span style={{ color: 'var(--gray-300)' }}>·</span>
                          <span>{item.size}</span>
                        </div>
                      </div>
                    </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OceanDivider variant={2} height={200} />

      {/* ── Advantages ── */}
      <section
        className="py-16 lg:py-24"
        style={{ background: 'var(--background-alt)' }}
        aria-label={t.products.advantagesTitle}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="section-eyebrow" style={{ color: 'var(--secondary-700)' }}>
              {isEn ? 'KEY ADVANTAGES' : '핵심 장점'}
            </p>
            <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
              {t.products.advantagesTitle}
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {advantages.map((adv, i) => {
              const Icon = ADVANTAGE_ICONS[i];
              return (
                <motion.div
                  key={adv.titleEn}
                  className="rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
                  style={{
                    background: 'white',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                  }}
                  variants={fadeInUp}
                  whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(1,104,239,0.06)', border: '1px solid rgba(1,104,239,0.15)' }}
                  >
                    <Icon />
                  </div>
                  <div>
                    <h3 className="card-title mb-1" style={{ color: 'var(--gray-900)', textAlign: 'center' }}>
                      {isEn ? adv.titleEn : adv.titleKo}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)', textAlign: 'center' }}>
                      {isEn ? adv.descEn : adv.descKo}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 lg:py-20"
        style={{ background: 'var(--primary-900)' }}
        aria-label="제품 문의"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            <p className="section-eyebrow mb-3" style={{ color: 'var(--secondary-500)' }}>
              {isEn ? 'GET IN TOUCH' : '제품 문의'}
            </p>
            <h2
              className="section-title mb-4"
              style={{ color: 'white' }}
            >
              {isEn
                ? 'Ready to switch to\neco-friendly zinc weights?'
                : '친환경 아연추로\n전환을 고려하시나요?'}
            </h2>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.2rem' }}>
              {isEn
                ? 'Contact us for product specifications, pricing, and consultation on switching from lead to zinc fishing weights.'
                : '제품 규격, 납품 가격, 납추에서 아연추로의 전환 상담을 원하시면 언제든지 연락주세요.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all"
              style={{
                fontSize: '1.2rem',
                background: 'var(--secondary-500)',
                color: 'var(--gray-900)',
              }}
            >
              {t.products.inquiryButton}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
