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
    <path d="M22 4L6 11v11c0 9.9 7.1 19.1 16 21.3C31 41.1 38 31.9 38 22V11L22 4z" stroke="#0168EF" strokeWidth="2" strokeLinejoin="round" />
    <path d="M15 22l5 5 9-9" stroke="#0168EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WaterDropIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M22 5C22 5 8 19 8 28a14 14 0 0028 0C36 19 22 5 22 5z" stroke="#0168EF" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 30a8 8 0 0011-5" stroke="#0168EF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CoinIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <circle cx="22" cy="22" r="16" stroke="#0168EF" strokeWidth="2" />
    <path d="M22 12v20M18 15.5h6a3.5 3.5 0 010 7H18m0 0h6a3.5 3.5 0 010 7H18" stroke="#0168EF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M14 7h16v14a8 8 0 01-16 0V7z" stroke="#0168EF" strokeWidth="2" strokeLinejoin="round" />
    <path d="M10 10H7a3 3 0 000 6h3M34 10h3a3 3 0 010 6h-3" stroke="#0168EF" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 29v6M16 35h12" stroke="#0168EF" strokeWidth="2" strokeLinecap="round" />
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
        <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
              {isEn ? 'PRODUCT LINEUP' : '제품 라인업'}
            </p>
            <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
              {t.products.categoryTitle}
            </h2>
          </motion.div>

          <div className="space-y-20 lg:space-y-28">
            {categories.map((category, catIdx) => (
              <motion.div
                key={category.id}
                className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-start ${catIdx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
              >
                {/* Category hero image */}
                <motion.div
                  className="w-full lg:w-2/5 flex-shrink-0"
                  variants={fadeInUp}
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: '#f5f5f5',
                      border: '1px solid var(--gray-200)',
                      aspectRatio: '4/3',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={category.image}
                      alt={isEn ? category.nameEn : category.nameKo}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </motion.div>

                {/* Category info + product grid */}
                <motion.div className="flex-1" variants={fadeInUp}>
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                    style={{
                      background: 'var(--primary-50)',
                      color: 'var(--primary-600)',
                      border: '1px solid var(--primary-100)',
                    }}
                  >
                    {isEn ? 'ECO-FRIENDLY ZINC' : '친환경 아연 어망추'}
                  </span>
                  <h3 className="section-title mb-3" style={{ color: 'var(--gray-900)' }}>
                    {isEn ? category.nameEn : category.nameKo}
                  </h3>
                  <p className="section-subtitle mb-8 max-w-lg" style={{ fontSize: '1.125rem', textAlign: 'center' }}>
                    {isEn ? category.descriptionEn : category.descriptionKo}
                  </p>

                  {/* Product variant grid */}
                  <div>
                    <p className="mb-4 font-bold uppercase tracking-wider" style={{ color: 'var(--gray-500)', fontSize: '1rem' }}>
                      {t.products.specTitle}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {category.items.map((item) => (
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
                          whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.14)' }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Product image */}
                          <div
                            className="relative w-full"
                            style={{ aspectRatio: '1/1', background: '#f5f5f5' }}
                          >
                            <Image
                              src={item.image}
                              alt={item.model}
                              fill
                              className="object-contain p-3"
                              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 22vw, 12vw"
                            />
                          </div>
                          {/* Spec info */}
                          <div className="p-3 border-t text-center" style={{ borderColor: 'var(--gray-100)' }}>
                            <p className="text-xs font-bold mb-1.5" style={{ color: '#0168EF' }}>
                              {item.model}
                            </p>
                            <div className="flex justify-center gap-2 text-sm" style={{ color: 'var(--gray-500)' }}>
                              <span style={{ fontSize: '0.8rem' }}>{t.products.weight}: {item.weight}</span>
                              <span style={{ color: 'var(--gray-300)' }}>·</span>
                              <span style={{ fontSize: '0.8rem' }}>{t.products.size}: {item.size}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
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
        <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
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

      {/* ── Lead vs Zinc Comparison ── */}
      <section
        className="py-16 lg:py-24"
        style={{ background: 'var(--background)' }}
        aria-label={t.products.comparisonTitle}
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-24">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="section-eyebrow" style={{ color: 'var(--primary-500)' }}>
              {isEn ? 'COMPARISON' : '비교'}
            </p>
            <h2 className="section-title" style={{ color: 'var(--gray-900)' }}>
              {t.products.comparisonTitle}
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {/* Lead weight card */}
            <motion.div
              className="rounded-2xl overflow-hidden"
              style={{
                border: '2px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.03)',
              }}
              variants={fadeInUp}
            >
              <div className="relative w-full" style={{ aspectRatio: '4/3', background: '#FEF2F2', padding: '16px' }}>
                <Image
                  src="/images/products/lead-weight.png"
                  alt={isEn ? 'Conventional lead fishing weight' : '기존 납추'}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div
                className="p-6 border-t"
                style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.05)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(239,68,68,0.12)', color: '#dc2626' }}
                  >
                    {isEn ? 'CONVENTIONAL' : '기존'}
                  </span>
                </div>
                <h3 className="card-title mb-4" style={{ color: 'var(--gray-900)' }}>
                  {t.products.lead}
                </h3>
                <ul className="space-y-2">
                  {[
                    isEn ? 'Heavy metal contamination risk' : '중금속 오염 위험',
                    isEn ? 'Short lifespan (1–2 years)' : '짧은 수명 (1~2년)',
                    isEn ? 'High replacement frequency' : '높은 교체 빈도',
                    isEn ? 'No eco-certification' : '친환경 인증 없음',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" />
                        <path d="M5 8h6" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Zinc weight card */}
            <motion.div
              className="rounded-2xl overflow-hidden"
              style={{
                border: '2px solid rgba(23,233,181,0.4)',
                background: 'rgba(23,233,181,0.03)',
              }}
              variants={fadeInUp}
            >
              <div className="relative w-full" style={{ aspectRatio: '4/3', background: '#E8F5F1', padding: '16px' }}>
                <Image
                  src="/images/products/zinc-weight.png"
                  alt={isEn ? 'OceanTech zinc fishing weight' : '오션테크 아연추'}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div
                className="p-6 border-t"
                style={{ borderColor: 'rgba(23,233,181,0.25)', background: 'rgba(23,233,181,0.05)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(23,233,181,0.15)', color: 'var(--secondary-700)' }}
                  >
                    {isEn ? 'OCEANTECH' : '오션테크'}
                  </span>
                </div>
                <h3 className="card-title mb-4" style={{ color: 'var(--gray-900)' }}>
                  {t.products.zinc}
                </h3>
                <ul className="space-y-2">
                  {[
                    isEn ? 'SVHC 235 substances non-detected' : 'SVHC 235종 불검출 인증',
                    isEn ? '10x longer lifespan' : '납추 대비 10배 이상 수명',
                    isEn ? '80% lower replacement cost' : '교체 비용 80% 절감',
                    isEn ? 'Green Technology certified' : '녹색기술 공식 인증',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" fill="rgba(23,233,181,0.2)" stroke="var(--secondary-500)" strokeWidth="1.5" />
                        <path d="M5 8l2 2 4-4" stroke="var(--secondary-700)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 lg:py-20"
        style={{ background: 'var(--primary-900)' }}
        aria-label="제품 문의"
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-24 text-center">
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
            <p className="section-subtitle mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {isEn
                ? 'Contact us for product specifications, pricing, and consultation on switching from lead to zinc fishing weights.'
                : '제품 규격, 납품 가격, 납추에서 아연추로의 전환 상담을 원하시면 언제든지 연락주세요.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{
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
