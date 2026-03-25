import { notFound } from 'next/navigation';
import { isValidLocale, getTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import PageHero from '@/components/sections/PageHero';
import ContactContent from '@/components/sections/contact/ContactContent';

export const metadata = { title: '문의하기' };

export default async function ContactPage(props: PageProps<'/[locale]/contact'>) {
  const { locale } = await props.params;
  if (!isValidLocale(locale)) notFound();

  const l = locale as Locale;
  const t = getTranslation(l);

  return (
    <>
      <PageHero
        locale={l}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        breadcrumb={[{ label: '홈', href: '/' }, { label: t.contact.title }]}
      />
      <ContactContent locale={l} />
    </>
  );
}
