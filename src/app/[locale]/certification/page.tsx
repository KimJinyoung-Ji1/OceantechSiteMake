import { notFound } from 'next/navigation';
import { isValidLocale, getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import PageHero from '@/components/sections/PageHero';
import CertGreenFeature from '@/components/sections/certification/GreenFeature';
import CertGrid from '@/components/sections/certification/CertGrid';
import CertPerformance from '@/components/sections/certification/PerformanceSection';

export const metadata = { title: '인증현황' };

export default async function CertificationPage(props: PageProps<'/[locale]/certification'>) {
  const { locale } = await props.params;
  if (!isValidLocale(locale)) notFound();

  const l = locale as Locale;
  const t = getTranslation(l);

  return (
    <>
      <PageHero
        locale={l}
        title={t.certification.title}
        subtitle={t.certification.subtitle}
        breadcrumb={[{ label: '홈', href: '/' }, { label: t.certification.title }]}
      />
      <CertGreenFeature locale={l} />
      <CertGrid locale={l} />
      <CertPerformance locale={l} />
    </>
  );
}
