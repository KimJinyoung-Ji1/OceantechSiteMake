import { notFound } from 'next/navigation';
import { isValidLocale, getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import PageHero from '@/components/sections/PageHero';
import AboutCeoSection from '@/components/sections/about/CeoSection';
import AboutVisionSection from '@/components/sections/about/VisionSection';
import AboutHistorySection from '@/components/sections/about/HistorySection';
import AboutOverviewSection from '@/components/sections/about/OverviewSection';

export const metadata = { title: '회사소개' };

export default async function AboutPage(props: PageProps<'/[locale]/about'>) {
  const { locale } = await props.params;
  if (!isValidLocale(locale)) notFound();

  const l = locale as Locale;
  const t = getTranslation(l);

  return (
    <>
      <PageHero
        locale={l}
        title={t.about.title}
        subtitle="바다와 공생을 통한 건강한 생태계 구축"
        breadcrumb={[{ label: '홈', href: '/' }, { label: t.about.title }]}
      />
      <AboutCeoSection locale={l} ceoMessage={SITE_CONFIG.ceoMessage} />
      <AboutVisionSection locale={l} />
      <AboutHistorySection locale={l} history={SITE_CONFIG.history} />
      <AboutOverviewSection locale={l} />
    </>
  );
}
