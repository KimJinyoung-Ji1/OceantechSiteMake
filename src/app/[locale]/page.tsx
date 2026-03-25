import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import HeroSection from '@/components/sections/HeroSection';
import GreenCertStrip from '@/components/sections/GreenCertStrip';
import ValueBento from '@/components/sections/ValueBento';
import CompareTable from '@/components/sections/CompareTable';
import CertCards from '@/components/sections/CertCards';
import StatsCounter from '@/components/sections/StatsCounter';
import CTASection from '@/components/sections/CTASection';

export default async function HomePage(props: PageProps<'/[locale]'>) {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const l = locale as Locale;

  return (
    <>
      <HeroSection locale={l} />
      <GreenCertStrip locale={l} />
      <ValueBento locale={l} />
      <CompareTable locale={l} />
      <CertCards locale={l} />
      <StatsCounter locale={l} />
      <CTASection locale={l} />
    </>
  );
}
