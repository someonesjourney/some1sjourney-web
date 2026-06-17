import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import {
  getPageMeta,
  getSiteContent,
  isLocale,
  localeDirection,
  locales,
  SITE_NAME,
  SITE_URL,
  type Locale,
} from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const locale = localeParam as Locale;
  const content = getSiteContent(locale);
  const homeMeta = getPageMeta(locale, "home");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${homeMeta.title}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: content.metadata.defaultDescription,
    openGraph: {
      title: `${SITE_NAME} — ${content.brand.tagline}`,
      description: content.brand.subtitle,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      images: [{ url: content.assets.hero, width: 1200, height: 630 }],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — ${content.brand.tagline}`,
      description: content.brand.subtitle,
      images: [content.assets.hero],
    },
    icons: {
      icon: content.assets.logo,
      apple: content.assets.logo,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A0A12",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dir = localeDirection(locale);
  const fontClass =
    locale === "ar"
      ? `${notoSansArabic.variable} font-arabic`
      : `${inter.variable} font-sans`;

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${notoSansArabic.variable} h-full scroll-smooth`}>
      <body className={`min-h-full bg-background text-foreground antialiased ${fontClass}`}>
        <LocaleProvider locale={locale}>
          <AuthProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
