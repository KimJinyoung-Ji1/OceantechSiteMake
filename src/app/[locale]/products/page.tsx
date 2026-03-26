import { notFound } from 'next/navigation';
import { isValidLocale, getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import PageHero from '@/components/sections/PageHero';
import ProductShowcase from '@/components/sections/products/ProductShowcase';

export const metadata = { title: '제품소개' };

export default async function ProductsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isValidLocale(locale)) notFound();

  const l = locale as Locale;
  const t = getTranslation(l);

  return (
    <>
      <PageHero
        locale={l}
        title={t.products.pageTitle}
        subtitle={t.products.pageSubtitle}
        breadcrumb={[
          { label: locale === 'en' ? 'Home' : '홈', href: '/' },
          { label: t.products.pageTitle },
        ]}
      />
      <ProductShowcase locale={l} />
    </>
  );
}
