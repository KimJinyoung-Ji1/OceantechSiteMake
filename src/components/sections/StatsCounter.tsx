'use client';

import type React from 'react';
import { SITE_CONFIG } from '@/lib/constants';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { useCountUp } from '@/hooks/useCountUp';

interface StatsCounterProps {
  locale: Locale;
}

interface StatItemProps {
  target: number;
  unit: string;
  label: string;
  highlight?: boolean;
}

function StatItem({ target, unit, label, highlight }: StatItemProps) {
  const { count, ref } = useCountUp({ target, duration: 2000 });

  return (
    <div
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className="text-center"
    >
      <div className="flex items-end justify-center gap-1 mb-2">
        <span
          className="text-5xl lg:text-6xl font-extrabold tabular-nums"
          style={{ color: highlight ? 'var(--secondary-500)' : 'var(--primary-300)' }}
        >
          {count}
        </span>
        <span
          className="text-2xl font-bold mb-1"
          style={{ color: highlight ? 'var(--secondary-500)' : 'var(--primary-300)' }}
        >
          {unit}
        </span>
      </div>
      <p className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter({ locale }: StatsCounterProps) {
  const t = getTranslation(locale);

  const stats = [
    {
      target: SITE_CONFIG.stats.patents + SITE_CONFIG.stats.designPatents,
      unit: t.stats.patentsUnit,
      label: t.stats.patents,
      highlight: false,
    },
    {
      target: SITE_CONFIG.stats.durability,
      unit: t.stats.durabilityUnit,
      label: t.stats.durability,
      highlight: true,
    },
    {
      target: SITE_CONFIG.stats.svhc,
      unit: t.stats.svhcUnit,
      label: t.stats.svhc,
      highlight: false,
    },
    {
      target: SITE_CONFIG.stats.costReduction,
      unit: t.stats.costReductionUnit,
      label: t.stats.costReduction,
      highlight: true,
    },
    {
      target: SITE_CONFIG.stats.trialMonths,
      unit: t.stats.trialMonthsUnit,
      label: t.stats.trialMonths,
      highlight: false,
    },
  ];

  return (
    <section
      className="py-10 lg:py-14"
      style={{ background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700) 100%)' }}
      aria-label="오션테크 수치 통계"
    >
      <div className="max-w-[1920px] mx-auto px-8 lg:px-24">
        <div className="text-center mb-7">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
            {t.stats.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
