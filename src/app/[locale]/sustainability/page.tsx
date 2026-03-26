import { notFound } from 'next/navigation';
import { isValidLocale, getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import PageHero from '@/components/sections/PageHero';
import SustainWhyZincSection from '@/components/sections/sustainability/WhyZincSection';
import SustainCompareSection from '@/components/sections/sustainability/FullCompareSection';
import SustainSvhcSection from '@/components/sections/sustainability/SvhcHighlight';
import SustainTrialSection from '@/components/sections/sustainability/TrialSection';
import SustainInfographicSection from '@/components/sections/sustainability/InfographicSection';

export const metadata = { title: '친환경' };

export default async function SustainabilityPage(props: PageProps<'/[locale]/sustainability'>) {
  const { locale } = await props.params;
  if (!isValidLocale(locale)) notFound();

  const l = locale as Locale;
  const t = getTranslation(l);

  return (
    <>
      <PageHero
        locale={l}
        title={t.sustainability.title}
        subtitle={t.sustainability.subtitle}
        breadcrumb={[{ label: '홈', href: '/' }, { label: t.sustainability.title }]}
      />
      <SustainWhyZincSection locale={l} />
      <SustainCompareSection locale={l} />
      <SustainTrialSection locale={l} />
      <SustainInfographicSection locale={l} />
    </>
  );
}
