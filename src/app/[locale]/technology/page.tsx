import { notFound } from 'next/navigation';
import { isValidLocale, getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import PageHero from '@/components/sections/PageHero';
import TechPatentsSection from '@/components/sections/technology/PatentsSection';
import TechTestReportsSection from '@/components/sections/technology/TestReportsSection';
import TechSvhcSection from '@/components/sections/technology/SvhcSection';

export const metadata = { title: '기술력' };

export default async function TechnologyPage(props: PageProps<'/[locale]/technology'>) {
  const { locale } = await props.params;
  if (!isValidLocale(locale)) notFound();

  const l = locale as Locale;
  const t = getTranslation(l);

  return (
    <>
      <PageHero
        locale={l}
        title={t.technology.title}
        subtitle={t.technology.subtitle}
        breadcrumb={[{ label: '홈', href: '/' }, { label: t.technology.title }]}
      />
      <TechPatentsSection locale={l} />
      <TechTestReportsSection locale={l} />
      <TechSvhcSection locale={l} />
    </>
  );
}
