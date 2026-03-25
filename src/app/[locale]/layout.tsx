import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, isValidLocale } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: '(주)오션테크 — 건강한바다 행복한어민',
    template: '%s | (주)오션테크',
  },
};

export default async function LocaleLayout(props: LayoutProps<'/[locale]'>) {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const lang = locale === 'en' ? 'en' : 'ko';

  return (
    <html lang={lang} className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header locale={locale} />
        <main className="flex-1">{props.children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
